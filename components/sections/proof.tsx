"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { WorkRail } from "@/components/ui/work-rail";
import { useLanguage } from "@/components/providers/language-provider";
import { caseStudies, projectGallery } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const GAP = 16;
const RUBBER = 0.35;

export function Proof() {
  const { t } = useLanguage();
  const cases = t.proof.cases;
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => {
        const next = current + direction;
        if (next < 0) return cases.length - 1;
        if (next > cases.length - 1) return 0;
        return next;
      });
    },
    [cases.length],
  );

  const current = Math.min(index, cases.length - 1);
  const active = cases[current];
  const activeMedia =
    caseStudies.find((entry) => entry.slug === active.slug) ?? caseStudies[0];
  const railRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ x: number; y: number; locked: boolean } | null>(null);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    gesture.current = { x: event.clientX, y: event.clientY, locked: false };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (!start.locked) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        gesture.current = null;
        return;
      }
      start.locked = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    const atEdge =
      (current === 0 && dx > 0) || (current === cases.length - 1 && dx < 0);
    setOffset(atEdge ? dx * RUBBER : dx);
  };

  const endGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    gesture.current = null;
    setOffset(0);
    setDragging(false);
    if (!start?.locked) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const dx = event.clientX - start.x;
    const width = railRef.current?.offsetWidth ?? 1;
    const threshold = Math.min(96, width * 0.16);
    if (dx <= -threshold) go(1);
    else if (dx >= threshold) go(-1);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  return (
    <section
      id="preuves"
      className="bg-canvas relative overflow-hidden py-24 sm:py-32"
    >
      <div className="container-eiden">
        {/* ── Numbers ─────────────────────────────────────── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow text-teal flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-current opacity-50" />
                {t.proof.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-forest mt-6 text-[clamp(2rem,4.8vw,3.5rem)]">
                {t.proof.title}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-forest/60 mt-6 text-base leading-relaxed sm:text-[1.0625rem]">
                {t.proof.text}
              </p>
            </Reveal>
          </div>
        </div>
        {/* ── Work rail — the portfolio, running past a way into it ───── */}
        <div className="container-eiden mt-24 sm:mt-32">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            {/* The rail breaks its column on the left so it runs to the edge */}
            <Reveal amount={0.12} duration={0.9} className="min-w-0">
              <WorkRail items={projectGallery} />
            </Reveal>

            <div>
              <Reveal delay={0.06}>
                <h3 className="font-display text-forest text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.06] font-extrabold tracking-[-0.035em]">
                  {t.proof.railTitle}
                </h3>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="text-forest/60 mt-5 max-w-md text-[0.9375rem] leading-relaxed sm:text-base">
                  {t.proof.railText}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <ButtonLink
                  href="/clients"
                  variant="dark"
                  size="lg"
                  className="mt-8"
                >
                  <span className="inline-flex items-center gap-2.5">
                    {t.common.seeAllCases}
                    <ArrowUpRight
                      className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover/btn:rotate-45"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>

        <RevealGroup className="bg-forest/10 mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl lg:grid-cols-4">
          {t.proof.stats.map((stat) => (
            <div key={stat.label} className="bg-canvas p-6 sm:p-8">
              <p className="font-display text-forest text-[clamp(1.75rem,4vw,2.75rem)] leading-none font-extrabold tracking-[-0.05em]">
                {stat.value}
              </p>
              <p className="text-forest/55 mt-3 text-sm leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </RevealGroup>
        <p className="text-forest/40 mt-4 text-xs">{t.proof.statsNote}</p>
      </div>

      {/* ── Case carousel ─────────────────────────────────── */}
      <div className="container-eiden mt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-14">
          {/* Narrative — keyed so each change replays the CSS fade */}
          <div className="order-2 lg:order-1">
            <div
              key={active.slug}
              className="motion-safe:[animation:eiden-fade-in_0.5s_var(--ease-brand)_both]"
            >
              <p className="eyebrow text-gold-dk">{activeMedia.client}</p>
              <h3 className="font-display text-forest mt-5 text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.035em]">
                {active.title}
              </h3>
              <p className="text-forest/60 mt-6 max-w-lg text-[0.9375rem] leading-relaxed sm:text-base">
                {active.text}
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border-forest/15 text-forest/65 rounded-full border px-3.5 py-1.5 text-xs"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Controls */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t.common.previous}
                  className="border-forest/20 text-forest hover:border-forest hover:bg-forest hover:text-canvas flex size-12 items-center justify-center rounded-full border transition-colors duration-300"
                >
                  <ArrowLeft className="size-4" strokeWidth={1.7} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t.common.next}
                  className="border-forest/20 text-forest hover:border-forest hover:bg-forest hover:text-canvas flex size-12 items-center justify-center rounded-full border transition-colors duration-300"
                >
                  <ArrowRight className="size-4" strokeWidth={1.7} aria-hidden />
                </button>
              </div>

              <ul className="flex items-center gap-2">
                {cases.map((entry, entryIndex) => (
                  <li key={entry.slug}>
                    <button
                      type="button"
                      onClick={() => setIndex(entryIndex)}
                      aria-label={`${entryIndex + 1} / ${cases.length}`}
                      aria-current={entryIndex === current ? "true" : undefined}
                      className={cn(
                        "h-[3px] rounded-full transition-[width,background-color] duration-500 ease-[var(--ease-brand)]",
                        entryIndex === current
                          ? "bg-forest w-10"
                          : "bg-forest/20 hover:bg-forest/40 w-6",
                      )}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visual rail */}
          <div className="order-1 min-w-0 lg:order-2">
            <div
              ref={railRef}
              role="group"
              aria-roledescription="carousel"
              aria-label={t.proof.eyebrow}
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endGesture}
              onPointerCancel={endGesture}
              className={cn(
                "overflow-hidden rounded-2xl select-none",
                "focus-visible:outline-teal focus-visible:outline-2 focus-visible:-outline-offset-2",
                "touch-pan-y",
                dragging ? "cursor-grabbing" : "cursor-grab",
              )}
            >
              <ul
                className={cn(
                  "flex",
                  dragging
                    ? "transition-none"
                    : "transition-transform duration-700 ease-[var(--ease-brand)]",
                )}
                style={
                  {
                    "--slide": current,
                    "--drag": `${offset}px`,
                    gap: `${GAP}px`,
                    transform: `translate3d(calc(-1 * var(--slide) * (100% + ${GAP}px) + var(--drag)), 0, 0)`,
                  } as CSSProperties
                }
              >
                {cases.map((entry, entryIndex) => {
                  const media =
                    caseStudies.find((item) => item.slug === entry.slug) ??
                    caseStudies[0];
                  return (
                    <li
                      key={entry.slug}
                      className="w-full shrink-0"
                      aria-hidden={entryIndex !== current}
                    >
                      <div className="bg-cream relative aspect-4/3 overflow-hidden rounded-2xl sm:aspect-16/11">
                        <Image
                          src={media.image}
                          alt={media.imageAlt}
                          fill
                          draggable={false}
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="pointer-events-none object-cover"
                        />
                        <span className="bg-canvas/90 font-label text-forest absolute top-4 left-4 rounded-full px-3.5 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] uppercase backdrop-blur-sm">
                          {media.client}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
