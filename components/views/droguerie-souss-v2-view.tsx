"use client";

import {
  CaseV2,
  Caption,
  Chapter,
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

const CLIENT = "Souss Droguerie";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Matériaux", en: "Materials" };
const LOCATION: Say = { fr: "Agadir, Maroc", en: "Agadir, Morocco" };
const SITE = "https://www.soussdroguerie.com";

const HERO = {
  statement: {
    fr: "Concevoir pour une seule chose : que le téléphone sonne.",
    en: "Design for one outcome: the phone rings.",
  },
  intro: {
    fr: "Vingt ans de distribution de matériaux de construction, avec une présence digitale qui ne montrait ni la compétence, ni la réactivité, ni le stock.",
    en: "Twenty years of distributing building materials, with a digital presence that showed none of the competence, the speed, or the stock.",
  },
  image: "/work/droguerie-souss/hero drougure.png",
  alt: {
    fr: "Le comptoir Souss Droguerie",
    en: "The Souss Droguerie trade counter",
  },
};

const STATEMENT: Say = {
  fr: "La compétence était au comptoir. Elle s'arrêtait à la porte.",
  en: "The expertise was at the counter. It stopped at the door.",
};

const REALITY: Say[] = [
  {
    fr: "Vingt ans de métier au comptoir.",
    en: "Twenty years of trade at the counter.",
  },
  {
    fr: "Un stock réel, et le conseil qui va avec.",
    en: "Real stock, and the advice that comes with it.",
  },
  {
    fr: "Une transaction qui se conclut toujours au téléphone.",
    en: "A transaction that still finishes on the phone.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Personne ne voyait le savoir-faire.",
    en: "Nobody could see the expertise.",
  },
  { fr: "Personne ne voyait le stock.", en: "Nobody could see the stock." },
  {
    fr: "Rien à vérifier avant d'appeler.",
    en: "Nothing to check before calling.",
  },
];

const WEBSITE = {
  title: {
    fr: "Construit autour d'un seul acte : passer l'appel.",
    en: "Built around one act: making the call.",
  },
  text: {
    fr: "Dans ce métier la transaction se conclut au téléphone, quoi qu'en dise le e-commerce. Le numéro reste donc à l'écran du haut en bas de chaque page, et tout ce que le site fait par ailleurs sert à ce qu'on appelle déjà renseigné.",
    en: "In this trade the transaction still closes on the phone, whatever e-commerce would like to believe. So the number stays on screen from the top of every page to the bottom, and everything else the site does is there so that the call starts already informed.",
  },
};

const COMMERCE = {
  title: {
    fr: "La gamme, tarifée et commandable.",
    en: "The range, priced and orderable.",
  },
  text: {
    fr: "Un chef de chantier qui commande à sept heures du matin n'attend pas un devis : il veut un prix, une quantité et une date de livraison, et il veut les trois avant d'avoir fini son café.",
    en: "A site manager ordering at seven in the morning is not waiting for a quote: they want a price, a quantity and a delivery date, and they want all three before the coffee is finished.",
  },
  lines: [
    { fr: "Un prix.", en: "A price." },
    { fr: "Une quantité.", en: "A quantity." },
    { fr: "Une date de livraison.", en: "A delivery date." },
  ] as Say[],
};

const CATALOGUE = {
  title: {
    fr: "La gamme, et ce qu'il en reste.",
    en: "The range, and what is left of it.",
  },
  text: {
    fr: "C'est ce que le négoce vient chercher : pas une brochure, mais l'état réel du stock. Un catalogue qui dit « en rupture » vaut mieux qu'un catalogue qui ne dit rien.",
    en: "This is what the trade actually comes for: not a brochure, but the real state of the stock. A catalogue that says “out of stock” is worth more than one that says nothing.",
  },
  signals: [
    { fr: "Pas une brochure.", en: "Not a brochure." },
    { fr: "L'état réel du stock.", en: "The real state of the stock." },
    {
      fr: "Un catalogue qui dit « en rupture ».",
      en: "A catalogue that says “out of stock”.",
    },
  ] as Say[],
};

const EXPERIENCE = {
  title: {
    fr: "Utilisable par un chef de chantier, entre deux livraisons.",
    en: "Usable by a site manager, between two deliveries.",
  },
  text: {
    fr: "Une seule main, des gants, du soleil sur l'écran et une connexion qui tombe : ce sont les conditions réelles, et elles ont décidé de la taille des boutons plus sûrement que n'importe quelle grille.",
    en: "One hand, gloves on, sun on the screen and a connection that drops: those are the real conditions, and they decided the size of the buttons more surely than any grid could.",
  },
  lines: [
    { fr: "Une seule main.", en: "One hand." },
    { fr: "Des gants.", en: "Gloves on." },
    { fr: "Du soleil sur l'écran.", en: "Sun on the screen." },
    { fr: "Une connexion qui tombe.", en: "A connection that drops." },
  ] as Say[],
};

const IMPACT = {
  title: {
    fr: "Vingt ans de métier, enfin visibles avant le premier appel.",
    en: "Twenty years of trade, finally visible before the first call.",
  },
  outcomes: [
    {
      fr: "Une compétence montrée plutôt qu'affirmée.",
      en: "Competence shown rather than claimed.",
    },
    {
      fr: "Un catalogue honnête sur la disponibilité.",
      en: "A catalogue honest about availability.",
    },
    {
      fr: "Un site construit autour d'un seul acte.",
      en: "A site built around one act.",
    },
  ] as Say[],
};

const NEXT: NextProject[] = [
  {
    href: "/bopassage",
    client: "Bôpassage",
    category: { fr: "Cafés & restaurants", en: "Cafés & Restaurants" },
    image: "/work/bopassage/bopassage-hero.png",
  },
  {
    href: "/dmc-morocco",
    client: "DMC Hospitality Morocco",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/dmc-morocco/dmc-hero.png",
  },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "site-web", label: { fr: "Site web", en: "Website" } },
  { id: "e-commerce", label: { fr: "E-commerce", en: "E-commerce" } },
  { id: "catalogue", label: { fr: "Catalogue", en: "Catalogue" } },
  {
    id: "experience-digitale",
    label: { fr: "Expérience digitale", en: "Digital experience" },
  },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
];

