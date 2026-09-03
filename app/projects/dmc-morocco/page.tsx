"use client";

/**
 * DMC Hospitality Morocco, written out in full.
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

const CLIENT = "DMC Hospitality Morocco";
const YEAR = "2024";
const CATEGORY: Say = { fr: "Hôtellerie", en: "Hospitality" };
const LOCATION: Say = { fr: "Maroc", en: "Morocco" };

/** The one deep room's ground. */
const GROUND = "#2C3830";

const HERO = {
  statement: {
    fr: "Trente ans d'expertise, enfin dotés d'un nom.",
    en: "Thirty years of expertise, finally given a name.",
  },
  intro: {
    fr: "Un opérateur hôtelier dont la réputation ne circulait que de bouche à oreille. Nous avons commencé à la page blanche : le nom, puis tout ce qui en découle.",
    en: "A hotel operator whose reputation travelled entirely by word of mouth. We started at the blank page: the name, then everything that follows from it.",
  },
  image: "/work/dmc-morocco/dmc-hero.png",
  alt: {
    fr: "Univers de marque DMC Hospitality Morocco",
    en: "The DMC Hospitality Morocco brand world",
  },
};

const REALITY: Say[] = [
  {
    fr: "Trois décennies de gestion hôtelière.",
    en: "Three decades of hospitality management.",
  },
  {
    fr: "Une réputation solide à l'intérieur du métier.",
    en: "A solid reputation inside the trade.",
  },
  {
    fr: "Un marché de quelques centaines de personnes, qui se connaissent toutes.",
    en: "A market of a few hundred people who all know each other.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Pas de marque, pas de site, pas de voix.",
    en: "No brand, no site, no voice.",
  },
  {
    fr: "Une expertise qui ne circulait que de bouche à oreille.",
    en: "Expertise that only ever travelled by word of mouth.",
  },
  {
    fr: "Chaque contrat commencé par un appel passé par la maison.",
    en: "Every contract started by a call the business made.",
  },
];

const DECISION: Say = {
  fr: "Construire le nom et le visage que l'expertise avait déjà mérités.",
  en: "Build the name and the face the expertise had already earned.",
};

const CHAIN_TEXT: Say = {
  fr: "Le positionnement a réduit trente ans de métier à ce qu'un concurrent ne peut pas recopier sans mentir. La marque   nom, monogramme, règles   lui a donné un visage. Le site a été écrit pour des propriétaires plutôt que pour des voyageurs. Et la voix LinkedIn tient cette position devant un public de pairs, jusqu'à ce que ce soit le propriétaire qui écrive le premier.",
  en: "Positioning reduced thirty years of trade to what a competitor could not copy without lying. The brand   name, monogram, rules   gave it a face. The site was written for owners rather than for guests. And the LinkedIn voice holds that position in front of a room of peers, until it is the owner who writes first.",
};

const IMPACT_TITLE: Say = {
  fr: "Le premier propriétaire qui écrit le premier.",
  en: "The first owner who writes first.",
};
const IMPACT_TEXT: Say = {
  fr: "Une marque qui se présente elle-même, un site adressé à ceux qui achètent la gestion, et une voix que le marché reconnaît.",
  en: "A brand that introduces itself, a site addressed to the people who buy management, and a voice the market recognises.",
};

const WORK = [
  {
    image: "/work/dmc-morocco/dmc-brand-card.png",
    alt: { fr: "Carte de visite DMC", en: "DMC business card" },
  },
  {
    image: "/work/dmc-morocco/dmc-guidelines-hero.png",
    alt: { fr: "Charte graphique DMC", en: "DMC brand guidelines" },
  },
  {
    image: "/work/dmc-morocco/dmc-brand-posters.png",
    alt: { fr: "Affiches DMC", en: "DMC posters" },
  },
  {
    image: "/work/dmc-morocco/dmc-hero-2.png",
    alt: { fr: "Univers de marque DMC", en: "The DMC brand world" },
  },
  {
    image: "/work/dmc-morocco/dmc-portfolio-image.png",
    alt: { fr: "Supports DMC", en: "DMC collateral" },
  },
  {
    image: "/work/dmc-morocco/dmc-cover.png",
    alt: { fr: "DMC Hospitality Morocco", en: "DMC Hospitality Morocco" },
  },
  {
    image: "/work/dmc-morocco/dmc-alt.png",
    alt: { fr: "Affiches de marque DMC", en: "DMC brand posters" },
  },
  {
    image: "/work/dmc-morocco/dmc.png",
    alt: { fr: "DMC Hospitality Morocco", en: "DMC Hospitality Morocco" },
  },
];

