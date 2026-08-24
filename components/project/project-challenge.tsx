"use client";

import { Section, SectionLabel, useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import type { ProjectPage } from "@/lib/data/projects";

/**
 * 02 — The challenge.
 *
 * Two or three sentences, then the problem broken into numbered points. The
 * points are deliberately short: they are the thing a visitor remembers, and
 * the paragraph is only there to give them a footing.
 */
export function ProjectChallenge({
  challenge,
}: {
  challenge: ProjectPage["challenge"];
}) {
  const say = useLocalized();

  return (
    <Section>
      <SectionLabel number="02">The challenge</SectionLabel>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <p className="text-ink/75 max-w-xl text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-relaxed">
            {say(challenge.text)}
          </p>
        </Reveal>

        <RevealGroup className="flex flex-col">
          {challenge.points.map((point, index) => (
            <div
              key={say(point)}
              className="border-ink/12 flex items-baseline gap-6 border-b py-6 first:border-t"
            >
              <span className="eyebrow text-ink/30 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-ink text-[clamp(1.125rem,1.8vw,1.5rem)] leading-tight font-bold tracking-[-0.02em]">
                {say(point)}
              </span>
            </div>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
