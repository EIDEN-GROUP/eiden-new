"use client";

import Image from "next/image";
import { useMemo, useState, type CSSProperties } from "react";
import { Maximize2 } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal } from "@/components/ui/reveal";
import { CaseLightbox } from "./lightbox";
import type { GalleryImage } from "@/lib/data/projects/types";
import type { ToneSkin } from "./tone";
import { cn } from "@/lib/utils";

/** How long a column takes to travel its own length, and which way it goes. */
const LANES = [
  { seconds: 38, reverse: false },
  { seconds: 30, reverse: true },
  { seconds: 44, reverse: false },
  { seconds: 34, reverse: true },
];

/**
 * The wall, drifting   the volume behind the work above it.
 *
 * The writing above is the argument, made a few pictures at a time. This is
 * everything else that came out of the same work, and volume is read at a
 * glance, so it runs edge to edge as columns that never stop moving.
 *
 * Every picture opens, though. The drift is for scanning; once something in it
 * catches a reader they can click it and look at it whole, and step through the
 * rest from there. The columns stop while the pointer is over the wall, because
 * asking someone to click a moving target is the one thing that would make this
 * worse than a static grid.
 *
 * It is a block of the section it belongs to, not a section of its own   same
 * ground, no edge, no second curtain.
 *
 * Each column carries its images twice and travels exactly its own length, so
 * the loop closes with no seam. Different speeds and alternating directions are
 * what stop four columns of the same pictures reading as one block sliding.
 */
export function CaseWall({
  wall,
  skin,
}: {
  wall: GalleryImage[];
  skin: ToneSkin;
}) {
  const say = useLocalized();
  const [open, setOpen] = useState<number | null>(null);

  /* Dealt round-robin so consecutive pictures land in different columns and the
     wall never shows two of the same shoot side by side. Each tile keeps the
     index it had in the set, which is what the lightbox steps through. */
  const columns = useMemo(
    () =>
      LANES.map((lane, index) => ({
        ...lane,
        items: wall
          .map((item, at) => ({ item, at }))
          .filter((_, i) => i % LANES.length === index),
      })),
    [wall],
  );

  if (!wall.length) return null;

  return (
    <div className="pb-20 sm:pb-24 lg:pb-28">
      <div className="container-eiden flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <Reveal direction="none" duration={0.5} amount={0.3}>
          <p className={cn("eyebrow", skin.caption)}>
            {say({ fr: "Le reste du set", en: "The rest of the set" })}
          </p>
        </Reveal>

        <p className={cn("text-[0.8125rem]", skin.caption)}>
          {say({
            fr: "Cliquez sur une image pour l'agrandir",
            en: "Click an image to open it",
          })}
        </p>
      </div>

      <Reveal delay={0.06} amount={0.15} className="mt-6 sm:mt-8">
        <div
          className={cn(
            "group/wall relative h-[28rem] overflow-hidden sm:h-[34rem] lg:h-[42rem]",
            "[mask-image:linear-gradient(to_bottom,transparent,black_8%,black_88%,transparent)]",
          )}
        >
          <div className="grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 lg:px-4">
            {columns.map((column, index) => (
              <div
                key={index}
                className={cn(
                  "min-w-0",
                  index === 2 && "hidden sm:block",
                  index === 3 && "hidden lg:block",
                )}
              >
                <div
                  className="drift-y group-hover/wall:[animation-play-state:paused]"
                  style={
                    {
                      "--drift-duration": `${column.seconds}s`,
                      "--drift-direction": column.reverse ? "reverse" : "normal",
                    } as CSSProperties
                  }
                >
                  {[...column.items, ...column.items].map(({ item, at }, i) => (
                    <div key={`${item.image}-${i}`} className="pb-3 lg:pb-4">
                      <button
                        type="button"
                        onClick={() => setOpen(at)}
                        aria-label={say(item.alt)}
                        className={cn(
                          "group/tile focus-visible:outline-gold relative block w-full cursor-zoom-in overflow-hidden rounded-2xl ring-1",
                          "focus-visible:outline-2 focus-visible:outline-offset-2",
                          skin.frame,
                          skin.ring,
                          i % 2 === 0 ? "aspect-4/5" : "aspect-4/3",
                        )}
                      >
                        <Image
                          src={item.image}
                          alt=""
                          aria-hidden
                          fill
                          sizes="(max-width: 40rem) 48vw, (max-width: 64rem) 32vw, 24vw"
                          className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover/tile:scale-[1.05] motion-reduce:transition-none"
                        />
                        <span
                          aria-hidden
                          className="bg-ink/45 text-canvas absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-400 ease-[var(--ease-brand)] group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100 motion-reduce:transition-none"
                        >
                          <Maximize2 className="size-5" strokeWidth={1.6} />
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <CaseLightbox
        items={wall}
        index={open}
        onClose={() => setOpen(null)}
        onMove={setOpen}
      />
    </div>
  );
}
