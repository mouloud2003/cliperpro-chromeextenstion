import { prisma } from "../client";
import type { IUsageRepository } from "@/core/ports/repos";
import type {
  UsageRow,
  ClipDTO,
  ClipDetailDTO,
  CreateClipInput,
} from "@/core/domain/types";
export class PrismaUsageRepository implements IUsageRepository {
  async getOrCreateMonth(userId: string, monthStart: Date): Promise<UsageRow> {
    const row = await prisma.usageMonthly.upsert({
      where: { userId_monthStart: { userId, monthStart } },
      create: { userId, monthStart }, // defaults from schema: summaryCount=0, limit=100
      update: {},
      select: { monthStart: true, summaryCount: true, limit: true },
    });

    return {
      monthStart: row.monthStart,
      summaryCount: row.summaryCount,
      limit: row.limit,
    };
  }

  async tryConsumeSummary(
    userId: string,
    monthStart: Date
  ): Promise<UsageRow | null> {
    // ensure row exists for this month
    await this.getOrCreateMonth(userId, monthStart);

    const rows = await prisma.$queryRaw<
      Array<{ monthStart: Date; summaryCount: number; limit: number }>
    >`
      UPDATE "UsageMonthly"
      SET "summaryCount" = "summaryCount" + 1
      WHERE "userId" = ${userId}
        AND "monthStart" = ${monthStart}
        AND "summaryCount" < "limit"
      RETURNING "monthStart", "summaryCount", "limit"
    `;

    if (rows.length === 0) return null;

    const r = rows[0];
    return {
      monthStart: r.monthStart,
      summaryCount: r.summaryCount,
      limit: r.limit,
    };
  }
}
