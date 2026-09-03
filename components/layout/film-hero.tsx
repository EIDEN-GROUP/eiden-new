"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export const heroEnter =
  "motion-safe:[animation:eiden-fade-in_0.9s_var(--ease-brand)_both]";
export const heroStage = (seconds: number) =>
  ({ animationDelay: `${seconds}s` }) as CSSProperties;
export const HERO_WORD_LEAD = 0.18;
export const HERO_WORD_STEP = 0.075;

const DEPART_OVER = 0.55;

/**
 * The still stepping back as the page leaves it.
 *
 * `--depart` runs 0 → 1 across the first `DEPART_OVER` of the hero's own
 * height, and `.hero-depart` turns it into a scale and a growing corner
 * radius, so the frame recedes like a card being lifted rather than sliding
 * off. Exported because a case study opens on the same gesture: two heroes
 * that look alike but drift apart in their timing would be worse than one
 * hero used twice.
 */
export function useHeroDepart<T extends HTMLElement>() {
  const sectionRef = useRef<T>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let painted = Number.NaN;
    let height = section.offsetHeight;

    const measure = () => {
      height = section.offsetHeight;
    };

    const paint = () => {
      const travelled = -section.getBoundingClientRect().top;
      const share = height ? travelled / (height * DEPART_OVER) : 0;
      const value = Math.round(Math.min(Math.max(share, 0), 1) * 500) / 500;

      if (value !== painted) {
        painted = value;
        section.style.setProperty("--depart", `${value}`);
      }
      raf = requestAnimationFrame(paint);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(paint);
          return;
        }
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        painted = 1;
        section.style.setProperty("--depart", "1");
      },
      { threshold: 0 },
    );

    observer.observe(section);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return sectionRef;
}

export function FilmHero({
  eyebrow,
  titleLead,
  titleAccent,
  titleTail,
  lead,
  image = "/media/eiden-hero-poster.jpg",
  imageClassName = "object-cover object-center",
  className,
  children,
}: {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  titleTail: string;
  lead: string;
  image?: string;
  /** How the still is framed and treated. A page carrying its own backdrop
      passes its own here rather than being re-cropped to this one. */
  imageClassName?: string;
  /** How tall the still stands. A case study takes the whole screen. */
  className?: string;
  children?: React.ReactNode;
}) {
  const sectionRef = useHeroDepart<HTMLElement>();

  const words = [
    ...titleLead
      .split(" ")
      .filter(Boolean)
      .map((text) => ({ text, accent: false })),
    { text: titleAccent, accent: true },
    ...titleTail
      .split(" ")
      .filter(Boolean)
      .map((text) => ({ text, accent: false })),
  ];

  return (
    <section
      ref={sectionRef}
      data-nav-tone="light"
      className={cn(
        "hero-depart relative isolate flex min-h-[68svh] flex-col overflow-hidden bg-beige sm:min-h-[74svh]",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden motion-safe:[animation:eiden-film-settle_2.4s_var(--ease-brand)_both]"
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className={imageClassName}
        />
      </div>

      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(244,235,208,1)_16%,rgba(244,235,208,0.94)_44%,rgba(244,235,208,0.86)_100%)]"
      />

      <div className="container-eiden relative flex flex-1 flex-col justify-end pt-28 pb-10 sm:pt-36 sm:pb-14">
        <p
          className={cn(heroEnter, "eyebrow text-teal flex items-center gap-3")}
          style={heroStage(0.06)}
        >
          <span aria-hidden className="h-px w-8 bg-current opacity-50" />
          {eyebrow}
        </p>

        <h1 className="text-balance-tight text-ink mt-6 max-w-full text-[clamp(2.25rem,6.4vw,4.5rem)] leading-[1.02] font-medium">
          {words.map((word, index) => {
            const rise = heroStage(HERO_WORD_LEAD + index * HERO_WORD_STEP);
            const spacing = index < words.length - 1 ? "mr-[0.25em]" : "";

            if (!word.accent) {
              return (
                <span
                  key={`${word.text}-${index}`}
                  className={cn(
                    "inline-block overflow-hidden pb-[0.14em] align-bottom",
                    spacing,
                  )}
                >
                  <span
                    className="inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]"
                    style={rise}
                  >
                    {word.text}
                  </span>
                </span>
              );
            }

            return (
              <span
                key={`${word.text}-${index}`}
                className={cn("relative inline-block", spacing)}
              >
                <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                  <span
                    className="text-[#8a6412] inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]"
                    style={rise}
                  >
                    {word.text}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="bg-[#8a6412]/50 absolute bottom-[0.05em] left-0 h-[3px] w-full origin-left motion-safe:[animation:eiden-underline_0.9s_var(--ease-brand)_1.15s_both]"
                />
              </span>
            );
          })}
        </h1>

        <p
          className={cn(
            heroEnter,
            "text-ink/70 mt-6 max-w-full text-[0.9375rem] leading-relaxed sm:text-[1.0625rem]",
          )}
          style={heroStage(0.58)}
        >
          {lead}
        </p>

        {children ? (
          <div className={cn(heroEnter, "mt-7")} style={heroStage(0.68)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
