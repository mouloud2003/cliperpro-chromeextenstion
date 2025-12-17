import type { SummaryFormat, UserSettingsDTO } from "../../domain/types";
import type { IAIClient } from "../../ports/ai";
import type { IClipSummaryRepository } from "../../ports/repos";
import { AppError } from "../errors";
import { makeSummaryCacheKey } from "../utils/hash"; // عندك hash.ts

import { SettingsService } from "./settingservice";
import { UsageService } from "./usageservice";
import { ClipService } from "./clipservice";
import { ca } from "zod/locales";

export class SummaryService {
  constructor(
    private clipService: ClipService,
    private settingsService: SettingsService,
    private usageService: UsageService,
    private summaryRepo: IClipSummaryRepository,
    private aiClient: IAIClient
  ) {}

  async summarizeClip(userId: string, clipId: string, format: SummaryFormat) {
    // 1) ownership + جلب النص
    const clip = await this.clipService.getClipDetails(userId, clipId);
    // لازم تكون عندك دالة ترجع clip أو ترمي NotFound/Forbidden

    // 2) settings
    const settings: UserSettingsDTO =
      await this.settingsService.getUserSettings(userId);
    if (!settings.aiEnabled) {
      throw new AppError("AI_DISABLED", 403, "AI is disabled in settings");
    }

    // 3) inputHash (ثابت)
    const inputHash = makeSummaryCacheKey({
      text: clip.text,
      format,
      model: process.env.AI_MODEL || "default-model",
      promptVersion: Number(process.env.PROMPT_VERSION) || 1,
    });

    // 4) cache check
    // before calling the AI service, we check if we have a cached summary for this clip, user, and format

    const cached = await this.summaryRepo.findLatestByClipAndFormat({
      userId,
      clipId,
      format,
      inputHash,
    });

    if (cached) {
      // return cached summary in DTO format
      return {
        title: cached.title ?? undefined,
        clipId: cached.clipId,
        format: cached.format,
        body: cached.body,
        createdAt: cached.createdAt.toISOString(),
        fromCache: true,
      };
    }
    try {
      // 6) AI call (هنا فقط)
      const out = await this.aiClient.summarize({
        text: clip.text,
        format,
      });

      // 7) create and return summary
      const summary = await this.summaryRepo.create({
        userId,
        clipId,
        format,
        model: process.env.AI_MODEL || "default-model",
        promptVersion: Number(process.env.PROMPT_VERSION) || 1,
        inputHash,
        title: out.title,
        body: out.body,
      });
      // 5) quota consume (atomic)  atomic means that the database operation is done in a way that ensures data integrity even in concurrent scenarios
      await this.usageService.consumeOneSummary(userId);

      // 8) return DTO
      return {
        title: summary.title ?? undefined,
        clipId: summary.clipId,
        format: summary.format as SummaryFormat,
        body: summary.body,
        createdAt: summary.createdAt.toISOString(),
        fromCache: false,
      };
    } catch (e) {
      if (e instanceof AppError) {
        throw e;
      }

      const error = e as Error & { status?: number };
      console.error("GEMINI_ERROR", {
        name: error?.name,
        status: error?.status,
        message: error?.message,
      });
      throw e; // خلّه يطلع للـ SummaryService مؤقتًا
    }
  }
}
