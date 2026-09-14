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

const CLIENT = "Résidence Rihab";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Hôtellerie", en: "Hospitality" };
const LOCATION: Say = { fr: "Cité Founty, Agadir", en: "Cité Founty, Agadir" };
const SITE = "https://rihab-hotel.vercel.app";

const HERO = {
  statement: {
    fr: "Montrer le lieu tel qu'il est.",
    en: "Show the place as it is.",
  },
  intro: {
    fr: "Une adresse familiale à cinq minutes de l'Atlantique, dans un marché où les voisins vendaient un luxe qu'ils n'avaient pas.",
    en: "A family-run address five minutes from the Atlantic, in a market where neighbours were selling a luxury they did not have.",
  },
  image: "/work/rihab-residence/HERO PAGE RIHAB.png",
  alt: { fr: "La Résidence Rihab à Agadir", en: "Résidence Rihab in Agadir" },
};

const STATEMENT: Say = {
  fr: "Le marché promettait trop. Rihab n'avait qu'à dire vrai.",
  en: "The market was promising too much. Rihab only had to tell the truth.",
};

const REALITY: Say[] = [
  {
    fr: "Une adresse familiale à cinq minutes de l'Atlantique.",
    en: "A family-run address five minutes from the Atlantic.",
  },
  {
    fr: "Des appartements exactement tels qu'ils sont.",
    en: "Apartments exactly as they are.",
  },
  {
    fr: "Deux publics, français et britannique.",
    en: "Two audiences, French and British.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Autour d'Agadir, des appartements modestes vendus comme du luxe.",
    en: "Around Agadir, modest apartments oversold as luxury.",
  },
  {
    fr: "Rien qui distingue une adresse honnête de celles qui exagèrent.",
    en: "Nothing separating an honest address from the ones overstating.",
  },
  {
    fr: "Deux publics, et une seule langue pour les deux.",
    en: "Two audiences, and one language for both.",
  },
];

const DECISION: Say = {
  fr: "Vendre l'exactitude, dans les deux langues, jusqu'à la réservation.",
  en: "Sell accuracy, in both languages, all the way to the booking.",
};

const CHAIN_TEXT: Say = {
  fr: "Le positionnement a pris le contre-pied du marché : des photos non retouchées, des mètres carrés exacts, et une distance à la plage donnée en minutes de marche. Le site tient ce ton du haut en bas. La réservation n'a pas été ajoutée au site   c'est le site qui a été construit autour d'elle, en trois gestes et sans compte à créer. Et les deux langues ont été écrites séparément, parce qu'une famille française et un couple britannique ne cherchent pas les mêmes garanties.",
  en: "Positioning took the opposite side of the market: unretouched photographs, exact square metres, and a distance to the beach given in minutes on foot. The site holds that tone from top to bottom. Booking was not added to the site   the site was built around it, in three taps and with no account to create. And the two languages were written separately, because a French family and a British couple are not looking for the same reassurances.",
};

const WEBSITE = {
  title: {
    fr: "Un ton qui ne promet que ce que la résidence tient.",
    en: "A tone that promises only what the residence delivers.",
  },
  text: {
    fr: "Autour d'Agadir, tout le monde écrivait « luxe ». Rihab avait besoin de l'inverse : des photos non retouchées, des mètres carrés exacts, et une distance à la plage donnée en minutes de marche plutôt qu'en adjectifs.",
    en: "Around Agadir everyone was writing “luxury”. Rihab needed the opposite: unretouched photographs, exact square metres, and a distance to the beach given in minutes on foot rather than in adjectives.",
  },
  signals: [
    { fr: "Des photos non retouchées.", en: "Unretouched photographs." },
    { fr: "Des mètres carrés exacts.", en: "Exact square metres." },
    {
      fr: "La plage en minutes de marche.",
      en: "The beach in minutes on foot.",
    },
  ] as Say[],
};

const BOOKING = {
  title: {
    fr: "Trois gestes, et c'est réservé.",
    en: "Three taps, and it is booked.",
  },
  text: {
    fr: "Pas de compte à créer, pas de carte à saisir, pas de formulaire qui redemande ce qui a déjà été dit. La réservation est le service ici : elle n'a pas été ajoutée au site, c'est le site qui a été construit autour d'elle.",
    en: "No account to create, no card to enter, no form asking again for what was already said. Booking is the service here: it was not added to the site   the site was built around it.",
  },
  lines: [
    { fr: "Pas de compte à créer.", en: "No account to create." },
    { fr: "Pas de carte à saisir.", en: "No card to enter." },
    {
      fr: "Pas de formulaire qui redemande.",
      en: "No form asking again.",
    },
  ] as Say[],
};

