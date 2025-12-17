import { SummaryFormat } from "../domain/types";
export type SummarizeInput = {
  text: string;
  format: SummaryFormat;
  language?: string;
};

export type SummarizeOutput = {
  title?: string;
  body: string;
  model: string;
};

export interface IAIClient {
  summarize(input: SummarizeInput): Promise<SummarizeOutput>;
}
