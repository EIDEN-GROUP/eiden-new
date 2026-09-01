"use client";

/**
 * EducazenKids, written out in full.
 *
 * This page owns its own structure and its own words. Nothing is handed in
 * by a shared case component and nothing is read out of `lib/data/projects`
 * — change the design or the copy here and it changes this case and no
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
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";

type Say = { fr: string; en: string };

const CLIENT = "EducazenKids";
const YEAR = "2024";
const CATEGORY: Say = { fr: "Éducation", en: "Education" };
const LOCATION: Say = { fr: "Agadir, Maroc", en: "Agadir, Morocco" };

/** The one deep room's ground. */
const GROUND = "#7B1FA2";

const HERO = {
  statement: {
    fr: "Que le dehors ressemble au dedans.",
    en: "Make the outside feel like the inside.",
  },
  intro: {
    fr: "Un centre qui change la vie d'enfants tous les jours, avec une présence digitale qui n'en montrait rien. Nous avons rafraîchi la marque et mis les inscriptions sur rails.",
    en: "A centre changing children's lives daily, with a digital presence that showed none of it. We refreshed the brand and put enrolment on rails.",
  },
  image: "/work/educazen-kids/educazen-hero.png",
  alt: {
    fr: "Le centre EducazenKids à Agadir",
    en: "The EducazenKids centre in Agadir",
  },
};

const REALITY: Say[] = [
  {
    fr: "Un centre qui change la vie d'enfants tous les jours.",
    en: "A centre changing children's lives every day.",
  },
  {
    fr: "Des familles qui se parlent entre elles.",
    en: "Families who talk to each other.",
  },
  {
    fr: "Un nombre de places fini, dans un rayon de vingt minutes.",
    en: "A finite number of places, within a twenty-minute radius.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Une présence digitale qui n'en montrait rien.",
    en: "A digital presence that showed none of it.",
  },
  {
    fr: "Des familles qui peinaient à trouver le centre.",
    en: "Families who struggled to find the centre.",
  },
  { fr: "Des places suivies sur papier.", en: "Places tracked on paper." },
];

const DECISION: Say = {
  fr: "Aligner la marque sur la salle, et mettre l'inscription sur un seul chemin.",
  en: "Align the brand with the room, and put enrolment on a single path.",
};

const CHAIN_TEXT: Say = {
  fr: "La refonte a fait ressembler le dehors au dedans. Le site répond aux deux questions d'un parent avant de parler du centre. Derrière lui, le CRM compte les places et ne laisse plus les relances à la mémoire de quelqu'un. Le contenu a été construit pour être reconnu une deuxième fois plutôt que vu une première. Et le payant vise une ville, pas un pays   coupé dès que les places sont prises.",
  en: "The refresh made the outside look like the inside. The site answers a parent's two questions before it talks about the centre. Behind it, the CRM counts the places and no longer leaves follow-ups to someone's memory. Content was built to be recognised a second time rather than seen a first. And the paid spend is aimed at one city, not one country   switched off the moment the places are taken.",
};

const IMPACT_TITLE: Say = {
  fr: "Du premier clic à la place confirmée.",
  en: "From the first click to the confirmed place.",
};
const IMPACT_TEXT: Say = {
  fr: "Une marque qui ressemble enfin à ce qui se passe à l'intérieur, une inscription qui tient sur un seul chemin, et une équipe qui ne court plus après l'administratif.",
  en: "A brand that finally looks like what happens inside, enrolment held on a single path, and a team no longer chasing admin.",
};

const WORK = [
  {
    image: "/work/educazen-kids/educazenkids-brand-book.png",
    alt: { fr: "Livre de marque EducazenKids", en: "EducazenKids brand book" },
  },
  {
    image: "/work/educazen-kids/educazenkids-scroll-1.png",
    alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
  },
  {
    image: "/work/educazen-kids/educazenkids-scroll-2.png",
    alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
  },
  {
    image: "/work/educazen-kids/educazenkids-scroll-3.png",
    alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
  },
  {
    image: "/work/educazen-kids/educazenkids-brand-logo-site.png",
    alt: {
      fr: "Le logo EducazenKids appliqué",
      en: "The EducazenKids logo applied",
    },
  },
  {
    image: "/work/educazen-kids/educazenkids-web.png",
    alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
  },
  {
    image: "/work/educazen-kids/educazenkids-cover.png",
    alt: { fr: "EducazenKids", en: "EducazenKids" },
  },
];

