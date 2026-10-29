"use client";

import { useState } from "react";
import { NotionCard } from "./Clipcard";
import type { ClipDTO } from "../../core/domain/types";
import { Plus, FileText, Sparkles } from "lucide-react";

/* ─── Skeleton Card ─── */
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 space-y-4 animate-pulse">
      {/* Title */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded-lg bg-muted" />
        <div className="h-3 w-1/2 rounded-lg bg-muted/70" />
      </div>
      {/* Body lines */}
      <div className="space-y-2 pt-1">
        <div className="h-3 w-full rounded-md bg-muted/60" />
        <div className="h-3 w-full rounded-md bg-muted/60" />
        <div className="h-3 w-4/5 rounded-md bg-muted/60" />
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/40">
        <div className="h-3 w-20 rounded-md bg-muted/50" />
        <div className="h-3 w-16 rounded-md bg-muted/50" />
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-6 pb-10 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState({ onCreateClip }: { onCreateClip: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-border bg-secondary">
          <FileText className="h-9 w-9 text-primary" />
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-md bg-primary shadow-sm">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Text */}
      <h2 className="text-xl font-bold text-foreground tracking-tight">
        No clips yet
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm leading-relaxed">
        Start saving clips from the web using the browser extension, or create
        one manually right here.
      </p>

      {/* CTA */}
      <button
        type="button"
        onClick={onCreateClip}
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.97]"
      >
        <Plus className="w-4 h-4" />
        Create Your First Clip
      </button>
    </div>
  );
}

/* ─── Create Clip Modal ─── */
function CreateClipModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Clip text is required.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/v1/clips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          title: title.trim() || undefined,
          url: url.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to create clip");
      }
      // Reload to show the new clip
      window.location.reload();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div
        className="relative mx-4 w-full max-w-lg overflow-hidden rounded-lg border border-border bg-card"
        style={{
          boxShadow:
            "0 25px 80px -12px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border/40">
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            Create a New Clip
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Paste or type content you want to save to your library.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Title{" "}
              <span className="text-muted-foreground/50 normal-case tracking-normal font-normal">
                (optional)
              </span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your clip a name…"
              className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* Text */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your clip content…"
              rows={5}
              className="w-full resize-none rounded-md border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/40 transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Source URL{" "}
              <span className="text-muted-foreground/50 normal-case tracking-normal font-normal">
                (optional)
              </span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://…"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all"
            />
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium rounded-xl border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
            style={{
              background: "linear-gradient(145deg, #6366f1, #8b5cf6)",
            }}
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Saving…
              </span>
            ) : (
              "Save Clip"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Library View ─── */
export function ClipLibrary({ clips }: { clips: ClipDTO[] }) {
  const [showCreate, setShowCreate] = useState(false);

  // Empty state
  if (clips.length === 0) {
    return (
      <>
        <EmptyState onCreateClip={() => setShowCreate(true)} />
        <CreateClipModal
          open={showCreate}
          onClose={() => setShowCreate(false)}
        />
      </>
    );
  }

  // Clips grid
  return (
    <div className="main">
      <main className="px-6 pb-10 pt-6">
        {/* Header row with create button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">
              My Library
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {clips.length} clip{clips.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 active:scale-[0.97] shadow-md shadow-indigo-200 hover:shadow-lg"
            style={{
              background: "linear-gradient(145deg, #6366f1, #8b5cf6)",
            }}
          >
            <Plus className="w-3.5 h-3.5" />
            New Clip
          </button>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          dir="ltr"
        >
          {clips.map((clip) => (
            <NotionCard key={clip.id} clip={clip} q="" />
          ))}
        </div>
      </main>

      <CreateClipModal open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}
