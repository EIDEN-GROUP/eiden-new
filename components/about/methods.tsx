"use client";

import { ArrowRight } from "lucide-react";
import { useRef, type CSSProperties } from "react";
import { useTravel } from "@/components/home2/motion";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Method = { name: string; text: string; quote: string };
type Count = { value: string; label: string };

/**
 * The methods, read across as a sequence rather than down as a list.
 *
 * They are a sequence in fact — a diagnosis, then an analysis, then the
 * implementation — and setting them side by side under a numbered run says so
 * where three equal boxes said the opposite. Each step rises and lights as the
 * block's travel reaches it, one after the other, and the run to the next step
 * is drawn a half-step behind it; all of it settles back as that travel
 * unwinds, because the movement is measured from where the block sits rather
 * than fired once at a threshold.
 *
 * The arrows are asked for only from `lg`. Below that the steps are stacked in
 * one column, and an arrow pointing right at the end of a column would be
 * pointing at nothing.
 */
export function AboutMethods({
  eyebrow,
  title,
  methods,
  numbersEyebrow,
  numbers,
}: {
  eyebrow: string;
  title: string;
  methods: Method[];
  numbersEyebrow: string;
  numbers: Count[];
}) {
  const stepsRef = useRef<HTMLOListElement>(null);

  useTravel(stepsRef, { from: 0.92, to: 0.3 });

  const total = methods.length;

  return (
    <section className="grain bg-forest py-24 sm:py-32">
      <div className="container-eiden relative z-2">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          tone="light"
          className="max-w-2xl"
        />

        <ol
          ref={stepsRef}
          style={{ "--n": `${total}` } as CSSProperties}
          className="mt-14 grid gap-x-8 gap-y-12 lg:grid-cols-3 xl:gap-x-12"
        >
          {methods.map((method, index) => (
            <li
              key={method.name}
              style={{ "--i": `${index}` } as CSSProperties}
              className="step-in"
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-gold text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {index < total - 1 ? (
                  <span
                    aria-hidden
                    className="step-arrow hidden flex-1 items-center lg:flex"
                  >
                    <span className="bg-gold/35 h-px flex-1" />
                    <ArrowRight
                      className="text-gold/60 -ml-1 size-4 shrink-0"
                      strokeWidth={1.5}
                    />
                  </span>
                ) : null}
              </div>

              <h3 className="font-display text-canvas mt-5 text-[clamp(1.125rem,2vw,1.5rem)] font-bold tracking-[-0.02em]">
                {method.name}
              </h3>
              <p className="text-canvas/60 mt-3 text-[0.9375rem] leading-relaxed">
                {method.text}
              </p>
              <p className="editorial text-gold mt-4 text-[0.9375rem] leading-snug">
                “{method.quote}”
              </p>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="eyebrow text-canvas/35 mt-20">{numbersEyebrow}</p>
        </Reveal>

        <div className="border-canvas/12 mt-6 grid grid-cols-2 gap-x-8 gap-y-10 border-t pt-10 lg:grid-cols-4">
          {numbers.map((entry) => (
            <div key={entry.label}>
              <p className="font-display text-canvas text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums">
                <CountUp value={entry.value} />
              </p>
              <p className="text-canvas/55 mt-3 text-[0.9375rem] leading-snug">
                {entry.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
