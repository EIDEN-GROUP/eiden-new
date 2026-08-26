"use client";

import { Section, SectionLabel, useLocalized } from "@/components/project/shared";
import { RevealGroup } from "@/components/ui/reveal";
import type { ProjectPage } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/**
 * 04   What we built.
 *
 * Two to five cards, never a list of deliverables. A project that touched
 * eight things says "Brand", "Digital", "Marketing"   the grouping is the
 * point, and it is what keeps this section one screen instead of six.
 */
export function ProjectBuilt({ built }: { built: ProjectPage["built"] }) {
  const say = useLocalized();

  /* Three across reads best; four or five wrap to two rows rather than
     squeezing every card down to a column of broken words. */
  const columns =
    built.length <= 2
      ? "sm:grid-cols-2"
      : built.length === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Section>
      <SectionLabel number="04">What we built</SectionLabel>

      <RevealGroup className={cn("mt-12 grid gap-px", columns)}>
        {built.map((item, index) => (
          <article
            key={say(item.title)}
            className="border-ink/12 flex flex-col border-t pt-6"
          >
            <p className="eyebrow text-ink/30 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display text-ink mt-6 text-[clamp(1.375rem,2.4vw,1.875rem)] leading-none font-extrabold tracking-[-0.03em] uppercase">
              {say(item.title)}
            </h3>
            <p className="text-ink/60 mt-4 max-w-sm text-[0.9375rem] leading-relaxed">
              {say(item.text)}
            </p>
          </article>
        ))}
      </RevealGroup>
    </Section>
  );
}
