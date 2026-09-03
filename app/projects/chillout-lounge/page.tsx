"use client";

/**
 * CHILLOUT Lounge, written out in full.
 *
 * This page owns its own structure and its own words. Nothing is handed in
 * by a shared case component and nothing is read out of `lib/data/projects`
 *   change the design or the copy here and it changes this case and no
 * other. The repetition across the eleven case pages is deliberate.
 *
 * Still shared, because they are behaviour rather than this page's design:
 * `next/image`, the reveal primitives, `cn`, the hero's recede hook,
 * the gallery rail (`CaseWall`) and the language provider.
 *
 * The grounds run canvas → cream → canvas down the chapters and the deep
 * ground is spent once, on the impact. Every colour is written out below
 * rather than looked up in a table.
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { jumpToTop } from "@/components/providers/smooth-scroll";
import { useLanguage } from "@/components/providers/language-provider";
import {
  HERO_WORD_LEAD,
  HERO_WORD_STEP,
  heroEnter as ENTER,
  heroStage as stage,
  useHeroDepart,
} from "@/components/layout/film-hero";
import { Reveal, RevealGroup, RevealWords, SlideIn } from "@/components/ui/reveal";
import { CaseWall } from "@/components/project/case/wall";
import { cn } from "@/lib/utils";

type Say = { fr: string; en: string };

const CLIENT = "CHILLOUT Lounge";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Lounge", en: "Lounge" };
const LOCATION: Say = { fr: "Lunja Village, Agadir", en: "Lunja Village, Agadir" };

/** The one deep room's ground. */
const GROUND = "var(--color-forest)";

const HERO = {
  statement: { fr: "Imprimer l'heure dorée.", en: "Print the golden hour." },
  intro: {
    fr: "Musique live, cocktails et couchers de soleil face à l'Atlantique   avec un seul travail à faire en ligne : remplir ce soir.",
    en: "Live music, cocktails and sunset sessions facing the Atlantic   with one job to do online: fill tonight.",
  },
  image: "/work/chillout-lounge/chilout hero.png",
  alt: {
    fr: "Le CHILLOUT Lounge au coucher du soleil",
    en: "CHILLOUT Lounge at sunset",
  },
};

const REALITY: Say[] = [
  {
    fr: "Un endroit fait à la main, avec un vrai caractère.",
    en: "A hand-made place, with a real character.",
  },
  {
    fr: "Une heure   dix-neuf heures   que le lieu a déjà.",
    en: "An hour   seven in the evening   the place already owns.",
  },
  {
    fr: "Un programme qui change tous les soirs.",
    en: "A programme that changes every night.",
  },
];

const FRACTURE: Say[] = [
  { fr: "Aucun moyen de le montrer.", en: "No way to show it." },
  {
    fr: "Invisible tant qu'on n'y était pas.",
    en: "Invisible until you had arrived.",
  },
  {
    fr: "Un programme que l'équipe ne pouvait pas tenir à jour elle-même.",
    en: "A programme the team could not keep up to date itself.",
  },
];

const DECISION: Say = {
  fr: "Faire porter au site la personnalité du lieu, avant qu'on y arrive.",
  en: "Make the site carry the personality of the place, before you get there.",
};

const CHAIN_TEXT: Say = {
  fr: "La direction artistique a choisi dix-neuf heures et s'y tient partout : le logotype et la lumière viennent de ce que le lieu est déjà à cette heure-là. Le site ne traite qu'une question   qui joue ce soir   et l'équipe met la soirée à jour elle-même, depuis la salle. Et le mouvement est écrit en CSS plutôt qu'apporté par une librairie, pour que le site reste léger sur un réseau de bord de mer.",
  en: "Art direction picked seven in the evening and holds to it everywhere: the wordmark and the light come from what the place already is at that hour. The site handles one question   who is playing tonight   and the team updates the evening itself, from the floor. And the motion is written in CSS rather than brought in by a library, so the site stays light on a seafront network.",
};

