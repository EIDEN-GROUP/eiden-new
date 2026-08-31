"use client";

import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { CaseSection } from "./stack";
import { CaseWall } from "./wall";
import { TONES, type DisplayTone } from "./tone";
import type { GalleryImage } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

/**
 * The pictures, last.
 *
 * A gallery placed before the argument becomes the argument, and the case stops
 * being about the business   which is exactly what a portfolio of visuals reads
 * as. So the set is held back until the diagnosis, the decision, the work and
 * the result have all been read, and then given a room of its own where it is
 * proof rather than story.
 *
 * On canvas, always: the pictures are the only thing in the room and they are
 * looked at in daylight.
 */
export function CaseWorkRoom({
  work,
  tone = "canvas",
}: {
  work: GalleryImage[];
  tone?: DisplayTone;
}) {
  const say = useLocalized();
  const skin = TONES[tone];

  if (!work.length) return null;

  return (
    <CaseSection tone={tone}>
      <div className="container-eiden pt-24 sm:pt-28 lg:pt-32">
        <Reveal direction="none" duration={0.5} amount={0.3}>
          <p className={cn("eyebrow flex items-center gap-3", skin.label)}>
            <span aria-hidden className="h-px w-8 bg-current opacity-50" />
            {say({ fr: "Le travail", en: "The work" })}
          </p>
        </Reveal>

        <RevealWords
          as="h2"
          amount={0.3}
          delay={0.05}
          text={say({
            fr: "La preuve, après l'argument.",
            en: "The proof, after the argument.",
          })}
          className={cn(
            "font-display mt-7 block max-w-3xl text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.045em]",
            skin.title,
          )}
        />
      </div>

      <div className="mt-10 pb-24 sm:mt-12 sm:pb-28 lg:pb-32">
        <CaseWall wall={work} skin={skin} />
      </div>
    </CaseSection>
  );
}
