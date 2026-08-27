"use client";

import { useEffect } from "react";
import { jumpToTop } from "@/components/providers/smooth-scroll";
import { CaseHero } from "./hero";
import { CaseTransformation } from "./transformation";
import { CaseChapter } from "./chapter";
import { CaseOutcomeRoom } from "./outcome";
import { CaseNextScroll } from "./next-scroll";
import { CaseStack } from "./stack";
import { CaseVeil } from "./veil";
import type { ProjectCase } from "@/lib/data/projects/types";

export function ProjectCaseStudy({
  project,
  next,
}: {
  project: ProjectCase;
  next: ProjectCase;
}) {
  const chapters = project.chapters;

  useEffect(() => {
    jumpToTop();
  }, [project.slug]);

  let order = 0;
  const turn = order++;
  const chapterOrders = chapters.map(() => order++);
  const claimed = chapters.some((chapter) => chapter.metric);
  const outcomeTone =
    chapters.at(-1)?.tone === "forest" ? "ink" : ("forest" as const);

  return (
    <article className="bg-ink">
      <CaseVeil />

      <CaseHero project={project} chapters={chapters} />

      <CaseStack>
        <CaseTransformation transformation={project.transformation} order={turn} tone="canvas" />

        {chapters.map((chapter, index) => (
          <CaseChapter
            key={chapter.key}
            chapter={chapter}
            order={chapterOrders[index]}
            number={index + 1}
            /* Where a room states the result, that room is the last section of
               the case and lets go on a phone. */
            release={claimed && index === chapters.length - 1}
          />
        ))}

        {!claimed && project.outcome ? (
          <CaseOutcomeRoom
            outcome={project.outcome}
            order={order}
            tone={outcomeTone}
          />
        ) : null}

        <CaseNextScroll next={next} order={order + 1} />
      </CaseStack>
    </article>
  );
}
