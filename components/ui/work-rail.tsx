"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type RailItem = { src: string; client: string };

/**
 * One infinite row. The track holds the items twice and travels exactly half
 * its own width, so the seam always lands on an identical frame — no measuring,
 * and it stays correct at every breakpoint.
 */
function Row({
  items,
  reverse = false,
  seconds,
}: {
  items: readonly RailItem[];
  reverse?: boolean;
  /** One full lap. */
  seconds: number;
}) {
  const track = [...items, ...items];

  return (
    <ul
      className="flex w-max gap-4 will-change-transform motion-safe:[animation:eiden-marquee_var(--lap)_linear_infinite] motion-safe:group-hover:[animation-play-state:paused]"
      style={
        {
          "--lap": `${seconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        } as CSSProperties
      }
    >
      {track.map((item, index) => (
        <li
          key={`${item.src}-${index}`}
          aria-hidden={index >= items.length}
          className="group/card shrink-0"
        >
          <Link
            href="/clients"
            tabIndex={index >= items.length ? -1 : undefined}
            className="bg-cream relative block h-[9rem] w-[13rem] overflow-hidden rounded-2xl sm:h-[11rem] sm:w-[17rem]"
          >
            <Image
              src={item.src}
              alt={item.client}
              fill
              sizes="272px"
              className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover/card:scale-105 motion-reduce:transition-none"
            />

            {/* Name rides in from the bottom edge on hover */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 translate-y-full bg-[linear-gradient(to_top,rgba(10,15,12,0.85),transparent)] px-4 pt-8 pb-3 transition-transform duration-500 ease-[var(--ease-brand)] group-hover/card:translate-y-0 motion-reduce:transition-none"
            >
              <span className="font-label text-canvas text-[0.8rem] font-bold tracking-[0.18em] uppercase">
                {item.client}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Two rows of client work sliding past each other. Hovering anywhere on the
 * rail holds both rows, so a card can actually be read and clicked.
 */
export function WorkRail({
  items,
  className,
}: {
  items: readonly RailItem[];
  className?: string;
}) {
  const half = Math.ceil(items.length / 2);

  return (
    <div
      className={cn(
        "group flex flex-col gap-4",
        "[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]",
        className,
      )}
    >
      <Row items={items.slice(0, half)} seconds={54} />
      <Row items={items.slice(half)} seconds={64} reverse />
    </div>
  );
}
