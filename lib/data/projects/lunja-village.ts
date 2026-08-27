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
    image: "/work/lunja-village/Copie de imgg5.png",
    alt: {
      fr: "La piscine de Lunja Village au coucher du soleil",
      en: "The Lunja Village pool at sunset",
    },
  },

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

  chapters: [
    {
      key: "rebranding",
      labels: [{ fr: "Rebranding", en: "Rebranding" }],
      tone: "forest",
      title: {
        fr: "Un village, pas un resort.",
        en: "A village, not a resort.",
      },
      text: {
        fr: "Le logotype, la planche dont il est sorti, et les objets sur lesquels il vit. Une identité qui correspond enfin à qui pousse la porte : une côte, du sel, du bois, et rien qui ressemble à une réception d'hôtel.",
        en: "The wordmark, the board it came from, and the objects it lives on. An identity that finally matches who walks through the door: a coastline, salt, wood, and nothing that looks like a hotel reception.",
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
          { name: "Amber", hex: "#FFD100", role: { fr: "Accent", en: "Accent" } },
          { name: "Coral", hex: "#F96635", role: { fr: "Signal", en: "Signal" } },
          { name: "Vanilla", hex: "#FDF5D3", role: { fr: "Repos", en: "Rest" } },
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
            title: {
              fr: "Un village, pas une brochure",
              en: "A village, not a brochure",
            },
            text: {
              fr: "La vanille laisse le reste exister. C'est elle qui fait que cinq couleurs cohabitent sans que rien ne ressemble à un dépliant touristique.",
              en: "Vanilla lets the rest exist. It is why five colours can live together without any of it looking like a tourist leaflet.",
            },
            colorIndex: 4,
          },
        ],
      },
    },
    {
      key: "positioning",
      labels: [{ fr: "Positionnement", en: "Positioning" }],
      tone: "canvas",
      title: {
        fr: "Adressé au vrai client, pas à celui qu'on imaginait.",
        en: "Aimed at the real guest, not the imagined one.",
      },
      text: {
        fr: "Le village disait « resort » à des surfeurs, des nomades et des collectifs créatifs. Le repositionnement n'a rien inventé : il a écrit ce que les gens qui arrivaient racontaient déjà en repartant.",
        en: "The village was saying “resort” to surfers, nomads and creative collectives. The reposition invented nothing: it wrote down what the people who did turn up were already saying on the way out.",
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
      wall: [
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
    },
    {
      key: "revenue",
      labels: [
        { fr: "Revenu", en: "Revenue" },
        { fr: "Achat média", en: "Media Buying" },
      ],
      tone: "forest",
      title: {
        fr: "Une côte ne se remplit pas de la même façon en février et en août.",
        en: "A coastline does not fill the same way in February and in August.",
      },
      text: {
        fr: "L’offre, le calendrier et la dépense ont été réglés ensemble sur la saison plutôt que sur le mois, et le budget dirigé vers ceux qui préparent déjà le voyage : une date en tête, un billet en attente, une planche à transporter. Les réservations arrivent maintenant en connaissant déjà le lieu.",
        en: "The offer, the calendar and the spend were tuned together against the season rather than the month, and the budget pointed at people already planning the trip: a date in mind, a flight on hold, a board to carry. Bookings now arrive already knowing the place.",
      },
      metric: "+38%",
    },
  ],
};
