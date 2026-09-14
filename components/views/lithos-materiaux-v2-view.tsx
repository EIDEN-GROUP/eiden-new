"use client";

import {
  CaseV2,
  Caption,
  Chapter,
  ColourBoard,
  Hero,
  LinesRow,
  OutcomePanel,
  Pair,
  Plate,
  RealityFracture,
  SignalsPanel,
  useSay,
  type NextProject,
  type Say,
} from "@/components/case-v2/kit";

const CLIENT = "LITHOS";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Matériaux", en: "Materials" };
const LOCATION: Say = {
  fr: "Aix-en-Provence, France",
  en: "Aix-en-Provence, France",
};
const SITE = "https://lithos-materiaux.vercel.app";

const HERO = {
  statement: {
    fr: "La matière, racontée avec soin.",
    en: "Material, told with care.",
  },
  intro: {
    fr: "Un fournisseur de calcaire, de travertin et de marbre dans le sud de la France, avec un catalogue qui devait fonctionner comme un architecte prescrit réellement.",
    en: "A limestone, travertine and marble supplier in southern France, with a catalogue that needed to work the way an architect actually specifies.",
  },
  image: "/work/lithos-materiaux/luthos hero.png",
  alt: { fr: "Le catalogue LITHOS", en: "The LITHOS catalogue" },
};

const STATEMENT: Say = {
  fr: "La pierre se choisit à l'œil. Le catalogue se lisait au numéro.",
  en: "Stone is chosen by eye. The catalogue was read by number.",
};

const REALITY: Say[] = [
  {
    fr: "Une gamme tirée de la carrière elle-même.",
    en: "A range that comes out of the quarry itself.",
  },
  {
    fr: "Des architectes qui savent ce qu'ils cherchent.",
    en: "Architects who know what they are looking for.",
  },
  {
    fr: "Une matière qui se choisit par ce qu'elle donne.",
    en: "A material chosen by what it gives you.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Un catalogue organisé par numéro d'article.",
    en: "A catalogue organised by reference number.",
  },
  {
    fr: "Aucune entrée par effet, par espace ou par ambiance.",
    en: "No way in by effect, by space or by mood.",
  },
  {
    fr: "Une liste de références là où il fallait une gamme.",
    en: "A list of reference numbers where a range was needed.",
  },
];

const DECISION: Say = {
  fr: "Reconstruire le catalogue autour des trois façons dont une pierre se choisit.",
  en: "Rebuild the catalogue around the three ways a stone is actually chosen.",
};

const CHAIN_TEXT: Say = {
  fr: "Les tons de l'identité sont relevés sur les pierres elles-mêmes plutôt que choisis dans un nuancier. Le design system   une échelle, six espacements, trois façons de poser une image   permet d'ajouter une matière sans redessiner une page. Le site fait du catalogue le produit plutôt qu'une annexe. L'expérience catalogue ouvre trois chemins vers la même pierre : par effet, par espace, par ambiance. Et le mouvement ne sert qu'à faire tourner la lumière sur une surface.",
  en: "The identity's tones were taken off the stones themselves rather than picked from a swatch book. The design system   one scale, six spacings, three ways to place an image   lets a material be added without redrawing a page. The site makes the catalogue the product rather than an appendix. The catalogue experience opens three routes to the same stone: by effect, by space, by mood. And the motion does one thing: turn the light across a surface.",
};

const ART_DIRECTION = {
  title: {
    fr: "Une identité qui vient de la carrière, pas d'une palette générique.",
    en: "An identity that comes from the quarry, not a stock palette.",
  },
  text: {
    fr: "Les tons sont relevés sur les pierres elles-mêmes : le calcaire, le travertin, le veinage du marbre. Rien n'a été choisi dans un nuancier, ce qui est la seule façon pour une identité de matériaux de ne pas mentir sur ce qu'elle vend.",
    en: "The tones were taken off the stones themselves: the limestone, the travertine, the veining of the marble. Nothing was picked from a swatch book, which is the only way an identity for materials avoids lying about what it sells.",
  },
};

