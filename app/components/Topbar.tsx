"use client";

import React, { useState, useEffect, useRef } from "react";
import { Feather, Search, Settings, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import "./Topbar.css";
import Link from "next/link";
import { useAiSettings } from "./AiSettingsContext";
import { useUsage } from "./UsageContext";

/* ─── TOS Modal (Apple-inspired) ─── */
function TosModal({
  open,
  onAccept,
  onDecline,
}: {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  useEffect(() => {
    if (!open) return;
    const timer = requestAnimationFrame(() => setScrolledToEnd(false));
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDecline();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(timer);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onDecline]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 20) {
      setScrolledToEnd(true);
    }
  };

  if (!open) return null;

  const terms = [
    {
      num: "1",
      title: "Data Processing",
      body: "Your saved clips and content may be processed by third-party AI services, including Google Gemini, for the purpose of generating summaries and analysis.",
    },
    {
      num: "2",
      title: "Accuracy Disclaimer",
      body: "AI-generated content is produced automatically and may contain inaccuracies. You are responsible for verifying any information before relying on it.",
    },
    {
      num: "3",
      title: "Usage & Quotas",
      body: "AI features are subject to monthly usage limits determined by your current plan. If you exceed your quota, AI capabilities may be temporarily paused until the next billing cycle.",
    },
    {
      num: "4",
      title: "Your Privacy",
      body: "We do not retain AI-generated outputs beyond what you explicitly save to your library. Third-party AI providers operate under their own privacy policies.",
    },
    {
      num: "5",
      title: "Right to Revoke",
      body: "You may disable AI features at any time from your profile settings. Disabling AI will not delete previously saved content.",
    },
  ];

  return (
    <div
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && onDecline()}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div
        className="relative w-full max-w-[480px] mx-4 bg-[#fafafa] dark:bg-[#1c1c1e] rounded-[20px] overflow-hidden"
        style={{
          boxShadow:
            "0 25px 80px -12px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(0,0,0,0.08)",
        }}
      >
        {/* Top section */}
        <div className="pt-10 pb-6 px-8 text-center">
          <div className="mx-auto mb-5 relative">
            <div
              className="w-[72px] h-[72px] mx-auto rounded-[22px] flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(145deg, #6366f1, #8b5cf6, #a855f7)",
                boxShadow: "0 8px 32px -4px rgba(99,102,241,0.4)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-[22px] font-bold tracking-tight text-[#1d1d1f] dark:text-white leading-tight">
            AI Terms & Conditions
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[#86868b] max-w-[340px] mx-auto">
            To activate AI-powered features, please review and agree to the
            following terms.
          </p>
        </div>

        {/* Scrollable terms */}
        <div className="mx-6 mb-4 relative">
          <div
            onScroll={handleScroll}
            className="rounded-2xl border border-[#e5e5ea] dark:border-[#38383a] bg-white dark:bg-[#2c2c2e] max-h-[260px] overflow-y-auto px-5 py-4"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d1d1d6 transparent",
            }}
          >
            <div className="space-y-0">
              {terms.map((t, i) => (
                <div
                  key={t.num}
                  className={
                    i < terms.length - 1
                      ? "pb-4 mb-4 border-b border-[#f2f2f7] dark:border-[#38383a]"
                      : "pb-1"
                  }
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-[11px] font-bold text-[#86868b] tabular-nums shrink-0">
                      {t.num}.
                    </span>
                    <div>
                      <h4 className="text-[13px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-snug">
                        {t.title}
                      </h4>
                      <p className="mt-1 text-[12px] leading-[1.6] text-[#86868b]">
                        {t.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!scrolledToEnd && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 rounded-b-2xl bg-gradient-to-t from-white dark:from-[#2c2c2e] to-transparent" />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pt-2 pb-6">
          <p className="text-center text-[11px] text-[#aeaeb2] mb-4">
            Effective February 2026
          </p>
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={onAccept}
              className="w-full h-[50px] rounded-[14px] text-[15px] font-semibold text-white transition-all duration-200 active:scale-[0.98]"
              style={{
                background: "linear-gradient(145deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 16px -2px rgba(99,102,241,0.35)",
              }}
            >
              Agree & Enable AI
            </button>
            <button
              type="button"
              onClick={onDecline}
              className="w-full h-[50px] rounded-[14px] text-[15px] font-semibold text-[#007aff] dark:text-[#0a84ff] bg-[#f2f2f7] dark:bg-[#2c2c2e] hover:bg-[#e8e8ed] dark:hover:bg-[#3a3a3c] transition-all duration-200 active:scale-[0.98]"
            >
              Not Now
            </button>
          </div>
          <p className="text-center text-[10px] text-[#aeaeb2] mt-4 leading-relaxed max-w-[320px] mx-auto">
            By tapping &quot;Agree & Enable AI,&quot; you confirm that you have
            read and agree to these terms. You may revoke access at any time.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Settings Dropdown ─── */
function SettingsDropdown({
  open,
  aiEnabled,
  loading,
  onToggleAi,
  dropdownRef,
}: {
  open: boolean;
  aiEnabled: boolean;
  loading: boolean;
  onToggleAi: () => void;
  dropdownRef: React.Ref<HTMLDivElement>;
}) {
  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-[280px] rounded-2xl border border-[#e5e5ea] dark:border-[#38383a] bg-white dark:bg-[#1c1c1e] overflow-hidden"
      style={{
        boxShadow:
          "0 12px 48px -8px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-[#f2f2f7] dark:border-[#38383a]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">
          Settings
        </p>
      </div>

      {/* AI Toggle row */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: aiEnabled
                  ? "linear-gradient(145deg, #6366f1, #8b5cf6)"
                  : "#f2f2f7",
              }}
            >
              <Sparkles
                className={`w-4 h-4 ${aiEnabled ? "text-white" : "text-[#86868b]"}`}
              />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight">
                AI Features
              </p>
              <p className="text-[11px] text-[#86868b] mt-0.5">
                {aiEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>

          {/* Toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={aiEnabled}
            disabled={loading}
            title={aiEnabled ? "Disable AI" : "Enable AI"}
            onClick={onToggleAi}
            className={`relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${
              aiEnabled ? "bg-indigo-500" : "bg-[#e5e5ea] dark:bg-[#48484a]"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-[2px] ${
                aiEnabled ? "translate-x-[22px]" : "translate-x-[2px]"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Usage Ring ─── */
function UsageRing() {
  const { usage, loading } = useUsage();

  if (loading || !usage) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="w-4 h-4 rounded-full border-2 border-slate-200 border-t-slate-400 animate-spin" />
        <span className="text-xs font-medium text-slate-400">…</span>
      </div>
    );
  }

  const { remaining, limit } = usage;
  const pct = limit > 0 ? Math.round((remaining / limit) * 100) : 0;
  const isLow = pct <= 20;
  const isEmpty = remaining === 0;

  // SVG ring params
  const r = 11;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);

  return (
    <div
      className={[
        "flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border transition-all duration-300",
        isEmpty
          ? "bg-red-50 border-red-200/80"
          : isLow
            ? "bg-amber-50 border-amber-200/80"
            : "bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border-indigo-200/60",
      ].join(" ")}
    >
      {/* Mini ring */}
      <div className="relative w-7 h-7 flex items-center justify-center">
        <svg width="28" height="28" className="-rotate-90">
          <circle
            cx="14"
            cy="14"
            r={r}
            fill="none"
            strokeWidth="2.5"
            className={
              isEmpty
                ? "stroke-red-100"
                : isLow
                  ? "stroke-amber-100"
                  : "stroke-indigo-100"
            }
          />
          <circle
            cx="14"
            cy="14"
            r={r}
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={[
              "transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
              isEmpty
                ? "stroke-red-400"
                : isLow
                  ? "stroke-amber-500"
                  : "stroke-indigo-500",
            ].join(" ")}
            strokeDasharray={`${dash} ${circ}`}
          />
        </svg>
        <Zap
          className={[
            "absolute w-3 h-3",
            isEmpty
              ? "text-red-400"
              : isLow
                ? "text-amber-500"
                : "text-indigo-500",
          ].join(" ")}
        />
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={[
            "text-[13px] font-bold tabular-nums tracking-tight",
            isEmpty
              ? "text-red-600"
              : isLow
                ? "text-amber-700"
                : "text-indigo-700",
          ].join(" ")}
        >
          {remaining}
          <span className="text-[11px] font-medium opacity-50">/{limit}</span>
        </span>
        <span className="text-[9px] font-medium uppercase tracking-wider text-slate-400 mt-0.5">
          credits
        </span>
      </div>
    </div>
  );
}

/* ─── Topbar ─── */
export default function Topbar({
  user,
}: {
  user?: { name: string; image: string };
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const {
    aiEnabled,
    loading: loadingSettings,
    showTos,
    handleToggleAi,
    handleTosAccept,
    handleTosDecline,
  } = useAiSettings();

  const settingsBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        settingsOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        settingsBtnRef.current &&
        !settingsBtnRef.current.contains(target)
      ) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsOpen]);

  return (
    <>
      <div className="Topbar">
        <Link
          href="/library"
          className="Topbar-left flex items-center gap-3 group"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary shadow-sm transition-all duration-300 group-hover:shadow-md">
              <Feather size={16} className="text-white" />
            </div>
            <span className="text-[17px] font-semibold tracking-tight text-foreground">
              Cliper <span className="text-primary">Pro</span>
            </span>
          </div>
        </Link>
        <div className="Topbar-middle" dir="rtl">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="بحث في المكتبة..."
              className="search-container"
            />
          </div>
        </div>

        <div className="Topbar-right flex items-center gap-2.5 justify-end">
          <UsageRing />

          {/* Settings button + dropdown */}
          <div className="relative">
            <button
              ref={settingsBtnRef}
              onClick={() => setSettingsOpen((v) => !v)}
              className={[
                "flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-200",
                settingsOpen
                  ? "border-primary/30 bg-primary/10 text-primary shadow-sm"
                  : "border-border bg-card/80 text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:shadow-sm",
              ].join(" ")}
              title="Settings"
            >
              <Settings
                className={`w-[17px] h-[17px] transition-transform duration-300 ${settingsOpen ? "rotate-90" : ""}`}
              />
            </button>

            <SettingsDropdown
              open={settingsOpen}
              aiEnabled={aiEnabled}
              loading={loadingSettings}
              onToggleAi={handleToggleAi}
              dropdownRef={dropdownRef}
            />
          </div>

          <Link
            href="/library/profile"
            className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-border transition-all duration-200 hover:ring-primary/30"
          >
            <Image
              src={user?.image || "/default-avatar.png"}
              alt="User Avatar"
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          </Link>
        </div>
      </div>

      {/* TOS Modal (rendered outside topbar for proper z-index stacking) */}
      <TosModal
        open={showTos}
        onAccept={handleTosAccept}
        onDecline={handleTosDecline}
      />
    </>
  );
}
