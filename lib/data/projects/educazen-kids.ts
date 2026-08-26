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
      fr: "Le seul projet où la refonte se montre en comparaison — l'ancienne marque à côté de la nouvelle, puis le système bâti dessus.",
      en: "The one project where the refresh can be shown as a comparison — the old mark beside the new one, then the system built on top.",
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
