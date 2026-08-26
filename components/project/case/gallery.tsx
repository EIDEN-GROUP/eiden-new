"use client";

import Image from "next/image";
import { useMemo, type CSSProperties } from "react";
import { useLocalized } from "@/components/project/shared";
import { Reveal } from "@/components/ui/reveal";
import type { GalleryImage } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

/** How long a column takes to travel its own length, and which way it goes. */
const LANES = [
  { seconds: 38, reverse: false },
  { seconds: 30, reverse: true },
  { seconds: 44, reverse: false },
  { seconds: 34, reverse: true },
];

/**
 * The wall, drifting. Conditional.
 *
 * Selected work is the argument, made one picture at a time. This is the
 * volume behind it, and volume is read at a glance — so it runs edge to edge
 * as columns that never stop moving, the way the clients page opens. Nothing
 * here is labelled and nothing is clickable: it is texture, and asking a
 * reader to study it would undo the point.
 *
 * Each column carries its images twice and travels exactly its own length, so
 * the loop closes on itself with no seam. The columns run at different speeds
 * and alternate direction, which is what stops four columns of the same
 * pictures reading as one block sliding.
 *
 * The top and bottom are masked rather than cropped, so the wall has no edge
 * to catch on — it fades out of the section instead of stopping in it.
 */
export function CaseGallery({ gallery }: { gallery: GalleryImage[] }) {
  const say = useLocalized();

  /* Dealt round-robin so consecutive pictures land in different columns and
     the wall never shows two of the same shoot side by side. */
  const columns = useMemo(
    () =>
      LANES.map((lane, index) => ({
        ...lane,
        items: gallery.filter((_, i) => i % LANES.length === index),
      })),
    [gallery],
  );

  if (!gallery.length) return null;

  return (
    <section className="bg-ink overflow-hidden" data-nav-tone="dark">
      <div className="container-eiden pt-16 sm:pt-20">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-canvas/35">
            {say({ fr: "Galerie", en: "Gallery" })}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.06} className="mt-8 sm:mt-10">
        <div
          aria-hidden
          className={cn(
            "relative h-[26rem] overflow-hidden pb-16 sm:h-[32rem] sm:pb-20 lg:h-[40rem]",
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
                  className="drift-y"
                  style={
                    {
                      "--drift-duration": `${column.seconds}s`,
                      "--drift-direction": column.reverse ? "reverse" : "normal",
                    } as CSSProperties
                  }
                >
                  {[...column.items, ...column.items].map((item, i) => (
                    <div key={`${item.image}-${i}`} className="pb-3 lg:pb-4">
                      <div
                        className={cn(
                          "ring-canvas/10 bg-canvas/5 relative overflow-hidden rounded-2xl ring-1",
                          i % 2 === 0 ? "aspect-4/5" : "aspect-4/3",
                        )}
                      >
                        <Image
                          src={item.image}
                          alt={say(item.alt)}
                          fill
                          sizes="(max-width: 40rem) 48vw, (max-width: 64rem) 32vw, 24vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