const BILINGUAL = {
  title: {
    fr: "Se lit aussi naturellement en anglais qu'en français.",
    en: "Reads as naturally in English as in French.",
  },
  text: {
    fr: "Deux langues écrites séparément plutôt qu'une traduite. Une famille française et un couple britannique ne cherchent pas les mêmes garanties, et une version traduite mot à mot se reconnaît immédiatement   ce qui, sur une adresse qui vend son honnêteté, coûte cher.",
    en: "Two languages written separately rather than one translated. A French family and a British couple are not looking for the same reassurances, and a word-for-word version is recognised instantly   which, on an address selling its honesty, is expensive.",
  },
  lines: [
    { fr: "Une famille française.", en: "A French family." },
    { fr: "Un couple britannique.", en: "A British couple." },
  ] as Say[],
};

const IMPACT = {
  title: {
    fr: "Une adresse qui se présente honnêtement, et se réserve en trois gestes.",
    en: "An address that presents itself honestly, and books in three taps.",
  },
  outcomes: [
    {
      fr: "Une réservation en direct sans friction.",
      en: "Live booking with no friction.",
    },
    {
      fr: "Un site qui se lit en français comme en anglais.",
      en: "A site that reads in French as well as in English.",
    },
  ] as Say[],
};

const NEXT: NextProject[] = [
  {
    href: "/chillout-lounge",
    client: "CHILLOUT Lounge",
    category: { fr: "Lounge", en: "Lounge" },
    image: "/work/chillout-lounge/chilout hero.png",
  },
  {
    href: "/orsen",
    client: "ORSEN",
    category: { fr: "Matériaux", en: "Materials" },
    image: "/work/orsen/orsen hero.png",
  },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  { id: "site-web", label: { fr: "Site web", en: "Website" } },
  {
    id: "reservation",
    label: { fr: "Expérience de réservation", en: "Booking experience" },
  },
  { id: "bilingue", label: { fr: "Digital bilingue", en: "Bilingual digital" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
];

export function RihabResidenceV2View() {
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
            image="/work/rihab-residence/card rihab.png"
            alt={say(HERO.alt)}
            shape="aspect-square"
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="site-web">
        <Caption index={2} title={say(WEBSITE.title)} text={say(WEBSITE.text)} />
        <Pair>
          <Plate
            image="/work/rihab-residence/web-rihab-desktop.jpg"
            alt={say({
              fr: "Le site Rihab sur écran",
              en: "The Rihab site on desktop",
            })}
            caption={say({ fr: "Desktop", en: "Desktop" })}
            shape="aspect-4/3"
          />
          <Plate
            image="/work/rihab-residence/web-rihab-mobile.jpg"
            alt={say({
              fr: "Le site Rihab sur téléphone",
              en: "The Rihab site on a phone",
            })}
            caption={say({ fr: "Mobile", en: "Mobile" })}
            shape="aspect-4/3"
            contain
            delay={0.08}
          />
        </Pair>
        <Pair>
          <Plate
            image="/work/rihab-residence/web-rihab-cover.jpg"
            alt={say({
              fr: "L'accueil du site Rihab",
              en: "The Rihab site homepage",
            })}
            caption={say({ fr: "Accueil", en: "Home" })}
            shape="aspect-4/5"
          />
          <SignalsPanel items={WEBSITE.signals.map(say)} />
        </Pair>
      </Chapter>

      <Chapter id="reservation">
        <Caption index={3} title={say(BOOKING.title)} text={say(BOOKING.text)} />
        <LinesRow items={BOOKING.lines.map(say)} tone="forest" />
      </Chapter>

      <Chapter id="bilingue">
        <Caption
          index={4}
          title={say(BILINGUAL.title)}
          text={say(BILINGUAL.text)}
        />
        <LinesRow items={BILINGUAL.lines.map(say)} tone="beige" />
      </Chapter>

      <Chapter id="impact">
        <Caption index={5} title={say(IMPACT.title)} />
        <OutcomePanel image={HERO.image} items={IMPACT.outcomes.map(say)} />
      </Chapter>
    </CaseV2>
  );
}
