"use client";

import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { CaseBlock } from "./stack";
import type { ToneSkin } from "./tone";
import type { Architecture } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

export function CaseArchitectureBlock({
  architecture,
  skin,
}: {
  architecture: Architecture;
  skin: ToneSkin;
}) {
  const say = useLocalized();

  return (
    <CaseBlock tight className="pb-0!">
      <Reveal direction="none" duration={0.5} amount={0.3}>
        <div className={cn("border-t pt-5", skin.rule)}>
          <p className={cn("eyebrow", skin.label)}>
            {say({ fr: "L'architecture", en: "The architecture" })}
          </p>
        </div>
      </Reveal>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <RevealWords
          as="h2"
          amount={0.3}
          delay={0.05}
          text={say(architecture.decision)}
          className={cn(
            "font-display mt-12 block text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.04em] sm:mt-14 lg:col-span-8",
            skin.title,
          )}
        />
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <Reveal delay={0.12} amount={0.25} className="lg:col-span-6 lg:col-start-7">
          <p
            className={cn(
              "mt-14 text-[0.9375rem] leading-relaxed sm:mt-16 sm:text-base",
              skin.body,
            )}
          >
            {say(architecture.text)}
          </p>
        </Reveal>
      </div>
    </CaseBlock>
  );
}
