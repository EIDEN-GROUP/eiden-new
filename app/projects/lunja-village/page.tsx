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
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";

type Say = { fr: string; en: string };

const CLIENT = "Lunja Village";
const YEAR = "2024";
const CATEGORY: Say = { fr: "Hôtellerie", en: "Hospitality" };
const LOCATION: Say = {
  fr: "Imi Ouaddar, Taghazout",
  en: "Imi Ouaddar, Taghazout",
};

/** The one deep room's ground. */
const GROUND = "#3D2C1E";

const HERO = {
  statement: {
    fr: "Parler comme quelqu'un qui y vit déjà.",
    en: "Speak like someone who already lives there.",
  },
  intro: {
    fr: "Un village côtier dont la marque disait encore « resort » alors que ceux qui arrivaient étaient surfeurs, nomades et collectifs créatifs. Nous l'avons reconstruite pour le client qui vient vraiment.",
    en: "A coastal village whose brand still said “resort” while the people turning up were surfers, nomads and creative groups. We rebuilt it for the guest actually arriving.",
  },
  image: "/work/lunja-village/image lunja village portfoliio.png",
  alt: {
    fr: "La piscine de Lunja Village au coucher du soleil",
    en: "The Lunja Village pool at sunset",
  },
};

const REALITY: Say[] = [
  { fr: "Une identité déjà en place.", en: "An identity already in place." },
  { fr: "Une vraie communauté.", en: "A real community." },
  { fr: "Une atmosphère reconnaissable.", en: "A recognisable atmosphere." },
  { fr: "Une audience qui venait déjà.", en: "An audience already turning up." },
];

const FRACTURE: Say[] = [
  { fr: "Un vocabulaire de « resort ».", en: "The language of a resort." },
  {
    fr: "Le mauvais client, adressé comme si c'était le bon.",
    en: "The wrong guest, addressed as if they were the right one.",
  },
  {
    fr: "Un positionnement décroché du lieu.",
    en: "A position disconnected from the place.",
  },
  {
    fr: "Une communication qui ne racontait pas le séjour réel.",
    en: "Communication that did not describe the actual stay.",
  },
];

const STATEMENT: Say = {
  fr: "Le lieu savait qui il était. La marque, non.",
  en: "The place knew who it was. The brand did not.",
};

const DECISION: Say = {
  fr: "Aligner l'entreprise sur ceux qui arrivent vraiment.",
  en: "Align the business around the people who actually arrive.",
};

const CHAIN: Say[] = [
  { fr: "Positionnement", en: "Positioning" },
  { fr: "Marque", en: "Brand" },
  { fr: "Contenu", en: "Content" },
  { fr: "Média", en: "Media" },
  { fr: "Commercial", en: "Commercial" },
];

const CHAIN_TEXT: Say = {
  fr: "Le positionnement a nommé l'audience réelle. La marque lui a donné un langage visuel qu'elle reconnaît. Le contenu a tenu le récit à un rythme que l'équipe peut réellement soutenir. Le média a dirigé le budget de la saison vers ceux qui préparent déjà le voyage. Et le commercial a transformé tout cela en réservations qui arrivent en comprenant déjà le village.",
  en: "Positioning named the real audience. The brand gave that audience a visual language it recognises. Content held the story at a pace the team can actually sustain. Media pointed the season's budget at people already planning the trip. And the commercial work turned all of it into bookings that arrive already understanding the village.",
};

const IMPACT_TITLE: Say = {
  fr: "Les réservations arrivent en comprenant déjà le village.",
  en: "Bookings now arrive already understanding the village.",
};
const IMPACT_TEXT: Say = {
  fr: "Une marque adressée au client qui vient vraiment, un rythme de contenu que la maison tient seule, et une dépense réglée sur la saison plutôt que sur le mois.",
  en: "A brand aimed at the guest who actually arrives, a content rhythm the house can hold on its own, and spend tuned to the season rather than to the month.",
};

