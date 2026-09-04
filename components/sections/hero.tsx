"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Star } from "lucide-react";
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
    let seen = -1;
    let docTop = 0;

    const measure = () => {
      height = section.offsetHeight;
      docTop = section.getBoundingClientRect().top + window.scrollY;
      seen = -1;
    };

    const paint = () => {
      const y = window.scrollY;
      if (y === seen) {
        raf = requestAnimationFrame(paint);
        return;
      }
      seen = y;

      const travelled = y - docTop;
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
    measure();

    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      resize.disconnect();
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
    <section
      ref={sectionRef}
      data-nav-tone="light"
      className="hero-depart relative isolate flex min-h-svh flex-col overflow-hidden lg:p-10"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden motion-safe:[animation:eiden-film-settle_2.4s_var(--ease-brand)_both]"
      >
        <Image
          src="/media/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
      </div>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[62%] bg-[linear-gradient(to_top,rgba(244,235,208,0.94)_0%,rgba(244,235,208,0.78)_22%,rgba(244,235,208,0.42)_52%,rgba(244,235,208,0)_100%)]"
      />
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-10 hidden w-[11rem] flex-col justify-center gap-[16vh] xl:flex 2xl:right-16 2xl:w-[13rem]"
      >
        <div
          className={cn(enter, "border-ink/15 border-l pl-5")}
          style={stage(0.95)}
        >
          {t.hero.rail.map((word) => (
            <p key={word} className="eyebrow text-ink/40 leading-[2]">
              {word}
            </p>
          ))}
        </div>

        <div className={cn(enter)} style={stage(1.05)}>
          <p className="eyebrow text-ink/40 leading-[2]">{t.hero.railClaim}</p>
          <span aria-hidden className="bg-gold/70 mt-4 block h-px w-9" />
        </div>
      </div> */}

      <div className="relative flex flex-1 flex-col justify-between px-5 pb-2 sm:px-10 lg:px-20">
        <div>
          <div
            className={cn(
              enter,
              "flex items-center gap-4 pt-[clamp(4.75rem,9vh,6rem)]",
            )}
            style={stage(0.08)}
          >
            <span aria-hidden className="bg-gold h-px w-8 sm:w-10" />
            <p className="eyebrow text-ink/55">{t.hero.eyebrow}</p>
          </div>

          <h1 className="text-balance-tight text-ink mt-[clamp(0.75rem,2vh,2.25rem)] mb-[clamp(1.125rem,3.2vh,2.5rem)] text-[clamp(2.35rem,min(4.05vw,9.5vh),5rem)] leading-[1.06] font-medium xl:max-w-[calc(100%-16rem)]">
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
                      className="text-gold inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]"
                      style={rise}
                    >
                      {word.text}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="bg-gold/50 absolute bottom-[0.05em] left-0 h-[3px] w-full origin-left motion-safe:[animation:eiden-underline_0.9s_var(--ease-brand)_1.15s_both]"
                  />
                </span>
              );
            })}
          </h1>
          <div className={cn(enter, "min-w-0")} style={stage(0.58)}>
            <p className="text-ink max-w-3xl text-[clamp(0.9375rem,0.55rem+0.85vw,1.125rem)] leading-relaxed">
              {t.hero.description}
            </p>
            <div className="mt-[clamp(1.25rem,3.4vh,2.5rem)] flex flex-wrap items-center gap-x-7 gap-y-3">
              <Link
                href="/contact"
                className="group glass-dark bg-ink text-canvas hover:bg-teal inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.9375rem] transition-colors duration-300"
              >
                {t.common.bookCall}
                <ArrowRight className={arrow} strokeWidth={1.8} aria-hidden />
              </Link>
              <Link
                href="/nos-solutions"
                className="group text-ink border-ink hover:border-ink inline-flex h-9 items-center gap-6 border-b text-[0.9375rem] transition-colors duration-300"
              >
                {t.common.seeSolutions}
                <ArrowRight className={arrow} strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-end gap-6 pt-3 pb-5 sm:pt-5 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <div
              className={cn(enter, "flex items-center gap-3 md:justify-start")}
              style={stage(0.68)}
            >
              <span className="flex items-center gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="fill-gold text-gold size-2.5"
                    strokeWidth={0}
                  />
                ))}
              </span>
              <p className="text-ink text-[0.875rem]">{t.hero.trust}</p>
            </div>
            <div
              className={cn(
                enter,
                "border-ink/12 mt-3 flex flex-col gap-4 border-t pt-[clamp(1rem,2.6vh,1.75rem)] sm:flex-row sm:items-center sm:gap-10",
              )}
              style={stage(0.78)}
            >
              <p className="eyebrow text-ink/60 shrink-0">{t.hero.clientsLabel}</p>
              <LogoMarquee
                logos={clientLogos}
                tone="dark"
                speed={46}
                className="min-w-0 flex-1"
              />
            </div>

            <div
              className={cn(
                enter,
                "text-ink/45 mt-[clamp(1rem,3vh,2.25rem)] hidden items-center gap-4 lg:flex",
              )}
              style={stage(0.88)}
            >
              <ArrowDown
                aria-hidden
                strokeWidth={1.4}
                className="size-8 shrink-0 motion-safe:[animation:eiden-cue_2.6s_var(--ease-brand)_infinite]"
              />
              <p className="eyebrow">{t.hero.scrollCue}</p>
            </div>
          </div>
          <div className="md:justify-self-end">
            {featured ? (
              <Link
                href="/projects/lunja-village"
                className={cn(
                  enter,
                  "group glass-light border-ink/10 bg-canvas hover:border-ink/25 mt-[clamp(0.5rem,2vh,1.25rem)] flex max-w-md items-center gap-4 rounded-2xl border p-3 backdrop-blur-md transition-colors duration-500 ease-[var(--ease-brand)]",
                )}
                style={stage(0.76)}
              >
                <span className="relative h-[clamp(5.5rem,20vh,10rem)]! w-[clamp(4.5rem,9vw,7.5rem)] shrink-0 overflow-hidden rounded-xl">
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
                    <span className="numeral text-ink/80 font-medium">
                      {featured.metric}
                    </span>{" "}
                    {t.hero.featured.metricLabel}
                  </span>
                </span>

                <span className="border-teal/30 text-teal group-hover:bg-teal group-hover:text-canvas flex size-9 shrink-0 items-center justify-center self-end rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
                  <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
                  <span className="sr-only">{t.common.seeAllCases}</span>
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
