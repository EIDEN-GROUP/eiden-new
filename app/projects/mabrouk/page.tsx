"use client";

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

const CLIENT = "Mabrouk Hôtel";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Hôtellerie", en: "Hospitality" };

/** The one deep room's ground. */
const GROUND = "#2A211B";

const HERO = {
  statement: {
    fr: "Une maison qui se reconnaît à sa lumière.",
    en: "A house you recognise by its light.",
  },
  intro: {
    fr: "Un hôtel dont tout le caractère est dans la matière   le laiton, le bois, le velours   et dont rien de tout cela n'arrivait jusqu'au client avant sa réservation. Nous avons reconstruit la marque autour de ce que la maison est déjà.",
    en: "A hotel whose whole character is in its materials   brass, wood, velvet   and none of which reached a guest before they booked. We rebuilt the brand around what the house already is.",
  },
  image: "/work/mabrouk/imgg1 (18).png",
  alt: {
    fr: "L'escalier du Mabrouk Hôtel sous ses lanternes de laiton",
    en: "The Mabrouk Hôtel staircase under its brass lanterns",
  },
};

const REALITY: Say[] = [
  {
    fr: "Un bâtiment qui a tout son caractère : le laiton, le bois, le velours.",
    en: "A building with all its character: brass, wood, velvet.",
  },
  {
    fr: "Une lumière qui n'appartient qu'à cette maison.",
    en: "A light that belongs to this house alone.",
  },
  {
    fr: "Des clients qui repartent en parlant du calme et de l'accueil.",
    en: "Guests who leave talking about the quiet and the welcome.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Rien de tout cela n'arrivait au client avant sa réservation.",
    en: "None of it reached a guest before they booked.",
  },
  {
    fr: "Ni photographie, ni ton, ni direction.",
    en: "No photography, no tone, no direction.",
  },
  {
    fr: "Un marché qui ne vend que des étoiles et des équipements.",
    en: "A market that sells nothing but stars and amenities.",
  },
];

const DECISION: Say = {
  fr: "Partir de la matière et de la lumière plutôt que de la catégorie.",
  en: "Start from the materials and the light rather than from the category.",
};

const CHAIN_TEXT: Say = {
  fr: "Le positionnement a laissé la liste d'équipements aux comparateurs et écrit ce qu'un client raconte réellement en repartant. La marque a relevé la palette et la lumière sur le bâtiment lui-même. La photographie montre la maison à l'heure où elle est le plus elle-même. Et l'offre comme la dépense ont été réglées séparément sur la haute saison et sur le reste de l'année, dirigées vers la réservation directe plutôt que vers les plateformes.",
  en: "Positioning left the amenity list to the comparison sites and wrote down what a guest actually tells people afterwards. The brand took its palette and its light off the building itself. The photography shows the house at the hour it is most itself. And the offer and the spend were tuned separately against high season and against the rest of the year, pointed at direct booking rather than at the platforms.",
};

const IMPACT_TITLE: Say = {
  fr: "Un hôtel qui ressemble enfin à ce qu'il fait ressentir.",
  en: "A hotel that finally looks like what it feels like.",
};
const IMPACT_TEXT: Say = {
  fr: "Une marque tirée du bâtiment plutôt que de sa catégorie, une photographie qui montre la maison à son heure, et un positionnement qui laisse la liste d'équipements aux comparateurs.",
  en: "A brand taken from the building rather than from its category, photography that shows the house at its own hour, and a position that leaves the amenity list to the comparison sites.",
};

