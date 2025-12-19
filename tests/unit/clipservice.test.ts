import { describe, it, expect, vi } from "vitest";

import { ClipService } from "../../core/applicationlogique/services/clipservice";
import { AppError } from "../../core/applicationlogique/errors";
import type { IClipRepository } from "../../core/ports/repos";
import type { ClipDetailDTO } from "../../core/domain/types";

class InMemoryClipRepo implements IClipRepository {
  public created: Array<{ userId: string; input: any }> = [];
  public lastLimit: number | null = null;

  private clips = new Map<string, ClipDetailDTO>();

  // helpers
  seed(clip: ClipDetailDTO) {
    this.clips.set(clip.id, clip);
  }

  async create(userId: string, input: any): Promise<{ id: string }> {
    this.created.push({ userId, input });

    const id = "clip-1";
    const clip: ClipDetailDTO = {
      id,
      userId,
      text: input.text,
      url: input.url ?? null,
      title: input.title ?? null,
      createdAt: new Date().toISOString(),
    };
    this.clips.set(id, clip);

    return { id };
  }

  async findManyByUserId(userId: string, limit: number) {
    this.lastLimit = limit;

    // رجّع فقط الـ DTO اللي ClipService متوقعه (ClipDTO)
    const all = [...this.clips.values()].filter((c) => c.userId === userId);

    // ClipDTO عندك غالبًا: {id,title,url,textPreview,createdAt}
    // هنا نعمل mapping بسيط؛ لو كان شكل ClipDTO عندك مختلف عدّلها.
    return all.slice(0, limit).map((c) => ({
      id: c.id,
      title: c.title ?? "",
      url: c.url ?? "",
      textPreview: c.text.slice(0, 50),
      createdAt: c.createdAt,
    }));
  }

  async getById(clipId: string): Promise<ClipDetailDTO | null> {
    return this.clips.get(clipId) ?? null;
  }
}

describe("ClipService", () => {
  it("createManualClip normalizes text before saving", async () => {
    const repo = new InMemoryClipRepo();
    const svc = new ClipService(repo);

    await svc.createManualClip("u1", {
      text: "   hello   world   \n\n",
      url: "https://example.com",
      title: "t",
    });

    expect(repo.created.length).toBe(1);
    expect(repo.created[0].userId).toBe("u1");

    // normalizeText: collapse spaces + trim
    expect(repo.created[0].input.text).toBe("hello world");
  });

  it("createManualClip throws VALIDATION_ERROR when text is empty after normalize", async () => {
    const repo = new InMemoryClipRepo();
    const svc = new ClipService(repo);

    await expect(
      svc.createManualClip("u1", {
        text: "   \n   ",
        url: "https://example.com",
        title: "t",
      })
    ).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
      status: 400,
    });

    expect(repo.created.length).toBe(0);
  });

  it("createManualClip throws VALIDATION_ERROR when text exceeds MAX_TEXT_LENGTH", async () => {
    const repo = new InMemoryClipRepo();
    const svc = new ClipService(repo);

    const longText = "a".repeat(20001); // MAX_TEXT_LENGTH = 20000

    await expect(
      svc.createManualClip("u1", {
        text: longText,
        url: "https://example.com",
        title: "t",
      })
    ).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
      status: 400,
    });

    expect(repo.created.length).toBe(0);
  });

  it("getClipDetails throws NOT_FOUND when clip does not exist", async () => {
    const repo = new InMemoryClipRepo();
    const svc = new ClipService(repo);

    await expect(svc.getClipDetails("u1", "missing")).rejects.toMatchObject({
      code: "NOT_FOUND",
      status: 404,
    });
  });

  it("getClipDetails throws FORBIDDEN when clip is not owned by user", async () => {
    const repo = new InMemoryClipRepo();
    const svc = new ClipService(repo);

    repo.seed({
      id: "c1",
      userId: "owner",
      text: "hello",
      url: undefined,
      title: undefined,
      createdAt: new Date().toISOString(),
    });

    await expect(svc.getClipDetails("u1", "c1")).rejects.toMatchObject({
      code: "FORBIDDEN",
      status: 403,
    });
  });

  it("getClipDetails returns clip when owned", async () => {
    const repo = new InMemoryClipRepo();
    const svc = new ClipService(repo);

    const createdAt = new Date("2025-12-01T00:00:00.000Z");

    repo.seed({
      id: "c1",
      userId: "u1",
      text: "hello",
      url: "https://x.com",
      title: "t",
      createdAt: createdAt.toISOString(),
    });

    const clip = await svc.getClipDetails("u1", "c1");
    expect(clip.id).toBe("c1");
    expect(clip.userId).toBe("u1");
    expect(clip.text).toBe("hello");
  });

  it("listUserClips forwards limit to repository (default=50)", async () => {
    const repo = new InMemoryClipRepo();
    const svc = new ClipService(repo);

    await svc.listUserClips("u1");
    expect(repo.lastLimit).toBe(50);
  });

  it("listUserClips forwards custom limit to repository", async () => {
    const repo = new InMemoryClipRepo();
    const svc = new ClipService(repo);

    await svc.listUserClips("u1", 10);
    expect(repo.lastLimit).toBe(10);
  });
});
