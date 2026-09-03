"use client";

/**
 * Bôpassage, written out in full.
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

const CLIENT = "Bôpassage";
const YEAR = "2024";
const CATEGORY: Say = { fr: "Cafés & restaurants", en: "Cafés & Restaurants" };
const LOCATION: Say = { fr: "Agadir, Maroc", en: "Agadir, Morocco" };

/** The one deep room's ground. */
const GROUND = "#18312e";

const HERO = {
  statement: {
    fr: "Le lieu où l'on revient toujours.",
    en: "The place you always come back to.",
  },
  intro: {
    fr: "Un café-restaurant de Founty qui avait tout, sauf de quoi se faire trouver. Nous avons construit la marque, le site et le rythme qui portent le lieu au-delà de sa porte.",
    en: "A Founty café-restaurant that had everything except a way to be found. We built the brand, the site and the rhythm that carry the place past its own door.",
  },
  image: "/work/bopassage/bopassage-hero.png",
  alt: {
    fr: "La salle de Bôpassage à Agadir",
    en: "The Bôpassage dining room in Agadir",
  },
};

const REALITY: Say[] = [
  {
    fr: "Une salle qui a déjà son ambiance.",
    en: "A room that already has its own atmosphere.",
  },
  { fr: "Des clients qui reviennent.", en: "Guests who come back." },
  {
    fr: "Un quartier qui passe devant la porte.",
    en: "A neighbourhood that walks past the door.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "L'ambiance s'arrêtait à la porte.",
    en: "The atmosphere stopped at the front door.",
  },
  {
    fr: "Pas de site : ni carte, ni adresse, ni réservation.",
    en: "No site: no menu, no address, no booking.",
  },
  {
    fr: "Pas de présence sociale régulière.",
    en: "No consistent social presence.",
  },
  {
    fr: "Rien de payant, et donc aucune découverte.",
    en: "Nothing paid, and so no discovery.",
  },
];

const DECISION: Say = {
  fr: "Prendre ce que la salle fait ressentir, et construire vers l'extérieur à partir de là.",
  en: "Take what the room feels like, and build outward from it.",
};

const CHAIN_TEXT: Say = {
  fr: "La marque a fixé la chaleur et la lumière de la salle en système. Le site répond aux deux seules questions qu'on pose à un restaurant : où, et quand. Le contenu a donné à l'équipe un rythme qu'elle peut tenir seule. Le payant est allé chercher l'intention plutôt que l'audience. Et l'ensemble est réglé chaque mois sur une seule mesure : les couverts servis.",
  en: "The brand fixed the room's warmth and light into a system. The site answers the only two questions anyone asks a restaurant: where, and when. Content gave the team a rhythm it can hold on its own. Paid media went after intent rather than audience. And all of it is retuned every month against one measure: covers served.",
};

const IMPACT_TITLE: Say = {
  fr: "La marque se lit de la même façon sur un écran et à table.",
  en: "The brand reads the same on a screen as it does at the table.",
};
const IMPACT_TEXT: Say = {
  fr: "Une identité tirée de la salle elle-même, un site construit pour le téléphone, et un rythme payant qui continue de tourner entre deux visites.",
  en: "An identity taken from the room itself, a site built for the phone, and a paid rhythm that keeps working between visits.",
};

const WORK = [
  {
    image: "/work/bopassage/bopassage-brand-board.png",
    alt: { fr: "Planche de marque Bôpassage", en: "Bôpassage brand board" },
  },
  {
    image: "/work/bopassage/bopassage-brand-logo-green.png",
    alt: {
      fr: "Logo Bôpassage en or sur forêt",
      en: "Bôpassage logo in gold on forest",
    },
  },
  {
    image: "/work/bopassage/bopassage-brand-palette.png",
    alt: { fr: "Palette Bôpassage", en: "Bôpassage palette" },
  },
  {
    image: "/work/bopassage/bopassage-social-savory-morning.png",
    alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
  },
  {
    image: "/work/bopassage/bopassage-social-balance.png",
    alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
  },
  {
    image: "/work/bopassage/bopassage-social-slows-down.png",
    alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
  },
  {
    image: "/work/bopassage/bopassage-brand-logo-mark.png",
    alt: { fr: "Le monogramme Bôpassage", en: "The Bôpassage monogram" },
  },
  {
    image: "/work/bopassage/bopassage-web.png",
    alt: { fr: "Le site Bôpassage", en: "The Bôpassage site" },
  },
];

/**
 * The brand board's material.
 *
 * Colours and roles come from the case's own palette; the typefaces come from
 * the Bôpassage brand book. `dark` says whether a swatch needs light text on
 * it, which is a fact about the colour rather than a style choice. The type is
 * specimened in a category-matched stack   the real faces are named but not
 * loaded, so eleven case pages do not drag twenty webfonts behind them.
 */
