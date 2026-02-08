import { NextResponse } from "next/server";
import { AppError } from "@/core/applicationlogique/errors";
import { PrismaUsageRepository } from "@/infra/prisma/repos/usagerepo";
import { UsageService } from "@/core/applicationlogique/services/usageservice";
import { requireUser } from "@/infra/auth/requireUser";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireUser();
    const userId = user.id;
    const usageService = new UsageService(new PrismaUsageRepository());
    const usage = await usageService.getCurrentUsage(userId);

    return NextResponse.json({ ok: true, usage }, { status: 200 });
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
