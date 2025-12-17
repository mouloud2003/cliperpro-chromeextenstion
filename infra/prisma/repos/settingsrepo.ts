import { prisma } from "../client";
import type { IUserSettingsRepository } from "@/core/ports/repos";
import type { UserSettingsDTO } from "@/core/domain/types";

export class PrismaSettingRepository implements IUserSettingsRepository {
  async get(userId: string): Promise<UserSettingsDTO | null> {
    const setting = await prisma.userSettings.findUnique({
      where: { userId },
      select: { aiEnabled: true, defaultSummaryFormat: true },
    });

    if (!setting) return null;

    return {
      aiEnabled: setting.aiEnabled,
      defaultSummaryFormat: setting.defaultSummaryFormat,
    };
  }

  async upsert(
    userId: string,
    input: Partial<UserSettingsDTO>
  ): Promise<UserSettingsDTO> {
    const updated = await prisma.userSettings.upsert({
      where: { userId },
      create: {
        userId,
        aiEnabled: input.aiEnabled ?? false,
        defaultSummaryFormat: input.defaultSummaryFormat ?? "bullet_points",
      },
      update: {
        ...(input.aiEnabled !== undefined
          ? { aiEnabled: input.aiEnabled }
          : {}),
        ...(input.defaultSummaryFormat !== undefined
          ? { defaultSummaryFormat: input.defaultSummaryFormat }
          : {}),
      },
      select: { aiEnabled: true, defaultSummaryFormat: true },
    });

    return {
      aiEnabled: updated.aiEnabled,
      defaultSummaryFormat: updated.defaultSummaryFormat,
    };
  }
}
