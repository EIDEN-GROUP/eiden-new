import type { ProjectCase } from "./types";

/**
 * No `identity` block. ORSEN sells art direction and there is not a single
 * identity asset on file   no logo, no specimen, no application shot. The
 * section is left out rather than padded with website screenshots.
 */
export const orsen: ProjectCase = {
  slug: "orsen",
  client: "ORSEN",
  year: "2026",
  category: { fr: "Matériaux", en: "Materials" },
  location: { fr: "Maroc", en: "Morocco" },

  hero: {
    statement: {
      fr: "La matière avant la décoration.",
      en: "Material before decoration.",
    },
    intro: {
      fr: "Marbre, pierre, béton, bois et métal sur une seule plateforme   avec une face publique pour les architectes et une face professionnelle derrière, pour le négoce.",
      en: "Marble, stone, concrete, wood and metal on one platform   with a public face for architects and a professional one behind it for the trade.",
    },
    image: "/work/orsen hero.png",
    alt: {
      fr: "La plateforme matériaux ORSEN",
      en: "The ORSEN materials platform",
    },
  },

  services: [
    {
      name: { fr: "Direction artistique", en: "Art Direction" },
      note: {
        fr: "Un système visuel ramené à ce qui sert la matière.",
        en: "A visual system cut back to what serves the material.",
      },
    },
    {
      name: { fr: "Site web", en: "Website" },
      note: {
        fr: "Un catalogue qui se lit comme une fiche technique.",
        en: "A catalogue that reads like a spec sheet.",
      },
    },
    {
      name: { fr: "Portail B2B", en: "B2B Portal" },
      note: {
        fr: "Une couche professionnelle sur la même fondation.",
        en: "A professional layer on the same foundation.",
      },
    },
    {
      name: { fr: "E-commerce & devis", en: "E-commerce / Quoting" },
      note: {
        fr: "Devis, commandes et stock au même endroit.",
        en: "Quotes, orders and stock in one place.",
      },
    },
    { name: { fr: "Motion", en: "Motion" } },
  ],

  transformation: {
    title: {
      fr: "D'un catalogue à une plateforme qui sert deux publics sans sacrifier ni l'un ni l'autre.",
      en: "From a catalogue to a platform that serves two audiences without compromising either.",
    },
    text: [
      {
        fr: "Les architectes lisent des spécifications, pas du marketing.",
        en: "Architects read specifications, not marketing.",
      },
      {
        fr: "Le catalogue public a été construit en le respectant.",
        en: "The public catalogue was built to respect that.",
      },
      {
        fr: "Le portail négoce, sur la même fondation plutôt qu'à côté.",
        en: "The trade portal, on the same foundation instead of beside it.",
      },
      {
        fr: "Devis, commandes et stock se traitent là où la matière se choisit.",
        en: "Quotes, orders and stock are handled where the material is chosen.",
      },
    ],
  },

  feature: {
    label: { fr: "Plateforme digitale", en: "Digital Platform" },
    title: {
      fr: "Deux visages, un seul système.",
      en: "Two faces, one system.",
    },
    text: {
      fr: "Le catalogue public et le portail professionnel partagent la même fondation : les mêmes références, le même stock, les mêmes fiches. Ce qui change, c'est ce que vous avez le droit d'en faire.",
      en: "The public catalogue and the professional portal share one foundation: the same references, the same stock, the same sheets. What changes is what you are allowed to do with them.",
    },
  },

  work: [
    {
      image: "/work/web-orsen-desktop.jpg",
      alt: { fr: "Le site ORSEN sur écran", en: "The ORSEN site on desktop" },
      label: { fr: "Site web", en: "Website" },
    },
    {
      image: "/work/web-orsen-mobile.jpg",
      alt: { fr: "Le site ORSEN sur téléphone", en: "The ORSEN site on a phone" },
      label: { fr: "Mobile", en: "Mobile" },
    },
    {
      image: "/work/web-orsen-cover.jpg",
      alt: {
        fr: "Le catalogue matériaux ORSEN",
        en: "The ORSEN materials catalogue",
      },
      label: { fr: "Système digital", en: "Digital System" },
    },
  ],

  outcome: {
    title: {
      fr: "Une plateforme qui se lit comme une fiche technique et se tient comme une marque.",
      en: "A platform that reads like a spec sheet and holds itself like a brand.",
    },
    text: {
      fr: "Un seul système visuel au service des deux publics, et une couche négoce où devis, commandes et stock vivent enfin ensemble.",
      en: "One visual system serving both audiences, and a trade layer where quotes, orders and stock finally live together.",
    },
  },
};
