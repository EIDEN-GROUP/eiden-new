"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export type CarouselSlide = {
  slug: string;
  client: string;
  title: string;
  image: string;
  imageAlt: string;
  metric: string;
};

type ProjectCarouselProps = {
  slides: CarouselSlide[];
  className?: string;
  /** Milliseconds each slide holds before advancing. */
  interval?: number;
};

/**
 * Autoplaying client-work carousel that sits in the corner of the hero.
 *
 * Slides are stacked in a single grid cell so the card keeps the height of its
 * tallest slide and never reflows mid-rotation. Autoplay stops while the card
 * is hovered or focused, while the tab is hidden, and for visitors who prefer
 * reduced motion — with a manual control so it can always be resumed.
 */
export function ProjectCarousel({
  slides,
  className,
  interval = 5200,
}: ProjectCarouselProps) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [wanted, setWanted] = useState(true);

  const count = slides.length;
  const playing = wanted && !held && !reduced;

  const go = useCallback(
    (step: number) => setIndex((current) => (current + step + count) % count),
    [count],
  );

  useEffect(() => {
    if (!playing || count < 2) return;

    const id = window.setInterval(() => go(1), interval);
    return () => window.clearInterval(id);
  }, [playing, count, interval, go]);

  // A hidden tab would otherwise burn through every slide in the background.
  useEffect(() => {
    const onVisibility = () => setHeld(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const current = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t.hero.featured.badge}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
      className={cn("w-full max-w-[26rem]", className)}
    >
      {/* Counter rail — index, transport controls, autoplay toggle */}
      <div className="text-canvas/70 mb-3 flex items-center justify-end gap-2">
        <p className="font-label text-[0.8125rem] tracking-[0.18em] tabular-nums">
          <span className="text-canvas">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-1 opacity-40">/</span>
          {String(count).padStart(2, "0")}
        </p>

        <div className="ml-2 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.common.previous}
            className="border-canvas/25 hover:border-canvas/70 hover:text-canvas flex size-8 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300"
          >
            <ChevronLeft className="size-4" strokeWidth={1.8} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.common.next}
            className="border-canvas/25 hover:border-canvas/70 hover:text-canvas flex size-8 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300"
          >
            <ChevronRight className="size-4" strokeWidth={1.8} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setWanted((on) => !on)}
            aria-label={wanted ? t.common.pause : t.common.play}
            aria-pressed={!wanted}
            className="border-canvas/25 hover:border-canvas/70 hover:text-canvas flex size-8 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300"
          >
            {wanted ? (
              <Pause
                className="size-3.5 fill-current"
                strokeWidth={0}
                aria-hidden
              />
            ) : (
              <Play className="size-3.5 fill-current" strokeWidth={0} aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="border-canvas/15 bg-forest/45 relative overflow-hidden rounded-[1.5rem] border p-2.5 shadow-[0_30px_80px_-32px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        <div className="grid">
          {slides.map((slide, position) => (
            <article
              key={slide.slug}
              aria-hidden={position !== index}
              inert={position !== index ? true : undefined}
              className={cn(
                "col-start-1 row-start-1 flex items-center gap-3.5",
                "transition-[opacity,transform] ease-[var(--ease-brand)] motion-reduce:transition-none",
                // The outgoing slide clears first, so the two never ghost.
                position === index
                  ? "translate-y-0 opacity-100 delay-200 duration-600"
                  : "pointer-events-none translate-y-3 opacity-0 delay-0 duration-200",
              )}
            >
              <div className="relative size-[5.25rem] shrink-0 overflow-hidden rounded-[1.125rem]">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="84px"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2.5 pr-1">
                <p className="text-canvas line-clamp-2 text-[0.9375rem] leading-snug font-medium">
                  {slide.title}
                </p>

                <div className="flex items-center gap-3">
                  <Link
                    href="/clients"
                    className="group bg-canvas text-forest hover:bg-gold inline-flex h-9 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-medium transition-colors duration-300"
                  >
                    {t.common.seeCase}
                    <ArrowRight
                      className="size-3.5 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </Link>
                  <p className="font-display text-gold text-lg leading-none font-extrabold tracking-[-0.04em]">
                    {slide.metric}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Autoplay progress — restarted by the key on every slide change */}
        <div
          aria-hidden
          className="bg-canvas/15 mt-3 h-px w-full overflow-hidden rounded-full"
        >
          <span
            key={`${index}-${playing}`}
            className={cn(
              "bg-gold block h-full w-full origin-left",
              playing
                ? "motion-safe:[animation:eiden-carousel-progress_linear_forwards]"
                : "scale-x-0",
            )}
            style={playing ? { animationDuration: `${interval}ms` } : undefined}
          />
        </div>
      </div>

      {/* Screen readers get the change announced without the visual churn. */}
      <p aria-live="polite" className="sr-only">
        {current.client} — {index + 1} / {count}
      </p>
    </section>
  );
}
