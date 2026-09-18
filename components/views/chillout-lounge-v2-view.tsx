"use client";

import {
  CaseV2,
  Caption,
  Chapter,
  FULL,
  Gallery,
  Hero,
  OutcomePanel,
  Pair,
  Plate,
  RealityFracture,
  SignalsPanel,
  useSay,
  type NextProject,
  type Say,
} from "@/components/case-v2/kit";

const CLIENT = "CHILLOUT Lounge";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Lounge", en: "Lounge" };
const LOCATION: Say = { fr: "Lunja Village, Agadir", en: "Lunja Village, Agadir" };
const SITE = "https://chill-vibes-studio.vercel.app";
const SOCIALS = { instagram: "https://www.instagram.com/chillout_taghazout/" };

const HERO = {
  statement: { fr: "Imprimer l'heure dorée.", en: "Print the golden hour." },
  intro: {
    fr: "Musique live, cocktails et couchers de soleil face à l'Atlantique   avec un seul travail à faire en ligne : remplir ce soir.",
    en: "Live music, cocktails and sunset sessions facing the Atlantic   with one job to do online: fill tonight.",
  },
  image: "/work/chillout-lounge/chilout hero.png",
  alt: {
    fr: "Le CHILLOUT Lounge au coucher du soleil",
    en: "CHILLOUT Lounge at sunset",
  },
};

const STATEMENT: Say = {
  fr: "Le lieu se vivait très bien. Il ne se voyait pas.",
  en: "The place was easy to experience. It was impossible to see.",
};

const REALITY: Say[] = [
  {
    fr: "Un endroit fait à la main, avec un vrai caractère.",
    en: "A hand-made place, with a real character.",
  },
  {
    fr: "Une heure   dix-neuf heures   que le lieu a déjà.",
    en: "An hour   seven in the evening   the place already owns.",
  },
  {
    fr: "Un programme qui change tous les soirs.",
    en: "A programme that changes every night.",
  },
];

const FRACTURE: Say[] = [
  { fr: "Aucun moyen de le montrer.", en: "No way to show it." },
  {
    fr: "Invisible tant qu'on n'y était pas.",
    en: "Invisible until you had arrived.",
  },
  {
    fr: "Un programme que l'équipe ne pouvait pas tenir à jour elle-même.",
    en: "A programme the team could not keep up to date itself.",
  },
];

const DECISION: Say = {
  fr: "Faire porter au site la personnalité du lieu, avant qu'on y arrive.",
  en: "Make the site carry the personality of the place, before you get there.",
};

const CHAIN_TEXT: Say = {
  fr: "La direction artistique a choisi dix-neuf heures et s'y tient partout : le logotype et la lumière viennent de ce que le lieu est déjà à cette heure-là. Le site ne traite qu'une question   qui joue ce soir   et l'équipe met la soirée à jour elle-même, depuis la salle. Et le mouvement est écrit en CSS plutôt qu'apporté par une librairie, pour que le site reste léger sur un réseau de bord de mer.",
  en: "Art direction picked seven in the evening and holds to it everywhere: the wordmark and the light come from what the place already is at that hour. The site handles one question   who is playing tonight   and the team updates the evening itself, from the floor. And the motion is written in CSS rather than brought in by a library, so the site stays light on a seafront network.",
};

const WEBSITE = {
  title: {
    fr: "Un site léger, construit autour du programme de ce soir.",
    en: "A light site built around tonight's programme.",
  },
  text: {
    fr: "Un bar n'a qu'une question à traiter en ligne : qui joue ce soir, et à quelle heure. Tout le reste du site est en dessous, et l'équipe met la soirée à jour elle-même depuis un téléphone, en salle.",
    en: "A bar has one question to handle online: who is playing tonight, and at what time. Everything else on the site sits below that, and the team updates the evening themselves from a phone, on the floor.",
  },
};

const MOTION = {
  title: {
    fr: "Du mouvement discret, sans dépendance supplémentaire.",
    en: "Light motion, with no extra dependency.",
  },
  text: {
    fr: "Le mouvement est écrit en CSS plutôt qu'apporté par une librairie : le site reste léger sur un réseau de bord de mer, et rien ne casse le jour où la librairie change de version. C'est de la retenue, pas une limite.",
    en: "The motion is written in CSS rather than brought in by a library: the site stays light on a seafront connection, and nothing breaks the day the library changes version. That is restraint, not a limitation.",
  },
  signals: [
    {
      fr: "Un site léger sur un réseau de bord de mer.",
      en: "A site that stays light on a seafront connection.",
    },
    {
      fr: "Rien ne casse le jour où la librairie change de version.",
      en: "Nothing breaks the day the library changes version.",
    },
    { fr: "De la retenue, pas une limite.", en: "Restraint, not a limitation." },
  ] as Say[],
};

