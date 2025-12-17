import type {
  IAIClient,
  SummarizeInput,
  SummarizeOutput,
} from "@/core/ports/ai";

// MockAIClient is a mock implementation of the IAIClient interface
// it simulates AI summarization for testing purposes
export class MockAIClient implements IAIClient {
  async summarize(input: SummarizeInput): Promise<SummarizeOutput> {
    const halfLength = Math.floor(input.text.length / 2);
    const snippet = input.text.slice(0, halfLength);

    return {
      title: `Mock Summary (${input.format})`,
      body: `This is a mock summary.\n\nPreview: ${snippet}...`,
      model: process.env.AI_MODEL || "mock-model",
    };
  }
}
