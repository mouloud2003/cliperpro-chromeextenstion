//  define AI client interface that any AI service client must implement
// to provide text summarization functionality
import type { SummaryFormat } from "../domain/types";
// IAIClient interface with a summarize method
export interface IAIClient {
  summarize(params: {
    text: string;
    format: SummaryFormat;
    language?: string; // summary language (optional)
  }): Promise<{ title?: string; body: string; model: string }>;
}
