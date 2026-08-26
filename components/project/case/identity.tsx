"use client";

import Image from "next/image";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import type { ProjectCase } from "@/lib/data/projects/types";

/**
 * 04   Visual identity. Conditional.
 *
 * Rendered only where there are real identity assets   a logo, an application,
 * a palette taken off the brand board. Four of the ten projects sell art
 * direction and have none of that on file; for those the section does not
 * exist rather than being padded with website screenshots.
 *
 * The palette used to sit at the foot of this section as a row of swatches.
 * It has its own section now — see `CasePaletteStory` — because a palette is
 * a set of decisions and a legend states none of them.
 */
export function CaseIdentity({
  identity,
}: {
  identity: NonNullable<ProjectCase["identity"]>;
}) {
  const say = useLocalized();

  return (
    <section className="py-20 sm:py-28">
      <div className="container-eiden">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-ink/35">
            {say({ fr: "Identité visuelle", en: "Visual identity" })}
          </p>
        </Reveal>

        <RevealWords
          as="h2"
          text={say(identity.title)}
          delay={0.06}
          className="font-display text-ink mt-6 block max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.06] font-bold tracking-[-0.03em]"
        />

        <Reveal delay={0.14}>
          <p className="text-ink/60 mt-5 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
            {say(identity.text)}
          </p>
        </Reveal>

        {/* The reveal group is the grid itself. It used to be wrapped in one
            and flattened with `display: contents` at `lg`, which meant the
            observed node had no box at that width   an IntersectionObserver
            never reports a boxless element, so the group stayed `out` and its
            children sat at `opacity: 0` forever. Anything carrying a reveal
            has to generate a box. */}
        <RevealGroup className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2">
          {identity.shots.map((shot) => (
            <figure
              key={shot.image}
              className="bg-ink/5 relative aspect-4/5 overflow-hidden rounded-[1.6rem]"
            >
              <Image
                src={shot.image}
                alt={say(shot.alt)}
                fill
                sizes="(max-width: 40rem) 92vw, 44vw"
                className="object-cover"
              />
              <figcaption className="eyebrow text-canvas/80 absolute bottom-4 left-5 [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]">
                {say(shot.label)}
              </figcaption>
            </figure>
          ))}
        </RevealGroup>

      </div>
    </section>
  );
}
