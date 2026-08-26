"use client";

import Image from "next/image";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import type { ProjectCase } from "@/lib/data/projects/types";

/**
 * 05   The second act. Conditional, and one per project at most.
 *
 * Some of this work has a half nobody sees from the outside: the dashboard a
 * clinic runs on, the portal behind a catalogue, the three routes into a range
 * of stone. Where that half is the reason the project mattered, it gets a
 * section; where it is not, the project has six sections and is better for it.
 *
 * It runs on ink so it reads as a second turn rather than as more gallery, and
 * the label is written by the record   `Business System`, `Digital Platform`,
 * `Booking Experience`   because the name of the thing is half the point.
 */
export function CaseFeature({
  feature,
}: {
  feature: NonNullable<ProjectCase["feature"]>;
}) {
  const say = useLocalized();

  return (
    <section data-nav-tone="dark" className="grain bg-forest text-canvas">
      <div className="container-eiden py-20 sm:py-28">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-gold">{say(feature.label)}</p>
        </Reveal>

        <RevealWords
          as="h2"
          text={say(feature.title)}
          delay={0.06}
          className="font-display text-canvas mt-6 block max-w-3xl text-[clamp(1.625rem,3.6vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.03em]"
        />

        <Reveal delay={0.14}>
          <p className="text-canvas/55 mt-5 max-w-2xl text-[0.9375rem] leading-relaxed sm:text-base">
            {say(feature.text)}
          </p>
        </Reveal>

        {feature.shots?.length ? (
          <RevealGroup className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-2">
            {feature.shots.map((shot) => (
              <figure
                key={shot.image}
                className="bg-canvas/5 relative aspect-16/10 overflow-hidden rounded-[1.6rem]"
              >
                <Image
                  src={shot.image}
                  alt={say(shot.alt)}
                  fill
                  sizes="(max-width: 64rem) 92vw, 44vw"
                  className="object-cover"
                />
                <figcaption className="eyebrow text-canvas/70 absolute bottom-4 left-5 [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]">
                  {say(shot.label)}
                </figcaption>
              </figure>
            ))}
          </RevealGroup>
        ) : null}
      </div>
    </section>
  );
}
