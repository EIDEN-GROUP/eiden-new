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

  /** Mud #3D2C1E, out of the brand book. */
  ground: "#3D2C1E",

  hero: {
    statement: {
      fr: "Parler comme quelqu'un qui y vit déjà.",
      en: "Speak like someone who already lives there.",
    },
    intro: {
      fr: "Un village côtier dont la marque disait encore « resort » alors que ceux qui arrivaient étaient surfeurs, nomades et collectifs créatifs. Nous l'avons reconstruite pour le client qui vient vraiment.",
      en: "A coastal village whose brand still said “resort” while the people turning up were surfers, nomads and creative groups. We rebuilt it for the guest actually arriving.",
    },
    image: "/work/lunja-village/image lunja village portfoliio.png",
    alt: {
      fr: "La piscine de Lunja Village au coucher du soleil",
      en: "The Lunja Village pool at sunset",
    },
  },

  fracture: {
    reality: [
      { fr: "Une identité déjà en place.", en: "An identity already in place." },
      { fr: "Une vraie communauté.", en: "A real community." },
      {
        fr: "Une atmosphère reconnaissable.",
        en: "A recognisable atmosphere.",
      },
      {
        fr: "Une audience qui venait déjà.",
        en: "An audience already turning up.",
      },
    ],
    fracture: [
      { fr: "Un vocabulaire de « resort ».", en: "The language of a resort." },
      {
        fr: "Le mauvais client, adressé comme si c'était le bon.",
        en: "The wrong guest, addressed as if they were the right one.",
      },
      {
        fr: "Un positionnement décroché du lieu.",
        en: "A position disconnected from the place.",
      },
      {
        fr: "Une communication qui ne racontait pas le séjour réel.",
        en: "Communication that did not describe the actual stay.",
      },
    ],
    statement: {
      fr: "Le lieu savait qui il était. La marque, non.",
      en: "The place knew who it was. The brand did not.",
    },
  },

  architecture: {
    decision: {
      fr: "Aligner l'entreprise sur ceux qui arrivent vraiment.",
      en: "Align the business around the people who actually arrive.",
    },
    chain: [
      { fr: "Positionnement", en: "Positioning" },
      { fr: "Marque", en: "Brand" },
      { fr: "Contenu", en: "Content" },
      { fr: "Média", en: "Media" },
      { fr: "Commercial", en: "Commercial" },
    ],
    text: {
      fr: "Le positionnement a nommé l'audience réelle. La marque lui a donné un langage visuel qu'elle reconnaît. Le contenu a tenu le récit à un rythme que l'équipe peut réellement soutenir. Le média a dirigé le budget de la saison vers ceux qui préparent déjà le voyage. Et le commercial a transformé tout cela en réservations qui arrivent en comprenant déjà le village.",
      en: "Positioning named the real audience. The brand gave that audience a visual language it recognises. Content held the story at a pace the team can actually sustain. Media pointed the season's budget at people already planning the trip. And the commercial work turned all of it into bookings that arrive already understanding the village.",
    },
  },

  chapters: [
    {
      key: "rebranding",
      labels: [
        { fr: "Rebranding", en: "Rebranding" },
        { fr: "Positionnement", en: "Positioning" },
      ],
      tone: "forest",
      title: {
        fr: "Un village, pas un resort.",
        en: "A village, not a resort.",
      },
      text: {
        fr: "Le village disait « resort » à des surfeurs, des nomades et des collectifs créatifs ; le repositionnement n'a rien inventé, il a écrit ce que les gens racontaient déjà en repartant   Surf & Nomad Cottages. Le logotype, les cinq caractères du système et les objets sur lesquels ils vivent disent la même chose : une côte, du sel, du bois, et rien qui ressemble à une réception d'hôtel.",
        en: "The village was saying “resort” to surfers, nomads and creative collectives; the reposition invented nothing, it wrote down what people were already saying on the way out   Surf & Nomad Cottages. The wordmark, the five faces of the system and the objects they live on say the same thing: a coastline, salt, wood, and nothing that looks like a hotel reception.",
      },
      links: [
        {
          href: "https://www.lunjavillage.com",
          label: { fr: "Voir le site", en: "View the site" },
          kind: "site",
        },
      ],
      shots: [
        {
          image: "/work/lunja-village/lunja-brand-board.png",
          alt: { fr: "Planche de marque Lunja", en: "Lunja brand board" },
          label: { fr: "Planche de marque", en: "Brand board" },
        },
        {
          image: "/work/lunja-village/lunja-logo.png",
          alt: { fr: "Logo Lunja Village", en: "Lunja Village logo" },
          label: { fr: "Logo", en: "Logo" },
        },
        {
          image: "/work/lunja-village/lunja-brand-tote.png",
          alt: { fr: "Tote bag Lunja Village", en: "Lunja Village tote bag" },
          label: { fr: "Application", en: "Application" },
        },
        {
          image: "/work/lunja-village/lunja-brand-mockup.png",
          alt: {
            fr: "L'identité Lunja en situation",
            en: "The Lunja identity in place",
          },
          label: { fr: "Système", en: "System" },
        },
      ],
      palette: {
        title: { fr: "Le langage visuel", en: "The visual language" },
        lead: {
          fr: "Retro Beach : la côte, pas le resort, une palette qui parle à qui arrive vraiment.",
          en: "Retro Beach: the coast, not the resort   a palette that speaks to who actually arrives.",
        },
        colors: [
          {
            name: "Keppel",
            hex: "#2BBAA5",
            role: { fr: "Primaire", en: "Primary" },
          },
          {
            name: "Céladon",
            hex: "#93D3AE",
            role: { fr: "Secondaire", en: "Secondary" },
          },
          {
            name: "Jo&Joe Yellow",
            hex: "#FFD100",
            role: { fr: "Accent partenaire", en: "Partnership accent" },
          },
          { name: "Corail", hex: "#F96635", role: { fr: "Action", en: "Action" } },
          {
            name: "Crème Douce",
            hex: "#FDF5D3",
            role: { fr: "Fond", en: "Background" },
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
            title: { fr: "Le jaune du partenaire", en: "The partner's yellow" },
            text: {
              fr: "Ce jaune n'est pas un choix esthétique : c'est celui de Jo&Joe, la plateforme avec laquelle le village co-signe. Employé partout il deviendrait criard ; réservé aux appels à l'action, il fait exactement son travail.",
              en: "That yellow is not an aesthetic choice: it is Jo&Joe's, the platform the village co-signs with. Used everywhere it would shout; kept for the calls to action, it does precisely its job.",
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
            title: {
              fr: "Un village, pas une brochure",
              en: "A village, not a brochure",
            },
            text: {
              fr: "La crème douce laisse le reste exister. C'est elle qui fait que cinq couleurs cohabitent sans que rien ne ressemble à un dépliant touristique.",
              en: "Crème douce lets the rest exist. It is why five colours can live together without any of it looking like a tourist leaflet.",
            },
            colorIndex: 4,
          },
        ],
      },
    },
    {
      key: "marketing",
      labels: [{ fr: "Marketing", en: "Marketing" }],
      tone: "ink",
      title: {
        fr: "Un rythme de contenu que l'équipe tient sans se battre.",
        en: "A content rhythm the team can hold without a fight.",
      },
      text: {
        fr: "Rien qui demande une équipe de production : ce que le village a déjà sous la main, un matin, une session, une table longue. Le rythme a été calé sur ce que la maison peut réellement produire une semaine chargée.",
        en: "Nothing that needs a production crew: what the village already has to hand   a morning, a session, a long table. The rhythm was set against what the house can actually make in a busy week.",
      },
      shots: [
        {
          image: "/work/lunja-village/lunja-social-1.png",
          alt: { fr: "Publication sociale Lunja", en: "Lunja social post" },
          label: { fr: "Social", en: "Social" },
        },
        {
          image: "/work/lunja-village/lunja-social-2.png",
          alt: { fr: "Publication sociale Lunja", en: "Lunja social post" },
          label: { fr: "Social", en: "Social" },
        },
        {
          image: "/work/lunja-village/lunja-social-3.png",
          alt: { fr: "Publication sociale Lunja", en: "Lunja social post" },
          label: { fr: "Social", en: "Social" },
        },
        {
          image: "/work/lunja-village/lunja-social-4.png",
          alt: { fr: "Publication sociale Lunja", en: "Lunja social post" },
          label: { fr: "Social", en: "Social" },
        },
      ],
      blocks: [
        {
          key: "revenue",
          labels: [
            { fr: "Revenu", en: "Revenue" },
            { fr: "Achat média", en: "Media Buying" },
          ],
          title: {
            fr: "Une côte ne se remplit pas de la même façon en février et en août.",
            en: "A coastline does not fill the same way in February and in August.",
          },
          text: {
            fr: "L’offre, le calendrier et la dépense ont été réglés ensemble sur la saison plutôt que sur le mois, et le budget dirigé vers ceux qui préparent déjà le voyage : une date en tête, un billet en attente, une planche à transporter. Les réservations arrivent maintenant en connaissant déjà le lieu.",
            en: "The offer, the calendar and the spend were tuned together against the season rather than the month, and the budget pointed at people already planning the trip: a date in mind, a flight on hold, a board to carry. Bookings now arrive already knowing the place.",
          },
        },
      ],
    },
  ],

  impact: {
    title: {
      fr: "Les réservations arrivent en comprenant déjà le village.",
      en: "Bookings now arrive already understanding the village.",
    },
    text: {
      fr: "Une marque adressée au client qui vient vraiment, un rythme de contenu que la maison tient seule, et une dépense réglée sur la saison plutôt que sur le mois.",
      en: "A brand aimed at the guest who actually arrives, a content rhythm the house can hold on its own, and spend tuned to the season rather than to the month.",
    },
    metric: "+38%",
    rows: [
      {
        metric: "+38%",
        /* TODO(brand book): ce que le chiffre compte, et sur quelle période. */
        measures: null,
        period: null,
        meaning: {
          fr: "Des réservations qui arrivent en connaissant déjà le lieu.",
          en: "Bookings that arrive already knowing the place.",
        },
      },
    ],
  },

  work: [
    {
      image: "/work/lunja-village/Copie de imgg16.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de imggg3.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de imggg9.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de immgg13.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de immgg20.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de immgg24.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de immgg27.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de immgg28.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de immgg38.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de immgg39.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de immgg41.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de immgg42.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/img1 (3).png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/img1 (6).png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/img1 (13).png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/img12.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/img15.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
    {
      image: "/work/lunja-village/Copie de imgg8.png",
      alt: { fr: "Lunja Village", en: "Lunja Village" },
    },
  ],
};
