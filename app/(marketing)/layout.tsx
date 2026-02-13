import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0b12] text-white antialiased">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#0b0b12]/70 backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Clipper Pro
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {[
              ["Features", "#features"],
              ["How it works", "#how-it-works"],
              ["Privacy", "#privacy"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-[13px] font-medium text-white/45 transition-colors duration-200 hover:text-white/90"
              >
                {label}
              </a>
            ))}
          </nav>

          <Link
            href="/login"
            className="rounded-lg bg-violet-600 px-4 py-2 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b12]"
          >
            Sign in with Google
          </Link>
        </div>
      </header>

      {/* ── Page content ── */}
      <main>{children}</main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-purple-600">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium tracking-tight text-white/60">
              Clipper Pro
            </span>
          </div>

          <div className="flex gap-6 text-[13px] text-white/30">
            <a
              href="#"
              className="transition-colors duration-200 hover:text-white/60"
            >
              Terms
            </a>
            <a
              href="#privacy"
              className="transition-colors duration-200 hover:text-white/60"
            >
              Privacy
            </a>
            <a
              href="mailto:support@clipperpro.app"
              className="transition-colors duration-200 hover:text-white/60"
            >
              Contact
            </a>
          </div>

          <p className="text-[13px] text-white/20">&copy; 2026 Clipper Pro</p>
        </div>
      </footer>
    </div>
  );
}
