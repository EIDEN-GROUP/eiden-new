"use client";

import { Anton } from "next/font/google";
import {
  BrandBoard,
  CaseV2,
  Caption,
  Chapter,
  Gallery,
  Grid,
  Hero,
  ImpactPanel,
  Pair,
  PaletteStage,
  Plate,
  RealityFracture,
  SignalsPanel,
  Slides,
  useSay,
  type NextProject,
} from "@/components/case-v2/kit";
import type { PaletteStory } from "@/lib/data/projects/types";

type Say = { fr: string; en: string };

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });

const CLIENT = "Lunja Village";
const YEAR = "2024";
const CATEGORY: Say = { fr: "Hôtellerie", en: "Hospitality" };
const LOCATION: Say = {
  fr: "Imi Ouaddar, Taghazout",
  en: "Imi Ouaddar, Taghazout",
};
const SITE = "https://www.lunjavillage.com";
const SOCIALS = {
  instagram: "https://www.instagram.com/lunjavillage.officiel/",
  facebook: "https://www.facebook.com/lunjavillage.Agadir.Morocco/",
};

const HERO = {
  statement: {
    fr: "Parler comme quelqu'un qui y vit déjà.",
    en: "Speak like someone who already lives there.",
  },
  intro: {
    fr: "Un village côtier dont la marque disait encore « resort » alors que ceux qui arrivaient étaient surfeurs, nomades et collectifs créatifs. Nous l'avons reconstruite pour le client qui vient vraiment.",
    en: "A coastal village whose brand still said “resort” while the people turning up were surfers, nomads and creative groups. We rebuilt it for the guest actually arriving.",
  },
  image: "/work/lunja-village/hero section lunja.png",
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
  plates: [
    {
      image: "/work/lunja-village/logo-lunja-village.jpg",
      caption: { fr: "Logo", en: "Logo" },
      alt: { fr: "Logo Lunja Village", en: "Lunja Village logo" },
    },
    {
      image: "/work/lunja-village/branding-2.jpeg",
      caption: { fr: "Planche de marque", en: "Brand board" },
      alt: { fr: "Planche de marque Lunja", en: "Lunja brand board" },
    },
    {
      image: "/work/lunja-village/branding-3.jpg",
      caption: { fr: "Système", en: "System" },
      alt: {
        fr: "L'identité Lunja en situation",
        en: "The Lunja identity in place",
      },
    },
    {
      image: "/work/lunja-village/branding.jpeg",
      caption: { fr: "Application", en: "Application" },
      alt: { fr: "Tote bag Lunja Village", en: "Lunja Village tote bag" },
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
      name: "JOE Yellow",
      hex: "#F4DE12",
      role: { fr: "Primaire", en: "Primary" },
      note: {
        title: { fr: "Le jaune du partenaire", en: "The partner's yellow" },
        text: {
          fr: "Ce jaune n'est pas un choix esthétique : c'est celui de Jo&Joe, la plateforme avec laquelle le village co-signe.",
          en: "That yellow is not an aesthetic choice: it is Jo&Joe's, the platform the village co-signs with.",
        },
      },
    },
    {
      name: "Ink Black",
      hex: "#131110",
      role: { fr: "Titres et affiches", en: "Headlines and posters" },
      note: {
        title: { fr: "Jamais gris", en: "Never grey" },
        text: {
          fr: "Le noir porte chaque titre et sert de second fond d'affiche, sans jamais s'adoucir en gris.",
          en: "Ink carries every headline and the alternate poster ground, never softened to grey.",
        },
      },
    },
    {
      name: "Sunset Red",
      hex: "#C6371F",
      role: { fr: "Urgence", en: "Urgency" },
      note: {
        title: { fr: "Ce soir, pas demain", en: "Tonight, not tomorrow" },
        text: {
          fr: "Le rouge est réservé à ce qui presse : un compte à rebours, une soirée, un complet.",
          en: "Red is kept for what cannot wait: a countdown, a night out, a sold-out flag.",
        },
      },
    },
    // {
    //   name: "Ocean Teal",
    //   hex: "#3D86A3",
    //   role: { fr: "Photographie", en: "Photography" },
    //   note: {
    //     title: { fr: "L'eau, d'abord", en: "The water, first" },
    //     text: {
    //       fr: "Le teal n'est pas une couleur graphique : c'est le ton de la vague, vers lequel on étalonne les bleus.",
    //       en: "Teal is not a graphic colour: it is the tone of the wave, the one the blues are graded toward.",
    //     },
    //   },
    // },
    // {
    //   name: "Warm Wood",
    //   hex: "#875B39",
    //   role: { fr: "Tons chauds", en: "Warm tones" },
    //   note: {
    //     title: { fr: "Du bois, pas du gris", en: "Wood, not grey" },
    //     text: {
    //       fr: "Le bois revient dans les intérieurs, la peau et le bar ; les ombres tirent vers lui plutôt que vers le gris froid.",
    //       en: "Wood returns in the interiors, the skin and the bar; shadows lean toward it rather than cool grey.",
    //     },
    //   },
    // },
    {
      name: "Sand Paper",
      hex: "#F7F0E1",
      role: { fr: "Fond", en: "Background" },
      note: {
        title: {
          fr: "Un village, pas une brochure",
          en: "A village, not a brochure",
        },
        text: {
          fr: "Le sable remplace le blanc pur : plus chaud, il laisse le reste exister.",
          en: "Sand replaces pure white: warmer, it lets the rest exist.",
        },
      },
    },
  ],
  type: [
    {
      name: "Anton",
      stack: anton.style.fontFamily,
      role: { fr: "Titres et affiches", en: "Display and posters" },
    },
    {
      name: "Inter",
      stack: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
      role: { fr: "Corps et légendes", en: "Body and captions" },
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
    "/work/lunja-village/image social lunja site.png",
    "/work/lunja-village/iPhone lunja insta img_Plan de travail .png",
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
  posts: [
    "/work/lunja-village/lunja-social-7.png",
    "/work/lunja-village/lunja-social-1.png",
    "/work/lunja-village/lunja-social-2.png",
  ],
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
    image: "/work/lunja-village/Drone 2.png",
    alt: {
      fr: "Vue drone à la verticale sur les toits du village",
      en: "Overhead drone view of the village rooftops",
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
    image: "/work/medical-bay/hero.jpeg",
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

const PALETTE: PaletteStory = {
  title: { fr: "Le langage visuel", en: "The visual language" },
  lead: BRAND.lead,
  colors: BRAND.colors.map(({ name, hex, role }) => ({ name, hex, role })),
  states: BRAND.colors.map((color, index) => ({
    title: color.note.title,
    text: color.note.text,
    colorIndex: index,
  })),
};

const SIGNALS: Say[] = [
  { fr: "Une date en tête.", en: "A date in mind." },
  { fr: "Un billet en attente.", en: "A flight on hold." },
  { fr: "Une planche à transporter.", en: "A board to carry." },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  { id: "marque", label: { fr: "La planche de marque", en: "The brand board" } },
  { id: "palette", label: { fr: "Le langage visuel", en: "The visual language" } },
  { id: "positionnement", label: { fr: "Positionnement", en: "Positioning" } },
  { id: "marketing", label: { fr: "Marketing", en: "Marketing" } },
  { id: "achat-media", label: { fr: "Achat média", en: "Media buying" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
  { id: "le-travail", label: { fr: "Galerie", en: "Gallery" } },
];

const NEXT_V2: NextProject[] = NEXT.map((project) => ({
  href: `/projects/${project.slug}`,
  client: project.client,
  category: project.category,
  image: project.image,
}));

export function LunjaVillageV2View() {
  const say = useSay();

  return (
    <CaseV2
      chapters={CHAPTERS}
      client={CLIENT}
      statement={HERO.statement}
      category={CATEGORY}
      location={LOCATION}
      year={YEAR}
      site={SITE}
      socials={SOCIALS}
      next={NEXT_V2}
    >
      <Chapter id="le-defi">
        <Hero image={HERO.image} alt={say(HERO.alt)} />
        <Caption index={0} title={say(STATEMENT)} text={say(HERO.intro)} />
        <RealityFracture reality={REALITY} fracture={FRACTURE} />
      </Chapter>

      <Chapter id="architecture">
        <Caption index={1} title={say(DECISION)} text={say(CHAIN_TEXT)} />
        <Pair>
          <Plate
            image="/work/lunja-village/positioning.png"
            alt={say(HERO.alt)}
            shape="aspect-square"
          />
          <Plate
            image="/work/lunja-village/image Positioning lunja.png"
            alt={say({
              fr: "Tote bag Lunja Village",
              en: "Lunja Village tote bag",
            })}
            shape="aspect-square"
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="marque">
        <Caption
          index={2}
          title={say(BRAND_TITLE)}
          text={say(BRAND.essence)}
          meta={`${BRAND.type.length} ${say({ fr: "polices", en: "typefaces" })}`}
        />
        <BrandBoard
          ground={BRAND.ground}
          wordmark={BRAND.wordmark}
          wordmarkAlt={say(BRAND.wordmarkAlt)}
          contain
          faces={BRAND.type}
        />
      </Chapter>

      <Chapter id="palette">
        <Caption
          index={3}
          title={say(PALETTE_TITLE)}
          meta={`${BRAND.colors.length} ${say({ fr: "couleurs", en: "colours" })}`}
        />
        <PaletteStage story={PALETTE} />
      </Chapter>

      <Chapter id="positionnement">
        <Caption
          index={4}
          label={say({
            fr: "Rebranding · Positionnement",
            en: "Rebranding · Positioning",
          })}
          title={say(POSITIONING.title)}
          text={say(POSITIONING.text)}
        />
        <Grid>
          {POSITIONING.plates.map((plate, index) => (
            <Plate
              key={plate.image}
              image={plate.image}
              alt={say(plate.alt)}
              // caption={say(plate.caption)}
              shape="aspect-square"
              delay={(index % 2) * 0.08}
            />
          ))}
        </Grid>
      </Chapter>

      <Chapter id="marketing">
        <Caption
          index={5}
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
              shape="aspect-4/4"
              delay={index * 0.08}
            />
          ))}
        </Pair>
      </Chapter>

      <Chapter id="achat-media" fit>
        <Caption
          index={6}
          label={say({ fr: "Revenu · Achat média", en: "Revenue · Media buying" })}
          title={say(MEDIA.title)}
          text={say(MEDIA.text)}
        />
        <Pair>
          <Slides
            items={MEDIA.posts.map((image) => ({
              image,
              alt: say({ fr: "Publication sociale Lunja", en: "Lunja social post" }),
            }))}
          />
          <SignalsPanel items={SIGNALS.map(say)} />
        </Pair>
      </Chapter>

      <Chapter id="impact">
        <Caption index={7} title={say(IMPACT.title)} text={say(IMPACT.text)} />
        <ImpactPanel
          image={HERO.image}
          metric={IMPACT.metric}
          line={say(IMPACT.metricLine)}
        />
      </Chapter>

      <Chapter id="le-travail">
        <Caption
          index={8}
          title={say({
            fr: "La preuve, après l'argument.",
            en: "The proof, after the argument.",
          })}
          meta={`${WORK.length} ${say({ fr: "images", en: "pictures" })}`}
        />
        <Gallery items={WORK} />
      </Chapter>
    </CaseV2>
  );
}
