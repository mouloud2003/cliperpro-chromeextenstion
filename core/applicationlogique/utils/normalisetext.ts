//  create utility functions for text normalization and validation
import { AppError } from "../errors";
//cheking max length of text and normalising it
export const MAX_TEXT_LENGTH = 20000;
// Function to normalize text // normalisation means removing unwanted characters and trimming whitespace
export function normalizeText(text: string): string {
  // Remove null characters, excessive whitespace, and trim
  return text
    .replace(/\u0000/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
// Function to validate text // validation means checking if the text meets certain lowgical conditions
export function validateClipText(text: string) {
  // Validate text presence and length
  if (!text || text.trim().length === 0) {
    throw new AppError("VALIDATION_ERROR", 400, "Text is required");
  }
  // Validate text length
  if (text.length > MAX_TEXT_LENGTH) {
    throw new AppError(
      "VALIDATION_ERROR",
      400,
      `Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters`
    );
  }
}
