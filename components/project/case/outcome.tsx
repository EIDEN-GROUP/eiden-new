"use client";

import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { CaseBlock, CaseRoom } from "./stack";
import { TONES } from "./tone";
import type { ChapterTone, Outcome } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

export function CaseOutcomeRoom({
  outcome,
  order,
  tone,
}: {
  outcome: Outcome;
  order: number;
  tone: ChapterTone;
}) {
  const say = useLocalized();
  const skin = TONES[tone];

  return (
    <CaseRoom tone={tone} order={order} release>
      <CaseBlock>
        <Reveal direction="none" duration={0.5} amount={0.3}>
          <p className={cn("eyebrow flex items-center gap-3", skin.label)}>
            <span aria-hidden className="h-px w-8 bg-current opacity-50" />
            {say({ fr: "Résultat", en: "Outcome" })}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
          <div>
            <RevealWords
              as="h2"
              amount={0.25}
              delay={0.05}
              text={say(outcome.title)}
              className={cn(
                "font-display block max-w-3xl text-[clamp(1.75rem,4.6vw,3.5rem)] leading-[1.04] font-extrabold tracking-[-0.045em]",
                skin.title,
              )}
            />

            <Reveal delay={0.16} amount={0.25}>
              <p
                className={cn(
                  "mt-8 max-w-2xl text-[0.9375rem] leading-relaxed sm:text-base",
                  skin.body,
                )}
              >
                {say(outcome.text)}
              </p>
            </Reveal>
          </div>

          {outcome.metric ? (
            <Reveal delay={0.22} amount={0.25}>
              <div className={cn("border-t pt-6", skin.rule)}>
                <p className="font-display text-gold text-[clamp(3.25rem,9vw,6rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums">
                  {outcome.metric}
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </CaseBlock>
    </CaseRoom>
  );
}
