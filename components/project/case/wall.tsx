"use client";

import Image from "next/image";
import { useMemo, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal } from "@/components/ui/reveal";
import { CaseLightbox } from "./lightbox";
import type { GalleryImage } from "@/lib/data/projects/types";
import type { ToneSkin } from "./tone";
import { cn } from "@/lib/utils";

/**
 * Most pictures a page will hold.
 *
 * Pages are then evened out against it rather than filled to it: a set of eight
 * reads as two pages of four, not as a full page followed by a stub.
 */
const MOST = 6;

/**
 * Where each picture sits, by how many the page is holding.
 *
 * The mosaic is drawn, not flowed. A page is a fixed set of cells   two columns
 * on a phone, three from `lg`   and every plan fills its grid exactly, so a
 * page can never open with a hole in the middle of it. Tall cells and wide ones
 * alternate down the page, which is the whole difference between a gallery and
 * a contact sheet.
 *
 * Written as literal classes because Tailwind reads the source, not the
 * runtime, and as start/end pairs rather than spans because a span is shorthand
 * and would out-rank the start it is sitting next to.
 */
const PLANS: Record<number, string[]> = {
  1: ["col-start-1 col-end-3 row-start-1 row-end-2 lg:col-end-4"],
  2: [
    "col-start-1 col-end-2 row-start-1 row-end-2 lg:col-end-3",
    "col-start-2 col-end-3 row-start-1 row-end-2 lg:col-start-3 lg:col-end-4",
  ],
  3: [
    "col-start-1 col-end-2 row-start-1 row-end-3 lg:col-end-3 lg:row-end-2",
    "col-start-2 col-end-3 row-start-1 row-end-2 lg:col-start-3 lg:col-end-4 lg:row-end-3",
    "col-start-2 col-end-3 row-start-2 row-end-3 lg:col-start-1 lg:col-end-3",
  ],
  4: [
    "col-start-1 col-end-2 row-start-1 row-end-3",
    "col-start-2 col-end-3 row-start-1 row-end-2 lg:col-end-4",
    "col-start-2 col-end-3 row-start-2 row-end-3",
    "col-start-1 col-end-3 row-start-3 row-end-4 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  ],
  5: [
    "col-start-1 col-end-2 row-start-1 row-end-3",
    "col-start-2 col-end-3 row-start-1 row-end-2 lg:col-end-4",
    "col-start-2 col-end-3 row-start-2 row-end-3 lg:row-end-4",
    "col-start-1 col-end-2 row-start-3 row-end-4 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
    "col-start-2 col-end-3 row-start-3 row-end-4 lg:col-start-1 lg:col-end-2",
  ],
  6: [
    "col-start-1 col-end-2 row-start-1 row-end-3",
    "col-start-2 col-end-3 row-start-1 row-end-2 lg:col-end-4",
    "col-start-2 col-end-3 row-start-2 row-end-3",
    "col-start-1 col-end-2 row-start-3 row-end-4 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
    "col-start-2 col-end-3 row-start-3 row-end-5 lg:col-start-1 lg:col-end-2 lg:row-end-4",
    "col-start-1 col-end-2 row-start-4 row-end-5 lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  ],
};

/**
 * The gallery   the volume behind the work above it.
 *
 * The writing above is the argument, made a few pictures at a time. This is
 * everything else that came out of the same work, and it is turned rather than
 * scrolled: a mosaic of six, a page at a time, so the whole set is reachable
 * without the section growing another screen for every third picture.
 *
 * Every picture opens. The grid is for scanning; once something in it catches a
 * reader they click it and look at it whole, and step through the rest from
 * there   including across pages, which is why the page follows the picture the
 * lightbox is on rather than the other way round.
 *
 * It is a block of the section it belongs to, not a section of its own   same
 * ground, same measure, no second curtain.
 */
export function CaseWall({ wall, skin }: { wall: GalleryImage[]; skin: ToneSkin }) {
  const say = useLocalized();
  const [open, setOpen] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const pages = Math.max(1, Math.ceil(wall.length / MOST));
  const per = Math.max(1, Math.ceil(wall.length / pages));

  /* Each tile keeps the index it has in the whole set, which is what the
     lightbox steps through   the page is only how it is being shown. */
  const shown = useMemo(() => {
    const from = page * per;
    return wall.slice(from, from + per).map((item, i) => ({ item, at: from + i }));
  }, [wall, page, per]);

  if (!wall.length) return null;

  const plan = PLANS[shown.length] ?? PLANS[MOST];
  const turn = (by: number) => setPage((at) => (at + by + pages) % pages);

  const arrow =
    "flex size-10 items-center justify-center rounded-full border transition-colors duration-400 ease-[var(--ease-brand)] sm:size-11 motion-reduce:transition-none";

  return (
    <div className="container-eiden relative pb-20 sm:pb-24 lg:pb-28">
      {/* The set's own word, ghosted behind the top of the grid. */}
      <span
        aria-hidden
        className={cn(
          "font-display pointer-events-none absolute -top-4 right-4 text-[16vw] leading-[0.8] font-extrabold tracking-[-0.06em] opacity-[0.055] select-none lg:right-12 lg:text-[11vw]",
          skin.title,
        )}
      >
        {say({ fr: "galerie", en: "gallery" })}
      </span>

      <Reveal direction="none" duration={0.5} amount={0.3}>
        <div className="relative flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p
            className={cn("editorial text-[1.15rem] sm:text-[1.35rem]", skin.body)}
          >
            {say({ fr: "Cliquez pour agrandir", en: "Click to open" })}
          </p>

          <p className={cn("eyebrow tabular-nums", skin.caption)}>
            {wall.length} {say({ fr: "images", en: "images" })}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.06} amount={0.12}>
        <div
          className={cn(
            "mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3.5 lg:grid-cols-3 lg:gap-4",
            "[grid-auto-rows:var(--wall-row)] [--wall-row:clamp(4.5rem,30vw,20rem)]",
            "lg:[--wall-row:clamp(6rem,19vw,19rem)]",
          )}
        >
          {shown.map(({ item, at }, i) => (
            <button
              /* Keyed by page as well as picture: turning the page swaps the
                 nodes out, which is what restarts the arrival. */
              key={`${page}-${item.image}`}
              type="button"
              onClick={() => setOpen(at)}
              aria-label={say(item.alt)}
              style={{ "--tile-delay": `${i * 70}ms` } as CSSProperties}
              className={cn(
                "group/tile focus-visible:outline-gold relative block h-full w-full cursor-zoom-in overflow-hidden rounded-xl ring-1 sm:rounded-2xl",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                "motion-safe:[animation:eiden-tile-in_0.7s_var(--ease-brand)_var(--tile-delay)_both]",
                skin.frame,
                skin.ring,
                plan[i],
              )}
            >
              <Image
                src={item.image}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 64rem) 50vw, 34vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover/tile:scale-[1.06] motion-reduce:transition-none"
              />

              {/* The number is always on, the way a price is in a shop window.
                  What it is of arrives with the pointer. */}
              <span
                aria-hidden
                className="from-ink/75 via-ink/25 pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-2.5 pt-10 text-left sm:p-3.5 sm:pt-12"
              >
                <span className="font-display text-canvas block text-[0.95rem] leading-none font-extrabold tracking-[-0.03em] tabular-nums sm:text-[1.1rem]">
                  {String(at + 1).padStart(2, "0")}
                </span>
                <span className="text-canvas/75 mt-1 block truncate text-[0.68rem] opacity-0 transition-opacity duration-500 ease-[var(--ease-brand)] group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100 motion-reduce:transition-none sm:text-[0.75rem]">
                  {say(item.alt)}
                </span>
              </span>

              <span
                aria-hidden
                className="bg-canvas/90 text-ink absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-full opacity-0 transition-opacity duration-400 ease-[var(--ease-brand)] group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100 motion-reduce:transition-none sm:top-3.5 sm:right-3.5"
              >
                <Maximize2 className="size-3.5" strokeWidth={2} />
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      {pages > 1 ? (
        <Reveal delay={0.1} amount={0.4}>
          <div className="mt-7 flex items-end gap-5 sm:mt-9 sm:gap-7">
            <p className="leading-none">
              <span
                className={cn(
                  "font-display block text-[clamp(2.25rem,6vw,3.5rem)] leading-[0.8] font-extrabold tracking-[-0.05em] tabular-nums",
                  skin.title,
                )}
              >
                {page + 1}
              </span>
              <span
                className={cn(
                  "font-display mt-1.5 block pl-2 text-[0.85rem] font-bold tabular-nums",
                  skin.caption,
                )}
              >
                / {pages}
              </span>
            </p>

            <div className="flex items-center gap-2 pb-1.5">
              <button
                type="button"
                onClick={() => turn(-1)}
                aria-label={say({
                  fr: "Page précédente",
                  en: "Previous page",
                })}
                className={cn(arrow, skin.control)}
              >
                <ChevronLeft className="size-5" strokeWidth={1.6} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => turn(1)}
                aria-label={say({ fr: "Page suivante", en: "Next page" })}
                className={cn(arrow, skin.control)}
              >
                <ChevronRight className="size-5" strokeWidth={1.6} aria-hidden />
              </button>
            </div>
          </div>
        </Reveal>
      ) : null}

      <CaseLightbox
        items={wall}
        index={open}
        onClose={() => setOpen(null)}
        /* The page follows the picture, so closing the lightbox leaves the
           reader looking at the page the picture came from. */
        onMove={(next) => {
          setOpen(next);
          setPage(Math.floor(next / per));
        }}
      />
    </div>
  );
}