export function DroguerieSoussV2View() {
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

      <Chapter id="site-web">
        <Caption index={1} title={say(WEBSITE.title)} text={say(WEBSITE.text)} />
        <Pair>
          <Plate
            image="/work/droguerie-souss/desktop.jpeg"
            alt={say({
              fr: "Le site Souss Droguerie sur écran",
              en: "The Souss Droguerie site on desktop",
            })}
            caption={say({ fr: "Desktop", en: "Desktop" })}
            shape="aspect-4/3"
          />
          <Plate
            image="/work/droguerie-souss/mobile.jpeg"
            alt={say({
              fr: "Le site Souss Droguerie sur téléphone",
              en: "The Souss Droguerie site on a phone",
            })}
            caption={say({ fr: "Mobile", en: "Mobile" })}
            shape="aspect-4/3"
          />
        </Pair>
      </Chapter>

      <Chapter id="e-commerce">
        <Caption index={2} title={say(COMMERCE.title)} text={say(COMMERCE.text)} />
        <LinesRow items={COMMERCE.lines.map(say)} tone="forest" />
      </Chapter>

      <Chapter id="catalogue">
        <Caption
          index={3}
          title={say(CATALOGUE.title)}
          text={say(CATALOGUE.text)}
        />
        <Pair>
          <Plate
            image="/work/droguerie-souss/web-droguerie-souss-cover.jpg"
            alt={say({
              fr: "Le catalogue Souss Droguerie",
              en: "The Souss Droguerie catalogue",
            })}
            caption={say({ fr: "Catalogue", en: "Catalogue" })}
            shape="aspect-4/5"
          />
          <SignalsPanel items={CATALOGUE.signals.map(say)} />
        </Pair>
      </Chapter>

      <Chapter id="experience-digitale">
        <Caption
          index={4}
          title={say(EXPERIENCE.title)}
          text={say(EXPERIENCE.text)}
        />
        <LinesRow items={EXPERIENCE.lines.map(say)} tone="beige" />
      </Chapter>

      <Chapter id="impact">
        <Caption index={5} title={say(IMPACT.title)} />
        <OutcomePanel image={HERO.image} items={IMPACT.outcomes.map(say)} />
      </Chapter>
    </CaseV2>
  );
}
