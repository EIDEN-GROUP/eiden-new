"use client";

import { ChevronRight } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
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
    <CaseBlock tight>
      <Reveal direction="none" duration={0.5} amount={0.3}>
        <p className={cn("eyebrow flex items-center gap-3", skin.label)}>
          <span aria-hidden className="h-px w-8 bg-current opacity-50" />
          {say({ fr: "L'architecture", en: "The architecture" })}
        </p>
      </Reveal>

      <RevealWords
        as="h2"
        amount={0.3}
        delay={0.05}
        text={say(architecture.decision)}
        className={cn(
          "font-display mt-8 block max-w-4xl text-[clamp(1.75rem,4.4vw,3.25rem)] leading-[1.04] font-extrabold tracking-[-0.045em]",
          skin.title,
        )}
      />

      <RevealGroup
        as="ul"
        amount={0.2}
        className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-3 sm:mt-14 sm:gap-x-3"
      >
        {architecture.chain.map((node, index) => (
          <li key={say(node)} className="flex items-center gap-2 sm:gap-3">
            {index > 0 ? (
              <ChevronRight
                className={cn("size-4 shrink-0", skin.label)}
                strokeWidth={2}
                aria-hidden
              />
            ) : null}
            <span
              className={cn(
                "font-label inline-flex items-baseline gap-2 rounded-full border px-4 py-2 text-[0.72rem] font-bold tracking-[0.16em] uppercase sm:px-5 sm:py-2.5 sm:text-[0.78rem]",
                skin.rule,
                skin.title,
              )}
            >
              <span className={cn("text-[0.62em] tabular-nums", skin.label)}>
                {String(index + 1).padStart(2, "0")}
              </span>
              {say(node)}
            </span>
          </li>
        ))}
      </RevealGroup>

      <Reveal delay={0.12} amount={0.25}>
        <p
          className={cn(
            "mt-10 max-w-3xl text-[0.9375rem] leading-relaxed sm:mt-12 sm:text-base",
            skin.body,
          )}
        >
          {say(architecture.text)}
        </p>
      </Reveal>
    </CaseBlock>
  );
}