const BRAND = {
  ground: "#141c19",
  wordmark: "/work/lithos-materiaux/lotus card.png",
  wordmarkAlt: { fr: "Marque LITHOS", en: "LITHOS brand mark" },
  colors: [
    { hex: "#7B7875", role: { fr: "Dominante", en: "Dominant" } },
    { hex: "#1F3132", role: { fr: "Accent", en: "Accent" } },
    { hex: "#585046", role: { fr: "Contraste", en: "Contrast" } },
    { hex: "#E8E5DF", role: { fr: "Neutre", en: "Neutral" } },
  ],
};

const DESIGN_SYSTEM = {
  title: {
    fr: "Un système qui tient de l'écran large jusqu'au téléphone.",
    en: "One system holding from a wide screen down to a phone.",
  },
  text: {
    fr: "Une échelle typographique, six espacements, trois façons de poser une image. C'est peu, et c'est précisément ce qui permet d'ajouter une matière à la gamme sans avoir à redessiner une page.",
    en: "One type scale, six spacings, three ways to place an image. It is very little, and that is exactly what lets a material be added to the range without a page having to be redrawn.",
  },
  lines: [
    { fr: "Une échelle typographique.", en: "One type scale." },
    { fr: "Six espacements.", en: "Six spacings." },
    { fr: "Trois façons de poser une image.", en: "Three ways to place an image." },
  ] as Say[],
};

const WEBSITE = {
  title: {
    fr: "Le catalogue comme produit, pas comme annexe.",
    en: "The catalogue as the product, not a supplement to it.",
  },
  text: {
    fr: "Sur la plupart des sites de fournisseurs, le catalogue est ce qui vient après la présentation de la société. Ici c'est l'inverse : la gamme est la page d'accueil, et l'entreprise se raconte à travers ce qu'elle a en carrière.",
    en: "On most supplier sites the catalogue is what comes after the company introduction. Here it is the other way round: the range is the homepage, and the company tells its story through what it has in the quarry.",
  },
};

const CATALOGUE = {
  title: {
    fr: "Trois chemins vers la même pierre.",
    en: "Three routes to the same stone.",
  },
  text: {
    fr: "Par effet, par espace, par ambiance. Le même catalogue, trois entrées, parce qu'un architecte qui cherche un sol de salle de bain et un architecte qui cherche « quelque chose de chaud » ne cherchent pas la même chose.",
    en: "By effect, by space, by mood. One catalogue, three ways in, because an architect looking for a bathroom floor and an architect looking for “something warm” are not looking for the same thing.",
  },
  signals: [
    { fr: "Par effet.", en: "By effect." },
    { fr: "Par espace.", en: "By space." },
    { fr: "Par ambiance.", en: "By mood." },
  ] as Say[],
};

const MOTION = {
  title: {
    fr: "Rien ne bouge tant que le lecteur ne bouge pas.",
    en: "Nothing moves until the reader does.",
  },
  text: {
    fr: "Le mouvement ne sert qu'à faire tourner la lumière sur une surface   c'est-à-dire à montrer la seule chose qu'une photographie fixe ne montre pas d'une pierre. Tout le reste tient immobile.",
    en: "The motion exists only to turn the light across a surface   which is to say, to show the one thing a still photograph cannot tell you about a stone. Everything else holds still.",
  },
};

const IMPACT = {
  title: {
    fr: "Un catalogue parcouru comme une pierre se choisit.",
    en: "A catalogue browsed the way a stone is chosen.",
  },
  outcomes: [
    {
      fr: "Une identité tirée de la matière elle-même.",
      en: "An identity taken from the material itself.",
    },
    { fr: "Trois entrées dans la gamme.", en: "Three routes into the range." },
    {
      fr: "Un système qui tient jusqu'au téléphone.",
      en: "A system that holds down to a phone.",
    },
  ] as Say[],
};

