"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { TONES } from "./tone";
import type { ChapterTone } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

/**
 * The edge a section arrives on: a rounded top, and a shadow cast upwards onto
 * whatever it is being drawn over.
 */
const LIP =
  "rounded-t-[1.5rem] shadow-[0_-32px_80px_-28px_rgba(0,0,0,0.6)] sm:rounded-t-[2rem] lg:rounded-t-[2.75rem]";

/**
 * Hold a section by its bottom edge once it has been read.
 *
 * This is the whole curtain, and it is one line of CSS that cannot be written
 * in CSS: `position: sticky; top: calc(100vh - <own height>)`. A section taller
 * than the screen cannot be pinned at `top: 0`   everything below the fold
 * would become unreachable   so it is pinned by its bottom instead. It scrolls
 * up normally until all of it has been seen, then it stops dead, and the
 * section after it climbs over it while it waits.
 *
 * `top` has no way to refer to the element's own height, so it is measured
 * here and written back. A `ResizeObserver` catches the images finishing, the
 * fonts landing, and the reader turning their phone.
 *
 * Under reduced motion nothing is held: the sections simply stack, which is
 * what that setting is asking for.
 */
function useHeld<T extends HTMLElement>(release = false) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.position = "relative";
      return;
    }

    let raf = 0;

    const place = () => {
      raf = 0;

      /* The last section lets go on a phone. What follows it there is the
         switch to the next project, and that is an ordinary block at that
         width   it should scroll up after the result rather than be drawn over
         it, which is what a section still being held would look like. */
      if (release && !window.matchMedia("(min-width: 64rem)").matches) {
        node.style.position = "relative";
        node.style.top = "";
        return;
      }
      node.style.position = "";

      /* Never positive: a section shorter than the screen would otherwise stop
         with the section behind it still showing above. */
      const top = Math.min(0, window.innerHeight - node.offsetHeight);
      node.style.top = `${Math.round(top)}px`;
    };

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };

    place();

    const observer = new ResizeObserver(queue);
    observer.observe(node);
    window.addEventListener("resize", queue);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", queue);
    };
  }, [release]);

  return ref;
}

/**
 * The stack the whole case study is read through.
 *
 * The ground behind is ink   the only thing that shows through the rounded top
 * edge of an arriving section, and what makes that edge read as an edge.
 * `isolate` keeps the sections' own `z-index` run inside the stack, and no
 * `overflow`, ever: an overflow here would become the scrollport and every
 * section would stop being held.
 */
export function CaseStack({ children }: { children: ReactNode }) {
  return <div className="bg-ink relative isolate">{children}</div>;
}

export function CaseRoom({
  tone,
  order,
  id,
  release = false,
  children,
}: {
  tone: ChapterTone;
  order: number;
  id?: string;
  release?: boolean;
  children: ReactNode;
}) {
  const skin = TONES[tone];
  const ref = useHeld<HTMLElement>(release);

  return (
    <section
      ref={ref}
      id={id}
      data-nav-tone={skin.nav}
      style={{ zIndex: order + 1 } as CSSProperties}
      className={cn(
        "sticky min-h-svh",
        skin.panel,
        LIP,
        order > 0 && "-mt-6 sm:-mt-8 lg:-mt-10",
      )}
    >
      {children}
    </section>
  );
}

export function useHeldHero() {
  return useHeld<HTMLElement>();
}

/** One block of writing or pictures inside a section, on the section's measure. */
export function CaseBlock({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("container-eiden py-20 sm:py-24 lg:py-28", className)}>
      {children}
    </div>
  );
}
