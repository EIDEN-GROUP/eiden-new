"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Rise, useTravel } from "@/components/home2/motion";
import { ButtonLink } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { projectGallery, siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/** Nine covers, spread as a hand of cards. Odd count keeps one dead centre. */
const deck = projectGallery.slice(0, 9);
const middle = (deck.length - 1) / 2;

/** Two of the roster, called out over the fan. */
const callouts = [
  {
    client: deck[1].client,
    className: "left-[4%] top-[6%]",
    tone: "bg-teal text-canvas",
  },
  {
    client: deck[7].client,
    className: "right-[3%] top-[14%]",
    tone: "bg-gold text-forest",
  },
];

export function Home2Hero() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const fanRef = useRef<HTMLDivElement>(null);
  useTravel(fanRef, { from: 0.75, to: 0.1 });

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 420);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="bg-cream relative overflow-hidden px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-24">
      {/* Faint wash so the deck has something to sit against */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[38rem] bg-[radial-gradient(60%_50%_at_50%_50%,rgba(12,87,82,0.07),transparent_70%)]"
      />

      <div className="mx-auto max-w-6xl text-center">
        <Rise>
          <p className="font-label text-teal text-[0.8rem] font-bold tracking-[0.32em] uppercase">
            {t.hero.trustSub}
          </p>
        </Rise>

        <h1 className="text-ink mt-6 text-[clamp(2.5rem,7.4vw,5.75rem)] leading-[0.94] font-extrabold tracking-[-0.045em]">
          {[t.hero.titleLead, t.hero.titleAccent, t.hero.titleTail].map(
            (part, index) => (
              <span key={part} className="inline-block overflow-hidden pb-[0.08em]">
                <span
                  className={cn(
                    "inline-block pr-[0.28em]",
                    index === 1 && "text-teal",
                    "motion-safe:[animation:eiden-fade-in_1s_var(--ease-brand)_both]",
                  )}
                  style={{ animationDelay: `${0.1 + index * 0.12}s` }}
                >
                  {part}
                </span>
              </span>
            ),
          )}
        </h1>
      </div>

      {/* ── The deck ─────────────────────────────────────────────────── */}
      <div
        ref={fanRef}
        aria-hidden
        className="relative mx-auto mt-10 h-[clamp(12rem,27vw,20rem)] w-full max-w-6xl sm:mt-14"
      >
        {deck.map((entry, index) => {
          const offset = index - middle;
          return (
            <div
              key={entry.src}
              style={
                {
                  "--d": offset,
                  "--lift": `${Math.abs(offset) ** 1.7}`,
                  zIndex: 10 - Math.abs(offset),
                  transitionDelay: `${Math.abs(offset) * 55}ms`,
                } as CSSProperties
              }
              className={cn(
                "absolute top-0 left-1/2 aspect-square w-[clamp(7rem,15vw,12.5rem)]",
                "bg-canvas overflow-hidden rounded-[1.4rem] shadow-[0_28px_60px_-30px_rgba(18,38,32,0.55)]",
                "ring-forest/5 ring-1",
                "transition-[translate,rotate] duration-[1100ms] ease-[var(--ease-brand)] motion-reduce:transition-none",
                open
                  ? "translate-x-[calc(-50%+var(--d)*clamp(3.2rem,6.6vw,5.4rem))] translate-y-[calc(var(--lift)*clamp(0.35rem,0.7vw,0.6rem)+var(--p,0)*-1.5rem)] rotate-[calc(var(--d)*6deg)]"
                  : "-translate-x-1/2 translate-y-6 rotate-0",
              )}
            >
              <Image
                src={entry.src}
                alt=""
                fill
                sizes="(max-width: 640px) 30vw, 200px"
                /* The middle of the fan is what lands first and carries the LCP,
                   so those three are fetched rather than deferred. */
                priority={Math.abs(offset) <= 1}
                className="object-cover"
              />
            </div>
          );
        })}

        {/* Handles floating over the fan, the way the reference calls out
            whose work is on the table. */}
        {callouts.map((callout, index) => (
          <span
            key={callout.client}
            style={{ animationDelay: `${1 + index * 0.18}s` }}
            className={cn(
              "absolute z-20 rounded-full px-3.5 py-1.5 text-[0.72rem] font-semibold",
              "font-display shadow-[0_10px_30px_-12px_rgba(18,38,32,0.6)]",
              callout.className,
              callout.tone,
              "motion-safe:[animation:eiden-fade-in_0.7s_var(--ease-brand)_both]",
            )}
          >
            {callout.client}
          </span>
        ))}
      </div>

      {/* ── Line and actions ─────────────────────────────────────────── */}
      <div className="mx-auto mt-12 max-w-2xl text-center sm:mt-16">
        <Rise delay={0.5}>
          <p className="text-forest/70 text-[0.9375rem] leading-relaxed sm:text-base">
            {t.hero.description}
          </p>
        </Rise>

        <Rise delay={0.62}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink
              href={siteConfig.bookingUrl}
              variant="dark"
              size="lg"
              className="bg-ink hover:bg-teal"
            >
              {t.common.bookCall}
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
            </ButtonLink>
            <ButtonLink
              href="/nos-solutions"
              variant="ghost"
              size="lg"
              className="text-forest/70 hover:text-ink"
            >
              {t.common.seeSolutions}
            </ButtonLink>
          </div>
        </Rise>
      </div>
    </section>
  );
}
