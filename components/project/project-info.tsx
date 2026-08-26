"use client";

import { Section, SectionLabel, useLocalized } from "@/components/project/shared";
import { RevealGroup } from "@/components/ui/reveal";
import type { ProjectPage } from "@/lib/data/projects";

/**
 * 07   Project info.
 *
 * The facts, kept off the masthead and gathered here where someone who wants
 * them can find them. Read straight off the record rather than restated, so
 * the two can never fall out of step.
 */
export function ProjectInfo({ project }: { project: ProjectPage }) {
  const say = useLocalized();

  const rows: { label: string; value: string }[] = [
    { label: "Client", value: project.client },
    { label: "Sector", value: say(project.sector) },
    { label: "Year", value: project.year },
    { label: "Location", value: say(project.info.location) },
    {
      label: "Services",
      value: project.services.map((service) => say(service)).join(" · "),
    },
  ];

  return (
    <Section>
      <SectionLabel number="07">Project info</SectionLabel>

      <RevealGroup className="mt-12 flex max-w-3xl flex-col">
        {rows.map((row) => (
          <div
            key={row.label}
            className="border-ink/12 flex flex-col gap-1 border-b py-5 first:border-t sm:flex-row sm:items-baseline sm:gap-8"
          >
            <p className="eyebrow text-ink/35 sm:w-40 sm:shrink-0">{row.label}</p>
            <p className="text-ink text-[0.9375rem] leading-relaxed sm:text-base">
              {row.value}
            </p>
          </div>
        ))}
      </RevealGroup>
    </Section>
  );
}
