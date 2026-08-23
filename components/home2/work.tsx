"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { ScrollWords } from "@/components/home2/motion";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { caseStudies } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/**
 * The work, on a rail that runs under a fixed left column.
 *
 * The rail is a native scroll container with snap points rather than a
 * transform carousel: the arrows only nudge `scrollLeft`, so a trackpad, a
 * touch drag and the keyboard all end up doing the same thing for free.
 */
export function Home2Work() {
  const { t } = useLanguage();
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const cases = t.proof.cases;

  const nudge = useCallback((direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const step = rail.clientWidth * 0.55;
    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  const onScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const span = rail.scrollWidth - rail.clientWidth;
    setProgress(span > 0 ? rail.scrollLeft / span : 0);
  }, []);

  return (
    <section className="bg-cream px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-14">
          {/* Left column — the claim and the controls */}
          <div>
            <Reveal direction="none" duration={0.5}>
              <p className="font-label text-teal text-[0.7rem] font-semibold tracking-[0.32em] uppercase">
                {t.proof.eyebrow}
              </p>
            </Reveal>

            <ScrollWords
              as="h2"
              text={t.proof.title}
              className="font-display mt-5 text-[clamp(2rem,4.8vw,3.5rem)] leading-[1] font-extrabold tracking-[-0.045em]"
            />

            <Reveal delay={0.1}>
              <p className="text-forest/65 mt-6 max-w-sm text-[0.9375rem] leading-relaxed">
                {t.proof.text}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => nudge(-1)}
                  aria-label={t.common.previous}
                  className="border-forest/15 text-forest/60 hover:border-forest/45 hover:text-ink flex size-11 items-center justify-center rounded-full border transition-colors duration-300"
                >
                  <ArrowLeft className="size-4" strokeWidth={1.8} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => nudge(1)}
                  aria-label={t.common.next}
                  className="bg-ink text-canvas hover:bg-teal flex size-11 items-center justify-center rounded-full transition-colors duration-300"
                >
                  <ArrowRight className="size-4" strokeWidth={1.8} aria-hidden />
                </button>

                <ButtonLink
                  href="/clients"
                  variant="ghost"
                  size="md"
                  className="text-forest/70 hover:text-ink ml-2"
                >
                  {t.common.seeAllCases}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Right column — the rail itself */}
          <div>
            <div
              ref={railRef}
              onScroll={onScroll}
              className={cn(
                "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              )}
            >
              {cases.map((entry) => {
                const media =
                  caseStudies.find((item) => item.slug === entry.slug) ??
                  caseStudies[0];
                return (
                  <article
                    key={entry.slug}
                    className="group w-[16rem] shrink-0 snap-start sm:w-[19rem]"
                  >
                    <div className="ring-forest/5 relative aspect-4/5 overflow-hidden rounded-[1.4rem] shadow-[0_28px_64px_-38px_rgba(10,15,12,0.5)] ring-1">
                      <Image
                        src={media.image}
                        alt={media.imageAlt}
                        fill
                        sizes="(max-width: 640px) 70vw, 304px"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105 motion-reduce:transition-none"
                      />
                      <span className="bg-canvas/90 text-forest absolute top-4 left-4 rounded-full px-3 py-1 text-[0.7rem] font-semibold backdrop-blur-sm">
                        {media.metric}
                      </span>
                    </div>

                    <h3 className="font-display text-ink mt-5 text-[1.0625rem] leading-snug font-bold tracking-[-0.02em]">
                      {media.client}
                    </h3>
                    <p className="text-forest/55 mt-1.5 line-clamp-2 text-sm leading-relaxed">
                      {entry.title}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Read-out of how far along the rail is */}
            <div className="bg-forest/10 relative h-px w-full overflow-hidden">
              <span
                aria-hidden
                style={{ transform: `scaleX(${Math.max(0.12, progress)})` }}
                className="bg-ink absolute inset-0 origin-left"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
