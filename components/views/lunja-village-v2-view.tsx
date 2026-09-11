"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { cn, cursorOn } from "@/lib/utils";

type Say = { fr: string; en: string };

const CLIENT = "Lunja Village";
const YEAR = "2024";
const CATEGORY: Say = { fr: "Hôtellerie", en: "Hospitality" };
const LOCATION: Say = {
  fr: "Imi Ouaddar, Taghazout",
  en: "Imi Ouaddar, Taghazout",
};
const SITE = "https://www.lunjavillage.com";

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

const DECISION: Say = {
  fr: "Aligner l'entreprise sur ceux qui arrivent vraiment.",
  en: "Align the business around the people who actually arrive.",
};

const CHAIN_TEXT: Say = {
  fr: "Le positionnement a nommé l'audience réelle. La marque lui a donné un langage visuel qu'elle reconnaît. Le contenu a tenu le récit à un rythme que l'équipe peut réellement soutenir. Le média a dirigé le budget de la saison vers ceux qui préparent déjà le voyage. Et le commercial a transformé tout cela en réservations qui arrivent en comprenant déjà le village.",
  en: "Positioning named the real audience. The brand gave that audience a visual language it recognises. Content held the story at a pace the team can actually sustain. Media pointed the season's budget at people already planning the trip. And the commercial work turned all of it into bookings that arrive already understanding the village.",
};

const POSITIONING = {
  title: {
    fr: "Un village, pas un resort.",
    en: "A village, not a resort.",
  },
  text: {
    fr: "Le village disait « resort » à des surfeurs, des nomades et des collectifs créatifs ; le repositionnement n'a rien inventé, il a écrit ce que les gens racontaient déjà en repartant   Surf & Nomad Cottages. Le logotype, les cinq caractères du système et les objets sur lesquels ils vivent disent la même chose : une côte, du sel, du bois, et rien qui ressemble à une réception d'hôtel.",
    en: "The village was saying “resort” to surfers, nomads and creative collectives; the reposition invented nothing, it wrote down what people were already saying on the way out   Surf & Nomad Cottages. The wordmark, the five faces of the system and the objects they live on say the same thing: a coastline, salt, wood, and nothing that looks like a hotel reception.",
  },
  /* The original case names two boards that are no longer in the folder   the
     brand board and the system mockup. The identity board and the social
     mockup stand in for them, under the same captions. */
  plates: [
    {
      image: "/work/lunja-village/1.jpg",
      caption: { fr: "Planche de marque", en: "Brand board" },
      alt: { fr: "Planche de marque Lunja", en: "Lunja brand board" },
    },
    {
      image: "/work/lunja-village/logo-lunja-village.jpg",
      caption: { fr: "Logo", en: "Logo" },
      alt: { fr: "Logo Lunja Village", en: "Lunja Village logo" },
    },
    {
      image: "/work/lunja-village/lunja-brand-tote.png",
      caption: { fr: "Application", en: "Application" },
      alt: { fr: "Tote bag Lunja Village", en: "Lunja Village tote bag" },
    },
    {
      image: "/work/lunja-village/lunja image site.png",
      caption: { fr: "Système", en: "System" },
      alt: {
        fr: "L'identité Lunja en situation",
        en: "The Lunja identity in place",
      },
    },
  ],
};

