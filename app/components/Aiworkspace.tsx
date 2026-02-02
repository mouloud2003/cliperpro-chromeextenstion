"use client";

import React, { useMemo, useState } from "react";
import {
  DocumentTextIcon,
  ListBulletIcon,
  AcademicCapIcon,
  SparklesIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import type { SummaryDTO, SummaryFormat } from "../../core/domain/types";

const UI_TABS: {
  label: string;
  uiKey: "article" | "bullets" | "study";
  format: SummaryFormat;
}[] = [
  { label: "دراسة", uiKey: "study", format: "study_notes" },
  { label: "نقاط", uiKey: "bullets", format: "bullet_points" },
  { label: "مقال", uiKey: "article", format: "paragraph" },
];

export default function AiSummaryPanel({
  isLoading = false,
  defaultFormat = "paragraph",
  summaries,
  onStart,
}: {
  isLoading?: boolean;
  defaultFormat?: SummaryFormat;

  // Option A: the page passes what it has (can be empty)
  summaries?: Partial<Record<SummaryFormat, SummaryDTO | undefined>>;

  // You will call your endpoint in the page
  onStart?: (format: SummaryFormat) => void;
}) {
  const [format, setFormat] = useState<SummaryFormat>(defaultFormat);

  const activeSummary = summaries?.[format];

  const title = useMemo(() => {
    if (format === "paragraph") return "تلخيص شامل";
    if (format === "bullet_points") return "نقاط مركزة";
    return "دراسة";
  }, [format]);

  const desc = useMemo(() => {
    if (format === "paragraph")
      return "احصل على جوهر المقال في وقتٍ واحده مركزه توفر عليك عناء القراءة الطويلة.";
    if (format === "bullet_points")
      return "نقاط مختصرة وواضحة تساعدك على الفهم السريع والمراجعة.";
    return "ملخص بأسلوب دراسة: أفكار + مصطلحات + ترتيب يساعدك على الحفظ.";
  }, [format]);

  const startLabel = useMemo(() => {
    if (format === "paragraph") return "بدء التلخيص الذكي";
    if (format === "bullet_points") return "بدء استخراج النقاط";
    return "بدء وضع الدراسة";
  }, [format]);

  const copy = async () => {
    if (!activeSummary?.body) return;
    try {
      await navigator.clipboard.writeText(activeSummary.body);
    } catch {}
  };

  const hasResult = Boolean(activeSummary?.body?.trim());

  return (
    <div dir="rtl" className="min-h-[70vh] bg-[#fbf7ea] px-4 sm:px-6 py-6">
      <div className="mx-auto max-w-4xl">
        {/* Top switcher */}
        <div className="w-full rounded-3xl bg-[#f2efe5] p-1.5 border border-slate-200/40">
          <div className="flex gap-1.5">
            {UI_TABS.map((t) => {
              const active = format === t.format;
              const Icon =
                t.uiKey === "article"
                  ? DocumentTextIcon
                  : t.uiKey === "bullets"
                    ? ListBulletIcon
                    : AcademicCapIcon;

              return (
                <button
                  key={t.format}
                  type="button"
                  onClick={() => setFormat(t.format)}
                  className={[
                    "flex-1 h-12 rounded-2xl px-4",
                    "flex items-center justify-center gap-2",
                    "transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]",
                    active
                      ? "bg-white shadow-[0_14px_40px_-32px_rgba(0,0,0,0.55)] border border-slate-200/70"
                      : "bg-transparent text-slate-600 hover:text-slate-900",
                  ].join(" ")}
                >
                  <Icon
                    className={
                      active
                        ? "w-5 h-5 text-amber-600"
                        : "w-5 h-5 text-slate-500"
                    }
                  />
                  <span
                    className={
                      active ? "font-semibold text-slate-900" : "font-medium"
                    }
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main card */}
        <div className="mt-6 rounded-[28px] bg-white border border-slate-200/60 shadow-[0_24px_80px_-66px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="px-6 sm:px-10 py-12 sm:py-16">
            {!hasResult ? (
              // Empty state
              <div className="mx-auto max-w-xl text-center">
                <div className="mx-auto w-20 h-20 rounded-2xl bg-[#fff7e6] border border-amber-100 shadow-[0_18px_50px_-42px_rgba(245,158,11,0.20)] flex items-center justify-center">
                  <SparklesIcon className="w-9 h-9 text-amber-500" />
                </div>

                <h2 className="mt-8 text-3xl sm:text-4xl font-extrabold text-slate-900">
                  {title}
                </h2>

                <p className="mt-4 text-[16px] sm:text-[17px] leading-8 text-slate-600">
                  {desc}
                </p>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => onStart?.(format)}
                    disabled={!onStart || isLoading}
                    className={[
                      "inline-flex items-center justify-center gap-2",
                      "h-12 px-10 rounded-2xl",
                      "bg-slate-900 text-white font-semibold",
                      "shadow-[0_16px_45px_-28px_rgba(15,23,42,0.65)]",
                      "transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]",
                      "active:scale-[0.99] hover:bg-slate-800",
                      !onStart || isLoading
                        ? "opacity-70 cursor-not-allowed"
                        : "",
                    ].join(" ")}
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        جاري التحضير...
                      </span>
                    ) : (
                      <>
                        <span>{startLabel}</span>
                        <span className="opacity-90">✦</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              // Result state
              <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-bold text-slate-900">
                      {activeSummary?.title || title}
                    </h3>
                    {activeSummary?.fromCache ? (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-slate-900/5 text-slate-600">
                        من الكاش
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={copy}
                      className="h-10 w-10 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center"
                      title="نسخ"
                    >
                      <ClipboardIcon className="w-5 h-5 text-slate-600" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onStart?.(format)}
                      disabled={!onStart || isLoading}
                      className={[
                        "h-10 px-4 rounded-xl text-sm font-semibold",
                        "border border-slate-200 hover:bg-slate-50",
                        !onStart || isLoading
                          ? "opacity-60 cursor-not-allowed"
                          : "",
                      ].join(" ")}
                    >
                      {isLoading ? "..." : "تحديث"}
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 text-slate-700 leading-8 text-[16px] whitespace-pre-wrap">
                  {activeSummary?.body}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-white/60 px-6 sm:px-10 py-4"></div>
        </div>
      </div>
    </div>
  );
}
