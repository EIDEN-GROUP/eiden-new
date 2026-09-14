"use client";

import {
  CaseV2,
  Caption,
  Chapter,
  ColourBoard,
  FULL,
  Hero,
  LinesRow,
  OutcomePanel,
  Pair,
  Plate,
  RealityFracture,
  useSay,
  type NextProject,
  type Say,
} from "@/components/case-v2/kit";

const CLIENT = "ORSEN";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Matériaux", en: "Materials" };
const LOCATION: Say = { fr: "Maroc", en: "Morocco" };
const SITE = "https://orsen.vercel.app";

const HERO = {
  statement: {
    fr: "La matière avant la décoration.",
    en: "Material before decoration.",
  },
  intro: {
    fr: "Marbre, pierre, béton, bois et métal sur une seule plateforme   avec une face publique pour les architectes et une face professionnelle derrière, pour le négoce.",
    en: "Marble, stone, concrete, wood and metal on one platform   with a public face for architects and a professional one behind it for the trade.",
  },
  image: "/work/orsen/orsen hero.png",
  alt: { fr: "La plateforme matériaux ORSEN", en: "The ORSEN materials platform" },
};

const STATEMENT: Say = {
  fr: "Deux publics, un seul catalogue. Il ne servait ni l'un ni l'autre.",
  en: "Two audiences, one catalogue. It served neither.",
};

const REALITY: Say[] = [
  {
    fr: "Une gamme que les architectes prescrivent déjà.",
    en: "A range architects already specify.",
  },
  {
    fr: "Un négoce qui travaille au devis et au métrage.",
    en: "A trade business working on quotes and square metres.",
  },
  {
    fr: "Deux publics pour une seule matière.",
    en: "Two audiences for one material.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Un catalogue qui parlait marketing à des lecteurs de spécifications.",
    en: "A catalogue talking marketing to readers of specifications.",
  },
  {
    fr: "Le négoce traité à côté du catalogue, jamais dedans.",
    en: "The trade side handled beside the catalogue, never inside it.",
  },
  {
    fr: "Devis, commandes et stock dans trois endroits différents.",
    en: "Quotes, orders and stock in three different places.",
  },
];

const DECISION: Say = {
  fr: "Poser le portail négoce sur la même fondation que le catalogue, pas à côté.",
  en: "Put the trade portal on the same foundation as the catalogue, not beside it.",
};

const CHAIN_TEXT: Say = {
  fr: "La direction artistique a retiré tout ce qui pouvait concurrencer une photographie de pierre. Le catalogue public se lit comme une fiche technique, parce qu'un architecte cherche des valeurs et pas des arguments. Le portail professionnel partage cette fondation   mêmes références, même stock, mêmes fiches   et seuls les droits changent. Le devis vit dans le catalogue plutôt que dans une boîte mail, à côté de la matière qu'il chiffre. Et le mouvement ne sert qu'à faire prendre la lumière à une surface.",
  en: "Art direction took away everything that could compete with a photograph of stone. The public catalogue reads like a spec sheet, because an architect is looking for values rather than arguments. The trade portal shares that foundation   same references, same stock, same sheets   and only the permissions change. The quote lives inside the catalogue rather than in an inbox, beside the material it prices. And the motion does one thing: let a surface catch the light.",
};

const ART_DIRECTION = {
  title: {
    fr: "Un système visuel ramené à ce qui sert la matière.",
    en: "A visual system cut back to what serves the material.",
  },
  text: {
    fr: "Une seule couleur d'accent, un seul geste, et beaucoup de gris. Tout ce qui aurait pu concurrencer une photographie de pierre a été retiré   sur un catalogue de matériaux, la mise en page ne doit rien ajouter à ce qu'on regarde.",
    en: "One accent colour, one gesture, and a great deal of grey. Anything that could have competed with a photograph of stone was taken out   on a materials catalogue, the layout must add nothing to what is being looked at.",
  },
};

const BRAND = {
  ground: "#141c19",
  wordmark: "/work/orsen/orsen card.png",
  wordmarkAlt: { fr: "Marque ORSEN", en: "ORSEN brand mark" },
  colors: [
    { hex: "#1C1111", role: { fr: "Dominante", en: "Dominant" } },
    { hex: "#E9E7E2", role: { fr: "Accent", en: "Accent" } },
    { hex: "#767676", role: { fr: "Contraste", en: "Contrast" } },
    { hex: "#454749", role: { fr: "Neutre", en: "Neutral" } },
  ],
};

const WEBSITE = {
  title: {
    fr: "Un catalogue qui se lit comme une fiche technique.",
    en: "A catalogue that reads like a spec sheet.",
  },
  text: {
    fr: "Format, finition, épaisseur, provenance, délai. Un architecte cherche des valeurs, pas des arguments   alors la fiche est la page, et la photographie vient après ce qu'elle est censée prouver.",
    en: "Format, finish, thickness, origin, lead time. An architect is looking for values, not arguments   so the spec is the page, and the photograph comes after what it is meant to prove.",
  },
};

