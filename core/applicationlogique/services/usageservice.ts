import type { IUsageRepository } from "../../ports/repos";
import type { UsageDTO } from "../../domain/types";
import { AppError } from "../errors";

function monthStartUTC(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1, 0, 0, 0, 0));
}

function toDTO(row: {
  monthStart: Date;
  summaryCount: number;
  limit: number;
}): UsageDTO {
  return {
    monthStart: row.monthStart.toISOString(),
    summaryCount: row.summaryCount,
    limit: row.limit,
    remaining: Math.max(0, row.limit - row.summaryCount),
  };
}

export class UsageService {
  constructor(private usageRepo: IUsageRepository) {}

  async getCurrentUsage(userId: string): Promise<UsageDTO> {
    const ms = monthStartUTC(new Date());
    const row = await this.usageRepo.getOrCreateMonth(userId, ms);
    return toDTO(row);
  }

  async consumeOneSummary(userId: string): Promise<UsageDTO> {
    const ms = monthStartUTC(new Date());
    const row = await this.usageRepo.tryConsumeSummary(userId, ms);

    if (!row) {
      throw new AppError(
        "QUOTA_EXCEEDED",
        429,
        "Monthly summary quota exceeded"
      );
    }

    return toDTO(row);
  }
}
