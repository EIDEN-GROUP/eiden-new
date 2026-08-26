import type { ProjectCase } from "./types";

/** No `identity` block, and none is sold here   the three services are digital. */
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
    image: "/work/HERO PAGE RIHAB.png",
    alt: {
      fr: "La Résidence Rihab à Agadir",
      en: "Résidence Rihab in Agadir",
    },
  },

  services: [
    {
      name: { fr: "Site web", en: "Website" },
      note: {
        fr: "Un ton qui ne promet que ce que la résidence tient.",
        en: "A tone that promises only what the residence delivers.",
      },
    },
    {
      name: { fr: "Expérience de réservation", en: "Booking Experience" },
      note: {
        fr: "Réservation en direct   sans compte, sans carte.",
        en: "Live booking   no account, no card.",
      },
    },
    {
      name: { fr: "Digital bilingue", en: "Bilingual Digital" },
      note: {
        fr: "Se lit aussi naturellement en anglais qu'en français.",
        en: "Reads as naturally in English as in French.",
      },
    },
  ],

  transformation: {
    title: {
      fr: "D'un marché de la surenchère à une adresse qui se réserve honnêtement.",
      en: "From a market of overstatement to an address that books itself honestly.",
    },
    text: [
      {
        fr: "Autour d'Agadir, des appartements modestes étaient vendus comme du luxe.",
        en: "Around Agadir, modest apartments were being oversold as luxury.",
      },
      {
        fr: "Rihab avait besoin de l'inverse.",
        en: "Rihab needed the opposite.",
      },
      {
        fr: "Un site qui montre le lieu tel qu'il est, dans les deux langues.",
        en: "A site that shows the place as it is, in both languages.",
      },
      {
        fr: "Et qui laisse réserver en trois gestes, sans créer de compte.",
        en: "And lets a guest book in three taps, without creating an account.",
      },
    ],
  },

  feature: {
    label: { fr: "Expérience de réservation", en: "Booking Experience" },
    title: {
      fr: "Trois gestes, et c'est réservé.",
      en: "Three taps, and it is booked.",
    },
    text: {
      fr: "Pas de compte à créer, pas de carte à saisir, pas de formulaire qui redemande ce qui a déjà été dit. La réservation est le service ici, alors elle a sa section plutôt que d'être enterrée dans la galerie.",
      en: "No account to create, no card to enter, no form asking again for what was already said. Booking is the service here, so it gets a section rather than being buried in the gallery.",
    },
  },

  work: [
    {
      image: "/work/web-rihab-cover.jpg",
      alt: { fr: "Le site Résidence Rihab", en: "The Résidence Rihab site" },
      label: { fr: "Site web", en: "Website" },
    },
    {
      image: "/work/web-rihab-desktop.jpg",
      alt: {
        fr: "Le site Rihab sur écran",
        en: "The Rihab site on desktop",
      },
      label: { fr: "Site web", en: "Website" },
    },
    {
      image: "/work/web-rihab-mobile.jpg",
      alt: {
        fr: "Le site Rihab sur téléphone",
        en: "The Rihab site on a phone",
      },
      label: { fr: "Mobile", en: "Mobile" },
    },
  ],

  outcome: {
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
