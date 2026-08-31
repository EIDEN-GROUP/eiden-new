"use client";

import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { CaseBlock, CaseSection } from "./stack";
import { CaseArchitectureBlock } from "./architecture";
import { TONES, type DisplayTone } from "./tone";
import type { Architecture, Fracture } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

/**
 * The diagnosis, read as two columns and closed by one line.
 *
 * This is the first room of every case and the one that decides how the rest is
 * read. It is not a before/after: a before/after is about the work, and this is
 * about the business. What the company already had stands on the left, what was
 * out of joint with it on the right, and neither column means anything without
 * the other   which is why they are set side by side at the same size rather
 * than as a problem section followed by a solution section.
 *
 * The statement underneath is the whole diagnosis in one line, and it is the
 * only thing above it set at headline size. Everything before it is evidence
 * for it.
 *
 * The architecture reads on directly underneath, inside this same room: the
 * diagnosis and the answer to it are one thought, and a curtain between them
 * would announce them as two.
 */
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
      <CaseBlock>
        <Reveal direction="none" duration={0.5} amount={0.3}>
          <p className={cn("eyebrow flex items-center gap-3", skin.label)}>
            <span aria-hidden className="h-px w-8 bg-current opacity-50" />
            {say({ fr: "La fracture", en: "The fracture" })}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <Column
            title={say({ fr: "La réalité", en: "The reality" })}
            items={fracture.reality.map(say)}
            mark="✓"
            markClass={skin.label}
            textClass={skin.title}
            skinRule={skin.rule}
          />
          <Column
            title={say({ fr: "La fracture", en: "The fracture" })}
            items={fracture.fracture.map(say)}
            mark="—"
            markClass={skin.flag}
            textClass={skin.body}
            titleClass={skin.flag}
            skinRule={skin.rule}
          />
        </div>

        <div className={cn("mt-14 border-t pt-10 sm:mt-16 sm:pt-12", skin.rule)}>
          <RevealWords
            as="p"
            amount={0.3}
            text={say(fracture.statement)}
            className={cn(
              "font-display block max-w-3xl text-[clamp(1.75rem,4.6vw,3.25rem)] leading-[1.06] font-extrabold tracking-[-0.045em]",
              skin.title,
            )}
          />
        </div>
      </CaseBlock>

      {/* The answer to the diagnosis, on the same ground and under the same
          curtain: what was decided, and the system it set in motion. */}
      <CaseArchitectureBlock architecture={architecture} skin={skin} />
    </CaseSection>
  );
}

/**
 * One side of the diagnosis.
 *
 * The mark carries the meaning and the type stays quiet: a tick against what
 * was already working, a dash against what was not. A row is a line rather
 * than a card, because a card would make four short observations look like four
 * findings in a report.
 */
function Column({
  title,
  items,
  mark,
  markClass,
  textClass,
  titleClass,
  skinRule,
}: {
  title: string;
  items: string[];
  mark: string;
  markClass: string;
  textClass: string;
  titleClass?: string;
  skinRule: string;
}) {
  return (
    <div>
      <p className={cn("eyebrow", titleClass ?? markClass)}>{title}</p>

      <RevealGroup as="ul" amount={0.15} className="mt-5 sm:mt-6">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "flex items-start gap-4 border-t py-4 first:border-t-0 first:pt-0 sm:py-5",
              skinRule,
            )}
          >
            <span
              aria-hidden
              className={cn(
                "font-display mt-[0.15em] shrink-0 text-[0.95rem] leading-snug font-bold",
                markClass,
              )}
            >
              {mark}
            </span>
            <span
              className={cn(
                "text-[1.0625rem] leading-snug sm:text-[1.1875rem]",
                textClass,
              )}
            >
              {item}
            </span>
          </li>
        ))}
      </RevealGroup>
    </div>
  );
}
