"use client";

import { useRef, type CSSProperties } from "react";
import { useTravel } from "@/components/home2/motion";
import { SectionHeading } from "@/components/ui/section-heading";

type Principle = { n: string; title: string; text: string; quote: string };

/** The lean each card carries in the pile, cycled down the deck. */
const TILT = [-5, 3.5, 4.5, -3];

/**
 * The principles, gathered into a deck and dealt out by the scroll.
 *
 * At the head of the block the cards are stacked over the middle of the grid,
 * squared off a little and leaning against each other. As the block travels up
 * the viewport each one slides out to the place it already occupies in the
 * layout — the grid never changes, only the transform on top of it, so nothing
 * is laid out twice and the cards cannot push each other around.
 *
 * The travel is read from the block's position rather than latched at a
 * threshold, so the deal runs backwards, at the same rate, the moment the
 * visitor scrolls back up.
 *
 * Below `lg` the grid is a single column and a pile would have to travel
 * several card-heights to clear itself, so the same machinery is pointed at a
 * short rise and fade instead — still scrolled, still reversible.
 */
export function AboutPrinciples({
  eyebrow,
  title,
  principles,
}: {
  eyebrow: string;
  title: string;
  principles: Principle[];
}) {
  const deckRef = useRef<HTMLDivElement>(null);

  useTravel(deckRef, { from: 0.9, to: 0.32 });

  const total = principles.length;
  const rows = Math.ceil(total / 2);

  return (
    <section className="bg-canvas py-24 sm:py-32">
      <div className="container-eiden">
        <SectionHeading eyebrow={eyebrow} title={title} className="max-w-2xl" />

        <div
          ref={deckRef}
          style={{ "--n": `${total}` } as CSSProperties}
          className="mt-14 grid gap-4 lg:grid-cols-2"
        >
          {principles.map((principle, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);

            return (
              <article
                key={principle.n}
                style={
                  {
                    "--i": `${index}`,
                    /* Where this card sits relative to the middle of the grid,
                       measured in its own width and height. */
                    "--gx": `${(0.5 - column) * 100}%`,
                    "--gy": `${((rows - 1) / 2 - row) * 100}%`,
                    "--gt": `${TILT[index % TILT.length]}deg`,
                  } as CSSProperties
                }
                className="deal-card bg-cream relative flex flex-col rounded-2xl p-8 [--dim:0.3] [--dy:1.75rem] sm:p-10 lg:[--dim:1] lg:[--dx:var(--gx)] lg:[--dy:var(--gy)] lg:[--shrink:0.05] lg:[--tilt:var(--gt)]"
              >
                <p className="font-label text-gold-dk text-[0.9375rem] font-bold tracking-[0.24em]">
                  {principle.n}
                </p>
                <h3 className="font-display text-forest mt-4 text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                  {principle.title}
                </h3>
                <p className="text-forest/65 mt-3 text-[0.9375rem] leading-relaxed">
                  {principle.text}
                </p>
                <p className="editorial text-teal mt-auto pt-6 text-[0.9375rem] leading-snug">
                  “{principle.quote}”
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
