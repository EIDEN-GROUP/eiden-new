"use client";

/**
 * Medical Bay, written out in full.
 *
 * This page owns its own structure and its own words. Nothing is handed in
 * by a shared case component and nothing is read out of `lib/data/projects`
 *   change the design or the copy here and it changes this case and no
 * other. The repetition across the eleven case pages is deliberate.
 *
 * Still shared, because they are behaviour rather than this page's design:
 * `next/image`, the reveal primitives, `cn`, the hero's recede hook,
 * the gallery rail (`CaseWall`),
 * the brand board's own grid and the language provider.
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
import { CasePaletteStory } from "@/components/project/case/palette-story";
import { TONES } from "@/components/project/case/tone";
import type { PaletteStory } from "@/lib/data/projects/types";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";

type Say = { fr: string; en: string };

const CLIENT = "Medical Bay";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Santé", en: "Healthcare" };
const LOCATION: Say = { fr: "Agadir, Maroc", en: "Agadir, Morocco" };

/** The one deep room's ground. */
const GROUND = "#2A3A38";

const HERO = {
  statement: {
    fr: "Concevoir la clinique et son logiciel comme une seule chose.",
    en: "Design the clinic and its software as one thing.",
  },
  intro: {
    fr: "Un centre médical qui existait sur le papier   une vision claire, et rien dessous. Nous avons construit l'activité, la marque et le système ensemble.",
    en: "A medical centre that existed on paper   a clear vision, and nothing underneath it. We built the business, the brand and the system together.",
  },
  image: "/work/medical-bay/medical-bay-lobby.png",
  alt: {
    fr: "Le hall de la clinique Medical Bay",
    en: "The Medical Bay clinic lobby",
  },
};

const REALITY: Say[] = [
  {
    fr: "Une vision claire du centre à ouvrir.",
    en: "A clear vision of the centre to open.",
  },
  {
    fr: "Des traitements que les patients cherchent séparément.",
    en: "Treatments patients search for separately.",
  },
  {
    fr: "Des patients qui viennent parfois de l'étranger.",
    en: "Patients who sometimes fly in.",
  },
];

const FRACTURE: Say[] = [
  { fr: "La clinique existait sur le papier.", en: "The clinic existed on paper." },
  {
    fr: "Pas de marque, pas de parcours patient.",
    en: "No brand, no patient journey.",
  },
  { fr: "Pas de CRM, aucun tunnel.", en: "No CRM, no funnel." },
];

const DECISION: Say = {
  fr: "Concevoir l'espace et le logiciel comme un seul travail.",
  en: "Design the space and the software as one piece of work.",
};

const CHAIN_TEXT: Say = {
  fr: "Le premier livrable n'était pas une maquette : c'était le chemin qu'un patient parcourt, de la recherche au suivi. La marque et l'espace physique ont été dessinés ensemble pour ce chemin-là. Le site en est la porte d'entrée, le tableau de bord la salle des machines. Et chaque traitement a sa campagne, sa page et sa preuve, parce qu'un implant et une facette ne se cherchent pas au même moment.",
  en: "The first deliverable was not a mockup: it was the path a patient walks, from search to follow-up. The brand and the physical space were drawn together for that path. The site is its front door, the dashboard its engine room. And each treatment has its own campaign, page and proof, because an implant and a veneer are not searched for at the same moment.",
};

const IMPACT_TITLE: Say = {
  fr: "Une clinique qui tourne sur un système, plus sur des tableurs.",
  en: "A clinic that runs on a system instead of on spreadsheets.",
};
const IMPACT_TEXT: Say = {
  fr: "Un parcours patient continu, une équipe qui travaille depuis un seul écran, et une marque qui rassure avant que quiconque ait poussé la porte.",
  en: "One continuous patient journey, a team working from a single screen, and a brand that reassures before anyone walks in.",
};

