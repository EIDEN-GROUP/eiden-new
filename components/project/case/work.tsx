"use client";

import Image from "next/image";
import { useLocalized } from "@/components/project/shared";
import { Reveal } from "@/components/ui/reveal";
import { SwipeDeck } from "@/components/ui/swipe-deck";
import type { Shot } from "@/lib/data/projects/types";

/**
 * 06 — Selected work.
 *
 * Three to six pictures, two across, at a size that lets a screenshot be read
 * without letting any one of them take the page. The cap is the whole point:
 * this is the section that turns an archive into a portfolio, and the
 * discipline lives in the record rather than in a `slice()` here — a project
 * with nine good pictures should be edited, not truncated at render.
 *
 * Each picture carries one label naming the kind of work. Below `lg` the grid
 * becomes the same swipe track the rest of the site uses, so a phone gets one
 * picture at a readable size instead of six thumbnails.
 */
export function CaseWork({ work }: { work: Shot[] }) {
  const say = useLocalized();

  return (
    <section className="py-20 sm:py-28">
      <div className="container-eiden">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-ink/35">
            {say({ fr: "Travaux choisis", en: "Selected work" })}
          </p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-6xl">
          <SwipeDeck className="grid gap-4 lg:grid-cols-2">
            {work.map((shot) => (
              <figure key={shot.image} className="flex flex-col">
                <div className="bg-ink/5 relative aspect-4/3 w-full overflow-hidden rounded-[1.6rem]">
                  <Image
                    src={shot.image}
                    alt={say(shot.alt)}
                    fill
                    sizes="(max-width: 64rem) 80vw, 36rem"
                    className="object-cover"
                  />
                </div>
                <figcaption className="eyebrow text-ink/35 mt-4">
                  {say(shot.label)}
                </figcaption>
              </figure>
            ))}
          </SwipeDeck>
        </div>
      </div>
    </section>
  );
}