const WORK = [
  {
    image: "/work/lunja-village/Drone 3.png",
    alt: {
      fr: "Vue drone du village au-dessus de la baie de Taghazout",
      en: "Drone view of the village above the Taghazout bay",
    },
  },
  {
    image: "/work/lunja-village/Drone 2.png",
    alt: {
      fr: "Vue drone à la verticale sur les toits du village",
      en: "Overhead drone view of the village rooftops",
    },
  },
  {
    image: "/work/lunja-village/Copie de 36.png",
    alt: {
      fr: "Façade d'un bungalow et son motif ajouré",
      en: "Bungalow facade and its perforated pattern",
    },
  },
  {
    image: "/work/lunja-village/Copie de immgg28.png",
    alt: {
      fr: "Bungalow blanc adossé aux collines",
      en: "White bungalow set against the hills",
    },
  },
  {
    image: "/work/lunja-village/Room 9.png",
    alt: {
      fr: "Terrasse couverte d'un bungalow ouverte sur la piscine",
      en: "Covered bungalow terrace opening onto the pool",
    },
  },
  {
    image: "/work/lunja-village/Appartement 1.png",
    alt: {
      fr: "Séjour et cuisine d'un appartement",
      en: "Living room and kitchen of an apartment",
    },
  },
  {
    image: "/work/lunja-village/Appartement.png",
    alt: {
      fr: "Chambre d'appartement ouverte sur la mer",
      en: "Apartment bedroom opening onto the sea",
    },
  },
  {
    image: "/work/lunja-village/Appartement 3.png",
    alt: {
      fr: "Chambre d'appartement aux tissus verts",
      en: "Apartment bedroom in green textiles",
    },
  },
  {
    image: "/work/lunja-village/Appartement 5.png",
    alt: {
      fr: "Chambre twin d'appartement aux volets bleus",
      en: "Twin apartment bedroom with blue shutters",
    },
  },
  {
    image: "/work/lunja-village/Copie de immgg40.png",
    alt: {
      fr: "La piscine du village en fin de journée",
      en: "The village pool at the end of the day",
    },
  },
  {
    image: "/work/lunja-village/Copie de imggg3.png",
    alt: { fr: "Réception du village", en: "Village reception" },
  },
  {
    image: "/work/lunja-village/Copie de immgg38.png",
    alt: { fr: "Salon d'accueil", en: "Lounge at reception" },
  },
  {
    image: "/work/lunja-village/Copie de immgg39.png",
    alt: { fr: "Salle du restaurant", en: "Restaurant room" },
  },
  {
    image: "/work/lunja-village/Copie de immgg42.png",
    alt: {
      fr: "Salon ouvert sur la côte",
      en: "Lounge opening onto the coast",
    },
  },
  {
    image: "/work/lunja-village/img1 (6).png",
    alt: { fr: "Le bar du village", en: "The village bar" },
  },
  {
    image: "/work/lunja-village/img8.png",
    alt: {
      fr: "Le food truck JJ Snack aux couleurs de la marque",
      en: "The JJ Snack food truck in the brand's colours",
    },
  },
  {
    image: "/work/lunja-village/Copie de immgg52.png",
    alt: {
      fr: "La plage de Taghazout au coucher du soleil",
      en: "Taghazout beach at sunset",
    },
  },
  {
    image: "/work/lunja-village/Drone 5.png",
    alt: {
      fr: "Vue drone de la côte au coucher du soleil",
      en: "Drone view of the coast at sunset",
    },
  },
];