const BRAND = {
  /* Forêt Mid, out of the brand book, and not the deeper Forêt used elsewhere:
     it is sampled from the wordmark plate's own background so the picture sits
     in the cell with no seam around it. */
  ground: "#1e3b37",
  wordmark: "/work/bopassage/bopassage-brand-logo-green.png",
  wordmarkAlt: {
    fr: "Logotype Bôpassage",
    en: "Bôpassage wordmark",
  },
  lead: {
    fr: "Deux couleurs suffisent à reconnaître Bôpassage avant d'avoir lu son nom.",
    en: "Two colours are enough to recognise Bôpassage before its name has been read.",
  },
  essence: {
    fr: "La chaleur botanique et la lumière dorée, fixées en système.",
    en: "Botanical warmth and golden-hour light, fixed into a system.",
  },
  colors: [
    {
      name: "Forêt",
      hex: "#18312e",
      dark: true,
      role: { fr: "Fondation", en: "Foundation" },
    },
    {
      name: "Ivoire",
      hex: "#f5eedf",
      dark: false,
      role: { fr: "Fond clair", en: "Light ground" },
    },
    {
      name: "Or du Café",
      hex: "#b8973a",
      dark: false,
      role: { fr: "Caractère", en: "Character" },
    },
    {
      name: "Or Doux",
      hex: "#d4b06a",
      dark: false,
      role: { fr: "Textes & légendes", en: "Text & captions" },
    },
    {
      name: "Sauge",
      hex: "#6b8c74",
      dark: false,
      role: { fr: "Botanique", en: "Botanical" },
    },
  ],
  type: [
    {
      name: "Playfair Display",
      stack: "'Playfair Display', Georgia, serif",
      role: { fr: "Les titres et la carte", en: "Titles and the menu" },
    },
    {
      name: "Montserrat",
      stack: "'Montserrat', ui-sans-serif, system-ui, sans-serif",
      role: { fr: "Ce qui oriente", en: "Whatever has to direct" },
    },
    {
      name: "Cormorant Garamond",
      stack: "'Cormorant Garamond', Georgia, serif",
      role: { fr: "Étiquettes et légendes", en: "Labels and captions" },
    },
  ],
  notes: [
    {
      title: { fr: "La salle, d'abord", en: "The room, first" },
      text: {
        fr: "Le vert profond ne vient pas d'une palette : il vient des plantes et de la lumière basse du soir.",
        en: "The deep green did not come from a palette. It came from the plants and the low evening light.",
      },
    },
    {
      title: { fr: "De quoi respirer", en: "Room to breathe" },
      text: {
        fr: "La crème donne au vert de quoi tenir. Sans elle l'identité serait un bloc.",
        en: "The cream gives the green something to hold against. Without it the identity would be one block.",
      },
    },
    {
      title: { fr: "Le caractère", en: "The character" },
      text: {
        fr: "L'or est réservé au logotype et à ce qui compte vraiment. C'est le seul endroit où la marque hausse la voix.",
        en: "Gold is kept for the wordmark and for what actually matters. It is the one place the brand raises its voice.",
      },
    },
    {
      title: { fr: "L'heure dorée", en: "Golden hour" },
      text: {
        fr: "La nuance claire porte la lumière de fin de journée là où l'or plein serait trop lourd.",
        en: "The lighter tone carries the late light where full gold would sit too heavy.",
      },
    },
    {
      title: { fr: "Un lieu, pas une charte", en: "A place, not a chart" },
      text: {
        fr: "Les trois ensemble se reconnaissent sur une tasse comme sur une enseigne.",
        en: "The three together are recognisable on a cup and on a sign.",
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
    slug: "dmc-morocco",
    client: "DMC Hospitality Morocco",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/dmc-morocco/dmc-hero.png",
  },
  {
    slug: "educazen-kids",
    client: "EducazenKids",
    category: { fr: "Éducation", en: "Education" },
    image: "/work/educazen-kids/educazen-hero.png",
  },
];

export default function BopassagePage() {
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
                  src={"/work/bopassage/bopassage-hero.png"}
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
                  src={"/work/bopassage/bopassage-brand-board.png"}
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

      {/* ══ 01 · BRANDING ══════════════════════════ */}
      <section
        id={"chapter-branding"}
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
                    fr: "Forêt & Or, une identité tirée de la salle elle-même.",
                    en: "Forêt & Or, an identity drawn from the room itself.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "La chaleur botanique et la lumière dorée, fixées en système : le vert forêt installe l'ambiance, l'or du café donne le caractère, et les deux suffisent à reconnaître la marque partout. Playfair pour les titres et la carte, Montserrat pour ce qui oriente, et des applications de la tasse à l'enseigne.",
                        en: "Botanical warmth and golden-hour light, fixed into a system: the forest green sets the room, the coffee gold gives it its character, and the two are enough to recognise the brand anywhere. Playfair for the titles and the menu, Montserrat for whatever has to direct, and applications from the cup to the sign.",
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
                key={"/work/bopassage/bopassage-brand-logo-green.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/bopassage/bopassage-brand-logo-green.png"}
                  alt={say({
                    fr: "Logotype principal et secondaire de Bôpassage",
                    en: "Bôpassage primary and secondary wordmark",
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
                key={"/work/bopassage/bopassage-brand-cup.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/bopassage/bopassage-brand-cup.png"}
                  alt={say({
                    fr: "Tasse aux couleurs de Bôpassage",
                    en: "Cup in the Bôpassage colours",
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
              <figure
                key={"/work/bopassage/bopassage-brand-signage.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/bopassage/bopassage-brand-signage.png"}
                  alt={say({
                    fr: "Signalétique extérieure de Bôpassage",
                    en: "Bôpassage exterior signage",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Enseigne", en: "Signage" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/bopassage/bopassage-brand-identity.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/bopassage/bopassage-brand-identity.png"}
                  alt={say({
                    fr: "Système d'identité Bôpassage",
                    en: "Bôpassage identity system",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Système", en: "System" })}
                </figcaption>
              </figure>
            </RevealGroup>
          </SlideIn>
        </div>

        {/* ══ LA PLANCHE DE MARQUE ═══════════════════════════════════
            The brand read as a board rather than as a scroll: one ruled grid,
            every cell numbered, the way a brand book opens. The colours in it
            belong to the client and not to EIDEN, so the identity cell is set
            on the brand's own ground and the swatches are the brand's own  
            the page around it stays in the portfolio's language.

            Only the type names are new here; everything else is the copy the
            case already carried. */}
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


          {/* The board. `gap-px` over a hairline ground draws the rules, which
              is the same trick the sectors grid uses on the clients page. */}
          <RevealGroup
            amount={0.1}
            className="bg-ink/12 mt-8 grid gap-px overflow-hidden rounded-[1.25rem] border border-black/10 sm:mt-10 sm:rounded-[1.75rem] lg:grid-cols-12"
          >
            {/* ── 01 · Identity, full bleed ─────────────────────────
                The wordmark plate carries the brand's own ground inside the
                picture, so it fills the cell rather than floating on a colour
                that would swallow it. The ground behind is the same forest,
                which is what shows while the image is still on its way. */}
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

            {/* ── 02 · The essence, in the case's own words ────────── */}
            <div className="bg-canvas relative p-8 sm:p-10 lg:col-span-7">
              <span className="eyebrow text-ink/35">
                02   {say({ fr: "Essence", en: "Essence" })}
              </span>
              <p className="editorial text-ink mt-5 max-w-[34ch] text-[clamp(1.125rem,2.1vw,1.5rem)] leading-snug">
                {say(BRAND.essence)}
              </p>
            </div>

            {/* ── 03 · The type, named and shown ───────────────────── */}
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
                  fr: "La carte, l'adresse et la réservation à un pouce de distance.",
                  en: "Menu, address and booking, a thumb away.",
                })}
                className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
              />

              <Reveal delay={0.14} amount={0.3}>
                <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                  {say({
                    fr: "Les gens qui cherchent un restaurant posent deux questions : où, et quand. Le site répond aux deux avant tout le reste, et il est construit pour le téléphone parce que c'est là qu'on décide, debout, dix minutes avant de partir.",
                    en: "People looking for a restaurant ask two questions: where, and when. The site answers both before anything else, and it is built for the phone because that is where the decision is made, standing up, ten minutes before leaving.",
                  })}
                </p>
              </Reveal>

              <Reveal delay={0.22} amount={0.3}>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  <li key={"https://bopassage.com"}>
                    <a
                      href={"https://bopassage.com"}
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
                key={"/work/bopassage/bopassage-web-desktop.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/bopassage/bopassage-web-desktop.png"}
                  alt={say({
                    fr: "Page d'accueil du site Bôpassage",
                    en: "The Bôpassage homepage",
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
                key={"/work/bopassage/bopassage-web-mobile.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/bopassage/bopassage-web-mobile.png"}
                  alt={say({
                    fr: "Le site Bôpassage sur téléphone",
                    en: "The Bôpassage site on a phone",
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

      {/* ══ 03 · MARKETING ══════════════════════════ */}
      <section
        id={"chapter-marketing"}
        data-nav-tone="light"
        className="bg-canvas text-ink relative scroll-mt-24"
      >
        <div className="container-eiden pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
          <SlideIn
            from={"right"}
            className="relative grid gap-3 sm:grid-cols-2 sm:gap-4 lg:items-center"
          >
            <div className="max-w-4xl">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5">
                  <span className="eyebrow text-teal mr-1 tabular-nums">03</span>
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({ fr: "Marketing", en: "Marketing" })}
                    </span>
                  </span>
                </div>
              </Reveal>

              <RevealWords
                as="h2"
                amount={0.3}
                delay={0.05}
                text={say({
                  fr: "Un rythme social que l'équipe peut tenir.",
                  en: "A social rhythm the team can hold.",
                })}
                className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
              />

              <Reveal delay={0.14} amount={0.3}>
                <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                  {say({
                    fr: "Pas une campagne de lancement, un rythme : des formats que la salle sait produire elle-même, un matin, un plat, une lumière. C'est ce qui fait qu'un compte est encore vivant six mois plus tard.",
                    en: "Not a launch campaign, a rhythm: formats the room can produce on its own   a morning, a plate, a light. That is what makes an account still alive six months later.",
                  })}
                </p>
              </Reveal>
            </div>
            <RevealGroup
              amount={0.12}
              className="grid gap-3 sm:grid-cols-2 sm:gap-4"
            >
              <figure
                key={"/work/bopassage/bopassage-social-matcha.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/bopassage/bopassage-social-matcha.png"}
                  alt={say({
                    fr: "Publication sociale Bôpassage",
                    en: "Bôpassage social post",
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
                key={"/work/bopassage/bopassage-social-instagram.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/bopassage/bopassage-social-instagram.png"}
                  alt={say({
                    fr: "Profil Instagram Bôpassage",
                    en: "Bôpassage Instagram profile",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Profil", en: "Profile" })}
                </figcaption>
              </figure>
            </RevealGroup>
          </SlideIn>
        </div>

        <div className="container-eiden pb-24 sm:pb-28 lg:pb-32">
          <SlideIn
            from={"left"}
            className="relative grid gap-3 sm:grid-cols-2 sm:gap-8 lg:items-center"
          >
            <RevealGroup amount={0.12}>
              <figure
                key={"/work/bopassage/bopassage-application.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/bopassage/bopassage-application.png"}
                  alt={say({
                    fr: "Affichage extérieur Bôpassage",
                    en: "Bôpassage out-of-home poster",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Affichage", en: "Out of home" })}
                </figcaption>
              </figure>
            </RevealGroup>
            <div className="lg:order-2">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5">
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({ fr: "Revenu", en: "Revenue" })}
                    </span>
                    <span
                      aria-hidden
                      className="h-3 w-px translate-y-0.5 bg-current opacity-25"
                    />
                    <span className="eyebrow text-ink">
                      {say({ fr: "Média payant", en: "Paid Media" })}
                    </span>
                  </span>
                </div>
              </Reveal>

              <RevealWords
                as="h2"
                amount={0.3}
                delay={0.05}
                text={say({
                  fr: "Une seule mesure : les couverts.",
                  en: "One measure: covers.",
                })}
                className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
              />

              <Reveal delay={0.14} amount={0.3}>
                <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                  {say({
                    fr: "Google Ads sur l’intention plutôt que sur l’audience, de l’affichage là où le quartier passe, et le tout réglé chaque mois sur ce que la salle a réellement servi. La découverte se transforme en réservation, et le rythme payant continue de tourner entre deux visites.",
                    en: "Google Ads on intent rather than on audience, out-of-home where the neighbourhood actually walks, and all of it retuned every month against what the room actually served. Discovery turns into reservations, and the paid rhythm keeps working between visits.",
                  })}
                </p>
              </Reveal>
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

            {/* The figures. One counts once and settles; two or more sit on
                the same grid so they are read against each other. */}
            <RevealGroup
              amount={0.2}
              className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:grid-cols-1"
            >
              <div className="border-ink/12 border-t pt-6 sm:pt-7">
                <p className="font-display text-ink text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.85] font-extrabold tracking-[-0.055em]">
                  <CountUp value={"×3"} />
                </p>

                <p className="border-ink/25 text-ink/80 font-label mt-5 inline-flex rounded-full border px-4 py-1.5 text-[0.66rem] font-bold tracking-[0.14em] uppercase">
                  {say({ fr: "Les couverts servis", en: "Covers served" })}
                </p>

                <p className="text-ink/55 mt-4 max-w-[26ch] text-[0.9375rem] leading-relaxed">
                  {say({
                    fr: "La découverte se transforme en réservation.",
                    en: "Discovery turns into reservations.",
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
