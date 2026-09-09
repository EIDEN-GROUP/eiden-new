import type { ProjectCase } from "./types";

/**
 * Anisal.
 *
 * ⚠ The copy below was drafted by EIDEN's assistant, not supplied by the
 * client. The shape is right and the voice matches the rest of the portfolio,
 * but every claim   what was out of joint, what was decided, what it changed
 *   is a plausible reconstruction rather than a record. Read it and correct
 * it before this case is shown to anyone.
 *
 * The impact is deliberately qualitative. `metric` is only ever a number the
 * client has published under its own name, and Anisal has published none, so
 * none is written here.
 */
export const anisal: ProjectCase = {
  slug: "anisal",
  client: "Anisal",
  year: "2025",
  category: { fr: "Coopérative", en: "Cooperative" },
  location: { fr: "Région de Souss-Massa, Maroc", en: "Souss-Massa, Morocco" },

  hero: {
    statement: {
      fr: "Un seul nom pour un travail collectif.",
      en: "One name for collective work.",
    },
    intro: {
      fr: "Une coopérative dont le savoir-faire n'a jamais été en question, et dont le nom ne portait pas encore ce que les mains savaient faire.",
      en: "A cooperative whose craft was never in question, and whose name did not yet carry what the hands already knew how to do.",
    },
    image: "/media/bg-2.jpeg",
    alt: {
      fr: "L'univers de marque de la coopérative Anisal",
      en: "The Anisal cooperative brand world",
    },
  },

  fracture: {
    reality: [
      {
        fr: "Un savoir-faire tenu par des femmes, transmis plutôt qu'appris.",
        en: "A craft held by women, handed down rather than taught.",
      },
      {
        fr: "Une production régulière, et une qualité constante.",
        en: "Steady production, and consistent quality.",
      },
      {
        fr: "Des acheteurs fidèles, rencontrés un par un.",
        en: "Loyal buyers, met one at a time.",
      },
    ],
    fracture: [
      {
        fr: "Un nom qui ne circulait pas plus loin que la poignée de main.",
        en: "A name travelling no further than the handshake.",
      },
      {
        fr: "Autant d'emballages que de points de vente.",
        en: "As many packagings as there were points of sale.",
      },
      {
        fr: "Rien à montrer à un acheteur qui n'était pas venu sur place.",
        en: "Nothing to show a buyer who had not come in person.",
      },
    ],
    statement: {
      fr: "Le travail était déjà là. Le nom ne le portait pas.",
      en: "The work was already there. The name was not carrying it.",
    },
  },

  architecture: {
    decision: {
      fr: "Faire du nom le contenant du travail, et non son étiquette.",
      en: "Make the name the vessel of the work, not its label.",
    },
    chain: [
      { fr: "Positionnement", en: "Positioning" },
      { fr: "Identité", en: "Identity" },
      { fr: "Packaging", en: "Packaging" },
      { fr: "Présence digitale", en: "Digital presence" },
    ],
    text: {
      fr: "Le positionnement a commencé par une soustraction : arrêter de vendre une origine, et commencer à vendre une main. L'identité a été dessinée autour d'un motif géométrique unique, décliné plutôt que répété, pour qu'une gamme entière se reconnaisse sans que deux produits se ressemblent. Le packaging a suivi la même règle, ce qui a réglé la question des emballages multiples sans imposer une uniformité que la coopérative n'aurait pas tenue. La présence digitale, enfin, n'a pas été pensée comme une boutique mais comme une preuve : de quoi permettre à un acheteur lointain de vérifier ce qu'un acheteur sur place voyait de ses yeux.",
      en: "Positioning began with a subtraction: stop selling an origin, and start selling a hand. The identity was drawn around a single geometric motif, varied rather than repeated, so that a whole range could be recognised without any two products looking alike. Packaging followed the same rule, which settled the question of the multiple wrappings without imposing a uniformity the cooperative could not have held. Digital presence, last, was built as proof rather than as a shop: enough for a distant buyer to verify what a buyer on site could see with their own eyes.",
    },
  },

  chapters: [
    {
      key: "positioning",
      labels: [{ fr: "Positionnement", en: "Positioning" }],
      tone: "forest",
      title: {
        fr: "Vendre une main, pas une origine.",
        en: "Sell a hand, not an origin.",
      },
      text: {
        fr: "Une coopérative qui se présente par sa région se met en concurrence avec toutes celles de la même région. Anisal se présente par ce que ses adhérentes savent faire, ce qui ne se compare pas et ne se copie pas.",
        en: "A cooperative introducing itself by its region competes with every other cooperative in that region. Anisal introduces itself by what its members know how to do, which cannot be compared and cannot be copied.",
      },
    },
    {
      key: "identity",
      labels: [
        { fr: "Identité", en: "Identity" },
        { fr: "Packaging", en: "Packaging" },
      ],
      tone: "canvas",
      title: {
        fr: "Un motif, décliné plutôt que répété.",
        en: "One motif, varied rather than repeated.",
      },
      text: {
        fr: "Le motif se construit par superposition : les mêmes lignes, tournées, donnent une figure différente à chaque produit tout en restant la même famille. Une gamme peut ainsi grandir sans qu'il faille redessiner quoi que ce soit.",
        en: "The motif is built by overlay: the same lines, turned, give a different figure to each product while staying one family. A range can grow without anything having to be redrawn.",
      },
    },
    {
      key: "digital",
      labels: [{ fr: "Présence digitale", en: "Digital presence" }],
      tone: "ink",
      title: {
        fr: "De quoi vérifier à distance ce qui se voyait sur place.",
        en: "Enough to verify from afar what was visible on site.",
      },
      text: {
        fr: "Pas une boutique : une preuve. Ce que la coopérative produit, comment, et par qui   dans un ordre qu'un acheteur professionnel peut parcourir en deux minutes avant de décrocher son téléphone.",
        en: "Not a shop: a proof. What the cooperative makes, how, and by whom   in an order a trade buyer can read in two minutes before picking up the phone.",
      },
    },
  ],

  impact: {
    title: {
      fr: "Un nom qui circule plus loin que la poignée de main.",
      en: "A name that travels further than the handshake.",
    },
    text: {
      fr: "Une gamme qui se reconnaît d'un produit à l'autre, un emballage unique à la place d'autant de versions que de points de vente, et de quoi répondre à un acheteur qui n'est jamais venu.",
      en: "A range recognisable from one product to the next, a single packaging in place of one version per point of sale, and something to answer a buyer who has never visited.",
    },
  },
};
