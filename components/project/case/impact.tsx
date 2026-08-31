"use client";

import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { CaseBlock, CaseSection } from "./stack";
import { TONES, type DisplayTone } from "./tone";
import type { Impact, Localized } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

/**
 * What changed.
 *
 * The figure is set at the size it deserves and then, underneath, read out:
 * what it counts, over what period, and what it is worth to the business. A
 * number without those three is a decoration, and this is the room that stops
 * this portfolio from decorating.
 *
 * Every one of the three is allowed to be missing, and a missing one is drawn
 * as nothing at all   never as an estimate, never as a rounded guess. Where a
 * client has not published a period, the case simply does not claim one.
 */
export function CaseImpact({
  impact,
  tone,
}: {
  impact: Impact;
  tone: DisplayTone;
}) {
  const say = useLocalized();
  const skin = TONES[tone];
  const rows = impact.rows ?? [];
  /* One row carrying the headline figure is that figure's read-out, so the
     number itself is set once and the row only says what it means. */
  const echoed = rows.length === 1 && rows[0].metric === impact.metric;

  return (
    <CaseSection tone={tone}>
      <CaseBlock>
        <Reveal direction="none" duration={0.5} amount={0.3}>
          <p className={cn("eyebrow flex items-center gap-3", skin.label)}>
            <span aria-hidden className="h-px w-8 bg-current opacity-50" />
            {say({ fr: "L'impact", en: "The impact" })}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
          <div>
            <RevealWords
              as="h2"
              amount={0.25}
              delay={0.05}
              text={say(impact.title)}
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
                {say(impact.text)}
              </p>
            </Reveal>
          </div>

          {impact.metric ? (
            <Reveal delay={0.22} amount={0.25}>
              <div className={cn("border-t pt-6", skin.rule)}>
                <p className="font-display text-gold text-[clamp(3.25rem,9vw,6rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums">
                  {impact.metric}
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>

        {rows.length ? (
          <div className="mt-14 sm:mt-16">
            {rows.map((row) => (
              <Reveal key={row.metric} amount={0.2}>
                <dl
                  className={cn(
                    "grid gap-x-8 gap-y-5 border-t py-7 sm:py-8 lg:gap-x-12",
                    echoed
                      ? "lg:grid-cols-3"
                      : "lg:grid-cols-[minmax(0,0.6fr)_repeat(3,minmax(0,1fr))]",
                    skin.rule,
                  )}
                >
                  {/* The figure is not printed twice. A single row reading the
                      headline number is that number's read-out, not a table. */}
                  {echoed ? null : (
                    <div
                      className={cn(
                        "font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-none font-extrabold tracking-[-0.04em] tabular-nums",
                        skin.title,
                      )}
                    >
                      {row.metric}
                    </div>
                  )}

                  <Cell
                    label={{ fr: "Ce qu'il mesure", en: "What it measures" }}
                    value={row.measures}
                    say={say}
                    skin={skin}
                  />
                  <Cell
                    label={{ fr: "Sur quelle période", en: "Over what period" }}
                    value={row.period}
                    say={say}
                    skin={skin}
                  />
                  <Cell
                    label={{ fr: "Ce que ça change", en: "What it changes" }}
                    value={row.meaning}
                    say={say}
                    skin={skin}
                  />
                </dl>
              </Reveal>
            ))}
          </div>
        ) : null}
      </CaseBlock>
    </CaseSection>
  );
}

/**
 * One reading of the figure.
 *
 * Drawn only where there is something to draw: an empty cell keeps its column
 * so the row stays aligned, and says nothing.
 */
function Cell({
  label,
  value,
  say,
  skin,
}: {
  label: Localized;
  value: Localized | null;
  say: (value: Localized) => string;
  skin: { caption: string; body: string };
}) {
  if (!value) return <div aria-hidden className="hidden lg:block" />;

  return (
    <div>
      <dt className={cn("eyebrow text-[0.68rem] sm:text-[0.72rem]", skin.caption)}>
        {say(label)}
      </dt>
      <dd className={cn("mt-2 text-[0.9375rem] leading-snug", skin.body)}>
        {say(value)}
      </dd>
    </div>
  );
}
