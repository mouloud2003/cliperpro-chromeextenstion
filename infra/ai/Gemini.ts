import { GoogleGenAI } from "@google/genai";
import type {
  IAIClient,
  SummarizeInput,
  SummarizeOutput,
} from "@/core/ports/ai";

function buildPrompt(input: SummarizeInput): string {
  const languageRule = `
LANGUAGE RULE:
- Detect the language(s) of the TEXT.
- Write TITLE and BODY in the SAME language as the TEXT (do NOT translate).
- If the text is mixed, use the dominant language of the text.
- Keep technical terms as-is when appropriate.
`.trim();

  const formatRule =
    input.format === "bullet_points"
      ? "Return bullet points. Keep it concise."
      : input.format === "study_notes"
      ? "Return study notes with headings and short explanations."
      : "Return one clear paragraph.";

  // نطلب شكل ثابت حتى نقدر نفصل title/body بسهولة
  return [
    "You are a helpful summarizer.",
    languageRule,
    formatRule,
    "",
    "Return EXACTLY in this format:",
    "TITLE: <short title>",
    "BODY:",
    "<the summary>",
    "",
    "TEXT:",
    input.text,
  ].join("\n");
}

function parseTitleBody(raw: string): { title?: string; body: string } {
  const text = raw.trim();
  const titleMatch = text.match(/^TITLE:\s*(.+)\s*$/m);
  const bodyMatch = text.match(/^BODY:\s*([\s\S]+)$/m);

  const title = titleMatch?.[1]?.trim();
  const body = (bodyMatch?.[1] ?? text).trim();

  return { title: title || undefined, body };
}

export class GeminiAIClient implements IAIClient {
  private ai: GoogleGenAI;
  private model: string;

  constructor(opts?: { apiKey?: string; model?: string }) {
    // يا من env يا تمرير مباشر
    const apiKey =
      opts?.apiKey ?? process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("Missing GEMINI_API_KEY / GOOGLE_API_KEY");

    this.ai = new GoogleGenAI({ apiKey });
    this.model = opts?.model ?? process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  }

  async summarize(input: SummarizeInput): Promise<SummarizeOutput> {
    const prompt = buildPrompt(input);

    try {
      const resp = await this.ai.models.generateContent({
        model: this.model,
        contents: prompt,
      });

      const rawText = (resp.text ?? "").trim();
      if (!rawText) throw new Error("Empty response from Gemini");

      const { title, body } = parseTitleBody(rawText);
      return { title, body, model: this.model };
    } catch (e: unknown) {
      const error = e as Error & { status?: number };
      console.error("GEMINI_ERROR", {
        name: error?.name,
        status: error?.status,
        message: error?.message,
      });
      throw e; // خلّه يطلع للـ SummaryService مؤقتًا
    }
  }
}
