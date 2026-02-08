import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ClipRepoPrisma } from "@/infra/prisma/repos/cliprepo";
import { PrismaSettingRepository } from "@/infra/prisma/repos/settingsrepo";
import { PrismaUsageRepository } from "@/infra/prisma/repos/usagerepo";
import { PrismaSummaryRepository } from "@/infra/prisma/repos/summaryrepo";
import { ClipService } from "@/core/applicationlogique/services/clipservice";
import { SettingsService } from "@/core/applicationlogique/services/settingservice";
import { UsageService } from "@/core/applicationlogique/services/usageservice";
import { SummaryService } from "@/core/applicationlogique/services/summaryservice";
import { GeminiAIClient } from "@/infra/ai/Gemini";
import { AppError } from "@/core/applicationlogique/errors";
import { requireUser } from "@/infra/auth/requireUser";
export const runtime = "nodejs";

// body schema
const SummaryFormatSchema = z.enum([
  "paragraph",
  "bullet_points",
  "study_notes",
]);
const BodySchema = z.object({
  format: SummaryFormatSchema,
});
export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireUser();
    const userId = user.id;
    const clipId = (await ctx.params).id;

    const body = await req.json();
    const parsed = BodySchema.parse(body);
    // init services
    // 1 create object clipservice to get clip details by id and onwership
    const clipService = new ClipService(new ClipRepoPrisma());
    // create object summaryservice to check if ai is enabled in settings and to create summary
    const settingsService = new SettingsService(new PrismaSettingRepository());
    // create object usage service to check and consume usage quota
    const usageService = new UsageService(new PrismaUsageRepository());
    // create object summary repo to let summary service interact with db
    const summaryRepo = new PrismaSummaryRepository();
    // create mock ai client to let summary service generate summary
    const aiClient = new GeminiAIClient();
    // create summary service
    const summaryService = new SummaryService(
      clipService,
      settingsService,
      usageService,
      summaryRepo,
      aiClient,
    );
    const result = await summaryService.summarizeClip(
      userId,
      clipId,
      parsed.format,
    );

    return NextResponse.json({ ok: true, summary: result }, { status: 200 });
  } catch (e: unknown) {
    if (e instanceof AppError) {
      return NextResponse.json(
        { ok: false, code: e.code, message: e.message },
        { status: e.status },
      );
    }

    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, code: "INVALID_BODY", issues: e.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
