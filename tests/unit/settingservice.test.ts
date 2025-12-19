import { describe, it, expect } from "vitest";

import { SettingsService } from "../../core/applicationlogique/services/settingservice";
import type { IUserSettingsRepository } from "../../core/ports/repos";
import type { UserSettingsDTO } from "../../core/domain/types";

class InMemorySettingsRepo implements IUserSettingsRepository {
  public getCalls = 0;
  public upsertCalls = 0;

  public stored: UserSettingsDTO | null = null;
  public lastUpsertInput: Partial<UserSettingsDTO> | null = null;

  async get(_userId: string): Promise<UserSettingsDTO | null> {
    this.getCalls++;
    return this.stored;
  }

  async upsert(
    _userId: string,
    input: Partial<UserSettingsDTO>
  ): Promise<UserSettingsDTO> {
    this.upsertCalls++;
    this.lastUpsertInput = input;

    const next: UserSettingsDTO = {
      aiEnabled: input.aiEnabled ?? this.stored?.aiEnabled ?? false,
      defaultSummaryFormat:
        input.defaultSummaryFormat ??
        this.stored?.defaultSummaryFormat ??
        "bullet_points",
    };

    this.stored = next;
    return next;
  }
}

describe("SettingsService", () => {
  it("getUserSettings: returns existing settings (no upsert)", async () => {
    const repo = new InMemorySettingsRepo();
    repo.stored = { aiEnabled: true, defaultSummaryFormat: "paragraph" };

    const svc = new SettingsService(repo);
    const out = await svc.getUserSettings("u1");

    expect(out).toEqual({ aiEnabled: true, defaultSummaryFormat: "paragraph" });
    expect(repo.getCalls).toBe(1);
    expect(repo.upsertCalls).toBe(0);
  });

  it("getUserSettings: if missing, creates defaults via upsert and returns them", async () => {
    const repo = new InMemorySettingsRepo();
    repo.stored = null;

    const svc = new SettingsService(repo);
    const out = await svc.getUserSettings("u1");

    expect(out).toEqual({
      aiEnabled: false,
      defaultSummaryFormat: "bullet_points",
    });

    expect(repo.getCalls).toBe(1);
    expect(repo.upsertCalls).toBe(1);
    // مهم: يتأكد أنه مرّر defaults للريبو (مش مجرد upsert فاضي)
    expect(repo.lastUpsertInput).toEqual({
      aiEnabled: false,
      defaultSummaryFormat: "bullet_points",
    });
  });

  it("updateUserSettings: throws INVALID_SUMMARY_FORMAT for invalid format", async () => {
    const repo = new InMemorySettingsRepo();
    const svc = new SettingsService(repo);

    await expect(
      svc.updateUserSettings("u1", {
        // @ts-expect-error intentionally invalid for test
        defaultSummaryFormat: "bad_format",
      })
    ).rejects.toMatchObject({
      code: "INVALID_SUMMARY_FORMAT",
      status: 400,
    });

    expect(repo.upsertCalls).toBe(0);
  });

  it("updateUserSettings: empty input returns current settings (no upsert)", async () => {
    const repo = new InMemorySettingsRepo();
    repo.stored = { aiEnabled: true, defaultSummaryFormat: "study_notes" };

    const svc = new SettingsService(repo);
    const out = await svc.updateUserSettings("u1", {});

    expect(out).toEqual({
      aiEnabled: true,
      defaultSummaryFormat: "study_notes",
    });
    expect(repo.upsertCalls).toBe(0);
    // لكنه يستدعي getUserSettings داخليًا
    expect(repo.getCalls).toBe(1);
  });

  it("updateUserSettings: partial update updates only provided fields", async () => {
    const repo = new InMemorySettingsRepo();
    repo.stored = { aiEnabled: false, defaultSummaryFormat: "bullet_points" };

    const svc = new SettingsService(repo);

    const out1 = await svc.updateUserSettings("u1", { aiEnabled: true });
    expect(out1).toEqual({
      aiEnabled: true,
      defaultSummaryFormat: "bullet_points",
    });

    const out2 = await svc.updateUserSettings("u1", {
      defaultSummaryFormat: "paragraph",
    });
    expect(out2).toEqual({
      aiEnabled: true,
      defaultSummaryFormat: "paragraph",
    });

    expect(repo.upsertCalls).toBe(2);
  });
});
