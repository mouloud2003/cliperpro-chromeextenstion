import Link from "next/link";
import MarketingScene from "../components/MarketingScene";
import ReadingLoopSection from "../components/ReadingLoopSection";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Folder,
  Highlighter,
  LockKeyhole,
  MousePointer2,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Highlighter,
    title: "Clip the useful part",
    text: "Save a paragraph, passage, or idea from any page without leaving your reading flow.",
    color: "bg-[#d9ff65]",
  },
  {
    icon: Folder,
    title: "Build a personal library",
    text: "Keep source, date, and context together so your saved reading stays findable.",
    color: "bg-[#8fe4d2]",
  },
  {
    icon: Sparkles,
    title: "Summarize on request",
    text: "Ask for bullets, a paragraph, or study notes only when you want a shorter version.",
    color: "bg-[#ff927b]",
  },
];

const faqs = [
  ["What is Clipper Pro?", "Clipper Pro is a learning companion for saving web text, organizing it in a personal library, and creating AI summaries on request."],
  ["Does AI summarize my clips automatically?", "No. Your clips stay as captured until you choose a format and click the summarize action."],
  ["What summary formats are available?", "You can request bullet points, a paragraph, or study notes depending on how you want to review the clip."],
  ["How do usage limits work?", "AI summaries count toward a monthly usage limit. Your saved clips and existing summaries remain available when you reach it."],
];

function GoogleMark() {
  return (
    <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] font-bold text-[#3c4043]">
      G
    </span>
  );
}

