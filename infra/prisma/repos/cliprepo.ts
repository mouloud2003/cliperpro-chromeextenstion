// here we implement the clip repository using Prisma ORM
// this class implements the IClipRepository interface
import { prisma } from "../client";
import type { IClipRepository } from "@/core/ports/repos";
import type {
  ClipDTO,
  ClipDetailDTO,
  CreateClipInput,
} from "@/core/domain/types";

// Prisma implementation of the IClipRepository
// this class interacts with the database using Prisma ORM
// implement means we should have the methods defined in the IClipRepository interface
export class ClipRepoPrisma implements IClipRepository {
  async create(
    userId: string,
    input: CreateClipInput,
  ): Promise<{ id: string }> {
    const clip = await prisma.clip.create({
      data: {
        userId,
        text: input.text,
        url: input.url ?? null,
        title: input.title ?? null,
        sourceId: input.sourceId ?? null,
      },
      select: { id: true },
    });

    return { id: clip.id };
  }

  async findManyByUserId(userId: string, limit: number): Promise<ClipDTO[]> {
    const rows = await prisma.clip.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        url: true,
        text: true,
        createdAt: true,
        _count: { select: { summaries: true } },
      },
    });

    return rows.map((r) => ({
      id: r.id,
      title: r.title ?? undefined,
      url: r.url ?? undefined,
      textPreview: r.text.slice(0, 220),
      createdAt: r.createdAt.toISOString(),
      hasAiSummary: r._count.summaries > 0,
    }));
  }

  async getById(clipId: string): Promise<ClipDetailDTO | null> {
    const r = await prisma.clip.findUnique({
      where: { id: clipId },
      select: {
        id: true,
        userId: true,
        title: true,
        url: true,
        text: true,
        createdAt: true,
      },
    });

    if (!r) return null;

    return {
      id: r.id,
      userId: r.userId,
      title: r.title ?? undefined,
      url: r.url ?? undefined,
      text: r.text,
      createdAt: r.createdAt.toISOString(),
    };
  }
}
