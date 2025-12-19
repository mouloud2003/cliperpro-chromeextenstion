import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { UsageService } from "../../core/applicationlogique/services/usageservice";
import type { IUsageRepository } from "../../core/ports/repos";
import { AppError } from "../../core/applicationlogique/errors";

type UsageRow = { monthStart: Date; summaryCount: number; limit: number };

class InMemoryUsageRepo implements IUsageRepository {
  public consumeCalls = 0;
  public lastMonthStart: Date | null = null;
  private map = new Map<string, UsageRow>();

  private key(userId: string, monthStart: Date) {
    return `${userId}:${monthStart.toISOString()}`;
  }

  async getOrCreateMonth(userId: string, monthStart: Date): Promise<UsageRow> {
    this.lastMonthStart = monthStart;

    const k = this.key(userId, monthStart);
    const existing = this.map.get(k);
    if (existing) return existing;

    const created: UsageRow = { monthStart, summaryCount: 0, limit: 100 };
    this.map.set(k, created);
    return created;
  }

  async tryConsumeSummary(
    userId: string,
    monthStart: Date
  ): Promise<UsageRow | null> {
    this.consumeCalls++;
    const row = await this.getOrCreateMonth(userId, monthStart);
    if (row.summaryCount >= row.limit) return null;

    row.summaryCount += 1;
    return row;
  }

  // helper للـ tests
  seed(userId: string, monthStart: Date, row: UsageRow) {
    this.map.set(this.key(userId, monthStart), row);
  }
}

describe("UsageService", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("getCurrentUsage creates the month row and returns remaining correctly", async () => {
    // ثابت الزمن
    vi.setSystemTime(new Date("2025-12-19T10:30:00.000Z"));

    const repo = new InMemoryUsageRepo();
    const svc = new UsageService(repo);

    const out = await svc.getCurrentUsage("u1");

    expect(out.monthStart).toBe("2025-12-01T00:00:00.000Z");
    expect(out.summaryCount).toBe(0);
    expect(out.limit).toBe(100);
    expect(out.remaining).toBe(100);

    // getCurrentUsage لا يستهلك quota
    expect(repo.consumeCalls).toBe(0);
  });

  it("consumeOneSummary increments summaryCount and decreases remaining", async () => {
    vi.setSystemTime(new Date("2025-12-19T10:30:00.000Z"));

    const repo = new InMemoryUsageRepo();
    const svc = new UsageService(repo);

    const a = await svc.consumeOneSummary("u1");
    expect(a.summaryCount).toBe(1);
    expect(a.remaining).toBe(99);

    const b = await svc.consumeOneSummary("u1");
    expect(b.summaryCount).toBe(2);
    expect(b.remaining).toBe(98);

    expect(repo.consumeCalls).toBe(2);
  });

  it("consumeOneSummary throws QUOTA_EXCEEDED when limit is reached and does not go negative", async () => {
    vi.setSystemTime(new Date("2025-12-19T10:30:00.000Z"));

    const repo = new InMemoryUsageRepo();
    const svc = new UsageService(repo);

    const monthStart = new Date(Date.UTC(2025, 11, 1, 0, 0, 0, 0)); // Dec = 11

    // نخلي المستخدم وصل الحد (limit=1, summaryCount=1)
    repo.seed("u1", monthStart, {
      monthStart,
      summaryCount: 1,
      limit: 1,
    });

    await expect(svc.consumeOneSummary("u1")).rejects.toMatchObject({
      code: "QUOTA_EXCEEDED",
      status: 429,
    });
  });

  it("remaining is clamped to 0 when summaryCount > limit (defensive)", async () => {
    vi.setSystemTime(new Date("2025-12-19T10:30:00.000Z"));

    const repo = new InMemoryUsageRepo();
    const svc = new UsageService(repo);

    const monthStart = new Date(Date.UTC(2025, 11, 1, 0, 0, 0, 0));

    // حالة دفاعية: DB فيها قيمة غلط (أو bug قديم)
    repo.seed("u1", monthStart, {
      monthStart,
      summaryCount: 150,
      limit: 100,
    });

    const out = await svc.getCurrentUsage("u1");
    expect(out.remaining).toBe(0);
  });
});
