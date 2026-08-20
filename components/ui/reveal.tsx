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
