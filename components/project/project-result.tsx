"use client";

import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import type { ProjectPage } from "@/lib/data/projects";

/**
 * 06   The result.
 *
 * A statement, then either the numbers or the changes. Never both, and never
 * a number the client did not give us   a case study that invents its own
 * results is worth less than one that simply says what is different now.
 */
export function ProjectResult({ result }: { result: ProjectPage["result"] }) {
  const say = useLocalized();
  const hasMetrics = Boolean(result.metrics?.length);

  return (
    <section data-nav-tone="light" className="grain bg-beige text-ink">
      <div className="container-eiden py-20 sm:py-28">
        <Reveal direction="none" duration={0.5}>
          <div className="border-ink/15 flex items-baseline gap-4 border-t pt-5">
            <span className="eyebrow text-ink/35 tabular-nums">06</span>
            <span className="eyebrow text-ink">The result</span>
          </div>
        </Reveal>

        <RevealWords
          as="p"
          text={say(result.statement)}
          delay={0.06}
          className="font-display text-ink mt-12 block max-w-4xl text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.03em]"
        />

        {hasMetrics ? (
          <RevealGroup className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-6">
            {result.metrics?.map((metric) => (
              <div key={metric.value} className="border-ink/15 border-t pt-6">
                <p className="font-display text-teal text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-extrabold tracking-[-0.05em]">
                  {metric.value}
                </p>
                <p className="text-ink/55 mt-3 max-w-[16rem] text-[0.9375rem] leading-snug">
                  {say(metric.label)}
                </p>
              </div>
            ))}
          </RevealGroup>
        ) : (
          <div className="mt-16">
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow text-ink/35">What changed</p>
            </Reveal>

            <RevealGroup className="mt-6 flex flex-col">
              {result.changes?.map((change) => (
                <p
                  key={say(change)}
                  className="border-ink/12 text-ink/80 max-w-2xl border-b py-5 text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed first:border-t"
                >
                  {say(change)}
                </p>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </section>
  );
}
