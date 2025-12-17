import { createHash } from "node:crypto";
import type { CacheKeyParams } from "../../domain/types";
// key is used to generate cache keys for summary caching
// we use a key version to allow future changes to the key structure without breaking existing cache entries
const KEY_VERSION = 1;

export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function canonicalizeText(text: string): string {
  return text
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .normalize("NFKC")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .join("\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

export function makeSummaryCacheKey(p: CacheKeyParams): string {
  const canon = canonicalizeText(p.text);
  const key = `v${KEY_VERSION}|${p.promptVersion}|${p.format}|${
    p.language ?? ""
  }|${canon}`;
  return sha256(key);
}
