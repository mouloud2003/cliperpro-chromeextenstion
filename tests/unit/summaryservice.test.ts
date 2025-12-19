import { describe, it, expect, beforeEach } from "vitest";

import { AppError } from "../../core/applicationlogique/errors";

import { ClipService } from "../../core/applicationlogique/services/clipservice";
import { SettingsService } from "../../core/applicationlogique/services/settingservice";
import { UsageService } from "../../core/applicationlogique/services/usageservice";
import { SummaryService } from "../../core/applicationlogique/services/summaryservice";

import {
  FakeClipRepo,
  FakeSettingsRepo,
  FakeUsageRepo,
  FakeSummaryRepo,
  MockAIClient,
} from "../mockdata"; // عدّل المسار حسب عندك

import { makeSummaryCacheKey } from "../../core/applicationlogique/utils/hash";

beforeEach(() => {
  // مهم لتثبيت الـ hashing والكاش
  process.env.AI_MODEL = "mock-model";
  process.env.PROMPT_VERSION = "1";
});

describe("SummaryService", () => {
  it("returns cached summary without calling AI or consuming quota", async () => {
    const userId = "u1";
    const clipId = "c1";

    const clipRepo = new FakeClipRepo();
    const settingsRepo = new FakeSettingsRepo();
    const usageRepo = new FakeUsageRepo();
    const summaryRepo = new FakeSummaryRepo();
    const ai = new MockAIClient();

    clipRepo.seed({
      id: clipId,
      userId,
      text: "hello world from test",
      title: "t",
      url: "u",
      createdAt: new Date(),
    });

    settingsRepo.seed(userId, {
      aiEnabled: true,
      defaultSummaryFormat: "bullet_points",
    });

    const inputHash = makeSummaryCacheKey({
      text: "hello world from test",
      format: "bullet_points",
      model: "mock-model",
      promptVersion: 1,
    });

    summaryRepo.seedCached({
      userId,
      clipId,
      format: "bullet_points",
      inputHash,
      title: "cached",
      body: "cached body",
    });

    const svc = new SummaryService(
      new ClipService(clipRepo),
      new SettingsService(settingsRepo),
      new UsageService(usageRepo),
      summaryRepo,
      ai
    );

    const out = await svc.summarizeClip(userId, clipId, "bullet_points");

    expect(out.fromCache).toBe(true);
    expect(ai.calls).toBe(0);
    expect(usageRepo.consumeCalls).toBe(0);
  });

  it("throws AI_DISABLED when settings.aiEnabled = false (no AI, no quota)", async () => {
    const userId = "u1";
    const clipId = "c1";

    const clipRepo = new FakeClipRepo();
    const settingsRepo = new FakeSettingsRepo();
    const usageRepo = new FakeUsageRepo();
    const summaryRepo = new FakeSummaryRepo();
    const ai = new MockAIClient();

    clipRepo.seed({
      id: clipId,
      userId,
      text: "hello",
      title: "t",
      url: "u",
      createdAt: new Date(),
    });

    settingsRepo.seed(userId, {
      aiEnabled: false,
      defaultSummaryFormat: "bullet_points",
    });

    const svc = new SummaryService(
      new ClipService(clipRepo),
      new SettingsService(settingsRepo),
      new UsageService(usageRepo),
      summaryRepo,
      ai
    );

    await expect(
      svc.summarizeClip(userId, clipId, "bullet_points")
    ).rejects.toMatchObject({ code: "AI_DISABLED", status: 403 });

    expect(ai.calls).toBe(0);
    expect(usageRepo.consumeCalls).toBe(0);
  });

  it("cache miss: calls AI once, consumes quota once, then next call is cached", async () => {
    const userId = "u1";
    const clipId = "c1";

    const clipRepo = new FakeClipRepo();
    const settingsRepo = new FakeSettingsRepo();
    const usageRepo = new FakeUsageRepo();
    const summaryRepo = new FakeSummaryRepo();
    const ai = new MockAIClient();

    clipRepo.seed({
      id: clipId,
      userId,
      text: "hello from cache miss",
      title: "t",
      url: "u",
      createdAt: new Date(),
    });

    settingsRepo.seed(userId, {
      aiEnabled: true,
      defaultSummaryFormat: "bullet_points",
    });

    const svc = new SummaryService(
      new ClipService(clipRepo),
      new SettingsService(settingsRepo),
      new UsageService(usageRepo),
      summaryRepo,
      ai
    );

    // 1st time: miss
    const out1 = await svc.summarizeClip(userId, clipId, "bullet_points");
    expect(out1.fromCache).toBe(false);
    expect(ai.calls).toBe(1);
    expect(usageRepo.consumeCalls).toBe(1);

    // 2nd time: hit
    const out2 = await svc.summarizeClip(userId, clipId, "bullet_points");
    expect(out2.fromCache).toBe(true);
    expect(ai.calls).toBe(1); // ما زاد
    expect(usageRepo.consumeCalls).toBe(1); // ما زاد
  });

  it("throws FORBIDDEN when clip is not owned by user (no AI, no quota)", async () => {
    const userId = "u1";
    const clipId = "c1";

    const clipRepo = new FakeClipRepo();
    const settingsRepo = new FakeSettingsRepo();
    const usageRepo = new FakeUsageRepo();
    const summaryRepo = new FakeSummaryRepo();
    const ai = new MockAIClient();

    // clip belongs to someone else:
    clipRepo.seed({
      id: clipId,
      userId: "other-user",
      text: "secret",
      title: "t",
      url: "u",
      createdAt: new Date(),
    });

    settingsRepo.seed(userId, {
      aiEnabled: true,
      defaultSummaryFormat: "bullet_points",
    });

    const svc = new SummaryService(
      new ClipService(clipRepo),
      new SettingsService(settingsRepo),
      new UsageService(usageRepo),
      summaryRepo,
      ai
    );

    await expect(
      svc.summarizeClip(userId, clipId, "bullet_points")
    ).rejects.toMatchObject({ code: "FORBIDDEN", status: 403 });

    expect(ai.calls).toBe(0);
    expect(usageRepo.consumeCalls).toBe(0);
  });

  it("throws QUOTA_EXCEEDED and does NOT call AI when quota is exhausted", async () => {
    const userId = "u1";
    const clipId = "c1";

    const clipRepo = new FakeClipRepo();
    const settingsRepo = new FakeSettingsRepo();
    const summaryRepo = new FakeSummaryRepo();
    const ai = new MockAIClient();

    // Usage repo: نعمل override بسيط عشان دايمًا يرجع null (quota انتهت)
    class AlwaysQuotaExceededUsageRepo extends FakeUsageRepo {
      override async tryConsumeSummary(): Promise<any> {
        this.consumeCalls++;
        return null;
      }
    }
    const usageRepo = new AlwaysQuotaExceededUsageRepo();

    clipRepo.seed({
      id: clipId,
      userId,
      text: "hello quota",
      title: "t",
      url: "u",
      createdAt: new Date(),
    });

    settingsRepo.seed(userId, {
      aiEnabled: true,
      defaultSummaryFormat: "bullet_points",
    });

    const svc = new SummaryService(
      new ClipService(clipRepo),
      new SettingsService(settingsRepo),
      new UsageService(usageRepo),
      summaryRepo,
      ai
    );

    await expect(
      svc.summarizeClip(userId, clipId, "bullet_points")
    ).rejects.toMatchObject({ code: "QUOTA_EXCEEDED", status: 429 });

    // لازم ما ينادي AI إذا quota انتهت
    expect(ai.calls).toBe(0);
  });
});
