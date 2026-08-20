"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type MarqueeLogo = { name: string; src: string };

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
  const track = [...logos, ...logos];

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
      <ul
        className="flex w-max items-center gap-12 motion-safe:group-hover:[animation-play-state:paused] sm:gap-16 lg:gap-20"
        style={{
          animation: `eiden-marquee ${speed}s linear infinite`,
        }}
      >
        {track.map((logo, index) => (
          <li
            key={`${logo.name}-${index}`}
            className="shrink-0"
            aria-hidden={index >= logos.length}
          >
            <Image
              src={logo.src}
              alt={index < logos.length ? logo.name : ""}
              width={220}
              height={80}
              sizes="200px"
              className={cn(
                "h-9 w-auto object-contain opacity-60 transition-opacity duration-500 hover:opacity-100 sm:h-11",
                tone === "light"
                  ? "brightness-0 invert"
                  : "opacity-45 grayscale hover:grayscale-0",
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
      <div
        className="flex w-max items-center"
        style={{ animation: `eiden-marquee ${speed}s linear infinite` }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="eyebrow flex items-center gap-6 px-6 text-current opacity-70"
          >
            {item}
            <span aria-hidden className="size-1 rounded-full bg-current" />
          </span>
        ))}
      </div>
    </div>
  );
}
