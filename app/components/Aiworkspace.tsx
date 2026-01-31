"use client";

import React, { useMemo, useState } from "react";
import {
  DocumentTextIcon,
  ListBulletIcon,
  AcademicCapIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

type Mode = "article" | "bullets" | "study";

const ModeBtn = ({
  id,
  label,
  Icon,
  activeColorClass,
  mode,
  setMode,
}: {
  id: Mode;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  activeColorClass?: string;
  mode: Mode;
  setMode: (mode: Mode) => void;
}) => {
  const active = mode === id;
  return (
    <button
      type="button"
      onClick={() => setMode(id)}
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
        className={[
          "w-5 h-5",
          active ? (activeColorClass || "text-amber-600") : "text-slate-500",
          "transition-colors duration-300",
        ].join(" ")}
      />
      <span className={active ? "font-semibold text-slate-900" : "font-medium"}>
        {label}
      </span>
    </button>
  );
};

type Props = {
  // You will wire these to your endpoints
  onStart?: (mode: Mode) => void;
  isLoading?: boolean;

  // Optional: show results if you already have them
  articleText?: string;
  bullets?: string[];
  studyNotes?: string;

  defaultMode?: Mode;
};

export default function AiSummaryPanel({
  onStart,
  isLoading = false,
  articleText,
  bullets,
  studyNotes,
  defaultMode = "article",
}: Props) {
  const [mode, setMode] = useState<Mode>(defaultMode);

  const hasResult = useMemo(() => {
    if (mode === "article") return Boolean(articleText?.trim());
    if (mode === "bullets") return Boolean(bullets && bullets.length > 0);
    return Boolean(studyNotes?.trim());
  }, [mode, articleText, bullets, studyNotes]);

  const titleByMode =
    mode === "article" ? "تلخيص شامل" : mode === "bullets" ? "نقاط مركزة" : "دراسة";
  const descByMode =
    mode === "article"
      ? "احصل على جوهر المقال في وقتٍ واحده مركزه توفر عليك عناء القراءة الطويلة."
      : mode === "bullets"
      ? "نقاط مختصرة وواضحة تساعدك على الفهم السريع والمراجعة."
      : "ملخص بأسلوب دراسة: أفكار + مصطلحات + ترتيب يساعدك على الحفظ.";

  const startLabel =
    mode === "article"
      ? "بدء التلخيص الذكي"
      : mode === "bullets"
      ? "بدء استخراج النقاط"
      : "بدء وضع الدراسة";

  const renderResult = () => {
    if (mode === "article" && articleText) {
      return (
        <div className="text-slate-700 leading-8 text-[16px] whitespace-pre-wrap">
          {articleText}
        </div>
      );
    }
    if (mode === "bullets" && bullets && bullets.length) {
      return (
        <ul className="list-disc pr-6 space-y-2 text-slate-700 leading-7">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      );
    }
    if (mode === "study" && studyNotes) {
      return (
        <div className="text-slate-700 leading-8 text-[16px] whitespace-pre-wrap">
          {studyNotes}
        </div>
      );
    }
    return null;
  };

  return (
    <div dir="rtl" className="min-h-[70vh] bg-[#fbf7ea] px-4 sm:px-6 py-6">
      <div className="mx-auto max-w-4xl">
        {/* Top switcher (like screenshot) */}
        <div className="w-full rounded-3xl bg-[#f2efe5] p-1.5 border border-slate-200/40">
          <div className="flex gap-1.5">
            <ModeBtn
              id="study"
              label="دراسة"
              Icon={AcademicCapIcon}
              activeColorClass="text-slate-700"
              mode={mode}
              setMode={setMode}
            />
            <ModeBtn
              id="bullets"
              label="نقاط"
              Icon={ListBulletIcon}
              activeColorClass="text-slate-700"
              mode={mode}
              setMode={setMode}
            />
            <ModeBtn
              id="article"
              label="مقال"
              Icon={DocumentTextIcon}
              activeColorClass="text-amber-600"
              mode={mode}
              setMode={setMode}
            />
          </div>
        </div>

        {/* Main card */}
        <div className="mt-6 rounded-[28px] bg-white border border-slate-200/60 shadow-[0_24px_80px_-66px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="px-6 sm:px-10 py-12 sm:py-16">
            {/* Smooth panel switch */}
            <div className="relative">
              {/* Empty state */}
              <div
                className={[
                  "transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                  hasResult ? "opacity-0 translate-y-2 pointer-events-none absolute inset-0" : "opacity-100 translate-y-0",
                ].join(" ")}
              >
                <div className="mx-auto max-w-xl text-center">
                  {/* Icon tile */}
                  <div className="mx-auto w-20 h-20 rounded-2xl bg-[#fff7e6] border border-amber-100 shadow-[0_18px_50px_-42px_rgba(245,158,11,0.35)] flex items-center justify-center">
                    <SparklesIcon className="w-9 h-9 text-amber-500" />
                  </div>

                  <h2 className="mt-8 text-3xl sm:text-4xl font-extrabold text-slate-900">
                    {titleByMode}
                  </h2>

                  <p className="mt-4 text-[16px] sm:text-[17px] leading-8 text-slate-600">
                    {descByMode}
                  </p>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => onStart?.(mode)}
                      disabled={!onStart || isLoading}
                      className={[
                        "inline-flex items-center justify-center gap-2",
                        "h-12 px-10 rounded-2xl",
                        "bg-slate-900 text-white font-semibold",
                        "shadow-[0_16px_45px_-28px_rgba(15,23,42,0.75)]",
                        "transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]",
                        "active:scale-[0.99] hover:bg-slate-800",
                        (!onStart || isLoading) ? "opacity-70 cursor-not-allowed" : "",
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
              </div>

              {/* Result state */}
              <div
                className={[
                  "transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                  hasResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
                ].join(" ")}
              >
                <div className="mx-auto max-w-3xl">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-bold text-slate-900">{titleByMode}</h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => onStart?.(mode)}
                      disabled={!onStart || isLoading}
                      className={[
                        "h-10 px-4 rounded-xl text-sm font-semibold",
                        "border border-slate-200 hover:bg-slate-50",
                        (!onStart || isLoading) ? "opacity-60 cursor-not-allowed" : "",
                      ].join(" ")}
                    >
                      {isLoading ? "..." : "تحديث"}
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                    {renderResult()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* subtle footer separator like app cards */}
          <div className="border-t border-slate-100 bg-white/60 px-6 sm:px-10 py-4 text-sm text-slate-500">
            يمكنك اختيار النمط من الأعلى ثم بدء التلخيص.
          </div>
        </div>
      </div>
    </div>
  );
}
