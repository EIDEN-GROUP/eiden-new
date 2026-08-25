"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SystemScreenshot, useSay } from "@/components/solutions/shared";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { solutionsCopy, type SystemRecord } from "@/lib/data/solutions";
import { cn } from "@/lib/utils";

export function SystemFeature({ system }: { system: SystemRecord }) {
  const say = useSay();
  const copy = solutionsCopy.systems;
  const hasCapabilities = system.capabilities.length > 0;

  return (
    <article className="grid gap-10 items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.85fr)_minmax(0,1fr)] lg:gap-12 xl:gap-14">
      {/* ── What it is ─────────────────────────────────────────────── */}
      <div className="min-w-0 lg:self-start">
        <Reveal direction="none" duration={0.5}>
          <p className="flex items-baseline gap-4">
            <span className="eyebrow text-canvas/30 tabular-nums">
              {system.number}
            </span>
            <span className="eyebrow text-gold">{say(system.category)}</span>
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h3 className="font-display text-canvas mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-none font-extrabold tracking-[-0.04em] uppercase">
            {system.name}
          </h3>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="editorial text-canvas/75 mt-4 text-[clamp(1.0625rem,1.6vw,1.25rem)]">
            {say(system.tagline)}
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="text-canvas/55 mt-4 text-[0.9375rem] leading-relaxed">
            {say(system.description)}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-8 lg:mt-6">
            <p className="eyebrow text-canvas/30">{say(copy.builtFor)}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {system.audience.map((item) => (
                <li key={say(item)} className="border-canvas/20 text-canvas/70 rounded-full border px-4 py-1.5 text-[0.875rem]">
                  {say(item)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        
        {/* The way in sits under the thing it opens. */}
        <Reveal delay={0.16}>
          <a
            href={system.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group text-canvas hover:text-gold mt-8 inline-flex items-center gap-4 transition-colors duration-300"
          >
            <span className="font-label text-[0.875rem] font-bold tracking-[0.16em] uppercase">
              {say(copy.explore)} {system.name}
            </span>
            <span className="border-canvas/25 group-hover:bg-canvas group-hover:text-ink flex size-10 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
              <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
            </span>
          </a>
        </Reveal>
      </div>

      {/* ── The product, shown whole ───────────────────────────────── */}
      <div className="min-w-0 lg:self-start">
        <Reveal delay={0.08}>
          {system.mockup ? (
            <div className="relative isolate mx-auto w-full overflow-hidden rounded-3xl" style={{ aspectRatio: `${system.mockup.width} / ${system.mockup.height}`, maxWidth: `calc(56svh * ${(system.mockup.width / system.mockup.height).toFixed(4)})`, }}>
              <Image
                src={system.mockup}
                alt={`${system.name} — ${say(system.tagline)}`}
                fill
                sizes="(min-width: 64rem) 46vw, 92vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          ) : (
            <SystemScreenshot screenshot={system.screenshot} alt={`${system.name} — ${say(system.tagline)}`} url={system.url}/>
          )}
        </Reveal>

      </div>

      {/* ── What is inside ─────────────────────────────────────────── */}
      <div className="min-w-0 lg:self-start">
        {hasCapabilities ? (
          <div>
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow text-canvas/30">{say(copy.inside)}</p>
            </Reveal>

            <div className="mt-5 flex flex-col gap-5">
              {system.capabilities.map((group, index) => (
                <div key={group.group ? say(group.group) : index}>
                  {group.group ? (
                    <p className="font-label text-gold text-[0.8rem] font-bold tracking-[0.16em] uppercase">
                      {say(group.group)}
                    </p>
                  ) : null}

                  <RevealGroup
                    className={cn("flex flex-col", group.group && "mt-2")}
                  >
                    {group.items.map((item) => (
                      <p
                        key={say(item)}
                        className="border-canvas/12 text-canvas/70 border-b py-2.5 text-[0.9375rem]"
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
            <p className="eyebrow text-canvas/25 mt-10">{say(copy.privateNote)}</p>
          </Reveal>
        )}
      </div>
    </article>
  );
}
