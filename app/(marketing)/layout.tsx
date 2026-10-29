"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const links = [["Features", "#features"], ["How it works", "#how-it-works"], ["Privacy", "#privacy"], ["Usage", "#pricing"], ["FAQ", "#faq"]];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const shell = document.querySelector<HTMLElement>(".marketing-shell");
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!shell || revealItems.length === 0) return;

    shell.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="marketing-shell min-h-screen bg-[#f4efe6] font-[var(--font-source-sans)] antialiased">
      <header className="sticky top-0 z-50 border-b-2 border-[#101820] bg-[#f4efe6]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3 text-lg font-black tracking-[-0.04em] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e55436]/40">
            <span className="grid h-8 w-8 place-items-center border-2 border-[#101820] bg-[#d9ff65]"><span className="h-3 w-3 rounded-full bg-[#e55436]" /></span>
            Clipper Pro
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map(([label, href]) => <a key={href} href={href} className="text-xs font-bold text-[#50605f] transition-colors hover:text-[#e55436] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e55436]/40">{label}</a>)}
          </nav>
          <div className="hidden md:block"><Link href="/login" className="inline-flex min-h-10 items-center border-2 border-[#101820] bg-[#101820] px-4 text-xs font-bold text-[#fffaf0] transition-colors hover:bg-[#e55436] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e55436]/40">Sign in with Google</Link></div>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center border-2 border-[#101820] md:hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e55436]/40">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {open && <nav className="border-t-2 border-[#101820] bg-[#fffaf0] px-6 py-5 md:hidden">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-[#101820]/20 py-3 text-sm font-bold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e55436]/40">{label}</a>)}<Link href="/login" className="mt-5 inline-flex min-h-12 w-full items-center justify-center border-2 border-[#101820] bg-[#101820] text-sm font-bold text-[#fffaf0]">Sign in with Google</Link></nav>}
      </header>
      <main>{children}</main>
      <footer className="border-t-2 border-[#101820] bg-[#101820] text-[#fffaf0]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div><div className="flex items-center gap-3 text-lg font-black"><span className="grid h-7 w-7 place-items-center border-2 border-[#fffaf0] bg-[#d9ff65]"><span className="h-2.5 w-2.5 rounded-full bg-[#e55436]" /></span>Clipper Pro</div><p className="mt-3 max-w-xs text-sm text-[#b8c2bd]">A learning companion for the parts of the web worth keeping.</p></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-[#b8c2bd]"><a href="#privacy" className="hover:text-[#d9ff65]">Privacy</a><a href="#faq" className="hover:text-[#d9ff65]">FAQ</a><a href="mailto:support@clipperpro.app" className="hover:text-[#d9ff65]">Contact</a></div>
          <p className="text-xs text-[#b8c2bd]">© 2026 Clipper Pro</p>
        </div>
      </footer>
    </div>
  );
}
