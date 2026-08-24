"use client";

import Image from "next/image";
import { useLocalized } from "@/components/project/shared";
import { Reveal } from "@/components/ui/reveal";
import type { ProjectPage } from "@/lib/data/projects";

/**
 * 01 — Intro.
 *
 * Everything a visitor needs to place the project before they scroll: whose
 * it is, what it was, and one picture at full width. The rest of the facts
 * wait for the info block at the foot of the page.
 */
export function ProjectHero({ project }: { project: ProjectPage }) {
  const say = useLocalized();

  return (
    <header className="pt-32 sm:pt-40">
      <div className="container-eiden">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-ink/35 tabular-nums">{project.number}</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="text-ink mt-6 text-[clamp(2.75rem,9vw,7rem)] uppercase">
            {project.client}
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="editorial text-ink/70 mt-8 max-w-2xl text-[clamp(1.25rem,2.4vw,1.75rem)]">
            {say(project.title)}
          </p>
        </Reveal>

        {/* Sector and year on one line, the services under them: the two
            facts that place the project, then the two or three that say
            what it took. */}
        <Reveal delay={0.18}>
          <div className="border-ink/15 mt-12 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <p className="eyebrow text-ink">
              {say(project.sector)}
              <span className="text-ink/30 mx-3">·</span>
              <span className="tabular-nums">{project.year}</span>
            </p>
            <p className="eyebrow text-ink/45">
              {project.services.map((service) => say(service)).join(" · ")}
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.24} className="mt-10 sm:mt-14">
        <div className="relative aspect-4/3 w-full overflow-hidden sm:aspect-16/9">
          <Image
            src={project.hero.image}
            alt={say(project.hero.alt)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </header>
  );
}
