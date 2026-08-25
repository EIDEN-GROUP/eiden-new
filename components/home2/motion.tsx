"use client";

import {
  Fragment,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type RefObject,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll choreography for the home2 layout.
 *
 * Every moving part here is driven the same way: one rAF-throttled listener
 * writes a 0→1 number into a CSS custom property, and the markup underneath
 * reads it. React never re-renders mid-scroll, and everything degrades to its
 * finished state when the visitor asks for less motion.
 */

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * A step's colour, ramped from `dim` to `lit` by the block's progress and the
 * step's own index. `var(--p, 0)` so the run is legible from the first paint,
 * before any scroll listener has had a chance to write anything.
 *
 * The caller reads `--n` (how many steps) off the run and `--i` (which one)
 * off each step, so the same ramp lights a headline word by word or a list
 * line by line.
 */
export function litRamp(lit: string, dim: string) {
  return (
    `color-mix(in oklab, ${lit} ` +
    `calc(clamp(0, calc(var(--p, 0) * var(--n) - var(--i)), 1) * 100%), ` +
    `${dim})`
  );
}

/** The headline ramp: muted beige up to ink. */
const LIT = litRamp("var(--color-ink)", "var(--color-beige-dk)");

/**
 * Write the element's travel through the viewport into `--p`.
 *
 * `from` and `to` are viewport fractions measured from the top: progress
 * starts when the element's top edge crosses `from` and completes at `to`.
 */
export function useTravel(
  ref: RefObject<HTMLElement | null>,
  { from = 0.92, to = 0.4 }: { from?: number; to?: number } = {},
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;
      const height = window.innerHeight;
      const top = node.getBoundingClientRect().top;
      const span = (from - to) * height;
      node.style.setProperty("--p", `${clamp01((from * height - top) / span)}`);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, from, to]);
}

/**
 * A headline whose words light up one after another as the block rises.
 *
 * Each word mixes its own colour out of the shared progress and its index, so
 * the line stays one run of text — no stacked copies to fall out of register,
 * and nothing doubled for anyone selecting or reading the page aloud.
 */
export function ScrollWords({
  text,
  as: Tag = "h2" as ElementType,
  className,
  from,
  to,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useTravel(ref, { from, to });

  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      style={{ "--n": `${words.length}`, "--p": "0" } as CSSProperties}
      className={cn("text-balance", className)}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            style={
              {
                "--i": `${index}`,
                /*
                 * The ramp is written out in place rather than parked in its
                 * own custom property: substituting a `clamp()` into a
                 * surrounding `calc()` resolves to 0% in Chrome, so the whole
                 * line would sit at its muted colour forever.
                 */
                color: LIT,
                transition: "color 0.25s linear",
              } as CSSProperties
            }
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/**
 * Lift-and-fade on entry, staged by index.
 *
 * The finished state is the default and the offset is applied only under
 * `motion-safe`, so nothing can be stranded off-screen without animation.
 */
export function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Seconds. */
  delay?: number;
  className?: string;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}s` } as CSSProperties}
      className={cn(
        "motion-safe:[animation:eiden-fade-in_0.9s_var(--ease-brand)_both]",
        className,
      )}
    >
      {children}
    </div>
  );
}
