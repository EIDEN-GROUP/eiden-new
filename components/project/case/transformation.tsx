"use client";

import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { CaseBlock, CaseRoom } from "./stack";
import { TONES } from "./tone";
import type { ChapterTone, ProjectCase } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

export function CaseTransformation({
  transformation,
  order,
  tone = "canvas",
}: {
  transformation: ProjectCase["transformation"];
  order: number;
  tone?: ChapterTone;
}) {
  const say = useLocalized();
  const skin = TONES[tone];

  return (
    <CaseRoom tone={tone} order={order}>
      <CaseBlock>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:gap-24">
          <div>
            <Reveal direction="none" duration={0.5} amount={0.3}>
              <p className={cn("eyebrow flex items-center gap-3", skin.label)}>
                <span aria-hidden className="h-px w-8 bg-current opacity-50" />
                {say({ fr: "La transformation", en: "The transformation" })}
              </p>
            </Reveal>

            <RevealWords
              as="h2"
              amount={0.3}
              delay={0.05}
              text={say(transformation.title)}
              className={cn(
                "font-display mt-7 block text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]",
                skin.title,
              )}
            />
          </div>

          <RevealGroup as="ul" amount={0.2} className="editorial flex flex-col gap-4 text-[clamp(1.125rem,2.2vw,1.625rem)] leading-snug sm:gap-5">
            {transformation.text.map((line, index) => (
              <li key={say(line)} className="flex gap-5">
                <span aria-hidden className={cn( "font-label mt-[0.55em] shrink-0 text-[0.7rem] font-bold tracking-[0.2em] tabular-nums", skin.label, )} >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={skin.title}>{say(line)}</span>
              </li>
            ))}
          </RevealGroup>
        </div>
      </CaseBlock>
    </CaseRoom>
  );
}
