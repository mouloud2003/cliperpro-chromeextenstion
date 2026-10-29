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
  const hasSummary = clip.hasAiSummary === true;

  return (
    <Link
      href={`/library/${clip.id}`}
      aria-label={`Open clip: ${clip.title ?? "Untitled clip"}`}
      className="group/card block h-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <article
        dir="rtl"
        className={[
          "relative flex h-full min-h-[180px] flex-col overflow-hidden rounded-lg border p-5",
          "bg-card",
          hasSummary
            ? "border-amber-200/80"
            : "border-border",
          "transition-all duration-200 will-change-transform",
          "hover:-translate-y-[2px]",
          hasSummary
            ? "hover:border-amber-400/80 hover:shadow-sm"
            : "hover:border-primary/60 hover:shadow-sm",
        ].join(" ")}
      >
        {/* Subtle AI glow accent — top-right corner */}
        {hasSummary && (
          <div
            className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-[0.07] blur-2xl bg-amber-400 transition-opacity duration-300 group-hover/card:opacity-[0.13]"
            aria-hidden="true"
          />
        )}

        {/* Top */}
        <div className="flex items-start justify-between gap-3 text-right">
          <span className="max-w-[60%] truncate rounded-full border border-border bg-secondary px-2 py-1 text-xs text-secondary-foreground">
            <span dir="ltr">{highlight(domain, q)}</span>
          </span>
          <span className="text-xs text-muted-foreground">
            {rel}
          </span>
        </div>

        {/* Middle */}
        <div className="mt-4 space-y-2 text-right flex-1">
          <h3
            className="text-[18px] font-semibold leading-[1.4] text-foreground"
            style={clampStyle(2)}
          >
            {clip.title ? highlight(clip.title, q) : "Untitled clip"}
          </h3>
          <p
            className="text-[14px] leading-normal text-muted-foreground"
            style={clampStyle(3)}
          >
            {highlight(clip.textPreview, q)}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between gap-2 text-xs">
          {hasSummary ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 px-2.5 py-1 transition-colors duration-200 group-hover/card:bg-amber-100/80 dark:group-hover/card:bg-amber-950/60">
              <svg
                className="h-3.5 w-3.5 text-amber-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
              </svg>
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                ملخّص AI
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-slate-400 dark:text-slate-500">
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="text-[11px] font-medium">بدون ملخص</span>
            </span>
          )}

          <span dir="ltr" className="text-muted-foreground">
            {mins} min • {words} words
          </span>
        </div>
      </article>
    </Link>
  );
}

export function SkeletonCard() {
  return (
    <div className="min-h-45 rounded-lg border border-border bg-card p-5">
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
