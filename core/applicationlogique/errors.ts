// step 2 : create custom error classes
import { ErrorCode } from "../domain/types";
export class AppError extends Error {
  constructor(public code: ErrorCode, public status: number, message?: string) {
    super(message ?? code);
    this.name = "AppError";
  }
}
// Specific error classes
// here examples for validation errors im not using them now but they can be useful later
/*export class VALIDATION_ERROR extends AppError {
  constructor(code: ErrorCode, message?: string) {
    super(code, 400, message);
    this.name = "VALIDATION_ERROR";
  }
}*/
