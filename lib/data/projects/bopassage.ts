import type { ProjectCase } from "./types";

export const bopassage: ProjectCase = {
  slug: "bopassage",
  client: "Bôpassage",
  year: "2024",
  category: { fr: "Cafés & restaurants", en: "Cafés & Restaurants" },
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
    image: "/work/bopassage/bopassage-hero.png",
    alt: {
      fr: "La salle de Bôpassage à Agadir",
      en: "The Bôpassage dining room in Agadir",
    },
  },

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

  chapters: [
    {
      key: "branding",
      labels: [{ fr: "Branding", en: "Branding" }],
      tone: "forest",
      title: {
        fr: "Forêt & Or, une identité tirée de la salle elle-même.",
        en: "Forêt & Or, an identity drawn from the room itself.",
      },
      text: {
        fr: "La chaleur botanique et la lumière dorée, fixées en système : un logotype manuscrit, trois couleurs, et des applications de la tasse à l'enseigne.",
        en: "Botanical warmth and golden-hour light, fixed into a system: a script wordmark, three colours, and applications from the cup to the sign.",
      },
      shots: [
        {
          image: "/work/bopassage/bopassage-brand-logo-green.png",
          alt: {
            fr: "Logotype principal et secondaire de Bôpassage",
            en: "Bôpassage primary and secondary wordmark",
          },
          label: { fr: "Logo", en: "Logo" },
        },
        {
          image: "/work/bopassage/bopassage-brand-cup.png",
          alt: {
            fr: "Tasse aux couleurs de Bôpassage",
            en: "Cup in the Bôpassage colours",
          },
          label: { fr: "Application", en: "Application" },
        },
        {
          image: "/work/bopassage/bopassage-brand-signage.png",
          alt: {
            fr: "Signalétique extérieure de Bôpassage",
            en: "Bôpassage exterior signage",
          },
          label: { fr: "Enseigne", en: "Signage" },
        },
        {
          image: "/work/bopassage/bopassage-brand-identity.png",
          alt: {
            fr: "Système d'identité Bôpassage",
            en: "Bôpassage identity system",
          },
          label: { fr: "Système", en: "System" },
        },
      ],
      palette: {
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
          { name: "Or", hex: "#b8973a", role: { fr: "Accent", en: "Accent" } },
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
    },
    {
      key: "website",
      labels: [{ fr: "Site web", en: "Website" }],
      tone: "ink",
      title: {
        fr: "La carte, l'adresse et la réservation à un pouce de distance.",
        en: "Menu, address and booking, a thumb away.",
      },
      text: {
        fr: "Les gens qui cherchent un restaurant posent deux questions : où, et quand. Le site répond aux deux avant tout le reste, et il est construit pour le téléphone parce que c'est là qu'on décide, debout, dix minutes avant de partir.",
        en: "People looking for a restaurant ask two questions: where, and when. The site answers both before anything else, and it is built for the phone because that is where the decision is made, standing up, ten minutes before leaving.",
      },
      links: [
        {
          href: "https://bopassage.com",
          label: { fr: "Voir le site", en: "View the site" },
          kind: "site",
        },
      ],
      shots: [
        {
          image: "/work/bopassage/bopassage-web-desktop.png",
          alt: {
            fr: "Page d'accueil du site Bôpassage",
            en: "The Bôpassage homepage",
          },
          label: { fr: "Desktop", en: "Desktop" },
        },
        {
          image: "/work/bopassage/bopassage-web-mobile.png",
          fit: "contain",
          alt: {
            fr: "Le site Bôpassage sur téléphone",
            en: "The Bôpassage site on a phone",
          },
          label: { fr: "Mobile", en: "Mobile" },
        },
      ],
    },
    {
      key: "marketing",
      labels: [{ fr: "Marketing", en: "Marketing" }],
      tone: "canvas",
      title: {
        fr: "Un rythme social que l'équipe peut tenir.",
        en: "A social rhythm the team can hold.",
      },
      text: {
        fr: "Pas une campagne de lancement, un rythme : des formats que la salle sait produire elle-même, un matin, un plat, une lumière. C'est ce qui fait qu'un compte est encore vivant six mois plus tard.",
        en: "Not a launch campaign, a rhythm: formats the room can produce on its own   a morning, a plate, a light. That is what makes an account still alive six months later.",
      },
      shots: [
        {
          image: "/work/bopassage/bopassage-social-matcha.png",
          alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
          label: { fr: "Social", en: "Social" },
        },
        {
          image: "/work/bopassage/bopassage-social-waffle.png",
          alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
          label: { fr: "Social", en: "Social" },
        },
        {
          image: "/work/bopassage/bopassage-social-good-morning.png",
          alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
          label: { fr: "Social", en: "Social" },
        },
        {
          image: "/work/bopassage/bopassage-social-instagram.png",
          alt: { fr: "Profil Instagram Bôpassage", en: "Bôpassage Instagram profile" },
          label: { fr: "Profil", en: "Profile" },
        },
      ],
      wall: [
        {
          image: "/work/bopassage/bopassage-brand-board.png",
          alt: { fr: "Planche de marque Bôpassage", en: "Bôpassage brand board" },
        },
        {
          image: "/work/bopassage/bopassage-brand-logo-green.png",
          alt: {
            fr: "Logo Bôpassage en or sur forêt",
            en: "Bôpassage logo in gold on forest",
          },
        },
        {
          image: "/work/bopassage/bopassage-brand-palette.png",
          alt: { fr: "Palette Bôpassage", en: "Bôpassage palette" },
        },
        {
          image: "/work/bopassage/bopassage-social-savory-morning.png",
          alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
        },
        {
          image: "/work/bopassage/bopassage-social-balance.png",
          alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
        },
        {
          image: "/work/bopassage/bopassage-social-slows-down.png",
          alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
        },
        {
          image: "/work/bopassage/bopassage-brand-logo-mark.png",
          alt: { fr: "Le monogramme Bôpassage", en: "The Bôpassage monogram" },
        },
        {
          image: "/work/bopassage/bopassage-web.png",
          alt: { fr: "Le site Bôpassage", en: "The Bôpassage site" },
        },
      ],
    },
    {
      key: "revenue",
      labels: [
        { fr: "Revenu", en: "Revenue" },
        { fr: "Média payant", en: "Paid Media" },
      ],
      tone: "forest",
      title: {
        fr: "Une seule mesure : les couverts.",
        en: "One measure: covers.",
      },
      text: {
        fr: "Google Ads sur l’intention plutôt que sur l’audience, de l’affichage là où le quartier passe, et le tout réglé chaque mois sur ce que la salle a réellement servi. La découverte se transforme en réservation, et le rythme payant continue de tourner entre deux visites.",
        en: "Google Ads on intent rather than on audience, out-of-home where the neighbourhood actually walks, and all of it retuned every month against what the room actually served. Discovery turns into reservations, and the paid rhythm keeps working between visits.",
      },
      shots: [
        {
          image: "/work/bopassage/bopassage-application.png",
          alt: {
            fr: "Affichage extérieur Bôpassage",
            en: "Bôpassage out-of-home poster",
          },
          label: { fr: "Affichage", en: "Out of home" },
        },
      ],
      metric: "×3",
    },
  ],
};
