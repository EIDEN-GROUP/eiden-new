"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ScrollWords } from "@/components/home2/motion";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

/** Panel tint rotated across the grid, so no two neighbours match. */
const tones = [
  "bg-ink text-canvas",
  "bg-beige text-forest",
  "bg-teal text-canvas",
  "bg-canvas text-forest ring-1 ring-forest/8",
];

/**
 * The four expertises, as a bento of unequal cards.
 *
 * The first card takes both columns on wide screens: the grid then reads as a
 * composition rather than a row of equals, which is what keeps a services list
 * from looking like a price table.
 */
export function Home2Expertise() {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-cream px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal direction="none" duration={0.5}>
            <p className="font-label text-teal text-[0.8rem] font-bold tracking-[0.32em] uppercase">
              {t.services.eyebrow}
            </p>
          </Reveal>

          <ScrollWords
            as="h2"
            text={t.services.title}
            className="font-display mx-auto mt-6 max-w-3xl text-[clamp(2rem,5.4vw,4rem)] leading-[1] font-extrabold tracking-[-0.045em]"
          />
        </div>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, index) => (
            <article
              key={item.slug}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[1.6rem] p-7",
                "shadow-[0_28px_64px_-38px_rgba(18,38,32,0.5)]",
                "transition-transform duration-500 ease-[var(--ease-brand)] hover:-translate-y-1.5 motion-reduce:transition-none",
                tones[index % tones.length],
                index === 0 && "lg:col-span-2",
              )}
            >
              <div className="flex items-start justify-between gap-6">
                <p className="font-label text-[0.75rem] font-bold tracking-[0.28em] uppercase opacity-55">
                  {item.kicker}
                </p>
                <ArrowUpRight
                  className="size-5 shrink-0 opacity-40 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:rotate-45"
                  strokeWidth={1.8}
                  aria-hidden
                />
              </div>

              <h3 className="font-display mt-6 text-[clamp(1.5rem,3vw,2.25rem)] leading-[1] font-extrabold tracking-[-0.04em]">
                {item.title}
              </h3>

              <p className="mt-4 text-[0.9375rem] leading-relaxed opacity-70">
                {item.text}
              </p>

              <ul className="mt-auto flex flex-wrap gap-1.5 pt-7">
                {item.deliverables.map((entry) => (
                  <li
                    key={entry}
                    className="rounded-full border border-current/20 px-3 py-1 text-[0.82rem] opacity-75"
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* The grid's odd slot, given over to the next step. */}
          <Link
            href="/nos-solutions"
            className="group bg-gold text-forest flex flex-col justify-between rounded-[1.6rem] p-7 shadow-[0_28px_64px_-38px_rgba(18,38,32,0.5)] transition-transform duration-500 ease-[var(--ease-brand)] hover:-translate-y-1.5 motion-reduce:transition-none"
          >
            <span className="font-label text-[0.75rem] font-bold tracking-[0.28em] uppercase opacity-60">
              {t.services.deliverablesLabel}
            </span>
            <span className="font-display mt-10 flex items-end justify-between gap-4 text-[clamp(1.5rem,3vw,2rem)] leading-[1] font-extrabold tracking-[-0.04em]">
              {t.common.seeSolutions}
              <ArrowUpRight
                className="size-7 shrink-0 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:rotate-45"
                strokeWidth={1.8}
                aria-hidden
              />
            </span>
          </Link>
        </RevealGroup>
      </div>
    </section>
  );
}
