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
  useSay,
  type NextProject,
  type Say,
} from "@/components/case-v2/kit";
import type { PaletteStory } from "@/lib/data/projects/types";

const CLIENT = "DMC Hospitality Morocco";
const YEAR = "2024";
const CATEGORY: Say = { fr: "Hôtellerie", en: "Hospitality" };
const LOCATION: Say = { fr: "Maroc", en: "Morocco" };
const SITE = "https://dmchm.com";

const HERO = {
  statement: {
    fr: "Trente ans d'expertise, enfin dotés d'un nom.",
    en: "Thirty years of expertise, finally given a name.",
  },
  image: "/work/dmc-morocco/dmc-hero.png",
  alt: {
    fr: "Univers de marque DMC Hospitality Morocco",
    en: "The DMC Hospitality Morocco brand world",
  },
};

/* The v1 intro, cut at its full stop. */
const CHALLENGE = {
  title: {
    fr: "Un opérateur hôtelier dont la réputation ne circulait que de bouche à oreille.",
    en: "A hotel operator whose reputation travelled entirely by word of mouth.",
  },
  text: {
    fr: "Nous avons commencé à la page blanche : le nom, puis tout ce qui en découle.",
    en: "We started at the blank page: the name, then everything that follows from it.",
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

const CREATION = {
  title: {
    fr: "Le nom, l'identité et les règles qui vont avec, à partir de rien.",
    en: "Name, identity and the rules that go with them, from nothing.",
  },
  text: {
    fr: "Monogramme, système typographique et livre de règles   puis reportés sur les objets que la société met réellement entre les mains des gens : une carte, une tenue, un dossier. Playfair pour le nom, Cormorant pour ce qui se cite, Source Sans pour ce qui se lit longtemps : une maison qui a travaillé pour Hyatt, ACCOR et One&Only devait se présenter au même niveau.",
    en: "Monogram, typographic system and a guidelines book   then carried onto the things the company actually hands people: a card, a uniform, a dossier. Playfair for the name, Cormorant for what gets quoted, Source Sans for what gets read at length: a business that has worked for Hyatt, ACCOR and One&Only had to introduce itself at the same level.",
  },
  plates: [
    {
      image: "/work/dmc-morocco/dmc-brand-logo.png",
      caption: { fr: "Monogramme", en: "Monogram" },
      alt: {
        fr: "Monogramme DMC Hospitality Morocco",
        en: "DMC Hospitality Morocco monogram",
      },
    },
    {
      image: "/work/dmc-morocco/dmc-brand-logo-mark.png",
      caption: { fr: "Logo", en: "Logo" },
      alt: {
        fr: "Logo DMC Hospitality Morocco",
        en: "DMC Hospitality Morocco logo",
      },
    },
    {
      image: "/work/dmc-morocco/dmc-guidelines.png",
      caption: { fr: "Charte", en: "Guidelines" },
      alt: {
        fr: "Charte graphique DMC Hospitality Morocco",
        en: "DMC Hospitality Morocco brand guidelines",
      },
    },
    {
      image: "/work/dmc-morocco/dmc-brand-uniform.png",
      caption: { fr: "Application", en: "Application" },
      alt: {
        fr: "Tenue aux couleurs de DMC",
        en: "Uniform in the DMC identity",
      },
    },
  ],
};

const BRAND = {
  ground: "#141c19",
  wordmark: "/work/dmc-morocco/dmc-brand-logo.png",
  wordmarkAlt: {
    fr: "Marque DMC Hospitality Morocco",
    en: "DMC Hospitality Morocco brand mark",
  },
  lead: {
    fr: "Une marque adressée à des opérateurs : elle doit être crue avant d'être aimée.",
    en: "A brand addressed to operators: it has to be believed before it is liked.",
  },
  /* The v1 essence, cut where its dash used to be. */
  essence: {
    title: {
      fr: "Monogramme, système typographique et livre de règles.",
      en: "Monogram, typographic system and a guidelines book.",
    },
    text: {
      fr: "Puis reportés sur les objets que la société met réellement entre les mains des gens : une carte, une tenue, un dossier.",
      en: "Then carried onto the things the company actually hands people: a card, a uniform, a dossier.",
    },
  },
  colors: [
    { name: "Forêt", hex: "#3D4F44", role: { fr: "Fondation", en: "Foundation" } },
    { name: "Or", hex: "#D4B896", role: { fr: "Signature", en: "Signature" } },
    {
      name: "Sable Doré",
      hex: "#E8D5B5",
      role: { fr: "Fond clair", en: "Light ground" },
    },
    { name: "Encre", hex: "#1A1F1C", role: { fr: "Ancrage", en: "Anchor" } },
  ],
  type: [
    {
      name: "Playfair Display",
      stack: "'Playfair Display', Georgia, serif",
      role: { fr: "Titres et signature", en: "Titles and signature" },
    },
    {
      name: "Libre Baskerville",
      stack: "'Libre Baskerville', Georgia, serif",
      role: { fr: "Textes longs", en: "Long-form text" },
    },
    {
      name: "Cormorant Garamond",
      stack: "'Cormorant Garamond', Georgia, serif",
      role: { fr: "Étiquettes", en: "Labels" },
    },
  ],
  notes: [
    {
      title: { fr: "L'assise", en: "The footing" },
      text: {
        fr: "Un vert sourd, sans éclat.",
        en: "A muted green with no shine to it.",
      },
    },
    {
      title: { fr: "Trente ans, sans le dire", en: "Thirty years, unsaid" },
      text: {
        fr: "L'or n'est pas décoratif ici.",
        en: "The gold is not decoration.",
      },
    },
    {
      title: { fr: "Le repos de l'œil", en: "Where the eye rests" },
      text: {
        fr: "Le sable tient les documents longs : dossiers, présentations, propositions.",
        en: "Sand carries the long documents   decks, proposals, dossiers.",
      },
    },
    {
      title: { fr: "Ce qui se lit", en: "What gets read" },
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

const PALETTE: PaletteStory = {
  title: { fr: "Le langage visuel", en: "The visual language" },
  lead: BRAND.lead,
  colors: BRAND.colors,
  // One note per colour, so every step of the scroll brings a new colour.
  states: BRAND.notes.slice(0, BRAND.colors.length).map((note, index) => ({
    title: note.title,
    text: note.text,
    colorIndex: index,
  })),
};

const WEBSITE = {
  title: {
    fr: "Écrit pour des opérateurs et des propriétaires, pas pour des voyageurs.",
    en: "Written for operators and owners, not for guests.",
  },
  text: {
    fr: "Un site d'hôtellerie qui ne montre pas de chambres. Celui qui le lit possède déjà le bâtiment : ce qu'il cherche, c'est ce que trente ans de gestion changent à son compte d'exploitation.",
    en: "A hospitality site that shows no bedrooms. Whoever is reading it already owns the building: what they are looking for is what thirty years of management does to their operating account.",
  },
};

const CONTENT = {
  title: {
    fr: "Une voix LinkedIn que le marché reconnaît.",
    en: "A LinkedIn voice the market recognises.",
  },
  text: {
    fr: "Le public tient dans quelques centaines de personnes, et elles se connaissent toutes. La publication est donc écrite comme on parle à un pair : un sujet du métier, une position tenue, et aucune promesse que la maison ne tient pas déjà.",
    en: "The audience is a few hundred people and they all know each other. So the posting is written the way you talk to a peer: one subject from the trade, one position held, and no promise the business is not already keeping.",
  },
  posts: [
    "/work/dmc-morocco/dmc-social-excellence.png",
    "/work/dmc-morocco/dmc-social-c.png",
    "/work/dmc-morocco/dmc-social-d.png",
    "/work/dmc-morocco/dmc-social-m.png",
  ],
};

const IMPACT = {
  title: {
    fr: "Le premier propriétaire qui écrit le premier.",
    en: "The first owner who writes first.",
  },
  text: {
    fr: "Une marque qui se présente elle-même, un site adressé à ceux qui achètent la gestion, et une voix que le marché reconnaît.",
    en: "A brand that introduces itself, a site addressed to the people who buy management, and a voice the market recognises.",
  },
  metric: "0 → 1",
  label: { fr: "Contacts entrants", en: "Inbound enquiries" },
  line: {
    fr: "D'aucun contact entrant à une présence qui en amène.",
    en: "From no inbound at all to a presence that brings it.",
  },
};

const WORK: { image: string; alt: Say }[] = [
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

const NEXT: NextProject[] = [
  {
    href: "/projects/educazen-kids",
    client: "EducazenKids",
    category: { fr: "Éducation", en: "Education" },
    image: "/work/educazen-kids/educazen-hero.png",
  },
  {
    href: "/lunja-village-v2",
    client: "Lunja Village",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/lunja-village/image lunja village portfoliio.png",
  },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  {
    id: "creation-de-marque",
    label: { fr: "Création de marque", en: "Brand creation" },
  },
  { id: "marque", label: { fr: "La planche de marque", en: "The brand board" } },
  { id: "palette", label: { fr: "Le langage visuel", en: "The visual language" } },
  { id: "site-web", label: { fr: "Site web", en: "Website" } },
  { id: "contenu", label: { fr: "Contenu", en: "Content" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
  { id: "le-travail", label: { fr: "Le travail", en: "The work" } },
];

export function DmcMoroccoV2View() {
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
            image="/work/dmc-morocco/dmc-brand-card.png"
            alt={say({ fr: "Carte de visite DMC", en: "DMC business card" })}
            shape="aspect-square"
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="creation-de-marque">
        <Caption index={2} title={say(CREATION.title)} text={say(CREATION.text)} />
        <Grid>
          {CREATION.plates.map((plate, index) => (
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
          title={say(BRAND.essence.title)}
          text={say(BRAND.essence.text)}
          meta={`${BRAND.type.length} ${say({ fr: "polices", en: "typefaces" })}`}
        />
        <BrandBoard
          ground={BRAND.ground}
          wordmark={BRAND.wordmark}
          wordmarkAlt={say(BRAND.wordmarkAlt)}
          contain={false}
          faces={BRAND.type}
        />
      </Chapter>

      <Chapter id="palette">
        <Caption
          index={4}
          title={say({
            fr: "Forêt, Or, Sable Doré, Encre.",
            en: "Forêt, Or, Sable Doré, Encre.",
          })}
          text={say(BRAND.notes[BRAND.colors.length].text)}
          meta={`${BRAND.colors.length} ${say({ fr: "couleurs", en: "colours" })}`}
        />
        <PaletteStage story={PALETTE} />
      </Chapter>

      <Chapter id="site-web">
        <Caption index={5} title={say(WEBSITE.title)} text={say(WEBSITE.text)} />
        <Pair>
          <Plate
            image="/work/dmc-morocco/dmc-web-desktop.png"
            alt={say({
              fr: "Le site DMC sur écran",
              en: "The DMC site on desktop",
            })}
            caption={say({ fr: "Desktop", en: "Desktop" })}
            shape="aspect-4/3"
          />
          <Plate
            image="/work/dmc-morocco/dmc-web-mobile.png"
            alt={say({
              fr: "Le site DMC sur téléphone",
              en: "The DMC site on a phone",
            })}
            caption={say({ fr: "Mobile", en: "Mobile" })}
            shape="aspect-4/3"
            contain
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="contenu">
        <Caption index={6} title={say(CONTENT.title)} text={say(CONTENT.text)} />
        <Grid>
          {CONTENT.posts.map((post, index) => (
            <Plate
              key={post}
              image={post}
              alt={say({ fr: "Publication sociale DMC", en: "DMC social post" })}
              caption={
                index === 0 ? say({ fr: "Social", en: "Social" }) : undefined
              }
              shape="aspect-4/5"
              delay={(index % 2) * 0.08}
            />
          ))}
        </Grid>
      </Chapter>

      <Chapter id="impact">
        <Caption index={7} title={say(IMPACT.title)} text={say(IMPACT.text)} />
        <ImpactPanel
          image={HERO.image}
          metric={IMPACT.metric}
          label={say(IMPACT.label)}
          line={say(IMPACT.line)}
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