const BRAND = {
  ground: "#FCE408",
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
      role: { fr: "Primaire", en: "Primary" },
      note: {
        title: { fr: "L'eau, d'abord", en: "The water, first" },
        text: {
          fr: "Le keppel vient de l'Atlantique à cinq minutes.",
          en: "Keppel came from the Atlantic five minutes away.",
        },
      },
    },
    {
      name: "Céladon",
      hex: "#93D3AE",
      role: { fr: "Secondaire", en: "Secondary" },
      note: {
        title: { fr: "De la place pour respirer", en: "Space to breathe" },
        text: {
          fr: "Le céladon adoucit le keppel sans le diluer.",
          en: "Celadon softens keppel without diluting it.",
        },
      },
    },
    {
      name: "Jo&Joe Yellow",
      hex: "#FFD100",
      role: { fr: "Accent partenaire", en: "Partnership accent" },
      note: {
        title: { fr: "Le jaune du partenaire", en: "The partner's yellow" },
        text: {
          fr: "Ce jaune n'est pas un choix esthétique : c'est celui de Jo&Joe, la plateforme avec laquelle le village co-signe.",
          en: "That yellow is not an aesthetic choice: it is Jo&Joe's, the platform the village co-signs with.",
        },
      },
    },
    {
      name: "Corail",
      hex: "#F96635",
      role: { fr: "Action", en: "Action" },
      note: {
        title: { fr: "Ce qui arrête l'œil", en: "What stops the eye" },
        text: {
          fr: "Le corail est le seul ton qui interrompt.",
          en: "Coral is the only tone that interrupts.",
        },
      },
    },
    {
      name: "Crème Douce",
      hex: "#FDF5D3",
      role: { fr: "Fond", en: "Background" },
      note: {
        title: {
          fr: "Un village, pas une brochure",
          en: "A village, not a brochure",
        },
        text: {
          fr: "La crème douce laisse le reste exister.",
          en: "Crème douce lets the rest exist.",
        },
      },
    },
  ],
  type: [
    {
      name: "Abril Fatface",
      stack: "'Abril Fatface', Georgia, serif",
      role: { fr: "Titres", en: "Titles" },
    },
    {
      name: "DM Sans",
      stack: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
      role: { fr: "Corps et interface", en: "Body and interface" },
    },
    {
      name: "Lora",
      stack: "'Lora', Georgia, serif",
      role: { fr: "Accroches", en: "Pull lines" },
    },
  ],
};

const MARKETING = {
  title: {
    fr: "Un rythme de contenu que l'équipe tient sans se battre.",
    en: "A content rhythm the team can hold without a fight.",
  },
  text: {
    fr: "Rien qui demande une équipe de production : ce que le village a déjà sous la main, un matin, une session, une table longue. Le rythme a été calé sur ce que la maison peut réellement produire une semaine chargée.",
    en: "Nothing that needs a production crew: what the village already has to hand   a morning, a session, a long table. The rhythm was set against what the house can actually make in a busy week.",
  },
  posts: [
    "/work/lunja-village/lunja-social-1.png",
    "/work/lunja-village/lunja-social-2.png",
  ],
};

const MEDIA = {
  title: {
    fr: "Une côte ne se remplit pas de la même façon en février et en août.",
    en: "A coastline does not fill the same way in February and in August.",
  },
  text: {
    fr: "L’offre, le calendrier et la dépense ont été réglés ensemble sur la saison plutôt que sur le mois, et le budget dirigé vers ceux qui préparent déjà le voyage : une date en tête, un billet en attente, une planche à transporter. Les réservations arrivent maintenant en connaissant déjà le lieu.",
    en: "The offer, the calendar and the spend were tuned together against the season rather than the month, and the budget pointed at people already planning the trip: a date in mind, a flight on hold, a board to carry. Bookings now arrive already knowing the place.",
  },
  post: "/work/lunja-village/lunja-social-7.png",
};

const IMPACT = {
  title: {
    fr: "Les réservations arrivent en comprenant déjà le village.",
    en: "Bookings now arrive already understanding the village.",
  },
  text: {
    fr: "Une marque adressée au client qui vient vraiment, un rythme de contenu que la maison tient seule, et une dépense réglée sur la saison plutôt que sur le mois.",
    en: "A brand aimed at the guest who actually arrives, a content rhythm the house can hold on its own, and spend tuned to the season rather than to the month.",
  },
  metric: "+38%",
  metricLine: {
    fr: "Des réservations qui arrivent en connaissant déjà le lieu.",
    en: "Bookings that arrive already knowing the place.",
  },
};