const IMPACT_TITLE: Say = {
  fr: "Une personnalité visible avant d'y arriver.",
  en: "A personality visible before you get there.",
};
const IMPACT_TEXT: Say = {
  fr: "Un programme que l'équipe tient elle-même à jour, et un site léger, sans imagerie lourde à charger.",
  en: "A programme the team maintains itself, and a light site with no heavy imagery to load.",
};

const WORK = [
  {
    image: "/work/chillout-lounge/DSC09000.jpg",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
  {
    image: "/work/chillout-lounge/DSC09003.jpg",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
  {
    image: "/work/chillout-lounge/DSC09004.jpg",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
  {
    image: "/work/chillout-lounge/DSC09006.jpg",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
  {
    image: "/work/chillout-lounge/DSC09008.jpg",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
  {
    image: "/work/chillout-lounge/DSC09016.jpg",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
  {
    image: "/work/chillout-lounge/DSC09017.jpg",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
  {
    image: "/work/chillout-lounge/DSC09020.jpg",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
  {
    image: "/work/chillout-lounge/DSC09021.jpg",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
  {
    image: "/work/chillout-lounge/DSC09023.jpg",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
  {
    image: "/work/chillout-lounge/DSC09024.jpg",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
  {
    image: "/work/chillout-lounge/chilout hero.png",
    alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
  },
];

/**
 * The brand board's material.
 *
 * No brand book exists for this case, so the colours are read off the brand
 * mark itself and carry a role rather than an invented name. No typeface is
 * named, because none was ever documented.
 */
const BRAND = {
  ground: "#4C3E0A",
  contain: true,
  wordmark: "/work/chillout-lounge/chilout card.png",
  wordmarkAlt: {
    fr: "Marque CHILLOUT Lounge",
    en: "CHILLOUT Lounge brand mark",
  },
  lead: {
    fr: "La personnalité du lieu, rendue visible.",
    en: "The venue's own personality, made visible.",
  },
  essence: {
    fr: "Rien n'a été inventé : le logotype et la lumière viennent de ce que le lieu est déjà à dix-neuf heures.",
    en: "Nothing was invented: the wordmark and the light come from what the place already is at seven in the evening.",
  },
  colors: [
    {
      hex: "#403A08",
      dark: true,
      role: {
        fr: "Dominante",
        en: "Dominant",
      },
    },
    {
      hex: "#A6945E",
      dark: false,
      role: {
        fr: "Accent",
        en: "Accent",
      },
    },
    {
      hex: "#75652E",
      dark: true,
      role: {
        fr: "Contraste",
        en: "Contrast",
      },
    },
    {
      hex: "#FFFFFF",
      dark: false,
      role: {
        fr: "Neutre",
        en: "Neutral",
      },
    },
  ],
};

const NEXT = [
  {
    slug: "orsen",
    client: "ORSEN",
    category: { fr: "Matériaux", en: "Materials" },
    image: "/work/orsen/orsen hero.png",
  },
  {
    slug: "lithos-materiaux",
    client: "LITHOS",
    category: { fr: "Matériaux", en: "Materials" },
    image: "/work/lithos-materiaux/luthos hero.png",
  },
];

export default function ChilloutLoungePage() {
  const { locale } = useLanguage();
  const say = (value: Say) => value[locale];
  const heroRef = useHeroDepart<HTMLElement>();

  /* The case is read from the top, however it was reached. */
  useEffect(() => {
    jumpToTop();
  }, []);

  const words = CLIENT.split(" ").filter(Boolean);
  const rail = [say(CATEGORY), say(LOCATION), YEAR].join(" · ");

  return (
    <article
      className="bg-canvas"
      style={{ "--case-ground": GROUND } as React.CSSProperties}
    >
      <CaseVeil />

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        data-nav-tone="light"
        className="hero-depart relative isolate flex min-h-[68svh] flex-col overflow-hidden bg-beige sm:min-h-[74svh]"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 overflow-hidden motion-safe:[animation:eiden-film-settle_2.4s_var(--ease-brand)_both]"
        >
          <Image
            src={HERO.image}
            alt={say(HERO.alt)}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(244,235,208,1)_16%,rgba(244,235,208,0.94)_44%,rgba(244,235,208,0.86)_100%)]"
        />

        <div className="container-eiden relative flex flex-1 flex-col pt-28 pb-10 sm:pt-20 sm:pb-10">
          <Link
            href="/clients"
            transitionTypes={["case-close"]}
            className={cn(
              ENTER,
              "group text-ink/50 hover:text-ink font-label inline-flex w-fit items-center gap-1.5 text-[0.72rem] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] sm:text-[0.78rem]",
            )}
            style={stage(0.02)}
          >
            <ChevronLeft
              className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:-translate-x-0.5 motion-reduce:transition-none"
              strokeWidth={2}
              aria-hidden
            />
            {say({ fr: "Tous les projets", en: "All projects" })}
          </Link>

          <div className="mt-10 pt-3">
            <p
              className={cn(ENTER, "eyebrow text-teal flex items-center gap-3")}
              style={stage(0.06)}
            >
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {say({ fr: "Étude de cas", en: "Case study" })}
            </p>

            <h1 className="text-balance-tight text-ink mt-2 text-[clamp(2.75rem,8vw,6rem)] leading-[0.96] font-extrabold">
              {words.map((word, index) => {
                const rise = stage(HERO_WORD_LEAD + index * HERO_WORD_STEP);
                const last = index === words.length - 1;

                if (!last) {
                  return (
                    <span
                      key={`${word}-${index}`}
                      className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom"
                    >
                      <span
                        className="inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]"
                        style={rise}
                      >
                        {word}
                      </span>
                    </span>
                  );
                }

                return (
                  <span key={`${word}-${index}`} className="relative inline-block">
                    <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                      <span
                        className="text-[#8a6412] inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]"
                        style={rise}
                      >
                        {word}
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

            {/* WHY   the reasoning, out-ranking the description under it. */}
            <p
              className={cn(
                ENTER,
                "editorial text-ink mt-8 max-w-[34ch] text-[clamp(1.375rem,3vw,2.125rem)]",
              )}
              style={stage(0.5)}
            >
              {say(HERO.statement)}
            </p>

            {/* WHAT   one short paragraph, never two. */}
            <p
              className={cn(
                ENTER,
                "text-ink/60 mt-6 max-w-[52ch] text-[0.9375rem] leading-relaxed sm:text-[1.0625rem]",
              )}
              style={stage(0.6)}
            >
              {say(HERO.intro)}
            </p>

            <p
              className={cn(
                ENTER,
                "border-ink/12 text-ink/45 mt-9 border-t pt-5 text-[0.8125rem] tracking-[0.02em]",
              )}
              style={stage(0.78)}
            >
              {rail}
            </p>
          </div>
        </div>
      </section>

      {/* ══ THE FRACTURE → THE ARCHITECTURE ════════════════════════ */}
      <section
        data-nav-tone="light"
        className="bg-cream text-ink relative scroll-mt-24"
      >
        {/* The answer, on the same ground and under the same curtain. */}
        <div className="container-eiden pt-10">
          <Reveal direction="none" duration={0.5} amount={0.3}>
            <div className="pt-5">
              <p className="eyebrow text-teal">
                {say({ fr: "L'architecture", en: "The architecture" })}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-2 lg:grid-cols-2 lg:items-center">
            <div>
              <RevealWords
                as="h2"
                amount={0.3}
                delay={0.05}
                text={say(DECISION)}
                className="font-display text-ink mt-12 block text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.04em] sm:mt-14"
              />
            </div>

            <div>
              <Reveal delay={0.12} amount={0.25}>
                <p className="text-ink/60 mt-5 text-[0.9375rem] leading-relaxed sm:mt-8 sm:text-base">
                  {say(CHAIN_TEXT)}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="container-eiden pt-18 pb-20">
          <SlideIn from="right" className="relative">
            <div className="grid gap-y-16 lg:grid-cols-2 lg:items-center lg:gap-x-8 xl:gap-x-12">
              <div>
                <p className="eyebrow text-teal">
                  {say({ fr: "La réalité", en: "The reality" })}
                </p>
                <RevealGroup as="ol" amount={0.15} className="mt-8 sm:mt-9">
                  {REALITY.map((item, index) => (
                    <li
                      key={item.fr}
                      className="border-ink/12 grid grid-cols-[2.25rem_1fr] items-baseline border-t py-5 first:border-t-0 first:pt-0 sm:py-6"
                    >
                      <span
                        aria-hidden
                        className="font-label text-teal text-[0.72rem] font-bold tracking-[0.16em] tabular-nums"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-ink/60 font-sans text-[1.0625rem] leading-snug">
                        {say(item)}
                      </span>
                    </li>
                  ))}
                </RevealGroup>
              </div>

              <figure className="border-ink/12 relative mt-10 aspect-11/12 overflow-hidden rounded-[1.1rem] border sm:mt-12 sm:rounded-[1.4rem]">
                <Image
                  src={"/work/chillout-lounge/chilout hero.png"}
                  alt={say(HERO.alt)}
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-brand)] hover:scale-[1.03] motion-reduce:transition-none"
                />
              </figure>
            </div>
          </SlideIn>
          <SlideIn from="left" className="relative">
            <div className="grid gap-y-16 lg:grid-cols-2 lg:items-center lg:gap-x-8 xl:gap-x-12">
              <figure className="border-ink/12 relative mt-10 aspect-11/12 overflow-hidden rounded-[1.1rem] border sm:mt-12 sm:rounded-[1.4rem]">
                <Image
                  src={"/work/chillout-lounge/DSC09000.jpg"}
                  alt={say(HERO.alt)}
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-brand)] hover:scale-[1.03] motion-reduce:transition-none"
                />
              </figure>
              <div className="relative">
                <span aria-hidden className="hidden text-[#8a6412] lg:block">
                  <span className="absolute top-0 left-0 h-[38%] w-px bg-current opacity-55" />
                  <span className="absolute bottom-0 left-0 h-[54%] w-px bg-current opacity-55" />
                </span>

                <p className="eyebrow pl-5 text-[#8a6412]">
                  {say({ fr: "La fracture", en: "The fracture" })}
                </p>
                <RevealGroup as="ol" amount={0.15} className="mt-8 pl-5 sm:mt-9">
                  {FRACTURE.map((item, index) => (
                    <li
                      key={item.fr}
                      className="border-ink/12 grid grid-cols-[2.25rem_1fr] items-baseline border-t py-5 first:border-t-0 first:pt-0 sm:py-6"
                    >
                      <span
                        aria-hidden
                        className="font-label text-[0.72rem] font-bold tracking-[0.16em] text-[#8a6412] tabular-nums"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-ink text-[1.0625rem] leading-snug font-bold tracking-[-0.02em] sm:text-[1.3125rem]">
                        {say(item)}
                      </span>
                    </li>
                  ))}
                </RevealGroup>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══ 01 · DIRECTION ARTISTIQUE ══════════════════════════ */}
      <section
        id={"chapter-art-direction"}
        data-nav-tone="light"
        className="bg-canvas text-ink relative scroll-mt-24"
      >
        <div className="container-eiden pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
          <SlideIn
            from={"right"}
            className="relative grid gap-12 lg:items-start lg:gap-16 xl:gap-20"
          >
            <div className="">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5">
                  <span className="eyebrow text-teal mr-1 tabular-nums">01</span>
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({ fr: "Direction artistique", en: "Art Direction" })}
                    </span>
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-2 lg:grid-cols-2 lg:items-start">
                <RevealWords
                  as="h2"
                  amount={0.3}
                  delay={0.05}
                  text={say({
                    fr: "La personnalité du lieu, rendue visible.",
                    en: "The venue's own personality, made visible.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Rien n'a été inventé : le logotype et la lumière viennent de ce que le lieu est déjà à dix-neuf heures. La direction artistique a consisté à choisir cette heure-là et à s'y tenir partout.",
                        en: "Nothing was invented: the wordmark and the light come from what the place already is at seven in the evening. The art direction was choosing that hour and holding to it everywhere.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
            <RevealGroup
              amount={0.12}
              className="grid gap-3 sm:grid-cols-4 sm:gap-4"
            >
              <figure
                key={"/work/chillout-lounge/chilout card.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/chillout-lounge/chilout card.png"}
                  alt={say({
                    fr: "Le logotype CHILLOUT sur une soirée du lieu",
                    en: "The CHILLOUT wordmark over a night at the venue",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                  priority
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Logo", en: "Logo" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/chillout-lounge/DSC08999.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/chillout-lounge/DSC08999.jpg"}
                  alt={say({
                    fr: "Cocktails au bar du CHILLOUT",
                    en: "Cocktails at the CHILLOUT bar",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Cocktails", en: "Cocktails" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/chillout-lounge/DSC09029.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/chillout-lounge/DSC09029.jpg"}
                  alt={say({
                    fr: "Le barman du CHILLOUT au travail",
                    en: "The CHILLOUT bartender at work",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Le bar", en: "The bar" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/chillout-lounge/DSC09034.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/chillout-lounge/DSC09034.jpg"}
                  alt={say({
                    fr: "Une soirée au CHILLOUT Lounge",
                    en: "A night at CHILLOUT Lounge",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Les soirées", en: "Nights" })}
                </figcaption>
              </figure>
            </RevealGroup>
          </SlideIn>
        </div>
        {/* ══ LA PLANCHE DE MARQUE ═══════════════════════════════════
            The brand read as a board rather than as a scroll: one ruled grid,
            every cell numbered, the way a brand book opens. The colours belong
            to the client and not to EIDEN, so the identity cell sits on the
            brand's own ground while the page around it stays in the
            portfolio's language. */}
        <div className="container-eiden pb-24 sm:pb-28 lg:pb-32">
          <Reveal direction="none" duration={0.5} amount={0.3}>
            <div className="border-ink/12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t pt-5">
              <p className="eyebrow text-teal">
                {say({ fr: "La planche de marque", en: "The brand board" })}
              </p>
              <p className="eyebrow text-ink/30 tabular-nums">
                {say({
                  fr: "Couleurs relevées sur la marque",
                  en: "Colours read off the mark",
                })}
              </p>
            </div>
          </Reveal>

          <RevealWords
            as="h3"
            amount={0.3}
            delay={0.05}
            text={say(BRAND.lead)}
            className="font-display text-ink mt-7 block max-w-3xl text-[clamp(1.375rem,3vw,2.125rem)] leading-[1.08] font-extrabold tracking-[-0.04em]"
          />

          {/* `gap-px` over a hairline ground draws the rules   the same trick
              the sectors grid uses on the clients page. */}
          <RevealGroup
            amount={0.1}
            className="bg-ink/12 mt-12 grid gap-px overflow-hidden rounded-[1.25rem] border border-black/10 sm:mt-14 sm:rounded-[1.75rem] lg:grid-cols-12"
          >
            {/* ── 01 · Identity, full bleed ─────────────────────────
                The mark carries its own ground inside the picture, so it fills
                the cell rather than floating on a colour that would swallow
                it. The ground behind is what shows while it loads. */}
            <div
              className="group/id relative min-h-[15rem] overflow-hidden sm:min-h-[18rem] lg:col-span-5 lg:row-span-2"
              style={{ backgroundColor: BRAND.ground }}
            >
              <Image
                src={BRAND.wordmark}
                alt={say(BRAND.wordmarkAlt)}
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-contain transition-transform duration-[1200ms] ease-[var(--ease-brand)] group-hover/id:scale-[1.04] motion-reduce:transition-none"
              />
              <span className="eyebrow text-ink/55 absolute top-6 left-7 z-10">
                01   {say({ fr: "Identité", en: "Identity" })}
              </span>
            </div>

            {/* ── 02 · The essence, in the case's own words ────── */}
            <div className="bg-canvas relative p-8 sm:p-10 lg:col-span-7">
              <span className="eyebrow text-ink/35">
                02   {say({ fr: "Essence", en: "Essence" })}
              </span>
              <p className="editorial text-ink mt-5 max-w-[34ch] text-[clamp(1.125rem,2.1vw,1.5rem)] leading-snug">
                {say(BRAND.essence)}
              </p>
            </div>

            {/* ── 03 · The colour system. A swatch grows when it is
                   pointed at, so the hex reads without a legend. ───────── */}
            <div className="bg-canvas relative p-8 sm:p-10 lg:col-span-7">
              <span className="eyebrow text-ink/35">
                03   {say({ fr: "Système colorimétrique", en: "Colour system" })}
              </span>

              <ul className="mt-6 flex flex-col gap-px overflow-hidden rounded-[0.75rem] sm:h-[11rem] sm:flex-row">
                {BRAND.colors.map((colour) => (
                  <li
                    key={colour.hex}
                    style={{ backgroundColor: colour.hex }}
                    className={cn(
                      "flex min-h-[4.5rem] flex-1 flex-col justify-end p-4",
                      "transition-[flex-grow] duration-500 ease-[var(--ease-brand)] sm:hover:grow-[2.5]",
                      "motion-reduce:transition-none",
                      colour.dark ? "text-canvas" : "text-ink",
                    )}
                  >
                    <span className="font-label mt-1.5 text-[0.7rem] font-bold tracking-[0.14em] uppercase tabular-nums opacity-70">
                      {colour.hex}
                    </span>
                    <span className="font-label mt-0.5 text-[0.65rem] tracking-[0.1em] uppercase opacity-45">
                      {say(colour.role)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ══ 02 · SITE WEB ══════════════════════════ */}
      <section
        id={"chapter-website"}
        data-nav-tone="light"
        className="bg-cream text-ink relative scroll-mt-24"
      >
        <div className="container-eiden pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
          <SlideIn
            from={"right"}
            className="relative grid gap-12 lg:items-start lg:gap-16 xl:gap-20"
          >
            <div className="">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5">
                  <span className="eyebrow text-teal mr-1 tabular-nums">02</span>
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({ fr: "Site web", en: "Website" })}
                    </span>
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-2 lg:grid-cols-2 lg:items-start">
                <RevealWords
                  as="h2"
                  amount={0.3}
                  delay={0.05}
                  text={say({
                    fr: "Un site léger, construit autour du programme de ce soir.",
                    en: "A light site built around tonight's programme.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Un bar n'a qu'une question à traiter en ligne : qui joue ce soir, et à quelle heure. Tout le reste du site est en dessous, et l'équipe met la soirée à jour elle-même depuis un téléphone, en salle.",
                        en: "A bar has one question to handle online: who is playing tonight, and at what time. Everything else on the site sits below that, and the team updates the evening themselves from a phone, on the floor.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>

              <Reveal delay={0.22} amount={0.3}>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  <li key={"https://chill-vibes-studio.vercel.app"}>
                    <a
                      href={"https://chill-vibes-studio.vercel.app"}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-label border-ink/20 text-ink hover:bg-ink hover:text-canvas inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-[0.72rem] font-bold tracking-[0.16em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none sm:px-6 sm:py-3 sm:text-[0.78rem]"
                    >
                      {say({ fr: "Voir le site", en: "View the site" })}
                      <ArrowUpRight
                        className="size-4"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </a>
                  </li>
                </ul>
              </Reveal>
            </div>
            <RevealGroup
              amount={0.12}
              className="grid gap-3 sm:grid-cols-3 sm:gap-4"
            >
              <figure
                key={"/work/chillout-lounge/web-chillout-desktop.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/chillout-lounge/web-chillout-desktop.jpg"}
                  alt={say({
                    fr: "Le site CHILLOUT sur écran",
                    en: "The CHILLOUT site on desktop",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Desktop", en: "Desktop" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/chillout-lounge/web-chillout-mobile.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/chillout-lounge/web-chillout-mobile.jpg"}
                  alt={say({
                    fr: "Le site CHILLOUT sur téléphone",
                    en: "The CHILLOUT site on a phone",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="object-contain p-4 sm:p-6"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Mobile", en: "Mobile" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/chillout-lounge/web-chillout-cover.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/chillout-lounge/web-chillout-cover.jpg"}
                  alt={say({
                    fr: "L'accueil du site CHILLOUT",
                    en: "The CHILLOUT site homepage",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Accueil", en: "Home" })}
                </figcaption>
              </figure>
            </RevealGroup>
          </SlideIn>
        </div>
      </section>

      {/* ══ 03 · MOTION ══════════════════════════ */}
      <section
        id={"chapter-motion"}
        data-nav-tone="light"
        className="bg-canvas text-ink relative scroll-mt-24"
      >
        <div className="container-eiden relative overflow-hidden pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
          <span
            aria-hidden
            className="font-display text-ink pointer-events-none absolute right-0 -bottom-[0.18em] text-[34vw] leading-none font-extrabold tracking-[-0.06em] opacity-[0.055] select-none lg:text-[22vw]"
          >
            03
          </span>

          <SlideIn from={"right"} className="relative">
            <div className="max-w-4xl">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5">
                  <span className="eyebrow text-teal mr-1 tabular-nums">03</span>
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({ fr: "Motion", en: "Motion" })}
                    </span>
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-2 lg:grid-cols-2 lg:items-start">
                <RevealWords
                  as="h2"
                  amount={0.3}
                  delay={0.05}
                  text={say({
                    fr: "Du mouvement discret, sans dépendance supplémentaire.",
                    en: "Light motion, with no extra dependency.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(2rem,5.6vw,4.25rem)] leading-[0.99] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                      {say({
                        fr: "Le mouvement est écrit en CSS plutôt qu'apporté par une librairie : le site reste léger sur un réseau de bord de mer, et rien ne casse le jour où la librairie change de version. C'est de la retenue, pas une limite.",
                        en: "The motion is written in CSS rather than brought in by a library: the site stays light on a seafront connection, and nothing breaks the day the library changes version. That is restraint, not a limitation.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══ THE IMPACT ═════════════════════════════════════════════ */}
      <section
        data-nav-tone="light"
        className="grain text-ink relative isolate scroll-mt-24 overflow-hidden bg-beige"
      >
        {/* The place, kept far enough back that a figure set on it still
            reads. The ground colour is laid over the picture rather than the
            picture being faded, so the room keeps its colour. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={HERO.image}
            alt=""
            fill
            quality={70}
            sizes="100vw"
            className="object-cover object-center opacity-[0.10]"
          />
          <span className="absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_0%,transparent,var(--color-beige)_75%)]" />
        </div>

        <div className="container-eiden pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-28">
          <Reveal direction="none" duration={0.5} amount={0.3}>
            <p className="eyebrow text-teal flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {say({ fr: "L'impact", en: "The impact" })}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-x-16 gap-y-12 sm:mt-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
              <RevealWords
                as="h2"
                amount={0.25}
                delay={0.05}
                text={say(IMPACT_TITLE)}
                className="font-display text-ink block text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.06] font-extrabold tracking-[-0.045em]"
              />

              <Reveal delay={0.16} amount={0.25}>
                <p className="text-ink/60 mt-6 max-w-[44ch] text-[0.9375rem] leading-relaxed">
                  {say(IMPACT_TEXT)}
                </p>
              </Reveal>
            </div>

            {/* No figure has been published for this case, so none is shown.
                What changed is said in the writing beside this. */}
          </div>
        </div>
      </section>

      {/* ══ THE WORK ═══════════════════════════════════════════════ */}
      <section
        data-nav-tone="light"
        className="bg-canvas text-ink relative scroll-mt-24"
      >
        <div className="container-eiden pt-24 sm:pt-28 lg:pt-32">
          <Reveal direction="none" duration={0.5} amount={0.3}>
            <p className="eyebrow text-teal flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {say({ fr: "Le travail", en: "The work" })}
            </p>
          </Reveal>

          <RevealWords
            as="h2"
            amount={0.3}
            delay={0.05}
            text={say({
              fr: "La preuve, après l'argument.",
              en: "The proof, after the argument.",
            })}
            className="font-display text-ink mt-7 block max-w-3xl text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.045em]"
          />
        </div>

        <div className="mt-10 pb-24 sm:mt-12 sm:pb-28 lg:pb-32">
          <CaseWall
            wall={WORK}
            skin={{
              panel: "bg-canvas text-ink",
              nav: "light",
              label: "text-teal",
              title: "text-ink",
              body: "text-ink/60",
              rule: "border-ink/12",
              frame: "bg-ink/[0.05]",
              ring: "ring-ink/10",
              caption: "text-ink/40",
              flag: "text-[#8a6412]",
              control: "border-ink/20 text-ink hover:bg-ink hover:text-canvas",
              card: "border-ink/8 bg-cream/70",
            }}
          />
        </div>
      </section>

      {/* ══ NEXT TRANSFORMATION ════════════════════════════════════ */}
      <section data-nav-tone="light" className="bg-canvas">
        <div className="container-eiden pb-5 sm:pb-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
            <Reveal direction="none" duration={0.5} amount={0.3}>
              <p className="eyebrow text-teal flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-current opacity-50" />
                {say({
                  fr: "Transformations suivantes",
                  en: "Next transformations",
                })}
              </p>
            </Reveal>

            <Reveal delay={0.1} amount={0.3}>
              <Link
                href="/clients"
                transitionTypes={["case-close"]}
                className="text-ink/45 hover:text-ink font-label inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] sm:text-[0.78rem]"
              >
                {say({ fr: "Tous les projets", en: "All projects" })}
                <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Edge to edge and flush to the foot of the page: a case study drops
          the site's footer, so these are the last thing the reader is given. */}
        <RevealGroup amount={0.12} className="grid gap-px lg:grid-cols-2">
          {NEXT.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              transitionTypes={["case-next"]}
              aria-label={`${project.client}   ${say(project.category)}`}
              className="group focus-visible:outline-teal relative block overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-4"
            >
              <div className="bg-ink/[0.05] relative h-[42svh] min-h-[17rem] lg:h-[52svh]">
                <Image
                  src={project.image}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 64rem) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-brand)] group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 sm:p-8">
                <div className="min-w-0">
                  <h2 className="font-display text-canvas text-[clamp(1.75rem,4vw,3rem)] leading-[0.95] font-extrabold tracking-[-0.05em] text-balance transition-transform duration-700 ease-[var(--ease-brand)] group-hover:translate-x-1 motion-reduce:transition-none">
                    {project.client}
                  </h2>
                  <p className="text-canvas/60 mt-2.5 text-[0.9375rem]">
                    {say(project.category)}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="border-canvas/25 text-canvas group-hover:bg-canvas group-hover:text-ink flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
                >
                  <ArrowUpRight className="size-5" strokeWidth={1.8} />
                </span>
              </div>
            </Link>
          ))}
        </RevealGroup>
      </section>
    </article>
  );
}

/**
 * The curtain, for browsers that cannot draw the real one. Written here
 * rather than imported: it is four lines, and a case that wants to open on
 * a different gesture should be able to change it on its own page.
 */
function CaseVeil() {
  const [present, setPresent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPresent(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!present) return null;
  return <div aria-hidden className="case-veil" />;
}
