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
  image: "/work/chillout-lounge/hero.jpeg",
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
    href: "/lunja-village",
    client: "Lunja Village",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/lunja-village/hero section lunja.png",
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
  { id: "site-web", label: { fr: "Site web", en: "Website" } },
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

      <Chapter id="site-web">
        <Caption index={1} title={say(WEBSITE.title)} text={say(WEBSITE.text)} />
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
            image="/work/chillout-lounge/desktop.jpeg"
            alt={say({
              fr: "Le site CHILLOUT sur écran",
              en: "The CHILLOUT site on desktop",
            })}
            caption={say({ fr: "Desktop", en: "Desktop" })}
            shape="aspect-4/3"
            delay={0.08}
          />
          <Plate
            image="/work/chillout-lounge/mobile.jpeg"
            alt={say({
              fr: "Le site CHILLOUT sur téléphone",
              en: "The CHILLOUT site on a phone",
            })}
            caption={say({ fr: "Mobile", en: "Mobile" })}
            shape="aspect-4/3"
          />
        </Pair>
      </Chapter>

      <Chapter id="impact">
        <Caption index={2} title={say(IMPACT.title)} />
        <OutcomePanel image={HERO.image} items={IMPACT.outcomes.map(say)} />
      </Chapter>

      <Chapter id="le-travail">
        <Caption
          index={3}
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
