import type { ProjectCase } from "./types";

export const lunjaVillage: ProjectCase = {
  slug: "lunja-village",
  client: "Lunja Village",
  year: "2024",
  category: { fr: "Hôtellerie", en: "Hospitality" },
  location: {
    fr: "Imi Ouaddar, Taghazout",
    en: "Imi Ouaddar, Taghazout",
  },

  hero: {
    statement: {
      fr: "Parler comme quelqu'un qui y vit déjà.",
      en: "Speak like someone who already lives there.",
    },
    intro: {
      fr: "Un village côtier dont la marque disait encore « resort » alors que ceux qui arrivaient étaient surfeurs, nomades et collectifs créatifs. Nous l'avons reconstruite pour le client qui vient vraiment.",
      en: "A coastal village whose brand still said “resort” while the people turning up were surfers, nomads and creative groups. We rebuilt it for the guest actually arriving.",
    },
    image: "/work/lunja-hero.png",
    alt: {
      fr: "Lunja Village, sur la côte au nord d'Agadir",
      en: "Lunja Village, on the coast north of Agadir",
    },
  },

  services: [
    {
      name: { fr: "Rebranding", en: "Rebranding" },
      note: {
        fr: "Une identité qui correspond à qui pousse la porte.",
        en: "An identity that matches who walks through the door.",
      },
    },
    {
      name: { fr: "Positionnement", en: "Positioning" },
      note: {
        fr: "Adressé au vrai client, pas à celui qu'on imaginait.",
        en: "Aimed at the real guest, not the imagined one.",
      },
    },
    {
      name: { fr: "Marketing", en: "Marketing" },
      note: {
        fr: "Un rythme de contenu que l'équipe tient sans se battre.",
        en: "A content rhythm the team can hold without a fight.",
      },
    },
    { name: { fr: "Revenu", en: "Revenue" } },
    {
      name: { fr: "Achat média", en: "Media Buying" },
      note: {
        fr: "De la dépense dirigée vers ceux qui préparent déjà le voyage.",
        en: "Spend pointed at people already planning the trip.",
      },
    },
  ],

  transformation: {
    title: {
      fr: "D'une marque adressée au mauvais client à une marque que le bon client reconnaît.",
      en: "From a brand aimed at the wrong guest to one the right guest recognises.",
    },
    text: [
      {
        fr: "Lunja avait le lieu, l'esprit et l'audience.",
        en: "Lunja had the location, the spirit and the audience.",
      },
      {
        fr: "Et une marque qui décrivait un autre endroit.",
        en: "And a brand describing a different place.",
      },
      {
        fr: "Nous l'avons repositionnée autour de ceux qui arrivent vraiment.",
        en: "We repositioned it around who actually arrives.",
      },
      {
        fr: "Les réservations entrent maintenant en comprenant déjà le village.",
        en: "Bookings now come in already understanding the village.",
      },
    ],
  },

  identity: {
    title: { fr: "Un village, pas un resort", en: "A village, not a resort" },
    text: {
      fr: "Le logotype, la planche dont il est sorti, et les objets sur lesquels il vit.",
      en: "The wordmark, the board it came from, and the objects it lives on.",
    },
    shots: [
      {
        image: "/work/lunja-brand-board.png",
        alt: { fr: "Planche de marque Lunja", en: "Lunja brand board" },
        label: { fr: "Planche de marque", en: "Brand Board" },
      },
      {
        image: "/work/lunja-brand-tote.png",
        alt: { fr: "Tote bag Lunja Village", en: "Lunja Village tote bag" },
        label: { fr: "Application", en: "Application" },
      },
    ],
  },

  paletteStory: {
    title: { fr: "Le langage visuel", en: "The visual language" },
    lead: {
      fr: "La côte, pas le resort : une palette qui parle à qui arrive vraiment.",
      en: "The coast, not the resort: a palette that speaks to who actually arrives.",
    },
    colors: [
      {
        name: "Keppel",
        hex: "#2BBAA5",
        role: { fr: "Fondation", en: "Foundation" },
      },
      {
        name: "Celadon",
        hex: "#93D3AE",
        role: { fr: "Respiration", en: "Breath" },
      },
      {
        name: "Amber",
        hex: "#FFD100",
        role: { fr: "Accent", en: "Accent" },
      },
      {
        name: "Coral",
        hex: "#F96635",
        role: { fr: "Signal", en: "Signal" },
      },
      {
        name: "Vanilla",
        hex: "#FDF5D3",
        role: { fr: "Repos", en: "Rest" },
      },
    ],
    states: [
      {
        title: { fr: "L'eau, d'abord", en: "The water, first" },
        text: {
          fr: "Le keppel vient de l'Atlantique à cinq minutes. C'est la couleur que le lieu a déjà — la marque n'a eu qu'à cesser de la contredire.",
          en: "Keppel came from the Atlantic five minutes away. It is the colour the place already had; the brand only had to stop contradicting it.",
        },
        colorIndex: 0,
      },
      {
        title: { fr: "De la place pour respirer", en: "Space to breathe" },
        text: {
          fr: "Le céladon adoucit le keppel sans le diluer. Il rend possibles les grandes surfaces — un site, une façade, une page entière.",
          en: "Celadon softens keppel without diluting it. It makes the large areas possible: a site, a façade, a whole page.",
        },
        colorIndex: 1,
      },
      {
        title: { fr: "Le soleil, dosé", en: "Sun, measured" },
        text: {
          fr: "L'ambre est l'éclat du milieu de journée. Employé partout il deviendrait criard ; réservé aux appels à l'action, il fait exactement son travail.",
          en: "Amber is the middle of the day. Used everywhere it would shout; kept for the calls to action, it does precisely its job.",
        },
        colorIndex: 2,
      },
      {
        title: { fr: "Ce qui arrête l'œil", en: "What stops the eye" },
        text: {
          fr: "Le corail est le seul ton qui interrompt. Une date, une session de surf, une place restante : il ne sert qu'à ça.",
          en: "Coral is the only tone that interrupts. A date, a surf session, a last place left — that is all it is for.",
        },
        colorIndex: 3,
      },
      {
        title: { fr: "Un village, pas une brochure", en: "A village, not a brochure" },
        text: {
          fr: "La vanille laisse le reste exister. C'est elle qui fait que cinq couleurs cohabitent sans que rien ne ressemble à un dépliant touristique.",
          en: "Vanilla lets the rest exist. It is why five colours can live together without any of it looking like a tourist leaflet.",
        },
        colorIndex: 4,
      },
    ],
  },
  work: [
    {
      image: "/work/lunja-brand-mockup.png",
      alt: {
        fr: "L'identité Lunja en situation",
        en: "The Lunja identity in place",
      },
      label: { fr: "Application de marque", en: "Brand Application" },
    },
    {
      image: "/work/lunja-social-1.png",
      alt: { fr: "Publication sociale Lunja", en: "Lunja social post" },
      label: { fr: "Campagne", en: "Campaign" },
    },
    {
      image: "/work/lunja-social-3.png",
      alt: { fr: "Publication sociale Lunja", en: "Lunja social post" },
      label: { fr: "Campagne", en: "Campaign" },
    },
    {
      image: "/work/lunja-application.png",
      alt: {
        fr: "Supports imprimés Lunja Village",
        en: "Lunja Village printed material",
      },
      label: { fr: "Application de marque", en: "Brand Application" },
    },
  ],

  gallery: [
    {
      image: "/work/lunja-logo.png",
      alt: { fr: "Logo Lunja Village", en: "Lunja Village logo" },
    },
    {
      image: "/work/lunja-brand.png",
      alt: { fr: "Identité Lunja Village", en: "Lunja Village identity" },
    },
    {
      image: "/work/lunja-social-2.png",
      alt: { fr: "Publication sociale Lunja", en: "Lunja social post" },
    },
    {
      image: "/work/lunja-social-4.png",
      alt: { fr: "Publication sociale Lunja", en: "Lunja social post" },
    },
    {
      image: "/work/lunja-social-5.png",
      alt: { fr: "Publication sociale Lunja", en: "Lunja social post" },
    },
    {
      image: "/work/lunja-social-6.png",
      alt: { fr: "Publication sociale Lunja", en: "Lunja social post" },
    },
    {
      image: "/work/lunja-social-7.png",
      alt: { fr: "Publication sociale Lunja", en: "Lunja social post" },
    },
    {
      image: "/work/lunja-alt.png",
      alt: { fr: "Univers de marque Lunja Village", en: "The Lunja Village brand world" },
    },
  ],
  outcome: {
    title: {
      fr: "Une marque qui correspond enfin à qui pousse la porte.",
      en: "A brand that finally matches who walks through the door.",
    },
    text: {
      fr: "Un positionnement qui parle au vrai client, un rythme de contenu que l'équipe peut tenir, et des réservations qui arrivent en connaissant déjà le lieu.",
      en: "A position that speaks to the real guest, a content rhythm the team can sustain, and bookings that arrive already knowing the place.",
    },
    metric: "+38%",
  },
};
