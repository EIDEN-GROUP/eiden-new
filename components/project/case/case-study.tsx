"use client";

import { useEffect, type CSSProperties } from "react";
import { jumpToTop } from "@/components/providers/smooth-scroll";
import { CaseHero } from "./hero";
import { CaseFracture } from "./fracture";
import { CaseChapter } from "./chapter";
import { CaseImpact } from "./impact";
import { CaseWorkRoom } from "./work";
import { CaseNext } from "./next";
import { CaseStack } from "./stack";
import { CaseVeil } from "./veil";
import type { DisplayTone } from "./tone";
import type { ProjectCase } from "@/lib/data/projects/types";

/**
 * The grounds, decided by the run rather than by the chapter.
 *
 * A chapter still declares a tone in its data, and that tone still means
 * something   but it means it about the work, not about the wall, and eleven
 * cases each choosing their own walls produced pages that were three-quarters
 * dark and read as one long night. So the run assigns them now: the two light
 * grounds alternate the whole way down, and the deep ground is spent once, on
 * the impact, which is the only section making a claim rather than describing
 * something.
 */
const LIGHT: DisplayTone[] = ["canvas", "cream"];

export function ProjectCaseStudy({
  project,
  next,
}: {
  project: ProjectCase;
  /** One or two, and never more. See `CaseNext`. */
  next: ProjectCase[];
}) {
  const chapters = project.chapters;
  const work = project.work ?? [];

  useEffect(() => {
    jumpToTop();
  }, [project.slug]);

  return (
    <article
      className="bg-canvas"
      style={
        {
          "--case-ground": project.ground ?? "var(--color-forest)",
        } as CSSProperties
      }
    >
      <CaseVeil />

      <CaseHero project={project} />

      <CaseStack>
        <CaseFracture
          fracture={project.fracture}
          architecture={project.architecture}
          tone="cream"
        />

        {chapters.map((chapter, index) => (
          <CaseChapter
            key={chapter.key}
            chapter={chapter}
            tone={LIGHT[index % LIGHT.length]}
            number={index + 1}
          />
        ))}

        {/* The one deep room, drawn as a panel inset from the edges. */}
        <CaseImpact impact={project.impact} tone="forest" />

        {work.length ? <CaseWorkRoom work={work} tone="canvas" /> : null}

        <CaseNext next={next} />
      </CaseStack>
    </article>
  );
}