const BRAND = {
  ground: "#FCE408",
  contain: true,
  wordmark: "/work/lunja-village/logo-lunja-village.jpg",
  wordmarkAlt: {
    fr: "Marque Lunja Village",
    en: "Lunja Village brand mark",
  },
  lead: {
    fr: "Retro Beach : la côte, pas le resort, une palette qui parle à qui arrive vraiment.",
    en: "Retro Beach: the coast, not the resort   a palette that speaks to who actually arrives.",
  },
  essence: {
    fr: "Le village disait « resort » à des surfeurs, des nomades et des collectifs créatifs ; le repositionnement n'a rien inventé, il a écrit ce que les gens racontaient déjà en repartant   Surf & Nomad Cottages.",
    en: "The village was saying “resort” to surfers, nomads and creative collectives; the reposition invented nothing, it wrote down what people were already saying on the way out   Surf & Nomad Cottages.",
  },
  colors: [
    {
      name: "Keppel",
      hex: "#2BBAA5",
      dark: false,
      role: {
        fr: "Primaire",
        en: "Primary",
      },
    },
    {
      name: "Céladon",
      hex: "#93D3AE",
      dark: false,
      role: {
        fr: "Secondaire",
        en: "Secondary",
      },
    },
    {
      name: "Jo&Joe Yellow",
      hex: "#FFD100",
      dark: false,
      role: {
        fr: "Accent partenaire",
        en: "Partnership accent",
      },
    },
    {
      name: "Corail",
      hex: "#F96635",
      dark: true,
      role: {
        fr: "Action",
        en: "Action",
      },
    },
    {
      name: "Crème Douce",
      hex: "#FDF5D3",
      dark: false,
      role: {
        fr: "Fond",
        en: "Background",
      },
    },
  ],
  type: [
    {
      name: "Abril Fatface",
      stack: "'Abril Fatface', Georgia, serif",
      role: {
        fr: "Titres",
        en: "Titles",
      },
    },
    {
      name: "DM Sans",
      stack: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
      role: {
        fr: "Corps et interface",
        en: "Body and interface",
      },
    },
    {
      name: "Lora",
      stack: "'Lora', Georgia, serif",
      role: {
        fr: "Accroches",
        en: "Pull lines",
      },
    },
  ],
  notes: [
    {
      title: {
        fr: "L'eau, d'abord",
        en: "The water, first",
      },
      text: {
        fr: "Le keppel vient de l'Atlantique à cinq minutes.",
        en: "Keppel came from the Atlantic five minutes away.",
      },
    },
    {
      title: {
        fr: "De la place pour respirer",
        en: "Space to breathe",
      },
      text: {
        fr: "Le céladon adoucit le keppel sans le diluer.",
        en: "Celadon softens keppel without diluting it.",
      },
    },
    {
      title: {
        fr: "Le jaune du partenaire",
        en: "The partner's yellow",
      },
      text: {
        fr: "Ce jaune n'est pas un choix esthétique : c'est celui de Jo&Joe, la plateforme avec laquelle le village co-signe.",
        en: "That yellow is not an aesthetic choice: it is Jo&Joe's, the platform the village co-signs with.",
      },
    },
    {
      title: {
        fr: "Ce qui arrête l'œil",
        en: "What stops the eye",
      },
      text: {
        fr: "Le corail est le seul ton qui interrompt.",
        en: "Coral is the only tone that interrupts.",
      },
    },
    {
      title: {
        fr: "Un village, pas une brochure",
        en: "A village, not a brochure",
      },
      text: {
        fr: "La crème douce laisse le reste exister.",
        en: "Crème douce lets the rest exist.",
      },
    },
  ],
};

const NEXT = [
  {
    slug: "mabrouk",
    client: "Mabrouk Hôtel",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/mabrouk/imgg1 (18).png",
  },
  {
    slug: "medical-bay",
    client: "Medical Bay",
    category: { fr: "Santé", en: "Healthcare" },
    image: "/work/medical-bay/medical-bay-lobby.png",
  },
];

