import { prisma } from "../client";
import type { IClipSummaryRepository } from "@/core/ports/repos";
import type { SummaryFormat, ClipSummaryRow } from "@/core/domain/types";
export class PrismaSummaryRepository implements IClipSummaryRepository {
  async findLatestByClipAndFormat(params: {
    clipId: string;
    userId: string;
    format: SummaryFormat;
    inputHash: string;
  }): Promise<ClipSummaryRow | null> {
    const row = await prisma.clipSummary.findFirst({
      where: {
        clipId: params.clipId,
        userId: params.userId,
        format: params.format,
        inputHash: params.inputHash,
        model: process.env.AI_MODEL || "default-model",
        promptVersion: Number(process.env.PROMPT_VERSION) || 1,
        status: "completed",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        clipId: true,
        userId: true,
        format: true,
        summaryTitle: true,
        summaryBody: true,
        createdAt: true,
        model: true,
        promptVersion: true,
      },
    });

    if (!row) {
      return null;
    }
    return {
      title: row.summaryTitle || undefined,
      id: row.id,
      clipId: row.clipId,
      userId: row.userId,
      format: row.format as SummaryFormat,
      body: row.summaryBody,
      createdAt: row.createdAt,
      model: row.model,
      promptVersion: row.promptVersion,
    };
  }
  async create(params: {
    clipId: string;
    userId: string;
    format: SummaryFormat;
    model: string; // AI model used for summarization
    promptVersion: number; // version of the prompt used
    inputHash?: string; // hash of text+format (for more accurate tracking/caching)
    title?: string;
    body: string;
  }): Promise<ClipSummaryRow> {
    const row = await prisma.clipSummary.create({
      data: {
        clipId: params.clipId,
        userId: params.userId,
        format: params.format,
        summaryTitle: params.title,
        summaryBody: params.body,
        model: params.model,
        promptVersion: params.promptVersion,
        inputHash: params.inputHash ?? "",
      },
      select: {
        id: true,
        clipId: true,
        userId: true,
        format: true,
        summaryTitle: true,
        summaryBody: true,
        createdAt: true,
        model: true,
        promptVersion: true,
      },
    });
    return {
      id: row.id,
      clipId: row.clipId,
      userId: row.userId,
      format: row.format as SummaryFormat,
      body: row.summaryBody,
      createdAt: row.createdAt,
      model: row.model,
      promptVersion: row.promptVersion,
    };
  }
}
