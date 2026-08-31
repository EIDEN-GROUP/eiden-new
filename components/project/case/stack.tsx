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
 * How long a room waits, once it has been read, before the next one starts to
 * climb over it   as a share of the screen.
 *
 * Without it the curtain has no pause in it at all: a room finishes arriving on
 * the exact scroll position where the next one begins to cover it, so the
 * reader is always being moved on from something they have only just been
 * given. Half a screen of scroll that changes nothing is what turns the run
 * from a mechanism into a pace   the room simply stays, and the reader decides
 * when to leave it.
 *
 * It is scroll distance, not time: nothing is locked, nothing is waited on. A
 * reader in a hurry spins through it and a reader who is reading never notices
 * it is there.
 */
const HOLD = 0.5;

/**
 * Hold a section by its own edge once it has been read.
 *
 * This is the whole curtain, and it is one line of CSS that cannot be written
 * in CSS: `position: sticky; top: calc(100vh - <content height>)`. A room
 * taller than the screen cannot be pinned at `top: 0`   everything below the
 * fold would become unreachable   so it is pinned by its bottom instead. It
 * scrolls up normally until all of it has been seen, then it stops dead, and
 * the room after it climbs over it while it waits.
 *
 * Two things are measured rather than declared, because CSS can express
 * neither. `top` is the screen less the room's own content. `--hold` is the
 * empty run of scroll added under that content, and it is the reason the pin
 * is computed from the content rather than from the section: the hold is part
 * of the section's height, never part of what is looked at, and a room pinned
 * by its full height would show the reader that emptiness instead of its own
 * last screen.
 *
 * A `ResizeObserver` catches the images finishing, the fonts landing, and the
 * reader turning their phone.
 *
 * Under reduced motion nothing is held and nothing waits: the rooms simply
 * stack, which is what that setting is asking for.
 */
function useHeld<T extends HTMLElement>(release = false) {
  const ref = useRef<T>(null);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* A room with no inner measure of its own   the hero   is its own body. */
    const measured = () => body.current ?? node;

    const loosen = () => {
      node.style.position = "relative";
      node.style.top = "";
      node.style.setProperty("--hold", "0px");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      loosen();
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
        loosen();
        return;
      }
      node.style.position = "";

      const screen = window.innerHeight;
      node.style.setProperty("--hold", `${Math.round(screen * HOLD)}px`);

      /* Never positive: a room shorter than the screen would otherwise stop
         with the room behind it still showing above. */
      const top = Math.min(0, screen - measured().offsetHeight);
      node.style.top = `${Math.round(top)}px`;
    };

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };

    place();

    const observer = new ResizeObserver(queue);
    observer.observe(measured());
    window.addEventListener("resize", queue);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", queue);
    };
  }, [release]);

  return { ref, body };
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
  const { ref, body } = useHeld<HTMLElement>(release);

  return (
    <section
      ref={ref}
      id={id}
      data-nav-tone={skin.nav}
      /* The hold starts at nothing: it is scroll the server cannot know the
         size of, and a room that rendered it before being measured would open
         with a screen of empty ground under it. */
      style={{ zIndex: order + 1, "--hold": "0px" } as CSSProperties}
      className={cn(
        "sticky",
        skin.panel,
        LIP,
        order > 0 && "-mt-6 sm:-mt-8 lg:-mt-10",
      )}
    >
      {/* What is looked at, and what the pin is measured from. */}
      <div ref={body} className="min-h-svh">
        {children}
      </div>

      {/* The wait. Same ground, never on screen, and nothing but scroll. */}
      <div aria-hidden className="h-[var(--hold)]" />
    </section>
  );
}

export function useHeldHero() {
  return useHeld<HTMLElement>().ref;
}

/**
 * One block of writing or pictures inside a room, on the room's measure.
 *
 * `tight` drops the top margin, for a block that carries on from the one above
 * it rather than opening the room. The two paddings are written separately
 * because a variant of one cannot override the shorthand of the other: a bare
 * `pt-0` would lose to `lg:py-28` at exactly the width where the padding
 * matters most.
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
        "container-eiden pb-20 sm:pb-24 lg:pb-28",
        !tight && "pt-20 sm:pt-24 lg:pt-28",
        className,
      )}
    >
      {children}
    </div>
  );
}
