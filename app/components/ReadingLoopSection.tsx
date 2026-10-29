"use client";

import type { CSSProperties } from "react";

const clips = [
  ["A focused research question gives a project direction.", "12 Feb 2026"],
  ["It narrows the field without closing off curiosity.", "9 Feb 2026"],
  ["A useful question also helps decide which evidence belongs in the project.", "3 Feb 2026"],
];

const theme = {
  "--reading-desk": "#E6DAC2",
  "--reading-sheet": "#FBF7EE",
  "--reading-library": "#14171C",
  "--reading-library-ink": "#FBF7EE",
  "--reading-library-muted": "#EDE3CF",
  "--reading-library-rule": "rgba(251,247,238,0.18)",
  "--reading-ink": "#14171C",
  "--reading-muted": "#4A4F57",
  "--reading-amber": "#F2B544",
} as CSSProperties;

export default function ReadingLoopSection() {
  return (
    <section
      id="how-it-works"
      data-reveal
      style={theme}
      className="reading-loop-section relative border-b-2 border-[var(--reading-ink)] text-[var(--reading-ink)]"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <header className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
          <h2 className="whitespace-nowrap font-serif text-[clamp(40px,4.5vw,60px)] font-bold leading-none tracking-[-0.04em]">
            Highlight it. Find it later.
          </h2>
          <p className="max-w-[380px] text-lg leading-8 text-[var(--reading-muted)]">
            Keep the sentence that matters close to its source, ready when you return.
          </p>
        </header>

        <div className="reading-sheet relative mx-auto mt-12 max-w-[1180px] rounded-[8px] border border-[var(--reading-ink)]/[0.12] bg-[var(--reading-sheet)] shadow-[0_1px_2px_rgba(20,23,28,0.06),0_16px_32px_rgba(20,23,28,0.08)]">
          <div className="relative z-10 flex h-12 items-center border-b border-[var(--reading-ink)]/10 px-8 text-sm text-[var(--reading-muted)] sm:px-10">
            openstax.org
          </div>

          <div className="relative z-10 grid items-stretch lg:grid-cols-12">
            <article className="min-w-0 p-8 sm:p-12 lg:col-span-7 lg:px-14 lg:py-12">
              <h3 className="min-w-0 max-w-full font-serif text-[clamp(28px,2.2vw,36px)] font-bold leading-[1.15] tracking-[-0.02em]">
                How questions shape research
              </h3>
              <div className="mt-8 max-w-[62ch] space-y-6 font-serif text-[1.4375rem] leading-[1.65]">
                <p>
                  <span className="reading-highlight">
                    A focused research question gives a project direction.
                  </span>{" "}
                  <span className="reading-highlight">
                    It narrows the field without closing off curiosity.
                  </span>
                </p>
                <p>
                  <span className="reading-highlight">
                    A useful question also helps decide which evidence belongs in the project.
                  </span>{" "}
                  As the project develops, the question can become more precise.
                </p>
                <p>
                  Clear questions make later review more focused and useful, because each source can be read against a purpose.
                </p>
              </div>
            </article>

            <aside
              className="reading-margin border-t p-6 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:px-9 lg:py-12"
              aria-labelledby="reading-library-title"
            >
              <div className="reading-library-header flex items-baseline justify-between gap-4 border-b pb-5">
                <h3 id="reading-library-title" className="font-serif text-[28px] font-bold">
                  Library
                </h3>
                <p className="reading-library-count text-[15px]">3 saved</p>
              </div>
              <div className="mt-5 space-y-5">
                {clips.map(([clip, date], index) => (
                  <article
                    key={clip}
                    className={`reading-clip border-l-[3px] border-[var(--reading-amber)] pl-[18px] ${index === 0 ? "reading-clip-newest bg-[var(--reading-sheet)] p-[18px] shadow-[0_8px_24px_rgba(20,23,28,0.10)]" : ""}`}
                  >
                    <p className="reading-clip-copy font-serif text-[19px] leading-[1.5]">{clip}</p>
                    <p className="reading-clip-meta mt-3 text-sm">
                      <span className="reading-clip-source font-semibold">openstax.org</span>{" "}
                      <span aria-hidden="true">·</span> <span className="reading-clip-date">{date}</span>
                    </p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
      <style jsx>{`
        .reading-loop-section {
          background-color: var(--reading-desk);
        }

        .reading-margin {
          background-color: var(--reading-library);
          border-color: var(--reading-library-rule);
          color: var(--reading-library-ink);
        }

        .reading-library-header {
          border-color: var(--reading-library-rule);
        }

        .reading-library-count,
        .reading-clip-date {
          color: var(--reading-library-muted);
        }

        .reading-clip-copy,
        .reading-clip-source {
          color: var(--reading-library-ink);
        }

        .reading-clip-meta {
          color: var(--reading-library-muted);
        }

        .reading-clip + .reading-clip {
          border-top: 1px solid var(--reading-library-rule);
          padding-top: 20px;
        }

        .reading-clip-newest {
          border-top: 0;
        }

        .reading-clip-newest .reading-clip-copy,
        .reading-clip-newest .reading-clip-source {
          color: var(--reading-ink);
        }

        .reading-clip-newest .reading-clip-meta,
        .reading-clip-newest .reading-clip-date {
          color: var(--reading-muted);
        }

        .reading-highlight {
          background-image: linear-gradient(
            transparent 38%,
            rgba(242, 181, 68, 0.7) 38%,
            rgba(242, 181, 68, 0.7) 84%,
            transparent 84%
          );
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border-radius: 2px;
          padding: 0 3px;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }

        @media (max-width: 899px) {
          .reading-loop-section h2 {
            white-space: normal;
          }

        }

        @media (max-width: 767px) {
          .reading-loop-section > div {
            padding-left: 24px;
            padding-right: 24px;
          }

          .reading-sheet {
            margin-top: 40px;
          }

          .reading-sheet > div:first-child {
            padding-left: 24px;
            padding-right: 24px;
          }

          .reading-sheet article {
            padding: 24px;
          }

          .reading-margin {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
