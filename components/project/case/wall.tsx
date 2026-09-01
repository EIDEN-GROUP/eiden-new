"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal } from "@/components/ui/reveal";
import { useMediaQuery } from "@/lib/hooks";
import { CaseLightbox } from "./lightbox";
import type { GalleryImage } from "@/lib/data/projects/types";
import type { ToneSkin } from "./tone";
import { cn } from "@/lib/utils";

const DWELL = 4200;
const TRAVEL = 620;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const SETTLE = 160;

export function CaseWall({ wall, skin }: { wall: GalleryImage[]; skin: ToneSkin }) {
  const say = useLocalized();
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");

  const railRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  const [open, setOpen] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const held = useRef(false);
  const seen = useRef(true);
  const opened = useRef(false);
  const tween = useRef(0);

  const total = wall.length;
  const loops = total > 1;

  useEffect(() => {
    opened.current = open !== null;
  }, [open]);

  /** The distance from one picture to the next, measured rather than assumed. */
  const pitch = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return 0;
    const [first, second] = [rail.children[0], rail.children[1]] as (
      | HTMLElement
      | undefined
    )[];
    if (!first) return 0;
    if (!second) return first.offsetWidth;
    return second.offsetLeft - first.offsetLeft;
  }, []);

  /** Put the rail back inside the first copy of the set. Never mid-travel. */
  const normalise = useCallback(() => {
    const rail = railRef.current;
    if (!rail || !loops || tween.current) return;
    const copy = pitch() * total;
    if (copy && rail.scrollLeft >= copy) rail.scrollLeft -= copy;
  }, [loops, pitch, total]);

  /**
   * End the travel, however it ended.
   *
   * Snapping is stood down for the length of a travel, so the one thing that
   * must never be conditional is putting it back: a tween that is interrupted,
   * or that never gets a frame at all   a background tab throttles
   * `requestAnimationFrame` while leaving the timer that started it running
   * would otherwise leave the rail unsnappable for the rest of the visit.
   */
  const settle = useCallback(() => {
    if (tween.current) {
      cancelAnimationFrame(tween.current);
      tween.current = 0;
    }
    const rail = railRef.current;
    if (rail) rail.style.scrollSnapType = "";
  }, []);

  const step = useCallback(
    (by: number) => {
      const rail = railRef.current;
      const span = pitch();
      if (!rail || !span) return;

      settle();

      let from = rail.scrollLeft;

      /* Going back from the first picture: step forward by one copy of the
         set first, so there is something to the left to travel to. */
      if (loops && by < 0 && from < span * 0.5) {
        from += span * total;
        rail.scrollLeft = from;
      }

      const to = from + by * span;

      if (still) {
        rail.scrollLeft = to;
        normalise();
        return;
      }

      /* A mandatory snap container re-snaps on every write, and would drag the
         rail back to the picture it started from. `settle` puts it back. */
      rail.style.scrollSnapType = "none";
      const began = performance.now();

      const travel = (now: number) => {
        const t = Math.min((now - began) / TRAVEL, 1);
        rail.scrollLeft = from + (to - from) * ease(t);

        if (t < 1) {
          tween.current = requestAnimationFrame(travel);
          return;
        }

        settle();
        normalise();
      };

      tween.current = requestAnimationFrame(travel);
    },
    [loops, normalise, pitch, settle, still, total],
  );

  /* Where the rail is, written straight onto the two nodes that say so. */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let raf = 0;
    let idle = 0;
    let shown = -1;

    const read = () => {
      raf = 0;
      const span = pitch();
      if (!span) return;

      const at = Math.round(rail.scrollLeft / span) % total;
      if (at === shown) return;
      shown = at;

      if (countRef.current) {
        countRef.current.textContent = String(at + 1).padStart(2, "0");
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${(at + 1) / total})`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
      window.clearTimeout(idle);
      idle = window.setTimeout(normalise, SETTLE);
    };

    read();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [normalise, pitch, total]);

  /* Nothing runs while the section is off screen. */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        seen.current = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );

    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (still || !playing || !loops) return;

    const id = window.setInterval(() => {
      if (held.current || opened.current || !seen.current) return;
      if (document.visibilityState !== "visible") return;
      step(1);
    }, DWELL);

    return () => window.clearInterval(id);
  }, [loops, playing, still, step]);

  useEffect(() => settle, [settle]);

  if (!total) return null;

  /* The set twice over. The second copy is what the first one loops into, and
     nothing in it is announced or reachable a second time. */
  const run = loops ? [...wall, ...wall] : wall;

  const control =
    "flex size-10 items-center justify-center rounded-full border transition-colors duration-400 ease-[var(--ease-brand)] sm:size-11 motion-reduce:transition-none";

  return (
    <div
      className="relative"
      onPointerEnter={() => {
        held.current = true;
      }}
      onPointerLeave={() => {
        held.current = false;
      }}
      onFocusCapture={() => {
        held.current = true;
      }}
      onBlurCapture={() => {
        held.current = false;
      }}
    >
      {/* ── What it is, on the measure ──────────────────────────────── */}
      <Reveal direction="none" duration={0.5} amount={0.3}>
        <div className="container-eiden flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className={cn("editorial text-[1.15rem] sm:text-[1.35rem]", skin.body)}>
            {say({ fr: "Cliquez pour agrandir", en: "Click to open" })}
          </p>

          <p className={cn("eyebrow tabular-nums", skin.caption)}>
            {total} {say({ fr: "images", en: "images" })}
          </p>
        </div>
      </Reveal>

      {/* ── The rail, edge to edge ──────────────────────────────────── */}
      <div
        ref={railRef}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-2.5 overflow-x-auto overscroll-x-contain sm:mt-8 sm:gap-4"
      >
        {run.map(({ image, alt }, i) => {
          const index = i % total;
          const copy = i >= total;

          return (
            <button
              key={`${copy ? "b" : "a"}-${image}-${i}`}
              type="button"
              onClick={() => setOpen(index)}
              aria-hidden={copy || undefined}
              tabIndex={copy ? -1 : undefined}
              aria-label={say(alt)}
              className={cn(
                "group/tile focus-visible:outline-gold relative block shrink-0 cursor-zoom-in snap-start overflow-hidden rounded-xl ring-1 sm:rounded-2xl",
                "aspect-4/3 w-[86vw] sm:w-[56vw] lg:w-[40vw]",
                "focus-visible:outline-2 focus-visible:-outline-offset-2",
                skin.frame,
                skin.ring,
              )}
            >
              <Image
                src={image}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 40rem) 86vw, (max-width: 64rem) 56vw, 40vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover/tile:scale-[1.05] motion-reduce:transition-none"
              />

              {/* The number is always on, the way a price is in a shop window.
                  What it is of arrives with the pointer. */}
              <span
                aria-hidden
                className="from-ink/75 via-ink/25 pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-3 pt-12 text-left sm:p-4 sm:pt-14"
              >
                <span className="font-display text-canvas block text-[0.95rem] leading-none font-extrabold tracking-[-0.03em] tabular-nums sm:text-[1.1rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-canvas/75 mt-1 block truncate text-[0.68rem] opacity-0 transition-opacity duration-500 ease-[var(--ease-brand)] group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100 motion-reduce:transition-none sm:text-[0.75rem]">
                  {say(alt)}
                </span>
              </span>

              <span
                aria-hidden
                className="bg-canvas/90 text-ink absolute top-3 right-3 flex size-8 items-center justify-center rounded-full opacity-0 transition-opacity duration-400 ease-[var(--ease-brand)] group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100 motion-reduce:transition-none sm:top-4 sm:right-4"
              >
                <Maximize2 className="size-3.5" strokeWidth={2} />
              </span>
            </button>
          );
        })}
      </div>

      {/* ── The controls, back on the measure ───────────────────────── */}
      {loops ? (
        <div className="container-eiden mt-7 flex items-end gap-5 sm:mt-9 sm:gap-7">
          <p className="leading-none">
            <span
              ref={countRef}
              className={cn(
                "font-display block text-[clamp(2.25rem,6vw,3.5rem)] leading-[0.8] font-extrabold tracking-[-0.05em] tabular-nums",
                skin.title,
              )}
            >
              01
            </span>
            <span
              className={cn(
                "font-display mt-1.5 block pl-2 text-[0.85rem] font-bold tabular-nums",
                skin.caption,
              )}
            >
              / {String(total).padStart(2, "0")}
            </span>
          </p>

          {/* How far through the set the rail has come. */}
          <span
            aria-hidden
            className={cn("mb-4 hidden h-px flex-1 sm:block", skin.frame)}
          >
            <span
              ref={barRef}
              className="bg-gold block h-full w-full origin-left transition-transform duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
              style={{ transform: `scaleX(${1 / total})` }}
            />
          </span>

          <div className="flex items-center gap-2 pb-1.5">
            <button
              type="button"
              onClick={() => setPlaying((on) => !on)}
              aria-label={
                playing
                  ? say({ fr: "Mettre en pause", en: "Pause" })
                  : say({ fr: "Lancer le défilement", en: "Play" })
              }
              className={cn(control, skin.control)}
            >
              {playing ? (
                <Pause className="size-4" strokeWidth={1.8} aria-hidden />
              ) : (
                <Play className="size-4" strokeWidth={1.8} aria-hidden />
              )}
            </button>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={say({ fr: "Image précédente", en: "Previous image" })}
              className={cn(control, skin.control)}
            >
              <ChevronLeft className="size-5" strokeWidth={1.6} aria-hidden />
            </button>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label={say({ fr: "Image suivante", en: "Next image" })}
              className={cn(control, skin.control)}
            >
              <ChevronRight className="size-5" strokeWidth={1.6} aria-hidden />
            </button>
          </div>
        </div>
      ) : null}

      <CaseLightbox
        items={wall}
        index={open}
        onClose={() => setOpen(null)}
        onMove={setOpen}
      />
    </div>
  );
}
