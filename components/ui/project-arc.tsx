"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type ArcProject = {
  slug: string;
  client: string;
  title: string;
  image: string;
  metric: string;
  href: string;
};

const LEAN = 32;
/** Pixels the middle of the curve is pushed away by. */
const DEPTH = 190;
/** Pixels the middle drops, so the row carries a slight smile. */
const DIP = 14;
/** Degrees the whole ring tilts under the pointer   vertical, horizontal. */
const TILT_X = 5;
const TILT_Y = 8;
/** Share of the remaining distance the tilt closes each frame. */
const EASING = 0.075;

export function ProjectArc({
  projects,
  /** Seconds before the middle card arrives; the ends follow it out. */
  delay = 0.6,
  className,
}: {
  projects: ArcProject[];
  delay?: number;
  className?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const field: HTMLElement = stage.closest("section") ?? stage;

    let raf = 0;
    let wantX = 0;
    let wantY = 0;
    let haveX = 0;
    let haveY = 0;

    const tick = () => {
      haveX += (wantX - haveX) * EASING;
      haveY += (wantY - haveY) * EASING;

      const settled =
        Math.abs(wantX - haveX) < 0.005 && Math.abs(wantY - haveY) < 0.005;
      if (settled) {
        haveX = wantX;
        haveY = wantY;
      }

      ring.style.setProperty("--arc-tilt-x", `${haveX.toFixed(3)}deg`);
      ring.style.setProperty("--arc-tilt-y", `${haveY.toFixed(3)}deg`);

      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const box = field.getBoundingClientRect();
      wantX = (0.5 - (event.clientY - box.top) / box.height) * -TILT_X;
      wantY = ((event.clientX - box.left) / box.width - 0.5) * TILT_Y;
      wake();
    };

    const onLeave = () => {
      wantX = 0;
      wantY = 0;
      wake();
    };

    field.addEventListener("pointermove", onMove);
    field.addEventListener("pointerleave", onLeave);

    return () => {
      field.removeEventListener("pointermove", onMove);
      field.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const last = projects.length - 1;
  const half = last / 2;

  return (
    <div ref={stageRef} className={cn("arc-stage w-full", className)}>
      <ul
        ref={ringRef}
        className={cn(
          "arc-ring no-scrollbar flex items-center gap-[var(--arc-gap)]",
          "snap-x snap-mandatory overflow-x-auto px-5 sm:px-8",
          "md:justify-center md:overflow-visible md:px-0",
        )}
      >
        {projects.map((project, index) => {
          const seat = half === 0 ? 0 : (index - half) / half;
          const centred = 1 - seat * seat;
          const squeeze = -(1 - Math.cos((seat * LEAN * Math.PI) / 180)) / 2;

          return (
            <li
              key={project.slug}
              className="arc-slot shrink-0 snap-center md:[margin-inline:calc(var(--arc-card-w)*var(--arc-squeeze))]"
              style={
                {
                  "--arc-rot": `${-seat * LEAN}deg`,
                  "--arc-z": `${-centred * DEPTH}px`,
                  "--arc-lift": `${centred * DIP}px`,
                  "--arc-squeeze": squeeze.toFixed(4),
                } as CSSProperties
              }
            >
              <div
                className="motion-safe:[animation:eiden-arc-in_1s_var(--ease-brand)_both]"
                style={{
                  animationDelay: `${delay + Math.abs(seat) * 0.13}s`,
                }}
              >
                <Link
                  href={project.href}
                  aria-label={`${project.client}   ${project.title}`}
                  className="group/card relative block h-[var(--arc-card-h)] w-[var(--arc-card-w)] overflow-hidden rounded-lg"
                >
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 45vw, 24vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover/card:scale-[1.06] motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden
                    className="from-ink/90 via-ink/25 absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-500 ease-[var(--ease-brand)] md:opacity-0 md:group-hover/card:opacity-100 md:group-focus-visible/card:opacity-100"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 transition-[opacity,transform] duration-500 ease-[var(--ease-brand)] md:translate-y-2 md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100 md:group-focus-visible/card:translate-y-0 md:group-focus-visible/card:opacity-100">
                    <div className="min-w-0">
                      <p className="eyebrow text-canvas/65 truncate">
                        {project.client}
                      </p>
                      <p className="font-display text-gold mt-1.5 text-base leading-none font-extrabold tracking-[-0.04em]">
                        {project.metric}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="bg-canvas text-forest flex size-8 shrink-0 items-center justify-center rounded-full"
                    >
                      <ArrowUpRight className="size-4" strokeWidth={1.8} />
                    </span>
                  </div>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
