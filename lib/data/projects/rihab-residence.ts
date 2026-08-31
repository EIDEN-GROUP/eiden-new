import type { ProjectCase } from "./types";

/**
 * Three disciplines, and only one of them left a picture behind. The booking
 * flow and the bilingual work are set in type rather than illustrated with the
 * same screenshot a third time.
 */
export const rihabResidence: ProjectCase = {
  slug: "rihab-residence",
  client: "Résidence Rihab",
  year: "2026",
  category: { fr: "Hôtellerie", en: "Hospitality" },
  location: { fr: "Cité Founty, Agadir", en: "Cité Founty, Agadir" },

  hero: {
    statement: {
      fr: "Montrer le lieu tel qu'il est.",
      en: "Show the place as it is.",
    },
    intro: {
      fr: "Une adresse familiale à cinq minutes de l'Atlantique, dans un marché où les voisins vendaient un luxe qu'ils n'avaient pas.",
      en: "A family-run address five minutes from the Atlantic, in a market where neighbours were selling a luxury they did not have.",
    },
    image: "/work/rihab-residence/HERO PAGE RIHAB.png",
    alt: {
      fr: "La Résidence Rihab à Agadir",
      en: "Résidence Rihab in Agadir",
    },
  },

  fracture: {
    reality: [
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
    ],
    fracture: [
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
    ],
    statement: {
      fr: "Le marché promettait trop. Rihab n'avait qu'à dire vrai.",
      en: "The market was promising too much. Rihab only had to tell the truth.",
    },
  },

  architecture: {
    decision: {
      fr: "Vendre l'exactitude, dans les deux langues, jusqu'à la réservation.",
      en: "Sell accuracy, in both languages, all the way to the booking.",
    },
    chain: [
      { fr: "Positionnement", en: "Positioning" },
      { fr: "Site web", en: "Website" },
      { fr: "Réservation", en: "Booking" },
      { fr: "Digital bilingue", en: "Bilingual Digital" },
    ],
    text: {
      fr: "Le positionnement a pris le contre-pied du marché : des photos non retouchées, des mètres carrés exacts, et une distance à la plage donnée en minutes de marche. Le site tient ce ton du haut en bas. La réservation n'a pas été ajoutée au site   c'est le site qui a été construit autour d'elle, en trois gestes et sans compte à créer. Et les deux langues ont été écrites séparément, parce qu'une famille française et un couple britannique ne cherchent pas les mêmes garanties.",
      en: "Positioning took the opposite side of the market: unretouched photographs, exact square metres, and a distance to the beach given in minutes on foot. The site holds that tone from top to bottom. Booking was not added to the site   the site was built around it, in three taps and with no account to create. And the two languages were written separately, because a French family and a British couple are not looking for the same reassurances.",
    },
  },

  chapters: [
    {
      key: "website",
      labels: [{ fr: "Site web", en: "Website" }],
      tone: "forest",
      title: {
        fr: "Un ton qui ne promet que ce que la résidence tient.",
        en: "A tone that promises only what the residence delivers.",
      },
      text: {
        fr: "Autour d'Agadir, tout le monde écrivait « luxe ». Rihab avait besoin de l'inverse : des photos non retouchées, des mètres carrés exacts, et une distance à la plage donnée en minutes de marche plutôt qu'en adjectifs.",
        en: "Around Agadir everyone was writing “luxury”. Rihab needed the opposite: unretouched photographs, exact square metres, and a distance to the beach given in minutes on foot rather than in adjectives.",
      },
      links: [
        {
          href: "https://rihab-hotel.vercel.app",
          label: { fr: "Voir le site", en: "View the site" },
          kind: "site",
        },
      ],
      shots: [
        {
          image: "/work/rihab-residence/web-rihab-desktop.jpg",
          alt: { fr: "Le site Rihab sur écran", en: "The Rihab site on desktop" },
          label: { fr: "Desktop", en: "Desktop" },
        },
        {
          image: "/work/rihab-residence/web-rihab-mobile.jpg",
          fit: "contain",
          alt: {
            fr: "Le site Rihab sur téléphone",
            en: "The Rihab site on a phone",
          },
          label: { fr: "Mobile", en: "Mobile" },
        },
        {
          image: "/work/rihab-residence/web-rihab-cover.jpg",
          alt: { fr: "L'accueil du site Rihab", en: "The Rihab site homepage" },
          label: { fr: "Accueil", en: "Home" },
        },
      ],
    },
    {
      key: "booking",
      labels: [{ fr: "Expérience de réservation", en: "Booking Experience" }],
      tone: "canvas",
      title: {
        fr: "Trois gestes, et c'est réservé.",
        en: "Three taps, and it is booked.",
      },
      text: {
        fr: "Pas de compte à créer, pas de carte à saisir, pas de formulaire qui redemande ce qui a déjà été dit. La réservation est le service ici : elle n'a pas été ajoutée au site, c'est le site qui a été construit autour d'elle.",
        en: "No account to create, no card to enter, no form asking again for what was already said. Booking is the service here: it was not added to the site   the site was built around it.",
      },
    },
    {
      key: "bilingual",
      labels: [{ fr: "Digital bilingue", en: "Bilingual Digital" }],
      tone: "ink",
      title: {
        fr: "Se lit aussi naturellement en anglais qu'en français.",
        en: "Reads as naturally in English as in French.",
      },
      text: {
        fr: "Deux langues écrites séparément plutôt qu'une traduite. Une famille française et un couple britannique ne cherchent pas les mêmes garanties, et une version traduite mot à mot se reconnaît immédiatement   ce qui, sur une adresse qui vend son honnêteté, coûte cher.",
        en: "Two languages written separately rather than one translated. A French family and a British couple are not looking for the same reassurances, and a word-for-word version is recognised instantly   which, on an address selling its honesty, is expensive.",
      },
    },
  ],

  impact: {
    title: {
      fr: "Une adresse qui se présente honnêtement, et se réserve en trois gestes.",
      en: "An address that presents itself honestly, and books in three taps.",
    },
    text: {
      fr: "Une réservation en direct sans friction, et un site qui se lit en français comme en anglais.",
      en: "Live booking with no friction, and a site that reads in French as well as in English.",
    },
  },
};
