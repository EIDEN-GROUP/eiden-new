import type { ProjectCase } from "./types";

/**
 * MADAEF.
 *
 * ⚠ The copy below was drafted by EIDEN's assistant, not supplied by the
 * client. MADAEF is a real operator with a real public profile, and nothing
 * here was read off a brief   the fracture, the decision and the outcome are
 * a plausible reconstruction of an engagement, not a record of one. Correct
 * it against what actually happened before this case is shown to anyone, and
 * before anything on it is attributed to the client.
 *
 * No figure appears on this case. `metric` is only ever a number the client
 * has published under its own name.
 */
export const madaef: ProjectCase = {
  slug: "madaef",
  client: "MADAEF",
  year: "2025",
  category: { fr: "Hôtellerie", en: "Hospitality" },
  location: { fr: "Maroc", en: "Morocco" },

  hero: {
    statement: {
      fr: "Un standard, tenu sur chaque adresse.",
      en: "One standard, held on every address.",
    },
    intro: {
      fr: "Un portefeuille de destinations qui n'avaient en commun que leur propriétaire, et qui devaient désormais avoir en commun leur exigence.",
      en: "A portfolio of destinations that had only their owner in common, and that now had to have their standard in common too.",
    },
    image: "/media/bg-3.jpeg",
    alt: {
      fr: "L'univers de marque MADAEF",
      en: "The MADAEF brand world",
    },
  },

  fracture: {
    reality: [
      {
        fr: "Un portefeuille de destinations déjà installées.",
        en: "A portfolio of destinations already established.",
      },
      {
        fr: "Des équipes locales qui connaissent leur terrain.",
        en: "Local teams who know their ground.",
      },
      {
        fr: "Une exigence réelle, appliquée site par site.",
        en: "A real standard, applied site by site.",
      },
    ],
    fracture: [
      {
        fr: "Une marque faîtière que le visiteur ne rencontrait jamais.",
        en: "A parent brand the visitor never met.",
      },
      {
        fr: "Autant de tons que d'adresses, et aucun qui les relie.",
        en: "As many tones as addresses, and none linking them.",
      },
      {
        fr: "Une exigence tenue partout, lisible nulle part.",
        en: "A standard held everywhere, legible nowhere.",
      },
    ],
    statement: {
      fr: "Chaque adresse tenait son rang. Aucune ne disait au nom de qui.",
      en: "Every address held its rank. None said on whose behalf.",
    },
  },

  architecture: {
    decision: {
      fr: "Faire de la marque faîtière une garantie, pas une signature.",
      en: "Make the parent brand a guarantee, not a signature.",
    },
    chain: [
      { fr: "Architecture de marque", en: "Brand architecture" },
      { fr: "Système éditorial", en: "Editorial system" },
      { fr: "Direction artistique", en: "Art direction" },
      { fr: "Déploiement", en: "Rollout" },
    ],
    text: {
      fr: "L'architecture de marque a réglé la première question, qui n'était pas graphique : ce que la maison mère garantit, et ce que chaque adresse reste libre de décider. Le système éditorial a suivi la même ligne de partage   un socle commun, court, et une marge locale assumée   pour qu'une équipe puisse écrire sans demander la permission et sans sortir du cadre. La direction artistique a donné à ce partage une forme visible : un traitement reconnaissable d'une adresse à l'autre, appliqué à des lieux qui ne se ressemblent pas. Le déploiement, enfin, a été pensé comme un outil plutôt que comme une charte, parce qu'un document que personne n'ouvre ne tient aucun standard.",
      en: "Brand architecture settled the first question, which was not a graphic one: what the parent guarantees, and what each address stays free to decide. The editorial system followed the same split   a short common base, and an owned local margin   so a team could write without asking permission and without leaving the frame. Art direction gave that split a visible form: a treatment recognisable from one address to the next, applied to places that look nothing alike. The rollout, last, was built as a tool rather than as a charter, because a document nobody opens holds no standard at all.",
    },
  },

  chapters: [
    {
      key: "architecture",
      labels: [{ fr: "Architecture de marque", en: "Brand architecture" }],
      tone: "forest",
      title: {
        fr: "Ce que la maison garantit, ce que l'adresse décide.",
        en: "What the house guarantees, what the address decides.",
      },
      text: {
        fr: "La question n'était pas de savoir à quoi la marque ressemble, mais où elle s'arrête. Une ligne claire entre le garanti et le local vaut mieux qu'une charte qui prétend tout couvrir et que personne n'applique.",
        en: "The question was not what the brand looks like but where it stops. A clear line between the guaranteed and the local is worth more than a charter claiming to cover everything and applied by no one.",
      },
    },
    {
      key: "editorial",
      labels: [
        { fr: "Système éditorial", en: "Editorial system" },
        { fr: "Direction artistique", en: "Art direction" },
      ],
      tone: "canvas",
      title: {
        fr: "Un socle court, et une marge assumée.",
        en: "A short base, and an owned margin.",
      },
      text: {
        fr: "Le socle tient en une page : ce qui se dit toujours, et ce qui ne se dit jamais. Tout le reste appartient à l'adresse. C'est ce qui permet à des lieux qui ne se ressemblent pas d'être reconnus comme tenus par la même main.",
        en: "The base fits on one page: what is always said, and what is never said. Everything else belongs to the address. That is what lets places which look nothing alike be recognised as held by the same hand.",
      },
    },
    {
      key: "rollout",
      labels: [{ fr: "Déploiement", en: "Rollout" }],
      tone: "ink",
      title: {
        fr: "Un outil, pas une charte.",
        en: "A tool, not a charter.",
      },
      text: {
        fr: "Un standard ne tient que s'il est plus facile à suivre qu'à contourner. Le déploiement a donc été livré comme un jeu de gabarits utilisables le jour même, plutôt que comme un document à lire avant de commencer.",
        en: "A standard only holds if it is easier to follow than to work around. The rollout was delivered as a set of templates usable the same day, rather than as a document to be read before starting.",
      },
    },
  ],

  impact: {
    title: {
      fr: "Des adresses différentes, tenues au même standard.",
      en: "Different addresses, held to one standard.",
    },
    text: {
      fr: "Une marque faîtière que le visiteur rencontre enfin, une ligne claire entre ce qui est garanti et ce qui reste local, et des équipes qui peuvent produire sans repartir de zéro à chaque fois.",
      en: "A parent brand the visitor finally meets, a clear line between what is guaranteed and what stays local, and teams able to produce without starting from nothing each time.",
    },
  },
};