const PORTAL = {
  title: {
    fr: "Deux visages, un seul système.",
    en: "Two faces, one system.",
  },
  text: {
    fr: "Le catalogue public et le portail professionnel partagent la même fondation : les mêmes références, le même stock, les mêmes fiches. Ce qui change, c'est ce que vous avez le droit d'en faire.",
    en: "The public catalogue and the professional portal share one foundation: the same references, the same stock, the same sheets. What changes is what you are allowed to do with them.",
  },
  lines: [
    { fr: "Les mêmes références.", en: "The same references." },
    { fr: "Le même stock.", en: "The same stock." },
    { fr: "Les mêmes fiches.", en: "The same sheets." },
  ] as Say[],
};

const QUOTING = {
  title: {
    fr: "Devis, commandes et stock au même endroit.",
    en: "Quotes, orders and stock in one place.",
  },
  text: {
    fr: "Une dalle ne se met pas au panier comme une paire de chaussures : il y a un métrage, une chute, un délai et une remise négociée. Le devis vit donc dans le catalogue plutôt que dans une boîte mail, à côté de la matière qu'il chiffre.",
    en: "A slab does not go into a basket like a pair of shoes: there is an area, an offcut, a lead time and a negotiated discount. So the quote lives inside the catalogue rather than in an inbox, next to the material it prices.",
  },
  lines: [
    { fr: "Un métrage.", en: "An area." },
    { fr: "Une chute.", en: "An offcut." },
    { fr: "Un délai.", en: "A lead time." },
    { fr: "Une remise négociée.", en: "A negotiated discount." },
  ] as Say[],
};

const MOTION = {
  title: {
    fr: "Le mouvement au service de la matière, jamais l'inverse.",
    en: "Motion in service of the material, never the other way round.",
  },
  text: {
    fr: "Assez pour qu'une surface prenne la lumière quand on la survole, et rien de plus. Sur une plateforme consultée depuis un chantier, chaque effet doit se justifier au poids qu'il coûte à charger.",
    en: "Enough for a surface to catch the light when it is hovered, and nothing beyond that. On a platform opened from a building site, every effect has to justify the weight it costs to load.",
  },
};

const IMPACT = {
  title: {
    fr: "Une plateforme qui se lit comme une fiche technique et se tient comme une marque.",
    en: "A platform that reads like a spec sheet and holds itself like a brand.",
  },
  outcomes: [
    {
      fr: "Un seul système visuel au service des deux publics.",
      en: "One visual system serving both audiences.",
    },
    {
      fr: "Une couche négoce où devis, commandes et stock vivent enfin ensemble.",
      en: "A trade layer where quotes, orders and stock finally live together.",
    },
  ] as Say[],
};

const NEXT: NextProject[] = [
  {
    href: "/lithos-materiaux",
    client: "LITHOS",
    category: { fr: "Matériaux", en: "Materials" },
    image: "/work/lithos-materiaux/luthos hero.png",
  },
  {
    href: "/droguerie-souss",
    client: "Souss Droguerie",
    category: { fr: "Matériaux", en: "Materials" },
    image: "/work/droguerie-souss/hero drougure.png",
  },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  {
    id: "direction-artistique",
    label: { fr: "Direction artistique", en: "Art direction" },
  },
  { id: "site-web", label: { fr: "Site web", en: "Website" } },
  { id: "portail-b2b", label: { fr: "Portail B2B", en: "B2B portal" } },
  {
    id: "devis",
    label: { fr: "E-commerce & devis", en: "E-commerce & quoting" },
  },
  { id: "motion", label: { fr: "Motion", en: "Motion" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
];

export function OrsenV2View() {
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
            alt={say({
              fr: "La marque ORSEN en situation",
              en: "The ORSEN mark in place",
            })}
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

      <Chapter id="site-web">
        <Caption index={3} title={say(WEBSITE.title)} text={say(WEBSITE.text)} />
        <Plate
          image="/work/orsen/web-orsen-desktop.jpg"
          alt={say({
            fr: "Le site ORSEN sur écran",
            en: "The ORSEN site on desktop",
          })}
          caption={say({ fr: "Desktop", en: "Desktop" })}
          shape="aspect-4/3 sm:aspect-16/10"
          sizes={FULL}
        />
        <Pair>
          <Plate
            image="/work/orsen/web-orsen-mobile.jpg"
            alt={say({
              fr: "Le site ORSEN sur téléphone",
              en: "The ORSEN site on a phone",
            })}
            caption={say({ fr: "Mobile", en: "Mobile" })}
            shape="aspect-4/5"
            contain
          />
          <Plate
            image="/work/orsen/web-orsen-cover.jpg"
            alt={say({
              fr: "Le catalogue matériaux ORSEN",
              en: "The ORSEN materials catalogue",
            })}
            caption={say({ fr: "Catalogue", en: "Catalogue" })}
            shape="aspect-4/5"
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="portail-b2b">
        <Caption index={4} title={say(PORTAL.title)} text={say(PORTAL.text)} />
        <LinesRow items={PORTAL.lines.map(say)} tone="forest" />
      </Chapter>

      <Chapter id="devis">
        <Caption index={5} title={say(QUOTING.title)} text={say(QUOTING.text)} />
        <LinesRow items={QUOTING.lines.map(say)} tone="beige" />
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
