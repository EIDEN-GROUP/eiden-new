"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, useSay } from "@/components/solutions/shared";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { solutionsCopy } from "@/lib/data/solutions";

export function CustomSolution() {
  const say = useSay();
  const copy = solutionsCopy.custom;

  return (
    <Band>
      <div className="border-ink/12 border-t pt-12">
        <RevealWords
          as="h2"
          text={say(copy.title)}
          className="text-ink block max-w-3xl text-[clamp(1.875rem,4.6vw,3.5rem)] uppercase"
        />

        <Reveal delay={0.08}>
          <p className="text-ink/60 mt-8 max-w-xl text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed">
            {say(copy.text)}
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <Link
            href="/contact"
            className="group text-ink hover:text-teal mt-10 inline-flex items-center gap-4 transition-colors duration-300"
          >
            <span className="font-label text-[0.875rem] font-bold tracking-[0.16em] uppercase">
              {say(copy.cta)}
            </span>
            <span className="border-ink/20 group-hover:bg-ink group-hover:text-canvas flex size-11 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
              <ArrowRight className="size-4" strokeWidth={1.8} aria-hidden />
            </span>
          </Link>
        </Reveal>
      </div>
    </Band>
  );
}

export function SolutionsCTA() {
  const say = useSay();
  const copy = solutionsCopy.closing;

  return (
    <section data-nav-tone="dark" className="grain bg-ink text-canvas">
      <div className="container-eiden flex min-h-[80svh] flex-col justify-center py-24 sm:py-32">
        <RevealWords
          as="h2"
          text={say(copy.title)}
          className="text-canvas block max-w-5xl text-[clamp(2.25rem,6.5vw,5.5rem)] uppercase"
        />

        <Reveal delay={0.3}>
          <p className="editorial text-canvas/55 mt-8 max-w-xl text-[clamp(1.25rem,2.4vw,1.75rem)]">
            {say(copy.text)}
          </p>
        </Reveal>

        <Reveal delay={0.38}>
          <Link
            href="/contact"
            className="group border-canvas/20 text-canvas hover:border-gold hover:text-gold mt-14 inline-flex items-center gap-5 border-b pb-4 transition-colors duration-500 ease-[var(--ease-brand)]"
          >
            <span className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-none font-extrabold tracking-[-0.03em] uppercase">
              {say(copy.cta)}
            </span>
            <ArrowRight
              className="size-7 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-2 motion-reduce:transition-none"
              strokeWidth={1.6}
              aria-hidden
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