const WORK = [
  {
    image: "/work/medical-bay/medical-bay-brand-logo-3.png",
    alt: { fr: "Logo Medical Bay", en: "Medical Bay logo" },
  },
  {
    image: "/work/medical-bay/medical-bay-brand-reception-mockup.png",
    alt: { fr: "L'accueil Medical Bay", en: "The Medical Bay reception" },
  },
  {
    image: "/work/medical-bay/medical-bay-application.png",
    alt: {
      fr: "L'identité Medical Bay en situation",
      en: "The Medical Bay identity in place",
    },
  },
  {
    image: "/work/medical-bay/medical-bay-office.png",
    alt: { fr: "Un cabinet de Medical Bay", en: "A Medical Bay treatment room" },
  },
  {
    image: "/work/medical-bay/medical-bay-dental-campaign.png",
    alt: { fr: "Campagne dentaire Medical Bay", en: "Medical Bay dental campaign" },
  },
  {
    image: "/work/medical-bay/medical-bay-brand-logo-site.png",
    alt: { fr: "Le logo Medical Bay en ligne", en: "The Medical Bay logo online" },
  },
  {
    image: "/work/medical-bay/medical-bay-hero-flatlay.png",
    alt: { fr: "Medical Bay", en: "Medical Bay" },
  },
  {
    image: "/work/medical-bay/medical-bay-lobby.png",
    alt: { fr: "Le hall de Medical Bay", en: "The Medical Bay lobby" },
  },
];

/**
 * The brand board's material.
 *
 * Colours and roles are the case's own palette; the typefaces are quoted
 * from the brand book.
 */
const BRAND = {
  ground: "#4BBDBD",
  contain: true,
  wordmark: "/work/medical-bay/medical-bay-brand-logo-1.jpg",
  wordmarkAlt: {
    fr: "Marque Medical Bay",
    en: "Medical Bay brand mark",
  },
  lead: {
    fr: "Un parcours de soin doit rassurer avant d'expliquer. La couleur s'en charge en premier.",
    en: "A care journey has to reassure before it explains. Colour does that first.",
  },
  essence: {
    fr: "Medical Bay n'est pas une clinique : c'est le pont entre un patient et le bon spécialiste, et la marque devait porter cette confiance-là avant d'expliquer quoi que ce soit.",
    en: "Medical Bay is not a clinic: it is the bridge between a patient and the right specialist, and the brand had to carry that trust before it explained anything.",
  },
  colors: [
    {
      name: "Teal",
      hex: "#2BBAA5",
      dark: false,
      role: {
        fr: "Signature",
        en: "Signature",
      },
    },
    {
      name: "Teal Profond",
      hex: "#1F9187",
      dark: true,
      role: {
        fr: "Profondeur",
        en: "Depth",
      },
    },
    {
      name: "Mist",
      hex: "#E8F5F3",
      dark: false,
      role: {
        fr: "Calme",
        en: "Calm",
      },
    },
    {
      name: "Encre",
      hex: "#0D1A18",
      dark: true,
      role: {
        fr: "Ancrage",
        en: "Anchor",
      },
    },
  ],
  type: [
    {
      name: "DM Sans",
      stack: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
      role: {
        fr: "Titres et interface",
        en: "Titles and interface",
      },
    },
    {
      name: "Montserrat",
      stack: "'Montserrat', ui-sans-serif, system-ui, sans-serif",
      role: {
        fr: "Corps de texte",
        en: "Body copy",
      },
    },
    {
      name: "Cormorant Garamond",
      stack: "'Cormorant Garamond', Georgia, serif",
      role: {
        fr: "Étiquettes",
        en: "Labels",
      },
    },
  ],
  notes: [
    {
      title: {
        fr: "Ce qu'on ressent en entrant",
        en: "What you feel walking in",
      },
      text: {
        fr: "Le teal est choisi contre le bleu clinique.",
        en: "The teal was chosen against clinical blue.",
      },
    },
    {
      title: {
        fr: "La hiérarchie, sans hausser le ton",
        en: "Hierarchy, without raising the voice",
      },
      text: {
        fr: "Le teal profond sépare ce qui compte de ce qui accompagne.",
        en: "The deep teal separates what matters from what supports it.",
      },
    },
    {
      title: {
        fr: "L'espace autour",
        en: "The space around it",
      },
      text: {
        fr: "La brume est ce qui manque à la plupart des cliniques : du vide.",
        en: "Mist is what most clinics do without: emptiness.",
      },
    },
    {
      title: {
        fr: "Ce qui doit être lu",
        en: "What has to be read",
      },
      text: {
        fr: "L'encre est réservée à l'information dont dépend un rendez-vous.",
        en: "Ink is kept for the information an appointment depends on.",
      },
    },
    {
      title: {
        fr: "Une clinique, pas un cabinet",
        en: "A clinic, not a practice",
      },
      text: {
        fr: "L'ensemble tient de l'accueil au tableau de bord.",
        en: "The set holds from the reception desk to the dashboard.",
      },
    },
  ],
};