const WORK = [
  {
    image: "/work/mabrouk/imgg1 (2).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (13).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (14).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (15).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (21).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (22).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (23).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (24).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (25).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (26).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (27).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (32).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (44).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (50).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (56).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
  {
    image: "/work/mabrouk/imgg1 (9).png",
    alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
  },
];

const BRAND = {
  ground: "#141c19",
  contain: false,
  wordmark: "/work/mabrouk/imgg1 (1).png",
  wordmarkAlt: {
    fr: "Marque Mabrouk Hôtel",
    en: "Mabrouk Hôtel brand mark",
  },
  lead: {
    fr: "Quatre tons relevés sur le bâtiment, et pas un choisi dans un nuancier.",
    en: "Four tones taken off the building, and not one of them picked from a swatch book.",
  },
  essence: {
    fr: "Rien n'a été inventé : la palette, la lumière et la matière sont relevées sur le bâtiment lui-même   l'accueil, l'escalier, les lanternes, les claustras.",
    en: "Nothing was invented: the palette, the light and the materials were taken off the building itself   the desk, the staircase, the lanterns, the fretwork.",
  },
  colors: [
    {
      name: "Laiton",
      hex: "#B08D57",
      dark: false,
      role: {
        fr: "Signature",
        en: "Signature",
      },
    },
    {
      name: "Grenat",
      hex: "#6E2230",
      dark: true,
      role: {
        fr: "Accent",
        en: "Accent",
      },
    },
    {
      name: "Sable",
      hex: "#E9DDCB",
      dark: false,
      role: {
        fr: "Respiration",
        en: "Breath",
      },
    },
    {
      name: "Bois",
      hex: "#2A211B",
      dark: true,
      role: {
        fr: "Ancrage",
        en: "Anchor",
      },
    },
  ],
  type: [
    {
      name: "Bodoni Moda",
      stack: "'Bodoni Moda', Didot, Georgia, serif",
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
      name: "Montserrat",
      stack: "'Montserrat', ui-sans-serif, system-ui, sans-serif",
      role: {
        fr: "Corps et interface",
        en: "Body and interface",
      },
    },
  ],
  notes: [
    {
      title: {
        fr: "Ce qu'on voit en premier",
        en: "What you see first",
      },
      text: {
        fr: "Le laiton est partout dans la maison : les lanternes, les claustras, les poignées.",
        en: "Brass is everywhere in the house: the lanterns, the screens, the handles.",
      },
    },
    {
      title: {
        fr: "Ce qui réchauffe",
        en: "What warms it",
      },
      text: {
        fr: "Le grenat vient du velours des salons.",
        en: "The garnet came from the velvet in the lounges.",
      },
    },
    {
      title: {
        fr: "L'air entre les deux",
        en: "The air between them",
      },
      text: {
        fr: "Le sable est ce qui empêche le laiton et le grenat de se battre.",
        en: "Sand is what keeps the brass and the garnet from fighting.",
      },
    },
    {
      title: {
        fr: "Ce qui tient le tout",
        en: "What holds it together",
      },
      text: {
        fr: "Le bois sombre ancre la lumière basse du soir.",
        en: "The dark wood anchors the low evening light.",
      },
    },
    {
      title: {
        fr: "Une maison, pas un standard",
        en: "A house, not a standard",
      },
      text: {
        fr: "Les quatre ensemble se reconnaissent sur une chambre comme sur un hall.",
        en: "The four together are recognisable in a bedroom and in a lobby.",
      },
    },
  ],
};

const NEXT = [
  {
    slug: "medical-bay",
    client: "Medical Bay",
    category: { fr: "Santé", en: "Healthcare" },
    image: "/work/medical-bay/medical-bay-lobby.png",
  },
  {
    slug: "rihab-residence",
    client: "Résidence Rihab",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/rihab-residence/HERO PAGE RIHAB.png",
  },
];

export default function MabroukPage() {
  const { locale } = useLanguage();
  const say = (value: Say) => value[locale];
  const heroRef = useHeroDepart<HTMLElement>();

  useEffect(() => {
    jumpToTop();
  }, []);

  const words = CLIENT.split(" ").filter(Boolean);
  const rail = [say(CATEGORY), YEAR].join(" · ");

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
                  src={"/work/mabrouk/imgg1 (18).png"}
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
                  src={"/work/mabrouk/imgg1 (2).png"}
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

      {/* ══ 01 · REBRANDING ══════════════════════════ */}
      <section
        id={"chapter-rebranding"}
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
                      {say({ fr: "Rebranding", en: "Rebranding" })}
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
                    fr: "Le laiton, le bois et la lumière basse, tenus en système.",
                    en: "Brass, wood and low light, held as a system.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Rien n'a été inventé : la palette, la lumière et la matière sont relevées sur le bâtiment lui-même   l'accueil, l'escalier, les lanternes, les claustras. La marque est ce que la maison fait déjà, écrit une fois pour toutes.",
                        en: "Nothing was invented: the palette, the light and the materials were taken off the building itself   the desk, the staircase, the lanterns, the fretwork. The brand is what the house already does, written down once.",
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
                key={"/work/mabrouk/imgg1 (1).png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/mabrouk/imgg1 (1).png"}
                  alt={say({
                    fr: "L'accueil du Mabrouk Hôtel",
                    en: "The Mabrouk Hôtel reception",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                  priority
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Accueil", en: "Reception" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/mabrouk/imgg1 (18).png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/mabrouk/imgg1 (18).png"}
                  alt={say({
                    fr: "L'escalier et ses lanternes de laiton",
                    en: "The staircase and its brass lanterns",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Escalier", en: "Staircase" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/mabrouk/imgg1 (19).png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/mabrouk/imgg1 (19).png"}
                  alt={say({
                    fr: "Les lanternes de laiton du Mabrouk Hôtel",
                    en: "The Mabrouk Hôtel brass lanterns",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Matière", en: "Material" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/mabrouk/imgg1 (20).png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/mabrouk/imgg1 (20).png"}
                  alt={say({
                    fr: "Le salon du Mabrouk Hôtel derrière son claustra",
                    en: "The Mabrouk Hôtel lounge behind its fretwork screen",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Salon", en: "Lounge" })}
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
                    fr: "Une maison, pas une catégorie d'étoiles.",
                    en: "A house, not a star rating.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                      {say({
                        fr: "Le marché vend des équipements : le nombre d'étoiles, la taille de la piscine, la liste de ce qui est inclus. Rien de tout cela ne distingue une maison d'une autre. Le repositionnement a écrit ce qu'un client raconte réellement en repartant   la lumière, le calme, l'accueil   et a laissé la liste aux comparateurs.",
                        en: "The market sells amenities: the star count, the size of the pool, the list of what is included. None of it separates one house from another. The reposition wrote down what a guest actually tells people afterwards   the light, the quiet, the welcome   and left the list to the comparison sites.",
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
                src="/work/mabrouk/mabrouk-logo.jpeg"
                alt={say(BRAND.wordmarkAlt)}
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-brand)] group-hover/id:scale-[1.04] motion-reduce:transition-none"
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
            <div className="bg-cream/70 relative p-8 sm:p-10 lg:col-span-5">
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
            <div className="bg-canvas relative p-8 sm:p-10 lg:col-span-7">
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

      {/* ══ 02 · MARKETING ══════════════════════════ */}
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
                  <span className="eyebrow text-teal mr-1 tabular-nums">02</span>
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
                    fr: "Photographier la maison comme on l'habite, pas comme on l'inventorie.",
                    en: "Photograph the house the way it is lived in, not the way it is inventoried.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Une chambre d'hôtel photographiée de face, au flash, ressemble à toutes les autres. Chaque prise a donc été faite à l'heure où la maison est la plus elle-même, et cadrée sur ce qu'un client remarque vraiment : une matière, une lumière, un coin.",
                        en: "A hotel bedroom shot square on, with flash, looks like every other one. So each frame was made at the hour the house is most itself, and framed on what a guest actually notices: a material, a light, a corner.",
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
                key={"/work/mabrouk/imgg1 (10).png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/mabrouk/imgg1 (10).png"}
                  alt={say({
                    fr: "Le salon d'une suite du Mabrouk Hôtel",
                    en: "The living area of a Mabrouk Hôtel suite",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Suite", en: "Suite" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/mabrouk/imgg1 (12).png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/mabrouk/imgg1 (12).png"}
                  alt={say({
                    fr: "Une chambre du Mabrouk Hôtel",
                    en: "A Mabrouk Hôtel bedroom",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Chambre", en: "Bedroom" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/mabrouk/imgg1 (16).png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/mabrouk/imgg1 (16).png"}
                  alt={say({
                    fr: "Une chambre du Mabrouk Hôtel",
                    en: "A Mabrouk Hôtel bedroom",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Chambre", en: "Bedroom" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/mabrouk/imgg1 (17).png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/mabrouk/imgg1 (17).png"}
                  alt={say({
                    fr: "Le salon du Mabrouk Hôtel",
                    en: "The Mabrouk Hôtel lounge",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Salon", en: "Lounge" })}
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
                      {say({ fr: "Revenu", en: "Revenue" })}
                    </span>
                    <span
                      aria-hidden
                      className="h-3 w-px translate-y-0.5 bg-current opacity-25"
                    />
                    <span className="eyebrow text-ink">
                      {say({ fr: "Achat média", en: "Media Buying" })}
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
                    fr: "Vendre les nuits que personne ne vient chercher.",
                    en: "Selling the nights nobody comes looking for.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                      {say({
                        fr: "Un hôtel n'a pas un problème de remplissage : il en a deux, et ils ne se ressemblent pas. La haute saison se vend seule et se défend sur le prix ; le reste de l'année se gagne en donnant une raison de venir. L'offre et la dépense ont été réglées séparément sur ces deux-là, et le budget dirigé vers la réservation directe plutôt que vers les plateformes.",
                        en: "A hotel does not have one occupancy problem: it has two, and they look nothing alike. High season sells itself and is defended on price; the rest of the year is won by giving someone a reason to come. The offer and the spend were tuned separately against each, and the budget pointed at direct booking rather than at the platforms.",
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
