import type { ProjectCase } from "./types";

/**
 * The smallest case in the portfolio: one venue, one site, three disciplines.
 * A fourth panel would be filling the page rather than showing the work.
 */
export const chilloutLounge: ProjectCase = {
  slug: "chillout-lounge",
  client: "CHILLOUT Lounge",
  year: "2026",
  category: { fr: "Lounge", en: "Lounge" },
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
    image: "/work/chillout-lounge/chilout hero.png",
    alt: {
      fr: "Le CHILLOUT Lounge au coucher du soleil",
      en: "CHILLOUT Lounge at sunset",
    },
  },

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

  chapters: [
    {
      key: "art-direction",
      labels: [{ fr: "Direction artistique", en: "Art Direction" }],
      tone: "forest",
      title: {
        fr: "La personnalité du lieu, rendue visible.",
        en: "The venue's own personality, made visible.",
      },
      text: {
        fr: "Rien n'a été inventé : le logotype et la lumière viennent de ce que le lieu est déjà à dix-neuf heures. La direction artistique a consisté à choisir cette heure-là et à s'y tenir partout.",
        en: "Nothing was invented: the wordmark and the light come from what the place already is at seven in the evening. The art direction was choosing that hour and holding to it everywhere.",
      },
      shots: [
        {
          image: "/work/chillout-lounge/chilout card.png",
          alt: {
            fr: "Le logotype CHILLOUT sur une soirée du lieu",
            en: "The CHILLOUT wordmark over a night at the venue",
          },
          label: { fr: "Logo", en: "Logo" },
        },
        {
          image: "/work/chillout-lounge/DSC08999.jpg",
          alt: {
            fr: "Cocktails au bar du CHILLOUT",
            en: "Cocktails at the CHILLOUT bar",
          },
          label: { fr: "Cocktails", en: "Cocktails" },
        },
        {
          image: "/work/chillout-lounge/DSC09029.jpg",
          alt: {
            fr: "Le barman du CHILLOUT au travail",
            en: "The CHILLOUT bartender at work",
          },
          label: { fr: "Le bar", en: "The bar" },
        },
        {
          image: "/work/chillout-lounge/DSC09034.jpg",
          alt: {
            fr: "Une soirée au CHILLOUT Lounge",
            en: "A night at CHILLOUT Lounge",
          },
          label: { fr: "Les soirées", en: "Nights" },
        },
      ],
      wall: [
        {
          image: "/work/chillout-lounge/DSC09000.jpg",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
        {
          image: "/work/chillout-lounge/DSC09003.jpg",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
        {
          image: "/work/chillout-lounge/DSC09004.jpg",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
        {
          image: "/work/chillout-lounge/DSC09006.jpg",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
        {
          image: "/work/chillout-lounge/DSC09008.jpg",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
        {
          image: "/work/chillout-lounge/DSC09016.jpg",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
        {
          image: "/work/chillout-lounge/DSC09017.jpg",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
        {
          image: "/work/chillout-lounge/DSC09020.jpg",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
        {
          image: "/work/chillout-lounge/DSC09021.jpg",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
        {
          image: "/work/chillout-lounge/DSC09023.jpg",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
        {
          image: "/work/chillout-lounge/DSC09024.jpg",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
        {
          image: "/work/chillout-lounge/chilout hero.png",
          alt: { fr: "Le CHILLOUT Lounge", en: "CHILLOUT Lounge" },
        },
      ],
    },
    {
      key: "website",
      labels: [{ fr: "Site web", en: "Website" }],
      tone: "canvas",
      title: {
        fr: "Un site léger, construit autour du programme de ce soir.",
        en: "A light site built around tonight's programme.",
      },
      text: {
        fr: "Un bar n'a qu'une question à traiter en ligne : qui joue ce soir, et à quelle heure. Tout le reste du site est en dessous, et l'équipe met la soirée à jour elle-même depuis un téléphone, en salle.",
        en: "A bar has one question to handle online: who is playing tonight, and at what time. Everything else on the site sits below that, and the team updates the evening themselves from a phone, on the floor.",
      },
      shots: [
        {
          image: "/work/chillout-lounge/web-chillout-desktop.jpg",
          alt: {
            fr: "Le site CHILLOUT sur écran",
            en: "The CHILLOUT site on desktop",
          },
          label: { fr: "Desktop", en: "Desktop" },
        },
        {
          image: "/work/chillout-lounge/web-chillout-mobile.jpg",
          fit: "contain",
          alt: {
            fr: "Le site CHILLOUT sur téléphone",
            en: "The CHILLOUT site on a phone",
          },
          label: { fr: "Mobile", en: "Mobile" },
        },
        {
          image: "/work/chillout-lounge/web-chillout-cover.jpg",
          alt: {
            fr: "L'accueil du site CHILLOUT",
            en: "The CHILLOUT site homepage",
          },
          label: { fr: "Accueil", en: "Home" },
        },
      ],
    },
    {
      key: "motion",
      labels: [{ fr: "Motion", en: "Motion" }],
      tone: "ink",
      title: {
        fr: "Du mouvement discret, sans dépendance supplémentaire.",
        en: "Light motion, with no extra dependency.",
      },
      text: {
        fr: "Le mouvement est écrit en CSS plutôt qu'apporté par une librairie : le site reste léger sur un réseau de bord de mer, et rien ne casse le jour où la librairie change de version. C'est de la retenue, pas une limite.",
        en: "The motion is written in CSS rather than brought in by a library: the site stays light on a seafront connection, and nothing breaks the day the library changes version. That is restraint, not a limitation.",
      },
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
