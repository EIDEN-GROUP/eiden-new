"use client";

import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import type { ProjectCase } from "@/lib/data/projects/types";

/**
 * 07   Outcome.
 *
 * Short, and qualitative unless the client has already published a figure.
 * Half of these projects have no number attached to them and are none the
 * worse for it: "a catalogue browsed the way a stone is chosen" is a result,
 * and inventing a percentage to sit beside it would cost more credibility
 * than the percentage would buy.
 *
 * Where a figure does exist it is set beside the statement rather than under
 * a heading of its own   one number, stated once, is more convincing than a
 * row of three.
 */
export function CaseOutcome({
  outcome,
}: {
  outcome: ProjectCase["outcome"];
}) {
  const say = useLocalized();

  return (
    <section data-nav-tone="dark" className="grain bg-ink text-canvas">
      <div className="container-eiden py-20 sm:py-28">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-canvas/35">
            {say({ fr: "Résultat", en: "Outcome" })}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div>
            <RevealWords
              as="h2"
              text={say(outcome.title)}
              delay={0.06}
              className="font-display text-canvas block max-w-3xl text-[clamp(1.625rem,4vw,2.875rem)] leading-[1.1] font-medium tracking-[-0.03em]"
            />

            <Reveal delay={0.2}>
              <p className="text-canvas/55 mt-8 max-w-2xl text-[0.9375rem] leading-relaxed sm:text-base">
                {say(outcome.text)}
              </p>
            </Reveal>
          </div>

          {outcome.metric ? (
            <Reveal delay={0.26}>
              <div className="border-canvas/15 border-t pt-6">
                <p className="font-display text-gold text-[clamp(3rem,7vw,4.5rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums">
                  {outcome.metric}
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
