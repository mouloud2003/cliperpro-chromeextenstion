"use client";

import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
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
  isLoadingExisting = false,
  defaultFormat = "paragraph",
  summaries,
  onStart,
  aiEnabled = true,
}: {
  isLoading?: boolean;
  isLoadingExisting?: boolean;
  defaultFormat?: SummaryFormat;
  summaries?: Partial<Record<SummaryFormat, SummaryDTO | undefined>>;
  onStart?: (format: SummaryFormat) => void;
  aiEnabled?: boolean;
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
      toast.success("تم نسخ الملخص بنجاح!");
    } catch {
      toast.error("حدث خطأ أثناء النسخ.");
    }
  };

  const activeIdx = UI_TABS.findIndex((t) => t.format === format);

  const hasResult = Boolean(activeSummary?.body?.trim());

  /* Track format changes for content fade */
  const [visible, setVisible] = useState(true);
  const switchFormat = (f: SummaryFormat) => {
    if (f === format) return;
    setVisible(false); // fade out
    setTimeout(() => {
      setFormat(f);
      setVisible(true);
    }, 180); // swap + fade in
  };

  return (
    <div
      dir="rtl"
      className="min-h-[70vh] bg-background px-4 py-6 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        {/* Top switcher */}
        <div className="w-full rounded-2xl p-1.5 relative">
          {/* Base background */}
          <div className="absolute inset-0 rounded-lg border border-border/70 bg-secondary/80 shadow-sm backdrop-blur-sm" />

          {/* Sliding pill indicator */}
          <div
            className={[
              "absolute top-1.5 bottom-1.5 right-1.5 w-[calc(33.333%-0.375rem)]",
              "rounded-md",
              "bg-card/90 supports-[backdrop-filter]:bg-card/80 backdrop-blur-xl",
              "border border-border/70",
              "shadow-[0_10px_25px_-20px_rgba(0,0,0,0.45)]",
              "will-change-transform",
              "transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
            ].join(" ")}
            style={{ transform: `translateX(${activeIdx * -100}%)` }}
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-3 gap-1">
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
                  onClick={() => switchFormat(t.format)}
                  className={[
                    "relative z-10 h-12 rounded-md px-4",
                    "flex items-center justify-center gap-2",
                    "outline-none transition-colors duration-300",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "w-5 h-5 transition-colors duration-300",
                      active ? "text-primary" : "text-muted-foreground",
                    ].join(" ")}
                  />
                  <span
                    className={
                      active ? "text-sm font-semibold" : "text-sm font-medium"
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
        <div className="mt-5 overflow-hidden rounded-lg border border-border/70 bg-card shadow-[0_20px_60px_-40px_rgba(26,26,26,0.2)]">
          <div className="px-6 sm:px-10 py-10 sm:py-14">
            <div
              className="transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(6px)",
              }}
            >
              {isLoadingExisting ? (
                /* Loading skeleton while fetching existing summaries */
                <div className="mx-auto max-w-xl text-center animate-pulse">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-100" />
                  <div className="mt-6 mx-auto h-7 w-48 rounded-lg bg-slate-100" />
                  <div className="mt-3 mx-auto h-5 w-72 rounded-lg bg-slate-100" />
                  <div className="mt-7 mx-auto h-11 w-44 rounded-xl bg-slate-100" />
                </div>
              ) : !hasResult ? (
                // Empty state
                <div className="mx-auto max-w-xl text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 shadow-sm">
                    <SparklesIcon className="w-7 h-7 text-amber-500" />
                  </div>

                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {title}
                  </h2>

                  <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                    {desc}
                  </p>

                  <div className="mt-7">
                    {!aiEnabled ? (
                      /* AI-disabled warning */
                      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-amber-600"
                            >
                              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                              <path d="M12 9v4" />
                              <path d="M12 17h.01" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold text-amber-900">
                              ميزات الذكاء الاصطناعي غير مفعّلة
                            </p>
                            <p className="mt-1 text-[13px] leading-6 text-amber-700/80">
                              يجب تفعيل الذكاء الاصطناعي أولاً لاستخدام التلخيص.
                              يمكنك تفعيله من الإعدادات أو صفحة الملف الشخصي.
                            </p>
                            <a
                              href="/library/profile"
                              className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                              الذهاب للإعدادات
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onStart?.(format)}
                        disabled={!onStart || isLoading}
                        className={[
                          "inline-flex items-center justify-center gap-2",
                          "h-11 px-8 rounded-xl",
                          "bg-slate-900 text-white text-[14px] font-semibold",
                          "shadow-[0_8px_30px_-12px_rgba(15,23,42,0.4)]",
                          "transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]",
                          "active:scale-[0.98] hover:bg-slate-800 hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.5)]",
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
                    )}
                  </div>
                </div>
              ) : (
                // Result state
                <div className="mx-auto max-w-3xl">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                        <SparklesIcon className="w-4 h-4 text-amber-500" />
                      </div>
                      <h3 className="text-[15px] font-bold text-slate-900">
                        {activeSummary?.title || title}
                      </h3>
                      {activeSummary?.fromCache ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                          من الكاش
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={copy}
                        className="h-9 w-9 rounded-lg border cursor-pointer border-slate-200/80 bg-white hover:bg-indigo-50 hover:border-indigo-200/80 hover:text-indigo-600 flex items-center justify-center text-slate-500 transition-all duration-200"
                        title="نسخ"
                      >
                        <ClipboardIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200/60 bg-gradient-to-b from-slate-50/50 to-white p-5 sm:p-6 text-slate-700 leading-8 text-[15px] whitespace-pre-wrap">
                    {activeSummary?.body}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-100/60 bg-gradient-to-r from-white/60 via-amber-50/20 to-white/60 px-6 sm:px-10 py-3" />
        </div>
      </div>
    </div>
  );
}
