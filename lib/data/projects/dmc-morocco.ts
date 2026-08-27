import type { ProjectCase } from "./types";

export const dmcMorocco: ProjectCase = {
  slug: "dmc-morocco",
  client: "DMC Hospitality Morocco",
  year: "2024",
  category: { fr: "Hôtellerie", en: "Hospitality" },
  location: { fr: "Maroc", en: "Morocco" },

  hero: {
    statement: {
      fr: "Trente ans d'expertise, enfin dotés d'un nom.",
      en: "Thirty years of expertise, finally given a name.",
    },
    intro: {
      fr: "Un opérateur hôtelier dont la réputation ne circulait que de bouche à oreille. Nous avons commencé à la page blanche : le nom, puis tout ce qui en découle.",
      en: "A hotel operator whose reputation travelled entirely by word of mouth. We started at the blank page: the name, then everything that follows from it.",
    },
    image: "/work/dmc-morocco/dmc-hero.png",
    alt: {
      fr: "Univers de marque DMC Hospitality Morocco",
      en: "The DMC Hospitality Morocco brand world",
    },
  },

  transformation: {
    title: {
      fr: "D'une réputation qu'il fallait déjà connaître, à une marque qui se présente elle-même.",
      en: "From a reputation you had to already know about, to a brand that introduces itself.",
    },
    text: [
      {
        fr: "Trois décennies de gestion hôtelière, sans marque, sans site et sans voix.",
        en: "Three decades of hospitality management, with no brand, no site and no voice.",
      },
      {
        fr: "L'expertise ne circulait que de bouche à oreille.",
        en: "The expertise only ever travelled by word of mouth.",
      },
      {
        fr: "Nous avons construit le nom et le visage qu'elle avait déjà mérités.",
        en: "We built the name and the face it had already earned.",
      },
      {
        fr: "Et pointé les deux vers ceux qui l'achètent.",
        en: "And pointed both at the people who buy it.",
      },
    ],
  },

  chapters: [
    {
      key: "brand-creation",
      labels: [{ fr: "Création de marque", en: "Brand Creation" }],
      tone: "forest",
      title: {
        fr: "Le nom, l'identité et les règles qui vont avec, à partir de rien.",
        en: "Name, identity and the rules that go with them, from nothing.",
      },
      text: {
        fr: "Monogramme, système typographique et livre de règles   puis reportés sur les objets que la société met réellement entre les mains des gens : une carte, une tenue, un dossier.",
        en: "Monogram, typographic system and a guidelines book   then carried onto the things the company actually hands people: a card, a uniform, a dossier.",
      },
      shots: [
        {
          image: "/work/dmc-morocco/dmc-brand-logo.png",
          alt: { fr: "Monogramme DMC", en: "DMC monogram" },
          label: { fr: "Monogramme", en: "Monogram" },
        },
        {
          image: "/work/dmc-morocco/dmc-brand-logo-mark.png",
          alt: {
            fr: "Logo DMC Hospitality Morocco",
            en: "DMC Hospitality Morocco logo",
          },
          label: { fr: "Logo", en: "Logo" },
        },
        {
          image: "/work/dmc-morocco/dmc-guidelines.png",
          alt: {
            fr: "Charte graphique DMC Hospitality Morocco",
            en: "DMC Hospitality Morocco brand guidelines",
          },
          label: { fr: "Charte", en: "Guidelines" },
        },
        {
          image: "/work/dmc-morocco/dmc-brand-uniform.png",
          alt: {
            fr: "Tenue aux couleurs de DMC",
            en: "Uniform in the DMC identity",
          },
          label: { fr: "Application", en: "Application" },
        },
      ],
      palette: {
        title: { fr: "Le langage visuel", en: "The visual language" },
        lead: {
          fr: "Une marque adressée à des opérateurs : elle doit être crue avant d'être aimée.",
          en: "A brand addressed to operators: it has to be believed before it is liked.",
        },
        colors: [
          {
            name: "Forest",
            hex: "#3D4F44",
            role: { fr: "Fondation", en: "Foundation" },
          },
          {
            name: "Gold",
            hex: "#D4B896",
            role: { fr: "Signature", en: "Signature" },
          },
          {
            name: "Sand",
            hex: "#F2E8D8",
            role: { fr: "Contraste", en: "Contrast" },
          },
          { name: "Ink", hex: "#1A1F1C", role: { fr: "Ancrage", en: "Anchor" } },
        ],
        states: [
          {
            title: { fr: "L'assise", en: "The footing" },
            text: {
              fr: "Un vert sourd, sans éclat. C'est la couleur d'une maison qui gère des hôtels depuis trente ans et n'a pas besoin d'en faire la démonstration.",
              en: "A muted green with no shine to it. It is the colour of a business that has run hotels for thirty years and does not need to perform the fact.",
            },
            colorIndex: 0,
          },
          {
            title: { fr: "Trente ans, sans le dire", en: "Thirty years, unsaid" },
            text: {
              fr: "L'or n'est pas décoratif ici. Il signale l'expérience à un public qui achète précisément ça — et il reste rare, sinon il ne signale plus rien.",
              en: "The gold is not decoration. It signals experience to an audience buying exactly that, and it stays rare, because a signal used everywhere stops signalling.",
            },
            colorIndex: 1,
          },
          {
            title: { fr: "Le repos de l'œil", en: "Where the eye rests" },
            text: {
              fr: "Le sable tient les documents longs : dossiers, présentations, propositions. Un B2B se lit assis, et il faut que ça reste lisible page après page.",
              en: "Sand carries the long documents — decks, proposals, dossiers. B2B gets read sitting down, and it has to stay readable page after page.",
            },
            colorIndex: 2,
          },
          {
            title: { fr: "Ce qui se lit", en: "What gets read" },
            text: {
              fr: "L'encre garde la lisibilité là où le vert ne suffit pas. Elle n'est jamais la marque : elle est ce qui permet de la lire.",
              en: "Ink holds legibility where the green cannot. It is never the brand itself — it is what lets the brand be read.",
            },
            colorIndex: 3,
          },
          {
            title: {
              fr: "Une maison qui se présente",
              en: "A business that introduces itself",
            },
            text: {
              fr: "Ensemble, ces quatre tons donnent à une expertise longtemps invisible un visage qu'un directeur d'hôtel reconnaît en trois secondes.",
              en: "Together the four give a long-invisible expertise a face a hotel director recognises in three seconds.",
            },
            colorIndex: 1,
          },
        ],
      },
    },
    {
      key: "website",
      labels: [{ fr: "Site web", en: "Website" }],
      tone: "ink",
      title: {
        fr: "Écrit pour des opérateurs et des propriétaires, pas pour des voyageurs.",
        en: "Written for operators and owners, not for guests.",
      },
      text: {
        fr: "Un site d'hôtellerie qui ne montre pas de chambres. Celui qui le lit possède déjà le bâtiment : ce qu'il cherche, c'est ce que trente ans de gestion changent à son compte d'exploitation.",
        en: "A hospitality site that shows no bedrooms. Whoever is reading it already owns the building: what they are looking for is what thirty years of management does to their operating account.",
      },
      links: [
        {
          href: "https://dmchm.com",
          label: { fr: "Voir le site", en: "View the site" },
          kind: "site",
        },
      ],
      shots: [
        {
          image: "/work/dmc-morocco/dmc-web-desktop.png",
          alt: { fr: "Le site DMC sur écran", en: "The DMC site on desktop" },
          label: { fr: "Desktop", en: "Desktop" },
        },
        {
          image: "/work/dmc-morocco/dmc-web-mobile.png",
          fit: "contain",
          alt: { fr: "Le site DMC sur téléphone", en: "The DMC site on a phone" },
          label: { fr: "Mobile", en: "Mobile" },
        },
      ],
    },
    {
      key: "positioning",
      labels: [{ fr: "Positionnement", en: "Positioning" }],
      tone: "canvas",
      title: {
        fr: "Trente ans de métier, énoncés simplement.",
        en: "Thirty years of know-how, stated plainly.",
      },
      text: {
        fr: "Le plus dur n'était pas de trouver quoi dire, mais d'accepter d'en dire moins. Une phrase sur ce que la maison fait, une sur pour qui, une sur ce qui change   et rien qu'un concurrent puisse recopier sans mentir.",
        en: "The hard part was not finding something to say but agreeing to say less. One line on what the business does, one on who for, one on what changes   and nothing a competitor could copy without lying.",
      },
    },
    {
      key: "content",
      labels: [{ fr: "Contenu", en: "Content" }],
      tone: "ink",
      title: {
        fr: "Une voix LinkedIn que le marché reconnaît.",
        en: "A LinkedIn voice the market recognises.",
      },
      text: {
        fr: "Le public tient dans quelques centaines de personnes, et elles se connaissent toutes. La publication est donc écrite comme on parle à un pair : un sujet du métier, une position tenue, et aucune promesse que la maison ne tient pas déjà.",
        en: "The audience is a few hundred people and they all know each other. So the posting is written the way you talk to a peer: one subject from the trade, one position held, and no promise the business is not already keeping.",
      },
      shots: [
        {
          image: "/work/dmc-morocco/dmc-social-excellence.png",
          alt: { fr: "Publication sociale DMC", en: "DMC social post" },
          label: { fr: "Social", en: "Social" },
        },
        {
          image: "/work/dmc-morocco/dmc-social-c.png",
          alt: { fr: "Publication sociale DMC", en: "DMC social post" },
          label: { fr: "Social", en: "Social" },
        },
        {
          image: "/work/dmc-morocco/dmc-social-d.png",
          alt: { fr: "Publication sociale DMC", en: "DMC social post" },
          label: { fr: "Social", en: "Social" },
        },
        {
          image: "/work/dmc-morocco/dmc-social-m.png",
          alt: { fr: "Publication sociale DMC", en: "DMC social post" },
          label: { fr: "Social", en: "Social" },
        },
      ],
      wall: [
        {
          image: "/work/dmc-morocco/dmc-brand-card.png",
          alt: { fr: "Carte de visite DMC", en: "DMC business card" },
        },
        {
          image: "/work/dmc-morocco/dmc-guidelines-hero.png",
          alt: { fr: "Charte graphique DMC", en: "DMC brand guidelines" },
        },
        {
          image: "/work/dmc-morocco/dmc-brand-posters.png",
          alt: { fr: "Affiches DMC", en: "DMC posters" },
        },
        {
          image: "/work/dmc-morocco/dmc-hero-2.png",
          alt: { fr: "Univers de marque DMC", en: "The DMC brand world" },
        },
        {
          image: "/work/dmc-morocco/dmc-portfolio-image.png",
          alt: { fr: "Supports DMC", en: "DMC collateral" },
        },
        {
          image: "/work/dmc-morocco/dmc-cover.png",
          alt: { fr: "DMC Hospitality Morocco", en: "DMC Hospitality Morocco" },
        },
        {
          image: "/work/dmc-morocco/dmc-alt.png",
          alt: { fr: "Affiches de marque DMC", en: "DMC brand posters" },
        },
        {
          image: "/work/dmc-morocco/dmc.png",
          alt: { fr: "DMC Hospitality Morocco", en: "DMC Hospitality Morocco" },
        },
      ],
    },
    {
      key: "lead-generation",
      labels: [{ fr: "Génération de leads", en: "Lead Generation" }],
      tone: "forest",
      title: {
        fr: "Les premières conversations qui arrivent d'elles-mêmes.",
        en: "The first conversations arriving inbound at last.",
      },
      text: {
        fr: "Trente ans durant, chaque contrat avait commencé par un appel passé par la maison. Le site et la voix ont été réglés pour inverser ce sens-là, et la première fois qu’un propriétaire a écrit le premier, la marque avait fait son travail : d’aucun contact entrant à une présence qui en amène.",
        en: "For thirty years every contract had started with a call the business made. The site and the voice were tuned to reverse that direction, and the first time an owner wrote first the brand had done its job: from no inbound at all to a presence that brings it.",
      },
      metric: "0 → 1",
    },
  ],
};
