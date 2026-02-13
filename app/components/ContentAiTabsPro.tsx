"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { DocumentTextIcon, SparklesIcon } from "@heroicons/react/24/solid";

type TabKey = "content" | "ai";

export default function ContentAiTabsPro({
  content,
  ai,
  defaultTab = "content",
  activeTab,
  onTabChange,
  sticky = true,
  contentBadge,
  aiBadge,
  contentLabel = "المحتوى",
  aiLabel = "الملخص",
}: {
  content: React.ReactNode;
  ai: React.ReactNode;
  defaultTab?: TabKey;
  activeTab?: TabKey;
  onTabChange?: (tab: TabKey) => void;
  sticky?: boolean;
  contentBadge?: string;
  aiBadge?: string;
  contentLabel?: string;
  aiLabel?: string;
}) {
  const [internalTab, setInternalTab] = useState<TabKey>(defaultTab);
  const tab = activeTab ?? internalTab;
  const setTab = (t: TabKey) => {
    setInternalTab(t);
    onTabChange?.(t);
  };

  const tabs = useMemo(
    () => [
      {
        id: "content" as const,
        label: contentLabel,
        Icon: DocumentTextIcon,
        badge: contentBadge,
      },
      { id: "ai" as const, label: aiLabel, Icon: SparklesIcon, badge: aiBadge },
    ],
    [contentBadge, aiBadge, contentLabel, aiLabel],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, content, ai]);

  // Keyboard nav
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();

    const activeIndexNow = tab === "content" ? 0 : 1;

    const nextIndex =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? tabs.length - 1
          : e.key === "ArrowRight"
            ? Math.min(tabs.length - 1, activeIndexNow + 1)
            : Math.max(0, activeIndexNow - 1);

    setTab(tabs[nextIndex].id);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div
        onKeyDown={onKeyDown}
        className={[
          "relative w-full",
          sticky ? "sticky top-[60px] z-30" : "",
          "bg-white/80 backdrop-blur-xl",
          "supports-[backdrop-filter]:bg-white/65",
          "border-b border-slate-200/40",
          "pb-3 pt-2",
        ].join(" ")}
      >
        <div className="px-2 sm:px-0">
          <div className="relative w-full rounded-[18px] p-1.5">
            {/* Base */}
            <div className="absolute inset-0 rounded-[18px] bg-slate-100/70 border border-slate-200/60" />

            {/* Indicator (no neon) */}
            <div
              className={[
                "absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-0.375rem)]",
                "rounded-[14px]",
                "bg-white/85 supports-[backdrop-filter]:bg-white/75 backdrop-blur-xl",
                "border border-slate-200/60",
                "shadow-[0_10px_25px_-20px_rgba(0,0,0,0.45)]",
                "will-change-transform",
                "transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
              ].join(" ")}
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-2 gap-1">
              {tabs.map(({ id, label, Icon, badge }) => {
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
                      "outline-none transition-colors duration-300",
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

                    {badge ? (
                      <span
                        className={[
                          "ml-1 hidden sm:inline-flex",
                          "px-2 py-0.5 rounded-lg text-[11px] font-semibold",
                          active
                            ? "bg-slate-900/5 text-slate-700"
                            : "text-slate-500",
                        ].join(" ")}
                      >
                        {badge}
                      </span>
                    ) : null}
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
            {content}
          </div>

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
            {ai}
          </div>
        </div>
      </div>
    </div>
  );
}
