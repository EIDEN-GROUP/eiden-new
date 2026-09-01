"use client";

/**
 * Résidence Rihab, written out in full.
 *
 * This page owns its own structure and its own words. Nothing is handed in
 * by a shared case component and nothing is read out of `lib/data/projects`
 * — change the design or the copy here and it changes this case and no
 * other. The repetition across the eleven case pages is deliberate.
 *
 * Still shared, because they are behaviour rather than this page's design:
 * `next/image`, the reveal primitives, `cn`, the hero's recede hook and the language provider.
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
import { cn } from "@/lib/utils";

type Say = { fr: string; en: string };

const CLIENT = "Résidence Rihab";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Hôtellerie", en: "Hospitality" };
const LOCATION: Say = { fr: "Cité Founty, Agadir", en: "Cité Founty, Agadir" };

/** The one deep room's ground. */
const GROUND = "var(--color-forest)";

const HERO = {
  statement: {
    fr: "Montrer le lieu tel qu'il est.",
    en: "Show the place as it is.",
  },
  intro: {
    fr: "Une adresse familiale à cinq minutes de l'Atlantique, dans un marché où les voisins vendaient un luxe qu'ils n'avaient pas.",
    en: "A family-run address five minutes from the Atlantic, in a market where neighbours were selling a luxury they did not have.",
  },
  image: "/work/rihab-residence/HERO PAGE RIHAB.png",
  alt: { fr: "La Résidence Rihab à Agadir", en: "Résidence Rihab in Agadir" },
};

const REALITY: Say[] = [
  {
    fr: "Une adresse familiale à cinq minutes de l'Atlantique.",
    en: "A family-run address five minutes from the Atlantic.",
  },
  {
    fr: "Des appartements exactement tels qu'ils sont.",
    en: "Apartments exactly as they are.",
  },
  {
    fr: "Deux publics, français et britannique.",
    en: "Two audiences, French and British.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Autour d'Agadir, des appartements modestes vendus comme du luxe.",
    en: "Around Agadir, modest apartments oversold as luxury.",
  },
  {
    fr: "Rien qui distingue une adresse honnête de celles qui exagèrent.",
    en: "Nothing separating an honest address from the ones overstating.",
  },
  {
    fr: "Deux publics, et une seule langue pour les deux.",
    en: "Two audiences, and one language for both.",
  },
];

const DECISION: Say = {
  fr: "Vendre l'exactitude, dans les deux langues, jusqu'à la réservation.",
  en: "Sell accuracy, in both languages, all the way to the booking.",
};

const CHAIN_TEXT: Say = {
  fr: "Le positionnement a pris le contre-pied du marché : des photos non retouchées, des mètres carrés exacts, et une distance à la plage donnée en minutes de marche. Le site tient ce ton du haut en bas. La réservation n'a pas été ajoutée au site   c'est le site qui a été construit autour d'elle, en trois gestes et sans compte à créer. Et les deux langues ont été écrites séparément, parce qu'une famille française et un couple britannique ne cherchent pas les mêmes garanties.",
  en: "Positioning took the opposite side of the market: unretouched photographs, exact square metres, and a distance to the beach given in minutes on foot. The site holds that tone from top to bottom. Booking was not added to the site   the site was built around it, in three taps and with no account to create. And the two languages were written separately, because a French family and a British couple are not looking for the same reassurances.",
};

const IMPACT_TITLE: Say = {
  fr: "Une adresse qui se présente honnêtement, et se réserve en trois gestes.",
  en: "An address that presents itself honestly, and books in three taps.",
};
const IMPACT_TEXT: Say = {
  fr: "Une réservation en direct sans friction, et un site qui se lit en français comme en anglais.",
  en: "Live booking with no friction, and a site that reads in French as well as in English.",
};

const NEXT = [
  {
    slug: "chillout-lounge",
    client: "CHILLOUT Lounge",
    category: { fr: "Lounge", en: "Lounge" },
    image: "/work/chillout-lounge/chilout hero.png",
  },
  {
    slug: "orsen",
    client: "ORSEN",
    category: { fr: "Matériaux", en: "Materials" },
    image: "/work/orsen/orsen hero.png",
  },
];

