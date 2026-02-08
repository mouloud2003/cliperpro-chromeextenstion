import { NextResponse, NextRequest } from "next/server";
import { PrismaSettingRepository } from "@/infra/prisma/repos/settingsrepo";
import { SettingsService } from "@/core/applicationlogique/services/settingservice";
import { z } from "zod";
import { AppError } from "@/core/applicationlogique/errors";
import { requireUser } from "@/infra/auth/requireUser";
export const runtime = "nodejs";
// Zod schema to validate the body of the update settings request
const SummaryFormatSchema = z.enum([
  "paragraph",
  "bullet_points",
  "study_notes",
]);
const UpdateSettingsSchema = z.object({
  aiEnabled: z.boolean().optional(),
  defaultSummaryFormat: SummaryFormatSchema.optional(),
});

function makeSettingsService() {
  return new SettingsService(new PrismaSettingRepository());
}
const settingsService = makeSettingsService();

export async function GET() {
  try {
    const user = await requireUser();
    const userId = user.id;
    const settings = await settingsService.getUserSettings(userId);
    return NextResponse.json({ ok: true, settings }, { status: 200 });
  } catch (e: unknown) {
    if (e instanceof AppError) {
      return NextResponse.json(
        { ok: false, code: e.code, message: e.message },
        { status: e.status },
      );
    }
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    const user = await requireUser();
    const userId = user.id;
    const body = await request.json();
    // Validate request body
    const parsedBody = UpdateSettingsSchema.parse(body);
    const updatedSettings = await settingsService.updateUserSettings(
      userId,
      parsedBody,
    );
    return NextResponse.json(
      { ok: true, settings: updatedSettings },
      { status: 200 },
    );
  } catch (e) {
    // error handling
    // known application error
    // instanceof means checking if the error object e is created from the AppError class defined in core/applicationlogique/errors.ts
    if (e instanceof AppError) {
      return NextResponse.json(
        { ok: false, code: e.code, message: e.message },
        { status: e.status },
      );
    }

    // validation error from zod
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, code: "INVALID_BODY", issues: e.issues },
        { status: 400 },
      );
    }

    // unknown error
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
