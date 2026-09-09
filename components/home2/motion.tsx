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


const clamp01 = (value: number) => Math.min(1, Math.max(0, value));


export function litRamp(lit: string, dim: string) {
  return (
    `color-mix(in oklab, ${lit} ` +
    `calc(clamp(0, calc(var(--p, 0) * var(--n) - var(--i)), 1) * 100%), ` +
    `${dim})`
  );
}

const LIT = litRamp("var(--color-ink)", "var(--color-canvas)");
export function useTravel(
  ref: RefObject<HTMLElement | null>,
  {
    from = 0.92,
    to = 0.4,
    cover = false,
    property = "--p",
  }: {
    from?: number;
    to?: number;
    cover?: boolean;
    property?: string;
  } = {},
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty(property, "1");
      return;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;
      const height = window.innerHeight;
      const top = node.getBoundingClientRect().top;
      const window_ = (from - to) * height;
      const span = cover ? Math.max(window_, node.offsetHeight) : window_;
      node.style.setProperty(
        property,
        `${clamp01((from * height - top) / span)}`,
      );
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
  }, [ref, from, to, cover, property]);
}

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
    <div style={{ animationDelay: `${delay}s` } as CSSProperties} className={cn( "motion-safe:[animation:eiden-fade-in_0.9s_var(--ease-brand)_both]", className, )}>
      {children}
    </div>
  );
}
