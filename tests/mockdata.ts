import type {
  IAIClient,
  SummarizeInput,
  SummarizeOutput,
} from "@/core/ports/ai";
import type {
  IClipRepository,
  IClipSummaryRepository,
  IUserSettingsRepository,
  IUsageRepository,
} from "@/core/ports/repos";
import type { SummaryFormat, UserSettingsDTO } from "@/core/domain/types";

// ---- Fake AI ----
export class MockAIClient implements IAIClient {
  public calls = 0;

  async summarize(input: SummarizeInput): Promise<SummarizeOutput> {
    this.calls++;
    const preview = input.text.slice(0, 20).replace(/\s+/g, " ");
    return {
      title: `Mock Summary (${input.format})`,
      body: `This is a mock summary.\n\nPreview: ${preview}...`,
      model: "mock-model",
    };
  }
}

// ---- Fake Clip Repo ----
type ClipRow = {
  id: string;
  userId: string;
  text: string;
  title?: string | null;
  url?: string | null;
  createdAt: Date;
};

export class FakeClipRepo implements IClipRepository {
  private byId = new Map<string, ClipRow>();

  seed(clip: ClipRow) {
    this.byId.set(clip.id, clip);
  }

  async create(
    userId: string,
    input: { text: string; title?: string; url?: string },
  ) {
    const id = `clip_${Math.random().toString(16).slice(2)}`;
    const row: ClipRow = {
      id,
      userId,
      text: input.text,
      title: input.title ?? null,
      url: input.url ?? null,
      createdAt: new Date(),
    };
    this.byId.set(id, row);
    return { id };
  }

  async findManyByUserId(userId: string, limit: number) {
    const all = [...this.byId.values()].filter((c) => c.userId === userId);
    return all
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit)
      .map((c) => ({
        id: c.id,
        title: c.title ?? undefined,
        url: c.url ?? undefined,
        textPreview: c.text.slice(0, 40),
        createdAt: c.createdAt.toISOString(),
      }));
  }

  async getById(clipId: string) {
    const c = this.byId.get(clipId);
    if (!c) return null;
    return {
      id: c.id,
      userId: c.userId,
      title: c.title ?? undefined,
      url: c.url ?? undefined,
      text: c.text,
      createdAt: c.createdAt.toISOString(),
    };
  }
}

// ---- Fake Settings Repo ----
export class FakeSettingsRepo implements IUserSettingsRepository {
  private map = new Map<string, UserSettingsDTO>();

  seed(userId: string, s: UserSettingsDTO) {
    this.map.set(userId, s);
  }

  async get(userId: string) {
    return this.map.get(userId) ?? null;
  }

  async upsert(userId: string, input: Partial<UserSettingsDTO>) {
    const cur = this.map.get(userId) ?? {
      aiEnabled: false,
      defaultSummaryFormat: "bullet_points" as SummaryFormat,
    };
    const next: UserSettingsDTO = {
      aiEnabled: input.aiEnabled ?? cur.aiEnabled,
      defaultSummaryFormat:
        input.defaultSummaryFormat ?? cur.defaultSummaryFormat,
    };
    this.map.set(userId, next);
    return next;
  }
}

// ---- Fake Usage Repo ----
type UsageRow = { monthStart: Date; summaryCount: number; limit: number };

export class FakeUsageRepo implements IUsageRepository {
  public consumeCalls = 0;
  private map = new Map<string, UsageRow>();

  private key(userId: string, monthStart: Date) {
    return `${userId}:${monthStart.toISOString()}`;
  }

  async getOrCreateMonth(userId: string, monthStart: Date): Promise<UsageRow> {
    const k = this.key(userId, monthStart);
    const existing = this.map.get(k);
    if (existing) return existing;

    const created: UsageRow = { monthStart, summaryCount: 0, limit: 100 };
    this.map.set(k, created);
    return created;
  }

  async tryConsumeSummary(
    userId: string,
    monthStart: Date,
  ): Promise<UsageRow | null> {
    this.consumeCalls++;
    const row = await this.getOrCreateMonth(userId, monthStart);
    if (row.summaryCount >= row.limit) return null;
    row.summaryCount += 1;
    return row;
  }
}

// ---- Fake Summary Repo ----
type SummaryRow = {
  id: string;
  userId: string;
  clipId: string;
  format: SummaryFormat;
  inputHash: string;
  title?: string | null;
  body: string;
  model: string;
  promptVersion: number;
  createdAt: Date;
};

export class FakeSummaryRepo implements IClipSummaryRepository {
  private rows: SummaryRow[] = [];

  seedCached(row: {
    userId: string;
    clipId: string;
    format: SummaryFormat;
    inputHash: string;
    title?: string;
    body: string;
    model?: string;
    promptVersion?: number;
  }) {
    this.rows.push({
      id: `summary_${Math.random().toString(16).slice(2)}`,
      userId: row.userId,
      clipId: row.clipId,
      format: row.format,
      inputHash: row.inputHash,
      title: row.title ?? null,
      body: row.body,
      model: row.model ?? "mock-model",
      promptVersion: row.promptVersion ?? 1,
      createdAt: new Date(),
    });
  }

  async findAllByClipId(clipId: string, userId: string) {
    return this.rows
      .filter((r) => r.clipId === clipId && r.userId === userId)
      .map((r) => ({
        id: r.id,
        userId: r.userId,
        clipId: r.clipId,
        format: r.format,
        model: r.model,
        promptVersion: r.promptVersion,
        inputHash: r.inputHash,
        title: r.title ?? undefined,
        body: r.body,
        createdAt: r.createdAt,
      }));
  }

  async findLatestByClipAndFormat(q: {
    userId: string;
    clipId: string;
    format: SummaryFormat;
    inputHash: string;
  }) {
    const hit = [...this.rows]
      .filter(
        (r) =>
          r.userId === q.userId &&
          r.clipId === q.clipId &&
          r.format === q.format &&
          r.inputHash === q.inputHash,
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

    if (!hit) return null;

    return {
      id: hit.id,
      userId: hit.userId,
      clipId: hit.clipId,
      format: hit.format,
      model: hit.model,
      promptVersion: hit.promptVersion,
      inputHash: hit.inputHash,
      title: hit.title ?? undefined,
      body: hit.body,
      createdAt: hit.createdAt,
    };
  }

  async create(input: {
    userId: string;
    clipId: string;
    format: SummaryFormat;
    inputHash: string;
    title?: string;
    body: string;
    model: string;
    promptVersion: number;
  }) {
    const row: SummaryRow = {
      id: `summary_${Math.random().toString(16).slice(2)}`,
      userId: input.userId,
      clipId: input.clipId,
      format: input.format,
      inputHash: input.inputHash,
      title: input.title ?? null,
      body: input.body,
      model: input.model,
      promptVersion: input.promptVersion,
      createdAt: new Date(),
    };
    this.rows.push(row);

    return {
      id: row.id,
      userId: row.userId,
      clipId: row.clipId,
      format: row.format,
      model: row.model,
      promptVersion: row.promptVersion,
      inputHash: row.inputHash,
      title: row.title ?? undefined,
      body: row.body,
      createdAt: row.createdAt,
    };
  }
}
