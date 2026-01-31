"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { DocumentTextIcon, SparklesIcon } from "@heroicons/react/24/solid";
import AiSummaryPanel from "@/app/components/Aiworkspace";
import ClipContentSheet from "@/app/components/clipcontent";

type TabKey = "content" | "ai";

export default function ContentAiTabsPro({
  defaultTab = "content",
  sticky = true,
}: {
  defaultTab?: TabKey;
  sticky?: boolean;
}) {
  const [tab, setTab] = useState<TabKey>(defaultTab);

  const tabs = useMemo(
    () => [
      { id: "content" as const, label: "Content", Icon: DocumentTextIcon },
      { id: "ai" as const, label: "AI", Icon: SparklesIcon },
    ],
    [],
  );

  const activeIndex = tab === "content" ? 0 : 1;

  // Smooth height animation
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const aiRef = useRef<HTMLDivElement | null>(null);

  const syncHeight = () => {
    const wrap = wrapRef.current;
    const activeEl = tab === "content" ? contentRef.current : aiRef.current;
    if (!wrap || !activeEl) return;
    wrap.style.height = `${activeEl.scrollHeight}px`;
  };

  useEffect(() => {
    syncHeight();

    const activeEl = tab === "content" ? contentRef.current : aiRef.current;
    if (!activeEl || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => syncHeight());
    ro.observe(activeEl);
    return () => ro.disconnect();
  }, [tab]);

  // Keyboard nav
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();

    const nextIndex =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? tabs.length - 1
          : e.key === "ArrowRight"
            ? Math.min(tabs.length - 1, activeIndex + 1)
            : Math.max(0, activeIndex - 1);

    setTab(tabs[nextIndex].id);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div
        onKeyDown={onKeyDown}
        className={[
          "relative w-full",
          sticky ? "sticky top-0 z-30" : "",
          "bg-white/70 backdrop-blur-xl",
          "supports-[backdrop-filter]:bg-white/55",
          "border-b border-slate-200/50",
          "pb-3 pt-2",
        ].join(" ")}
      >
        <div className="px-2 sm:px-0">
          <div className="relative w-full rounded-[18px] p-1.5">
            <div className="absolute inset-0 rounded-[18px] bg-slate-100/70 border border-slate-200/60" />

            <div
              className={[
                "absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-0.375rem)]",
                "rounded-[14px]",
                "bg-white/85",
                "supports-[backdrop-filter]:bg-white/75 backdrop-blur-xl",
                "border border-slate-200/60",
                "shadow-[0_10px_25px_-20px_rgba(0,0,0,0.45)]",
                "will-change-transform",
                "transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
              ].join(" ")}
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-2 gap-1">
              {tabs.map(({ id, label, Icon }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={`panel-${id}`}
                    onClick={() => setTab(id)}
                    className={[
                      "group relative flex items-center justify-center gap-2",
                      "rounded-[14px] px-4 py-2.5 sm:py-3",
                      "outline-none",
                      "transition-colors duration-300",
                      active
                        ? "text-slate-900"
                        : "text-slate-600 hover:text-slate-900",
                    ].join(" ")}
                  >
                    <Icon
                      className={
                        active ? "w-5 h-5 opacity-100" : "w-5 h-5 opacity-75"
                      }
                    />
                    <span
                      className={
                        active ? "text-sm font-semibold" : "text-sm font-medium"
                      }
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Panels */}
      <div className="mt-5">
        <div
          ref={wrapRef}
          className="relative overflow-hidden transition-[height] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ height: "auto" }}
        >
          {/* CONTENT */}
          <div
            id="panel-content"
            role="tabpanel"
            aria-hidden={tab !== "content"}
            ref={contentRef}
            className={[
              "rounded-2xl border border-slate-200/70 bg-white",
              "shadow-[0_18px_45px_-38px_rgba(0,0,0,0.45)]",
              "transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
              tab === "content"
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-2 scale-[0.99] pointer-events-none absolute inset-0",
            ].join(" ")}
          >
            <ClipContentSheet
              title="عنوان المقال"
              domain="tech-review.sa"
              url="https://tech-review.sa"
              createdAt={new Date().toISOString()}
              timeAgo="منذ ساعتين"
              content={`فقرة 1...\n\nفقرة 2...\n\nفقرة 3...`}
            />
          </div>

          {/* AI */}
          <div
            id="panel-ai"
            role="tabpanel"
            aria-hidden={tab !== "ai"}
            ref={aiRef}
            className={[
              "rounded-2xl border border-slate-200/70 bg-white",
              "shadow-[0_18px_45px_-38px_rgba(0,0,0,0.45)]",
              "transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
              tab === "ai"
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-2 scale-[0.99] pointer-events-none absolute inset-0",
            ].join(" ")}
          >
            <AiSummaryPanel
              isLoading={false}
              onStart={(mode) => {
                // wire endpoint here
                console.log("start", mode);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
