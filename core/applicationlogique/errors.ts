// step 2 : create custom error classes
import { ErrorCode } from "../domain/types";
export class AppError extends Error {
  constructor(public code: ErrorCode, public status: number, message?: string) {
    super(message ?? code);
    this.name = "AppError";
  }
}
/* these error codes can be used in exceptions and error responses
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
  | "AI_PROVIDER_ERROR"; */
// Specific error classes
// here examples for validation errors im not using them now but they can be useful later
/*export class VALIDATION_ERROR extends AppError {
  constructor(code: ErrorCode, message?: string) {
    super(code, 400, message);
    this.name = "VALIDATION_ERROR";
  }
}*/