/**
 * The brand board's material.
 *
 * Colours and roles are the case's own palette; the typefaces are quoted
 * from the brand book.
 */
const BRAND = {
  ground: "#C3016C",
  contain: true,
  wordmark: "/work/educazen-kids/educazenkids-logo.png",
  wordmarkAlt: {
    fr: "Marque EducazenKids",
    en: "EducazenKids brand mark",
  },
  lead: {
    fr: "Quatre couleurs, quatre promesses — une par pièce du cœur-puzzle.",
    en: "Four colours, four promises — one for each piece of the puzzle heart.",
  },
  essence: {
    fr: "Le seul projet du portfolio où la refonte peut se montrer en comparaison : l'ancienne marque à côté de la nouvelle.",
    en: "The one project in this portfolio where the refresh can be shown as a comparison: the old mark beside the new one.",
  },
  colors: [
    {
      name: "Magenta",
      hex: "#C2185B",
      dark: true,
      role: {
        fr: "Signature",
        en: "Signature",
      },
    },
    {
      name: "Violet",
      hex: "#7B1FA2",
      dark: true,
      role: {
        fr: "Créativité",
        en: "Creativity",
      },
    },
    {
      name: "Teal",
      hex: "#00897B",
      dark: true,
      role: {
        fr: "Sérénité",
        en: "Calm",
      },
    },
    {
      name: "Or",
      hex: "#F9A825",
      dark: false,
      role: {
        fr: "Optimisme",
        en: "Optimism",
      },
    },
  ],
  type: [
    {
      name: "Nunito",
      stack: "'Nunito', ui-rounded, ui-sans-serif, system-ui, sans-serif",
      role: {
        fr: "Titres",
        en: "Titles",
      },
    },
    {
      name: "Playfair Display",
      stack: "'Playfair Display', Georgia, serif",
      role: {
        fr: "Accroches",
        en: "Pull lines",
      },
    },
    {
      name: "Quicksand",
      stack: "'Quicksand', ui-rounded, ui-sans-serif, system-ui, sans-serif",
      role: {
        fr: "Corps de texte",
        en: "Body copy",
      },
    },
  ],
  notes: [
    {
      title: {
        fr: "La pièce qui commence",
        en: "The piece that starts it",
      },
      text: {
        fr: "Le magenta porte l'énergie et la passion éducative.",
        en: "Magenta carries the energy and the teaching passion.",
      },
    },
    {
      title: {
        fr: "La neuro-diversité, en couleur",
        en: "Neurodiversity, in colour",
      },
      text: {
        fr: "Le violet dit la créativité et l'imagination.",
        en: "Violet is creativity and imagination.",
      },
    },
    {
      title: {
        fr: "Le zen du nom",
        en: "The zen in the name",
      },
      text: {
        fr: "Le teal est l'équilibre — littéralement le « zen » d'EducazenKids.",
        en: "Teal is the balance — literally the “zen” in EducazenKids.",
      },
    },
    {
      title: {
        fr: "Le potentiel",
        en: "The potential",
      },
      text: {
        fr: "L'or, c'est la lumière et l'optimisme : le progrès d'un enfant, célébré.",
        en: "Gold is light and optimism — a child's progress, marked.",
      },
    },
    {
      title: {
        fr: "Chaque pièce, un enfant",
        en: "Every piece, a child",
      },
      text: {
        fr: "Les quatre ne se hiérarchisent pas.",
        en: "None of the four outranks the others.",
      },
    },
  ],
};

const NEXT = [
  {
    slug: "lunja-village",
    client: "Lunja Village",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/lunja-village/image lunja village portfoliio.png",
  },
  {
    slug: "mabrouk",
    client: "Mabrouk Hôtel",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/mabrouk/imgg1 (18).png",
  },
];