function ClipWalkthrough() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] lg:ml-auto">
      <div className="absolute -left-4 top-8 hidden h-24 w-24 rounded-full bg-[#ff927b] blur-3xl sm:block" />
      <div className="relative grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="clip-source rotate-[-2deg] border-2 border-[#101820] bg-[#fffaf0] p-5 shadow-[8px_8px_0_#101820]">
          <div className="mb-5 flex items-center justify-between border-b border-[#101820]/15 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#50605f]">
            <span>Reading tab</span>
            <span className="h-2 w-2 rounded-full bg-[#ff6b4a]" />
          </div>
          <p className="text-sm font-bold text-[#101820]">The value of a good research question</p>
          <p className="mt-4 text-[13px] leading-6 text-[#50605f]">
            A useful question gives a project direction. It narrows the field without closing off curiosity.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded bg-[#d9ff65] px-2 py-1 text-[11px] font-bold text-[#101820]">
            <MousePointer2 className="h-3 w-3" /> Select to clip
          </div>
        </div>

        <ArrowRight className="flow-arrow mx-auto hidden h-7 w-7 text-[#ff6b4a] sm:block" />
        <ArrowDownRight className="flow-arrow mx-auto h-7 w-7 text-[#ff6b4a] sm:hidden" />

        <div className="clip-summary rotate-[2deg] border-2 border-[#101820] bg-[#101820] p-5 text-[#fffaf0] shadow-[8px_8px_0_#ff6b4a]">
          <div className="mb-5 flex items-center justify-between border-b border-white/15 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b8c2bd]">
            <span>Saved clip</span>
            <span className="rounded-full bg-[#d9ff65] px-2 py-0.5 text-[9px] text-[#101820]">Library</span>
          </div>
          <p className="text-sm font-bold">Research questions give a project direction.</p>
          <div className="mt-5 border-t border-white/15 pt-4">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-[#b8c2bd]">
              <span>Summary</span><span className="text-[#d9ff65]">Bullets</span>
            </div>
            <ul className="mt-3 space-y-2 text-[12px] leading-5 text-[#fffaf0]">
              <li className="flex gap-2"><span className="text-[#ff927b]">—</span> Gives a project direction</li>
              <li className="flex gap-2"><span className="text-[#ff927b]">—</span> Narrows the field</li>
              <li className="flex gap-2"><span className="text-[#ff927b]">—</span> Keeps curiosity open</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-7 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#50605f]">clip → keep → ask for a summary</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-[#f4efe6] text-[#101820]">
      <section className="relative overflow-hidden border-b-2 border-[#101820]">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 sm:px-8 lg:px-12 lg:pb-20 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#e55436]">A sharper way to study the web</p>
              <h1 className="max-w-xl text-[3.4rem] font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-[5.8rem]">
                Keep what
                <br />
                <span className="text-[#e55436]">matters.</span>
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-8 text-[#50605f]">
                Clipper Pro turns scattered web reading into a personal library of useful clips — with AI summaries when you choose to ask.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/login" className="inline-flex min-h-12 items-center justify-center gap-3 border-2 border-[#101820] bg-[#101820] px-6 text-sm font-bold text-[#fffaf0] shadow-[4px_4px_0_#ff6b4a] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#ff6b4a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e55436]/40">
                  <GoogleMark /> Sign in with Google
                </Link>
                <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#101820] px-6 text-sm font-bold transition-colors hover:bg-[#d9ff65] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e55436]/40">
                  See the workflow <ArrowDownRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs font-bold text-[#50605f]"><LockKeyhole className="h-4 w-4 text-[#e55436]" /> AI is explicit. Nothing is summarized without your click.</p>
            </div>
            <ClipWalkthrough />
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-16 -right-8 hidden h-44 w-44 rounded-full border-[18px] border-[#d9ff65] lg:block" />
      </section>

      <section id="features" data-reveal className="border-b-2 border-[#101820] bg-[#fffaf0]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e55436]">The essentials</p>
              <h2 className="mt-4 max-w-sm text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl">Less sorting. More learning.</h2>
            </div>
            <div className="grid gap-0 border-t-2 border-[#101820] sm:grid-cols-3 sm:border-l-2 sm:border-t-0">
              {features.map(({ icon: Icon, title, text, color }) => (
                <article key={title} data-reveal className="border-b-2 border-[#101820] py-6 sm:border-b-0 sm:border-r-2 sm:px-7 first:sm:pl-7 last:border-r-0">
                  <div className={`grid h-11 w-11 place-items-center border-2 border-[#101820] ${color}`}><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-6 text-lg font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#50605f]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReadingLoopSection />

      <MarketingScene />

      <section id="pricing" data-reveal className="border-b-2 border-[#101820] bg-[#eadbd4]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8e4737]">Usage, made legible</p><h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Start with the essentials.</h2></div><p className="max-w-sm text-sm font-bold leading-6 text-[#4c3b38]">Your clips and library are always yours. AI summaries use a monthly allowance so you stay in control.</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="border-2 border-[#101820] bg-[#fffaf0] p-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e55436]">Included</p><h3 className="mt-4 text-3xl font-black">Clip + Library</h3><ul className="mt-6 space-y-3 text-sm font-bold">{["Save text from the web", "Personal clip library", "Source and date attached", "Existing summaries stay accessible"].map(item => <li key={item} className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-[#e55436]" />{item}</li>)}</ul></div>
            <div className="border-2 border-[#101820] bg-[#101820] p-7 text-[#fffaf0]"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d9ff65]">When you need it</p><h3 className="mt-4 text-3xl font-black">On-demand summaries</h3><ul className="mt-6 space-y-3 text-sm font-bold text-[#fffaf0]">{["Bullets, paragraphs, or study notes", "Monthly usage limit shown clearly", "Request only what is useful now", "No automatic AI processing"].map(item => <li key={item} className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-[#d9ff65]" />{item}</li>)}</ul></div>
          </div>
        </div>
      </section>

      <section id="faq" data-reveal className="bg-[#f4efe6]">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:px-8 lg:py-20">
          <div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e55436]">Good to know</p><h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Questions, answered.</h2></div>
          <div className="mt-8 divide-y-2 divide-[#101820] border-y-2 border-[#101820]">{faqs.map(([question, answer]) => <details key={question} className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e55436]/40 [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" /></summary><p className="max-w-2xl pt-3 text-sm leading-6 text-[#50605f]">{answer}</p></details>)}</div>
        </div>
      </section>

      <section data-reveal className="border-t-2 border-[#101820] bg-[#fffaf0]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-14 sm:px-8 md:flex-row md:items-end lg:px-12 lg:py-16"><div><h2 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl">Make your next tab worth keeping.</h2></div><Link href="/login" className="inline-flex min-h-12 items-center gap-3 border-2 border-[#101820] bg-[#d9ff65] px-6 text-sm font-black shadow-[4px_4px_0_#101820] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#101820] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e55436]/40">Sign in with Google <ArrowRight className="h-4 w-4" /></Link></div>
      </section>
    </div>
  );
}
