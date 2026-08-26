import type { ProjectCase } from "./types";

export const dmcMorocco: ProjectCase = {
  slug: "dmc-morocco",
  client: "DMC Hospitality Morocco",
  year: "2024",
  category: { fr: "Hôtellerie", en: "Hospitality" },
  location: { fr: "Maroc", en: "Morocco" },

  hero: {
    statement: {
      fr: "Trente ans d'expertise, enfin dotés d'un nom.",
      en: "Thirty years of expertise, finally given a name.",
    },
    intro: {
      fr: "Un opérateur hôtelier dont la réputation ne circulait que de bouche à oreille. Nous avons commencé à la page blanche : le nom, puis tout ce qui en découle.",
      en: "A hotel operator whose reputation travelled entirely by word of mouth. We started at the blank page: the name, then everything that follows from it.",
    },
    image: "/work/dmc-hero.png",
    alt: {
      fr: "Univers de marque DMC Hospitality Morocco",
      en: "The DMC Hospitality Morocco brand world",
    },
  },

  services: [
    {
      name: { fr: "Création de marque", en: "Brand Creation" },
      note: {
        fr: "Le nom, l'identité et les règles qui vont avec, à partir de rien.",
        en: "Name, identity and guidelines, from nothing.",
      },
    },
    {
      name: { fr: "Site web", en: "Website" },
      note: {
        fr: "Écrit pour des opérateurs et des propriétaires, pas pour des voyageurs.",
        en: "Written for operators and owners, not for guests.",
      },
    },
    {
      name: { fr: "Positionnement", en: "Positioning" },
      note: {
        fr: "Trente ans de métier, énoncés simplement.",
        en: "Thirty years of know-how, stated plainly.",
      },
    },
    {
      name: { fr: "Contenu", en: "Content" },
      note: {
        fr: "Une voix LinkedIn que le marché reconnaît.",
        en: "A LinkedIn voice the market recognises.",
      },
    },
    {
      name: { fr: "Génération de leads", en: "Lead Generation" },
      note: {
        fr: "Les premières conversations qui arrivent d'elles-mêmes.",
        en: "The first conversations arriving inbound at last.",
      },
    },
  ],

  transformation: {
    title: {
      fr: "D'une réputation qu'il fallait déjà connaître, à une marque qui se présente elle-même.",
      en: "From a reputation you had to already know about, to a brand that introduces itself.",
    },
    text: [
      {
        fr: "Trois décennies de gestion hôtelière, sans marque, sans site et sans voix.",
        en: "Three decades of hospitality management, with no brand, no site and no voice.",
      },
      {
        fr: "L'expertise ne circulait que de bouche à oreille.",
        en: "The expertise only ever travelled by word of mouth.",
      },
      {
        fr: "Nous avons construit le nom et le visage qu'elle avait déjà mérités.",
        en: "We built the name and the face it had already earned.",
      },
      {
        fr: "Et pointé les deux vers ceux qui l'achètent.",
        en: "And pointed both at the people who buy it.",
      },
    ],
  },

  identity: {
    title: {
      fr: "Une marque pour une maison qui n'en avait jamais eu",
      en: "A mark for a business that had never had one",
    },
    text: {
      fr: "Monogramme, système typographique et livre de règles — puis reportés sur les objets que la société met réellement entre les mains des gens.",
      en: "Monogram, typographic system and a guidelines book — then carried onto the things the company actually hands people.",
    },
    shots: [
      {
        image: "/work/dmc-brand-logo-mark.png",
        alt: { fr: "Monogramme DMC", en: "DMC monogram" },
        label: { fr: "Logo", en: "Logo" },
      },
      {
        image: "/work/dmc-guidelines.png",
        alt: {
          fr: "Charte graphique DMC Hospitality Morocco",
          en: "DMC Hospitality Morocco brand guidelines",
        },
        label: { fr: "Charte", en: "Guidelines" },
      },
    ],
  },

  work: [
    {
      image: "/work/dmc-web-desktop.png",
      alt: { fr: "Le site DMC sur écran", en: "The DMC site on desktop" },
      label: { fr: "Site web", en: "Website" },
    },
    {
      image: "/work/dmc-web-mobile.png",
      alt: { fr: "Le site DMC sur téléphone", en: "The DMC site on a phone" },
      label: { fr: "Mobile", en: "Mobile" },
    },
    {
      image: "/work/dmc-brand-uniform.png",
      alt: { fr: "Tenue aux couleurs de DMC", en: "Uniform in the DMC identity" },
      label: { fr: "Application de marque", en: "Brand Application" },
    },
    {
      image: "/work/dmc-brand-posters.png",
      alt: { fr: "Affiches DMC", en: "DMC posters" },
      label: { fr: "Campagne", en: "Campaign" },
    },
    {
      image: "/work/dmc-social-excellence.png",
      alt: { fr: "Publication sociale DMC", en: "DMC social post" },
      label: { fr: "Campagne", en: "Campaign" },
    },
  ],

  outcome: {
    title: {
      fr: "Une marque qui ouvre les portes que l'expertise méritait déjà.",
      en: "A brand that opens the doors the expertise already qualified for.",
    },
    text: {
      fr: "Un nom et une identité partis d'une page blanche, un site adressé aux opérateurs, et une présence LinkedIn qui amène les premiers contacts entrants.",
      en: "A name and identity from a blank page, a site addressed to operators, and a LinkedIn presence bringing the first inbound contacts.",
    },
    metric: "0 → 1",
  },
};
