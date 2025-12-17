import type { IUserSettingsRepository } from "../../ports/repos";
import type { SummaryFormat, UserSettingsDTO } from "../../domain/types";
import { AppError } from "../errors";
import { isSummaryFormat, DEFAULT_SETTINGS } from "../utils/normalisetext";

export class SettingsService {
  constructor(private settingsRepo: IUserSettingsRepository) {}

  async getUserSettings(userId: string): Promise<UserSettingsDTO> {
    const setting = await this.settingsRepo.get(userId);
    if (setting) return setting;
    // Ensure settings exist (create defaults on first read)
    return await this.settingsRepo.upsert(userId, DEFAULT_SETTINGS);
  }

  async updateUserSettings(
    userId: string,
    input: Partial<UserSettingsDTO>
  ): Promise<UserSettingsDTO> {
    // Validate input summary format if provided
    if (
      input.defaultSummaryFormat !== undefined &&
      !isSummaryFormat(input.defaultSummaryFormat)
    ) {
      throw new AppError(
        "INVALID_SUMMARY_FORMAT",
        400,
        "Invalid summary format"
      );
    }

    // If no changes provided, return current settings
    if (
      input.aiEnabled === undefined &&
      input.defaultSummaryFormat === undefined
    ) {
      return await this.getUserSettings(userId);
    }

    return await this.settingsRepo.upsert(userId, input);
  }
}
