"use client";

import { useRef, type CSSProperties } from "react";
import { ScrollWords, litRamp, useTravel } from "@/components/home2/motion";
import { useLocalized } from "@/components/project/shared";
import { Reveal } from "@/components/ui/reveal";
import type { ProjectCase } from "@/lib/data/projects/types";

/**
 * The account reads back muted and turns to ink one line at a time as the
 * block rises — the same ramp the solutions starting point uses, pitched off
 * gold so the unlit state still holds its own on cream.
 */
const READ = litRamp("var(--color-ink)", "var(--color-gold-dk)");

/**
 * 03 — The transformation, told the way the solutions page states its
 * starting point: the heading pinned on the left, the reading column running
 * past it.
 *
 * The heading lights word by word as the block travels, and the account lights
 * line by line beneath it, so the turn is arrived at rather than handed over.
 * Both run off one rAF-throttled listener writing `--p`; React never re-renders
 * mid-scroll, and everything resolves to its finished state under reduced
 * motion.
 *
 * No boxes and no ground of its own: the page is measured in air here, and the
 * hairline over the column is the only rule in the section.
 */
export function CaseTransformation({
  transformation,
}: {
  transformation: ProjectCase["transformation"];
}) {
  const say = useLocalized();
  const accountRef = useRef<HTMLUListElement>(null);

  useTravel(accountRef, { from: 0.85, to: 0.32 });

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-eiden grid items-end gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
        {/* ── The turn, held while the column moves ─────────────────── */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal direction="none" duration={0.5}>
            <p className="eyebrow text-teal flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {say({ fr: "La transformation", en: "The transformation" })}
            </p>
          </Reveal>

          <ScrollWords
            as="h2"
            text={say(transformation.title)}
            className="font-display text-ink mt-5 text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.045em]"
          />
        </div>

        {/* ── The reading column ────────────────────────────────────── */}
        <div>
          {/* `--n` on the run, `--i` on each line: the ramp does the rest,
              without a re-render per frame. */}
          <ul
            ref={accountRef}
            style={
              {
                "--n": `${transformation.text.length}`,
                "--p": "0",
              } as CSSProperties
            }
            className="editorial flex flex-col gap-4 text-[clamp(1.125rem,2.4vw,1.75rem)] leading-snug sm:gap-5"
          >
            {transformation.text.map((line, index) => (
              <li
                key={say(line)}
                style={
                  {
                    "--i": `${index}`,
                    color: READ,
                    transition: "color 0.25s linear",
                  } as CSSProperties
                }
              >
                {say(line)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
