"use client";

import { FilmHero } from "@/components/layout/film-hero";
import { useLocalized } from "@/components/project/shared";
import type { ProjectCase } from "@/lib/data/projects/types";

/**
 * 01 — Hero.
 *
 * The about page's opening, given a project to carry: the still settling in
 * behind a scrim, the name rising word by word off its baseline, and the whole
 * thing lifting away as the page departs. It is the loudest moment on the site
 * and a case study has earned it — this is the one screen a visitor decides
 * from.
 *
 * The name takes the accent slot, so it arrives gold and underlined; the rail
 * above it does the orienting, and the statement takes the lead line because
 * it is the sentence the rest of the page is evidence for. The intro follows
 * a beat later, quieter, where a reader who wants the detail will find it.
 */
export function CaseHero({ project }: { project: ProjectCase }) {
  const say = useLocalized();

  const rail = [
    say(project.category),
    project.location ? say(project.location) : null,
    project.year,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <FilmHero
      eyebrow={rail}
      titleLead=""
      titleAccent={project.client}
      titleTail=""
      lead={say(project.hero.statement)}
      image={project.hero.image}
      imageClassName="object-cover object-center opacity-75"
    >
      <p className="text-canvas/55 max-w-2xl text-[0.9375rem] leading-relaxed">
        {say(project.hero.intro)}
      </p>
    </FilmHero>
  );
}