export default function EducazenKidsPage() {
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
                  src={"/work/educazen-kids/educazen-hero.png"}
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
                  src={"/work/educazen-kids/educazenkids-brand-book.png"}
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

      {/* ══ 01 · REFONTE DE MARQUE ══════════════════════════ */}
      <section
        id={"chapter-brand-refresh"}
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
                      {say({ fr: "Refonte de marque", en: "Brand Refresh" })}
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
                    fr: "Une identité qui ressemble enfin à ce qui se passe à l'intérieur.",
                    en: "An identity that finally looks like what happens inside.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Le seul projet du portfolio où la refonte peut se montrer en comparaison : l'ancienne marque à côté de la nouvelle. Le cœur-puzzle vient du centre lui-même   quatre pièces différentes, et c'est ce qui le rend entier. Il vit seul en avatar, en favicon et en filigrane à trois pour cent, toujours sans le slogan, et jamais sur un fond sombre.",
                        en: "The one project in this portfolio where the refresh can be shown as a comparison: the old mark beside the new one. The puzzle heart came out of the centre itself   four different pieces, which is what makes it whole. It stands alone as an avatar, a favicon and a three per cent watermark, always without the strapline, and never on a dark ground.",
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
                key={"/work/educazen-kids/educazenkids-before.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/educazen-kids/educazenkids-before.png"}
                  alt={say({
                    fr: "L'identité EducazenKids avant la refonte",
                    en: "The EducazenKids identity before the refresh",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                  priority
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Avant", en: "Before" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/educazen-kids/educazenkids-after.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/educazen-kids/educazenkids-after.png"}
                  alt={say({
                    fr: "L'identité EducazenKids après la refonte",
                    en: "The EducazenKids identity after the refresh",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Après", en: "After" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/educazen-kids/educazenkids-logo.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/educazen-kids/educazenkids-logo.png"}
                  alt={say({ fr: "Logo EducazenKids", en: "EducazenKids logo" })}
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
                key={"/work/educazen-kids/educazenkids-brand-identity.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/educazen-kids/educazenkids-brand-identity.png"}
                  alt={say({
                    fr: "Identité EducazenKids",
                    en: "EducazenKids identity",
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
                {BRAND.colors.length} {say({ fr: "couleurs", en: "colours" })} ·{" "}
                {BRAND.type.length} {say({ fr: "polices", en: "typefaces" })}
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

          {/* `gap-px` over a hairline ground draws the rules — the same trick
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
                01 — {say({ fr: "Identité", en: "Identity" })}
              </span>
            </div>

            {/* ── 02 · The essence, in the case's own words ────── */}
            <div className="bg-canvas relative p-8 sm:p-10 lg:col-span-7">
              <span className="eyebrow text-ink/35">
                02 — {say({ fr: "Essence", en: "Essence" })}
              </span>
              <p className="editorial text-ink mt-5 max-w-[34ch] text-[clamp(1.125rem,2.1vw,1.5rem)] leading-snug">
                {say(BRAND.essence)}
              </p>
            </div>

            {/* ── 03 · The colour system. A swatch grows when it is
                   pointed at, so the hex reads without a legend. ───────── */}
            <div className="bg-canvas relative p-8 sm:p-10 lg:col-span-7">
              <span className="eyebrow text-ink/35">
                03 — {say({ fr: "Système colorimétrique", en: "Colour system" })}
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
                    {colour.name ? (
                      <span className="font-display text-[0.875rem] leading-none font-bold">
                        {colour.name}
                      </span>
                    ) : null}
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
            {/* ── 04 · The type, named and shown ───────────────── */}
            <div className="bg-canvas relative p-8 sm:p-10 lg:col-span-5">
              <span className="eyebrow text-ink/35">
                04 — {say({ fr: "Typographie", en: "Typography" })}
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
            {/* ── 05 · Why the colours are what they are ───────── */}
            <div className="bg-cream/70 relative p-8 sm:p-10 lg:col-span-7">
              <span className="eyebrow text-ink/35">
                05 — {say({ fr: "Le langage", en: "The language" })}
              </span>

              <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {BRAND.notes.map((note) => (
                  <div key={note.title.fr}>
                    <dt className="font-display text-ink text-[0.9375rem] leading-tight font-bold tracking-[-0.01em]">
                      {say(note.title)}
                    </dt>
                    <dd className="text-ink/55 mt-1.5 text-[0.8125rem] leading-relaxed">
                      {say(note.text)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ══ 02 · SITE WEB · CRM ══════════════════════════ */}
      <section
        id={"chapter-platform"}
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
                    fr: "Une seule route, du premier clic à la place confirmée.",
                    en: "One route, from the first click to the confirmed place.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Devant, un site qui répond aux deux questions d'un parent avant de parler du centre : est-ce qu'on prend un profil comme le sien, et combien de temps il faut attendre. Derrière, le tableau de bord où arrivent les demandes, où se comptent les places, et où les relances ne dépendent plus de la mémoire de quelqu'un.",
                        en: "In front, a site that answers a parent's two questions before it talks about the centre: is a profile like theirs taken, and how long is the wait. Behind it, the dashboard where enquiries land, places are counted, and follow-ups no longer depend on someone remembering.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>

              <Reveal delay={0.22} amount={0.3}>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  <li key={"https://educazenkids.com"}>
                    <a
                      href={"https://educazenkids.com"}
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
              className="grid gap-3 sm:grid-cols-4 sm:gap-4"
            >
              <figure
                key={"/work/educazen-kids/educazenkids-web-desktop.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/educazen-kids/educazenkids-web-desktop.png"}
                  alt={say({
                    fr: "Le site EducazenKids sur écran",
                    en: "The EducazenKids site on desktop",
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
                key={"/work/educazen-kids/educazenkids-web-mobile.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/educazen-kids/educazenkids-web-mobile.png"}
                  alt={say({
                    fr: "Le site EducazenKids sur téléphone",
                    en: "The EducazenKids site on a phone",
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
                key={"/work/educazen-kids/educazenkids-crm.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/educazen-kids/educazenkids-crm.png"}
                  alt={say({
                    fr: "Le CRM EducazenKids",
                    en: "The EducazenKids CRM",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "CRM", en: "CRM" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/educazen-kids/educazenkids-dashboard.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/educazen-kids/educazenkids-dashboard.png"}
                  alt={say({
                    fr: "Tableau de bord des inscriptions",
                    en: "The enrolment dashboard",
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
                  fr: "Une présence que les parents croisent vraiment.",
                  en: "A presence parents actually come across.",
                })}
                className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
              />

              <Reveal delay={0.14} amount={0.3}>
                <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                  {say({
                    fr: "Les familles concernées ne se trouvent pas par volume : elles se parlent entre elles, dans des groupes, autour d'une école. La présence a donc été construite pour être reconnue une deuxième fois plutôt que vue une première.",
                    en: "The families this matters to are not found by volume: they talk to each other, in groups, around a school. So the presence was built to be recognised a second time rather than seen a first.",
                  })}
                </p>
              </Reveal>
            </div>
            <RevealGroup
              amount={0.12}
              className="grid gap-3 sm:grid-cols-2 sm:gap-4"
            >
              <figure
                key={"/work/educazen-kids/educazenkids-website-banner.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/educazen-kids/educazenkids-website-banner.png"}
                  alt={say({
                    fr: "Bannière EducazenKids",
                    en: "EducazenKids banner",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Campagne", en: "Campaign" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/educazen-kids/educazenkids-application.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/educazen-kids/educazenkids-application.png"}
                  alt={say({
                    fr: "L'identité EducazenKids en situation",
                    en: "The EducazenKids identity in place",
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
                      {say({ fr: "Média payant", en: "Paid Media" })}
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
                    fr: "Un budget qui vise une ville, pas un pays.",
                    en: "A budget aimed at one city, not one country.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                      {say({
                        fr: "Le centre a un nombre de places fini et un rayon d’une vingtaine de minutes en voiture. Le payant est réglé sur cette contrainte-là : peu de portée, beaucoup d’intention, et coupé dès que les places sont prises. Les familles trouvent le centre seules, et l’équipe ne court plus après l’administratif.",
                        en: "The centre has a finite number of places and a radius of about twenty minutes by car. The paid spend is tuned to that constraint: little reach, a lot of intent, and switched off the moment the places are taken. Families find the centre on their own, and the team is no longer chasing admin.",
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

            {/* The figures. One counts once and settles; two or more sit on
                the same grid so they are read against each other. */}
            <RevealGroup
              amount={0.2}
              className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:grid-cols-1"
            >
              <div className="border-canvas/12 border-t pt-6 sm:pt-7">
                <p className="font-display text-canvas text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.85] font-extrabold tracking-[-0.055em]">
                  <CountUp value={"+62%"} />
                </p>
                {/* Ce que le chiffre mesure : pas encore confirmé. */}

                <p className="text-canvas/55 mt-4 max-w-[26ch] text-[0.9375rem] leading-relaxed">
                  {say({
                    fr: "Les familles trouvent le centre seules.",
                    en: "Families find the centre on their own.",
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
