"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";
type RevealEffect = "slide" | "curtain";

const offsets: Record<Direction, { x: string; y: string }> = {
  up: { x: "0px", y: "1.75rem" },
  down: { x: "0px", y: "-1.75rem" },
  left: { x: "1.75rem", y: "0px" },
  right: { x: "-1.75rem", y: "0px" },
  none: { x: "0px", y: "0px" },
};

/**
 * Flip `data-reveal` / `data-reveal-group` to "in" the first time the element
 * enters the viewport. The attribute is toggled on the node directly, so a
 * reveal never costs a React re-render.
 */
function useRevealOnce(
  attribute: "data-reveal" | "data-reveal-group" | "data-reveal-words",
  amount: number,
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Anything already on screen at mount reveals immediately.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.setAttribute(attribute, "in");
        observer.disconnect();
      },
      {
        threshold: Math.min(Math.max(amount, 0), 0.95),
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [attribute, amount]);

  return ref;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  direction?: Direction;
  /** Seconds. */
  delay?: number;
  /** Seconds. */
  duration?: number;
  /** Fraction of the element that must be visible before revealing. */
  amount?: number;
  effect?: RevealEffect;
};

/** Fade / slide an element into view once it is scrolled to. */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  direction = "up",
  delay = 0,
  duration = 0.7,
  amount = 0.2,
  effect = "slide",
}: RevealProps) {
  const ref = useRevealOnce("data-reveal", amount);
  const { x, y } = offsets[direction];

  return (
    <Tag
      ref={ref}
      data-reveal="out"
      data-reveal-effect={effect}
      className={cn(className)}
      style={
        {
          "--reveal-x": x,
          "--reveal-y": y,
          "--reveal-delay": `${delay}s`,
          "--reveal-duration": `${duration}s`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/**
 * Headline that rises word by word from behind its own baseline.
 *
 * Each word gets an `overflow-hidden` mask and an inner span that does the
 * moving, so the type appears to be pushed up into place rather than faded in.
 */
export function RevealWords({
  text,
  className,
  as: Tag = "span",
  /** Seconds before the first word moves. */
  delay = 0,
  /** Seconds between words. */
  step = 0.055,
  amount = 0.2,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  step?: number;
  amount?: number;
}) {
  const ref = useRevealOnce("data-reveal-words", amount);
  const words = text.split(" ");

  return (
    <Tag ref={ref} data-reveal-words="out" className={cn(className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={cn(
            // The padding keeps accents and descenders clear of the mask edge.
            "inline-block overflow-hidden pb-[0.14em] align-bottom",
            // No trailing space on the last word, so centred lines stay centred.
            index < words.length - 1 && "mr-[0.25em]",
          )}
        >
          <span
            className="word-rise inline-block"
            style={{ "--word-delay": `${delay + index * step}s` } as CSSProperties}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Which way the page is going, kept once for every block that asks rather than
 * once per block: the listener is passive and does nothing but compare two
 * numbers, and a page carrying a dozen sliding blocks should not carry a dozen
 * scroll handlers to tell them all the same thing.
 */
let scrollingUp = false;
let watchingScroll = false;

function watchScrollDirection() {
  if (typeof window === "undefined" || watchingScroll) return;
  watchingScroll = true;

  let last = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y !== last) scrollingUp = y < last;
      last = y;
    },
    { passive: true },
  );
}

/**
 * A block that arrives from the side, and keeps arriving.
 *
 * Every other reveal here is spent the first time it is read: the observer
 * disconnects and the element stays put. This one never disconnects, so the
 * block is re-armed each time it leaves the window and moves again on the way
 * back. That is the difference between an entrance and a rhythm, and a page
 * that is scrolled up and down as much as this one is wants the second.
 *
 * It is re-armed on the side it will next be met from, which is the whole
 * trick: a block left behind on the way down is next seen on the way back up,
 * so it is parked on the far side and returns from there. Read downward the
 * two halves of a chapter converge   the writing from one edge, the pictures
 * from the other   and read upward they converge from the sides they left by,
 * instead of snapping back to a replay of the first pass.
 *
 * `from` is the side it arrives from going down; going up it is the other one.
 * The distance lives in CSS so it can shrink on a narrow screen, and the whole
 * behaviour is inside `prefers-reduced-motion: no-preference` with the rest.
 */
export function SlideIn({
  children,
  className,
  as: Tag = "div",
  from,
  /** Seconds. */
  duration,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  from: "left" | "right";
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    watchScrollDirection();
    const opposite = from === "left" ? "right" : "left";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          /* Out of the window, which side it is out on says everything: above
             it, the block is next reached on the way up and is parked on the
             far edge; below it, on the way down and on its own. Position is
             read here rather than direction, because a block can be reported
             out while the reader is going the other way   on the first
             observation, most of all, when nothing has been scrolled at all. */
          node.setAttribute(
            "data-slide-from",
            entry.boundingClientRect.top < 0 ? opposite : from,
          );
          node.setAttribute("data-slide", "out");
          return;
        }

        /* Arriving, it is the direction of travel that decides, not position:
           an observer reports a crossing and not the frame it happened on, so
           a block thrown past in one gesture   a flicked wheel, a dragged
           scrollbar, an anchor   is already somewhere else by the time the
           callback runs, and where it sits then says nothing about which way
           the reader was going.
             When that leaves it parked on the wrong edge it is moved, and the
           move is flushed to the page before the transition is released, or it
           would slide in from an edge it was never on. */
        const side = scrollingUp ? opposite : from;
        if (node.dataset.slideFrom !== side) {
          node.setAttribute("data-slide-from", side);
          void node.offsetWidth;
        }
        node.setAttribute("data-slide", "in");
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [from]);

  return (
    <Tag
      ref={ref}
      data-slide="out"
      data-slide-from={from}
      className={cn(className)}
      style={
        duration
          ? ({ "--slide-duration": `${duration}s` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

/** Reveals its direct children in sequence. */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  amount?: number;
}) {
  const ref = useRevealOnce("data-reveal-group", amount);

  return (
    <Tag ref={ref} data-reveal-group="out" className={cn(className)}>
      {children}
    </Tag>
  );
}

