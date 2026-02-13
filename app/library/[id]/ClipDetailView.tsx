"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

import ContentAiTabsPro from "@/app/components/ContentAiTabsPro";
import ClipContentSheet from "@/app/components/clipcontent";
import AiSummaryPanel from "@/app/components/Aiworkspace";
import { useUsage } from "@/app/components/UsageContext";
import { useAiSettings } from "@/app/components/AiSettingsContext";

import type {
  ClipDetailDTO,
  SummaryDTO,
  SummaryFormat,
} from "@/core/domain/types";

/* ---------- helpers ---------- */
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

/* ---------- component ---------- */
export function ClipDetailView({ clip }: { clip: ClipDetailDTO }) {
  const [summaries, setSummaries] = useState<
    Partial<Record<SummaryFormat, SummaryDTO>>
  >({});
  const [loadingSummary, setLoadingSummary] = useState(false);
  const { refreshUsage } = useUsage();
  const { aiEnabled } = useAiSettings();

  const hasAnySummary = Boolean(
    summaries.paragraph || summaries.bullet_points || summaries.study_notes,
  );

  const onStart = async (format: SummaryFormat) => {
    setLoadingSummary(true);
    try {
      const res = await fetch(`/api/v1/clips/${clip.id}/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "فشل إنشاء الملخص");
      }

      const { summary } = (await res.json()) as { summary: SummaryDTO };
      setSummaries((prev) => ({ ...prev, [format]: summary }));

      // Refresh usage counter in real time after consuming a credit
      refreshUsage();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "حدث خطأ";
      toast.error(msg);
    } finally {
      setLoadingSummary(false);
    }
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
            aiEnabled={aiEnabled}
          />
        }
      />
    </div>
  );
}
