import type { ProjectCase } from "./types";

/**
 * Five disciplines and five files. The trade layer, the quoting and the motion
 * are set in type: there is no screenshot of a portal behind a login, and
 * showing the public catalogue a third time to stand in for one would be a
 * quiet lie about what is on file.
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
    image: "/work/orsen/orsen hero.png",
    alt: {
      fr: "La plateforme matériaux ORSEN",
      en: "The ORSEN materials platform",
    },
  },

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

  chapters: [
    {
      key: "art-direction",
      labels: [{ fr: "Direction artistique", en: "Art Direction" }],
      tone: "forest",
      title: {
        fr: "Un système visuel ramené à ce qui sert la matière.",
        en: "A visual system cut back to what serves the material.",
      },
      text: {
        fr: "Une seule couleur d'accent, un seul geste, et beaucoup de gris. Tout ce qui aurait pu concurrencer une photographie de pierre a été retiré   sur un catalogue de matériaux, la mise en page ne doit rien ajouter à ce qu'on regarde.",
        en: "One accent colour, one gesture, and a great deal of grey. Anything that could have competed with a photograph of stone was taken out   on a materials catalogue, the layout must add nothing to what is being looked at.",
      },
      shots: [
        {
          image: "/work/orsen/orsen card.png",
          alt: { fr: "La marque ORSEN en situation", en: "The ORSEN mark in place" },
          label: { fr: "Marque", en: "Brand" },
        },
      ],
    },
    {
      key: "website",
      labels: [{ fr: "Site web", en: "Website" }],
      tone: "canvas",
      title: {
        fr: "Un catalogue qui se lit comme une fiche technique.",
        en: "A catalogue that reads like a spec sheet.",
      },
      text: {
        fr: "Format, finition, épaisseur, provenance, délai. Un architecte cherche des valeurs, pas des arguments   alors la fiche est la page, et la photographie vient après ce qu'elle est censée prouver.",
        en: "Format, finish, thickness, origin, lead time. An architect is looking for values, not arguments   so the spec is the page, and the photograph comes after what it is meant to prove.",
      },
      shots: [
        {
          image: "/work/orsen/web-orsen-desktop.jpg",
          alt: { fr: "Le site ORSEN sur écran", en: "The ORSEN site on desktop" },
          label: { fr: "Desktop", en: "Desktop" },
        },
        {
          image: "/work/orsen/web-orsen-mobile.jpg",
          fit: "contain",
          alt: {
            fr: "Le site ORSEN sur téléphone",
            en: "The ORSEN site on a phone",
          },
          label: { fr: "Mobile", en: "Mobile" },
        },
        {
          image: "/work/orsen/web-orsen-cover.jpg",
          alt: {
            fr: "Le catalogue matériaux ORSEN",
            en: "The ORSEN materials catalogue",
          },
          label: { fr: "Catalogue", en: "Catalogue" },
        },
      ],
    },
    {
      key: "b2b-portal",
      labels: [{ fr: "Portail B2B", en: "B2B Portal" }],
      tone: "ink",
      title: {
        fr: "Deux visages, un seul système.",
        en: "Two faces, one system.",
      },
      text: {
        fr: "Le catalogue public et le portail professionnel partagent la même fondation : les mêmes références, le même stock, les mêmes fiches. Ce qui change, c'est ce que vous avez le droit d'en faire.",
        en: "The public catalogue and the professional portal share one foundation: the same references, the same stock, the same sheets. What changes is what you are allowed to do with them.",
      },
    },
    {
      key: "quoting",
      labels: [{ fr: "E-commerce & devis", en: "E-commerce / Quoting" }],
      tone: "forest",
      title: {
        fr: "Devis, commandes et stock au même endroit.",
        en: "Quotes, orders and stock in one place.",
      },
      text: {
        fr: "Une dalle ne se met pas au panier comme une paire de chaussures : il y a un métrage, une chute, un délai et une remise négociée. Le devis vit donc dans le catalogue plutôt que dans une boîte mail, à côté de la matière qu'il chiffre.",
        en: "A slab does not go into a basket like a pair of shoes: there is an area, an offcut, a lead time and a negotiated discount. So the quote lives inside the catalogue rather than in an inbox, next to the material it prices.",
      },
    },
    {
      key: "motion",
      labels: [{ fr: "Motion", en: "Motion" }],
      tone: "canvas",
      title: {
        fr: "Le mouvement au service de la matière, jamais l'inverse.",
        en: "Motion in service of the material, never the other way round.",
      },
      text: {
        fr: "Assez pour qu'une surface prenne la lumière quand on la survole, et rien de plus. Sur une plateforme consultée depuis un chantier, chaque effet doit se justifier au poids qu'il coûte à charger.",
        en: "Enough for a surface to catch the light when it is hovered, and nothing beyond that. On a platform opened from a building site, every effect has to justify the weight it costs to load.",
      },
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
