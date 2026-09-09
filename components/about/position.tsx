"use client";

import { useRef } from "react";
import { useTravel } from "@/components/home2/motion";
import { RevealLines } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * "Notre position"   the statement and the paragraph that answers it.
 *
 * The two halves arrive gathered at the middle of the column and are pulled
 * apart to their own places by the scroll. `useTravel` writes the block's
 * travel into `--p` on every scroll rather than latching it on the way in,
 * which is the whole point of it here: the pair opens going down and closes
 * again coming back up, every time the section is passed, instead of playing
 * once and staying open.
 *
 * How far each half is gathered, and on which axis, is `.split-lead` /
 * `.split-body` in `globals.css`   stacked they close on the vertical, side
 * by side on the horizontal.
 */
export function AboutPosition({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  /* `from` sits just above the hero's own height   the section opens at
     `74svh`, so anything higher would leave the pair already half apart at
     the top of the page, on a tall window most of all. Starting under it
     means the halves are gathered when the section first shows, whatever
     the window, and the scroll is what opens them. */
  useTravel(sectionRef, { from: 0.72, to: 0.22, property: "--split" });

  return (
    <section ref={sectionRef} className="bg-canvas py-24 sm:py-32">
      <div className="container-eiden grid items-end gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
        <div className="split-part split-lead lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </div>

        <div className="split-part split-body">
          <RevealLines
            text={body}
            delay={0.06}
            /* Wider than the default: the run is two sentences long, and at
               the default step the second is already moving before the first
               has landed, which reads as one block arriving rather than two. */
            step={0.3}
            className="editorial text-forest text-[clamp(1rem,2.4vw,1.5rem)] leading-snug"
            lineClassName="mt-4 first:mt-0"
          />
        </div>
      </div>
    </section>
  );
}
