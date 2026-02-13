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
    <div className="min-h-[70vh] bg-slate-50/80 px-3 sm:px-6 py-6">
      <div
        dir="rtl"
        className={[
          "bg-white rounded-[28px] border border-slate-200/70",
          "shadow-[0_18px_55px_-45px_rgba(0,0,0,0.45)]",
          "overflow-hidden",
        ].join(" ")}
      >
        {/* Toolbar */}
        <div className="px-5 sm:px-7 py-4 flex items-center justify-between">
          {/* actions */}
          <div className="flex items-center gap-3">
            {clip.url && (
              <button
                type="button"
                onClick={() => clip.url && window.open(clip.url, "_blank")}
                disabled={!clip.url}
                className={[
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2",
                  "text-sm font-semibold",
                  "border border-slate-200 hover:bg-slate-50",
                  "cursor-pointer",
                  !clip.url ? "opacity-50 cursor-not-allowed" : "",
                ].join(" ")}
              >
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                فتح الرابط
              </button>
            )}

            <button
              type="button"
              onClick={copy}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl p-2 border border-slate-200 hover:bg-slate-50"
              title="نسخ"
            >
              <ClipboardIcon className="w-5 h-5" />
            </button>
          </div>

          {/* source */}
          <div className="text-right leading-tight">
            <div className="text-xs text-slate-400 font-semibold">المصدر</div>
            <div dir="ltr" className="text-base font-bold text-slate-800">
              {domain || "—"}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100" />

        {/* Article */}
        <div className="px-6 sm:px-12 lg:px-16 py-10 sm:py-14">
          <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {clip.title || "بدون عنوان"}
          </h1>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500">
            {timeAgo ? <span>{timeAgo}</span> : null}
            {dateLabel ? (
              <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 font-semibold">
                {dateLabel}
              </span>
            ) : null}
          </div>

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
  );
}
