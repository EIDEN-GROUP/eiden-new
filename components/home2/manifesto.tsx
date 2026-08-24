"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { projectGallery } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/** Six covers cascading down and to the right, the text card cut into them. */
const cascade = projectGallery.slice(2, 8);

/**
 * The idea, told as a stack being dealt across the page.
 *
 * Wide screens get the diagonal: each card steps right and down from the last,
 * with the written card sitting proud of the run. Under `lg` the diagonal has
 * nowhere to go, so the same pieces stack — card first, covers behind it on a
 * rail — rather than being squeezed into an unreadable fan.
 */
export function Home2Manifesto() {
  const { t } = useLanguage();

  const card = (
    <article className="bg-canvas ring-forest/5 flex h-full flex-col rounded-[1.6rem] p-6 shadow-[0_30px_70px_-34px_rgba(10,15,12,0.5)] ring-1 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <p className="font-display text-ink max-w-[14ch] text-[1.35rem] leading-[1.08] font-extrabold tracking-[-0.035em]">
          {t.idea.title}
        </p>
        <span className="bg-ink text-canvas flex size-9 shrink-0 items-center justify-center rounded-full">
          <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
        </span>
      </div>

      <p className="font-label text-teal mt-4 text-[0.75rem] font-bold tracking-[0.28em] uppercase">
        {t.idea.eyebrow}
      </p>

      <p className="text-forest/65 mt-auto pt-8 text-[0.9375rem] leading-relaxed">
        {t.idea.lead}
      </p>
    </article>
  );

  return (
    <section className="bg-canvas px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* ── Wide: the dealt diagonal ─────────────────────────────── */}
        <div className="relative hidden h-[38rem] lg:block">
          {cascade.map((entry, index) => (
            <div
              key={entry.src}
              className="absolute"
              style={
                {
                  left: `${index * 15.5}%`,
                  top: `${index * 8.5}%`,
                  zIndex: index,
                } as CSSProperties
              }
            >
              <Reveal delay={0.06 * index} duration={0.9}>
                <div
                  style={{ rotate: `${(index % 2 ? 1 : -1) * 2.2}deg` }}
                  className={cn(
                    "ring-forest/5 relative aspect-4/5 w-[17rem] overflow-hidden rounded-[1.4rem] ring-1",
                    "shadow-[0_30px_70px_-34px_rgba(10,15,12,0.55)]",
                    "transition-transform duration-700 ease-[var(--ease-brand)] hover:-translate-y-3 motion-reduce:transition-none",
                  )}
                >
                  <Image
                    src={entry.src}
                    alt={entry.client}
                    fill
                    sizes="272px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          ))}

          {/* Written card, cut into the run at the second position */}
          <div className="absolute top-[6%] left-[13%] z-20 w-[21rem]">
            <Reveal delay={0.18} duration={0.9}>
              {card}
            </Reveal>
          </div>
        </div>

        {/* ── Narrow: the same pieces, stacked ─────────────────────── */}
        <div className="lg:hidden">
          <Reveal duration={0.9}>{card}</Reveal>

          <RevealGroup className="mt-6 flex [scrollbar-width:none] gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {cascade.map((entry) => (
              <div
                key={entry.src}
                className="ring-forest/5 relative aspect-4/5 w-[11rem] shrink-0 overflow-hidden rounded-[1.2rem] ring-1"
              >
                <Image
                  src={entry.src}
                  alt={entry.client}
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