const NEXT: NextProject[] = [
  {
    href: "/droguerie-souss",
    client: "Souss Droguerie",
    category: { fr: "Matériaux", en: "Materials" },
    image: "/work/droguerie-souss/hero drougure.png",
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
    id: "direction-artistique",
    label: { fr: "Direction artistique", en: "Art direction" },
  },
  { id: "design-system", label: { fr: "Design system", en: "Design system" } },
  { id: "site-web", label: { fr: "Site web", en: "Website" } },
  {
    id: "experience-catalogue",
    label: { fr: "Expérience catalogue", en: "Catalogue experience" },
  },
  { id: "motion", label: { fr: "Motion", en: "Motion" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
];

export function LithosMateriauxV2View() {
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
        <Caption index={0} title={say(STATEMENT)} text={say(HERO.intro)} />
        <RealityFracture reality={REALITY} fracture={FRACTURE} />
      </Chapter>

      <Chapter id="architecture">
        <Caption index={1} title={say(DECISION)} text={say(CHAIN_TEXT)} />
        <Pair>
          <Plate image={HERO.image} alt={say(HERO.alt)} shape="aspect-square" />
          <Plate
            image={BRAND.wordmark}
            alt={say({ fr: "La marque LITHOS", en: "The LITHOS mark" })}
            shape="aspect-square"
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="direction-artistique">
        <Caption
          index={2}
          title={say(ART_DIRECTION.title)}
          text={say(ART_DIRECTION.text)}
          meta={say({
            fr: "Couleurs relevées sur la marque",
            en: "Colours read off the mark",
          })}
        />
        <ColourBoard
          ground={BRAND.ground}
          wordmark={BRAND.wordmark}
          wordmarkAlt={say(BRAND.wordmarkAlt)}
          contain={false}
          colors={BRAND.colors}
        />
      </Chapter>

      <Chapter id="design-system">
        <Caption
          index={3}
          title={say(DESIGN_SYSTEM.title)}
          text={say(DESIGN_SYSTEM.text)}
        />
        <LinesRow items={DESIGN_SYSTEM.lines.map(say)} tone="forest" />
      </Chapter>

      <Chapter id="site-web">
        <Caption index={4} title={say(WEBSITE.title)} text={say(WEBSITE.text)} />
        <Pair>
          <Plate
            image="/work/lithos-materiaux/web-lithos-desktop.jpg"
            alt={say({
              fr: "Le site LITHOS sur écran",
              en: "The LITHOS site on desktop",
            })}
            caption={say({ fr: "Desktop", en: "Desktop" })}
            shape="aspect-4/3"
          />
          <Plate
            image="/work/lithos-materiaux/web-lithos-mobile.jpg"
            alt={say({
              fr: "Le site LITHOS sur téléphone",
              en: "The LITHOS site on a phone",
            })}
            caption={say({ fr: "Mobile", en: "Mobile" })}
            shape="aspect-4/3"
            contain
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="experience-catalogue">
        <Caption
          index={5}
          title={say(CATALOGUE.title)}
          text={say(CATALOGUE.text)}
        />
        <Pair>
          <Plate
            image="/work/lithos-materiaux/web-lithos-cover.jpg"
            alt={say({
              fr: "Une fiche matière LITHOS",
              en: "A LITHOS material sheet",
            })}
            caption={say({ fr: "Fiche matière", en: "Material sheet" })}
            shape="aspect-4/5"
          />
          <SignalsPanel items={CATALOGUE.signals.map(say)} />
        </Pair>
      </Chapter>

      <Chapter id="motion">
        <Caption index={6} title={say(MOTION.title)} text={say(MOTION.text)} />
      </Chapter>

      <Chapter id="impact">
        <Caption index={7} title={say(IMPACT.title)} />
        <OutcomePanel image={HERO.image} items={IMPACT.outcomes.map(say)} />
      </Chapter>
    </CaseV2>
  );
}
