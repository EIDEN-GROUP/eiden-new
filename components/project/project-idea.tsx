"use client";

import Image from "next/image";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import type { ProjectPage } from "@/lib/data/projects";

/**
 * 03   The idea.
 *
 * The one section on the page that is allowed to be loud. It runs on ink so
 * the statement lands as a turn in the page rather than as another
 * paragraph, and it comes before any of the detail   the reader should know
 * what the thinking was before being shown what it produced.
 */
export function ProjectIdea({ idea }: { idea: ProjectPage["idea"] }) {
  const say = useLocalized();

  return (
    <section data-nav-tone="dark" className="grain bg-ink text-canvas">
      <div className="container-eiden py-20 sm:py-28">
        <Reveal direction="none" duration={0.5}>
          <div className="border-canvas/15 flex items-baseline gap-4 border-t pt-5">
            <span className="eyebrow text-canvas/35 tabular-nums">03</span>
            <span className="eyebrow text-canvas">The idea</span>
          </div>
        </Reveal>

        <RevealWords
          as="p"
          text={say(idea.statement)}
          delay={0.06}
          className="font-display text-canvas mt-12 block max-w-5xl text-[clamp(1.875rem,5vw,4rem)] leading-[1.05] font-medium tracking-[-0.03em]"
        />

        <Reveal delay={0.3}>
          <p className="text-canvas/55 mt-10 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
            {say(idea.text)}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 sm:mt-20">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm sm:aspect-16/9">
            <Image
              src={idea.image}
              alt={say(idea.alt)}
              fill
              sizes="(max-width: 1024px) 92vw, 88vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
