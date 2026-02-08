// step 1 we define types used across all the application
import "next-auth";
// first we define the summary formats available
export type SummaryFormat = "paragraph" | "bullet_points" | "study_notes";
// then we define the input type for creating a clip
export type CreateClipInput = {
  text: string;
  url?: string;
  title?: string;
  sourceId?: string | null;
};
// then we define the data transfer objects (DTOs) for various entities the clip object that containe the data should have the following properties
export type ClipDTO = {
  id: string;
  title?: string;
  url?: string;
  textPreview: string;
  createdAt: string;
  hasAiSummary?: boolean;
};
// the clip detail object that contains more detailed information about a specific clip we use it to show the clip detail view in the UI
export type ClipDetailDTO = {
  id: string;
  userId: string;
  title?: string;
  url?: string;
  text: string;
  createdAt: string;
  hasAiSummary?: boolean;
};
// the summary object that contains the summary information for a specific clip
export type SummaryDTO = {
  clipId: string;
  format: SummaryFormat;
  title?: string;
  body: string;
  createdAt: string;
  fromCache: boolean;
};
// the clip summary row object that represents a single row of summary data in the database
export type ClipSummaryRow = {
  id: string;
  clipId: string;
  userId: string;
  format: SummaryFormat;
  title?: string;
  body: string;
  model: string;
  promptVersion: number;
  inputHash?: string;
  createdAt: Date;
};

// the user settings object that contains the user preferences for the application
export type UserSettingsDTO = {
  aiEnabled: boolean;
  defaultSummaryFormat: SummaryFormat;
};
// the usage object that contains information about the user's usage of the application
export type UsageDTO = {
  monthStart: string;
  summaryCount: number;
  limit: number;
  remaining: number;
};
// the usage row object that represents a single row of usage data in the database
export type UsageRow = {
  monthStart: Date;
  summaryCount: number;
  limit: number;
};
// finally we define a generic error code type to standardize error handling across the application
export type CacheKeyParams = {
  text: string;
  format: string;
  language?: string;
  model: string;
  promptVersion: number;
};
// these error codes can be used in exceptions and error responses
export type ErrorCode =
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "BAD_REQUEST"
  | "INTERNAL_SERVER_ERROR"
  | "FORBIDDEN"
  | "VALIDATION_ERROR"
  | "RATE_LIMIT_EXCEEDED"
  | "AI_SERVICE_UNAVAILABLE"
  | "CLIP_CREATION_FAILED"
  | "SUMMARY_GENERATION_FAILED"
  | "INVALID_SUMMARY_FORMAT"
  | "QUOTA_EXCEEDED"
  | "AI_DISABLED"
  | "AI_PROVIDER_ERROR";
