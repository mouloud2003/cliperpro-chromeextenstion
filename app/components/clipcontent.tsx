"use client";

import { useMemo } from "react";
import { toast } from "react-toastify";
import {
  ArrowTopRightOnSquareIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import type { ClipDetailDTO } from "../../core/domain/types";

function safeDomain(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

export default function ClipContentSheet({
  clip,
  timeAgo,
}: {
  clip: ClipDetailDTO;
  timeAgo?: string; // optional, you can compute in your page
}) {
  const domain = useMemo(() => safeDomain(clip.url), [clip.url]);

  const dateLabel = useMemo(() => {
    try {
      return new Date(clip.createdAt).toLocaleDateString("en-US");
    } catch {
      return "";
    }
  }, [clip.createdAt]);

  const paragraphs = useMemo(() => {
    return clip.text
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);
  }, [clip.text]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(clip.text);
      toast.success("تم نسخ النص بنجاح!");
    } catch {
      toast.error("حدث خطأ أثناء النسخ.");
    }
  };

  return (
    <div className="min-h-[70vh] bg-background px-3 py-6 sm:px-6">
      <div
        dir="rtl"
        className={[
          "bg-white rounded-[28px] border border-slate-200/50",
          "shadow-[0_24px_60px_-40px_rgba(0,0,0,0.12)]",
          "overflow-hidden",
        ].join(" ")}
      >
        {/* Toolbar */}
        <div className="px-5 sm:px-7 py-3.5 flex items-center justify-between bg-white/80 backdrop-blur-sm">
          {/* actions */}
          <div className="flex items-center gap-2">
            {clip.url && (
              <button
                type="button"
                onClick={() => clip.url && window.open(clip.url, "_blank")}
                disabled={!clip.url}
                className={[
                  "inline-flex items-center gap-2 rounded-xl px-3.5 py-2",
                  "text-[13px] font-semibold text-slate-600",
                  "border border-slate-200/80 bg-slate-50/50 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200/80",
                  "cursor-pointer transition-all duration-200",
                  !clip.url ? "opacity-50 cursor-not-allowed" : "",
                ].join(" ")}
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                فتح الرابط
              </button>
            )}

            <button
              type="button"
              onClick={copy}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl p-2.5 border border-slate-200/80 bg-slate-50/50 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200/80 text-slate-500 transition-all duration-200"
              title="نسخ"
            >
              <ClipboardIcon className="w-4 h-4" />
            </button>
          </div>

          {/* source */}
          {domain && (
            <div className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span
                dir="ltr"
                className="text-[13px] font-semibold text-slate-600"
              >
                {domain}
              </span>
            </div>
          )}
        </div>
        <div className="border-t border-slate-100/80" />

        {/* Article */}
        <div className="px-6 sm:px-12 lg:px-16 py-10 sm:py-14">
          <h1 className="text-center text-[26px] font-semibold leading-[1.3] tracking-tight text-foreground sm:text-[32px] lg:text-[38px]">
            {clip.title || "بدون عنوان"}
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3 text-[13px] text-slate-500">
            {timeAgo ? (
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-50"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {timeAgo}
              </span>
            ) : null}
            {timeAgo && dateLabel ? (
              <span className="text-slate-300">|</span>
            ) : null}
            {dateLabel ? (
              <span className="px-2.5 py-0.5 rounded-lg bg-slate-100/80 text-slate-500 font-medium text-[12px]">
                {dateLabel}
              </span>
            ) : null}
          </div>

          <div className="mt-10 relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="mx-auto max-w-3xl space-y-6 pt-10 text-[16px] leading-[1.9] text-foreground sm:text-[17px]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
