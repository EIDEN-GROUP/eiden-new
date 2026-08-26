import type { ProjectCase } from "./types";

export const bopassage: ProjectCase = {
  slug: "bopassage",
  client: "Bôpassage",
  year: "2024",
  category: { fr: "Hôtellerie", en: "Hospitality" },
  location: { fr: "Agadir, Maroc", en: "Agadir, Morocco" },

  hero: {
    statement: {
      fr: "Le lieu où l'on revient toujours.",
      en: "The place you always come back to.",
    },
    intro: {
      fr: "Un café-restaurant de Founty qui avait tout, sauf de quoi se faire trouver. Nous avons construit la marque, le site et le rythme qui portent le lieu au-delà de sa porte.",
      en: "A Founty café-restaurant that had everything except a way to be found. We built the brand, the site and the rhythm that carry the place past its own door.",
    },
    image: "/work/bopassage-hero.png",
    alt: {
      fr: "La salle de Bôpassage à Agadir",
      en: "The Bôpassage dining room in Agadir",
    },
  },

  services: [
    {
      name: { fr: "Branding", en: "Branding" },
      note: {
        fr: "Forêt & Or — une identité tirée de la salle elle-même.",
        en: "Forêt & Or — an identity drawn from the room itself.",
      },
    },
    {
      name: { fr: "Site web", en: "Website" },
      note: {
        fr: "La carte, l'adresse et la réservation à un pouce de distance.",
        en: "Menu, address and booking, a thumb away.",
      },
    },
    {
      name: { fr: "Marketing", en: "Marketing" },
      note: {
        fr: "Un rythme social que l'équipe peut tenir.",
        en: "A social rhythm the team can hold.",
      },
    },
    {
      name: { fr: "Média payant", en: "Paid Media" },
      note: {
        fr: "Google Ads dirigé vers ceux qui choisissent déjà où manger.",
        en: "Google Ads aimed at people already choosing where to eat.",
      },
    },
    { name: { fr: "Revenu", en: "Revenue" } },
  ],

  transformation: {
    title: {
      fr: "D'une salle qui se vidait à la fermeture, à une marque qui tourne entre deux visites.",
      en: "From a room that emptied at closing to a brand that keeps running between visits.",
    },
    text: [
      {
        fr: "L'ambiance s'arrêtait à la porte.",
        en: "The atmosphere stopped at the front door.",
      },
      {
        fr: "Pas de site, pas de présence sociale régulière, rien de payant.",
        en: "No site, no consistent social presence, nothing paid.",
      },
      {
        fr: "Nous avons pris ce que la salle fait ressentir et construit vers l'extérieur à partir de là.",
        en: "We took what the room feels like and built outward from it.",
      },
      {
        fr: "La marque se lit maintenant de la même façon sur un écran et à table.",
        en: "The brand now reads the same on a screen as it does at the table.",
      },
    ],
  },

  identity: {
    title: { fr: "Forêt & Or", en: "Forêt & Or" },
    text: {
      fr: "La chaleur botanique et la lumière dorée, fixées en système : un logotype manuscrit, trois couleurs, et des applications de la tasse à l'enseigne.",
      en: "Botanical warmth and golden-hour light, fixed into a system: a script wordmark, three colours, and applications from the cup to the sign.",
    },
    palette: [
      { name: { fr: "Forêt", en: "Forest" }, hex: "#18312e" },
      { name: { fr: "Crème", en: "Cream" }, hex: "#f5eedf" },
      { name: { fr: "Or", en: "Gold" }, hex: "#b8973a" },
    ],
    shots: [
      {
        image: "/work/bopassage-brand-application.png",
        alt: {
          fr: "Logotype principal et secondaire de Bôpassage",
          en: "Bôpassage primary and secondary wordmark",
        },
        label: { fr: "Logo", en: "Logo" },
      },
      {
        image: "/work/bopassage-brand-cup.png",
        alt: {
          fr: "Tasse aux couleurs de Bôpassage",
          en: "Cup in the Bôpassage colours",
        },
        label: { fr: "Application", en: "Application" },
      },
    ],
  },

  work: [
    {
      image: "/work/bopassage-web-desktop.png",
      alt: {
        fr: "Page d'accueil du site Bôpassage",
        en: "The Bôpassage homepage",
      },
      label: { fr: "Site web", en: "Website" },
    },
    {
      image: "/work/bopassage-web-mobile.png",
      alt: {
        fr: "Le site Bôpassage sur téléphone",
        en: "The Bôpassage site on a phone",
      },
      label: { fr: "Mobile", en: "Mobile" },
    },
    {
      image: "/work/bopassage-brand-signage.png",
      alt: {
        fr: "Signalétique extérieure de Bôpassage",
        en: "Bôpassage exterior signage",
      },
      label: { fr: "Application de marque", en: "Brand Application" },
    },
    {
      image: "/work/bopassage-social-matcha.png",
      alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
      label: { fr: "Campagne", en: "Campaign" },
    },
    {
      image: "/work/bopassage-ooh-column.png",
      alt: {
        fr: "Affichage extérieur Bôpassage",
        en: "Bôpassage out-of-home poster",
      },
      label: { fr: "Campagne", en: "Campaign" },
    },
  ],

  outcome: {
    title: {
      fr: "La découverte transformée en réservation.",
      en: "Discovery turned into reservations.",
    },
    text: {
      fr: "Une marque plus claire, appliquée partout ; un site qui répond aux deux seules questions que les gens se posent — où, et quand ; et un rythme payant qui continue de tourner entre deux visites.",
      en: "A clearer brand applied everywhere, a site that answers the only two questions people have — where, and when — and a paid rhythm that keeps working between visits.",
    },
    metric: "×3",
  },
};
