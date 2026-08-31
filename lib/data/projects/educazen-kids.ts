import type { ProjectCase } from "./types";

export const educazenKids: ProjectCase = {
  slug: "educazen-kids",
  client: "EducazenKids",
  year: "2024",
  category: { fr: "Éducation", en: "Education" },
  location: { fr: "Agadir, Maroc", en: "Agadir, Morocco" },

  /** Violet #7B1FA2, out of the brand book. */
  ground: "#7B1FA2",

  hero: {
    statement: {
      fr: "Que le dehors ressemble au dedans.",
      en: "Make the outside feel like the inside.",
    },
    intro: {
      fr: "Un centre qui change la vie d'enfants tous les jours, avec une présence digitale qui n'en montrait rien. Nous avons rafraîchi la marque et mis les inscriptions sur rails.",
      en: "A centre changing children's lives daily, with a digital presence that showed none of it. We refreshed the brand and put enrolment on rails.",
    },
    image: "/work/educazen-kids/educazen-hero.png",
    alt: {
      fr: "Le centre EducazenKids à Agadir",
      en: "The EducazenKids centre in Agadir",
    },
  },

  fracture: {
    reality: [
      {
        fr: "Un centre qui change la vie d'enfants tous les jours.",
        en: "A centre changing children's lives every day.",
      },
      {
        fr: "Des familles qui se parlent entre elles.",
        en: "Families who talk to each other.",
      },
      {
        fr: "Un nombre de places fini, dans un rayon de vingt minutes.",
        en: "A finite number of places, within a twenty-minute radius.",
      },
    ],
    fracture: [
      {
        fr: "Une présence digitale qui n'en montrait rien.",
        en: "A digital presence that showed none of it.",
      },
      {
        fr: "Des familles qui peinaient à trouver le centre.",
        en: "Families who struggled to find the centre.",
      },
      {
        fr: "Des places suivies sur papier.",
        en: "Places tracked on paper.",
      },
    ],
    statement: {
      fr: "Le dedans était juste. Le dehors ne lui ressemblait pas.",
      en: "The inside was right. The outside looked nothing like it.",
    },
  },

  architecture: {
    decision: {
      fr: "Aligner la marque sur la salle, et mettre l'inscription sur un seul chemin.",
      en: "Align the brand with the room, and put enrolment on a single path.",
    },
    chain: [
      { fr: "Marque", en: "Brand" },
      { fr: "Site web", en: "Website" },
      { fr: "CRM", en: "CRM" },
      { fr: "Contenu", en: "Content" },
      { fr: "Média payant", en: "Paid Media" },
    ],
    text: {
      fr: "La refonte a fait ressembler le dehors au dedans. Le site répond aux deux questions d'un parent avant de parler du centre. Derrière lui, le CRM compte les places et ne laisse plus les relances à la mémoire de quelqu'un. Le contenu a été construit pour être reconnu une deuxième fois plutôt que vu une première. Et le payant vise une ville, pas un pays   coupé dès que les places sont prises.",
      en: "The refresh made the outside look like the inside. The site answers a parent's two questions before it talks about the centre. Behind it, the CRM counts the places and no longer leaves follow-ups to someone's memory. Content was built to be recognised a second time rather than seen a first. And the paid spend is aimed at one city, not one country   switched off the moment the places are taken.",
    },
  },

  chapters: [
    {
      key: "brand-refresh",
      labels: [{ fr: "Refonte de marque", en: "Brand Refresh" }],
      tone: "forest",
      title: {
        fr: "Une identité qui ressemble enfin à ce qui se passe à l'intérieur.",
        en: "An identity that finally looks like what happens inside.",
      },
      text: {
        fr: "Le seul projet du portfolio où la refonte peut se montrer en comparaison : l'ancienne marque à côté de la nouvelle. Le cœur-puzzle vient du centre lui-même   quatre pièces différentes, et c'est ce qui le rend entier. Il vit seul en avatar, en favicon et en filigrane à trois pour cent, toujours sans le slogan, et jamais sur un fond sombre.",
        en: "The one project in this portfolio where the refresh can be shown as a comparison: the old mark beside the new one. The puzzle heart came out of the centre itself   four different pieces, which is what makes it whole. It stands alone as an avatar, a favicon and a three per cent watermark, always without the strapline, and never on a dark ground.",
      },
      shots: [
        {
          image: "/work/educazen-kids/educazenkids-before.png",
          alt: {
            fr: "L'identité EducazenKids avant la refonte",
            en: "The EducazenKids identity before the refresh",
          },
          label: { fr: "Avant", en: "Before" },
        },
        {
          image: "/work/educazen-kids/educazenkids-after.png",
          alt: {
            fr: "L'identité EducazenKids après la refonte",
            en: "The EducazenKids identity after the refresh",
          },
          label: { fr: "Après", en: "After" },
        },
        {
          image: "/work/educazen-kids/educazenkids-logo.png",
          alt: { fr: "Logo EducazenKids", en: "EducazenKids logo" },
          label: { fr: "Logo", en: "Logo" },
        },
        {
          image: "/work/educazen-kids/educazenkids-brand-identity.png",
          alt: { fr: "Identité EducazenKids", en: "EducazenKids identity" },
          label: { fr: "Système", en: "System" },
        },
      ],
      palette: {
        title: { fr: "Le langage visuel", en: "The visual language" },
        lead: {
          fr: "Quatre couleurs, quatre promesses — une par pièce du cœur-puzzle.",
          en: "Four colours, four promises — one for each piece of the puzzle heart.",
        },
        colors: [
          {
            name: "Magenta",
            hex: "#C2185B",
            role: { fr: "Signature", en: "Signature" },
          },
          {
            name: "Violet",
            hex: "#7B1FA2",
            role: { fr: "Créativité", en: "Creativity" },
          },
          { name: "Teal", hex: "#00897B", role: { fr: "Sérénité", en: "Calm" } },
          {
            name: "Or",
            hex: "#F9A825",
            role: { fr: "Optimisme", en: "Optimism" },
          },
        ],
        states: [
          {
            title: { fr: "La pièce qui commence", en: "The piece that starts it" },
            text: {
              fr: "Le magenta porte l'énergie et la passion éducative. C'est la couleur de la silhouette d'enfant, et la première chose qu'un parent retient.",
              en: "Magenta carries the energy and the teaching passion. It is the colour of the child in the mark, and the first thing a parent keeps.",
            },
            colorIndex: 0,
          },
          {
            title: {
              fr: "La neuro-diversité, en couleur",
              en: "Neurodiversity, in colour",
            },
            text: {
              fr: "Le violet dit la créativité et l'imagination. Dans un centre qui accueille des profils HPI, TDAH, DYS et TSA, il représente la façon dont chacun pense autrement.",
              en: "Violet is creativity and imagination. In a centre built for HPI, ADHD, dyslexic and autistic profiles, it stands for each child thinking differently.",
            },
            colorIndex: 1,
          },
          {
            title: { fr: "Le zen du nom", en: "The zen in the name" },
            text: {
              fr: "Le teal est l'équilibre — littéralement le « zen » d'EducazenKids. Il calme ce que le magenta a d'intense et rend l'ensemble tenable au quotidien.",
              en: "Teal is the balance — literally the “zen” in EducazenKids. It settles what magenta makes intense and keeps the set liveable day to day.",
            },
            colorIndex: 2,
          },
          {
            title: { fr: "Le potentiel", en: "The potential" },
            text: {
              fr: "L'or, c'est la lumière et l'optimisme : le progrès d'un enfant, célébré. Il n'apparaît jamais en fond, seulement là où il y a quelque chose à saluer.",
              en: "Gold is light and optimism — a child's progress, marked. It never becomes a ground, only an accent where there is something to acknowledge.",
            },
            colorIndex: 3,
          },
          {
            title: { fr: "Chaque pièce, un enfant", en: "Every piece, a child" },
            text: {
              fr: "Les quatre ne se hiérarchisent pas. C'est le principe : le cœur-puzzle n'est complet que parce que les pièces sont différentes.",
              en: "None of the four outranks the others. That is the principle: the puzzle heart is only whole because its pieces are different.",
            },
            colorIndex: 0,
          },
        ],
      },
    },
    {
      key: "platform",
      labels: [
        { fr: "Site web", en: "Website" },
        { fr: "CRM", en: "CRM" },
      ],
      tone: "ink",
      title: {
        fr: "Une seule route, du premier clic à la place confirmée.",
        en: "One route, from the first click to the confirmed place.",
      },
      text: {
        fr: "Devant, un site qui répond aux deux questions d'un parent avant de parler du centre : est-ce qu'on prend un profil comme le sien, et combien de temps il faut attendre. Derrière, le tableau de bord où arrivent les demandes, où se comptent les places, et où les relances ne dépendent plus de la mémoire de quelqu'un.",
        en: "In front, a site that answers a parent's two questions before it talks about the centre: is a profile like theirs taken, and how long is the wait. Behind it, the dashboard where enquiries land, places are counted, and follow-ups no longer depend on someone remembering.",
      },
      links: [
        {
          href: "https://educazenkids.com",
          label: { fr: "Voir le site", en: "View the site" },
          kind: "site",
        },
      ],
      shots: [
        {
          image: "/work/educazen-kids/educazenkids-web-desktop.png",
          alt: {
            fr: "Le site EducazenKids sur écran",
            en: "The EducazenKids site on desktop",
          },
          label: { fr: "Desktop", en: "Desktop" },
        },
        {
          image: "/work/educazen-kids/educazenkids-web-mobile.png",
          fit: "contain",
          alt: {
            fr: "Le site EducazenKids sur téléphone",
            en: "The EducazenKids site on a phone",
          },
          label: { fr: "Mobile", en: "Mobile" },
        },
        {
          image: "/work/educazen-kids/educazenkids-crm.png",
          alt: { fr: "Le CRM EducazenKids", en: "The EducazenKids CRM" },
          label: { fr: "CRM", en: "CRM" },
        },
        {
          image: "/work/educazen-kids/educazenkids-dashboard.png",
          alt: {
            fr: "Tableau de bord des inscriptions",
            en: "The enrolment dashboard",
          },
          label: { fr: "Tableau de bord", en: "Dashboard" },
        },
      ],
    },
    {
      key: "marketing",
      labels: [{ fr: "Marketing", en: "Marketing" }],
      tone: "canvas",
      title: {
        fr: "Une présence que les parents croisent vraiment.",
        en: "A presence parents actually come across.",
      },
      text: {
        fr: "Les familles concernées ne se trouvent pas par volume : elles se parlent entre elles, dans des groupes, autour d'une école. La présence a donc été construite pour être reconnue une deuxième fois plutôt que vue une première.",
        en: "The families this matters to are not found by volume: they talk to each other, in groups, around a school. So the presence was built to be recognised a second time rather than seen a first.",
      },
      shots: [
        {
          image: "/work/educazen-kids/educazenkids-website-banner.png",
          alt: { fr: "Bannière EducazenKids", en: "EducazenKids banner" },
          label: { fr: "Campagne", en: "Campaign" },
        },
        {
          image: "/work/educazen-kids/educazenkids-application.png",
          alt: {
            fr: "L'identité EducazenKids en situation",
            en: "The EducazenKids identity in place",
          },
          label: { fr: "Application", en: "Application" },
        },
      ],
      blocks: [
        {
          key: "paid-media",
          labels: [{ fr: "Média payant", en: "Paid Media" }],
          title: {
            fr: "Un budget qui vise une ville, pas un pays.",
            en: "A budget aimed at one city, not one country.",
          },
          text: {
            fr: "Le centre a un nombre de places fini et un rayon d’une vingtaine de minutes en voiture. Le payant est réglé sur cette contrainte-là : peu de portée, beaucoup d’intention, et coupé dès que les places sont prises. Les familles trouvent le centre seules, et l’équipe ne court plus après l’administratif.",
            en: "The centre has a finite number of places and a radius of about twenty minutes by car. The paid spend is tuned to that constraint: little reach, a lot of intent, and switched off the moment the places are taken. Families find the centre on their own, and the team is no longer chasing admin.",
          },
        },
      ],
    },
  ],

  impact: {
    title: {
      fr: "Du premier clic à la place confirmée.",
      en: "From the first click to the confirmed place.",
    },
    text: {
      fr: "Une marque qui ressemble enfin à ce qui se passe à l'intérieur, une inscription qui tient sur un seul chemin, et une équipe qui ne court plus après l'administratif.",
      en: "A brand that finally looks like what happens inside, enrolment held on a single path, and a team no longer chasing admin.",
    },
    metric: "+62%",
    rows: [
      {
        metric: "+62%",
        /* TODO(brand book): ce que le chiffre compte, et sur quelle période. */
        measures: null,
        period: null,
        meaning: {
          fr: "Les familles trouvent le centre seules.",
          en: "Families find the centre on their own.",
        },
      },
    ],
  },

  work: [
    {
      image: "/work/educazen-kids/educazenkids-brand-book.png",
      alt: { fr: "Livre de marque EducazenKids", en: "EducazenKids brand book" },
    },
    {
      image: "/work/educazen-kids/educazenkids-scroll-1.png",
      alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
    },
    {
      image: "/work/educazen-kids/educazenkids-scroll-2.png",
      alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
    },
    {
      image: "/work/educazen-kids/educazenkids-scroll-3.png",
      alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
    },
    {
      image: "/work/educazen-kids/educazenkids-brand-logo-site.png",
      alt: {
        fr: "Le logo EducazenKids appliqué",
        en: "The EducazenKids logo applied",
      },
    },
    {
      image: "/work/educazen-kids/educazenkids-web.png",
      alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
    },
    {
      image: "/work/educazen-kids/educazenkids-cover.png",
      alt: { fr: "EducazenKids", en: "EducazenKids" },
    },
  ],
};
