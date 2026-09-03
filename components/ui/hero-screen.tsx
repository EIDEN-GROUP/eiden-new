"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type HeroProject = {
  slug: string;
  client: string;
  image: string;
  href: string;
};

/** Milliseconds each project holds the screen before the next fades up. */
const HOLD = 4600;

/**
 * The client work shown on one screen, standing behind the statement.
 *
 * The device arrives turned away in three axes and straightens into a flat
 * rectangle, which is the whole entrance   nothing else in the hero moves for
 * it. From then on it is a slow dissolve through the delivered projects, so
 * the proof is running behind the promise rather than listed beside it.
 *
 * The chip in the corner names whatever is on screen and links to it, so the
 * work stays reachable even though the picture itself sits behind the type.
 */
export function HeroScreen({
  projects,
  label,
}: {
  projects: HeroProject[];
  /** Eyebrow above the client name in the corner chip. */
  label: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (projects.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // A hidden tab would otherwise burn through the whole set in the background.
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((current) => (current + 1) % projects.length);
    }, HOLD);

    return () => window.clearInterval(id);
  }, [projects.length]);

  const current = projects[index];
  if (!current) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center overflow-hidden pt-24 [perspective:1600px] sm:pt-28"
      >
        <div className="relative w-[min(94vw,70rem)] motion-safe:[animation:eiden-screen-unfold_1.7s_var(--ease-brand)_0.35s_both]">
          <div className="border-ink/12 bg-beige relative aspect-16/10 overflow-hidden rounded-xl border shadow-[0_60px_140px_-40px_rgba(18,38,32,0.35)]">
            {projects.map((project, position) => (
              <Image
                key={project.slug}
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 768px) 94vw, 70rem"
                className={cn(
                  "object-cover object-top transition-opacity duration-[1400ms] ease-[var(--ease-brand)] motion-reduce:transition-none",
                  position === index ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Names what is on the screen, and links to it. */}
      <div className="container-eiden pointer-events-none absolute inset-x-0 top-28 z-10 sm:top-36">
        <Link
          href={current.href}
          className="group border-ink/15 bg-canvas/70 hover:border-ink/35 pointer-events-auto inline-flex items-center gap-3 rounded-full border py-2 pr-3 pl-4 backdrop-blur-md transition-colors duration-500 ease-[var(--ease-brand)]"
        >
          <span className="eyebrow text-ink/45">{label}</span>
          <span className="text-ink text-[0.875rem] leading-none">
            {current.client}
          </span>
          <span className="bg-ink/10 text-ink group-hover:bg-ink group-hover:text-canvas flex size-6 items-center justify-center rounded-full transition-colors duration-500 ease-[var(--ease-brand)]">
            <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
          </span>
        </Link>
      </div>
    </>
  );
}
