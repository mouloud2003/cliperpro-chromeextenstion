import Link from "next/link";
import {
  Sparkles,
  Bookmark,
  FolderOpen,
  Brain,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Layers,
  Clock,
  Eye,
  FileText,
} from "lucide-react";

/* ────────────────────────────────────────────
   Clipper Pro — Public Landing Page
   ──────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden px-6 pb-28 pt-20 md:pb-36 md:pt-28 lg:px-8">
        {/* Single subtle ambient wash */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/[0.045] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* ── Copy ── */}
            <div className="max-w-xl">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/15 bg-violet-500/[0.06] px-4 py-1.5 text-[13px] font-medium text-violet-300/80">
                <Sparkles className="h-3 w-3" />
                Chrome Extension for learners
              </div>

              <h1 className="text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-white/95 md:text-[3.5rem] lg:text-[4rem]">
                Turn web reading
                <br />
                into{" "}
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                  ready-to-use
                  <br className="hidden sm:block" /> knowledge.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/50 md:text-lg md:leading-relaxed">
                Save any text from the web, organize it in your personal
                library, and let AI create summaries in the format you learn
                best.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b12]"
                >
                  Get started free
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-7 py-3 text-sm font-medium text-white/60 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white/80"
                >
                  See how it works
                </a>
              </div>

              <p className="mt-8 flex items-center gap-2 text-[13px] text-white/30">
                <Shield className="h-3.5 w-3.5 text-violet-400/50" />
                AI runs only when you click Summarize.
              </p>
            </div>

            {/* ── Mock UI cards ── */}
            <div className="relative hidden lg:block">
              <div className="relative h-[420px] w-full">
                {/* Gentle glow behind cards */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.05] blur-[100px]" />

                {/* Card 1 — Saved Clip */}
                <div className="absolute left-0 top-10 w-[250px] -rotate-3 rounded-xl border border-white/[0.06] bg-[#12121c]/90 p-5 shadow-xl shadow-black/20 backdrop-blur-sm transition-transform duration-500 ease-out hover:rotate-0 hover:scale-[1.03]">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/35">
                    <Bookmark className="h-3 w-3 text-violet-400/70" />
                    Saved Clip
                  </div>
                  <p className="text-[13px] font-medium leading-snug text-white/80">
                    &ldquo;Understanding React Server Components and how they
                    change data fetching&hellip;&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[11px] text-white/25">
                    <span className="rounded bg-white/[0.05] px-1.5 py-0.5">
                      medium.com
                    </span>
                    <span>&middot;</span>
                    <span>2 min read</span>
                  </div>
                </div>

                {/* Card 2 — AI Summary (front center) */}
                <div className="absolute left-1/2 top-0 z-10 w-[280px] -translate-x-1/2 rounded-xl border border-white/[0.06] bg-[#12121c]/90 p-5 shadow-xl shadow-black/20 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/35">
                    <Sparkles className="h-3 w-3 text-violet-400/70" />
                    AI Summary
                  </div>
                  <div className="mb-4 flex gap-1.5">
                    <span className="rounded-md bg-violet-500/15 px-2.5 py-1 text-[11px] font-medium text-violet-300/80">
                      Bullets
                    </span>
                    <span className="rounded-md bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/30">
                      Paragraph
                    </span>
                    <span className="rounded-md bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/30">
                      Q&amp;A
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      "Server Components render on the server with zero client JS bundle",
                      "Direct database access without API endpoints",
                      "Automatic code splitting per component",
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-violet-400/60" />
                        <p className="text-[13px] leading-snug text-white/50">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 3 — Usage */}
                <div className="absolute right-0 top-14 w-[230px] rotate-2 rounded-xl border border-white/[0.06] bg-[#12121c]/90 p-5 shadow-xl shadow-black/20 backdrop-blur-sm transition-transform duration-500 ease-out hover:rotate-0 hover:scale-[1.03]">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/35">
                    <BarChart3 className="h-3 w-3 text-violet-400/70" />
                    Monthly Usage
                  </div>
                  <p className="text-2xl font-bold text-white/85">
                    12{" "}
                    <span className="text-sm font-normal text-white/30">
                      / 30
                    </span>
                  </p>
                  <p className="mt-1 text-[11px] text-white/30">
                    summaries this month
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                    <div className="h-full w-[40%] rounded-full bg-violet-500/60" />
                  </div>
                  <p className="mt-2 text-[11px] text-white/20">Resets Mar 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SOCIAL PROOF ═══════════════ */}
      <section className="border-y border-white/[0.05] px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { value: "2,400+", label: "clips saved this month" },
              { value: "890+", label: "AI summaries generated" },
              { value: "4.9/5", label: "average user rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold tracking-tight text-white/85 md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[13px] text-white/35">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROBLEM → SOLUTION ═══════════════ */}
      <section className="px-6 py-24 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white/90 md:text-3xl lg:text-4xl">
              Sound familiar?
            </h2>
            <p className="mt-4 text-base text-white/40 md:text-lg">
              The web is full of great content. The problem is what happens
              after you read it.
            </p>
          </div>

          {/* Problems */}
          <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
            {(
              [
                {
                  icon: Layers,
                  title: "Too many tabs",
                  desc: "You bookmark everything but never go back. Hundreds of tabs collecting dust.",
                },
                {
                  icon: FileText,
                  title: "Notes everywhere",
                  desc: "Scattered across apps, docs, and sticky notes. Nothing connects.",
                },
                {
                  icon: Clock,
                  title: "Re-reading the same things",
                  desc: "You forget what you read and waste time re-reading articles from scratch.",
                },
              ] as const
            ).map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-6"
              >
                <item.icon className="h-5 w-5 text-white/25" />
                <h3 className="mt-4 text-[15px] font-semibold text-white/75">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/35">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Transition arrow */}
          <div className="my-10 flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/15 bg-violet-500/[0.06]">
              <ChevronDown className="h-4 w-4 text-violet-400/60" />
            </div>
          </div>

          {/* Solution flow */}
          <div className="mx-auto max-w-2xl">
            <div className="rounded-xl border border-violet-500/10 bg-violet-500/[0.025] px-6 py-8 text-center md:px-10">
              <h3 className="text-lg font-semibold text-white/85">
                The Clipper Pro way
              </h3>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-[13px] font-medium">
                {["Clip", "Library", "Summarize", "Study"].map((step, i) => (
                  <span key={step} className="flex items-center gap-2.5">
                    {i > 0 && <ArrowRight className="h-3 w-3 text-white/15" />}
                    <span className="rounded-full bg-violet-500/15 px-3.5 py-1.5 text-violet-300/80">
                      {step}
                    </span>
                  </span>
                ))}
              </div>
              <p className="mt-5 text-[13px] text-white/35">
                One flow. No context switching. Everything in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section
        id="features"
        className="border-t border-white/[0.05] px-6 py-24 md:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white/90 md:text-3xl lg:text-4xl">
              Everything you need to learn smarter
            </h2>
            <p className="mt-4 text-base text-white/40 md:text-lg">
              Powerful features, simple experience, total control.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {(
              [
                {
                  icon: Zap,
                  title: "Save clips fast",
                  desc: "Select text on any webpage. One click saves it to your library with source and date.",
                },
                {
                  icon: FolderOpen,
                  title: "Clean library",
                  desc: "Search, filter, and organize all your clips in one beautiful, distraction-free space.",
                },
                {
                  icon: Brain,
                  title: "Summaries on demand",
                  desc: "Choose bullets, paragraph, or Q&A. AI creates the summary only when you ask.",
                },
                {
                  icon: BarChart3,
                  title: "Control & limits",
                  desc: "Monthly usage tracking keeps you in control. Upgrade anytime for more summaries.",
                },
              ] as const
            ).map((item, i) => (
              <div
                key={i}
                className="group rounded-xl border border-white/[0.05] bg-white/[0.015] p-6 transition-colors duration-300 hover:border-violet-500/15 hover:bg-violet-500/[0.02]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/[0.08] text-violet-400/70 transition-colors duration-300 group-hover:bg-violet-500/[0.12] group-hover:text-violet-400">
                  <item.icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-white/85">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/38">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section
        id="how-it-works"
        className="border-t border-white/[0.05] px-6 py-24 md:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white/90 md:text-3xl lg:text-4xl">
              Three steps to smarter reading
            </h2>
            <p className="mt-4 text-base text-white/40 md:text-lg">
              It takes less than 30&nbsp;seconds to go from reading to
              ready-to-use notes.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
            {(
              [
                {
                  step: "01",
                  title: "Clip it",
                  desc: "Highlight text on any webpage and click the Clipper Pro extension. Your clip is saved instantly.",
                  icon: Bookmark,
                },
                {
                  step: "02",
                  title: "Organize it",
                  desc: "View all your clips in a searchable library. Everything is timestamped and sourced.",
                  icon: FolderOpen,
                },
                {
                  step: "03",
                  title: "Summarize it",
                  desc: "Click Summarize, choose your format, and get AI-powered notes in seconds.",
                  icon: Sparkles,
                },
              ] as const
            ).map((item, i) => (
              <div
                key={i}
                className="relative rounded-xl border border-white/[0.05] bg-[#0b0b12] p-7"
              >
                <span className="absolute right-6 top-5 text-4xl font-black text-white/[0.03]">
                  {item.step}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/[0.08] text-violet-400/70">
                  <item.icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-white/85">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/38">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRIVACY & CONTROL ═══════════════ */}
      <section
        id="privacy"
        className="border-t border-white/[0.05] px-6 py-24 md:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/[0.08]">
              <Shield className="h-5 w-5 text-violet-400/70" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white/90 md:text-3xl lg:text-4xl">
              Privacy-first by design
            </h2>
            <p className="mt-4 text-base text-white/40 md:text-lg">
              Your data stays yours. AI is a tool you control, not one that
              controls you.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
            {(
              [
                {
                  icon: Eye,
                  title: "AI is opt-in",
                  desc: "Summaries are generated only when you explicitly request them. No background processing.",
                },
                {
                  icon: Zap,
                  title: "On-demand only",
                  desc: "Click Summarize to use AI. Your clips are stored without any AI involvement.",
                },
                {
                  icon: BarChart3,
                  title: "Monthly tracking",
                  desc: "See exactly how many AI summaries you've used. Transparent limits, no surprises.",
                },
              ] as const
            ).map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-6 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/[0.08] text-violet-400/70">
                  <item.icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-white/85">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/38">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section
        id="faq"
        className="border-t border-white/[0.05] px-6 py-24 md:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white/90 md:text-3xl lg:text-4xl">
            Frequently asked questions
          </h2>

          <div className="mt-12 space-y-3">
            {[
              {
                q: "What browsers does Clipper Pro support?",
                a: "Clipper Pro is a Chrome extension that works on all Chromium-based browsers including Google Chrome, Microsoft Edge, Brave, and Arc.",
              },
              {
                q: "How does the AI summarization work?",
                a: "When you click Summarize on any clip, we send that text to our AI model which generates a summary in your chosen format (bullets, paragraph, or Q&A). AI is never used unless you explicitly request it.",
              },
              {
                q: "Is my data private?",
                a: "Yes. Your clips are stored securely in your account. AI processing happens only when you click Summarize, and we don't use your data to train models.",
              },
              {
                q: "Can I export my clips?",
                a: "We're working on export features including Markdown and CSV formats. Stay tuned for updates.",
              },
              {
                q: "What happens when I hit my monthly summary limit?",
                a: "Your clips and existing summaries remain fully accessible. You simply can't generate new AI summaries until your limit resets on the 1st of the next month, or you upgrade to Pro.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/[0.05] bg-white/[0.015] transition-colors duration-200 open:border-violet-500/10 open:bg-violet-500/[0.015]"
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-[13px] font-medium text-white/70 marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/20 transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-4 text-[13px] leading-relaxed text-white/40">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="border-t border-white/[0.05] px-6 py-24 md:py-32 lg:px-8">
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white/90 md:text-3xl lg:text-4xl">
            Start turning reading into knowledge
          </h2>
          <p className="mt-4 text-base text-white/40 md:text-lg">
            Join thousands of learners who save time and learn more with Clipper
            Pro.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b12]"
            >
              Sign in with Google
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <p className="text-[13px] text-white/25">
              Free forever. No credit card required.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
