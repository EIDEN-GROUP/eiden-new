"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";
import { HeroVideo } from "@/components/ui/hero-video";
import { LogoMarquee } from "@/components/ui/marquee";
import { useLanguage } from "@/components/providers/language-provider";
import { caseStudies, clientLogos } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const enter = "motion-safe:[animation:eiden-fade-in_0.9s_var(--ease-brand)_both]";
const stage = (seconds: number) =>
  ({ animationDelay: `${seconds}s` }) as CSSProperties;
const WORD_LEAD = 0.18;
const WORD_STEP = 0.075;
const DEPART_OVER = 0.55;

export function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

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

  const words = [
    ...t.hero.titleLead
      .split(" ")
      .filter(Boolean)
      .map((text) => ({ text, accent: false })),
    { text: t.hero.titleAccent, accent: true },
    ...t.hero.titleTail
      .split(" ")
      .filter(Boolean)
      .map((text) => ({ text, accent: false })),
  ];

  const featured = caseStudies.find((item) => item.slug === "lunja-village");

  const arrow =
    "size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1 motion-reduce:transition-none";

  return (
    <section ref={sectionRef} data-nav-tone="dark" className="hero-depart bg-ink relative isolate flex min-h-svh flex-col overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden motion-safe:[animation:eiden-film-settle_2.4s_var(--ease-brand)_both]">
        <HeroVideo src="/media/eiden-hero.mp4" poster="/media/eiden-hero-poster.jpg" className="object-[50%_62%]" />
      </div>

      {/* Heaviest under the type, lightest where the mark sits. */}
      <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(10,15,12,1)_16%,rgba(10,15,12,0.90)_44%,rgba(10,15,12,0.80)_100%)]" />
      <div className="relative flex flex-1 flex-col justify-end p-20">
        <h1 className="text-balance-tight text-canvas max-w-4xl text-[50px] leading-[1.02] font-medium sm:text-[100px]">
          {words.map((word, index) => {
            const rise = stage(WORD_LEAD + index * WORD_STEP);
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
                  <span className="inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]" style={rise}>
                    {word.text}
                  </span>
                </span>
              );
            }

            return (
              <span key={`${word.text}-${index}`} className={cn("relative inline-block", spacing)}>
                <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                  <span className="text-gold inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]" style={rise}>
                    {word.text}
                  </span>
                </span>
                <span aria-hidden className="bg-gold/60 absolute bottom-[0.05em] left-0 h-[3px] w-full origin-left motion-safe:[animation:eiden-underline_0.9s_var(--ease-brand)_1.15s_both]"/>
              </span>
            );
          })}
        </h1>

        <div className="grid gap-8 pt-3 sm:gap-10 sm:pt-5 md:grid-cols-2 md:gap-16">
          <div className={cn(enter, "min-w-0")} style={stage(0.58)}>
            <p className="text-canvas/70 max-w-3xl text-[14px] leading-relaxed sm:text-[18px]">
              {t.hero.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Link href="/nos-solutions" className="group bg-canvas text-ink hover:bg-gold inline-flex h-9 items-center gap-2 rounded-full px-6 text-[0.9375rem] transition-colors duration-300">
                {t.common.seeSolutions}
                <ArrowRight className={arrow} strokeWidth={1.8} aria-hidden />
              </Link>
              <Link href="/contact" className="group text-canvas/75 hover:text-canvas inline-flex h-9 items-center gap-2 text-[0.9375rem] transition-colors duration-300">
                {t.common.bookCall}
                <ArrowRight className={arrow} strokeWidth={1.8} aria-hidden />
              </Link>
            </div>
          </div>

          <div className="min-w-0 md:justify-self-end">
            <div className={cn(enter, "flex items-center gap-3 md:justify-end")} style={stage(0.68)} >
              <span className="flex items-center gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="fill-mint text-mint size-2.5" strokeWidth={0} />
                ))}
              </span>
              <p className="text-canvas/60 text-[0.875rem]">{t.hero.trust}</p>
            </div>

            {featured ? (
              <Link
                href="/projects/lunja-village"
                className={cn(
                  enter,
                  "group border-canvas bg-canvas hover:border-canvas/80 hover:bg-canvas/80 mt-5 flex max-w-md items-center gap-4 rounded-2xl border p-3 backdrop-blur-md transition-colors duration-500 ease-[var(--ease-brand)]",
                )}
                style={stage(0.76)}
              >
                <span className="relative size-30 h-40! shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={featured.image}
                    alt=""
                    fill
                    sizes="500px"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105 motion-reduce:transition-none"
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="eyebrow text-teal block font-bold">
                    {t.hero.featured.badge}
                  </span>
                  <span className="text-ink mt-2 block text-[0.875rem] leading-snug">
                    {t.hero.featured.text}
                  </span>
                  <span className="text-ink/50 mt-2 block text-[0.82rem]">
                    <span className="text-ink/80 font-medium">
                      {featured.metric}
                    </span>{" "}
                    {t.hero.featured.metricLabel}
                  </span>
                </span>

                <span className="border-canvas/20 text-teal group-hover:bg-canvas group-hover:text-teal flex size-9 shrink-0 items-center justify-center self-end rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
                  <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
                  <span className="sr-only">{t.common.seeAllCases}</span>
                </span>
              </Link>
            ) : null}
          </div>
        </div>

        <div className={cn( enter, "border-canvas/12 mt-8 flex flex-col gap-4 border-t pt-6 sm:mt-10 sm:flex-row sm:items-center sm:gap-10 sm:pt-7" ,)} style={stage(0.78)}>
          <p className="eyebrow text-canvas/35 shrink-0">{t.hero.clientsLabel}</p>
          <LogoMarquee
            logos={clientLogos}
            tone="light"
            speed={46}
            className="min-w-0 flex-1"
          />
        </div>
      </div>
    </section>
  );
}
