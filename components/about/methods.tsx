"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef, type CSSProperties } from "react";
import { useTravel } from "@/components/home2/motion";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Method = { name: string; text: string; quote: string };
type Count = { value: string; label: string };

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

  useTravel(stepsRef, { from: 0.92, to: 0.3, cover: true });

  const total = methods.length;

  return (
    <section className="grain bg-beige py-24 sm:py-32">
      <div className="container-eiden relative z-2">
        <SectionHeading eyebrow={eyebrow} title={title} className="max-w-2xl" />

        <ol
          ref={stepsRef}
          style={{ "--n": `${total}` } as CSSProperties}
          className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-12"
        >
          {methods.map((method, index) => (
            <li
              key={method.name}
              style={{ "--i": `${index}` } as CSSProperties}
              className="step-in relative"
            >
              <div className="flex items-center gap-4">
                <span className="numeral text-teal text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.05em]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {index < total - 1 ? (
                  <span
                    aria-hidden
                    className={cn(
                      "step-arrow hidden flex-1 items-center",
                      // Two up, a run only leads somewhere out of the left
                      // column; on one line every step but the last has one.
                      index % 2 === 1 ? "lg:flex" : "sm:flex",
                    )}
                  >
                    <span className="bg-teal/35 h-px flex-1" />
                    <ArrowRight
                      className="text-teal/60 -ml-1 size-4 shrink-0"
                      strokeWidth={1.5}
                    />
                  </span>
                ) : null}
              </div>

              {/* Stacked, the same run is turned down the column and drawn
                  through the gap that separates this step from the next. */}
              {index < total - 1 ? (
                <span
                  aria-hidden
                  className="step-run absolute inset-x-0 -bottom-12 flex h-12 flex-col items-center sm:hidden"
                >
                  <span className="bg-teal/35 w-px flex-1" />
                  <ArrowDown
                    className="text-teal/60 -mt-1 size-4 shrink-0"
                    strokeWidth={1.5}
                  />
                </span>
              ) : null}

              <h3 className="font-display text-ink mt-5 text-[clamp(1.125rem,2vw,1.5rem)] font-bold tracking-[-0.02em]">
                {method.name}
              </h3>
              <p className="text-ink/60 mt-3 text-[0.9375rem] leading-relaxed">
                {method.text}
              </p>
              <p className="editorial text-teal mt-4 text-[0.9375rem] leading-snug">
                “{method.quote}”
              </p>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="eyebrow text-ink/35 mt-20">{numbersEyebrow}</p>
        </Reveal>

        <div className="border-ink/12 mt-6 grid grid-cols-2 gap-x-8 gap-y-10 border-t pt-10 lg:grid-cols-4">
          {numbers.map((entry) => (
            <div key={entry.label}>
              <p className="font-display text-ink text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums">
                <CountUp value={entry.value} />
              </p>
              <p className="text-ink/55 mt-3 text-[0.9375rem] leading-snug">
                {entry.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