export default function LunjaVillagePage() {
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
      <section ref={heroRef} data-nav-tone="dark" className="hero-depart relative isolate flex min-h-[68svh] flex-col overflow-hidden bg-black sm:min-h-[74svh]">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden motion-safe:[animation:eiden-film-settle_2.4s_var(--ease-brand)_both]">
          <Image
            src={HERO.image}
            alt={say(HERO.alt)}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(10,15,12,1)_16%,rgba(10,15,12,0.90)_44%,rgba(10,15,12,0.80)_100%)]"/>
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
            <p className={cn(ENTER, "eyebrow text-gold flex items-center gap-3")} style={stage(0.06)}>
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {say({ fr: "Étude de cas", en: "Case study" })}
            </p>

            <h1 className="text-balance-tight text-canvas mt-2 text-[clamp(2.75rem,8vw,6rem)] leading-[0.96] font-extrabold">
              {words.map((word, index) => {
                const rise = stage(HERO_WORD_LEAD + index * HERO_WORD_STEP);
                const last = index === words.length - 1;

                if (!last) {
                  return (
                    <span key={`${word}-${index}`} className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                      <span className="inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]" style={rise}>
                        {word}
                      </span>
                    </span>
                  );
                }

                return (
                  <span key={`${word}-${index}`} className="relative inline-block">
                    <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                      <span className="text-gold inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]" style={rise} >
                        {word}
                      </span>
                    </span>
                    <span aria-hidden className="bg-gold/60 absolute bottom-[0.05em] left-0 h-[3px] w-full origin-left motion-safe:[animation:eiden-underline_0.9s_var(--ease-brand)_1.15s_both]" />
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
      <section data-nav-tone="light" className="bg-cream text-ink relative scroll-mt-24">
        {/* The answer, on the same ground and under the same curtain. */}
        <div className="container-eiden pt-10">
          <Reveal direction="none" duration={0.5} amount={0.3}>
            <div className="pt-5 border-ink/12 border-t">
              <p className="eyebrow text-teal">
                {say({ fr: "L'architecture", en: "The architecture" })}
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 lg:items-center gap-2">    
            <div>
              <RevealWords
                as="h2"
                amount={0.3}
                delay={0.05}
                text={say(DECISION)}
                className="font-display text-ink mt-12 block text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.04em] sm:mt-14 lg:col-span-8"
              />
            </div>

            <div>
              <Reveal delay={0.12} amount={0.25} className="lg:col-span-6 lg:col-start-7">
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
                  src={"/work/lunja-village/lunja-social-4.png"}
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
                  src={"/work/lunja-village/lunja-brand-tote.png"}
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

      {/* ══ 01 · REBRANDING · POSITIONNEMENT ══════════════════════════ */}
      <section id={"chapter-rebranding"} data-nav-tone="light" className="bg-canvas text-ink relative scroll-mt-24">
        <div className="container-eiden pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
          <SlideIn from={"right"} className="relative grid gap-12 lg:items-start lg:gap-16 xl:gap-20">
            <div className="">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5">
                  <span className="eyebrow text-teal mr-1 tabular-nums">01</span>
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-ink">
                      {say({ fr: "Rebranding", en: "Rebranding" })}
                    </span>
                    <span
                      aria-hidden
                      className="h-3 w-px translate-y-0.5 bg-current opacity-25"
                    />
                    <span className="eyebrow text-ink">
                      {say({ fr: "Positionnement", en: "Positioning" })}
                    </span>
                  </span>
                </div>
              </Reveal>

              <div className="grid lg:grid-cols-2 lg:items-start gap-2">
                <RevealWords
                  as="h2"
                  amount={0.3}
                  delay={0.05}
                  text={say({
                    fr: "Un village, pas un resort.",
                    en: "A village, not a resort.",
                  })}
                  className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
                />

                <div>
                  <Reveal delay={0.14} amount={0.3}>
                    <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                      {say({
                        fr: "Le village disait « resort » à des surfeurs, des nomades et des collectifs créatifs ; le repositionnement n'a rien inventé, il a écrit ce que les gens racontaient déjà en repartant   Surf & Nomad Cottages. Le logotype, les cinq caractères du système et les objets sur lesquels ils vivent disent la même chose : une côte, du sel, du bois, et rien qui ressemble à une réception d'hôtel.",
                        en: "The village was saying “resort” to surfers, nomads and creative collectives; the reposition invented nothing, it wrote down what people were already saying on the way out   Surf & Nomad Cottages. The wordmark, the five faces of the system and the objects they live on say the same thing: a coastline, salt, wood, and nothing that looks like a hotel reception.",
                      })}
                    </p>
                  </Reveal>

                  <Reveal delay={0.22} amount={0.3}>
                    <ul className="mt-8 flex flex-wrap gap-2.5">
                      <li key={"https://www.lunjavillage.com"}>
                        <a
                          href={"https://www.lunjavillage.com"}
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
              </div>

            </div>
            <RevealGroup
              amount={0.12}
              className="grid gap-3 sm:grid-cols-4 sm:gap-4"
            >
              <figure
                key={"/work/lunja-village/lunja-brand-board.png"}
                className="bg-ink/[0.05] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/lunja-village/lunja-brand-board.png"}
                  alt={say({
                    fr: "Planche de marque Lunja",
                    en: "Lunja brand board",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                  priority
                />
                <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
                  {say({ fr: "Planche de marque", en: "Brand board" })}
                </figcaption>
              </figure>
              <figure
                key={"/work/lunja-village/logo-lunja-village.jpg"}
                className="bg-ink/[0.05] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/lunja-village/logo-lunja-village.jpg"}
                  alt={say({ fr: "Logo Lunja Village", en: "Lunja Village logo" })}
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
                key={"/work/lunja-village/lunja-brand-tote.png"}
                className="bg-ink/[0.05] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/lunja-village/lunja-brand-tote.png"}
                  alt={say({
                    fr: "Tote bag Lunja Village",
                    en: "Lunja Village tote bag",
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
                key={"/work/lunja-village/lunja-brand-mockup.png"}
                className="bg-ink/[0.05] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/lunja-village/lunja-brand-mockup.png"}
                  alt={say({
                    fr: "L'identité Lunja en situation",
                    en: "The Lunja identity in place",
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

      {/* ══ 02 · MARKETING ══════════════════════════ */}
      <section id={"chapter-marketing"} data-nav-tone="light" className="bg-cream text-ink relative scroll-mt-24">
        <div className="container-eiden pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
          <SlideIn from={"right"} className="relative grid gap-3 sm:grid-cols-2 sm:gap-4 lg:items-center">
            <div className="">
              <Reveal direction="none" duration={0.5} amount={0.3}>
                <div className="border-ink/12 border-t flex flex-wrap items-baseline gap-x-3 gap-y-1.5 pt-5">
                  <span className="eyebrow text-teal mr-1 tabular-nums">02</span>
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
                  fr: "Un rythme de contenu que l'équipe tient sans se battre.",
                  en: "A content rhythm the team can hold without a fight.",
                })}
                className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
              />

              <Reveal delay={0.14} amount={0.3}>
                <p className="text-ink/60 mt-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                  {say({
                    fr: "Rien qui demande une équipe de production : ce que le village a déjà sous la main, un matin, une session, une table longue. Le rythme a été calé sur ce que la maison peut réellement produire une semaine chargée.",
                    en: "Nothing that needs a production crew: what the village already has to hand   a morning, a session, a long table. The rhythm was set against what the house can actually make in a busy week.",
                  })}
                </p>
              </Reveal>
            </div>
            <RevealGroup
              amount={0.12}
              className="grid gap-3 sm:grid-cols-2 sm:gap-4"
            >
              <figure
                key={"/work/lunja-village/lunja-social-1.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/lunja-village/lunja-social-1.png"}
                  alt={say({
                    fr: "Publication sociale Lunja",
                    en: "Lunja social post",
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
                key={"/work/lunja-village/lunja-social-2.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/lunja-village/lunja-social-2.png"}
                  alt={say({
                    fr: "Publication sociale Lunja",
                    en: "Lunja social post",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
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
                key={"/work/lunja-village/lunja-social-7.png"}
                className="bg-ink/[0.06] relative aspect-11/12 overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]"
              >
                <Image
                  src={"/work/lunja-village/lunja-social-7.png"}
                  alt={say({
                    fr: "Publication sociale Lunja",
                    en: "Lunja social post",
                  })}
                  fill
                  quality={90}
                  sizes={"(max-width: 640px) 92vw, 23vw"}
                  className="size-full object-cover"
                />
              </figure>
            </RevealGroup>
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

              <RevealWords
                as="h2"
                amount={0.3}
                delay={0.05}
                text={say({
                  fr: "Une côte ne se remplit pas de la même façon en février et en août.",
                  en: "A coastline does not fill the same way in February and in August.",
                })}
                className="font-display text-ink mt-7 block text-[clamp(1.75rem,4vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.045em]"
              />

              <Reveal delay={0.14} amount={0.3}>
                <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                  {say({
                    fr: "L’offre, le calendrier et la dépense ont été réglés ensemble sur la saison plutôt que sur le mois, et le budget dirigé vers ceux qui préparent déjà le voyage : une date en tête, un billet en attente, une planche à transporter. Les réservations arrivent maintenant en connaissant déjà le lieu.",
                    en: "The offer, the calendar and the spend were tuned together against the season rather than the month, and the budget pointed at people already planning the trip: a date in mind, a flight on hold, a board to carry. Bookings now arrive already knowing the place.",
                  })}
                </p>
              </Reveal>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══ THE IMPACT ═════════════════════════════════════════════ */}
      <section
        data-nav-tone="dark"
        className="grain text-canvas relative isolate scroll-mt-24 overflow-hidden bg-[var(--case-ground)]"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={HERO.image}
            alt=""
            fill
            quality={70}
            sizes="100vw"
            className="object-cover object-center opacity-[0.2]"
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

            <RevealGroup amount={0.2} className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:grid-cols-1">
              <div className="border-canvas/12 border-t pt-6 sm:pt-7">
                <p className="font-display text-canvas text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.85] font-extrabold tracking-[-0.055em]">
                  <CountUp value={"+38%"} />
                </p>
                <p className="text-canvas/55 mt-4 max-w-[26ch] text-[0.9375rem] leading-relaxed">
                  {say({
                    fr: "Des réservations qui arrivent en connaissant déjà le lieu.",
                    en: "Bookings that arrive already knowing the place.",
                  })}
                </p>
              </div>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ══ THE WORK ═══════════════════════════════════════════════ */}
      <section data-nav-tone="light" className="bg-canvas text-ink relative scroll-mt-24">
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

function CaseVeil() {
  const [present, setPresent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPresent(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!present) return null;
  return <div aria-hidden className="case-veil" />;
}
