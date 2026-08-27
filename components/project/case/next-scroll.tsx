"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import type { ProjectCase } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

const HELD = "(min-width: 64rem)";

export function CaseNextScroll({
  next,
  order,
}: {
  next: ProjectCase;
  order: number;
}) {
  const say = useLocalized();
  const router = useRouter();

  const frameRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const href = `/projects/${next.slug}`;
  const eyebrow = say({ fr: "Projet suivant", en: "Next project" });

  useEffect(() => {
    router.prefetch(href);
  }, [router, href]);

  useEffect(() => {
    const frame = frameRef.current;
    const panel = panelRef.current;
    if (!frame || !panel) return;

    const held = window.matchMedia(HELD);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let shown = -1;
    let sent = false;
    let armed = false;

    const paint = () => {
      raf = 0;
      if (!held.matches || still.matches) return;

      const span = frame.offsetHeight - window.innerHeight;
      const travelled = -frame.getBoundingClientRect().top;
      const progress =
        span > 0 ? Math.min(Math.max(travelled / span, 0), 1) : 0;

      panel.style.setProperty("--p", progress.toFixed(4));

      const percent = Math.round(progress * 100);
      if (percent !== shown) {
        shown = percent;
        if (countRef.current) countRef.current.textContent = String(percent);
      }

      if (progress < 0.9) armed = true;

      if (
        armed &&
        !sent &&
        progress >= 0.999 &&
        document.visibilityState === "visible"
      ) {
        sent = true;
        router.push(href, { transitionTypes: ["case-next"] });
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    held.addEventListener("change", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      held.removeEventListener("change", onScroll);
    };
  }, [router, href]);

  return (
    <section
      ref={frameRef}
      data-nav-tone="dark"
      style={{ zIndex: order + 1 } as CSSProperties}
      className="bg-ink relative lg:h-[220svh]"
    >
      {/* ── Tapped ─────────────────────────────────────────────────── */}
      <Link
        href={href}
        transitionTypes={["case-next"]}
        className="group focus-visible:outline-gold relative block overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-4 lg:hidden"
      >
        <div className="relative h-[70svh] min-h-[26rem]">
          <Image
            src={next.hero.image}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover"
          />
          <span aria-hidden className="bg-ink/40 absolute inset-0" />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
          />

          <div className="container-eiden absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 pb-20">
            <div className="min-w-0">
              <p className="text-canvas/70 text-[0.9375rem] leading-none">
                {eyebrow}
              </p>

              <h2 className="font-display text-canvas mt-2.5 text-balance text-[clamp(1.75rem,8vw,2.75rem)] leading-[0.98] font-extrabold tracking-[-0.05em]">
                {next.client}
              </h2>
            </div>

            <span className="bg-canvas text-ink font-label flex shrink-0 items-center gap-3 rounded-full py-2 pr-2 pl-6 text-[0.82rem] font-bold tracking-[0.12em] uppercase">
              {say({ fr: "Voir", en: "View" })}
              <span className="bg-ink text-canvas flex size-10 items-center justify-center rounded-full">
                <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
              </span>
            </span>
          </div>
        </div>
      </Link>

      {/* ── Thrown by the scroll ───────────────────────────────────── */}
      <div
        ref={panelRef}
        style={{ "--p": "0" } as CSSProperties}
        className="group sticky top-0 hidden h-svh flex-col overflow-hidden rounded-t-[2.75rem] shadow-[0_-30px_80px_-32px_rgba(0,0,0,0.6)] lg:flex"
      >
        <Link
          href={href}
          transitionTypes={["case-next"]}
          aria-label={`${eyebrow} : ${next.client}`}
          className="focus-visible:outline-gold absolute inset-0 z-20 focus-visible:outline-2 focus-visible:-outline-offset-4"
        >
          <span className="sr-only">{next.client}</span>
        </Link>

        {/* The next project's own picture, pulled towards the reader as the
            counter fills so the room is already moving before the page does. */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={next.hero.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{
              transform: "scale(calc(1.06 + var(--p, 0) * 0.06))",
              transformOrigin: "50% 50%",
            }}
          />
          <span className="bg-ink/45 absolute inset-0" />
          <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        <div className="container-eiden relative z-10 mt-auto pb-12">
          <div className="flex items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="eyebrow text-gold flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-current opacity-50" />
                {eyebrow}
              </p>

              <h2
                className={cn(
                  "font-display text-canvas mt-4 text-balance text-[clamp(2rem,6vw,4.75rem)] leading-[0.95] font-extrabold tracking-[-0.05em]",
                  "transition-transform duration-700 ease-[var(--ease-brand)] group-hover:translate-x-1 motion-reduce:transition-none",
                )}
              >
                {next.client}
              </h2>

              <p className="text-canvas/50 mt-3 text-[0.9375rem]">
                {say(next.category)}
              </p>
            </div>

            <div className="flex shrink-0 items-end gap-4">
              <span className="border-canvas/25 text-canvas group-hover:bg-canvas group-hover:text-ink flex size-12 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
                <ArrowUpRight className="size-5" strokeWidth={1.8} aria-hidden />
              </span>

              <p
                aria-hidden
                className="font-display text-canvas text-[clamp(2rem,6vw,4.5rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums"
              >
                <span ref={countRef}>0</span>%
              </p>
            </div>
          </div>
        </div>

        {/* How far there is left to go, drawn across the foot of the frame. */}
        <div aria-hidden className="bg-canvas/15 relative z-10 h-1 w-full shrink-0">
          <span
            className="bg-gold block h-full w-full origin-left"
            style={{ transform: "scaleX(var(--p, 0))" }}
          />
        </div>
      </div>
    </section>
  );
}
