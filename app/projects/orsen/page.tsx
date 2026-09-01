"use client";

/**
 * ORSEN, written out in full.
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

const CLIENT = "ORSEN";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Matériaux", en: "Materials" };
const LOCATION: Say = { fr: "Maroc", en: "Morocco" };

/** The one deep room's ground. */
const GROUND = "var(--color-forest)";

const HERO = {
  statement: {
    fr: "La matière avant la décoration.",
    en: "Material before decoration.",
  },
  intro: {
    fr: "Marbre, pierre, béton, bois et métal sur une seule plateforme   avec une face publique pour les architectes et une face professionnelle derrière, pour le négoce.",
    en: "Marble, stone, concrete, wood and metal on one platform   with a public face for architects and a professional one behind it for the trade.",
  },
  image: "/work/orsen/orsen hero.png",
  alt: { fr: "La plateforme matériaux ORSEN", en: "The ORSEN materials platform" },
};

const REALITY: Say[] = [
  {
    fr: "Une gamme que les architectes prescrivent déjà.",
    en: "A range architects already specify.",
  },
  {
    fr: "Un négoce qui travaille au devis et au métrage.",
    en: "A trade business working on quotes and square metres.",
  },
  {
    fr: "Deux publics pour une seule matière.",
    en: "Two audiences for one material.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Un catalogue qui parlait marketing à des lecteurs de spécifications.",
    en: "A catalogue talking marketing to readers of specifications.",
  },
  {
    fr: "Le négoce traité à côté du catalogue, jamais dedans.",
    en: "The trade side handled beside the catalogue, never inside it.",
  },
  {
    fr: "Devis, commandes et stock dans trois endroits différents.",
    en: "Quotes, orders and stock in three different places.",
  },
];

const DECISION: Say = {
  fr: "Poser le portail négoce sur la même fondation que le catalogue, pas à côté.",
  en: "Put the trade portal on the same foundation as the catalogue, not beside it.",
};

const CHAIN_TEXT: Say = {
  fr: "La direction artistique a retiré tout ce qui pouvait concurrencer une photographie de pierre. Le catalogue public se lit comme une fiche technique, parce qu'un architecte cherche des valeurs et pas des arguments. Le portail professionnel partage cette fondation   mêmes références, même stock, mêmes fiches   et seuls les droits changent. Le devis vit dans le catalogue plutôt que dans une boîte mail, à côté de la matière qu'il chiffre. Et le mouvement ne sert qu'à faire prendre la lumière à une surface.",
  en: "Art direction took away everything that could compete with a photograph of stone. The public catalogue reads like a spec sheet, because an architect is looking for values rather than arguments. The trade portal shares that foundation   same references, same stock, same sheets   and only the permissions change. The quote lives inside the catalogue rather than in an inbox, beside the material it prices. And the motion does one thing: let a surface catch the light.",
};

const IMPACT_TITLE: Say = {
  fr: "Une plateforme qui se lit comme une fiche technique et se tient comme une marque.",
  en: "A platform that reads like a spec sheet and holds itself like a brand.",
};
const IMPACT_TEXT: Say = {
  fr: "Un seul système visuel au service des deux publics, et une couche négoce où devis, commandes et stock vivent enfin ensemble.",
  en: "One visual system serving both audiences, and a trade layer where quotes, orders and stock finally live together.",
};

/**
 * The brand board's material.
 *
 * No brand book exists for this case, so the colours are read off the brand
 * mark itself and carry a role rather than an invented name. No typeface is
 * named, because none was ever documented.
 */
const BRAND = {
  ground: "#141c19",
  contain: false,
  wordmark: "/work/orsen/orsen card.png",
  wordmarkAlt: {
    fr: "Marque ORSEN",
    en: "ORSEN brand mark",
  },
  lead: {
    fr: "Un système visuel ramené à ce qui sert la matière.",
    en: "A visual system cut back to what serves the material.",
  },
  essence: {
    fr: "Une seule couleur d'accent, un seul geste, et beaucoup de gris.",
    en: "One accent colour, one gesture, and a great deal of grey.",
  },
  colors: [
    {
      hex: "#1C1111",
      dark: true,
      role: {
        fr: "Dominante",
        en: "Dominant",
      },
    },
    {
      hex: "#E9E7E2",
      dark: false,
      role: {
        fr: "Accent",
        en: "Accent",
      },
    },
    {
      hex: "#767676",
      dark: true,
      role: {
        fr: "Contraste",
        en: "Contrast",
      },
    },
    {
      hex: "#454749",
      dark: true,
      role: {
        fr: "Neutre",
        en: "Neutral",
      },
    },
  ],
};

const NEXT = [
  {
    slug: "lithos-materiaux",
    client: "LITHOS",
    category: { fr: "Matériaux", en: "Materials" },
    image: "/work/lithos-materiaux/luthos hero.png",
  },
  {
    slug: "droguerie-souss",
    client: "Souss Droguerie",
    category: { fr: "Matériaux", en: "Materials" },
    image: "/work/droguerie-souss/hero drougure.png",
  },
];

