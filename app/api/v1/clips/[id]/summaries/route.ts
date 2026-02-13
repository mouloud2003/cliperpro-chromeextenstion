import { NextResponse } from "next/server";
import { PrismaSummaryRepository } from "@/infra/prisma/repos/summaryrepo";
import { AppError } from "@/core/applicationlogique/errors";
import { requireUser } from "@/infra/auth/requireUser";
import type { SummaryDTO, SummaryFormat } from "@/core/domain/types";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireUser();
    const clipId = (await ctx.params).id;
    const summaryRepo = new PrismaSummaryRepository();

    const rows = await summaryRepo.findAllByClipId(clipId, user.id);

    // Convert to SummaryDTO map keyed by format
    const summaries: Partial<Record<SummaryFormat, SummaryDTO>> = {};
    for (const r of rows) {
      summaries[r.format] = {
        clipId: r.clipId,
        format: r.format,
        title: r.title,
        body: r.body,
        createdAt: r.createdAt.toISOString(),
        fromCache: true,
      };
    }

    return NextResponse.json({ ok: true, summaries }, { status: 200 });
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