const WORK: { image: string; alt: Say }[] = [
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

const STATEMENT: Say = {
  fr: "Le lieu savait qui il était. La marque, non.",
  en: "The place knew who it was. The brand did not.",
};

const BRAND_TITLE: Say = {
  fr: "Surf & Nomad Cottages.",
  en: "Surf & Nomad Cottages.",
};

const PALETTE_TITLE: Say = { fr: "Retro Beach.", en: "Retro Beach." };

const SIGNALS: Say[] = [
  { fr: "Une date en tête.", en: "A date in mind." },
  { fr: "Un billet en attente.", en: "A flight on hold." },
  { fr: "Une planche à transporter.", en: "A board to carry." },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  { id: "positionnement", label: { fr: "Positionnement", en: "Positioning" } },
  { id: "marque", label: { fr: "La planche de marque", en: "The brand board" } },
  { id: "palette", label: { fr: "Le langage visuel", en: "The visual language" } },
  { id: "marketing", label: { fr: "Marketing", en: "Marketing" } },
  { id: "achat-media", label: { fr: "Achat média", en: "Media buying" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
  { id: "le-travail", label: { fr: "Le travail", en: "The work" } },
] as const;

type ChapterId = (typeof CHAPTERS)[number]["id"];

const CHAPTER_IDS = CHAPTERS.map((chapter) => chapter.id);

const FRAME = "bg-beige relative overflow-hidden rounded-4xl";

const HALF = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 38vw";
const FULL = "(max-width: 1024px) 100vw, 76vw";

/** The last chapter whose top has passed a line just above the middle. */
function useChapter(ids: readonly ChapterId[]) {
  const [active, setActive] = useState<ChapterId>(ids[0]);

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.42;
      let current = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top > line) break;
        current = node;
      }
      setActive(current.id as ChapterId);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return active;
}

export function LunjaVillageV2View() {
  const { locale } = useLanguage();
  const say = (value: Say) => value[locale];
  const active = useChapter(CHAPTER_IDS);

  return (
    <div data-nav-tone="light" className="bg-canvas text-ink">
      <div className="lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <Rail active={active} say={say} />

        <div className="min-w-0 p-1.5">
          <Tabs active={active} say={say} />

          <Chapter id="le-defi">
            <Reveal amount={0.1}>
              <figure className={cn(FRAME, "aspect-4/5 sm:aspect-16/9")}>
                <Image
                  src={HERO.image}
                  alt={say(HERO.alt)}
                  fill
                  priority
                  quality={90}
                  sizes={FULL}
                  className="object-cover"
                />
              </figure>
            </Reveal>

            <Caption
              index={0}
              say={say}
              title={say(STATEMENT)}
              text={say(HERO.intro)}
            />

            <Pair>
              <ListPanel
                label={say({ fr: "La réalité", en: "The reality" })}
                items={REALITY.map(say)}
                tone="reality"
              />
              <ListPanel
                label={say({ fr: "La fracture", en: "The fracture" })}
                items={FRACTURE.map(say)}
                tone="fracture"
              />
            </Pair>
          </Chapter>

          <Chapter id="architecture">
            <Caption
              index={1}
              say={say}
              title={say(DECISION)}
              text={say(CHAIN_TEXT)}
            />

            <Pair>
              <Plate
                image="/work/lunja-village/lunja-social-4.png"
                alt={say(HERO.alt)}
                shape="aspect-square"
              />
              <Plate
                image="/work/lunja-village/lunja-brand-tote.png"
                alt={say({
                  fr: "Tote bag Lunja Village",
                  en: "Lunja Village tote bag",
                })}
                shape="aspect-square"
                delay={0.08}
              />
            </Pair>
          </Chapter>

          <Chapter id="positionnement">
            <Caption
              index={2}
              say={say}
              label={say({
                fr: "Rebranding · Positionnement",
                en: "Rebranding · Positioning",
              })}
              title={say(POSITIONING.title)}
              text={say(POSITIONING.text)}
            />

            <div className="grid gap-1.5 sm:grid-cols-2">
              {POSITIONING.plates.map((plate, index) => (
                <Plate
                  key={plate.image}
                  image={plate.image}
                  alt={say(plate.alt)}
                  caption={say(plate.caption)}
                  shape="aspect-square"
                  delay={(index % 2) * 0.08}
                />
              ))}
            </div>
          </Chapter>

          <Chapter id="marque">
            <Caption
              index={3}
              say={say}
              title={say(BRAND_TITLE)}
              text={say(BRAND.essence)}
              meta={`${BRAND.type.length} ${say({ fr: "polices", en: "typefaces" })}`}
            />

            <Pair>
              <Reveal amount={0.1}>
                <figure
                  className={cn(FRAME, "aspect-square")}
                  style={{ backgroundColor: BRAND.ground }}
                  data-cursor={cursorOn(BRAND.ground)}
                >
                  <Image
                    src={BRAND.wordmark}
                    alt={say(BRAND.wordmarkAlt)}
                    fill
                    quality={90}
                    sizes={HALF}
                    className="object-contain"
                  />
                  <figcaption className="font-label text-ink absolute top-6 left-7 text-[0.78rem] font-bold tracking-[0.18em] uppercase">
                    {say({ fr: "Identité", en: "Identity" })}
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal amount={0.1} delay={0.08} className="h-full">
                <div className="bg-beige flex h-full flex-col rounded-4xl p-7 sm:p-9">
                  <p className="font-label text-teal text-[0.78rem] font-bold tracking-[0.18em] uppercase">
                    {say({ fr: "Typographie", en: "Typography" })}
                  </p>

                  {/* The three faces share the height of the wordmark beside
                      them, so the panel is filled rather than bottom-heavy. */}
                  <ul className="mt-5 flex flex-1 flex-col">
                    {BRAND.type.map((face) => (
                      <li
                        key={face.name}
                        className="border-beige-dk flex flex-1 items-center gap-6 border-t py-4"
                      >
                        <span
                          aria-hidden
                          className="text-teal w-[1.6em] shrink-0 text-[clamp(2.75rem,4.6vw,4.25rem)] leading-none"
                          style={{ fontFamily: face.stack }}
                        >
                          Aa
                        </span>
                        <span className="min-w-0">
                          <span className="font-display text-ink block text-[1.25rem] leading-tight font-bold sm:text-[1.375rem]">
                            {face.name}
                          </span>
                          <span className="text-ink mt-1.5 block text-[1rem] leading-snug">
                            {say(face.role)}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </Pair>
          </Chapter>

          <Chapter id="palette">
            <Caption
              index={4}
              say={say}
              title={say(PALETTE_TITLE)}
              text={say(BRAND.lead)}
              meta={`${BRAND.colors.length} ${say({ fr: "couleurs", en: "colours" })}`}
            />

            <div className="grid gap-1.5">
              {BRAND.colors.map((color, index) => {
                const tone =
                  cursorOn(color.hex) === "light" ? "text-canvas" : "text-ink";

                return (
                  <Reveal key={color.hex} amount={0.2} delay={index * 0.04}>
                    <div
                      className={cn(
                        "grid gap-6 rounded-4xl p-7 sm:grid-cols-2 sm:gap-10 sm:p-9",
                        tone,
                      )}
                      style={{ backgroundColor: color.hex }}
                      data-cursor={cursorOn(color.hex)}
                    >
                      <div>
                        <p className="font-label text-[0.78rem] font-bold tracking-[0.18em] uppercase">
                          {String(index + 1).padStart(2, "0")} · {say(color.role)}
                        </p>
                        <p className="font-display mt-4 text-[clamp(2rem,3.4vw,3rem)] leading-none font-extrabold tracking-[-0.04em]">
                          {color.name}
                        </p>
                        <p className="numeral mt-3 text-[1rem] font-semibold tracking-[0.08em]">
                          {color.hex}
                        </p>
                      </div>

                      <div className="self-end">
                        <p className="font-display text-[1.375rem] leading-snug font-bold tracking-[-0.02em]">
                          {say(color.note.title)}
                        </p>
                        <p className="mt-2 text-[1.0625rem] leading-relaxed">
                          {say(color.note.text)}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Chapter>

          <Chapter id="marketing">
            <Caption
              index={5}
              say={say}
              title={say(MARKETING.title)}
              text={say(MARKETING.text)}
            />

            <Pair>
              {MARKETING.posts.map((post, index) => (
                <Plate
                  key={post}
                  image={post}
                  alt={say({
                    fr: "Publication sociale Lunja",
                    en: "Lunja social post",
                  })}
                  caption={
                    index === 0 ? say({ fr: "Social", en: "Social" }) : undefined
                  }
                  shape="aspect-4/5"
                  delay={index * 0.08}
                />
              ))}
            </Pair>
          </Chapter>

          <Chapter id="achat-media">
            <Caption
              index={6}
              say={say}
              label={say({
                fr: "Revenu · Achat média",
                en: "Revenue · Media buying",
              })}
              title={say(MEDIA.title)}
              text={say(MEDIA.text)}
            />

            <Pair>
              <Plate
                image={MEDIA.post}
                alt={say({
                  fr: "Publication sociale Lunja",
                  en: "Lunja social post",
                })}
                shape="aspect-4/5"
              />

              {/* The three signals the budget was pointed at, lifted from the
                  chapter's own text. */}
              <Reveal amount={0.1} delay={0.08} className="h-full">
                <div className="bg-teal text-canvas flex h-full flex-col justify-center rounded-4xl p-8 sm:p-10">
                  <ol className="flex flex-col">
                    {SIGNALS.map((signal, index) => (
                      <li
                        key={signal.fr}
                        className="border-teal-dk grid grid-cols-[3rem_1fr] items-baseline border-t py-6 first:border-t-0 first:pt-0 last:pb-0"
                      >
                        <span className="font-label text-gold text-[0.85rem] font-bold tracking-[0.16em] tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[clamp(1.625rem,2.8vw,2.5rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">
                          {say(signal)}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </Pair>
          </Chapter>

          <Chapter id="impact">
            <Caption
              index={7}
              say={say}
              title={say(IMPACT.title)}
              text={say(IMPACT.text)}
            />

            <Reveal amount={0.15}>
              <div className="bg-beige relative isolate grid gap-8 overflow-hidden rounded-4xl px-7 py-12 sm:grid-cols-2 sm:items-end sm:px-12 sm:py-16">
                <div aria-hidden className="absolute inset-0 -z-10">
                  <Image
                    src={HERO.image}
                    alt=""
                    fill
                    quality={70}
                    sizes={FULL}
                    className="object-cover opacity-20"
                  />
                  <span className="absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_0%,transparent,var(--color-beige)_75%)]" />
                </div>

                <p className="font-display text-teal text-[clamp(4.5rem,12vw,9.5rem)] leading-[0.82] font-extrabold tracking-[-0.06em]">
                  <CountUp value={IMPACT.metric} />
                </p>
                <p className="font-display text-ink text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.15] font-bold tracking-[-0.025em]">
                  {say(IMPACT.metricLine)}
                </p>
              </div>
            </Reveal>
          </Chapter>

          <Chapter id="le-travail">
            <Caption
              index={8}
              say={say}
              title={say({
                fr: "La preuve, après l'argument.",
                en: "The proof, after the argument.",
              })}
              meta={`${WORK.length} ${say({ fr: "images", en: "pictures" })}`}
            />

            <Gallery items={WORK} say={say} />
          </Chapter>
        </div>
      </div>

      <NextProjects say={say} />
    </div>
  );
}

function Rail({ active, say }: { active: ChapterId; say: (value: Say) => string }) {
  return (
    <aside className="border-beige-dk no-scrollbar relative z-20 border-b lg:sticky lg:top-0 lg:h-dvh lg:self-start lg:overflow-y-auto lg:border-r lg:border-b-0">
      <div className="flex h-full flex-col px-5 pt-24 pb-10 sm:px-10 sm:pt-32 lg:px-7 lg:pt-28 lg:pb-6 xl:px-9">
        <Link
          href="/clients-v2"
          className="group font-label text-ink hover:text-teal inline-flex w-fit items-center gap-1.5 text-[0.75rem] font-bold tracking-[0.18em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
        >
          <ChevronLeft
            aria-hidden
            strokeWidth={2.2}
            className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:-translate-x-0.5 motion-reduce:transition-none"
          />
          {say({ fr: "Tous les projets", en: "All projects" })}
        </Link>

        <p className="eyebrow text-teal mt-7 flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-current" />
          {say({ fr: "Étude de cas", en: "Case study" })}
        </p>

        <h1 className="text-ink mt-5 text-[clamp(2.25rem,5vw,3rem)] lg:text-[clamp(2rem,2.6vw,2.75rem)]">
          {CLIENT}
        </h1>

        <p className="text-ink/70 mt-3 max-w-md text-[14px] leading-snug">
          {say(HERO.statement)}
        </p>

        <p className="font-label text-gold-dk mt-5 text-[0.75rem] leading-relaxed font-bold tracking-[0.16em] uppercase">
          <span className="block">
            {say(CATEGORY)} · {YEAR}
          </span>
          <span className="block">{say(LOCATION)}</span>
        </p>

        <nav
          aria-label={say({ fr: "Chapitres", en: "Chapters" })}
          className="mt-9 hidden lg:block"
        >
          <ol className="flex flex-col gap-1.5">
            {CHAPTERS.map((chapter) => {
              const on = chapter.id === active;

              return (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    aria-current={on ? "location" : undefined}
                    className={cn(
                      "group relative flex items-center py-0.5 text-[1.0625rem] leading-snug transition-[color,opacity] duration-400 ease-[var(--ease-brand)] motion-reduce:transition-none",
                      on
                        ? "text-teal font-semibold"
                        : "text-ink opacity-40 hover:opacity-100",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "bg-teal absolute -left-3.5 size-1.5 rounded-full transition-[opacity,scale] duration-400 ease-[var(--ease-brand)] motion-reduce:transition-none",
                        on ? "scale-100 opacity-100" : "scale-50 opacity-0",
                      )}
                    />
                    {say(chapter.label)}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <a
          href={SITE}
          target="_blank"
          rel="noreferrer noopener"
          className="group border-ink text-ink hover:bg-ink hover:text-canvas font-label mt-8 inline-flex w-fit items-center gap-2.5 rounded-full border px-5 py-3 text-[0.75rem] font-bold tracking-[0.16em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none lg:mt-auto"
        >
          {say({ fr: "Voir le site", en: "View the site" })}
          <ArrowUpRight
            aria-hidden
            strokeWidth={2}
            className="size-4 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </a>
      </div>
    </aside>
  );
}

/** The chapter index on a phone: tabs held under the header. */
function Tabs({ active, say }: { active: ChapterId; say: (value: Say) => string }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = track.current;
    const tab = box?.querySelector<HTMLElement>(`[data-chapter="${active}"]`);
    if (!box || !tab) return;
    box.scrollTo({
      left: tab.offsetLeft - box.clientWidth / 2 + tab.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label={say({ fr: "Chapitres", en: "Chapters" })}
      className="bg-canvas border-beige-dk sticky top-16 z-30 -mx-1.5 mb-1.5 border-b sm:top-18 lg:hidden"
    >
      <div
        ref={track}
        className="no-scrollbar flex gap-1.5 overflow-x-auto px-3 py-2.5"
      >
        {CHAPTERS.map((chapter) => {
          const on = chapter.id === active;

          return (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              data-chapter={chapter.id}
              data-scroll-offset="-132"
              aria-current={on ? "location" : undefined}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-[0.875rem] font-semibold whitespace-nowrap transition-colors duration-300 ease-[var(--ease-brand)] motion-reduce:transition-none",
                on ? "bg-teal text-canvas" : "bg-beige text-ink",
              )}
            >
              {say(chapter.label)}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function Chapter({ id, children }: { id: ChapterId; children: ReactNode }) {
  return (
    <section id={id} className="grid gap-1.5 pb-1.5">
      {children}
    </section>
  );
}

/**
 * The row that opens a chapter: number and name across the top, the claim on
 * the left, the argument on the right. With no argument the claim takes both.
 */
function Caption({
  index,
  say,
  label,
  title,
  text,
  meta,
}: {
  index: number;
  say: (value: Say) => string;
  label?: string;
  title: string;
  text?: string;
  meta?: string;
}) {
  return (
    <Reveal amount={0.2}>
      <header className="border-beige-dk mx-2 grid gap-x-12 gap-y-4 border-t pt-6 pb-8 sm:mx-4 sm:pt-7 sm:pb-10 lg:grid-cols-2">
        <p className="font-label flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.78rem] font-bold tracking-[0.18em] uppercase lg:col-span-2">
          <span className="text-gold-dk tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-teal">{label ?? say(CHAPTERS[index].label)}</span>
          {meta ? <span className="text-gold-dk">· {meta}</span> : null}
        </p>

        <h2
          className={cn(
            "font-display text-ink text-[clamp(1.875rem,3.3vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.04em]",
            !text && "lg:col-span-2",
          )}
        >
          {title}
        </h2>

        {text ? (
          <p className="text-ink text-[1.0625rem] leading-[1.7] sm:text-[1.125rem]">
            {text}
          </p>
        ) : null}
      </header>
    </Reveal>
  );
}

function Pair({ children }: { children: ReactNode }) {
  return <div className="grid gap-1.5 sm:grid-cols-2">{children}</div>;
}

function Plate({
  image,
  alt,
  shape,
  caption,
  sizes = HALF,
  delay = 0,
}: {
  image: string;
  alt: string;
  shape: string;
  caption?: string;
  sizes?: string;
  delay?: number;
}) {
  return (
    <Reveal amount={0.1} delay={delay}>
      <figure className={cn(FRAME, "group", shape)}>
        <Image
          src={image}
          alt={alt}
          fill
          quality={90}
          sizes={sizes}
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-brand)] group-hover:scale-[1.03] motion-reduce:transition-none"
        />
        {caption ? (
          <figcaption className="font-label text-canvas absolute bottom-5 left-6 text-[0.78rem] font-bold tracking-[0.18em] uppercase [text-shadow:0_1px_12px_rgba(0,0,0,0.8)]">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </Reveal>
  );
}

function ListPanel({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "reality" | "fracture";
}) {
  const fracture = tone === "fracture";

  return (
    <Reveal amount={0.15} delay={fracture ? 0.08 : 0} className="h-full">
      <div
        className={cn(
          "flex h-full flex-col rounded-4xl p-7 sm:p-9",
          fracture ? "bg-forest text-canvas" : "bg-beige text-ink",
        )}
      >
        <p
          className={cn(
            "font-label text-[0.78rem] font-bold tracking-[0.18em] uppercase",
            fracture ? "text-gold" : "text-teal",
          )}
        >
          {label}
        </p>

        <ol className="mt-6 flex flex-1 flex-col justify-between">
          {items.map((item, index) => (
            <li
              key={item}
              className={cn(
                "grid grid-cols-[2.5rem_1fr] items-baseline border-t py-4 first:border-t-0 first:pt-0 last:pb-0 sm:py-5",
                fracture ? "border-forest-md" : "border-beige-dk",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "font-label text-[0.8rem] font-bold tracking-[0.16em] tabular-nums",
                  fracture ? "text-gold" : "text-teal",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[1.1875rem] leading-snug font-bold tracking-[-0.02em] sm:text-[1.375rem]">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

function Gallery({
  items,
  say,
}: {
  items: { image: string; alt: Say }[];
  say: (value: Say) => string;
}) {
  const first = items[0];
  const last = items[items.length - 1];
  const middle = items.slice(1, -1);

  return (
    <div className="grid gap-1.5">
      <Plate
        image={first.image}
        alt={say(first.alt)}
        shape="aspect-4/3 sm:aspect-16/9"
        sizes={FULL}
      />

      <div className="grid gap-1.5 sm:grid-cols-2">
        {middle.map((item, index) => (
          <Plate
            key={item.image}
            image={item.image}
            alt={say(item.alt)}
            shape="aspect-4/3"
            delay={(index % 2) * 0.06}
          />
        ))}
      </div>

      <Plate
        image={last.image}
        alt={say(last.alt)}
        shape="aspect-4/3 sm:aspect-16/9"
        sizes={FULL}
      />
    </div>
  );
}

function NextProjects({ say }: { say: (value: Say) => string }) {
  return (
    <section
      aria-label={say({ fr: "Projets suivants", en: "Next projects" })}
      className="border-beige-dk border-t"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 px-5 pt-12 pb-6 sm:px-10 sm:pt-16 lg:px-7 xl:px-9">
        <h2 className="font-display text-ink text-[clamp(1.875rem,3.3vw,3rem)] leading-none font-extrabold tracking-[-0.04em]">
          {say({ fr: "Transformations suivantes", en: "Next transformations" })}
        </h2>

        <Link
          href="/clients-v2"
          className="font-label text-ink hover:text-teal inline-flex items-center gap-2 text-[0.78rem] font-bold tracking-[0.18em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
        >
          {say({ fr: "Tous les projets", en: "All projects" })}
          <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
        </Link>
      </div>

      <div className="grid gap-1.5 p-1.5 sm:grid-cols-2">
        {NEXT.map((project, index) => (
          <Reveal key={project.slug} amount={0.15} delay={index * 0.08}>
            <Link
              href={`/projects/${project.slug}`}
              transitionTypes={["case-open"]}
              aria-label={`${project.client}, ${say(project.category)}`}
              className="group focus-visible:outline-teal relative block focus-visible:outline-2 focus-visible:-outline-offset-4"
            >
              <div className={cn(FRAME, "aspect-4/3 lg:aspect-16/11")}>
                <Image
                  src={project.image}
                  alt=""
                  aria-hidden
                  fill
                  quality={90}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-brand)] group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 sm:p-8">
                  <div className="min-w-0">
                    <p className="font-label text-gold text-[0.78rem] font-bold tracking-[0.18em] uppercase">
                      {say(project.category)}
                    </p>
                    <h3 className="font-display text-canvas mt-2.5 text-[clamp(2rem,3.6vw,3rem)] leading-[0.95] font-extrabold tracking-[-0.05em] text-balance transition-transform duration-700 ease-[var(--ease-brand)] group-hover:translate-x-1 motion-reduce:transition-none">
                      {project.client}
                    </h3>
                  </div>

                  <span
                    aria-hidden
                    className="border-canvas text-canvas group-hover:bg-canvas group-hover:text-ink flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
                  >
                    <ArrowUpRight className="size-5" strokeWidth={1.8} />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
