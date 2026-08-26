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
        fr: "Forêt & Or   une identité tirée de la salle elle-même.",
        en: "Forêt & Or   an identity drawn from the room itself.",
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

  paletteStory: {
    title: { fr: "Le langage visuel", en: "The visual language" },
    lead: {
      fr: "Deux couleurs suffisent à reconnaître Bôpassage avant d'avoir lu son nom.",
      en: "Two colours are enough to recognise Bôpassage before its name has been read.",
    },
    colors: [
      {
        name: "Forêt",
        hex: "#18312e",
        role: { fr: "Fondation", en: "Foundation" },
      },
      {
        name: "Crème",
        hex: "#f5eedf",
        role: { fr: "Contraste", en: "Contrast" },
      },
      {
        name: "Or",
        hex: "#b8973a",
        role: { fr: "Accent", en: "Accent" },
      },
      {
        name: "Or clair",
        hex: "#d4b06a",
        role: { fr: "Lumière", en: "Light" },
      },
    ],
    states: [
      {
        title: { fr: "La salle, d'abord", en: "The room, first" },
        text: {
          fr: "Le vert profond ne vient pas d'une palette : il vient des plantes et de la lumière basse du soir. C'est ce que le lieu fait ressentir avant qu'on ait lu quoi que ce soit.",
          en: "The deep green did not come from a palette. It came from the plants and the low evening light — what the room makes you feel before you have read a word.",
        },
        colorIndex: 0,
      },
      {
        title: { fr: "De quoi respirer", en: "Room to breathe" },
        text: {
          fr: "La crème donne au vert de quoi tenir. Sans elle l'identité serait un bloc ; avec elle, une carte se lit et une devanture s'allège.",
          en: "The cream gives the green something to hold against. Without it the identity would be one block; with it a menu reads and a shopfront lifts.",
        },
        colorIndex: 1,
      },
      {
        title: { fr: "Le caractère", en: "The character" },
        text: {
          fr: "L'or est réservé au logotype et à ce qui compte vraiment. C'est le seul endroit où la marque hausse la voix, ce qui est précisément pourquoi on l'entend.",
          en: "Gold is kept for the wordmark and for what actually matters. It is the one place the brand raises its voice, which is exactly why it carries.",
        },
        colorIndex: 2,
      },
      {
        title: { fr: "L'heure dorée", en: "Golden hour" },
        text: {
          fr: "La nuance claire porte la lumière de fin de journée là où l'or plein serait trop lourd : l'affichage, l'imprimé, les grands aplats.",
          en: "The lighter tone carries the late light where full gold would sit too heavy — out of home, print, the large flat areas.",
        },
        colorIndex: 3,
      },
      {
        title: { fr: "Un lieu, pas une charte", en: "A place, not a chart" },
        text: {
          fr: "Les trois ensemble se reconnaissent sur une tasse comme sur une enseigne. C'est ce qui fait tenir une identité au-delà du logo.",
          en: "The three together are recognisable on a cup and on a sign. That is what makes an identity hold past its logo.",
        },
        colorIndex: 0,
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

  gallery: [
    {
      image: "/work/bopassage-brand-board.png",
      alt: { fr: "Planche de marque Bôpassage", en: "Bôpassage brand board" },
    },
    {
      image: "/work/bopassage-brand-logo-green.png",
      alt: { fr: "Logo Bôpassage en or sur forêt", en: "Bôpassage logo in gold on forest" },
    },
    {
      image: "/work/bopassage-brand-identity.png",
      alt: { fr: "Système d'identité Bôpassage", en: "Bôpassage identity system" },
    },
    {
      image: "/work/bopassage-social-waffle.png",
      alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
    },
    {
      image: "/work/bopassage-social-good-morning.png",
      alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
    },
    {
      image: "/work/bopassage-social-savory-morning.png",
      alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
    },
    {
      image: "/work/bopassage-social-balance.png",
      alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
    },
    {
      image: "/work/bopassage-social-slows-down.png",
      alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
    },
    {
      image: "/work/bopassage-social-instagram.png",
      alt: { fr: "Profil Instagram Bôpassage", en: "Bôpassage Instagram profile" },
    },
  ],
  outcome: {
    title: {
      fr: "La découverte transformée en réservation.",
      en: "Discovery turned into reservations.",
    },
    text: {
      fr: "Une marque plus claire, appliquée partout ; un site qui répond aux deux seules questions que les gens se posent   où, et quand ; et un rythme payant qui continue de tourner entre deux visites.",
      en: "A clearer brand applied everywhere, a site that answers the only two questions people have   where, and when   and a paid rhythm that keeps working between visits.",
    },
    metric: "×3",
  },
};
