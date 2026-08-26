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
      image: "/work/lunja-brand-logo-site.png",
      alt: { fr: "Le site Lunja Village", en: "The Lunja Village site" },
      label: { fr: "Site web", en: "Website" },
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
