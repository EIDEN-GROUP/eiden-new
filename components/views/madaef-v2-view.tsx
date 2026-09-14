"use client";

import {
  CaseV2,
  Caption,
  Chapter,
  FULL,
  Hero,
  IdentityPlate,
  LinesRow,
  OutcomePanel,
  RealityFracture,
  useSay,
  type NextProject,
  type Say,
} from "@/components/case-v2/kit";

const CLIENT = "MADAEF";
const YEAR = "2025";
const CATEGORY: Say = { fr: "Hôtellerie", en: "Hospitality" };
const LOCATION: Say = { fr: "Maroc", en: "Morocco" };

const HERO = {
  statement: {
    fr: "Un standard, tenu sur chaque adresse.",
    en: "One standard, held on every address.",
  },
  intro: {
    fr: "Un portefeuille de destinations qui n'avaient en commun que leur propriétaire, et qui devaient désormais avoir en commun leur exigence.",
    en: "A portfolio of destinations that had only their owner in common, and that now had to have their standard in common too.",
  },
  image: "/media/bg-3.jpeg",
  alt: { fr: "L'univers de marque MADAEF", en: "The MADAEF brand world" },
};

const STATEMENT: Say = {
  fr: "Chaque adresse tenait son rang. Aucune ne disait au nom de qui.",
  en: "Every address held its rank. None said on whose behalf.",
};

const REALITY: Say[] = [
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
];

const FRACTURE: Say[] = [
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
];

const DECISION: Say = {
  fr: "Faire de la marque faîtière une garantie, pas une signature.",
  en: "Make the parent brand a guarantee, not a signature.",
};

const CHAIN: Say[] = [
  { fr: "Architecture de marque", en: "Brand architecture" },
  { fr: "Système éditorial", en: "Editorial system" },
  { fr: "Direction artistique", en: "Art direction" },
  { fr: "Déploiement", en: "Rollout" },
];

const CHAIN_TEXT: Say = {
  fr: "L'architecture de marque a réglé la première question, qui n'était pas graphique : ce que la maison mère garantit, et ce que chaque adresse reste libre de décider. Le système éditorial a suivi la même ligne de partage   un socle commun, court, et une marge locale assumée   pour qu'une équipe puisse écrire sans demander la permission et sans sortir du cadre. La direction artistique a donné à ce partage une forme visible : un traitement reconnaissable d'une adresse à l'autre, appliqué à des lieux qui ne se ressemblent pas. Le déploiement, enfin, a été pensé comme un outil plutôt que comme une charte, parce qu'un document que personne n'ouvre ne tient aucun standard.",
  en: "Brand architecture settled the first question, which was not a graphic one: what the parent guarantees, and what each address stays free to decide. The editorial system followed the same split   a short common base, and an owned local margin   so a team could write without asking permission and without leaving the frame. Art direction gave that split a visible form: a treatment recognisable from one address to the next, applied to places that look nothing alike. The rollout, last, was built as a tool rather than as a charter, because a document nobody opens holds no standard at all.",
};

const BRAND_ARCHITECTURE = {
  title: {
    fr: "Ce que la maison garantit, ce que l'adresse décide.",
    en: "What the house guarantees, what the address decides.",
  },
  text: {
    fr: "La question n'était pas de savoir à quoi la marque ressemble, mais où elle s'arrête. Une ligne claire entre le garanti et le local vaut mieux qu'une charte qui prétend tout couvrir et que personne n'applique.",
    en: "The question was not what the brand looks like but where it stops. A clear line between the guaranteed and the local is worth more than a charter claiming to cover everything and applied by no one.",
  },
};

const EDITORIAL = {
  title: {
    fr: "Un socle court, et une marge assumée.",
    en: "A short base, and an owned margin.",
  },
  text: {
    fr: "Le socle tient en une page : ce qui se dit toujours, et ce qui ne se dit jamais. Tout le reste appartient à l'adresse. C'est ce qui permet à des lieux qui ne se ressemblent pas d'être reconnus comme tenus par la même main.",
    en: "The base fits on one page: what is always said, and what is never said. Everything else belongs to the address. That is what lets places which look nothing alike be recognised as held by the same hand.",
  },
  lines: [
    { fr: "Ce qui se dit toujours.", en: "What is always said." },
    { fr: "Ce qui ne se dit jamais.", en: "What is never said." },
    {
      fr: "Tout le reste appartient à l'adresse.",
      en: "Everything else belongs to the address.",
    },
  ] as Say[],
};

