import type { ProjectSlug } from "@/lib/data/site";

export type { Localized } from "@/lib/data/localized";
import type { Localized } from "@/lib/data/localized";

export type WorkBlock =
  | { kind: "full"; image: string; alt: Localized; caption?: Localized }
  | { kind: "pair"; items: WorkImage[] }
  | { kind: "trio"; items: WorkImage[] }
  | {
      kind: "note";
      image: string;
      alt: Localized;
      title: Localized;
      text: Localized;
      /** Which side the writing sits on above `lg`. Defaults to the right. */
      side?: "left" | "right";
    };

export type WorkImage = {
  image: string;
  alt: Localized;
  caption?: Localized;
};

export type Metric = { value: string; label: Localized };

/* ------------------------------------------------------------------
   The long form

   Some records carry the project as a story rather than as a case:
   the room before, the look of the thing, the identity underneath it,
   the site it produced, and what the client says now. A record with a
   `story` is laid out that way; one without keeps the short template,
   so the two can live side by side while records are rewritten.
   ------------------------------------------------------------------ */

/** One colour of a brand palette, named and specified. */
export type Swatch = { name: Localized; hex: string };

export type StoryImage = { image: string; alt: Localized; caption?: Localized };

/** An identity shown in place   a sign, a cup, a screen. */
export type Application = StoryImage & { label: Localized };

export type ProjectStory = {
  /** One line under the masthead saying what the work was. */
  summary: Localized;
  /** The room as it stood before any of it. */
  before: Localized;
  visual: { title: Localized; text: Localized; slides: StoryImage[] };
  /** The single line that carries the whole engagement. */
  positioning: Localized;
  brand: {
    title: Localized;
    text: Localized;
    palette: Swatch[];
    /** The wordmark, the line it carries, and the descriptor under it. */
    type: { wordmark: string; line: Localized; descriptor: Localized };
    book?: { label: Localized; href: string };
    applicationsTitle: Localized;
    applications: Application[];
  };
  website: {
    title: Localized;
    text: Localized;
    desktop: string;
    mobile: string;
    alt: Localized;
    href?: string;
  };
  social: { title: Localized; items: StoryImage[] };
  /** What the client says now that it is running. */
  after: Localized;
};

export type ProjectPage = {
  slug: ProjectSlug;
  number: string;
  client: string;
  year: string;
  sector: Localized;
  services: Localized[];
  title: Localized;
  hero: { image: string; alt: Localized };

  challenge: { text: Localized; points: Localized[] };

  idea: {
    statement: Localized;
    text: Localized;
    image: string;
    alt: Localized;
  };

  built: { title: Localized; text: Localized }[];

  work: WorkBlock[];

  result: {
    statement: Localized;
    metrics?: Metric[];
    changes?: Localized[];
  };

  info: { location: Localized };

  /** Present only on records written as a story; see `ProjectStory`. */
  story?: ProjectStory;
};