/**
 * The brand board's material.
 *
 * Colours and roles are the case's own palette; the typefaces are quoted
 * from the brand book.
 */
const BRAND = {
  ground: "#141c19",
  contain: false,
  wordmark: "/work/dmc-morocco/dmc-brand-logo.png",
  wordmarkAlt: {
    fr: "Marque DMC Hospitality Morocco",
    en: "DMC Hospitality Morocco brand mark",
  },
  lead: {
    fr: "Une marque adressée à des opérateurs : elle doit être crue avant d'être aimée.",
    en: "A brand addressed to operators: it has to be believed before it is liked.",
  },
  essence: {
    fr: "Monogramme, système typographique et livre de règles   puis reportés sur les objets que la société met réellement entre les mains des gens : une carte, une tenue, un dossier.",
    en: "Monogram, typographic system and a guidelines book   then carried onto the things the company actually hands people: a card, a uniform, a dossier.",
  },
  colors: [
    {
      name: "Forêt",
      hex: "#3D4F44",
      dark: true,
      role: {
        fr: "Fondation",
        en: "Foundation",
      },
    },
    {
      name: "Or",
      hex: "#D4B896",
      dark: false,
      role: {
        fr: "Signature",
        en: "Signature",
      },
    },
    {
      name: "Sable Doré",
      hex: "#E8D5B5",
      dark: false,
      role: {
        fr: "Fond clair",
        en: "Light ground",
      },
    },
    {
      name: "Encre",
      hex: "#1A1F1C",
      dark: true,
      role: {
        fr: "Ancrage",
        en: "Anchor",
      },
    },
  ],
  type: [
    {
      name: "Playfair Display",
      stack: "'Playfair Display', Georgia, serif",
      role: {
        fr: "Titres et signature",
        en: "Titles and signature",
      },
    },
    {
      name: "Libre Baskerville",
      stack: "'Libre Baskerville', Georgia, serif",
      role: {
        fr: "Textes longs",
        en: "Long-form text",
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
        fr: "L'assise",
        en: "The footing",
      },
      text: {
        fr: "Un vert sourd, sans éclat.",
        en: "A muted green with no shine to it.",
      },
    },
    {
      title: {
        fr: "Trente ans, sans le dire",
        en: "Thirty years, unsaid",
      },
      text: {
        fr: "L'or n'est pas décoratif ici.",
        en: "The gold is not decoration.",
      },
    },
    {
      title: {
        fr: "Le repos de l'œil",
        en: "Where the eye rests",
      },
      text: {
        fr: "Le sable tient les documents longs : dossiers, présentations, propositions.",
        en: "Sand carries the long documents   decks, proposals, dossiers.",
      },
    },
    {
      title: {
        fr: "Ce qui se lit",
        en: "What gets read",
      },
      text: {
        fr: "L'encre garde la lisibilité là où le vert ne suffit pas.",
        en: "Ink holds legibility where the green cannot.",
      },
    },
    {
      title: {
        fr: "Une maison qui se présente",
        en: "A business that introduces itself",
      },
      text: {
        fr: "Ensemble, ces quatre tons donnent à une expertise longtemps invisible un visage qu'un directeur d'hôtel reconnaît en trois secondes.",
        en: "Together the four give a long-invisible expertise a face a hotel director recognises in three seconds.",
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
    colorIndex: [0, 1, 2, 3, 1][index] ?? 0,
  })),
};