const ROLLOUT = {
  title: {
    fr: "Un outil, pas une charte.",
    en: "A tool, not a charter.",
  },
  text: {
    fr: "Un standard ne tient que s'il est plus facile à suivre qu'à contourner. Le déploiement a donc été livré comme un jeu de gabarits utilisables le jour même, plutôt que comme un document à lire avant de commencer.",
    en: "A standard only holds if it is easier to follow than to work around. The rollout was delivered as a set of templates usable the same day, rather than as a document to be read before starting.",
  },
};

const IMPACT = {
  title: {
    fr: "Des adresses différentes, tenues au même standard.",
    en: "Different addresses, held to one standard.",
  },
  outcomes: [
    {
      fr: "Une marque faîtière que le visiteur rencontre enfin.",
      en: "A parent brand the visitor finally meets.",
    },
    {
      fr: "Une ligne claire entre ce qui est garanti et ce qui reste local.",
      en: "A clear line between what is guaranteed and what stays local.",
    },
    {
      fr: "Des équipes qui peuvent produire sans repartir de zéro à chaque fois.",
      en: "Teams able to produce without starting from nothing each time.",
    },
  ] as Say[],
};

const NEXT: NextProject[] = [
  {
    href: "/ca-challenge-academy",
    client: "CA Challenge Academy",
    category: { fr: "Éducation", en: "Education" },
    image: "/media/eiden-hero-poster.jpg",
  },
  {
    href: "/bopassage",
    client: "Bôpassage",
    category: { fr: "Cafés & restaurants", en: "Cafés & Restaurants" },
    image: "/work/bopassage/bopassage-hero.png",
  },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  {
    id: "architecture-de-marque",
    label: { fr: "Architecture de marque", en: "Brand architecture" },
  },
  {
    id: "systeme-editorial",
    label: { fr: "Système éditorial", en: "Editorial system" },
  },
  { id: "deploiement", label: { fr: "Déploiement", en: "Rollout" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
];

export function MadaefV2View() {
  const say = useSay();

  return (
    <CaseV2
      chapters={CHAPTERS}
      client={CLIENT}
      statement={HERO.statement}
      category={CATEGORY}
      location={LOCATION}
      year={YEAR}
      next={NEXT}
    >
      <Chapter id="le-defi">
        <Hero image={HERO.image} alt={say(HERO.alt)} />
        <Caption index={0} title={say(STATEMENT)} text={say(HERO.intro)} />
        <RealityFracture reality={REALITY} fracture={FRACTURE} />
      </Chapter>

      <Chapter id="architecture">
        <Caption index={1} title={say(DECISION)} text={say(CHAIN_TEXT)} />
        <LinesRow items={CHAIN.map(say)} />
      </Chapter>

      <Chapter id="architecture-de-marque">
        <Caption
          index={2}
          title={say(BRAND_ARCHITECTURE.title)}
          text={say(BRAND_ARCHITECTURE.text)}
        />
        <IdentityPlate
          ground="#FFFFFF"
          image="/clients/madaef.png"
          alt={say({ fr: "Logo MADAEF", en: "MADAEF logo" })}
          contain
          shape="aspect-4/3 sm:aspect-16/9"
          sizes={FULL}
        />
      </Chapter>

      <Chapter id="systeme-editorial">
        <Caption
          index={3}
          label={say({
            fr: "Système éditorial · Direction artistique",
            en: "Editorial system · Art direction",
          })}
          title={say(EDITORIAL.title)}
          text={say(EDITORIAL.text)}
        />
        <LinesRow items={EDITORIAL.lines.map(say)} tone="forest" />
      </Chapter>

      <Chapter id="deploiement">
        <Caption index={4} title={say(ROLLOUT.title)} text={say(ROLLOUT.text)} />
      </Chapter>

      <Chapter id="impact">
        <Caption index={5} title={say(IMPACT.title)} />
        <OutcomePanel image={HERO.image} items={IMPACT.outcomes.map(say)} />
      </Chapter>
    </CaseV2>
  );
}
