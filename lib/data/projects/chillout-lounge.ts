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

  fracture: {
    reality: [
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
    ],
    fracture: [
      { fr: "Aucun moyen de le montrer.", en: "No way to show it." },
      {
        fr: "Invisible tant qu'on n'y était pas.",
        en: "Invisible until you had arrived.",
      },
      {
        fr: "Un programme que l'équipe ne pouvait pas tenir à jour elle-même.",
        en: "A programme the team could not keep up to date itself.",
      },
    ],
    statement: {
      fr: "Le lieu se vivait très bien. Il ne se voyait pas.",
      en: "The place was easy to experience. It was impossible to see.",
    },
  },

  architecture: {
    decision: {
      fr: "Faire porter au site la personnalité du lieu, avant qu'on y arrive.",
      en: "Make the site carry the personality of the place, before you get there.",
    },
    chain: [
      { fr: "Direction artistique", en: "Art Direction" },
      { fr: "Site web", en: "Website" },
      { fr: "Motion", en: "Motion" },
    ],
    text: {
      fr: "La direction artistique a choisi dix-neuf heures et s'y tient partout : le logotype et la lumière viennent de ce que le lieu est déjà à cette heure-là. Le site ne traite qu'une question   qui joue ce soir   et l'équipe met la soirée à jour elle-même, depuis la salle. Et le mouvement est écrit en CSS plutôt qu'apporté par une librairie, pour que le site reste léger sur un réseau de bord de mer.",
      en: "Art direction picked seven in the evening and holds to it everywhere: the wordmark and the light come from what the place already is at that hour. The site handles one question   who is playing tonight   and the team updates the evening itself, from the floor. And the motion is written in CSS rather than brought in by a library, so the site stays light on a seafront network.",
    },
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
      links: [
        {
          href: "https://chill-vibes-studio.vercel.app",
          label: { fr: "Voir le site", en: "View the site" },
          kind: "site",
        },
      ],
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

  impact: {
    title: {
      fr: "Une personnalité visible avant d'y arriver.",
      en: "A personality visible before you get there.",
    },
    text: {
      fr: "Un programme que l'équipe tient elle-même à jour, et un site léger, sans imagerie lourde à charger.",
      en: "A programme the team maintains itself, and a light site with no heavy imagery to load.",
    },
  },

  work: [
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
};
