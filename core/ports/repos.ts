//  define repository interfaces
// IClipRepository means "Interface for Clip Repository" ClipRepository is a class that implements this interface I stands for interface
import type {
  ClipDTO,
  ClipDetailDTO,
  CreateClipInput,
  SummaryDTO,
  SummaryFormat,
  UsageRow,
  UserSettingsDTO,
} from "../domain/types";

// interface for Clip repository any object that implements IClipRepository must provide these methods
// to create, find, and get clips
export interface IClipRepository {
  // create a new clip and return its id here we define that the method is async and returns a promise that resolves to an object with an id property of type string
  create(userId: string, input: CreateClipInput): Promise<{ id: string }>;

  // find clips by user id with a limit on the number of clips returned
  findManyByUserId(userId: string, limit: number): Promise<ClipDTO[]>;

  // get full clip (with userId) for ownership check and summarization
  getById(clipId: string): Promise<ClipDetailDTO | null>;
}

// interface for Summary repository any object that implements IClipSummaryRepository must provide these methods
// to find and create summaries
export interface IClipSummaryRepository {
  // find the latest summary for a given clipId, userId, and format
  findLatestByClipAndFormat(params: {
    clipId: string;
    userId: string;
    format: SummaryFormat;
  }): Promise<SummaryDTO | null>;

  // create a new summary for a clip
  create(params: {
    clipId: string;
    userId: string;
    format: SummaryFormat;
    model: string; // AI model used for summarization
    promptVersion: number; // version of the prompt used
    inputHash: string; // hash of text+format (for more accurate tracking/caching)
    title?: string;
    body: string;
  }): Promise<void>;
}

// interface for User Settings repository any object that implements IUserSettingsRepository must provide these methods
// to get and upsert user settings
export interface IUserSettingsRepository {
  get(userId: string): Promise<UserSettingsDTO | null>;

  // upsert: if not present, create; if present, update
  upsert(
    userId: string,
    input: Partial<UserSettingsDTO> // partial means not all fields are required which means we can update only some fields
  ): Promise<UserSettingsDTO>;
}

// interface for Usage repository any object that implements IUsageRepository must provide these methods
// Responsible for tracking monthly usage (quota)
export interface IUsageRepository {
  getOrCreateMonth(userId: string, monthStart: Date): Promise<UsageRow>;

  // Try to consume one summary from the user's monthly quota
  // Returns the updated UsageRow if successful, or null if quota exceeded
  tryConsumeSummary(userId: string, monthStart: Date): Promise<UsageRow | null>;
}
