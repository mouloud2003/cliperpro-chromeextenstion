"use client";

import React, { useMemo } from "react";
import {
  ArrowTopRightOnSquareIcon,
  ClipboardIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

type Props = {
  title: string;
  domain?: string;
  url?: string;

  createdAt?: string; // ISO string (optional)
  timeAgo?: string; // e.g. "منذ ساعتين" (optional)

  content: string; // full text (paragraphs separated by \n)
  onBack?: () => void; // optional
};

export default function ClipContentSheet({
  title,
  domain,
  url,
  createdAt,
  timeAgo,
  content,
  onBack,
}: Props) {
  const dateLabel = useMemo(() => {
    if (!createdAt) return "";
    try {
      const d = new Date(createdAt);
      // same style as screenshot: M/D/YYYY
      return d.toLocaleDateString("en-US");
    } catch {
      return "";
    }
  }, [createdAt]);

  const paragraphs = useMemo(() => {
    return content
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);
  }, [content]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {}
  };

  return (
    <div className="min-h-[70vh] bg-slate-50/80 px-3 sm:px-6 py-6">
      <div className="mx-auto max-w-5xl">
        <div
          dir="rtl"
          className={[
            "bg-white rounded-[28px] border border-slate-200/70",
            "shadow-[0_18px_55px_-45px_rgba(0,0,0,0.45)]",
            "overflow-hidden",
          ].join(" ")}
        >
          {/* Top toolbar */}
          <div className="px-5 sm:px-7 py-4 flex items-center justify-between">
            {/* Left actions (RTL: appear on left visually) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => url && window.open(url, "_blank")}
                disabled={!url}
                className={[
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2",
                  "text-sm font-semibold",
                  "border border-slate-200 hover:bg-slate-50",
                  !url ? "opacity-50 cursor-not-allowed" : "",
                ].join(" ")}
              >
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                فتح الرابط
              </button>

              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center justify-center rounded-xl p-2 border border-slate-200 hover:bg-slate-50"
                title="نسخ"
              >
                <ClipboardIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Right source */}
            <div className="flex items-center gap-3 text-right">
              <div className="leading-tight">
                <div className="text-xs text-slate-400 font-semibold">
                  المصدر
                </div>
                <div dir="ltr" className="text-base font-bold text-slate-800">
                  {domain || "—"}
                </div>
              </div>

              {onBack ? (
                <button
                  type="button"
                  onClick={onBack}
                  className="rounded-full p-2 hover:bg-slate-50 border border-transparent hover:border-slate-200"
                  title="رجوع"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-slate-500" />
                </button>
              ) : (
                <div className="rounded-full p-2 border border-transparent">
                  <ChevronLeftIcon className="w-5 h-5 text-slate-300" />
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Article */}
          <div className="px-6 sm:px-12 lg:px-16 py-10 sm:py-14">
            {/* Title */}
            <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.25]">
              {title}
            </h1>

            {/* Meta row */}
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500">
              {timeAgo ? <span>{timeAgo}</span> : null}
              {dateLabel ? (
                <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 font-semibold">
                  {dateLabel}
                </span>
              ) : null}
            </div>

            {/* Body */}
            <div className="mt-10 border-t border-slate-100 pt-10">
              <div className="mx-auto max-w-3xl space-y-7 text-[17px] sm:text-[18px] text-slate-700 leading-9">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
