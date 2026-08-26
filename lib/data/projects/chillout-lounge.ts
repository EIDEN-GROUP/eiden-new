import type { ProjectCase } from "./types";

/**
 * The only project with no `feature` block either. Its whole story is one
 * venue and one site; a fourth section would be filling the page.
 */
export const chilloutLounge: ProjectCase = {
  slug: "chillout-lounge",
  client: "CHILLOUT Lounge",
  year: "2026",
  category: { fr: "Hôtellerie", en: "Hospitality" },
  location: { fr: "Lunja Village, Agadir", en: "Lunja Village, Agadir" },

  hero: {
    statement: {
      fr: "Imprimer l'heure dorée.",
      en: "Print the golden hour.",
    },
    intro: {
      fr: "Musique live, cocktails et couchers de soleil face à l'Atlantique   avec un seul travail à faire en ligne : remplir ce soir.",
      en: "Live music, cocktails and sunset sessions facing the Atlantic   with one job to do online: fill tonight.",
    },
    image: "/work/chilout hero.png",
    alt: {
      fr: "Le CHILLOUT Lounge au coucher du soleil",
      en: "CHILLOUT Lounge at sunset",
    },
  },

  services: [
    {
      name: { fr: "Direction artistique", en: "Art Direction" },
      note: {
        fr: "La personnalité du lieu, rendue visible.",
        en: "The venue's own personality, made visible.",
      },
    },
    {
      name: { fr: "Site web", en: "Website" },
      note: {
        fr: "Un site léger, construit autour du programme de ce soir.",
        en: "A light site built around tonight's programme.",
      },
    },
    {
      name: { fr: "Motion", en: "Motion" },
      note: {
        fr: "Du mouvement discret, sans dépendance supplémentaire.",
        en: "Light motion, with no extra dependency.",
      },
    },
  ],

  transformation: {
    title: {
      fr: "D'invisible tant qu'on n'y était pas, à un lieu qui se lit comme il se vit au coucher du soleil.",
      en: "From invisible until you arrived, to a venue that reads the way it feels at sunset.",
    },
    text: [
      {
        fr: "Un endroit fait à la main, avec un vrai caractère.",
        en: "A hand-made place, with a real character.",
      },
      {
        fr: "Et aucun moyen de le montrer.",
        en: "And no way to show it.",
      },
      {
        fr: "Le site porte maintenant la personnalité avant qu'on y arrive.",
        en: "The site now carries that personality before you get there.",
      },
      {
        fr: "Et l'équipe met le programme à jour elle-même.",
        en: "And the team updates the programme themselves.",
      },
    ],
  },

  work: [
    {
      image: "/work/web-chillout-desktop.jpg",
      alt: {
        fr: "Le site CHILLOUT sur écran",
        en: "The CHILLOUT site on desktop",
      },
      label: { fr: "Site web", en: "Website" },
    },
    {
      image: "/work/web-chillout-mobile.jpg",
      alt: {
        fr: "Le site CHILLOUT sur téléphone",
        en: "The CHILLOUT site on a phone",
      },
      label: { fr: "Mobile", en: "Mobile" },
    },
    {
      image: "/work/web-chillout-cover.jpg",
      alt: {
        fr: "Le programme CHILLOUT en mouvement",
        en: "The CHILLOUT programme in motion",
      },
      label: { fr: "Motion", en: "Motion" },
    },
  ],

  outcome: {
    title: {
      fr: "Une personnalité visible avant d'y arriver.",
      en: "A personality visible before you get there.",
    },
    text: {
      fr: "Un programme que l'équipe tient elle-même à jour, et un site léger, sans imagerie lourde à charger.",
      en: "A programme the team maintains itself, and a light site with no heavy imagery to load.",
    },
  },
};
