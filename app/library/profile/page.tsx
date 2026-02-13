"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAiSettings } from "@/app/components/AiSettingsContext";

interface User {
  name: string;
  email: string;
  image?: string;
  createdAt?: string;
  role?: string;
}

async function getUserProfile(): Promise<{ user: User }> {
  try {
    const res = await fetch("/api/auth/session");
    if (!res.ok) throw new Error("Failed to fetch session");
    const session = await res.json();
    return {
      user: {
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        image: session?.user?.image || "",
        createdAt: session?.user?.createdAt,
        role: session?.user?.role || "user",
      },
    };
  } catch {
    return { user: { name: "", email: "" } };
  }
}

async function updateUserProfile(data: {
  name: string;
  email: string;
}): Promise<void> {
  console.log("Updating profile:", data);
}

function SectionTitle({
  children,
  icon,
  className = "",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {icon && <span className="text-muted-foreground/60">{icon}</span>}
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">
        {children}
      </h2>
      <div className="flex-1 h-px bg-border/40 ml-2" />
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-border/40 last:border-b-0 group">
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="text-muted-foreground/50 group-hover:text-primary/60 transition-colors">
            {icon}
          </span>
        )}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="text-sm font-medium text-foreground">
        {value || "—"}
      </span>
    </div>
  );
}

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      title={enabled ? "Disable" : "Enable"}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
        enabled ? "bg-primary" : "bg-muted"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

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
    // Reset scroll tracking when modal opens
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
        {/* ─── Top section ─── */}
        <div className="pt-10 pb-6 px-8 text-center">
          {/* AI icon */}
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

        {/* ─── Scrollable terms ─── */}
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

          {/* Fade hint when not scrolled */}
          {!scrolledToEnd && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 rounded-b-2xl bg-gradient-to-t from-white dark:from-[#2c2c2e] to-transparent" />
          )}
        </div>

        {/* ─── Footer ─── */}
        <div className="px-6 pt-2 pb-6">
          {/* Last updated */}
          <p className="text-center text-[11px] text-[#aeaeb2] mb-4">
            Effective February 2026
          </p>

          {/* Buttons — Apple style stacked */}
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

          {/* Legal note */}
          <p className="text-center text-[10px] text-[#aeaeb2] mt-4 leading-relaxed max-w-[320px] mx-auto">
            By tapping &quot;Agree & Enable AI,&quot; you confirm that you have
            read and agree to these terms. You may revoke access at any time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const {
    aiEnabled,
    tosAccepted,
    showTos,
    handleToggleAi: handleAiToggle,
    handleTosAccept,
    handleTosDecline,
  } = useAiSettings();

  useEffect(() => {
    async function fetchData() {
      try {
        const profile = await getUserProfile();
        setUser(profile.user);
        setName(profile.user?.name || "");
        setEmail(profile.user?.email || "");
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile({ name, email });
      setUser((prev) => (prev ? { ...prev, name, email } : prev));
      setEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-muted-foreground border-t-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-5 py-12 space-y-10">
      <TosModal
        open={showTos}
        onAccept={handleTosAccept}
        onDecline={handleTosDecline}
      />

      {/* Profile Header */}
      <div className="relative rounded-3xl border border-border/50 bg-card overflow-hidden shadow-sm">
        {/* Decorative top gradient bar */}
        <div className="h-24 bg-gradient-to-br from-primary/15 via-primary/8 to-transparent" />

        <div className="px-6 pb-6 -mt-12">
          <div className="flex flex-col items-center text-center gap-3">
            {user?.image ? (
              <div className="h-20 w-20 rounded-2xl ring-2 ring-white shadow-lg overflow-hidden">
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 flex items-center justify-center text-primary text-2xl font-bold uppercase ring-2 ring-white shadow-lg">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
            <div className="mt-1">
              <p className="text-lg font-semibold text-foreground tracking-tight">
                {user?.name || "Unknown User"}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {user?.email || "No email"}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
                {user?.role || "user"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <SectionTitle
            className="flex-1 min-w-0"
            icon={
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          >
            Account Details
          </SectionTitle>
          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors shrink-0 ml-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
              Edit
            </button>
          )}
        </div>

        <div className="rounded-2xl border border-border/50 bg-card px-5 shadow-sm hover:shadow-md transition-shadow duration-300">
          {editing ? (
            <div className="py-6 space-y-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm shadow-primary/20"
                >
                  {saving && (
                    <span className="inline-block h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white" />
                  )}
                  {saving ? "Saving…" : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setName(user?.name || "");
                  }}
                  className="px-5 py-2.5 text-xs font-medium rounded-xl border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <InfoRow
                label="Name"
                value={user?.name}
                icon={
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
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
              />
              <InfoRow
                label="Email"
                value={user?.email}
                icon={
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
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                }
              />
              <InfoRow
                label="Member since"
                value={
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : undefined
                }
                icon={
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
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                  </svg>
                }
              />
              <InfoRow
                label="Role"
                value={
                  <span className="capitalize">{user?.role || "user"}</span>
                }
                icon={
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                }
              />
            </>
          )}
        </div>
      </section>

      {/* AI Preferences */}
      <section>
        <SectionTitle
          className="mb-5"
          icon={
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
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              <path d="M20 3v4" />
              <path d="M22 5h-4" />
            </svg>
          }
        >
          AI Preferences
        </SectionTitle>
        <div className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Toggle row */}
          <div className="flex items-center justify-between px-5 py-5">
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${
                  aiEnabled
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  AI Assistant
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      aiEnabled ? "bg-emerald-500" : "bg-muted-foreground/40"
                    }`}
                  />
                  <p className="text-xs text-muted-foreground">
                    {aiEnabled ? "Active" : "Disabled"}
                  </p>
                </div>
              </div>
            </div>
            <Toggle enabled={aiEnabled} onToggle={handleAiToggle} />
          </div>

          {/* Description */}
          <div className="px-5 pb-5 pt-0">
            <div className="rounded-xl bg-muted/40 px-4 py-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                When enabled, AI will assist with smart suggestions,
                auto-tagging, and content recommendations. Disable to turn off
                all AI-powered features.
              </p>
            </div>
          </div>

          {/* TOS accepted badge */}
          {tosAccepted && (
            <div className="px-5 pb-4">
              <div className="flex items-center gap-2 text-xs text-emerald-600">
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                <span>Terms of Service accepted</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
