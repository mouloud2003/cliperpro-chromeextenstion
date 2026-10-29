"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type SceneStyle = CSSProperties & Record<`--${string}`, string>;
type Format = "Bullets" | "Paragraph" | "Study notes";

const summaries: Record<Format, string[]> = {
  Bullets: [
    "Sets a clear direction for the project.",
    "Narrows the topic without ending curiosity.",
    "Keeps room for discovery.",
  ],
  Paragraph: [
    "A focused question gives the project direction while keeping space for discovery.",
  ],
  "Study notes": [
    "Research question: the project’s guiding boundary.",
    "Useful tension: focus the topic, keep curiosity open.",
    "Review prompt: what should this question help us notice?",
  ],
};

const panelStyle = (delay: string): SceneStyle => ({
  "--panel-delay": delay,
});

export default function MarketingScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const summarizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [format, setFormat] = useState<Format>("Bullets");
  const [summaryVisible, setSummaryVisible] = useState(true);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const renderTilt = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      scene.style.setProperty("--tilt-x", `${currentX}deg`);
      scene.style.setProperty("--tilt-y", `${currentY}deg`);
      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        frame = requestAnimationFrame(renderTilt);
      } else {
        frame = 0;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || window.innerWidth < 768 || event.pointerType !== "mouse") return;
      const bounds = scene.getBoundingClientRect();
      targetY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
      targetX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
      if (!frame) frame = requestAnimationFrame(renderTilt);
    };

    const resetTilt = () => {
      targetX = 0;
      targetY = 0;
      if (!frame) frame = requestAnimationFrame(renderTilt);
    };

    const onMotionChange = () => {
      scene.classList.toggle("motion-reduced", reducedMotion.matches);
      if (reducedMotion.matches) resetTilt();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scene.classList.add("scene-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(scene);
    scene.addEventListener("pointermove", onPointerMove);
    scene.addEventListener("pointerleave", resetTilt);
    reducedMotion.addEventListener("change", onMotionChange);
    onMotionChange();

    return () => {
      observer.disconnect();
      scene.removeEventListener("pointermove", onPointerMove);
      scene.removeEventListener("pointerleave", resetTilt);
      reducedMotion.removeEventListener("change", onMotionChange);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => () => {
    if (summarizeTimer.current) clearTimeout(summarizeTimer.current);
  }, []);

  const selectFormat = (nextFormat: Format) => {
    setFormat(nextFormat);
    setSummaryVisible(true);
  };

  const summarize = () => {
    if (summarizeTimer.current) clearTimeout(summarizeTimer.current);
    setSummaryVisible(false);
    summarizeTimer.current = setTimeout(() => setSummaryVisible(true), 180);
  };

  const sectionStyle: SceneStyle = {
    "--scene-bg": "#0C1226",
    "--scene-paper": "#F3EBDD",
    "--scene-muted": "#A9B0C3",
    "--scene-amber": "#F2B544",
    "--scene-ink": "#14171C",
    "--scene-back": "#CDC5B4",
    "--scene-middle": "#E3DBCA",
    "--scene-front": "#F6F0E3",
    "--scene-track": "#D9D1BF",
    "--scene-pool": "#151D39",
  };

  return (
    <section
      id="privacy"
      data-reveal
      style={sectionStyle}
      className="marketing-scene-section relative overflow-hidden border-b-2 border-[var(--scene-ink)] bg-[var(--scene-bg)] text-[var(--scene-paper)]"
    >
      <div className="marketing-scene-pool pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--scene-pool)] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="max-w-xl">
            <h2 className="max-w-lg text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              AI runs only when you press Summarize.
            </h2>
            <div className="mt-8 space-y-3 text-lg leading-8 text-[var(--scene-muted)]">
              <p>Summaries are never created automatically.</p>
              <p>Your monthly limit is visible before you request one.</p>
            </div>
          </div>

          <div
            ref={sceneRef}
            className="marketing-scene relative mx-auto min-h-[820px] w-full max-w-[680px] [perspective:1300px] [--tilt-x:0deg] [--tilt-y:0deg]"
          >
            <div className="marketing-scene-stage absolute inset-0">
              <article
                className="marketing-scene-panel marketing-scene-web absolute left-[2%] top-4 w-[76%] border border-[var(--scene-ink)] bg-[var(--scene-back)] p-5 text-[var(--scene-ink)] shadow-[0_3px_4px_rgba(0,0,0,0.42),18px_22px_34px_rgba(0,0,0,0.3)] sm:p-7"
                style={panelStyle("0ms")}
              >
                <div className="marketing-scene-panel-inner">
                  <div className="marketing-scene-caption text-base font-bold">On the page</div>
                  <h3 className="mt-6 text-2xl font-black leading-tight">How questions shape research</h3>
                  <p className="mt-4 text-base leading-7 text-[var(--scene-ink)]/90">
                    A focused research question gives a project direction. It narrows the field without closing off curiosity.
                  </p>
                  <p className="mt-3 bg-[var(--scene-amber)] px-2 py-1 text-base leading-7">
                    A focused research question gives a project direction.
                  </p>
                </div>
              </article>

              <article
                className="marketing-scene-panel marketing-scene-clip absolute left-[12%] top-[205px] w-[78%] border border-[var(--scene-ink)] bg-[var(--scene-middle)] p-5 text-[var(--scene-ink)] shadow-[0_3px_4px_rgba(0,0,0,0.42),18px_24px_38px_rgba(0,0,0,0.34)] sm:p-7"
                style={panelStyle("120ms")}
              >
                <div className="marketing-scene-panel-inner">
                  <div className="marketing-scene-caption text-base font-bold">Saved clip</div>
                  <div className="mt-4 flex items-start justify-between gap-4 border-t border-[var(--scene-ink)]/20 pt-4">
                    <div>
                      <p className="text-lg font-black">How questions shape research</p>
                      <p className="mt-1 text-base text-[var(--scene-ink)]/70">openstax.org · 12 Feb 2026</p>
                    </div>
                  </div>
                  <p className="mt-5 text-lg leading-8">
                    A focused research question gives a project direction while leaving room for discovery.
                  </p>
                </div>
              </article>

              <article
                className="marketing-scene-panel marketing-scene-summary absolute left-[23%] top-[405px] w-[75%] border border-[var(--scene-ink)] bg-[var(--scene-front)] p-5 text-[var(--scene-ink)] shadow-[0_3px_4px_rgba(0,0,0,0.45),18px_26px_42px_rgba(0,0,0,0.38)] sm:p-7"
                style={panelStyle("240ms")}
              >
                <div className="marketing-scene-panel-inner">
                  <div className="marketing-scene-caption text-base font-bold">Your summary</div>
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--scene-ink)]/20 pt-4" role="tablist" aria-label="Summary formats">
                    {(Object.keys(summaries) as Format[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        role="tab"
                        aria-selected={format === option}
                        onClick={() => selectFormat(option)}
                        className={`min-h-11 border px-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--scene-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--scene-front)] ${format === option ? "border-[var(--scene-amber)] bg-[var(--scene-amber)] text-[var(--scene-ink)]" : "border-[var(--scene-ink)]/35 text-[var(--scene-ink)]"}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className={`mt-4 min-h-[106px] transition-opacity duration-200 ${summaryVisible ? "opacity-100" : "opacity-0"}`}>
                    <ul className="space-y-2 text-base leading-7">
                      {summaries[format].map((line) => <li key={line}>{line}</li>)}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={summarize}
                    className="min-h-11 border border-[var(--scene-ink)] bg-[var(--scene-ink)] px-4 text-sm font-bold text-[var(--scene-paper)] transition-colors hover:bg-[var(--scene-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--scene-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--scene-front)]"
                  >
                    Summarize
                  </button>
                  <div className="mt-4 border-t border-[var(--scene-ink)]/20 pt-4">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="font-bold">Monthly summaries</span>
                      <span className="text-[var(--scene-ink)]/65">Example</span>
                    </div>
                    <div className="mt-3 h-2 w-full bg-[var(--scene-track)]" role="img" aria-label="Example usage: 3 of 10 summaries used">
                      <div className="h-full w-[30%] bg-[var(--scene-bg)]" />
                    </div>
                    <p className="mt-2 text-sm text-[var(--scene-ink)]/70">3 of 10 summaries used</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .marketing-scene-stage {
          transform: rotateX(calc(5deg + var(--tilt-x))) rotateY(calc(-8deg + var(--tilt-y)));
          transform-style: preserve-3d;
          transition: transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .marketing-scene-panel {
          --panel-z: 0px;
          opacity: 0.3;
          transform: translateZ(var(--panel-z)) rotateZ(0deg);
          transform-origin: center;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          will-change: auto;
          transition:
            transform 1000ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 700ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--panel-delay);
        }

        .marketing-scene-panel::before {
          content: "";
          position: absolute;
          inset: 0 0 auto;
          height: 1px;
          background: rgba(255, 255, 255, 0.68);
        }

        .marketing-scene-panel-inner {
          transform: translateZ(0);
          animation: scene-float 6s ease-in-out infinite;
        }

        .marketing-scene-clip .marketing-scene-panel-inner {
          animation-delay: -2s;
        }

        .marketing-scene-summary .marketing-scene-panel-inner {
          animation-delay: -4s;
        }

        .scene-visible .marketing-scene-web {
          --panel-z: -100px;
          opacity: 1;
          transform: translateZ(var(--panel-z)) rotateZ(-5deg);
        }

        .scene-visible .marketing-scene-clip {
          --panel-z: -35px;
          opacity: 1;
          transform: translateZ(var(--panel-z)) rotateZ(2deg);
        }

        .scene-visible .marketing-scene-summary {
          --panel-z: 40px;
          opacity: 1;
          transform: translateZ(var(--panel-z)) rotateZ(-2deg);
        }

        .scene-visible .marketing-scene-panel {
          will-change: transform, opacity;
        }

        .motion-reduced .marketing-scene-stage {
          transform: rotateX(2deg) rotateY(-3deg);
          transition: none;
        }

        .motion-reduced .marketing-scene-panel,
        .motion-reduced .marketing-scene-panel-inner {
          animation: none;
          transition: none;
        }

        @keyframes scene-float {
          0%, 100% { transform: translate3d(0, -2px, 0); }
          50% { transform: translate3d(0, 2px, 0); }
        }

        @media (max-width: 767px) {
          .marketing-scene {
            min-height: 820px;
          }

          .marketing-scene-stage {
            transform: rotateX(2deg) rotateY(-3deg);
          }

          .marketing-scene-web {
            left: 0;
            width: 92%;
          }

          .marketing-scene-clip {
            left: 4%;
            top: 180px;
            width: 92%;
          }

          .marketing-scene-summary {
            left: 8%;
            top: 355px;
            width: 92%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marketing-scene-stage {
            transform: rotateX(2deg) rotateY(-3deg);
            transition: none;
          }

          .marketing-scene-panel,
          .marketing-scene-panel-inner {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
