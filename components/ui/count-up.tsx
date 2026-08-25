"use client";

import { useEffect, useRef } from "react";

/**
 * A figure that counts up from zero when it is scrolled to, and again on each
 * return to it.
 *
 * What is rendered is the finished value, so the real figure is what gets
 * served, indexed and read aloud; the count is written straight to the node
 * from an animation frame, which keeps a hundred-step count from costing a
 * hundred renders. Whatever surrounds the number — a `+`, a `%`, a leading
 * zero that makes it a label as much as a count — is held aside and put back
 * on every frame, so `27+` counts and stays `27+`.
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const parts = value.match(/^(\D*?)([\d.,\s]*\d)(.*)$/);
    if (!parts) return; // nothing countable in it — leave the text alone

    const [, lead, digits, tail] = parts;
    const target = Number(digits.replace(/[\s,]/g, ""));
    if (!Number.isFinite(target)) return;

    /* A leading zero is part of how the figure reads, so it is kept. */
    const width = /^0\d/.test(digits) ? digits.length : 0;
    const draw = (n: number) => `${lead}${String(n).padStart(width, "0")}${tail}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let started = 0;

    const step = (now: number) => {
      if (!started) started = now;
      const t = Math.min((now - started) / 1400, 1);
      // Fast off the mark, easing into the true figure.
      node.textContent = draw(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(frame);

        if (entry.isIntersecting) {
          started = 0;
          frame = requestAnimationFrame(step);
          return;
        }

        // Out of sight, wound back — so coming back to it plays the count
        // again rather than showing a figure that has already landed.
        node.textContent = draw(0);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