export default function RihabResidencePage() {
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
        data-nav-tone="dark"
        className="hero-depart relative isolate flex min-h-[68svh] flex-col overflow-hidden bg-black sm:min-h-[74svh]"
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
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(10,15,12,1)_16%,rgba(10,15,12,0.90)_44%,rgba(10,15,12,0.80)_100%)]"
        />

        <div className="container-eiden relative flex flex-1 flex-col pt-28 pb-10 sm:pt-20 sm:pb-10">
          <Link
            href="/clients"
            transitionTypes={["case-close"]}
            className={cn(
              ENTER,
              "group text-canvas/50 hover:text-canvas font-label inline-flex w-fit items-center gap-1.5 text-[0.72rem] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] sm:text-[0.78rem]",
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
              className={cn(ENTER, "eyebrow text-gold flex items-center gap-3")}
              style={stage(0.06)}
            >
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {say({ fr: "Étude de cas", en: "Case study" })}
            </p>

            <h1 className="text-balance-tight text-canvas mt-2 text-[clamp(2.75rem,8vw,6rem)] leading-[0.96] font-extrabold">
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
                        className="text-gold inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]"
                        style={rise}
                      >
                        {word}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="bg-gold/60 absolute bottom-[0.05em] left-0 h-[3px] w-full origin-left motion-safe:[animation:eiden-underline_0.9s_var(--ease-brand)_1.15s_both]"
                    />
                  </span>
                );
              })}
            </h1>

            {/* WHY — the reasoning, out-ranking the description under it. */}
            <p
              className={cn(
                ENTER,
                "editorial text-canvas mt-8 max-w-[34ch] text-[clamp(1.375rem,3vw,2.125rem)]",
              )}
              style={stage(0.5)}
            >
              {say(HERO.statement)}
            </p>

            {/* WHAT — one short paragraph, never two. */}
            <p
              className={cn(
                ENTER,
                "text-canvas/60 mt-6 max-w-[52ch] text-[0.9375rem] leading-relaxed sm:text-[1.0625rem]",
              )}
              style={stage(0.6)}
            >
              {say(HERO.intro)}
            </p>

            <p
              className={cn(
                ENTER,
                "border-canvas/12 text-canvas/45 mt-9 border-t pt-5 text-[0.8125rem] tracking-[0.02em]",
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
                  src={"/work/rihab-residence/HERO PAGE RIHAB.png"}
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
                  src={"/work/chillout-lounge/chilout hero.png"}
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

      {/* ══ 01 · SITE WEB ══════════════════════════ */}
      <section
        id={"chapter-website"}
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
                    fr: "Un ton qui ne promet que ce que la résidence tient.",
                    en: "A tone that promises only what the residence delivers.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Autour d'Agadir, tout le monde écrivait « luxe ». Rihab avait besoin de l'inverse : des photos non retouchées, des mètres carrés exacts, et une distance à la plage donnée en minutes de marche plutôt qu'en adjectifs.",
                        en: "Around Agadir everyone was writing “luxury”. Rihab needed the opposite: unretouched photographs, exact square metres, and a distance to the beach given in minutes on foot rather than in adjectives.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>

              <Reveal delay={0.22} amount={0.3}>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  <li key={"https://rihab-hotel.vercel.app"}>
                    <a
                      href={"https://rihab-hotel.vercel.app"}
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
                key={"/work/rihab-residence/web-rihab-desktop.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/rihab-residence/web-rihab-desktop.jpg"}
                  alt={say({
                    fr: "Le site Rihab sur écran",
                    en: "The Rihab site on desktop",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                  priority
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Desktop", en: "Desktop" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/rihab-residence/web-rihab-mobile.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/rihab-residence/web-rihab-mobile.jpg"}
                  alt={say({
                    fr: "Le site Rihab sur téléphone",
                    en: "The Rihab site on a phone",
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
                key={"/work/rihab-residence/web-rihab-cover.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/rihab-residence/web-rihab-cover.jpg"}
                  alt={say({
                    fr: "L'accueil du site Rihab",
                    en: "The Rihab site homepage",
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

      {/* ══ 02 · EXPÉRIENCE DE RÉSERVATION ══════════════════════════ */}
      <section
        id={"chapter-booking"}
        data-nav-tone="light"
        className="bg-cream text-ink relative scroll-mt-24"
      >
        <div className="container-eiden relative overflow-hidden pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
          <span
            aria-hidden
            className="font-display text-ink pointer-events-none absolute right-0 -bottom-[0.18em] text-[34vw] leading-none font-extrabold tracking-[-0.06em] opacity-[0.055] select-none lg:text-[22vw]"
          >
            02
          </span>

          <SlideIn from={"right"} className="relative">
            <div className="max-w-4xl">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5">
                  <span className="eyebrow text-teal mr-1 tabular-nums">02</span>
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({
                        fr: "Expérience de réservation",
                        en: "Booking Experience",
                      })}
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
                    fr: "Trois gestes, et c'est réservé.",
                    en: "Three taps, and it is booked.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(2rem,5.6vw,4.25rem)] leading-[0.99] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                      {say({
                        fr: "Pas de compte à créer, pas de carte à saisir, pas de formulaire qui redemande ce qui a déjà été dit. La réservation est le service ici : elle n'a pas été ajoutée au site, c'est le site qui a été construit autour d'elle.",
                        en: "No account to create, no card to enter, no form asking again for what was already said. Booking is the service here: it was not added to the site   the site was built around it.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══ 03 · DIGITAL BILINGUE ══════════════════════════ */}
      <section
        id={"chapter-bilingual"}
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
                      {say({ fr: "Digital bilingue", en: "Bilingual Digital" })}
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
                    fr: "Se lit aussi naturellement en anglais qu'en français.",
                    en: "Reads as naturally in English as in French.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(2rem,5.6vw,4.25rem)] leading-[0.99] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                      {say({
                        fr: "Deux langues écrites séparément plutôt qu'une traduite. Une famille française et un couple britannique ne cherchent pas les mêmes garanties, et une version traduite mot à mot se reconnaît immédiatement   ce qui, sur une adresse qui vend son honnêteté, coûte cher.",
                        en: "Two languages written separately rather than one translated. A French family and a British couple are not looking for the same reassurances, and a word-for-word version is recognised instantly   which, on an address selling its honesty, is expensive.",
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
        data-nav-tone="dark"
        className="grain text-canvas relative isolate scroll-mt-24 overflow-hidden bg-[var(--case-ground)]"
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
            className="object-cover object-center opacity-[0.14]"
          />
          <span className="absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_0%,transparent,var(--case-ground)_75%)]" />
        </div>

        <div className="container-eiden pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-28">
          <Reveal direction="none" duration={0.5} amount={0.3}>
            <p className="eyebrow text-gold flex items-center gap-3">
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
                className="font-display text-canvas block text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.06] font-extrabold tracking-[-0.045em]"
              />

              <Reveal delay={0.16} amount={0.25}>
                <p className="text-canvas/60 mt-6 max-w-[44ch] text-[0.9375rem] leading-relaxed">
                  {say(IMPACT_TEXT)}
                </p>
              </Reveal>
            </div>

            {/* No figure has been published for this case, so none is shown.
                What changed is said in the writing beside this. */}
          </div>
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
              aria-label={`${project.client} — ${say(project.category)}`}
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