/**
 * The palette, told rather than listed.
 *
 * The brand card above shows the colours; this is the run that says what
 * each one is for   the disk turns, the ground changes under the reader,
 * and one beat holds per note. Nothing is written twice: the colours are
 * the card’s own and the beats are the notes already set beside them, so
 * the two can never fall out of step.
 */
const PALETTE: PaletteStory = {
  title: { fr: "Le langage visuel", en: "The visual language" },
  lead: BRAND.lead,
  colors: BRAND.colors.map(({ name, hex, role }) => ({ name, hex, role })),
  /* Which colour each beat turns the room. Written out rather than counted
     off the beats: there are more beats than colours, because the last one
     comes back to a colour already used instead of introducing another. */
  states: BRAND.notes.map((note, index) => ({
    title: note.title,
    text: note.text,
    colorIndex: [0, 1, 2, 3, 0][index] ?? 0,
  })),
};

const NEXT = [
  {
    slug: "rihab-residence",
    client: "Résidence Rihab",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/rihab-residence/HERO PAGE RIHAB.png",
  },
  {
    slug: "chillout-lounge",
    client: "CHILLOUT Lounge",
    category: { fr: "Lounge", en: "Lounge" },
    image: "/work/chillout-lounge/chilout hero.png",
  },
];

export default function MedicalBayPage() {
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
                  src={"/work/medical-bay/medical-bay-lobby.png"}
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
                  src={"/work/medical-bay/medical-bay-brand-logo-3.png"}
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

      {/* ══ 01 · ARCHITECTURE D'ACTIVITÉ ══════════════════════════ */}
      <section
        id={"chapter-business-architecture"}
        data-nav-tone="light"
        className="bg-canvas text-ink relative scroll-mt-24"
      >
        <div className="container-eiden relative overflow-hidden pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
          <span
            aria-hidden
            className="font-display text-ink pointer-events-none absolute right-0 -bottom-[0.18em] text-[34vw] leading-none font-extrabold tracking-[-0.06em] opacity-[0.055] select-none lg:text-[22vw]"
          >
            01
          </span>

          <SlideIn from={"right"} className="relative">
            <div className="max-w-4xl">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5">
                  <span className="eyebrow text-teal mr-1 tabular-nums">01</span>
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({
                        fr: "Architecture d'activité",
                        en: "Business Architecture",
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
                    fr: "Le parcours patient dessiné avant le moindre pixel.",
                    en: "The patient journey drawn before a single pixel.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(2rem,5.6vw,4.25rem)] leading-[0.99] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                      {say({
                        fr: "Le premier livrable n'était pas une maquette : c'était le chemin qu'un patient parcourt, de la recherche au suivi, et la liste de ce que l'équipe doit tenir à chaque étape. Tout le reste   la marque, le site, l'écran de l'accueil   a été dessiné pour ce chemin-là.",
                        en: "The first deliverable was not a mockup: it was the path a patient walks, from search to follow-up, and the list of what the team has to hold at every step. Everything after it   the brand, the site, the screen at the front desk   was drawn for that path.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══ 02 · BRANDING ══════════════════════════ */}
      <section
        id={"chapter-branding"}
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
                      {say({ fr: "Branding", en: "Branding" })}
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
                    fr: "Le calme, avant le rendez-vous.",
                    en: "Calm, before the appointment.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Medical Bay n'est pas une clinique : c'est le pont entre un patient et le bon spécialiste, et la marque devait porter cette confiance-là avant d'expliquer quoi que ce soit. Montserrat pour l'autorité, Cormorant en italique pour la part humaine, et un teal choisi contre le bleu clinique   une identité qui rassure en français, en anglais et en arabe.",
                        en: "Medical Bay is not a clinic: it is the bridge between a patient and the right specialist, and the brand had to carry that trust before it explained anything. Montserrat for the authority, Cormorant italic for the human half, and a teal chosen against clinical blue   an identity that reassures in French, in English and in Arabic.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
            <RevealGroup
              amount={0.12}
              className="grid gap-3 sm:grid-cols-3 sm:gap-4"
            >
              <figure
                key={"/work/medical-bay/medical-bay-brand-logo-1.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/medical-bay/medical-bay-brand-logo-1.jpg"}
                  alt={say({
                    fr: "L'identité Medical Bay en application",
                    en: "The Medical Bay identity applied",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Logo", en: "Logo" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/medical-bay/medical-bay-brand.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/medical-bay/medical-bay-brand.png"}
                  alt={say({
                    fr: "L'identité Medical Bay",
                    en: "The Medical Bay identity",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Identité", en: "Identity" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/medical-bay/medical-bay-reception.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/medical-bay/medical-bay-reception.png"}
                  alt={say({
                    fr: "L'accueil de Medical Bay",
                    en: "The Medical Bay reception",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Accueil", en: "Reception" })}
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
                {BRAND.type.length} {say({ fr: "polices", en: "typefaces" })}
              </p>
            </div>
          </Reveal>


          {/* `gap-px` over a hairline ground draws the rules   the same trick
              the sectors grid uses on the clients page. */}
          <RevealGroup
            amount={0.1}
            className="bg-ink/12 mt-8 grid gap-px overflow-hidden rounded-[1.25rem] border border-black/10 sm:mt-10 sm:rounded-[1.75rem] lg:grid-cols-12"
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

            {/* ── 03 · The type, named and shown ───────────────── */}
            <div className="bg-canvas relative p-8 sm:p-10 lg:col-span-7">
              <span className="eyebrow text-ink/35">
                03   {say({ fr: "Typographie", en: "Typography" })}
              </span>

              <ul className="mt-6 flex flex-col gap-5">
                {BRAND.type.map((face) => (
                  <li
                    key={face.name}
                    className="border-ink/10 flex items-baseline gap-5 border-t pt-4 first:border-t-0 first:pt-0"
                  >
                    <span
                      aria-hidden
                      className="text-ink shrink-0 text-[2.25rem] leading-none"
                      style={{ fontFamily: face.stack }}
                    >
                      Aa
                    </span>
                    <span className="min-w-0">
                      <span className="font-display text-ink block text-[0.9375rem] leading-tight font-bold">
                        {face.name}
                      </span>
                      <span className="text-ink/50 mt-1 block text-[0.8125rem] leading-snug">
                        {say(face.role)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ══ THE PALETTE, TOLD ══════════════════════ */}
      <CasePaletteStory story={PALETTE} skin={TONES.cream} />

      {/* ══ 03 · SITE WEB · CRM ══════════════════════════ */}
      <section
        id={"chapter-platform"}
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
                  <span className="eyebrow text-teal mr-1 tabular-nums">03</span>
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({ fr: "Site web", en: "Website" })}
                    </span>
                    <span
                      aria-hidden
                      className="h-3 w-px translate-y-0.5 bg-current opacity-25"
                    />
                    <span className="eyebrow text-ink">
                      {say({ fr: "CRM", en: "CRM" })}
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
                    fr: "La porte d'entrée du parcours, et l'écran qui le fait tourner.",
                    en: "The front door of the journey, and the screen that runs it.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Devant, un site qui ne présente pas la clinique mais fait entrer dans le parcours : prendre rendez-vous, comprendre un traitement, savoir ce qui vient après. Derrière, le tableau de bord depuis lequel l'accueil suit rendez-vous, rappels et suivis. Les deux moitiés du même chemin, dessinées ensemble.",
                        en: "In front, a site that does not introduce the clinic but opens the journey: booking, understanding a treatment, knowing what comes next. Behind it, the dashboard the front desk follows appointments, reminders and follow-ups from. Two halves of one path, drawn together.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>

              <Reveal delay={0.22} amount={0.3}>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  <li key={"https://medicalbay.vercel.app/"}>
                    <a
                      href={"https://medicalbay.vercel.app/"}
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
                key={"/work/medical-bay/medical-bay-web-desktop.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/medical-bay/medical-bay-web-desktop.png"}
                  alt={say({
                    fr: "Le site Medical Bay sur écran",
                    en: "The Medical Bay site on desktop",
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
                key={"/work/medical-bay/medical-bay-web-mobile.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/medical-bay/medical-bay-web-mobile.png"}
                  alt={say({
                    fr: "Le site Medical Bay sur téléphone",
                    en: "The Medical Bay site on a phone",
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
                key={"/work/medical-bay/medical-bay-dashboard.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/medical-bay/medical-bay-dashboard.png"}
                  alt={say({
                    fr: "Le tableau de bord Medical Bay",
                    en: "The Medical Bay dashboard",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Tableau de bord", en: "Dashboard" })}
                </figcaption>
              </figure>
            </RevealGroup>
          </SlideIn>
        </div>
      </section>

      {/* ══ 04 · MARKETING ══════════════════════════ */}
      <section
        id={"chapter-marketing"}
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
                  <span className="eyebrow text-teal mr-1 tabular-nums">04</span>
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({ fr: "Marketing", en: "Marketing" })}
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
                    fr: "Des campagnes par traitement, pas par saison.",
                    en: "Campaigns per treatment, not per season.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Un implant, une facette et une couronne ne se décident pas de la même façon et ne se cherchent pas au même moment. Chaque traitement a donc sa campagne, sa page et sa preuve   y compris pour les patients qui viennent de l'étranger.",
                        en: "An implant, a veneer and a crown are not decided the same way and are not searched for at the same moment. So each treatment has its own campaign, its own page and its own proof   including for the patients who fly in.",
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
                key={"/work/medical-bay/medical-bay-campaign-implant.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/medical-bay/medical-bay-campaign-implant.png"}
                  alt={say({
                    fr: "Campagne Medical Bay   implants",
                    en: "Medical Bay campaign   implants",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Implants", en: "Implants" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/medical-bay/medical-bay-campaign-veneer.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/medical-bay/medical-bay-campaign-veneer.png"}
                  alt={say({
                    fr: "Campagne Medical Bay   facettes",
                    en: "Medical Bay campaign   veneers",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Facettes", en: "Veneers" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/medical-bay/medical-bay-campaign-zirconia.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/medical-bay/medical-bay-campaign-zirconia.png"}
                  alt={say({
                    fr: "Campagne Medical Bay   zircone",
                    en: "Medical Bay campaign   zirconia",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Zircone", en: "Zirconia" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/medical-bay/medical-bay-tourism-medical.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/medical-bay/medical-bay-tourism-medical.png"}
                  alt={say({
                    fr: "Campagne tourisme médical Medical Bay",
                    en: "Medical Bay medical tourism campaign",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Tourisme médical", en: "Medical tourism" })}
                </figcaption>
              </figure>
            </RevealGroup>
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

            {/* The figures. One counts once and settles; two or more sit on
                the same grid so they are read against each other. */}
            <RevealGroup
              amount={0.2}
              className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:grid-cols-1"
            >
              <div className="border-ink/12 border-t pt-6 sm:pt-7">
                <p className="font-display text-ink text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.85] font-extrabold tracking-[-0.055em]">
                  <CountUp value={"+120"} />
                </p>
                {/* Ce que le chiffre mesure : pas encore confirmé. */}
              </div>
            </RevealGroup>
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
