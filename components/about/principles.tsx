"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { useTravel } from "@/components/home2/motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { SwipeDeck } from "@/components/ui/swipe-deck";
import { proofTexture } from "@/lib/data/site";

type Principle = { n: string; title: string; text: string; quote: string };

const TILT = [-5, 3.5, 4.5, -3];

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
    <section className="bg-beige/50 py-24 sm:py-32">
      <div className="container-eiden">
        <SectionHeading eyebrow={eyebrow} title={title} className="max-w-2xl" />

        <div ref={deckRef} className="mt-14">
          <SwipeDeck className="grid gap-4 lg:grid-cols-2">
            {principles.map((principle, index) => {
              const column = index % 2;
              const row = Math.floor(index / 2);

              return (
                <article
                  key={principle.n}
                  style={
                    {
                      /* Where this card sits relative to the middle of the grid,
                       measured in its own width and height. */
                      "--gx": `${(0.5 - column) * 100}%`,
                      "--gy": `${((rows - 1) / 2 - row) * 100}%`,
                      "--gt": `${TILT[index % TILT.length]}deg`,
                    } as CSSProperties
                  }
                  className="deal-card glass-dark glass-top bg-ink relative flex flex-col overflow-hidden rounded-2xl p-8 sm:p-10 lg:[--dx:var(--gx)] lg:[--dy:var(--gy)] lg:[--shrink:0.05] lg:[--tilt:var(--gt)]"
                >
                  {/* The same silk the proof section runs on, blurred the same
                      way   the cards read as cut out of that ground. */}
                  <Image
                    src={proofTexture}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="principle-shot-img object-cover"
                  />
                  <span aria-hidden className="principle-shot-veil" />

                  <p className="font-label text-canvas relative z-1 text-[0.9375rem] font-bold tracking-[0.24em]">
                    {principle.n}
                  </p>
                  <h3 className="font-display text-ink relative z-1 mt-4 text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="text-ink/72 relative z-1 mt-3 text-[0.9375rem] leading-relaxed">
                    {principle.text}
                  </p>
                  <p className="editorial text-teal relative z-1 mt-auto pt-6 text-[0.9375rem] leading-snug">
                    “{principle.quote}”
                  </p>
                </article>
              );
            })}
          </SwipeDeck>
        </div>
      </div>
    </section>
  );
}
