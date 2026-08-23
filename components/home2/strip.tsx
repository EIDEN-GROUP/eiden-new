"use client";

import Image from "next/image";
import { projectGallery } from "@/lib/data/site";
import { useLanguage } from "@/components/providers/language-provider";

const chips = projectGallery.slice(0, 4);

/**
 * A running band, with covers set into the line of type.
 *
 * The track is the phrase twice over: the copy is hidden from assistive tech,
 * so the band reads once and travels forever.
 */
export function Home2Strip() {
  const { t } = useLanguage();

  const run = (
    <span className="flex shrink-0 items-center gap-6 pr-6">
      {chips.map((entry, index) => (
        <span key={entry.src} className="flex items-center gap-6">
          <span className="font-display text-forest text-[clamp(1.75rem,4.6vw,3.5rem)] leading-none font-extrabold tracking-[-0.045em] whitespace-nowrap">
            {index % 2 ? t.proof.railTitle : t.hero.trust}
          </span>
          <span className="relative size-[clamp(2.5rem,5vw,3.75rem)] shrink-0 overflow-hidden rounded-xl">
            <Image
              src={entry.src}
              alt=""
              fill
              sizes="60px"
              className="object-cover"
            />
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <section className="bg-cream px-4 pb-20 sm:px-6 sm:pb-28">
      <div className="bg-gold group mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] py-8">
        <div
          className="flex w-max motion-safe:group-hover:[animation-play-state:paused]"
          style={{ animation: "eiden-marquee 34s linear infinite" }}
        >
          {run}
          <span aria-hidden className="contents">
            {run}
          </span>
        </div>
      </div>
    </section>
  );
}
