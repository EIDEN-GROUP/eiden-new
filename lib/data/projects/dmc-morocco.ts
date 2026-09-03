import type { ProjectCase } from "./types";

export const dmcMorocco: ProjectCase = {
  slug: "dmc-morocco",
  client: "DMC Hospitality Morocco",
  year: "2024",
  category: { fr: "Hôtellerie", en: "Hospitality" },
  location: { fr: "Maroc", en: "Morocco" },

  /** Forêt Profonde #2C3830, out of the brand book. */
  ground: "#2C3830",

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

  fracture: {
    reality: [
      {
        fr: "Trois décennies de gestion hôtelière.",
        en: "Three decades of hospitality management.",
      },
      {
        fr: "Une réputation solide à l'intérieur du métier.",
        en: "A solid reputation inside the trade.",
      },
      {
        fr: "Un marché de quelques centaines de personnes, qui se connaissent toutes.",
        en: "A market of a few hundred people who all know each other.",
      },
    ],
    fracture: [
      {
        fr: "Pas de marque, pas de site, pas de voix.",
        en: "No brand, no site, no voice.",
      },
      {
        fr: "Une expertise qui ne circulait que de bouche à oreille.",
        en: "Expertise that only ever travelled by word of mouth.",
      },
      {
        fr: "Chaque contrat commencé par un appel passé par la maison.",
        en: "Every contract started by a call the business made.",
      },
    ],
    statement: {
      fr: "Le métier était là depuis trente ans. Rien ne le disait.",
      en: "The know-how had been there for thirty years. Nothing said so.",
    },
  },

  architecture: {
    decision: {
      fr: "Construire le nom et le visage que l'expertise avait déjà mérités.",
      en: "Build the name and the face the expertise had already earned.",
    },
    chain: [
      { fr: "Positionnement", en: "Positioning" },
      { fr: "Marque", en: "Brand" },
      { fr: "Site web", en: "Website" },
      { fr: "Contenu", en: "Content" },
    ],
    text: {
      fr: "Le positionnement a réduit trente ans de métier à ce qu'un concurrent ne peut pas recopier sans mentir. La marque   nom, monogramme, règles   lui a donné un visage. Le site a été écrit pour des propriétaires plutôt que pour des voyageurs. Et la voix LinkedIn tient cette position devant un public de pairs, jusqu'à ce que ce soit le propriétaire qui écrive le premier.",
      en: "Positioning reduced thirty years of trade to what a competitor could not copy without lying. The brand   name, monogram, rules   gave it a face. The site was written for owners rather than for guests. And the LinkedIn voice holds that position in front of a room of peers, until it is the owner who writes first.",
    },
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
        fr: "Monogramme, système typographique et livre de règles   puis reportés sur les objets que la société met réellement entre les mains des gens : une carte, une tenue, un dossier. Playfair pour le nom, Cormorant pour ce qui se cite, Source Sans pour ce qui se lit longtemps : une maison qui a travaillé pour Hyatt, ACCOR et One&Only devait se présenter au même niveau.",
        en: "Monogram, typographic system and a guidelines book   then carried onto the things the company actually hands people: a card, a uniform, a dossier. Playfair for the name, Cormorant for what gets quoted, Source Sans for what gets read at length: a business that has worked for Hyatt, ACCOR and One&Only had to introduce itself at the same level.",
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
      blocks: [
        {
          key: "positioning",
          labels: [{ fr: "Positionnement", en: "Positioning" }],
          title: {
            fr: "Trente ans de métier, énoncés simplement.",
            en: "Thirty years of know-how, stated plainly.",
          },
          text: {
            fr: "Le plus dur n'était pas de trouver quoi dire, mais d'accepter d'en dire moins. Une phrase sur ce que la maison fait, une sur pour qui, une sur ce qui change   et rien qu'un concurrent puisse recopier sans mentir.",
            en: "The hard part was not finding something to say but agreeing to say less. One line on what the business does, one on who for, one on what changes   and nothing a competitor could copy without lying.",
          },
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
            name: "Forêt",
            hex: "#3D4F44",
            role: { fr: "Fondation", en: "Foundation" },
          },
          {
            name: "Or",
            hex: "#D4B896",
            role: { fr: "Signature", en: "Signature" },
          },
          {
            name: "Sable Doré",
            hex: "#E8D5B5",
            role: { fr: "Fond clair", en: "Light ground" },
          },
          {
            name: "Encre",
            hex: "#1A1F1C",
            role: { fr: "Ancrage", en: "Anchor" },
          },
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
              fr: "L'or n'est pas décoratif ici. Il signale l'expérience à un public qui achète précisément ça   et il reste rare, sinon il ne signale plus rien.",
              en: "The gold is not decoration. It signals experience to an audience buying exactly that, and it stays rare, because a signal used everywhere stops signalling.",
            },
            colorIndex: 1,
          },
          {
            title: { fr: "Le repos de l'œil", en: "Where the eye rests" },
            text: {
              fr: "Le sable tient les documents longs : dossiers, présentations, propositions. Un B2B se lit assis, et il faut que ça reste lisible page après page.",
              en: "Sand carries the long documents   decks, proposals, dossiers. B2B gets read sitting down, and it has to stay readable page after page.",
            },
            colorIndex: 2,
          },
          {
            title: { fr: "Ce qui se lit", en: "What gets read" },
            text: {
              fr: "L'encre garde la lisibilité là où le vert ne suffit pas. Elle n'est jamais la marque : elle est ce qui permet de la lire.",
              en: "Ink holds legibility where the green cannot. It is never the brand itself   it is what lets the brand be read.",
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
      key: "content",
      labels: [{ fr: "Contenu", en: "Content" }],
      tone: "canvas",
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
    },
  ],

  impact: {
    title: {
      fr: "Le premier propriétaire qui écrit le premier.",
      en: "The first owner who writes first.",
    },
    text: {
      fr: "Une marque qui se présente elle-même, un site adressé à ceux qui achètent la gestion, et une voix que le marché reconnaît.",
      en: "A brand that introduces itself, a site addressed to the people who buy management, and a voice the market recognises.",
    },
    metric: "0 → 1",
    rows: [
      {
        metric: "0 → 1",
        measures: { fr: "Contacts entrants", en: "Inbound enquiries" },
        /* TODO(brand book): la période, et le volume atteint depuis. */
        period: null,
        meaning: {
          fr: "D'aucun contact entrant à une présence qui en amène.",
          en: "From no inbound at all to a presence that brings it.",
        },
      },
    ],
  },

  work: [
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
};