export default function OrsenPage() {
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
                  src={"/work/orsen/orsen hero.png"}
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
                  src={"/work/orsen/orsen card.png"}
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
            className="relative grid gap-3 sm:grid-cols-2 sm:gap-8 lg:items-center"
          >
            <div className="max-w-4xl">
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

              <RevealWords
                as="h2"
                amount={0.3}
                delay={0.05}
                text={say({
                  fr: "Un système visuel ramené à ce qui sert la matière.",
                  en: "A visual system cut back to what serves the material.",
                })}
                className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
              />

              <Reveal delay={0.14} amount={0.3}>
                <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                  {say({
                    fr: "Une seule couleur d'accent, un seul geste, et beaucoup de gris. Tout ce qui aurait pu concurrencer une photographie de pierre a été retiré   sur un catalogue de matériaux, la mise en page ne doit rien ajouter à ce qu'on regarde.",
                    en: "One accent colour, one gesture, and a great deal of grey. Anything that could have competed with a photograph of stone was taken out   on a materials catalogue, the layout must add nothing to what is being looked at.",
                  })}
                </p>
              </Reveal>
            </div>
            <RevealGroup amount={0.12}>
              <figure
                key={"/work/orsen/orsen card.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/orsen/orsen card.png"}
                  alt={say({
                    fr: "La marque ORSEN en situation",
                    en: "The ORSEN mark in place",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                  priority
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Marque", en: "Brand" })}
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
                    fr: "Un catalogue qui se lit comme une fiche technique.",
                    en: "A catalogue that reads like a spec sheet.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Format, finition, épaisseur, provenance, délai. Un architecte cherche des valeurs, pas des arguments   alors la fiche est la page, et la photographie vient après ce qu'elle est censée prouver.",
                        en: "Format, finish, thickness, origin, lead time. An architect is looking for values, not arguments   so the spec is the page, and the photograph comes after what it is meant to prove.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>

              <Reveal delay={0.22} amount={0.3}>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  <li key={"https://orsen.vercel.app"}>
                    <a
                      href={"https://orsen.vercel.app"}
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
                key={"/work/orsen/web-orsen-desktop.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/orsen/web-orsen-desktop.jpg"}
                  alt={say({
                    fr: "Le site ORSEN sur écran",
                    en: "The ORSEN site on desktop",
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
                key={"/work/orsen/web-orsen-mobile.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/orsen/web-orsen-mobile.jpg"}
                  alt={say({
                    fr: "Le site ORSEN sur téléphone",
                    en: "The ORSEN site on a phone",
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
                key={"/work/orsen/web-orsen-cover.jpg"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/orsen/web-orsen-cover.jpg"}
                  alt={say({
                    fr: "Le catalogue matériaux ORSEN",
                    en: "The ORSEN materials catalogue",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Catalogue", en: "Catalogue" })}
                </figcaption>
              </figure>
            </RevealGroup>
          </SlideIn>
        </div>
      </section>

      {/* ══ 03 · PORTAIL B2B ══════════════════════════ */}
      <section
        id={"chapter-b2b-portal"}
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
                      {say({ fr: "Portail B2B", en: "B2B Portal" })}
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
                    fr: "Deux visages, un seul système.",
                    en: "Two faces, one system.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(2rem,5.6vw,4.25rem)] leading-[0.99] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                      {say({
                        fr: "Le catalogue public et le portail professionnel partagent la même fondation : les mêmes références, le même stock, les mêmes fiches. Ce qui change, c'est ce que vous avez le droit d'en faire.",
                        en: "The public catalogue and the professional portal share one foundation: the same references, the same stock, the same sheets. What changes is what you are allowed to do with them.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══ 04 · E-COMMERCE & DEVIS ══════════════════════════ */}
      <section
        id={"chapter-quoting"}
        data-nav-tone="light"
        className="bg-cream text-ink relative scroll-mt-24"
      >
        <div className="container-eiden relative overflow-hidden pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
          <span
            aria-hidden
            className="font-display text-ink pointer-events-none absolute right-0 -bottom-[0.18em] text-[34vw] leading-none font-extrabold tracking-[-0.06em] opacity-[0.055] select-none lg:text-[22vw]"
          >
            04
          </span>

          <SlideIn from={"right"} className="relative">
            <div className="max-w-4xl">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5">
                  <span className="eyebrow text-teal mr-1 tabular-nums">04</span>
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({
                        fr: "E-commerce & devis",
                        en: "E-commerce / Quoting",
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
                    fr: "Devis, commandes et stock au même endroit.",
                    en: "Quotes, orders and stock in one place.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(2rem,5.6vw,4.25rem)] leading-[0.99] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                      {say({
                        fr: "Une dalle ne se met pas au panier comme une paire de chaussures : il y a un métrage, une chute, un délai et une remise négociée. Le devis vit donc dans le catalogue plutôt que dans une boîte mail, à côté de la matière qu'il chiffre.",
                        en: "A slab does not go into a basket like a pair of shoes: there is an area, an offcut, a lead time and a negotiated discount. So the quote lives inside the catalogue rather than in an inbox, next to the material it prices.",
                      })}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══ 05 · MOTION ══════════════════════════ */}
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
            05
          </span>

          <SlideIn from={"right"} className="relative">
            <div className="max-w-4xl">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5">
                  <span className="eyebrow text-teal mr-1 tabular-nums">05</span>
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
                    fr: "Le mouvement au service de la matière, jamais l'inverse.",
                    en: "Motion in service of the material, never the other way round.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(2rem,5.6vw,4.25rem)] leading-[0.99] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                      {say({
                        fr: "Assez pour qu'une surface prenne la lumière quand on la survole, et rien de plus. Sur une plateforme consultée depuis un chantier, chaque effet doit se justifier au poids qu'il coûte à charger.",
                        en: "Enough for a surface to catch the light when it is hovered, and nothing beyond that. On a platform opened from a building site, every effect has to justify the weight it costs to load.",
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
