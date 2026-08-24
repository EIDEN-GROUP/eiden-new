"use client";

import { ArrowUpRight } from "lucide-react";
import { SystemScreenshot, useSay } from "@/components/solutions/shared";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { solutionsCopy, type SystemRecord } from "@/lib/data/solutions";
import { cn } from "@/lib/utils";

/**
 * One product, given a page-width slot of its own.
 *
 * The layout alternates: odd entries put the writing left and the product
 * right, even entries swap them. It is the cheapest way to stop four
 * products in a row reading as four identical cards, and it costs one
 * boolean rather than a second component.
 */
export function SystemFeature({
  system,
  flipped,
}: {
  system: SystemRecord;
  flipped?: boolean;
}) {
  const say = useSay();
  const copy = solutionsCopy.systems;
  const hasCapabilities = system.capabilities.length > 0;

  return (
    <article className="border-ink/12 border-t py-16 sm:py-20 lg:py-24">
      <div
        className={cn(
          "grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16",
        )}
      >
        <div className={cn("min-w-0", flipped && "lg:order-last")}>
          <Reveal direction="none" duration={0.5}>
            <p className="flex items-baseline gap-4">
              <span className="eyebrow text-ink/30 tabular-nums">
                {system.number}
              </span>
              <span className="eyebrow text-teal">{say(system.category)}</span>
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h3 className="font-display text-ink mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-none font-extrabold tracking-[-0.04em] uppercase">
              {system.name}
            </h3>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="editorial text-ink/75 mt-5 max-w-md text-[clamp(1.125rem,2vw,1.5rem)]">
              {say(system.tagline)}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="text-ink/55 mt-5 max-w-md text-[0.9375rem] leading-relaxed">
              {say(system.description)}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10">
              <p className="eyebrow text-ink/30">{say(copy.builtFor)}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {system.audience.map((item) => (
                  <li
                    key={say(item)}
                    className="border-ink/15 text-ink/70 rounded-full border px-4 py-1.5 text-[0.875rem]"
                  >
                    {say(item)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <a
              href={system.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group text-ink hover:text-teal mt-10 inline-flex items-center gap-4 transition-colors duration-300"
            >
              <span className="font-label text-[0.875rem] font-bold tracking-[0.16em] uppercase">
                {say(copy.explore)} {system.name}
              </span>
              <span className="border-ink/20 group-hover:bg-ink group-hover:text-canvas flex size-10 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
                <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
              </span>
            </a>
          </Reveal>
        </div>

        <div className="min-w-0">
          <Reveal delay={0.08} direction={flipped ? "right" : "left"}>
            <SystemScreenshot
              screenshot={system.screenshot}
              alt={`${system.name} — ${say(system.tagline)}`}
              url={system.url}
            />
          </Reveal>

          {hasCapabilities ? (
            <div className="mt-8">
              <Reveal direction="none" duration={0.5}>
                <p className="eyebrow text-ink/30">{say(copy.inside)}</p>
              </Reveal>

              <div className="mt-4 flex flex-col gap-5">
                {system.capabilities.map((group, index) => (
                  <div key={group.group ? say(group.group) : index}>
                    {group.group ? (
                      <p className="font-label text-teal text-[0.8rem] font-bold tracking-[0.16em] uppercase">
                        {say(group.group)}
                      </p>
                    ) : null}

                    <RevealGroup
                      className={cn(
                        "grid grid-cols-2 gap-x-6 gap-y-px sm:grid-cols-3",
                        group.group && "mt-2",
                      )}
                    >
                      {group.items.map((item) => (
                        <p
                          key={say(item)}
                          className="border-ink/10 text-ink/70 border-b py-2.5 text-[0.9375rem]"
                        >
                          {say(item)}
                        </p>
                      ))}
                    </RevealGroup>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow text-ink/25 mt-8">{say(copy.privateNote)}</p>
            </Reveal>
          )}
        </div>
      </div>
    </article>
  );
}
