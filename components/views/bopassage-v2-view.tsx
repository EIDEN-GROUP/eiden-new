"use client";

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
  useSay,
  type NextProject,
  type Say,
} from "@/components/case-v2/kit";
import type { PaletteStory } from "@/lib/data/projects/types";

const CLIENT = "Bôpassage";
const YEAR = "2024";
const CATEGORY: Say = { fr: "Cafés & restaurants", en: "Cafés & Restaurants" };
const LOCATION: Say = { fr: "Agadir, Maroc", en: "Agadir, Morocco" };
const SITE = "https://bopassage.com";

const HERO = {
  statement: {
    fr: "Le lieu où l'on revient toujours.",
    en: "The place you always come back to.",
  },
  image: "/work/bopassage/bopassage-hero.png",
  alt: {
    fr: "La salle de Bôpassage à Agadir",
    en: "The Bôpassage dining room in Agadir",
  },
};

/* The v1 intro, cut at its full stop: the first sentence is the claim, the
   second the answer. */
const CHALLENGE = {
  title: {
    fr: "Un café-restaurant de Founty qui avait tout, sauf de quoi se faire trouver.",
    en: "A Founty café-restaurant that had everything except a way to be found.",
  },
  text: {
    fr: "Nous avons construit la marque, le site et le rythme qui portent le lieu au-delà de sa porte.",
    en: "We built the brand, the site and the rhythm that carry the place past its own door.",
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

const BRANDING = {
  title: {
    fr: "Forêt & Or, une identité tirée de la salle elle-même.",
    en: "Forêt & Or, an identity drawn from the room itself.",
  },
  text: {
    fr: "La chaleur botanique et la lumière dorée, fixées en système : le vert forêt installe l'ambiance, l'or du café donne le caractère, et les deux suffisent à reconnaître la marque partout. Playfair pour les titres et la carte, Montserrat pour ce qui oriente, et des applications de la tasse à l'enseigne.",
    en: "Botanical warmth and golden-hour light, fixed into a system: the forest green sets the room, the coffee gold gives it its character, and the two are enough to recognise the brand anywhere. Playfair for the titles and the menu, Montserrat for whatever has to direct, and applications from the cup to the sign.",
  },
  plates: [
    {
      image: "/work/bopassage/bopassage-brand-logo-green.png",
      caption: { fr: "Logo", en: "Logo" },
      alt: {
        fr: "Logotype principal et secondaire de Bôpassage",
        en: "Bôpassage primary and secondary wordmark",
      },
    },
    {
      image: "/work/bopassage/bopassage-brand-cup.png",
      caption: { fr: "Application", en: "Application" },
      alt: {
        fr: "Tasse aux couleurs de Bôpassage",
        en: "Cup in the Bôpassage colours",
      },
    },
    {
      image: "/work/bopassage/bopassage-brand-signage.png",
      caption: { fr: "Enseigne", en: "Signage" },
      alt: {
        fr: "Signalétique extérieure de Bôpassage",
        en: "Bôpassage exterior signage",
      },
    },
    {
      image: "/work/bopassage/bopassage-brand-identity.png",
      caption: { fr: "Système", en: "System" },
      alt: {
        fr: "Système d'identité Bôpassage",
        en: "Bôpassage identity system",
      },
    },
  ],
};

const BRAND = {
  ground: "#1e3b37",
  wordmark: "/work/bopassage/bopassage-brand-logo-green.png",
  wordmarkAlt: { fr: "Logotype Bôpassage", en: "Bôpassage wordmark" },
  lead: {
    fr: "Deux couleurs suffisent à reconnaître Bôpassage avant d'avoir lu son nom.",
    en: "Two colours are enough to recognise Bôpassage before its name has been read.",
  },
  essence: {
    fr: "La chaleur botanique et la lumière dorée, fixées en système.",
    en: "Botanical warmth and golden-hour light, fixed into a system.",
  },
  colors: [
    { name: "Forêt", hex: "#18312e", role: { fr: "Fondation", en: "Foundation" } },
    {
      name: "Ivoire",
      hex: "#f5eedf",
      role: { fr: "Fond clair", en: "Light ground" },
    },
    {
      name: "Or du Café",
      hex: "#b8973a",
      role: { fr: "Caractère", en: "Character" },
    },
    {
      name: "Or Doux",
      hex: "#d4b06a",
      role: { fr: "Textes & légendes", en: "Text & captions" },
    },
    { name: "Sauge", hex: "#6b8c74", role: { fr: "Botanique", en: "Botanical" } },
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

const PALETTE: PaletteStory = {
  title: { fr: "Le langage visuel", en: "The visual language" },
  lead: BRAND.lead,
  colors: BRAND.colors,
  states: BRAND.notes.map((note, index) => ({
    title: note.title,
    text: note.text,
    // Forward only: each note takes the next colour, a leftover note holds on the last.
    colorIndex: Math.min(index, BRAND.colors.length - 1),
  })),
};

const WEBSITE = {
  title: {
    fr: "La carte, l'adresse et la réservation à un pouce de distance.",
    en: "Menu, address and booking, a thumb away.",
  },
  text: {
    fr: "Les gens qui cherchent un restaurant posent deux questions : où, et quand. Le site répond aux deux avant tout le reste, et il est construit pour le téléphone parce que c'est là qu'on décide, debout, dix minutes avant de partir.",
    en: "People looking for a restaurant ask two questions: where, and when. The site answers both before anything else, and it is built for the phone because that is where the decision is made, standing up, ten minutes before leaving.",
  },
};

const MARKETING = {
  title: {
    fr: "Un rythme social que l'équipe peut tenir.",
    en: "A social rhythm the team can hold.",
  },
  text: {
    fr: "Pas une campagne de lancement, un rythme : des formats que la salle sait produire elle-même, un matin, un plat, une lumière. C'est ce qui fait qu'un compte est encore vivant six mois plus tard.",
    en: "Not a launch campaign, a rhythm: formats the room can produce on its own   a morning, a plate, a light. That is what makes an account still alive six months later.",
  },
};

const PAID = {
  title: {
    fr: "Une seule mesure : les couverts.",
    en: "One measure: covers.",
  },
  text: {
    fr: "Google Ads sur l’intention plutôt que sur l’audience, de l’affichage là où le quartier passe, et le tout réglé chaque mois sur ce que la salle a réellement servi. La découverte se transforme en réservation, et le rythme payant continue de tourner entre deux visites.",
    en: "Google Ads on intent rather than on audience, out-of-home where the neighbourhood actually walks, and all of it retuned every month against what the room actually served. Discovery turns into reservations, and the paid rhythm keeps working between visits.",
  },
  signals: [
    { fr: "Google Ads sur l'intention.", en: "Google Ads on intent." },
    {
      fr: "L'affichage où le quartier passe.",
      en: "Out-of-home where the neighbourhood walks.",
    },
    {
      fr: "Réglé chaque mois sur les couverts.",
      en: "Retuned every month against covers.",
    },
  ] as Say[],
};

const IMPACT = {
  title: {
    fr: "La marque se lit de la même façon sur un écran et à table.",
    en: "The brand reads the same on a screen as it does at the table.",
  },
  text: {
    fr: "Une identité tirée de la salle elle-même, un site construit pour le téléphone, et un rythme payant qui continue de tourner entre deux visites.",
    en: "An identity taken from the room itself, a site built for the phone, and a paid rhythm that keeps working between visits.",
  },
  metric: "×3",
  label: { fr: "Les couverts servis", en: "Covers served" },
  line: {
    fr: "La découverte se transforme en réservation.",
    en: "Discovery turns into reservations.",
  },
};

const WORK: { image: string; alt: Say }[] = [
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

const NEXT: NextProject[] = [
  {
    href: "/dmc-morocco-v2",
    client: "DMC Hospitality Morocco",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/dmc-morocco/dmc-hero.png",
  },
  {
    href: "/projects/educazen-kids",
    client: "EducazenKids",
    category: { fr: "Éducation", en: "Education" },
    image: "/work/educazen-kids/educazen-hero.png",
  },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  { id: "branding", label: { fr: "Branding", en: "Branding" } },
  { id: "marque", label: { fr: "La planche de marque", en: "The brand board" } },
  { id: "palette", label: { fr: "Le langage visuel", en: "The visual language" } },
  { id: "site-web", label: { fr: "Site web", en: "Website" } },
  { id: "marketing", label: { fr: "Marketing", en: "Marketing" } },
  { id: "media-payant", label: { fr: "Média payant", en: "Paid media" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
  { id: "le-travail", label: { fr: "Le travail", en: "The work" } },
];

export function BopassageV2View() {
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
      next={NEXT}
    >
      <Chapter id="le-defi">
        <Hero image={HERO.image} alt={say(HERO.alt)} />
        <Caption
          index={0}
          title={say(CHALLENGE.title)}
          text={say(CHALLENGE.text)}
        />
        <RealityFracture reality={REALITY} fracture={FRACTURE} />
      </Chapter>

      <Chapter id="architecture">
        <Caption index={1} title={say(DECISION)} text={say(CHAIN_TEXT)} />
        <Pair>
          <Plate image={HERO.image} alt={say(HERO.alt)} shape="aspect-square" />
          <Plate
            image="/work/bopassage/bopassage-brand-board.png"
            alt={say({
              fr: "Planche de marque Bôpassage",
              en: "Bôpassage brand board",
            })}
            shape="aspect-square"
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="branding">
        <Caption index={2} title={say(BRANDING.title)} text={say(BRANDING.text)} />
        <Grid>
          {BRANDING.plates.map((plate, index) => (
            <Plate
              key={plate.image}
              image={plate.image}
              alt={say(plate.alt)}
              caption={say(plate.caption)}
              shape="aspect-4/3"
              delay={(index % 2) * 0.08}
            />
          ))}
        </Grid>
      </Chapter>

      <Chapter id="marque">
        <Caption
          index={3}
          title={say(BRAND.essence)}
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
          index={4}
          title={say({ fr: "Forêt & Or.", en: "Forêt & Or." })}
          meta={`${BRAND.colors.length} ${say({ fr: "couleurs", en: "colours" })}`}
        />
        <PaletteStage story={PALETTE} />
      </Chapter>

      <Chapter id="site-web">
        <Caption index={5} title={say(WEBSITE.title)} text={say(WEBSITE.text)} />
        <Pair>
          <Plate
            image="/work/bopassage/bopassage-web-desktop.png"
            alt={say({
              fr: "Page d'accueil du site Bôpassage",
              en: "The Bôpassage homepage",
            })}
            caption={say({ fr: "Desktop", en: "Desktop" })}
            shape="aspect-4/3"
          />
          <Plate
            image="/work/bopassage/bopassage-web-mobile.png"
            alt={say({
              fr: "Le site Bôpassage sur téléphone",
              en: "The Bôpassage site on a phone",
            })}
            caption={say({ fr: "Mobile", en: "Mobile" })}
            shape="aspect-4/3"
            contain
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="marketing">
        <Caption
          index={6}
          title={say(MARKETING.title)}
          text={say(MARKETING.text)}
        />
        <Pair>
          <Plate
            image="/work/bopassage/bopassage-social-matcha.png"
            alt={say({
              fr: "Publication sociale Bôpassage",
              en: "Bôpassage social post",
            })}
            caption={say({ fr: "Social", en: "Social" })}
            shape="aspect-4/5"
          />
          <Plate
            image="/work/bopassage/bopassage-social-instagram.png"
            alt={say({
              fr: "Profil Instagram Bôpassage",
              en: "Bôpassage Instagram profile",
            })}
            caption={say({ fr: "Profil", en: "Profile" })}
            shape="aspect-4/5"
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="media-payant">
        <Caption
          index={7}
          label={say({ fr: "Revenu · Média payant", en: "Revenue · Paid media" })}
          title={say(PAID.title)}
          text={say(PAID.text)}
        />
        <Pair>
          <Plate
            image="/work/bopassage/bopassage-application.png"
            alt={say({
              fr: "Affichage extérieur Bôpassage",
              en: "Bôpassage out-of-home poster",
            })}
            caption={say({ fr: "Affichage", en: "Out of home" })}
            shape="aspect-4/5"
          />
          <SignalsPanel items={PAID.signals.map(say)} />
        </Pair>
      </Chapter>

      <Chapter id="impact">
        <Caption index={8} title={say(IMPACT.title)} text={say(IMPACT.text)} />
        <ImpactPanel
          image={HERO.image}
          metric={IMPACT.metric}
          label={say(IMPACT.label)}
          line={say(IMPACT.line)}
        />
      </Chapter>

      <Chapter id="le-travail">
        <Caption
          index={9}
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
