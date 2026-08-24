"use client";

import { ArrowDown } from "lucide-react";
import { useSay } from "@/components/solutions/shared";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { solutionsCopy } from "@/lib/data/solutions";

/**
 * The masthead. One claim, one line under it, one way down.
 *
 * Deliberately without a picture: the products further down the page are the
 * visual argument, and putting an image here would only compete with them.
 */
export function SolutionsHero() {
  const say = useSay();
  const copy = solutionsCopy.hero;

  return (
    <header className="grain bg-ink text-canvas" data-nav-tone="dark">
      <div className="container-eiden flex min-h-svh flex-col justify-center pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-gold flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-current opacity-50" />
            {say(copy.eyebrow)}
          </p>
        </Reveal>

        <RevealWords
          as="h1"
          text={say(copy.title)}
          delay={0.06}
          className="text-canvas mt-10 block max-w-5xl text-[clamp(2.5rem,7.5vw,6rem)] uppercase"
        />

        <Reveal delay={0.35}>
          <p className="text-canvas/60 mt-10 max-w-2xl text-base leading-relaxed sm:text-lg">
            {say(copy.lead)}
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <a
            href="#systemes"
            className="group border-canvas/20 hover:border-gold hover:text-gold text-canvas mt-14 inline-flex items-center gap-4 border-b pb-3 transition-colors duration-500 ease-[var(--ease-brand)]"
          >
            <span className="font-label text-[0.875rem] font-bold tracking-[0.16em] uppercase">
              {say(copy.cta)}
            </span>
            <ArrowDown
              className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-y-1 motion-reduce:transition-none"
              strokeWidth={2}
              aria-hidden
            />
          </a>
        </Reveal>
      </div>
    </header>
  );
}
