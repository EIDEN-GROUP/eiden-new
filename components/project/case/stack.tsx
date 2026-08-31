"use client";

import type { ReactNode } from "react";
import { TONES, type DisplayTone } from "./tone";
import { cn } from "@/lib/utils";

/**
 * The run the whole case study is read through.
 *
 * It used to be a curtain: every section pinned by its own bottom edge and the
 * next one climbing over it. That mechanic reads well once and gets in the way
 * on the second visit   nothing can be scrolled back past without unwinding an
 * animation, an in-page anchor lands on a pinned edge rather than on a
 * heading, and the page never stops moving while it is being read.
 *
 * So the sections simply follow one another now, on daylight ground, and the
 * pace is carried by what it should have been carried by all along: the
 * spacing, the change of ground between sections, and the reveals inside them.
 */
export function CaseStack({ children }: { children: ReactNode }) {
  return <div className="bg-canvas relative">{children}</div>;
}

/**
 * One section of the case.
 *
 * The two light grounds are drawn edge to edge   canvas and cream alternate,
 * and the change of ground is the only seam a light page needs. A deep ground
 * is drawn as a panel inset from the edges instead: on a page read in daylight
 * a full-bleed dark section reads as a different site, while the same colour
 * held inside a rounded frame reads as one thing on the page being emphasised,
 * which is what the deep ground is here for.
 */
export function CaseSection({
  tone,
  id,
  className,
  children,
}: {
  tone: DisplayTone;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const skin = TONES[tone];
  const deep = tone === "ink" || tone === "forest";

  if (!deep) {
    return (
      <section
        id={id}
        data-nav-tone={skin.nav}
        className={cn("relative scroll-mt-24", skin.panel, className)}
      >
        {children}
      </section>
    );
  }

  return (
    <section id={id} className={cn("bg-canvas scroll-mt-24 px-2.5 sm:px-4", className)}>
      <div
        data-nav-tone={skin.nav}
        className={cn(
          "relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]",
          skin.panel,
        )}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * One block of writing or pictures inside a section, on the page measure.
 *
 * `tight` drops the top padding, for a block that carries on from the one
 * above it rather than opening the section. The two paddings are written
 * separately because a variant of one cannot override the shorthand of the
 * other: a bare `pt-0` would lose to `lg:py-32` at exactly the width where the
 * padding matters most.
 */
export function CaseBlock({
  className,
  tight = false,
  children,
}: {
  className?: string;
  tight?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "container-eiden pb-24 sm:pb-28 lg:pb-32",
        !tight && "pt-24 sm:pt-28 lg:pt-32",
        className,
      )}
    >
      {children}
    </div>
  );
}
