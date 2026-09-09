"use client";

import { useRef, type CSSProperties } from "react";
import { ScrollWords, litRamp, useTravel } from "@/components/home2/motion";
import { useSay } from "@/components/solutions/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { solutionsCopy } from "@/lib/data/solutions";

const READ = litRamp("var(--color-ink)", "var(--color-forest/65)");

export function SolutionsIntro() {
  const say = useSay();
  const copy = solutionsCopy.intro;
  const sectionRef = useRef<HTMLElement>(null);
  const constatRef = useRef<HTMLUListElement>(null);

  useTravel(constatRef, { from: 0.85, to: 0.32 });
  useTravel(sectionRef, { from: 0.72, to: 0.22, property: "--split" });

  return (
    <section ref={sectionRef} className="bg-cream py-24 sm:py-32">
      <div className="container-eiden grid items-end gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
        {/* ── The position, held while the column moves ─────────────── */}
        <div className="split-part split-lead lg:sticky lg:top-28 lg:self-start">
          <Reveal direction="none" duration={0.5}>
            <p className="eyebrow text-teal flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {say(copy.eyebrow)}
            </p>
          </Reveal>

          <ScrollWords
            as="h2"
            text={say(copy.title)}
            className="font-display text-ink mt-5 text-[clamp(2rem,5vw,3.75rem)] leading-[1.02] font-extrabold tracking-[-0.045em]"
          />
        </div>

        {/* ── The reading column ────────────────────────────────────── */}
        <div className="split-part split-body">
          <ul
            ref={constatRef}
            style={
              {
                "--n": `${copy.problem.length}`,
                "--p": "0",
              } as CSSProperties
            }
            className="editorial flex flex-col gap-4 text-[clamp(1.125rem,2.4vw,1.75rem)] leading-snug sm:gap-5"
          >
            {copy.problem.map((line, index) => (
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

          {/* What we do instead. */}
          <div className="border-forest/12 mt-14 border-t pt-10 sm:mt-16 sm:pt-12">
            <RevealWords
              as="p"
              text={say(copy.turn)}
              delay={0.05}
              className="font-display text-ink block text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.06] font-extrabold tracking-[-0.04em]"
            />
          </div>

          {/* What it leaves you with. */}
          <RevealGroup as="ul" className="mt-10 flex flex-col sm:mt-12">
            {copy.answer.map((line, index) => (
              <li
                key={say(line)}
                className="group border-forest/12 relative flex items-center gap-5 border-t py-5 last:border-b"
              >
                <span
                  aria-hidden
                  className="numeral text-teal/40 group-hover:text-teal text-[0.8rem] font-bold tracking-[0.2em] transition-colors duration-500"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-forest text-[clamp(1.0625rem,1.9vw,1.5rem)] font-bold tracking-[-0.025em] transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-1 motion-reduce:transition-none">
                  {say(line)}
                </span>
                <span
                  aria-hidden
                  className="bg-teal absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </li>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
