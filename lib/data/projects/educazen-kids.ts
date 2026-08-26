import type { ProjectCase } from "./types";

export const educazenKids: ProjectCase = {
  slug: "educazen-kids",
  client: "EducazenKids",
  year: "2024",
  category: { fr: "Éducation", en: "Education" },
  location: { fr: "Agadir, Maroc", en: "Agadir, Morocco" },

  hero: {
    statement: {
      fr: "Que le dehors ressemble au dedans.",
      en: "Make the outside feel like the inside.",
    },
    intro: {
      fr: "Un centre qui change la vie d'enfants tous les jours, avec une présence digitale qui n'en montrait rien. Nous avons rafraîchi la marque et mis les inscriptions sur rails.",
      en: "A centre changing children's lives daily, with a digital presence that showed none of it. We refreshed the brand and put enrolment on rails.",
    },
    image: "/work/educazen-hero.png",
    alt: {
      fr: "Le centre EducazenKids à Agadir",
      en: "The EducazenKids centre in Agadir",
    },
  },

  services: [
    {
      name: { fr: "Refonte de marque", en: "Brand Refresh" },
      note: {
        fr: "Une identité qui ressemble enfin à ce qui se passe à l'intérieur.",
        en: "An identity that finally looks like what happens inside.",
      },
    },
    {
      name: { fr: "Site web", en: "Website" },
      note: {
        fr: "Construit pour que les familles trouvent le centre d'elles-mêmes.",
        en: "Built so families find the centre on their own.",
      },
    },
    {
      name: { fr: "CRM", en: "CRM" },
      note: {
        fr: "Demandes, places et relances sur un seul tableau de bord.",
        en: "Enquiries, places and follow-ups on one dashboard.",
      },
    },
    {
      name: { fr: "Marketing", en: "Marketing" },
      note: {
        fr: "Une présence que les parents croisent vraiment.",
        en: "A presence parents actually come across.",
      },
    },
    { name: { fr: "Média payant", en: "Paid Media" } },
  ],

  transformation: {
    title: {
      fr: "D'inscriptions tenues à la main à un seul endroit qui gère l'admission et la réputation.",
      en: "From admissions run by hand to one place that handles enrolment and reputation together.",
    },
    text: [
      {
        fr: "Les familles peinaient à trouver le centre.",
        en: "Families struggled to find the centre.",
      },
      {
        fr: "L'équipe suivait les places sur papier.",
        en: "The team was tracking places on paper.",
      },
      {
        fr: "La refonte a aligné la marque sur la salle, et le système a mis l'inscription sur un seul chemin.",
        en: "The refresh aligned the brand with the room, and the system put enrolment on a single path.",
      },
      {
        fr: "Du premier clic à la place confirmée.",
        en: "From the first click to the confirmed place.",
      },
    ],
  },

  identity: {
    title: { fr: "Avant, et après", en: "Before, and after" },
    text: {
      fr: "Le seul projet où la refonte se montre en comparaison   l'ancienne marque à côté de la nouvelle, puis le système bâti dessus.",
      en: "The one project where the refresh can be shown as a comparison   the old mark beside the new one, then the system built on top.",
    },
    shots: [
      {
        image: "/work/educazenkids-before.png",
        alt: {
          fr: "L'identité EducazenKids avant la refonte",
          en: "The EducazenKids identity before the refresh",
        },
        label: { fr: "Avant", en: "Before" },
      },
      {
        image: "/work/educazenkids-after.png",
        alt: {
          fr: "L'identité EducazenKids après la refonte",
          en: "The EducazenKids identity after the refresh",
        },
        label: { fr: "Après", en: "After" },
      },
    ],
  },

  feature: {
    label: { fr: "Système d'inscription", en: "Enrolment System" },
    title: {
      fr: "La moitié du projet que personne ne voit de l'extérieur.",
      en: "The half of this project nobody sees from the outside.",
    },
    text: {
      fr: "Le tableau de bord depuis lequel l'équipe gère les admissions : les demandes qui arrivent, les places restantes, et les relances qui ne dépendent plus de la mémoire de quelqu'un.",
      en: "The dashboard the team runs admissions from: enquiries as they arrive, places left, and follow-ups that no longer depend on someone remembering.",
    },
    shots: [
      {
        image: "/work/educazenkids-crm.png",
        alt: { fr: "Le CRM EducazenKids", en: "The EducazenKids CRM" },
        label: { fr: "CRM", en: "CRM" },
      },
      {
        image: "/work/educazenkids-dashboard.png",
        alt: {
          fr: "Tableau de bord des inscriptions",
          en: "The enrolment dashboard",
        },
        label: { fr: "Système digital", en: "Digital System" },
      },
    ],
  },

  paletteStory: {
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
      {
        name: "Teal",
        hex: "#00897B",
        role: { fr: "Sérénité", en: "Calm" },
      },
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
        title: { fr: "La neuro-diversité, en couleur", en: "Neurodiversity, in colour" },
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
  work: [
    {
      image: "/work/educazenkids-web-desktop.png",
      alt: {
        fr: "Le site EducazenKids sur écran",
        en: "The EducazenKids site on desktop",
      },
      label: { fr: "Site web", en: "Website" },
    },
    {
      image: "/work/educazenkids-web-mobile.png",
      alt: {
        fr: "Le site EducazenKids sur téléphone",
        en: "The EducazenKids site on a phone",
      },
      label: { fr: "Mobile", en: "Mobile" },
    },
    {
      image: "/work/educazenkids-website-banner.png",
      alt: { fr: "Bannière EducazenKids", en: "EducazenKids banner" },
      label: { fr: "Campagne", en: "Campaign" },
    },
  ],

  gallery: [
    {
      image: "/work/educazenkids-logo.png",
      alt: { fr: "Logo EducazenKids", en: "EducazenKids logo" },
    },
    {
      image: "/work/educazenkids-brand-book.png",
      alt: { fr: "Livre de marque EducazenKids", en: "EducazenKids brand book" },
    },
    {
      image: "/work/educazenkids-brand-identity.png",
      alt: { fr: "Identité EducazenKids", en: "EducazenKids identity" },
    },
    {
      image: "/work/educazenkids-application.png",
      alt: { fr: "L'identité EducazenKids en situation", en: "The EducazenKids identity in place" },
    },
    {
      image: "/work/educazenkids-scroll-1.png",
      alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
    },
    {
      image: "/work/educazenkids-scroll-2.png",
      alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
    },
    {
      image: "/work/educazenkids-scroll-3.png",
      alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
    },
    {
      image: "/work/educazenkids-brand-logo-site.png",
      alt: { fr: "Le logo EducazenKids appliqué", en: "The EducazenKids logo applied" },
    },
    {
      image: "/work/educazenkids-cover.png",
      alt: { fr: "EducazenKids", en: "EducazenKids" },
    },
  ],
  outcome: {
    title: {
      fr: "Un centre que les familles trouvent seules, et une équipe qui ne court plus après l'administratif.",
      en: "A centre families find on their own, and a team no longer chasing admin.",
    },
    text: {
      fr: "L'inscription en ligne de bout en bout, un tableau de bord unique pour les demandes et les places, et une marque qui porte enfin la salle.",
      en: "Enrolment online end to end, one dashboard for enquiries and places, and a brand that finally carries the room.",
    },
    metric: "+62%",
  },
};
