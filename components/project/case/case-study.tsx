"use client";

import { CaseHero } from "./hero";
import { CaseServices } from "./services";
import { CaseTransformation } from "./transformation";
import { CaseIdentity } from "./identity";
import { CaseFeature } from "./feature";
import { CaseWork } from "./work";
import { CaseOutcome } from "./outcome";
import { CaseNext } from "./next";
import type { ProjectCase } from "@/lib/data/projects/types";

/**
 * The spine every project page hangs from.
 *
 * Hero → services → transformation → [identity] → [feature] → work → outcome →
 * next. The order is the argument, so it lives here rather than in the data;
 * what a record chooses is what fills it, and whether the two optional blocks
 * exist at all.
 *
 * The grounds alternate deliberately — canvas, canvas, ink, canvas, forest,
 * canvas, ink, cream — because that is the rhythm the rest of the site reads
 * in, and because a change of ground marks a turn faster than a heading does.
 */
export function ProjectCaseStudy({
  project,
  next,
}: {
  project: ProjectCase;
  next?: ProjectCase;
}) {
  return (
    <article className="bg-canvas text-ink" data-nav-tone="light">
      <CaseHero project={project} />
      <CaseServices services={project.services} />
      <CaseTransformation transformation={project.transformation} />
      {project.identity ? <CaseIdentity identity={project.identity} /> : null}
      {project.feature ? <CaseFeature feature={project.feature} /> : null}
      <CaseWork work={project.work} />
      <CaseOutcome outcome={project.outcome} />
      {next ? <CaseNext project={next} /> : null}
    </article>
  );
}
