"use client";

import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { CaseBlock, CaseSection } from "./stack";
import { CaseArchitectureBlock } from "./architecture";
import { TONES, type DisplayTone } from "./tone";
import type { Architecture, Fracture } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

export function CaseFracture({
  fracture,
  architecture,
  tone = "canvas",
}: {
  fracture: Fracture;
  architecture: Architecture;
  tone?: DisplayTone;
}) {
  const say = useLocalized();
  const skin = TONES[tone];

  return (
    <CaseSection tone={tone}>
      <CaseArchitectureBlock architecture={architecture} skin={skin} />

      <CaseBlock className="pb-28 sm:pb-36 lg:pb-48">
        {/* <Insight
          text={say(fracture.statement)}
          skinTitle={skin.title}
          skinFlag={skin.flag}
          skinLabel={skin.label}
        /> */}
        {/* <Reveal direction="none" duration={0.5} amount={0.3}>
          <div className={cn("border-t pt-5", skin.rule)}>
            <p className={cn("eyebrow", skin.label)}>
              {say({ fr: "La fracture", en: "The fracture" })}
            </p>
          </div>
        </Reveal> */}

        <div className=" grid gap-y-16 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">
          {/* What was already true. Quiet: it is the ground, not the news. */}
          <Track
            title={say({ fr: "La réalité", en: "The reality" })}
            items={fracture.reality.map(say)}
            labelClass={skin.label}
            indexClass={skin.label}
            textClass={cn("font-sans", skin.body)}
            ruleClass={skin.rule}
            className="lg:col-span-5"
          />

          <div className="relative lg:col-span-6 lg:col-start-7 lg:mt-28 lg:pl-10 xl:pl-14">
            <FaultLine className={skin.flag} />
            <Track
              title={say({ fr: "La fracture", en: "The fracture" })}
              items={fracture.fracture.map(say)}
              labelClass={skin.flag}
              indexClass={skin.flag}
              textClass={cn(
                "font-display font-bold tracking-[-0.02em] sm:text-[1.3125rem]",
                skin.title,
              )}
              ruleClass={skin.rule}
            />
          </div>
        </div>

       
      </CaseBlock>

    </CaseSection>
  );
}

function Track({
  title,
  items,
  labelClass,
  indexClass,
  textClass,
  ruleClass,
  className,
}: {
  title: string;
  items: string[];
  labelClass: string;
  indexClass: string;
  textClass: string;
  ruleClass: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={cn("eyebrow", labelClass)}>{title}</p>

      <RevealGroup as="ol" amount={0.15} className="mt-8 sm:mt-9">
        {items.map((item, index) => (
          <li
            key={item}
            className={cn(
              "grid grid-cols-[2.25rem_1fr] items-baseline border-t py-5 first:border-t-0 first:pt-0 sm:py-6",
              ruleClass,
            )}
          >
            <span
              aria-hidden
              className={cn(
                "font-label text-[0.72rem] font-bold tracking-[0.16em] tabular-nums",
                indexClass,
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={cn("text-[1.0625rem] leading-snug", textClass)}>
              {item}
            </span>
          </li>
        ))}
      </RevealGroup>
    </div>
  );
}

function FaultLine({ className }: { className: string }) {
  return (
    <span aria-hidden className={cn("hidden lg:block", className)}>
      <span className="absolute top-0 left-0 h-[38%] w-px bg-current opacity-55" />
      <span className="absolute bottom-0 left-[3px] h-[54%] w-px bg-current opacity-55" />
    </span>
  );
}

function Insight({
  text,
  skinTitle,
  skinFlag,
  skinLabel,
}: {
  text: string;
  skinTitle: string;
  skinFlag: string;
  skinLabel: string;
}) {
  const clauses = text.match(/[^.!?]+[.!?]*/g)?.map((part) => part.trim()).filter(Boolean) ?? [text];

  return (
    <div className="mb-28 sm:mb-36 lg:mb-48">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <Reveal direction="none" duration={0.5} amount={0.4} className="lg:col-span-3">
          <span
            aria-hidden
            className={cn("block h-px w-16 bg-current lg:mt-[0.85em]", skinLabel)}
          />
        </Reveal>

        <div className="mb-3 lg:col-span-9 lg:mb-0">
          {clauses.map((clause, index) => (
            <RevealWords
              key={clause}
              as="p"
              amount={0.25}
              delay={index * 0.2}
              text={clause}
              className={cn(
                "font-display block text-[clamp(2rem,6.2vw,4.5rem)] leading-[1.02] font-extrabold tracking-[-0.05em]",
                index === 0 ? skinTitle : cn(skinFlag),
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
