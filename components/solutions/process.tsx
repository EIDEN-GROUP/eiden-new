"use client";

import { Band, BandLabel, useSay } from "@/components/solutions/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { solutionsCopy } from "@/lib/data/solutions";

/**
 * How a system gets built. Five steps, one line each.
 *
 * A row carries only its name at rest. Point at it and the row inverts: the
 * ground wipes in from the left, the name lifts away and the step says what it
 * actually does.
 *
 * From `lg` the two halves share one grid cell, so the row is always as tall
 * as the taller of them and its height never changes. That is what makes the
 * swap smooth: only `opacity` and `transform` animate, both of which the
 * compositor handles without laying the page out again   and a row that keeps
 * its height cannot shift the rows under it, or slide out from under the
 * cursor that is pointing at it. The text lands a beat after the ground, so
 * the two read as one movement rather than a dissolve; the delay is on the
 * hovered state alone, so leaving is immediate.
 *
 * There is no hover on a touch screen, so below `lg` the halves fall back into
 * ordinary flow and the row simply reads name then description   the text is
 * never behind an interaction that cannot happen.
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

      <RevealGroup as="ul" className="mt-14 flex flex-col">
        {copy.steps.map((step, index) => (
          <li
            key={say(step.title)}
            className="group border-ink/15 relative isolate border-t last:border-b lg:grid lg:items-center"
          >
            {/* The ground, wiped in from the left. It runs a little past the
                measure on either side so the bar reads as struck across the
                page rather than boxed inside the column. */}
            <span
              aria-hidden
              className="bg-teal absolute inset-y-0 -right-4 -left-4 -z-10 origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none lg:-right-6 lg:-left-6 lg:group-hover:scale-x-100"
            />

            {/* At rest: the name, at size. */}
            <div className="transition-[opacity,transform] duration-300 ease-[var(--ease-brand)] motion-reduce:transition-none lg:col-start-1 lg:row-start-1 lg:group-hover:-translate-y-2 lg:group-hover:opacity-0">
              <div className="flex items-center justify-between gap-6 py-5 lg:py-6">
                <h3 className="font-display text-ink text-[clamp(1.625rem,4vw,3.25rem)] leading-none font-extrabold tracking-[-0.04em] uppercase">
                  {say(step.title)}
                </h3>
                <span className="eyebrow numeral text-ink/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Pointed at: the same row, inverted, saying what the step does.
                The small label repeats the name only where the big one has
                just left   below `lg` it would be the title twice. */}
            <div className="transition-[opacity,transform] duration-400 ease-[var(--ease-brand)] motion-reduce:transition-none lg:col-start-1 lg:row-start-1 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-hover:delay-100">
              <div className="pb-5 lg:py-6">
                <p className="eyebrow lg:text-canvas/45 hidden lg:block">
                  {say(step.title)}
                </p>
                <p className="text-ink/65 lg:text-canvas max-w-3xl text-[0.9375rem] leading-relaxed lg:mt-2 lg:text-[clamp(1rem,1.5vw,1.25rem)]">
                  {say(step.text)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </RevealGroup>
    </Band>
  );
}

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
