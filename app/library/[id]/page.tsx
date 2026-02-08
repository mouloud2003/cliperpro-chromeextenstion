"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import ContentAiTabsPro from "@/app/components/ContentAiTabsPro";
import ClipContentSheet from "@/app/components/clipcontent";
import AiSummaryPanel from "@/app/components/Aiworkspace";

import type {
  ClipDetailDTO,
  SummaryDTO,
  SummaryFormat,
} from "@/core/domain/types";

// ---------- helpers ----------
function timeAgoAr(iso: string) {
  const t = new Date(iso).getTime();
  const diff = Date.now() - t;
  const mins = Math.max(1, Math.floor(diff / 60000));
  if (mins < 60) return `منذ ${mins} دقيقة`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `منذ ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  return `منذ ${days} يوم`;
}

function makeMockSummary(clipId: string, format: SummaryFormat): SummaryDTO {
  const title =
    format === "paragraph"
      ? "تلخيص شامل"
      : format === "bullet_points"
        ? "نقاط مركزة"
        : "دراسة";

  const body =
    format === "paragraph"
      ? `هذا تلخيص تجريبي للمقال.\n\nالهدف فقط اختبار الواجهة بدون API.`
      : format === "bullet_points"
        ? `• هذه نقطة أولى تجريبية\n• هذه نقطة ثانية\n• هذه نقطة ثالثة`
        : `1) الفكرة الرئيسية: ...\n2) مفاهيم مهمة: ...\n3) أسئلة مراجعة: ...\n4) خلاصة: ...`;

  return {
    clipId,
    format,
    title,
    body,
    createdAt: new Date().toISOString(),
    fromCache: false,
  };
}

// ---------- mock data ----------
const MOCK_CLIPS: ClipDetailDTO[] = [
  {
    id: "1",
    userId: "u1",
    title: "مستقبل الذكاء الاصطناعي في التعليم: فرص وتحديات",
    url: "https://example.com/ai-education",
    text: `يشهد قطاع التعليم تحولًا جذريًا بفضل تطور تقنيات الذكاء الاصطناعي.\n\nمن أبرز الاستخدامات: التعلّم التكيفي، التصحيح الآلي، وتحليل أداء الطلاب.\n\nلكن توجد تحديات مثل الخصوصية والتحيز وجودة البيانات.`,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    hasAiSummary: false,
  },
  {
    id: "2",
    userId: "u1",
    title: "كيف تبني نظام ملاحظات فعّال مثل Notion",
    url: "https://example.com/notes-system",
    text: `النظام الجيد للملاحظات يعتمد على البساطة.\n\nابدأ بتقسيم المحتوى: أفكار، مهام، مراجع.\n\nثم أضف البحث، الوسوم، والملخصات الذكية.`,
    createdAt: new Date(Date.now() - 26 * 60 * 1000).toISOString(),
    hasAiSummary: true,
  },
];

export default function Page() {
  const params = useParams<{ id?: string | string[] }>();

  const clipId = useMemo(() => {
    const raw = params?.id;
    if (!raw) return "1";
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const clip = useMemo(() => {
    return MOCK_CLIPS.find((c) => c.id === clipId) || MOCK_CLIPS[0];
  }, [clipId]);

  const [summaries, setSummaries] = useState<
    Partial<Record<SummaryFormat, SummaryDTO>>
  >({});
  const [loadingSummary, setLoadingSummary] = useState(false);

  const hasAnySummary = Boolean(
    summaries.paragraph || summaries.bullet_points || summaries.study_notes,
  );

  const onStart = (format: SummaryFormat) => {
    setLoadingSummary(true);

    // mock loading
    setTimeout(() => {
      const summary = makeMockSummary(clip.id, format);
      setSummaries((prev) => ({ ...prev, [format]: summary }));
      setLoadingSummary(false);
    }, 650);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <ContentAiTabsPro
        defaultTab="content"
        sticky
        contentLabel="المحتوى"
        aiLabel="الذكاء"
        contentBadge="مقال"
        aiBadge={hasAnySummary ? "جاهز" : "جديد"}
        content={
          <ClipContentSheet clip={clip} timeAgo={timeAgoAr(clip.createdAt)} />
        }
        ai={
          <AiSummaryPanel
            isLoading={loadingSummary}
            onStart={onStart}
            summaries={summaries}
            defaultFormat="paragraph"
          />
        }
      />
    </div>
  );
}