const NEXT = [
  {
    slug: "educazen-kids",
    client: "EducazenKids",
    category: { fr: "Éducation", en: "Education" },
    image: "/work/educazen-kids/educazen-hero.png",
  },
  {
    slug: "lunja-village",
    client: "Lunja Village",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/lunja-village/image lunja village portfoliio.png",
  },
];

export default function DmcMoroccoPage() {
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
                  src={"/work/dmc-morocco/dmc-hero.png"}
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
                  src={"/work/dmc-morocco/dmc-brand-card.png"}
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

      {/* ══ 01 · CRÉATION DE MARQUE ══════════════════════════ */}
      <section
        id={"chapter-brand-creation"}
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
                      {say({ fr: "Création de marque", en: "Brand Creation" })}
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
                    fr: "Le nom, l'identité et les règles qui vont avec, à partir de rien.",
                    en: "Name, identity and the rules that go with them, from nothing.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Monogramme, système typographique et livre de règles   puis reportés sur les objets que la société met réellement entre les mains des gens : une carte, une tenue, un dossier. Playfair pour le nom, Cormorant pour ce qui se cite, Source Sans pour ce qui se lit longtemps : une maison qui a travaillé pour Hyatt, ACCOR et One&Only devait se présenter au même niveau.",
                        en: "Monogram, typographic system and a guidelines book   then carried onto the things the company actually hands people: a card, a uniform, a dossier. Playfair for the name, Cormorant for what gets quoted, Source Sans for what gets read at length: a business that has worked for Hyatt, ACCOR and One&Only had to introduce itself at the same level.",
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
                key={"/work/dmc-morocco/dmc-brand-logo.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/dmc-morocco/dmc-brand-logo.png"}
                  alt={say({ fr: "Monogramme DMC", en: "DMC monogram" })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                  priority
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Monogramme", en: "Monogram" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/dmc-morocco/dmc-brand-logo-mark.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/dmc-morocco/dmc-brand-logo-mark.png"}
                  alt={say({
                    fr: "Logo DMC Hospitality Morocco",
                    en: "DMC Hospitality Morocco logo",
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
                key={"/work/dmc-morocco/dmc-guidelines.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/dmc-morocco/dmc-guidelines.png"}
                  alt={say({
                    fr: "Charte graphique DMC Hospitality Morocco",
                    en: "DMC Hospitality Morocco brand guidelines",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Charte", en: "Guidelines" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/dmc-morocco/dmc-brand-uniform.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/dmc-morocco/dmc-brand-uniform.png"}
                  alt={say({
                    fr: "Tenue aux couleurs de DMC",
                    en: "Uniform in the DMC identity",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Application", en: "Application" })}
                </figcaption>
              </figure>
            </RevealGroup>
          </SlideIn>
        </div>

        <div className="container-eiden pb-24 sm:pb-28 lg:pb-32">
          <SlideIn from={"left"} className="relative">
            <div className="max-w-4xl lg:order-2">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5">
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({ fr: "Positionnement", en: "Positioning" })}
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
                    fr: "Trente ans de métier, énoncés simplement.",
                    en: "Thirty years of know-how, stated plainly.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                      {say({
                        fr: "Le plus dur n'était pas de trouver quoi dire, mais d'accepter d'en dire moins. Une phrase sur ce que la maison fait, une sur pour qui, une sur ce qui change   et rien qu'un concurrent puisse recopier sans mentir.",
                        en: "The hard part was not finding something to say but agreeing to say less. One line on what the business does, one on who for, one on what changes   and nothing a competitor could copy without lying.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
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
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-brand)] group-hover/id:scale-[1.04] motion-reduce:transition-none"
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
      <CasePaletteStory story={PALETTE} skin={TONES.canvas} />

      {/* ══ 02 · SITE WEB ══════════════════════════ */}
      <section
        id={"chapter-website"}
        data-nav-tone="light"
        className="bg-cream text-ink relative scroll-mt-24"
      >
        <div className="container-eiden pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
          <SlideIn
            from={"right"}
            className="relative grid gap-3 sm:grid-cols-2 sm:gap-4 lg:items-center"
          >
            <div className="max-w-4xl">
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

              <RevealWords
                as="h2"
                amount={0.3}
                delay={0.05}
                text={say({
                  fr: "Écrit pour des opérateurs et des propriétaires, pas pour des voyageurs.",
                  en: "Written for operators and owners, not for guests.",
                })}
                className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
              />

              <Reveal delay={0.14} amount={0.3}>
                <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                  {say({
                    fr: "Un site d'hôtellerie qui ne montre pas de chambres. Celui qui le lit possède déjà le bâtiment : ce qu'il cherche, c'est ce que trente ans de gestion changent à son compte d'exploitation.",
                    en: "A hospitality site that shows no bedrooms. Whoever is reading it already owns the building: what they are looking for is what thirty years of management does to their operating account.",
                  })}
                </p>
              </Reveal>

              <Reveal delay={0.22} amount={0.3}>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  <li key={"https://dmchm.com"}>
                    <a
                      href={"https://dmchm.com"}
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
              className="grid gap-3 sm:grid-cols-2 sm:gap-4"
            >
              <figure
                key={"/work/dmc-morocco/dmc-web-desktop.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/dmc-morocco/dmc-web-desktop.png"}
                  alt={say({
                    fr: "Le site DMC sur écran",
                    en: "The DMC site on desktop",
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
                key={"/work/dmc-morocco/dmc-web-mobile.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/dmc-morocco/dmc-web-mobile.png"}
                  alt={say({
                    fr: "Le site DMC sur téléphone",
                    en: "The DMC site on a phone",
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
            </RevealGroup>
          </SlideIn>
        </div>
      </section>

      {/* ══ 03 · CONTENU ══════════════════════════ */}
      <section
        id={"chapter-content"}
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
                      {say({ fr: "Contenu", en: "Content" })}
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
                    fr: "Une voix LinkedIn que le marché reconnaît.",
                    en: "A LinkedIn voice the market recognises.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Le public tient dans quelques centaines de personnes, et elles se connaissent toutes. La publication est donc écrite comme on parle à un pair : un sujet du métier, une position tenue, et aucune promesse que la maison ne tient pas déjà.",
                        en: "The audience is a few hundred people and they all know each other. So the posting is written the way you talk to a peer: one subject from the trade, one position held, and no promise the business is not already keeping.",
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
                key={"/work/dmc-morocco/dmc-social-excellence.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/dmc-morocco/dmc-social-excellence.png"}
                  alt={say({
                    fr: "Publication sociale DMC",
                    en: "DMC social post",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Social", en: "Social" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/dmc-morocco/dmc-social-c.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/dmc-morocco/dmc-social-c.png"}
                  alt={say({
                    fr: "Publication sociale DMC",
                    en: "DMC social post",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Social", en: "Social" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/dmc-morocco/dmc-social-d.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/dmc-morocco/dmc-social-d.png"}
                  alt={say({
                    fr: "Publication sociale DMC",
                    en: "DMC social post",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Social", en: "Social" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/dmc-morocco/dmc-social-m.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/dmc-morocco/dmc-social-m.png"}
                  alt={say({
                    fr: "Publication sociale DMC",
                    en: "DMC social post",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Social", en: "Social" })}
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
                  <CountUp value={"0 → 1"} />
                </p>

                <p className="border-ink/25 text-ink/80 font-label mt-5 inline-flex rounded-full border px-4 py-1.5 text-[0.66rem] font-bold tracking-[0.14em] uppercase">
                  {say({ fr: "Contacts entrants", en: "Inbound enquiries" })}
                </p>

                <p className="text-ink/55 mt-4 max-w-[26ch] text-[0.9375rem] leading-relaxed">
                  {say({
                    fr: "D'aucun contact entrant à une présence qui en amène.",
                    en: "From no inbound at all to a presence that brings it.",
                  })}
                </p>
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
