"use client";
import Link from "next/link";
import type { ClipDTO } from "../../core/domain/types";
import React from "react";

function getDomain(url?: string) {
  if (!url) return "text";
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "text";
  }
}
function formatRelative(dateISO: string) {
  const date = new Date(dateISO);
  const diffMs = date.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const abs = Math.abs(diffSec);

  if (abs < 60) return rtf.format(diffSec, "second");
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");
  const diffHr = Math.round(diffMin / 60);
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, "hour");
  const diffDay = Math.round(diffHr / 24);
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, "day");
  const diffMonth = Math.round(diffDay / 30);
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, "month");
  const diffYear = Math.round(diffMonth / 12);
  return rtf.format(diffYear, "year");
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
function readingTimeMin(words: number) {
  return Math.max(1, Math.ceil(words / 200));
}

function clampStyle(lines: number): React.CSSProperties {
  return {
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
}

function highlight(text: string, q: string) {
  const query = q.trim();
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return text;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + query.length);
  const after = text.slice(idx + query.length);

  return (
    <>
      {before}
      <mark className="rounded px-1 bg-indigo-500/15 text-slate-900 dark:text-slate-50">
        {match}
      </mark>
      {after}
    </>
  );
}

export function NotionCard({ clip, q }: { clip: ClipDTO; q: string }) {
  const domain = getDomain(clip.url);
  const rel = formatRelative(clip.createdAt);
  const words = wordCount(clip.textPreview);
  const mins = readingTimeMin(words);

  return (
    <Link
      href={`/libreary/${clip.id}`}
      aria-label={`Open clip: ${clip.title ?? "Untitled clip"}`}
      className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950 rounded-xl"
    >
      <article
        dir="rtl"
        className={[
          "h-full min-h-[180px] rounded-xl border p-5 flex flex-col",
          "bg-white dark:bg-slate-900",
          "border-slate-200 dark:border-slate-800",
          "shadow-none",
          "transition duration-150 will-change-transform",
          // Notion-like hover: subtle, calm
          "hover:bg-slate-50/60 dark:hover:bg-slate-900/60",
          "hover:-translate-y-[2px]",
          "hover:border-indigo-500",
          "hover:shadow-[0_4px_12px_rgba(99,102,241,0.10)]",
        ].join(" ")}
      >
        {/* Top */}
        <div className="flex items-start justify-between gap-3 text-right">
          <span className="max-w-[60%] truncate rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 px-2 py-1 text-xs text-slate-600 dark:text-slate-300">
            <span dir="ltr">{highlight(domain, q)}</span>
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {rel}
          </span>
        </div>

        {/* Middle */}
        <div className="mt-4 space-y-2 text-right flex-1">
          <h3
            className="text-[18px] font-semibold leading-[1.4] text-slate-800 dark:text-slate-100"
            style={clampStyle(2)}
          >
            {clip.title ? highlight(clip.title, q) : "Untitled clip"}
          </h3>
          <p
            className="text-[14px] leading-normal text-slate-500 dark:text-slate-400"
            style={clampStyle(3)}
          >
            {highlight(clip.textPreview, q)}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between gap-2 text-xs">
          <span
            className={
              clip.hasAiSummary
                ? "text-amber-600 dark:text-amber-500 font-semibold"
                : "text-slate-400 dark:text-slate-500 font-semibold"
            }
          >
            {clip.hasAiSummary ? "AI Summary" : "—"}
          </span>

          <span className="text-slate-500 dark:text-slate-400">
            {mins} min • {words} words
          </span>
        </div>
      </article>
    </Link>
  );
}

export function SkeletonCard() {
  return (
    <div className="min-h-45 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="h-6 w-28 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </div>
      <div className="mt-4 space-y-3">
        <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-4 w-3/5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </div>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center">
      <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 grid place-items-center">
        🎬
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        No clips yet
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Create your first clip and it will show up here.
      </p>
      <button className="mt-6 h-10 px-4 rounded-xl bg-indigo-600 text-white text-sm font-semibold">
        + New Clip
      </button>
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center">
      <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 grid place-items-center">
        ⚠️
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Something went wrong
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Demo error state.
      </p>
      <button className="mt-6 h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-100">
        Retry
      </button>
    </div>
  );
}
