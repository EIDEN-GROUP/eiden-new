"use client";

import { useEffect, type CSSProperties } from "react";
import { jumpToTop } from "@/components/providers/smooth-scroll";
import { CaseHero } from "./hero";
import { CaseFracture } from "./fracture";
import { CaseChapter } from "./chapter";
import { CaseImpact } from "./impact";
import { CaseWorkRoom } from "./work";
import { CaseNextScroll } from "./next-scroll";
import { CaseStack } from "./stack";
import { CaseVeil } from "./veil";
import type { ProjectCase } from "@/lib/data/projects/types";

/**
 * One case, read as a business argument.
 *
 * The running order is the same on every project and it is the whole point of
 * the system:
 *
 *   hero → fracture + architecture → what we built → impact → the work → next
 *
 * What was broken, what EIDEN decided, what that produced, what it changed, and
 * only then the pictures. Nothing about a project chooses its own order   the
 * depth varies, the sequence never does, which is what makes eleven different
 * businesses read as one practice.
 *
 * `order` is the z-index each room is stacked at, counted straight through the
 * run, because the rooms are drawn over one another as the reader scrolls.
 */
export function ProjectCaseStudy({
  project,
  next,
}: {
  project: ProjectCase;
  next: ProjectCase;
}) {
  const chapters = project.chapters;
  const work = project.work ?? [];

  useEffect(() => {
    jumpToTop();
  }, [project.slug]);

  let order = 0;
  const fractureOrder = order++;
  const chapterOrders = chapters.map(() => order++);
  const impactOrder = order++;
  const workOrder = work.length ? order++ : null;

  /* The impact never stands on the ground the chapter before it used, and the
     gallery is always read in daylight. */
  const impactTone = chapters.at(-1)?.tone === "forest" ? "ink" : "forest";

  return (
    <article
      className="bg-ink"
      /* The deep ground every forest room in this case stands on. */
      style={
        {
          "--case-ground": project.ground ?? "var(--color-forest)",
        } as CSSProperties
      }
    >
      <CaseVeil />

      <CaseHero project={project} chapters={chapters} />

      <CaseStack>
        <CaseFracture
          fracture={project.fracture}
          architecture={project.architecture}
          order={fractureOrder}
          tone="canvas"
        />

        {chapters.map((chapter, index) => (
          <CaseChapter
            key={chapter.key}
            chapter={chapter}
            order={chapterOrders[index]}
            number={index + 1}
          />
        ))}

        <CaseImpact
          impact={project.impact}
          order={impactOrder}
          tone={impactTone}
          /* Whichever room is last lets go on a phone, so the switch to the
             next project scrolls up after it rather than over it. */
          release={workOrder === null}
        />

        {workOrder !== null ? (
          <CaseWorkRoom work={work} order={workOrder} tone="canvas" release />
        ) : null}

        <CaseNextScroll next={next} order={order + 1} />
      </CaseStack>
    </article>
  );
}
