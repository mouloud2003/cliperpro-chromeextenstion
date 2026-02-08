import { NotionCard } from "../components/Clipcard";
import type { ClipDTO } from "../../core/domain/types";

const NOW = Date.now();

export default function Home() {
  const MOCK: ClipDTO[] = [
    {
      id: "1",
      title: "RTL Library Grid — Notion-style calm cards",
      url: "https://www.youtube.com/watch?v=abc",
      textPreview:
        "A reading-first library: subtle borders, low-noise hover, and clear hierarchy for scanning 100+ clips comfortably.",
      createdAt: new Date(NOW - 1000 * 60 * 18).toISOString(),
      hasAiSummary: true,
    },
    {
      id: "2",
      title: "Design notes: less shadow, more clarity",
      url: "https://notion.so/page",
      textPreview:
        "Keep cards quiet. Hover should feel like a gentle focus, not an animation. Typography does most of the work.",
      createdAt: new Date(NOW - 1000 * 60 * 60 * 6).toISOString(),
      hasAiSummary: false,
    },
    {
      id: "3",
      title: "اختبار RTL — تصميم احترافي لمكتبة البطاقات",
      url: "https://example.com/rtl",
      textPreview:
        "هذا مثال لاختبار RTL داخل البطاقة مع بقاء شارة الدومين LTR، ومسافات مريحة للقراءة بدون ازدحام.",
      createdAt: new Date(NOW - 1000 * 60 * 60 * 48).toISOString(),
      hasAiSummary: true,
    },
    {
      id: "4",
      title: "Long title stress test — truncation should feel premium",
      url: "https://really-long-subdomain.example-company.co.uk/articles/123",
      textPreview:
        "Test long domains and long titles. Cards should stay aligned across breakpoints and never overflow or jitter.",
      createdAt: new Date(NOW - 1000 * 60 * 60 * 72).toISOString(),
      hasAiSummary: false,
    },
  ];

  return (
    <div className="main">
      <main className="px-6 pb-10 pt-6">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          dir="ltr"
        >
          {MOCK.map((clip) => (
            <NotionCard key={clip.id} clip={clip} q="" />
          ))}
        </div>
      </main>
    </div>
  );
}
