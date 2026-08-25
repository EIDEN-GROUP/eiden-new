"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Movement = { n: string; title: string; text: string };

type MovementsProps = {
  eyebrow: string;
  title: string;
  movements: Movement[];
  /** One frame per movement, in order. */
  media: readonly string[];
};

/** Inner gutter of the reading column, matched by the heading above it. */
const COLUMN = "px-5 sm:px-8 lg:px-12 xl:px-16";

/**
 * The origin, told as a pinned split.
 *
 * The frame on the left is `position: sticky` for the whole sequence while the
 * reading column scrolls past it. A band across the middle of the viewport
 * decides which movement is being read, and the frame — picture, counter and
 * caption — cross-fades to match. The pin is CSS and only the active index is
 * state, so a swap costs one re-render per movement rather than one per frame.
 *
 * Below `lg` the split becomes a stack — heading, then the frame pinned to the
 * top at just under half the viewport, then the movements running underneath it
 * — so the same pairing of picture and text survives on a phone. The reading
 * band shifts down out of the frame with it.
 */
export function AboutMovements({
  eyebrow,
  title,
  movements,
  media,
}: MovementsProps) {
  const [active, setActive] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const split = useMediaQuery("(min-width: 64rem)");

  const total = movements.length;
  /* Before the first movement is reached the frame already shows its opening
     picture — only the caption is held back. */
  const current = active ?? 0;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const panels = Array.from(
      track.querySelectorAll<HTMLElement>("[data-movement]"),
    );
    if (panels.length === 0) return;

    // A hairline across the viewport, crossed by exactly one movement at a
    // time: centred on the split layout, and pushed just under the pinned frame
    // once stacked, so the hand-over lands as the outgoing text clears it.
    const rootMargin = split ? "-50% 0px -50% 0px" : "-47% 0px -53% 0px";
    const lit = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.movement);
          if (entry.isIntersecting) lit.add(index);
          else lit.delete(index);
        }

        if (lit.size > 0) {
          const next = Math.min(...lit);
          setActive((held) => (held === next ? held : next));
          return;
        }

        // Nothing in the band: stay silent above the sequence, hold the closing
        // frame once it has been scrolled clear of.
        const before = panels[0].getBoundingClientRect().top > 0;
        setActive(before ? null : panels.length - 1);
      },
      { rootMargin, threshold: 0 },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, [split, total]);

  if (total === 0) return null;

  return (
    <section className="grain bg-ink">
      <div
        ref={trackRef}
        className="relative z-2 flex flex-col lg:grid lg:grid-cols-[minmax(0,44%)_minmax(0,1fr)] lg:grid-rows-[auto_auto]"
      >
        {/* ── The pinned frame ──────────────────────────────────────
            Decorative: every word in it is also in the column beside it. */}
        <div
          aria-hidden
          className="bg-forest-md sticky top-0 isolate order-2 h-[42svh] shrink-0 overflow-hidden lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-svh"
        >
          {movements.map((movement, index) => (
            <div
              key={movement.n}
              className={cn(
                "absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-[var(--ease-brand)] motion-reduce:transition-none",
                index === current
                  ? "scale-100 opacity-100"
                  : "scale-[1.07] opacity-0",
              )}
            >
              <Image
                src={media[index % media.length]}
                alt=""
                fill
                sizes="(min-width: 64rem) 44vw, 100vw"
                priority={index === 0}
                className="object-cover object-center"
              />
            </div>
          ))}

          {/* Struck from the frame's own ink, so the caption reads on a bright
              picture as well as a dark one. */}
          <span className="from-ink via-ink/45 pointer-events-none absolute inset-x-0 bottom-0 z-1 h-3/5 bg-gradient-to-t to-transparent" />

          {/* Where you are in the sequence, one mark per movement. */}
          <div className="absolute top-1/2 right-6 z-2 hidden -translate-y-1/2 flex-col gap-2 lg:flex xl:right-8">
            {movements.map((movement, index) => (
              <span
                key={movement.n}
                className={cn(
                  "h-8 w-px transition-[background-color,transform] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                  active !== null && index === current
                    ? "bg-gold scale-y-100"
                    : "bg-canvas/25 scale-y-75",
                )}
              />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 z-2 p-6 sm:p-8 lg:p-10 xl:p-12">
            {/* One grid cell with every caption stacked in it: the box is as
                tall as the longest title, so a swap never nudges the layout. */}
            <div
              className={cn(
                "grid transition-opacity duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                active === null ? "opacity-0" : "opacity-100",
              )}
            >
              {movements.map((movement, index) => (
                <div
                  key={movement.n}
                  className={cn(
                    "col-start-1 row-start-1 transition-[opacity,transform] duration-700 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    index === current
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0",
                  )}
                >
                  <p className="font-label text-gold text-[0.8125rem] font-bold tracking-[0.28em]">
                    {String(index + 1).padStart(2, "0")}
                    <span className="text-canvas/40">
                      {` / ${String(total).padStart(2, "0")}`}
                    </span>
                  </p>
                  <p className="font-display text-canvas mt-3 text-[clamp(1.25rem,2.1vw,1.875rem)] leading-[1.06] font-extrabold tracking-[-0.03em]">
                    {movement.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── The heading, at the head of the reading column ────────── */}
        <div
          className={cn(
            "order-1 pt-24 pb-12 sm:pt-28 lg:order-none lg:col-start-2 lg:row-start-1 lg:pt-32 lg:pb-16",
            COLUMN,
          )}
        >
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            tone="light"
            className="max-w-2xl"
          />
        </div>

        {/* ── One movement per screen ───────────────────────────────── */}
        <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2">
          {movements.map((movement, index) => (
            <article
              key={movement.n}
              data-movement={index}
              className={cn(
                "border-canvas/10 flex min-h-[62svh] flex-col justify-center border-t py-14 lg:min-h-svh lg:py-24",
                COLUMN,
              )}
            >
              <Reveal amount={0.25}>
                <span
                  aria-hidden
                  className={cn(
                    "bg-gold block h-px w-12 origin-left transition-transform duration-700 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    active === index ? "scale-x-100" : "scale-x-0",
                  )}
                />
                <p className="font-label text-gold mt-6 text-[0.9375rem] font-bold tracking-[0.24em]">
                  {movement.n}
                </p>
                <h3 className="font-display text-canvas mt-4 text-[clamp(1.75rem,3.2vw,3.25rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
                  {movement.title}
                </h3>
                <p className="text-canvas/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                  {movement.text}
                </p>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
