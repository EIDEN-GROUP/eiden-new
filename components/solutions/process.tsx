"use client";

import { Band, BandLabel, useSay } from "@/components/solutions/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { solutionsCopy } from "@/lib/data/solutions";

/**
 * How a system gets built. Five steps, one line each.
 *
 * Laid out as rows rather than cards: the process is a sequence, and rows
 * read in order where a grid of five boxes would not.
 */
export function Process() {
  const say = useSay();
  const copy = solutionsCopy.process;

  return (
    <Band>
      <BandLabel number="03">{say(copy.lead)}</BandLabel>

      <RevealWords
        as="h2"
        text={say(copy.title)}
        delay={0.06}
        className="text-ink mt-12 block max-w-4xl text-[clamp(1.875rem,5vw,3.75rem)] uppercase"
      />

      <RevealGroup className="mt-14 flex flex-col">
        {copy.steps.map((step, index) => (
          <div
            key={say(step.title)}
            className="border-ink/12 grid gap-2 border-b py-7 first:border-t sm:grid-cols-[4rem_minmax(0,14rem)_minmax(0,1fr)] sm:items-baseline sm:gap-8"
          >
            <p className="eyebrow text-ink/30 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display text-ink text-[clamp(1.25rem,2.2vw,1.75rem)] leading-none font-extrabold tracking-[-0.03em] uppercase">
              {say(step.title)}
            </h3>
            <p className="text-ink/60 max-w-md text-[0.9375rem] leading-relaxed">
              {say(step.text)}
            </p>
          </div>
        ))}
      </RevealGroup>
    </Band>
  );
}

/**
 * The layers a system can carry. Eight modules, one line each, on a grid
 * that keeps them equal — none of them is the headline feature.
 */
export function Capabilities() {
  const say = useSay();
  const copy = solutionsCopy.layers;

  return (
    <Band>
      <RevealWords
        as="h2"
        text={say(copy.title)}
        className="text-ink block max-w-4xl text-[clamp(1.875rem,5vw,3.75rem)] uppercase"
      />

      <RevealGroup className="mt-14 grid gap-x-10 gap-y-px sm:grid-cols-2 lg:grid-cols-4">
        {copy.modules.map((module) => (
          <article key={say(module.title)} className="border-ink/12 border-t py-6">
            <h3 className="font-display text-ink text-[1.0625rem] leading-none font-bold tracking-[-0.02em] uppercase">
              {say(module.title)}
            </h3>
            <p className="text-ink/55 mt-3 text-[0.9375rem] leading-relaxed">
              {say(module.text)}
            </p>
          </article>
        ))}
      </RevealGroup>
    </Band>
  );
}

/** Local reality, global product thinking. Typography only, by design. */
export function LocalGlobal() {
  const say = useSay();
  const copy = solutionsCopy.local;

  return (
    <Band>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
        <RevealWords
          as="h2"
          text={say(copy.title)}
          className="text-ink block text-[clamp(1.75rem,4vw,3rem)] uppercase"
        />

        <div>
          <Reveal>
            <p className="text-ink/65 max-w-xl text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed">
              {say(copy.text)}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="editorial text-teal border-ink/12 mt-10 border-t pt-8 text-[clamp(1.25rem,2.4vw,1.875rem)]">
              {say(copy.statement)}
            </p>
          </Reveal>
        </div>
      </div>
    </Band>
  );
}