const IMPACT = {
  title: {
    fr: "Une personnalité visible avant d'y arriver.",
    en: "A personality visible before you get there.",
  },
  outcomes: [
    {
      fr: "Un programme que l'équipe tient elle-même à jour.",
      en: "A programme the team maintains itself.",
    },
    {
      fr: "Un site léger, sans imagerie lourde à charger.",
      en: "A light site with no heavy imagery to load.",
    },
  ] as Say[],
};

const WORK: { image: string; alt: Say }[] = [
  "DSC09000.jpg",
  "DSC09003.jpg",
  "DSC09004.jpg",
  "DSC09006.jpg",
  "DSC09008.jpg",
  "DSC09014.jpg",
  "DSC09016.jpg",
  "DSC09020.jpg",
  "DSC09024.jpg",
  "chilout hero.png",
].map((file) => ({
  image: `/work/chillout-lounge/${file}`,
  alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
}));

const NEXT: NextProject[] = [
  {
    href: "/orsen",
    client: "ORSEN",
    category: { fr: "Matériaux", en: "Materials" },
    image: "/work/orsen/orsen hero.png",
  },
  {
    href: "/lithos-materiaux",
    client: "LITHOS",
    category: { fr: "Matériaux", en: "Materials" },
    image: "/work/lithos-materiaux/luthos hero.png",
  },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  { id: "site-web", label: { fr: "Site web", en: "Website" } },
  { id: "motion", label: { fr: "Motion", en: "Motion" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
  { id: "le-travail", label: { fr: "Galerie", en: "Gallery" } },
];

export function ChilloutLoungeV2View() {
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
      socials={SOCIALS}
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
            image="/work/chillout-lounge/DSC09000.jpg"
            alt={say({ fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" })}
            shape="aspect-square"
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="site-web">
        <Caption index={2} title={say(WEBSITE.title)} text={say(WEBSITE.text)} />
        {/* <Plate
          image="/work/chillout-lounge/web-chillout-desktop.jpg"
          alt={say({
            fr: "Le site CHILLOUT sur écran",
            en: "The CHILLOUT site on desktop",
          })}
          caption={say({ fr: "Desktop", en: "Desktop" })}
          shape="aspect-4/3 sm:aspect-16/10"
          sizes={FULL}
        /> */}
        <Pair>
          <Plate
            image="/work/chillout-lounge/web-chillout-cover.jpg"
            alt={say({
              fr: "Le site CHILLOUT sur écran",
              en: "The CHILLOUT site on desktop",
            })}
            caption={say({ fr: "Desktop", en: "Desktop" })}
            shape="aspect-4/5"
            delay={0.08}
          />
          <Plate
            image="/work/chillout-lounge/web-chillout-mobile.jpg"
            alt={say({
              fr: "Le site CHILLOUT sur téléphone",
              en: "The CHILLOUT site on a phone",
            })}
            caption={say({ fr: "Mobile", en: "Mobile" })}
            shape="aspect-4/5"
            contain
          />
        </Pair>
      </Chapter>

      <Chapter id="motion">
        <Caption index={3} title={say(MOTION.title)} text={say(MOTION.text)} />
        <Pair>
          <Plate
            image="/work/chillout-lounge/DSC09024.jpg"
            alt={say({ fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" })}
            shape="aspect-4/5"
          />
          <SignalsPanel items={MOTION.signals.map(say)} />
        </Pair>
      </Chapter>

      <Chapter id="impact">
        <Caption index={4} title={say(IMPACT.title)} />
        <OutcomePanel image={HERO.image} items={IMPACT.outcomes.map(say)} />
      </Chapter>

      <Chapter id="le-travail">
        <Caption
          index={5}
          title={say({
            fr: "La preuve, après l'argument.",
            en: "The proof, after the argument.",
          })}
          meta={`${WORK.length} ${say({ fr: "images", en: "pictures" })}`}
        />
        <Gallery items={WORK} />
      </Chapter>
    </CaseV2>
  );
}
