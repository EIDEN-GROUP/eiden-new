"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A figure that counts up to itself the first time it is read.
 *
 * The value is written as the client publishes it   "+38%", "×3", "+120"
 * and only the number inside is animated: the sign, the multiplier and the
 * unit are part of what the figure means and are never invented, reordered or
 * dropped. A value with no single number in it ("0 → 1") is a statement rather
 * than a count, and is simply shown.
 *
 * The digits are written straight onto the node rather than held in state: a
 * re-render per frame, on a page carrying several of these, would be paid for
 * by the scrolling.
 *
 * It runs once. A number that recounted every time it came back on screen
 * would read as a widget, and this is a result.
 */
export function CountUp({
  value,
  className,
  /** Seconds. */
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  /* prefix · number · suffix, e.g. "+" "38" "%" */
  const parts = value.match(/^(\D*?)(\d+(?:[.,]\d+)?)(\D*)$/);

  useEffect(() => {
    const node = ref.current;
    if (!node || !parts) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, head, digits, tail] = parts;
    const decimals = (digits.split(/[.,]/)[1] ?? "").length;
    const separator = digits.includes(",") ? "," : ".";
    const target = Number(digits.replace(",", "."));
    if (!Number.isFinite(target)) return;

    let raf = 0;
    let guard = 0;
    let began = 0;

    const write = (n: number) =>
      head + n.toFixed(decimals).replace(".", separator) + tail;

    /* Whatever happens to the frame loop, the figure ends up reading what the
       client published. */
    const land = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      node.textContent = value;
    };

    const run = (now: number) => {
      if (!began) began = now;
      const t = Math.min((now - began) / (duration * 1000), 1);
      /* The same curve the rest of the page eases on, so the number settles
         rather than stopping dead. */
      const eased = 1 - Math.pow(1 - t, 3);
      if (t < 1) {
        node.textContent = write(target * eased);
        raf = requestAnimationFrame(run);
      } else {
        land();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        node.textContent = write(0);
        raf = requestAnimationFrame(run);
        /* A backgrounded tab, a hidden pane or a frame budget under strain all
           stop `requestAnimationFrame`, and a result frozen half-counted is a
           wrong number rather than a missing animation. This lands it. */
        guard = window.setTimeout(land, duration * 1000 + 400);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (guard) window.clearTimeout(guard);
    };
  }, [value, duration, parts]);

  /* Rendered at its final value, so it is right with no JavaScript, right for
     a reader who asked for less motion, and right in a search result. */
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value}
    </span>
  );
}