export const projectPages: ProjectPage[] = [
  {
    slug: "bopassage",
    number: "01",
    client: "Bôpassage",
    year: "2024",
    sector: { fr: "Cafés & restaurants", en: "Hospitality" },
    services: [
      { fr: "Image de marque", en: "Branding" },
      { fr: "Site web", en: "Website" },
      { fr: "Marketing", en: "Marketing" },
    ],
    title: {
      fr: "Une nouvelle identité digitale pour un lieu fait pour la table, les gens et les bons moments.",
      en: "A new digital identity for a place made for food, people and good moments.",
    },
    hero: {
      image: "/work/bopassage/bopassage-hero.png",
      alt: {
        fr: "La salle de Bôpassage à Agadir",
        en: "The Bôpassage dining room in Agadir",
      },
    },

    challenge: {
      text: {
        fr: "Bôpassage avait la salle, la cuisine et les habitués. Ce qui manquait : un site, un rythme social régulier, et de quoi porter le lieu au-delà de ses murs. L'ambiance s'arrêtait à la porte.",
        en: "Bôpassage had the room, the food and the regulars. What it did not have was a website, a steady social rhythm, or anything carrying the place past its own four walls. The atmosphere stopped at the door.",
      },
      points: [
        { fr: "Aucun site web", en: "No website" },
        { fr: "Pas de système de marque", en: "No clear brand system" },
        { fr: "Peu de visibilité en ligne", en: "Low online visibility" },
      ],
    },

    idea: {
      statement: {
        fr: "Faire de l'ambiance de Bôpassage un lieu qu'on peut visiter en ligne.",
        en: "Turn the atmosphere of Bôpassage into something you can visit online.",
      },
      text: {
        fr: "La salle fonctionnait déjà. Nous avons pris ce qu'on y ressent la chaleur, les plantes, la lumière de fin de journée et construit la marque et le site à partir de là, plutôt qu'à partir d'une carte.",
        en: "The room already worked. So we took what it feels like the warmth, the plants, the late golden light and built the brand and the site out of that, instead of starting from a menu.",
      },
      image: "/work/bopassage/bopassage-brand-board.png",
      alt: {
        fr: "Planche de marque Bôpassage : couleurs, typographies et logo",
        en: "Bôpassage brand board: colours, type and logo",
      },
    },

    built: [
      {
        title: { fr: "Marque", en: "Brand" },
        text: {
          fr: "Une identité complète logo, couleurs, typographie, signalétique tirée de la salle elle-même.",
          en: "A full identity logo, colours, type and signage drawn from the room itself.",
        },
      },
      {
        title: { fr: "Digital", en: "Digital" },
        text: {
          fr: "Un site construit autour d'une seule chose : trouver le lieu et réserver une table sans réfléchir.",
          en: "A site built around one thing: making it easy to find the place and book a table.",
        },
      },
      {
        title: { fr: "Marketing", en: "Marketing" },
        text: {
          fr: "Un rythme social régulier et des campagnes Google Ads dirigées vers ceux qui cherchent déjà où manger à côté.",
          en: "A steady social rhythm, and Google Ads pointed at people already looking for somewhere to eat nearby.",
        },
      },
    ],

    work: [
      {
        kind: "full",
        image: "/work/bopassage/bopassage-web-desktop.png",
        alt: {
          fr: "Page d'accueil du site Bôpassage",
          en: "The Bôpassage homepage",
        },
        caption: { fr: "Page d'accueil", en: "Homepage" },
      },
      {
        kind: "pair",
        items: [
          {
            image: "/work/bopassage/bopassage-brand-logo-mark.png",
            alt: { fr: "Monogramme Bôpassage", en: "Bôpassage monogram" },
            caption: { fr: "Le monogramme", en: "The monogram" },
          },
          {
            image: "/work/bopassage/bopassage-brand-palette.png",
            alt: {
              fr: "Palette de couleurs Bôpassage",
              en: "Bôpassage colour palette",
            },
            caption: { fr: "Forêt & or", en: "Forest & gold" },
          },
        ],
      },
      {
        kind: "full",
        image: "/work/bopassage/bopassage-brand-signage.png",
        alt: {
          fr: "Signalétique extérieure de Bôpassage",
          en: "Bôpassage exterior signage",
        },
        caption: { fr: "Identité du lieu", en: "Interior identity" },
      },
      {
        kind: "note",
        image: "/work/bopassage/bopassage-web-mobile.png",
        alt: {
          fr: "Le site Bôpassage sur téléphone",
          en: "The Bôpassage site on a phone",
        },
        title: { fr: "Sur téléphone", en: "Mobile experience" },
        text: {
          fr: "La plupart des visites arrivent d'une recherche sur téléphone, à l'heure du déjeuner. Le menu, l'adresse et la réservation sont à un pouce.",
          en: "Most visits come from a phone search around lunchtime. The menu, the address and the booking are all a thumb away.",
        },
      },
      {
        kind: "trio",
        items: [
          {
            image: "/work/bopassage/bopassage-social-matcha.png",
            alt: {
              fr: "Publication sociale Bôpassage",
              en: "Bôpassage social post",
            },
          },
          {
            image: "/work/bopassage/bopassage-social-waffle.png",
            alt: {
              fr: "Publication sociale Bôpassage",
              en: "Bôpassage social post",
            },
          },
          {
            image: "/work/bopassage/bopassage-social-good-morning.png",
            alt: {
              fr: "Publication sociale Bôpassage",
              en: "Bôpassage social post",
            },
          },
        ],
      },
      {
        kind: "full",
        image: "/work/bopassage/bopassage-ooh-column.png",
        alt: {
          fr: "Affichage extérieur Bôpassage",
          en: "Bôpassage out-of-home poster",
        },
        caption: { fr: "Affichage", en: "Out of home" },
      },
    ],

    result: {
      statement: {
        fr: "Un lieu qui se lit de la même façon sur un écran et à table.",
        en: "A place that reads the same on a screen as it does at the table.",
      },
      changes: [
        {
          fr: "Une marque plus claire, appliquée partout de la tasse à la signalétique.",
          en: "A clearer brand, applied everywhere from the cup to the signage.",
        },
        {
          fr: "Un site qui répond aux deux vraies questions : où, et quand.",
          en: "A site that answers the two questions people actually have: where, and when.",
        },
        {
          fr: "Un rythme social et payant qui continue de tourner entre deux visites.",
          en: "A social and paid rhythm that keeps running between visits.",
        },
      ],
    },

    info: { location: { fr: "Agadir, Maroc", en: "Agadir, Morocco" } },

    story: {
      summary: {
        fr: "Un café-restaurant de Founty reconstruit en ligne : site, voix et média payant pensés pour transformer la découverte en réservation.",
        en: "A Founty café-restaurant rebuilt online: website, voice, and paid media engineered to turn discovery into reservations.",
      },

      before: {
        fr: "Bôpassage avait la salle, les assiettes et les habitués   mais pas de site, pas de rythme social régulier, et aucun relais payant pour porter la marque au-delà de ses quatre murs. L'ambiance s'arrêtait à la porte.",
        en: "Bôpassage had the room, the plates, and the loyalty   but no website, no consistent social rhythm, and no paid layer carrying the brand outside its four walls. The atmosphere stopped at the door.",
      },

      visual: {
        title: {
          fr: "Le lieu où l'on revient toujours.",
          en: "The place you always come back to.",
        },
        text: {
          fr: "Chaleur botanique, lumière dorée de fin de journée, un registre éditorial : ce que l'on ressent dans la salle, traduit en images.",
          en: "Botanical warmth, golden-hour light, an editorial register: what the room feels like, translated into pictures.",
        },
        slides: [
          {
            image: "/work/bopassage/bopassage-brand-board.png",
            alt: { fr: "Planche de marque Bôpassage", en: "Bôpassage brand board" },
            caption: { fr: "Planche de marque", en: "Brand board" },
          },
          {
            image: "/work/bopassage/bopassage-brand-palette.png",
            alt: { fr: "Palette Forêt & Or", en: "Forest & gold palette" },
            caption: { fr: "Forêt & or", en: "Forest & gold" },
          },
          {
            image: "/work/bopassage/bopassage-brand-logo-mark.png",
            alt: { fr: "Monogramme Bôpassage", en: "Bôpassage monogram" },
            caption: { fr: "Le monogramme", en: "The monogram" },
          },
          {
            image: "/work/bopassage/bopassage-brand-identity.png",
            alt: { fr: "Système d'identité Bôpassage", en: "Bôpassage identity system" },
            caption: { fr: "Le système", en: "The system" },
          },
          {
            image: "/work/bopassage/bopassage-brand-cup.png",
            alt: { fr: "Tasse Bôpassage", en: "Bôpassage cup" },
            caption: { fr: "Emballage", en: "Packaging" },
          },
          {
            image: "/work/bopassage/bopassage-brand-signage.png",
            alt: { fr: "Signalétique Bôpassage", en: "Bôpassage signage" },
            caption: { fr: "Signalétique", en: "Signage" },
          },
          {
            image: "/work/bopassage/bopassage-web.png",
            alt: { fr: "Le site Bôpassage", en: "The Bôpassage site" },
            caption: { fr: "Le site", en: "The site" },
          },
          {
            image: "/work/bopassage/bopassage-ooh-column.png",
            alt: { fr: "Affichage extérieur Bôpassage", en: "Bôpassage out-of-home poster" },
            caption: { fr: "Affichage", en: "Out of home" },
          },
        ],
      },

      positioning: {
        fr: "Site, voix, média payant et optimisation du revenu pour le café emblématique de Founty, à Agadir.",
        en: "Website, voice, paid media, and revenue optimisation for Agadir's signature café corridor.",
      },

      brand: {
        title: {
          fr: "Architecture de marque : Forêt & Or",
          en: "Brand Architecture: Forêt & Or",
        },
        text: {
          fr: "Un système d'identité complet qui porte la chaleur botanique et la lumière dorée de Bôpassage bien au-delà de sa salle.",
          en: "A complete identity system that carries the botanical warmth and golden-hour light of Bôpassage well beyond its own room.",
        },
        palette: [
          { name: { fr: "Forêt", en: "Forest" }, hex: "#18312e" },
          { name: { fr: "Crème", en: "Cream" }, hex: "#f5eedf" },
          { name: { fr: "Or", en: "Gold" }, hex: "#b8973a" },
        ],
        type: {
          wordmark: "Bô Passage",
          line: { fr: "L'endroit qu'on aime.", en: "L'endroit qu'on aime." },
          descriptor: {
            fr: "Café & restaurant · Agadir",
            en: "Café & restaurant · Agadir",
          },
        },
        book: {
          label: {
            fr: "Voir la planche de marque complète",
            en: "View the full brand board",
          },
          href: "/work/bopassage/bopassage-brand-board.png",
        },
        applicationsTitle: {
          fr: "L'identité en contexte",
          en: "Identity in context",
        },
        applications: [
          {
            image: "/work/bopassage/bopassage-brand-logo-green.png",
            alt: {
              fr: "Logo Bôpassage en or sur forêt",
              en: "Bôpassage logo in gold on forest",
            },
            label: { fr: "Logo", en: "Logo" },
          },
          {
            image: "/work/bopassage/bopassage-brand-signage.png",
            alt: { fr: "Enseigne Bôpassage", en: "Bôpassage sign" },
            label: { fr: "Signalétique", en: "Signage" },
          },
          {
            image: "/work/bopassage/bopassage-brand-cup.png",
            alt: {
              fr: "Tasse aux couleurs de Bôpassage",
              en: "Cup in the Bôpassage colours",
            },
            label: { fr: "Emballage", en: "Packaging" },
          },
          {
            image: "/work/bopassage/bopassage-brand-application.png",
            alt: {
              fr: "Logo principal et secondaire Bôpassage",
              en: "Bôpassage primary and secondary logo",
            },
            label: { fr: "Système", en: "System" },
          },
        ],
      },

      website: {
        title: {
          fr: "Une maison digitale pour la carte, la réservation et l'expérience Founty.",
          en: "A digital home for menus, reservations, and the Founty experience.",
        },
        text: {
          fr: "Le site reprend la matière éditoriale du lieu, tient la carte à jour, et met la réservation à un pouce de distance   là où arrive la plupart des visites : sur téléphone, à l'heure du déjeuner.",
          en: "The site carries the room's editorial material, keeps the menu current, and puts booking a thumb away   which is where most visits arrive: on a phone, around lunchtime.",
        },
        desktop: "/work/bopassage/bopassage-web-desktop.png",
        mobile: "/work/bopassage/bopassage-web-mobile.png",
        alt: {
          fr: "Le site Bôpassage sur écran et sur téléphone",
          en: "The Bôpassage site on desktop and on a phone",
        },
        href: "https://bopassage.com",
      },

      social: {
        title: {
          fr: "Une présence sociale qui renforce la fidélité à la marque.",
          en: "Social media excellence that strengthens brand loyalty.",
        },
        items: [
          {
            image: "/work/bopassage/bopassage-social-savory-morning.png",
            alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
          },
          {
            image: "/work/bopassage/bopassage-social-waffle.png",
            alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
          },
          {
            image: "/work/bopassage/bopassage-social-matcha.png",
            alt: { fr: "Publication sociale Bôpassage", en: "Bôpassage social post" },
          },
          {
            image: "/work/bopassage/bopassage-social-good-morning.png",
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
            image: "/work/bopassage/bopassage-social-instagram.png",
            alt: { fr: "Profil Instagram Bôpassage", en: "Bôpassage Instagram profile" },
          },
        ],
      },

      after: {
        fr: "Notre site ressemble enfin au restaurant   chaleureux, clair, facile à réserver. Le social et les campagnes amènent maintenant des gens qui comprennent l'ambiance avant même d'entrer.",
        en: "Our site finally feels like the restaurant   warm, clear, easy to book. Social and ads now bring in people who already understand the vibe before they walk in.",
      },
    },
  },
  {
    slug: "dmc-morocco",
    number: "02",
    client: "DMC Hospitality Morocco",
    year: "2024",
    sector: { fr: "Hôtellerie", en: "Hospitality" },
    services: [
      { fr: "Naming", en: "Naming" },
      { fr: "Identité", en: "Identity" },
      { fr: "Site web", en: "Website" },
    ],
    title: {
      fr: "Trente ans d'expertise hôtelière, enfin dotés d'un nom et d'un visage.",
      en: "Thirty years of hotel expertise, finally given a name and a face.",
    },
    hero: {
      image: "/work/dmc-morocco/dmc-hero.png",
      alt: {
        fr: "Identité DMC Hospitality Morocco",
        en: "DMC Hospitality Morocco identity",
      },
    },
    challenge: {
      text: {
        fr: "Trois décennies de savoir-faire hôtelier, et rien de visible. Pas de marque, pas de site, aucune voix sur le marché. L'expertise ne circulait que de bouche à oreille.",
        en: "Three decades of hospitality know-how, and none of it visible. No brand, no website, no voice in the market. The expertise only ever travelled by word of mouth.",
      },
      points: [
        { fr: "Aucune marque", en: "No brand" },
        { fr: "Aucun site web", en: "No website" },
        { fr: "Aucune voix sur le marché", en: "No voice in the market" },
      ],
    },
    idea: {
      statement: {
        fr: "Construire la marque que l'expertise méritait déjà.",
        en: "Build the brand the expertise already deserved.",
      },
      text: {
        fr: "Nous sommes partis du nom, puis vers l'extérieur : identité, site, et une voix LinkedIn adressée aux propriétaires d'hôtels et aux opérateurs internationaux   pas aux voyageurs.",
        en: "We started from the name and worked outward: identity, site, and a LinkedIn voice aimed at hotel owners and international operators   not at travellers.",
      },
      image: "/work/dmc-morocco/dmc-brand-posters.png",
      alt: {
        fr: "Affiches de marque DMC Hospitality Morocco",
        en: "DMC Hospitality Morocco brand posters",
      },
    },
    built: [
      {
        title: { fr: "Marque", en: "Brand" },
        text: {
          fr: "Le nom, puis tout ce qui en découle : logo, système visuel, guide d'application.",
          en: "The name, and everything that follows from it: logo, visual system, guidelines.",
        },
      },
      {
        title: { fr: "Digital", en: "Digital" },
        text: {
          fr: "Un site qui parle à des opérateurs, pas à des vacanciers.",
          en: "A site that speaks to operators, not to holidaymakers.",
        },
      },
      {
        title: { fr: "B2B", en: "B2B" },
        text: {
          fr: "Une ligne LinkedIn et un positionnement qui amènent les premiers contacts.",
          en: "A LinkedIn line and a market position that bring in the first conversations.",
        },
      },
    ],
    work: [
      {
        kind: "full",
        image: "/work/dmc-morocco/dmc-web-desktop.png",
        alt: {
          fr: "Site DMC Hospitality Morocco",
          en: "DMC Hospitality Morocco website",
        },
        caption: { fr: "Page d'accueil", en: "Homepage" },
      },
      {
        kind: "pair",
        items: [
          {
            image: "/work/dmc-morocco/dmc-brand-logo-mark.png",
            alt: { fr: "Symbole DMC", en: "DMC brand mark" },
            caption: { fr: "Le symbole", en: "The mark" },
          },
          {
            image: "/work/dmc-morocco/dmc-brand-card.png",
            alt: { fr: "Carte de visite DMC", en: "DMC business card" },
            caption: { fr: "Papeterie", en: "Stationery" },
          },
        ],
      },
      {
        kind: "full",
        image: "/work/dmc-morocco/dmc-guidelines.png",
        alt: { fr: "Guide de marque DMC", en: "DMC brand guidelines" },
        caption: { fr: "Le guide de marque", en: "Brand guidelines" },
      },
      {
        kind: "note",
        image: "/work/dmc-morocco/dmc-web-mobile.png",
        alt: { fr: "Le site DMC sur téléphone", en: "The DMC site on a phone" },
        title: { fr: "Sur téléphone", en: "Mobile experience" },
        text: {
          fr: "La plupart des premiers contacts arrivent depuis LinkedIn, sur téléphone. Le site devait tenir sa promesse dans ce format-là d'abord.",
          en: "Most first contacts arrive from LinkedIn, on a phone. The site had to hold its promise in that format first.",
        },
      },
      {
        kind: "trio",
        items: [
          {
            image: "/work/dmc-morocco/dmc-social-excellence.png",
            alt: { fr: "Publication LinkedIn DMC", en: "DMC LinkedIn post" },
          },
          {
            image: "/work/dmc-morocco/dmc-social-c.png",
            alt: { fr: "Publication LinkedIn DMC", en: "DMC LinkedIn post" },
          },
          {
            image: "/work/dmc-morocco/dmc-social-m.png",
            alt: { fr: "Publication LinkedIn DMC", en: "DMC LinkedIn post" },
          },
        ],
      },
      {
        kind: "full",
        image: "/work/dmc-morocco/dmc-brand-uniform.png",
        alt: { fr: "Uniformes DMC", en: "DMC uniforms" },
        caption: { fr: "Sur le terrain", en: "On the ground" },
      },
    ],
    result: {
      statement: {
        fr: "Une marque qui ouvre les conversations auxquelles l'expertise donnait déjà droit.",
        en: "A brand that opens the conversations the expertise already qualified for.",
      },
      changes: [
        {
          fr: "Un nom et une identité, partis d'une page blanche.",
          en: "A name and an identity, started from a blank page.",
        },
        {
          fr: "Un site adressé aux opérateurs et aux propriétaires d'hôtels.",
          en: "A site addressed to operators and hotel owners.",
        },
        {
          fr: "Une présence LinkedIn qui amène les premiers contacts entrants.",
          en: "A LinkedIn presence that brings the first inbound contacts.",
        },
      ],
    },
    info: { location: { fr: "Maroc", en: "Morocco" } },
  },
  {
    slug: "educazen-kids",
    number: "03",
    client: "EducazenKids",
    year: "2024",
    sector: { fr: "Éducation", en: "Education" },
    services: [
      { fr: "Marque", en: "Brand" },
      { fr: "Plateforme", en: "Platform" },
      { fr: "Marketing", en: "Marketing" },
    ],
    title: {
      fr: "Une école qui gère enfin ses inscriptions et sa réputation au même endroit.",
      en: "A school that finally handles enrolment and its reputation in one place.",
    },
    hero: {
      image: "/work/educazen-kids/educazen-hero.png",
      alt: { fr: "Univers EducazenKids", en: "The EducazenKids world" },
    },
    challenge: {
      text: {
        fr: "Un centre qui change la vie d'enfants tous les jours, et une présence digitale qui n'en montrait rien. Les familles avaient du mal à le trouver, et l'équipe gérait les inscriptions à la main.",
        en: "A centre changing children's lives every day, with a digital presence that showed none of it. Families struggled to find it, and the team was running admissions by hand.",
      },
      points: [
        { fr: "Difficile à trouver en ligne", en: "Hard to find online" },
        { fr: "Aucun CRM", en: "No CRM" },
        { fr: "Inscriptions gérées à la main", en: "Enrolment run by hand" },
      ],
    },
    idea: {
      statement: {
        fr: "Que le dehors ressemble enfin au dedans.",
        en: "Make the outside feel like the inside.",
      },
      text: {
        fr: "Ce qui se passe dans les salles inspire confiance. Nous avons construit la marque, le site et les outils autour de cette confiance-là   chaleureux, lisibles, et faciles pour un parent pressé.",
        en: "What happens in the rooms earns trust. We built the brand, the site and the tools around that trust   warm, legible, and easy for a parent in a hurry.",
      },
      image: "/work/educazen-kids/educazenkids-brand-book.png",
      alt: { fr: "Livre de marque EducazenKids", en: "EducazenKids brand book" },
    },
    built: [
      {
        title: { fr: "Marque", en: "Brand" },
        text: {
          fr: "Une identité plus chaleureuse, pensée pour rassurer avant de convaincre.",
          en: "A warmer identity, built to reassure before it persuades.",
        },
      },
      {
        title: { fr: "Site", en: "Website" },
        text: {
          fr: "Un site refait autour d'une seule action : inscrire son enfant.",
          en: "A site rebuilt around one action: enrolling a child.",
        },
      },
      {
        title: { fr: "Systèmes", en: "Systems" },
        text: {
          fr: "Un CRM et un tableau de bord : les demandes, les places, les suivis au même endroit.",
          en: "A CRM and a dashboard: enquiries, places and follow-ups in one place.",
        },
      },
      {
        title: { fr: "Marketing", en: "Marketing" },
        text: {
          fr: "Des campagnes Meta dirigées vers les familles du bon quartier, au bon moment de l'année.",
          en: "Meta campaigns pointed at families in the right area, at the right time of year.",
        },
      },
    ],
    work: [
      {
        kind: "full",
        image: "/work/educazen-kids/educazenkids-web-desktop.png",
        alt: { fr: "Site EducazenKids", en: "The EducazenKids website" },
        caption: { fr: "Page d'accueil", en: "Homepage" },
      },
      {
        kind: "pair",
        items: [
          {
            image: "/work/educazen-kids/educazenkids-before.png",
            alt: {
              fr: "L'ancien site EducazenKids",
              en: "The old EducazenKids site",
            },
            caption: { fr: "Avant", en: "Before" },
          },
          {
            image: "/work/educazen-kids/educazenkids-after.png",
            alt: {
              fr: "Le nouveau site EducazenKids",
              en: "The new EducazenKids site",
            },
            caption: { fr: "Après", en: "After" },
          },
        ],
      },
      {
        kind: "full",
        image: "/work/educazen-kids/educazenkids-dashboard.png",
        alt: {
          fr: "Tableau de bord des inscriptions EducazenKids",
          en: "EducazenKids enrolment dashboard",
        },
        caption: { fr: "Le tableau de bord", en: "The dashboard" },
      },
      {
        kind: "note",
        image: "/work/educazen-kids/educazenkids-web-mobile.png",
        alt: {
          fr: "Le site EducazenKids sur téléphone",
          en: "The EducazenKids site on a phone",
        },
        title: { fr: "Sur téléphone", en: "Mobile experience" },
        text: {
          fr: "Les parents cherchent une école le soir, sur leur téléphone. L'inscription tient en un écran et quelques champs.",
          en: "Parents look for a school in the evening, on their phone. Enrolment fits in one screen and a few fields.",
        },
      },
      {
        kind: "pair",
        items: [
          {
            image: "/work/educazen-kids/educazenkids-logo.png",
            alt: { fr: "Logo EducazenKids", en: "EducazenKids logo" },
            caption: { fr: "Le logo", en: "The logo" },
          },
          {
            image: "/work/educazen-kids/educazenkids-brand-identity.png",
            alt: {
              fr: "Système visuel EducazenKids",
              en: "EducazenKids visual system",
            },
            caption: { fr: "Le système visuel", en: "Visual system" },
          },
        ],
      },
      {
        kind: "full",
        image: "/work/educazen-kids/educazenkids-crm.png",
        alt: { fr: "CRM EducazenKids", en: "The EducazenKids CRM" },
        caption: { fr: "Le suivi des familles", en: "Following up families" },
      },
    ],
    result: {
      statement: {
        fr: "Un centre que les familles trouvent seules, et une équipe qui ne court plus après l'administratif.",
        en: "A centre families find on their own, and a team no longer chasing admin.",
      },
      changes: [
        {
          fr: "Une marque qui ressemble enfin à ce qui se passe à l'intérieur.",
          en: "A brand that finally looks like what happens inside.",
        },
        {
          fr: "Une inscription en ligne, du premier clic à la place confirmée.",
          en: "Enrolment online, from the first click to the confirmed place.",
        },
        {
          fr: "Un seul tableau de bord pour les demandes, les places et les relances.",
          en: "One dashboard for enquiries, places and follow-ups.",
        },
      ],
    },
    info: { location: { fr: "Agadir, Maroc", en: "Agadir, Morocco" } },
  },
  {
    slug: "lunja-village",
    number: "04",
    client: "Lunja Village",
    year: "2024",
    sector: { fr: "Hôtellerie", en: "Hospitality" },
    services: [
      { fr: "Refonte de marque", en: "Rebrand" },
      { fr: "Contenu", en: "Content" },
      { fr: "Media", en: "Media" },
    ],
    title: {
      fr: "Une marque de village côtier, rebâtie pour ceux qui arrivent vraiment.",
      en: "A coastal village brand, rebuilt for the people actually arriving.",
    },
    hero: {
      image: "/work/lunja-village/lunja-hero.png",
      alt: {
        fr: "Lunja Village à Imi Ouaddar",
        en: "Lunja Village in Imi Ouaddar",
      },
    },
    challenge: {
      text: {
        fr: "Lunja avait le lieu, l'esprit et l'audience. La marque, elle, disait encore « resort », alors que les gens qui arrivaient étaient des surfeurs, des nomades digitaux et des groupes créatifs.",
        en: "Lunja had the location, the spirit and the audience. The brand still said “resort”, while the guests turning up were surfers, digital nomads and creative groups.",
      },
      points: [
        {
          fr: "Une marque adressée au mauvais client",
          en: "A brand aimed at the wrong guest",
        },
        { fr: "Aucun contenu régulier", en: "No consistent content" },
        {
          fr: "Aucun système derrière les réservations",
          en: "No system behind the bookings",
        },
      ],
    },
    idea: {
      statement: {
        fr: "Parler comme quelqu'un qui vit déjà sur place.",
        en: "Speak like someone who already lives there.",
      },
      text: {
        fr: "Identité rétro-plage, lumière de l'Atlantique, grain de pellicule   et des contenus écrits comme un ami qui connaît l'endroit vous en parlerait.",
        en: "Retro-beach identity, Atlantic light, film grain   and content written the way a friend who knows the place would tell you about it.",
      },
      image: "/work/lunja-village/lunja-brand-board.png",
      alt: {
        fr: "Planche de marque Lunja Village",
        en: "Lunja Village brand board",
      },
    },
    built: [
      {
        title: { fr: "Marque", en: "Brand" },
        text: {
          fr: "Une refonte complète et un repositionnement sur le client qui vient réellement.",
          en: "A full rebrand, repositioned on the guest who actually turns up.",
        },
      },
      {
        title: { fr: "Contenu", en: "Content" },
        text: {
          fr: "Un ton et un rythme social que l'équipe peut tenir toute l'année.",
          en: "A tone and a social rhythm the team can hold all year.",
        },
      },
      {
        title: { fr: "Croissance", en: "Growth" },
        text: {
          fr: "Media buying, réputation et expérience client, traités comme un seul système.",
          en: "Media buying, reputation and guest experience, treated as one system.",
        },
      },
    ],
    work: [
      {
        kind: "full",
        image: "/work/lunja-village/lunja-brand-mockup.png",
        alt: {
          fr: "Système de marque Lunja Village",
          en: "Lunja Village brand system",
        },
        caption: { fr: "Le système de marque", en: "The brand system" },
      },
      {
        kind: "pair",
        items: [
          {
            image: "/work/lunja-village/lunja-logo.png",
            alt: { fr: "Logo Lunja Village", en: "Lunja Village logo" },
            caption: { fr: "Le logo", en: "The logo" },
          },
          {
            image: "/work/lunja-village/lunja-brand-tote.png",
            alt: { fr: "Tote bag Lunja Village", en: "Lunja Village tote bag" },
            caption: { fr: "Sur le terrain", en: "On the ground" },
          },
        ],
      },
      {
        kind: "full",
        image: "/work/lunja-village/lunja-application.png",
        alt: {
          fr: "Applications de la marque Lunja Village",
          en: "Lunja Village brand applications",
        },
        caption: { fr: "Applications", en: "Applications" },
      },
      {
        kind: "note",
        image: "/work/lunja-village/lunja-brand-logo-site.png",
        alt: {
          fr: "La marque Lunja Village en ligne",
          en: "The Lunja Village brand online",
        },
        title: { fr: "Une seule voix", en: "One voice" },
        text: {
          fr: "Le même ton du premier post jusqu'à la confirmation de réservation. Les clients arrivent en ayant déjà compris l'endroit.",
          en: "The same tone from the first post to the booking confirmation. Guests arrive already understanding the place.",
        },
      },
      {
        kind: "trio",
        items: [
          {
            image: "/work/lunja-village/lunja-social-1.png",
            alt: {
              fr: "Publication Lunja Village",
              en: "Lunja Village social post",
            },
          },
          {
            image: "/work/lunja-village/lunja-social-3.png",
            alt: {
              fr: "Publication Lunja Village",
              en: "Lunja Village social post",
            },
          },
          {
            image: "/work/lunja-village/lunja-social-5.png",
            alt: {
              fr: "Publication Lunja Village",
              en: "Lunja Village social post",
            },
          },
        ],
      },
      {
        kind: "full",
        image: "/work/lunja-village/lunja-alt.png",
        alt: { fr: "Univers Lunja Village", en: "The Lunja Village world" },
      },
    ],
    result: {
      statement: {
        fr: "Une marque qui correspond enfin à ceux qui poussent la porte.",
        en: "A brand that finally matches who walks through the door.",
      },
      changes: [
        {
          fr: "Un positionnement qui parle au vrai client, pas à celui d'avant.",
          en: "A position that speaks to the real guest, not the old one.",
        },
        {
          fr: "Un rythme de contenu que l'équipe tient sans se battre.",
          en: "A content rhythm the team can hold without a fight.",
        },
        {
          fr: "Des réservations qui arrivent en ayant déjà compris le village.",
          en: "Bookings that arrive already understanding the village.",
        },
      ],
    },
    info: {
      location: {
        fr: "Imi Ouaddar, Taghazout, Maroc",
        en: "Imi Ouaddar, Taghazout, Morocco",
      },
    },
  },
  {
    slug: "medical-bay",
    number: "05",
    client: "Medical Bay",
    year: "2026",
    sector: { fr: "Santé", en: "Healthcare" },
    services: [
      { fr: "Marque", en: "Brand" },
      { fr: "Site web", en: "Website" },
      { fr: "CRM", en: "CRM" },
    ],
    title: {
      fr: "Un centre médical, construit du premier clic du patient jusqu'au suivi.",
      en: "A medical centre, built from the patient's first click to the follow-up.",
    },
    hero: {
      image: "/work/medical-bay/medical-bay-lobby.png",
      alt: { fr: "L'accueil de Medical Bay", en: "The Medical Bay lobby" },
    },
    challenge: {
      text: {
        fr: "Une vision claire, et rien dessous. Pas de marque, pas de parcours patient, pas de CRM, pas de tunnel, aucune logique marketing. La clinique existait sur le papier.",
        en: "A clear vision, and nothing underneath it. No brand, no patient journey, no CRM, no funnel, no marketing logic. The clinic existed on paper.",
      },
      points: [
        { fr: "Aucune marque", en: "No brand" },
        { fr: "Aucun parcours patient", en: "No patient journey" },
        {
          fr: "Aucun système derrière l'accueil",
          en: "No system behind the front desk",
        },
      ],
    },
    idea: {
      statement: {
        fr: "Concevoir la clinique et son logiciel comme une seule et même chose.",
        en: "Design the clinic and its software as one thing.",
      },
      text: {
        fr: "L'environnement de marque, l'expérience patient et l'infrastructure digitale ne sont pas trois chantiers. C'est un seul système, du premier contact jusqu'au suivi.",
        en: "Brand environment, patient experience and digital infrastructure are not three projects. They are one system, from first contact to follow-up care.",
      },
      image: "/work/medical-bay/medical-bay-brand.png",
      alt: { fr: "Identité Medical Bay", en: "Medical Bay identity" },
    },
    built: [
      {
        title: { fr: "Marque", en: "Brand" },
        text: {
          fr: "Une identité et une signalétique pensées pour rassurer dès la porte.",
          en: "An identity and signage built to reassure from the door onward.",
        },
      },
      {
        title: { fr: "Expérience patient", en: "Patient experience" },
        text: {
          fr: "Le parcours réel : trouver, comprendre, prendre rendez-vous, revenir.",
          en: "The real journey: find, understand, book, come back.",
        },
      },
      {
        title: { fr: "Site web", en: "Website" },
        text: {
          fr: "Un site construit comme un tunnel, pas comme une brochure.",
          en: "A site built as a funnel, not as a brochure.",
        },
      },
      {
        title: { fr: "CRM", en: "CRM" },
        text: {
          fr: "Un tableau de bord : demandes, rendez-vous, relances, reporting.",
          en: "One dashboard: leads, appointments, follow-ups, reporting.",
        },
      },
      {
        title: { fr: "Marketing", en: "Marketing" },
        text: {
          fr: "Des campagnes locales, et une porte d'entrée pour le tourisme médical.",
          en: "Local campaigns, and a way in for medical tourism.",
        },
      },
    ],
    work: [
      {
        kind: "full",
        image: "/work/medical-bay/medical-bay-web-desktop.png",
        alt: { fr: "Le site Medical Bay", en: "The Medical Bay website" },
        caption: { fr: "Page d'accueil", en: "Homepage" },
      },
      {
        kind: "pair",
        items: [
          {
            image: "/work/medical-bay/medical-bay-brand-logo-2.png",
            alt: { fr: "Logo Medical Bay", en: "Medical Bay logo" },
            caption: { fr: "Le logo", en: "The logo" },
          },
          {
            image: "/work/medical-bay/medical-bay-reception.png",
            alt: {
              fr: "L'accueil de Medical Bay",
              en: "The Medical Bay reception",
            },
            caption: { fr: "L'accueil", en: "Reception" },
          },
        ],
      },
      {
        kind: "full",
        image: "/work/medical-bay/medical-bay-dashboard.png",
        alt: {
          fr: "Tableau de bord opérationnel Medical Bay",
          en: "Medical Bay operations dashboard",
        },
        caption: { fr: "Le tableau de bord", en: "Operations dashboard" },
      },
      {
        kind: "note",
        image: "/work/medical-bay/medical-bay-web-mobile.png",
        alt: {
          fr: "Le site Medical Bay sur téléphone",
          en: "The Medical Bay site on a phone",
        },
        title: { fr: "Prendre rendez-vous", en: "Booking a visit" },
        text: {
          fr: "Un patient qui cherche un centre le fait souvent dans l'urgence. Le rendez-vous devait tenir en quelques gestes, sans compte à créer.",
          en: "Someone looking for a clinic is often in a hurry. Booking had to fit into a few taps, with no account to create.",
        },
      },
      {
        kind: "trio",
        items: [
          {
            image: "/work/medical-bay/medical-bay-campaign-implant.png",
            alt: { fr: "Campagne Medical Bay", en: "Medical Bay campaign" },
          },
          {
            image: "/work/medical-bay/medical-bay-campaign-veneer.png",
            alt: { fr: "Campagne Medical Bay", en: "Medical Bay campaign" },
          },
          {
            image: "/work/medical-bay/medical-bay-campaign-zirconia.png",
            alt: { fr: "Campagne Medical Bay", en: "Medical Bay campaign" },
          },
        ],
      },
      {
        kind: "full",
        image: "/work/medical-bay/medical-bay-tourism-medical.png",
        alt: {
          fr: "Tourisme médical Medical Bay",
          en: "Medical Bay medical tourism",
        },
        caption: { fr: "Tourisme médical", en: "Medical tourism" },
      },
    ],
    result: {
      statement: {
        fr: "Une clinique qui tourne sur un système, plus sur des tableurs.",
        en: "A clinic that runs on a system instead of on spreadsheets.",
      },
      changes: [
        {
          fr: "Une marque et un lieu qui rassurent avant le premier rendez-vous.",
          en: "A brand and a space that reassure before the first appointment.",
        },
        {
          fr: "Un parcours patient continu, du premier clic au suivi.",
          en: "One continuous patient journey, from first click to follow-up.",
        },
        {
          fr: "Une équipe qui suit ses rendez-vous depuis un seul écran.",
          en: "A team following its appointments from a single screen.",
        },
      ],
    },
    info: { location: { fr: "Agadir, Maroc", en: "Agadir, Morocco" } },
  },
  {
    slug: "orsen",
    number: "06",
    client: "ORSEN",
    year: "2026",
    sector: { fr: "Matériaux", en: "Materials" },
    services: [
      { fr: "Direction artistique", en: "Art direction" },
      { fr: "Design system", en: "Design system" },
      { fr: "Site & portail B2B", en: "Site & B2B portal" },
    ],
    title: {
      fr: "Une plateforme de matériaux faite pour des architectes, pas pour des curieux.",
      en: "A materials platform built for architects, not for browsers.",
    },
    hero: {
      image: "/work/orsen/orsen hero.png",
      alt: { fr: "Site ORSEN", en: "The ORSEN site" },
    },
    challenge: {
      text: {
        fr: "Les architectes lisent des fiches techniques, pas des accroches marketing. Il fallait une seule plateforme pour le marbre, la pierre, le béton, le bois et le métal   avec une face publique et une face professionnelle derrière.",
        en: "Architects read specification sheets, not marketing copy. One platform had to sell marble, stone, concrete, wood and metal   with a public face and a professional one behind it.",
      },
      points: [
        { fr: "Deux publics, une plateforme", en: "Two audiences, one platform" },
        { fr: "La fiche avant le discours", en: "Specs before storytelling" },
        { fr: "Aucun outil pour le B2B", en: "No tooling for the trade" },
      ],
    },
    idea: {
      statement: {
        fr: "La matière avant le décor.",
        en: "Material before decoration.",
      },
      text: {
        fr: "Des sections posées comme des plaques, une seule typographie, une seule couleur de signal. Tout ce qui n'aide pas à lire la matière a été retiré.",
        en: "Sections laid down like plates, a single typeface, one signal colour. Anything that did not help read the material was taken out.",
      },
      image: "/work/orsen/web-orsen-cover.jpg",
      alt: { fr: "Direction artistique ORSEN", en: "ORSEN art direction" },
    },
    built: [
      {
        title: { fr: "Direction artistique", en: "Art direction" },
        text: {
          fr: "Une langue visuelle de retenue : plaques, filets, et rien de superflu.",
          en: "A visual language of restraint: plates, hairlines, and nothing spare.",
        },
      },
      {
        title: { fr: "Design system", en: "Design system" },
        text: {
          fr: "Une typographie, une couleur de signal, un rayon de 2px. Tout en découle.",
          en: "One typeface, one signal colour, a 2px radius. Everything follows from it.",
        },
      },
      {
        title: { fr: "Site", en: "Website" },
        text: {
          fr: "Le catalogue public, construit autour de la fiche produit.",
          en: "The public catalogue, built around the product sheet.",
        },
      },
      {
        title: { fr: "Portail B2B", en: "B2B portal" },
        text: {
          fr: "Espace pro : catalogue, clients, commandes, devis, stock.",
          en: "The trade side: catalogue, clients, orders, quotes, stock.",
        },
      },
    ],
    work: [
      {
        kind: "full",
        image: "/work/orsen/web-orsen-desktop.jpg",
        alt: {
          fr: "Le site ORSEN sur ordinateur",
          en: "The ORSEN site on desktop",
        },
        caption: { fr: "Le catalogue", en: "The catalogue" },
      },
      {
        kind: "note",
        image: "/work/orsen/web-orsen-mobile.jpg",
        alt: { fr: "Le site ORSEN sur téléphone", en: "The ORSEN site on a phone" },
        title: { fr: "Sur chantier", en: "On site" },
        text: {
          fr: "Une fiche produit se consulte souvent debout, sur un chantier. Les caractéristiques passent avant les images.",
          en: "A product sheet is often read standing up, on a site. The specifications come before the pictures.",
        },
      },
    ],
    result: {
      statement: {
        fr: "Une plateforme qui se lit comme une fiche technique, et se tient comme une marque.",
        en: "A platform that reads like a spec sheet and holds itself like a brand.",
      },
      changes: [
        {
          fr: "Un système visuel réduit à ce qui sert la matière.",
          en: "A visual system cut back to what serves the material.",
        },
        {
          fr: "Un catalogue public et un espace pro sur la même base.",
          en: "A public catalogue and a trade portal on one foundation.",
        },
        {
          fr: "Devis, commandes et stock traités au même endroit.",
          en: "Quotes, orders and stock handled in one place.",
        },
      ],
    },
    info: { location: { fr: "Maroc", en: "Morocco" } },
  },
  {
    slug: "lithos-materiaux",
    number: "07",
    client: "LITHOS",
    year: "2026",
    sector: { fr: "Matériaux", en: "Materials" },
    services: [
      { fr: "Direction artistique", en: "Art direction" },
      { fr: "Design system", en: "Design system" },
      { fr: "E-commerce", en: "E-commerce" },
    ],
    title: {
      fr: "Un e-commerce construit comme un architecte choisit vraiment la pierre.",
      en: "An e-commerce built the way an architect actually picks stone.",
    },
    hero: {
      image: "/work/lithos-materiaux/luthos hero.png",
      alt: { fr: "Site LITHOS", en: "The LITHOS site" },
    },
    challenge: {
      text: {
        fr: "Un fournisseur de calcaire, de travertin, de béton et de marbre dans le sud de la France. Le catalogue devait suivre la façon dont un architecte prescrit   par effet, par espace, par ambiance   et pas par référence.",
        en: "A limestone, travertine, concrete and marble supplier in southern France. The catalogue had to follow the way an architect specifies   by effect, by space, by mood   not by reference number.",
      },
      points: [
        {
          fr: "Un catalogue difficile à parcourir",
          en: "A catalogue hard to browse",
        },
        { fr: "Plusieurs façons de chercher", en: "Several ways of searching" },
        {
          fr: "Rien qui évoque la matière",
          en: "Nothing that evoked the material",
        },
      ],
    },
    idea: {
      statement: {
        fr: "La matière, racontée avec soin.",
        en: "Material, told with care.",
      },
      text: {
        fr: "Une palette tirée de la carrière, des angles presque droits comme la pierre taillée, une typographie condensée qui rappelle la gravure. Et trois portes d'entrée dans le catalogue plutôt qu'une.",
        en: "A palette taken from the quarry, near-square corners like cut stone, a condensed typeface that recalls engraving. And three ways into the catalogue instead of one.",
      },
      image: "/work/lithos-materiaux/web-lithos-cover.jpg",
      alt: { fr: "Direction artistique LITHOS", en: "LITHOS art direction" },
    },
    built: [
      {
        title: { fr: "Direction artistique", en: "Art direction" },
        text: {
          fr: "Une palette et une typographie tirées de la matière elle-même.",
          en: "A palette and a typeface drawn from the material itself.",
        },
      },
      {
        title: { fr: "Design system", en: "Design system" },
        text: {
          fr: "Des composants pensés pour un catalogue qui grandit.",
          en: "Components built for a catalogue that keeps growing.",
        },
      },
      {
        title: { fr: "E-commerce", en: "E-commerce" },
        text: {
          fr: "Trois entrées   par effet, par espace, par moodboard   vers le même produit.",
          en: "Three ways in   by effect, by space, by moodboard   to the same product.",
        },
      },
    ],
    work: [
      {
        kind: "full",
        image: "/work/lithos-materiaux/web-lithos-desktop.jpg",
        alt: {
          fr: "Le site LITHOS sur ordinateur",
          en: "The LITHOS site on desktop",
        },
        caption: { fr: "Le catalogue", en: "The catalogue" },
      },
      {
        kind: "note",
        image: "/work/lithos-materiaux/web-lithos-mobile.jpg",
        alt: {
          fr: "Le site LITHOS sur téléphone",
          en: "The LITHOS site on a phone",
        },
        title: { fr: "Sur téléphone", en: "Mobile experience" },
        text: {
          fr: "La grille passe de trois colonnes à une, et les moodboards se feuillettent au doigt.",
          en: "The grid drops from three columns to one, and the moodboards are swiped through by thumb.",
        },
      },
    ],
    result: {
      statement: {
        fr: "Un catalogue qui se parcourt comme on choisit une pierre : par ce qu'elle donne.",
        en: "A catalogue browsed the way a stone is chosen: by what it gives you.",
      },
      changes: [
        {
          fr: "Une identité qui vient de la carrière, pas d'une charte générique.",
          en: "An identity that comes from the quarry, not from a generic palette.",
        },
        {
          fr: "Trois façons d'entrer dans le catalogue, selon la façon de chercher.",
          en: "Three ways into the catalogue, depending on how you search.",
        },
        {
          fr: "Un système qui tient du desktop au téléphone.",
          en: "A system that holds from desktop down to a phone.",
        },
      ],
    },
    info: {
      location: { fr: "Aix-en-Provence, France", en: "Aix-en-Provence, France" },
    },
  },
  {
    slug: "rihab-residence",
    number: "08",
    client: "Résidence Rihab",
    year: "2026",
    sector: { fr: "Hôtellerie", en: "Hospitality" },
    services: [
      { fr: "Direction artistique", en: "Art direction" },
      { fr: "Site web", en: "Website" },
      { fr: "Réservation", en: "Booking" },
    ],
    title: {
      fr: "Une adresse marocaine tranquille, à cinq minutes de l'Atlantique.",
      en: "A quiet Moroccan address, five minutes from the Atlantic.",
    },
    hero: {
      image: "/work/rihab-residence/HERO PAGE RIHAB.png",
      alt: { fr: "Résidence Rihab à Agadir", en: "Résidence Rihab in Agadir" },
    },
    challenge: {
      text: {
        fr: "Autour d'Agadir, des logements modestes se vendaient comme un luxe qu'ils n'étaient pas. La Résidence Rihab est familiale, et il lui fallait un site qui le dise.",
        en: "Around Agadir, modest apartments were being sold as a luxury they were not. Résidence Rihab is family-run, and it needed a site that said so.",
      },
      points: [
        { fr: "Des concurrents qui survendent", en: "Competitors overselling" },
        { fr: "Aucune réservation en ligne", en: "No booking online" },
        { fr: "Rien en deux langues", en: "Nothing bilingual" },
      ],
    },
    idea: {
      statement: {
        fr: "Montrer l'endroit tel qu'il est.",
        en: "Show the place as it is.",
      },
      text: {
        fr: "Une palette marine, bleu acier et crème, prise sur le bâtiment lui-même. Des photos non retouchées et de vrais mots de clients. L'honnêteté comme argument.",
        en: "A navy, steel-blue and cream palette taken from the building itself. Unfiltered photography and real guest words. Honesty as the argument.",
      },
      image: "/work/rihab-residence/web-rihab-cover.jpg",
      alt: {
        fr: "Direction artistique Résidence Rihab",
        en: "Résidence Rihab art direction",
      },
    },
    built: [
      {
        title: { fr: "Direction artistique", en: "Art direction" },
        text: {
          fr: "Une palette et une photographie prises sur place, sans retouche.",
          en: "A palette and photography taken on site, unretouched.",
        },
      },
      {
        title: { fr: "Site web", en: "Website" },
        text: {
          fr: "Un site bilingue français / anglais, écrit pour des voyageurs pressés.",
          en: "A bilingual French / English site, written for travellers in a hurry.",
        },
      },
      {
        title: { fr: "Réservation", en: "Booking" },
        text: {
          fr: "Disponibilités en direct, sans compte à créer ni carte à saisir.",
          en: "Live availability, with no account to create and no card to enter.",
        },
      },
    ],
    work: [
      {
        kind: "full",
        image: "/work/rihab-residence/web-rihab-desktop.jpg",
        alt: {
          fr: "Le site Résidence Rihab sur ordinateur",
          en: "The Résidence Rihab site on desktop",
        },
        caption: { fr: "Page d'accueil", en: "Homepage" },
      },
      {
        kind: "note",
        image: "/work/rihab-residence/web-rihab-mobile.jpg",
        alt: {
          fr: "Le site Résidence Rihab sur téléphone",
          en: "The Résidence Rihab site on a phone",
        },
        title: { fr: "Réserver", en: "Booking" },
        text: {
          fr: "Choisir des dates, voir ce qui reste, confirmer. Rien à créer, rien à payer d'avance.",
          en: "Pick dates, see what is left, confirm. Nothing to create, nothing to pay up front.",
        },
      },
    ],
    result: {
      statement: {
        fr: "Une adresse qui se présente honnêtement, et qui se réserve en trois gestes.",
        en: "An address that presents itself honestly, and books in three taps.",
      },
      changes: [
        {
          fr: "Un ton qui ne promet que ce que la résidence tient.",
          en: "A tone that promises only what the residence delivers.",
        },
        {
          fr: "Une réservation en direct, sans compte ni carte.",
          en: "Live booking, with no account and no card.",
        },
        {
          fr: "Un site lisible en français comme en anglais.",
          en: "A site that reads in French as well as in English.",
        },
      ],
    },
    info: {
      location: {
        fr: "Cité Founty, Agadir, Maroc",
        en: "Cité Founty, Agadir, Morocco",
      },
    },
  },
  {
    slug: "chillout-lounge",
    number: "10",
    client: "CHILLOUT Lounge",
    year: "2026",
    sector: { fr: "Hôtellerie", en: "Hospitality" },
    services: [
      { fr: "Direction artistique", en: "Art direction" },
      { fr: "Design system", en: "Design system" },
      { fr: "Site web", en: "Website" },
    ],
    title: {
      fr: "Musique live, cocktails et couchers de soleil face à l'Atlantique.",
      en: "Live music, cocktails and sunset sessions facing the Atlantic.",
    },
    hero: {
      image: "/work/chillout-lounge/chilout hero.png",
      alt: { fr: "Le CHILLOUT Lounge", en: "The CHILLOUT Lounge" },
    },
    challenge: {
      text: {
        fr: "Un seul objectif : remplir ce soir. Un lieu fait à la main, avec une vraie personnalité, et aucun moyen de la montrer en ligne.",
        en: "One job: fill tonight. A hand-made venue with a real personality, and no way to show it online.",
      },
      points: [
        {
          fr: "Remplir ce soir, pas dans un mois",
          en: "Fill tonight, not next month",
        },
        {
          fr: "Une personnalité invisible en ligne",
          en: "A personality invisible online",
        },
        { fr: "Aucun programme lisible", en: "No readable programme" },
      ],
    },
    idea: {
      statement: {
        fr: "Imprimer l'heure dorée.",
        en: "Print the golden hour.",
      },
      text: {
        fr: "Une palette de jardin au coucher du soleil, et un grain d'imprimerie posé en CSS sur les gros titres. L'esthétique du papier, sans le poids des images.",
        en: "A garden palette at sunset, and a print grain laid over the display type in CSS. The look of paper, without the weight of images.",
      },
      image: "/work/chillout-lounge/web-chillout-cover.jpg",
      alt: { fr: "Direction artistique CHILLOUT", en: "CHILLOUT art direction" },
    },
    built: [
      {
        title: { fr: "Direction artistique", en: "Art direction" },
        text: {
          fr: "Le grain et la lumière du lieu, traduits sans une seule texture chargée.",
          en: "The grain and the light of the venue, with not one heavy texture loaded.",
        },
      },
      {
        title: { fr: "Design system", en: "Design system" },
        text: {
          fr: "Des composants simples pour une équipe qui met à jour son programme elle-même.",
          en: "Simple components for a team that updates its own programme.",
        },
      },
      {
        title: { fr: "Site web", en: "Website" },
        text: {
          fr: "Une page qui répond à la seule question du soir : qu'est-ce qui se passe ce soir.",
          en: "A page that answers the only question of the evening: what is on tonight.",
        },
      },
    ],
    work: [
      {
        kind: "full",
        image: "/work/chillout-lounge/web-chillout-desktop.jpg",
        alt: {
          fr: "Le site CHILLOUT sur ordinateur",
          en: "The CHILLOUT site on desktop",
        },
        caption: { fr: "Page d'accueil", en: "Homepage" },
      },
      {
        kind: "note",
        image: "/work/chillout-lounge/web-chillout-mobile.jpg",
        alt: {
          fr: "Le site CHILLOUT sur téléphone",
          en: "The CHILLOUT site on a phone",
        },
        title: { fr: "Ce soir", en: "Tonight" },
        text: {
          fr: "Le site se consulte debout, souvent en marchant. Le programme et l'adresse passent avant tout le reste.",
          en: "The site is read standing up, often while walking. The programme and the address come before everything else.",
        },
      },
    ],
    result: {
      statement: {
        fr: "Un lieu qui se lit en ligne comme il se vit au coucher du soleil.",
        en: "A venue that reads online the way it feels at sunset.",
      },
      changes: [
        {
          fr: "Une personnalité enfin visible avant d'y être.",
          en: "A personality visible before you get there.",
        },
        {
          fr: "Un programme que l'équipe met à jour elle-même.",
          en: "A programme the team updates itself.",
        },
        {
          fr: "Un site léger, sans images lourdes à charger.",
          en: "A light site, with no heavy imagery to load.",
        },
      ],
    },
    info: {
      location: {
        fr: "Lunja Village, Agadir, Maroc",
        en: "Lunja Village, Agadir, Morocco",
      },
    },
  },
  {
    slug: "droguerie-souss",
    number: "12",
    client: "Souss Droguerie",
    year: "2026",
    sector: { fr: "Matériaux", en: "Materials" },
    services: [
      { fr: "Direction artistique", en: "Art direction" },
      { fr: "Site web", en: "Website" },
      { fr: "E-commerce", en: "E-commerce" },
    ],
    title: {
      fr: "Bâtissez avec les meilleurs matériaux.",
      en: "Build with the best materials.",
    },
    hero: {
      image: "/work/droguerie-souss/hero drougure.png",
      alt: { fr: "Souss Droguerie à Agadir", en: "Souss Droguerie in Agadir" },
    },
    challenge: {
      text: {
        fr: "Vingt ans de distribution de matériaux de construction, et une présence digitale qui ne montrait ni la compétence, ni la rapidité, ni l'état réel du stock.",
        en: "Twenty years of distributing building materials, and a digital presence that showed none of the competence, the speed or the real state of the stock.",
      },
      points: [
        { fr: "Une compétence invisible", en: "Competence nobody could see" },
        { fr: "Aucun stock en ligne", en: "No stock online" },
        { fr: "Rien pour déclencher l'appel", en: "Nothing to trigger the call" },
      ],
    },
    idea: {
      statement: {
        fr: "Concevoir pour une seule chose : que le téléphone sonne.",
        en: "Design for one outcome: the phone rings.",
      },
      text: {
        fr: "Indigo, encre, cramoisi et blanc, et une typographie de marchand professionnel. Chaque section pousse vers le même geste : un appel dans les vingt-quatre heures.",
        en: "Indigo, ink, crimson and white, with the typography of a professional merchant. Every section pushes toward the same act: a call within twenty-four hours.",
      },
      image: "/work/droguerie-souss/web-droguerie-souss-cover.jpg",
      alt: {
        fr: "Direction artistique Souss Droguerie",
        en: "Souss Droguerie art direction",
      },
    },
    built: [
      {
        title: { fr: "Direction artistique", en: "Art direction" },
        text: {
          fr: "Une identité de marchand : sérieuse, rapide, sans décor inutile.",
          en: "A merchant's identity: serious, fast, with no decoration to spare.",
        },
      },
      {
        title: { fr: "Site web", en: "Website" },
        text: {
          fr: "Huit catégories, les marques partenaires, et le contact à portée partout.",
          en: "Eight categories, the partner brands, and contact within reach everywhere.",
        },
      },
      {
        title: { fr: "E-commerce", en: "E-commerce" },
        text: {
          fr: "Un catalogue qui dit ce qu'il y a, et ce qu'il n'y a pas.",
          en: "A catalogue that says what is in stock, and what is not.",
        },
      },
    ],
    work: [
      {
        kind: "full",
        image: "/work/droguerie-souss/web-droguerie-souss-desktop.jpg",
        alt: {
          fr: "Le site Souss Droguerie sur ordinateur",
          en: "The Souss Droguerie site on desktop",
        },
        caption: { fr: "Page d'accueil", en: "Homepage" },
      },
      {
        kind: "note",
        image: "/work/droguerie-souss/web-droguerie-souss-mobile.jpg",
        alt: {
          fr: "Le site Souss Droguerie sur téléphone",
          en: "The Souss Droguerie site on a phone",
        },
        title: { fr: "Appeler", en: "Calling" },
        text: {
          fr: "Un chef de chantier cherche un matériau debout, entre deux livraisons. Le numéro ne quitte jamais l'écran.",
          en: "A site manager looks for a material standing up, between two deliveries. The number never leaves the screen.",
        },
      },
    ],
    result: {
      statement: {
        fr: "Vingt ans de métier, enfin visibles avant le premier appel.",
        en: "Twenty years of trade, finally visible before the first call.",
      },
      changes: [
        {
          fr: "Une présence qui montre la compétence au lieu de l'affirmer.",
          en: "A presence that shows the competence instead of claiming it.",
        },
        {
          fr: "Un catalogue honnête sur ce qui est disponible.",
          en: "A catalogue that is honest about what is available.",
        },
        {
          fr: "Un site construit autour d'un seul geste : appeler.",
          en: "A site built around one act: making the call.",
        },
      ],
    },
    info: { location: { fr: "Agadir, Maroc", en: "Agadir, Morocco" } },
  },
];

export function getProjectPage(slug: string) {
  return projectPages.find((project) => project.slug === slug);
}

export function getProjectSuggestions(slug: string, count = 2) {
  const index = projectPages.findIndex((project) => project.slug === slug);
  if (index < 0) return [];

  const size = projectPages.length;
  return Array.from({ length: Math.min(count, size - 1) }, (_, step) => {
    return projectPages[(index + step + 1) % size];
  });
}
