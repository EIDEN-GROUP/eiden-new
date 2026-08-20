"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { LogoMarquee } from "@/components/ui/marquee";
import {
  ProjectCarousel,
  type CarouselSlide,
} from "@/components/ui/project-carousel";
import { socialAccounts } from "@/components/ui/social-links";
import { useLanguage } from "@/components/providers/language-provider";
import { caseStudies, clientLogos, heroTexture } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/**
 * Entrance animation, staged by delay.
 *
 * It runs from CSS behind `motion-safe:`, so the final state is what renders
 * for visitors who prefer reduced motion; content can never be stranded
 * mid-animation.
 */
const enter = "motion-safe:[animation:eiden-fade-in_0.9s_var(--ease-brand)_both]";
const stage = (seconds: number) =>
  ({ animationDelay: `${seconds}s` }) as CSSProperties;

/** Small monogram stack standing in for the client roster. */
const monograms = [
  { initials: "BP", className: "bg-teal text-canvas" },
  { initials: "DM", className: "bg-gold text-forest" },
  { initials: "LV", className: "bg-forest text-canvas" },
  { initials: "MB", className: "bg-teal-lt text-canvas" },
  { initials: "EK", className: "bg-beige text-forest" },
];

export function Hero() {
  const { t } = useLanguage();

  /* Three client projects for the corner carousel, joined by slug so the
     localised title always travels with the right image and metric. */
  const slides: CarouselSlide[] = t.proof.cases
    .slice(0, 3)
    .map((entry) => {
      const record = caseStudies.find((item) => item.slug === entry.slug);
      if (!record) return null;
      return {
        slug: entry.slug,
        client: record.client,
        title: entry.title,
        image: record.image,
        imageAlt: record.imageAlt,
        metric: record.metric,
      };
    })
    .filter((slide): slide is CarouselSlide => slide !== null);

  return (
    <section className="bg-forest relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* ── Backdrop — full-bleed brand silk, slowly drifting ───────── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-[-6%] motion-safe:[animation:eiden-drift_34s_ease-in-out_infinite]">
          <Image
            src={heroTexture}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Legibility scrims: dark on the reading edge, dark at both ends */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,15,12,0.92)_0%,rgba(10,15,12,0.72)_34%,rgba(10,15,12,0.22)_62%,rgba(10,15,12,0.45)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(to_bottom,rgba(10,15,12,0.7),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-[30rem] bg-[linear-gradient(to_top,rgba(10,15,12,0.9),transparent)]" />
      </div>

      <div className="container-eiden relative flex flex-1 flex-col pt-24 pb-8 sm:pt-28">
        {/* ── Statement ─────────────────────────────────────────────── */}
        <div className="max-w-4xl">
          <h1
            className={cn(
              enter,
              "text-balance-tight text-canvas text-[clamp(2.5rem,6.4vw,5.5rem)] leading-[0.98] font-medium",
            )}
            style={stage(0.16)}
          >
            {t.hero.titleLead}{" "}
            <span className="text-gold relative inline-block">
              {t.hero.titleAccent}
              <span
                aria-hidden
                className="bg-gold/60 absolute -bottom-1 left-0 h-[3px] w-full origin-left motion-safe:[animation:eiden-underline_0.9s_var(--ease-brand)_1s_both]"
              />
            </span>{" "}
            {t.hero.titleTail}
          </h1>

          <p
            className={cn(
              enter,
              "text-canvas/70 mt-7 max-w-2xl text-base leading-relaxed sm:text-[1.0625rem]",
            )}
            style={stage(0.26)}
          >
            {t.hero.description}
          </p>

          <div
            className={cn(enter, "mt-9 flex flex-wrap items-center gap-3")}
            style={stage(0.34)}
          >
            <ButtonLink href="/nos-solutions" variant="light" size="lg">
              <span className="inline-flex items-center gap-2.5">
                {t.common.seeSolutions}
                <ArrowRight
                  className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover/btn:translate-x-1.5"
                  strokeWidth={1.8}
                  aria-hidden
                />
              </span>
            </ButtonLink>
            <Link
              href="/contact"
              className="group border-canvas/25 text-canvas/85 hover:border-canvas/60 hover:text-canvas inline-flex h-13 items-center gap-2.5 rounded-full border px-6 text-[0.9375rem] backdrop-blur-md transition-colors duration-300"
            >
              {t.common.bookCall}
              <ArrowRight
                className="size-4 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1.5"
                strokeWidth={1.8}
                aria-hidden
              />
            </Link>
          </div>
        </div>

        {/* ── Foot of the frame — socials · trust · project carousel ── */}
        <div className="mt-16 grid flex-1 items-end gap-10 lg:mt-0 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
          <div className={cn(enter, "min-w-0")} style={stage(0.5)}>
            <ul className="flex items-center gap-2.5">
              {socialAccounts.map((account) => (
                <li key={account.label}>
                  <a
                    href={account.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={account.label}
                    className="border-canvas/25 text-canvas/75 hover:border-canvas/70 hover:text-canvas flex size-10 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300"
                  >
                    <account.Icon className="size-[1.05rem]" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
              <ul className="flex items-center -space-x-3">
                {monograms.map((item) => (
                  <li
                    key={item.initials}
                    className={cn(
                      "ring-forest/60 flex size-9 items-center justify-center rounded-full ring-2",
                      "font-label text-[0.65rem] font-semibold tracking-[0.08em] uppercase",
                      item.className,
                    )}
                  >
                    {item.initials}
                  </li>
                ))}
              </ul>

              <div>
                <div className="flex items-center gap-1" aria-hidden>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="fill-mint text-mint size-2.5"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p className="text-canvas mt-1.5 text-sm font-medium">
                  {t.hero.trust}
                </p>
              </div>
            </div>
          </div>

          <div className={cn(enter, "lg:justify-self-end")} style={stage(0.6)}>
            <ProjectCarousel slides={slides} />
          </div>
        </div>

        {/* ── Trust rail ─────────────────────────────────────────────── */}
        <div
          className={cn(enter, "border-canvas/10 mt-12 border-t pt-7")}
          style={stage(0.72)}
        >
          <p className="eyebrow text-canvas/35 mb-5">{t.hero.clientsLabel}</p>
          <LogoMarquee logos={clientLogos} tone="light" speed={46} />
        </div>
      </div>
    </section>
  );
}
