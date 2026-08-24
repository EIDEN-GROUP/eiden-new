"use client";

import { BandLabel, useSay } from "@/components/solutions/shared";
import { SystemFeature } from "@/components/solutions/system-feature";
import { RevealWords } from "@/components/ui/reveal";
import { solutionsCopy, systems } from "@/lib/data/solutions";

/**
 * The four products, in order.
 *
 * Adding a fifth is an entry in `systems` — the alternation, the numbering
 * and the rules between them all fall out of the list.
 */
export function SystemsOverview() {
  const say = useSay();
  const copy = solutionsCopy.systems;

  return (
    <section id="systemes" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-eiden">
        <BandLabel number="01">{say(copy.eyebrow)}</BandLabel>

        <RevealWords
          as="h2"
          text={say(copy.title)}
          delay={0.06}
          className="text-ink mt-12 block max-w-4xl text-[clamp(1.875rem,5vw,3.75rem)] uppercase"
        />

        <div className="mt-16">
          {systems.map((system, index) => (
            <SystemFeature
              key={system.slug}
              system={system}
              flipped={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
