"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type MarqueeLogo = { name: string; src: string };

/**
 * How many times the roster is laid down in one pass of the band.
 *
 * The track is that pass laid down twice, so pulling it back by half its own
 * width lands the second copy exactly where the first began. That only stays
 * seamless while one pass is wider than the box the band is shown in   with a
 * single pass the roster runs out before the loop comes round and the tail
 * drags a hole in from the right edge, which is what a reader reads as a
 * missing logo. Three clears the page measure and the hero's narrower rail
 * with room left over.
 */
const PASSES = 3;

export function LogoMarquee({
  logos,
  className,
  tone = "light",
  speed = 42,
}: {
  logos: readonly MarqueeLogo[];
  className?: string;
  tone?: "light" | "dark";
  speed?: number;
}) {
  const pass = Array.from({ length: PASSES }, () => logos).flat();
  const track = [...pass, ...pass];

  return (
    <div className={cn( "group relative w-full overflow-hidden", "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]", className, )}>
      {/* The spacing rides on the items rather than a `gap` on the track: a
          container gap is laid between items and not after the last one, so
          every copy would start half a step early and the loop would snap.
          A pass is `PASSES` rosters long, so it is given that many times the
          seconds to cross and the logos still travel at the speed asked for. */}
      <ul className="flex w-max items-center motion-safe:group-hover:[animation-play-state:paused]" style={{ animation: `eiden-marquee ${speed * PASSES}s linear infinite`, }} >
        {track.map((logo, index) => (
          <li key={`${logo.name}-${index}`} className="shrink-0 pr-12 sm:pr-16 lg:pr-20" aria-hidden={index >= logos.length}>
            <Image
              src={logo.src}
              alt={index < logos.length ? logo.name : ""}
              width={220}
              height={80}
              sizes="200px"
              className={cn(
                "h-9 w-auto object-contain transition-opacity duration-500 hover:opacity-100 sm:h-11",
                /* The roster is drawn in black. Over ink it has to be flipped
                   to the canvas colour or the band reads as empty; on a light
                   page it is already right and is left alone. */
                tone === "light" && "brightness-0 invert",
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Text ribbon used as a section divider. */
export function TextMarquee({
  items,
  className,
  speed = 38,
}: {
  items: readonly string[];
  className?: string;
  speed?: number;
}) {
  const track = [...items, ...items];

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="flex w-max items-center" style={{ animation: `eiden-marquee ${speed}s linear infinite` }}>
        {track.map((item, index) => (
          <span key={`${item}-${index}`} aria-hidden={index >= items.length} className="eyebrow flex items-center gap-6 px-6 text-current opacity-70">
            {item}
            <span aria-hidden className="size-1 rounded-full bg-current" />
          </span>
        ))}
      </div>
    </div>
  );
}
