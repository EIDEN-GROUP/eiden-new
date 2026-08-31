import type { ProjectCase } from "./types";

export const medicalBay: ProjectCase = {
  slug: "medical-bay",
  client: "Medical Bay",
  year: "2026",
  category: { fr: "Santé", en: "Healthcare" },
  location: { fr: "Agadir, Maroc", en: "Agadir, Morocco" },

  /** Slate #2A3A38, out of the brand book. */
  ground: "#2A3A38",

  hero: {
    statement: {
      fr: "Concevoir la clinique et son logiciel comme une seule chose.",
      en: "Design the clinic and its software as one thing.",
    },
    intro: {
      fr: "Un centre médical qui existait sur le papier   une vision claire, et rien dessous. Nous avons construit l'activité, la marque et le système ensemble.",
      en: "A medical centre that existed on paper   a clear vision, and nothing underneath it. We built the business, the brand and the system together.",
    },
    image: "/work/medical-bay/medical-bay-lobby.png",
    alt: {
      fr: "Le hall de la clinique Medical Bay",
      en: "The Medical Bay clinic lobby",
    },
  },

  fracture: {
    reality: [
      {
        fr: "Une vision claire du centre à ouvrir.",
        en: "A clear vision of the centre to open.",
      },
      {
        fr: "Des traitements que les patients cherchent séparément.",
        en: "Treatments patients search for separately.",
      },
      {
        fr: "Des patients qui viennent parfois de l'étranger.",
        en: "Patients who sometimes fly in.",
      },
    ],
    fracture: [
      {
        fr: "La clinique existait sur le papier.",
        en: "The clinic existed on paper.",
      },
      {
        fr: "Pas de marque, pas de parcours patient.",
        en: "No brand, no patient journey.",
      },
      { fr: "Pas de CRM, aucun tunnel.", en: "No CRM, no funnel." },
    ],
    statement: {
      fr: "La vision était claire. Il n'y avait rien dessous.",
      en: "The vision was clear. There was nothing underneath it.",
    },
  },

  architecture: {
    decision: {
      fr: "Concevoir l'espace et le logiciel comme un seul travail.",
      en: "Design the space and the software as one piece of work.",
    },
    chain: [
      { fr: "Architecture d'activité", en: "Business Architecture" },
      { fr: "Marque", en: "Brand" },
      { fr: "Site web", en: "Website" },
      { fr: "CRM", en: "CRM" },
      { fr: "Campagnes", en: "Campaigns" },
    ],
    text: {
      fr: "Le premier livrable n'était pas une maquette : c'était le chemin qu'un patient parcourt, de la recherche au suivi. La marque et l'espace physique ont été dessinés ensemble pour ce chemin-là. Le site en est la porte d'entrée, le tableau de bord la salle des machines. Et chaque traitement a sa campagne, sa page et sa preuve, parce qu'un implant et une facette ne se cherchent pas au même moment.",
      en: "The first deliverable was not a mockup: it was the path a patient walks, from search to follow-up. The brand and the physical space were drawn together for that path. The site is its front door, the dashboard its engine room. And each treatment has its own campaign, page and proof, because an implant and a veneer are not searched for at the same moment.",
    },
  },

  chapters: [
    {
      key: "business-architecture",
      labels: [{ fr: "Architecture d'activité", en: "Business Architecture" }],
      tone: "forest",
      title: {
        fr: "Le parcours patient dessiné avant le moindre pixel.",
        en: "The patient journey drawn before a single pixel.",
      },
      text: {
        fr: "Le premier livrable n'était pas une maquette : c'était le chemin qu'un patient parcourt, de la recherche au suivi, et la liste de ce que l'équipe doit tenir à chaque étape. Tout le reste   la marque, le site, l'écran de l'accueil   a été dessiné pour ce chemin-là.",
        en: "The first deliverable was not a mockup: it was the path a patient walks, from search to follow-up, and the list of what the team has to hold at every step. Everything after it   the brand, the site, the screen at the front desk   was drawn for that path.",
      },
    },
    {
      key: "branding",
      labels: [{ fr: "Branding", en: "Branding" }],
      tone: "canvas",
      title: {
        fr: "Le calme, avant le rendez-vous.",
        en: "Calm, before the appointment.",
      },
      text: {
        fr: "Medical Bay n'est pas une clinique : c'est le pont entre un patient et le bon spécialiste, et la marque devait porter cette confiance-là avant d'expliquer quoi que ce soit. Montserrat pour l'autorité, Cormorant en italique pour la part humaine, et un teal choisi contre le bleu clinique   une identité qui rassure en français, en anglais et en arabe.",
        en: "Medical Bay is not a clinic: it is the bridge between a patient and the right specialist, and the brand had to carry that trust before it explained anything. Montserrat for the authority, Cormorant italic for the human half, and a teal chosen against clinical blue   an identity that reassures in French, in English and in Arabic.",
      },
      shots: [
        {
          image: "/work/medical-bay/medical-bay-brand-logo-1.jpg",
          alt: {
            fr: "L'identité Medical Bay en application",
            en: "The Medical Bay identity applied",
          },
          label: { fr: "Logo", en: "Logo" },
        },
        {
          image: "/work/medical-bay/medical-bay-brand.png",
          alt: { fr: "L'identité Medical Bay", en: "The Medical Bay identity" },
          label: { fr: "Identité", en: "Identity" },
        },
        {
          image: "/work/medical-bay/medical-bay-reception.png",
          alt: {
            fr: "L'accueil de Medical Bay",
            en: "The Medical Bay reception",
          },
          label: { fr: "Accueil", en: "Reception" },
        },
      ],
      palette: {
        title: { fr: "Le langage visuel", en: "The visual language" },
        lead: {
          fr: "Un parcours de soin doit rassurer avant d'expliquer. La couleur s'en charge en premier.",
          en: "A care journey has to reassure before it explains. Colour does that first.",
        },
        colors: [
          {
            name: "Teal",
            hex: "#2BBAA5",
            role: { fr: "Signature", en: "Signature" },
          },
          {
            name: "Teal Profond",
            hex: "#1F9187",
            role: { fr: "Profondeur", en: "Depth" },
          },
          { name: "Mist", hex: "#E8F5F3", role: { fr: "Calme", en: "Calm" } },
          {
            name: "Encre",
            hex: "#0D1A18",
            role: { fr: "Ancrage", en: "Anchor" },
          },
        ],
        states: [
          {
            title: {
              fr: "Ce qu'on ressent en entrant",
              en: "What you feel walking in",
            },
            text: {
              fr: "Le teal est choisi contre le bleu clinique. Il rassure sans avoir l'air d'un hôpital, ce qui est exactement la distance que le patient cherche.",
              en: "The teal was chosen against clinical blue. It reassures without reading as a hospital, which is exactly the distance a patient is looking for.",
            },
            colorIndex: 0,
          },
          {
            title: {
              fr: "La hiérarchie, sans hausser le ton",
              en: "Hierarchy, without raising the voice",
            },
            text: {
              fr: "Le teal profond sépare ce qui compte de ce qui accompagne. Sur un parcours de soin, savoir où regarder en premier fait partie du soin.",
              en: "The deep teal separates what matters from what supports it. On a care journey, knowing where to look first is part of the care.",
            },
            colorIndex: 1,
          },
          {
            title: { fr: "L'espace autour", en: "The space around it" },
            text: {
              fr: "La brume est ce qui manque à la plupart des cliniques : du vide. Elle porte les formulaires, les fiches et l'attente sans les charger.",
              en: "Mist is what most clinics do without: emptiness. It carries the forms, the sheets and the waiting without weighing any of it down.",
            },
            colorIndex: 2,
          },
          {
            title: { fr: "Ce qui doit être lu", en: "What has to be read" },
            text: {
              fr: "L'encre est réservée à l'information dont dépend un rendez-vous. Elle n'est jamais décorative — dans une clinique, la lisibilité est une question de confiance.",
              en: "Ink is kept for the information an appointment depends on. It is never decorative: in a clinic, legibility is a question of trust.",
            },
            colorIndex: 3,
          },
          {
            title: {
              fr: "Une clinique, pas un cabinet",
              en: "A clinic, not a practice",
            },
            text: {
              fr: "L'ensemble tient de l'accueil au tableau de bord. C'est la même marque qui rassure le patient et qui structure l'écran de l'équipe.",
              en: "The set holds from the reception desk to the dashboard. The same brand reassures the patient and structures the team's screen.",
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
        fr: "La porte d'entrée du parcours, et l'écran qui le fait tourner.",
        en: "The front door of the journey, and the screen that runs it.",
      },
      text: {
        fr: "Devant, un site qui ne présente pas la clinique mais fait entrer dans le parcours : prendre rendez-vous, comprendre un traitement, savoir ce qui vient après. Derrière, le tableau de bord depuis lequel l'accueil suit rendez-vous, rappels et suivis. Les deux moitiés du même chemin, dessinées ensemble.",
        en: "In front, a site that does not introduce the clinic but opens the journey: booking, understanding a treatment, knowing what comes next. Behind it, the dashboard the front desk follows appointments, reminders and follow-ups from. Two halves of one path, drawn together.",
      },
      links: [
        {
          href: "https://medicalbay.vercel.app/",
          label: { fr: "Voir le site", en: "View the site" },
          kind: "site",
        },
      ],
      shots: [
        {
          image: "/work/medical-bay/medical-bay-web-desktop.png",
          alt: {
            fr: "Le site Medical Bay sur écran",
            en: "The Medical Bay site on desktop",
          },
          label: { fr: "Desktop", en: "Desktop" },
        },
        {
          image: "/work/medical-bay/medical-bay-web-mobile.png",
          fit: "contain",
          alt: {
            fr: "Le site Medical Bay sur téléphone",
            en: "The Medical Bay site on a phone",
          },
          label: { fr: "Mobile", en: "Mobile" },
        },
        {
          image: "/work/medical-bay/medical-bay-dashboard.png",
          alt: {
            fr: "Le tableau de bord Medical Bay",
            en: "The Medical Bay dashboard",
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
        fr: "Des campagnes par traitement, pas par saison.",
        en: "Campaigns per treatment, not per season.",
      },
      text: {
        fr: "Un implant, une facette et une couronne ne se décident pas de la même façon et ne se cherchent pas au même moment. Chaque traitement a donc sa campagne, sa page et sa preuve   y compris pour les patients qui viennent de l'étranger.",
        en: "An implant, a veneer and a crown are not decided the same way and are not searched for at the same moment. So each treatment has its own campaign, its own page and its own proof   including for the patients who fly in.",
      },
      shots: [
        {
          image: "/work/medical-bay/medical-bay-campaign-implant.png",
          alt: {
            fr: "Campagne Medical Bay   implants",
            en: "Medical Bay campaign   implants",
          },
          label: { fr: "Implants", en: "Implants" },
        },
        {
          image: "/work/medical-bay/medical-bay-campaign-veneer.png",
          alt: {
            fr: "Campagne Medical Bay   facettes",
            en: "Medical Bay campaign   veneers",
          },
          label: { fr: "Facettes", en: "Veneers" },
        },
        {
          image: "/work/medical-bay/medical-bay-campaign-zirconia.png",
          alt: {
            fr: "Campagne Medical Bay   zircone",
            en: "Medical Bay campaign   zirconia",
          },
          label: { fr: "Zircone", en: "Zirconia" },
        },
        {
          image: "/work/medical-bay/medical-bay-tourism-medical.png",
          alt: {
            fr: "Campagne tourisme médical Medical Bay",
            en: "Medical Bay medical tourism campaign",
          },
          label: { fr: "Tourisme médical", en: "Medical tourism" },
        },
      ],
    },
  ],

  impact: {
    title: {
      fr: "Une clinique qui tourne sur un système, plus sur des tableurs.",
      en: "A clinic that runs on a system instead of on spreadsheets.",
    },
    text: {
      fr: "Un parcours patient continu, une équipe qui travaille depuis un seul écran, et une marque qui rassure avant que quiconque ait poussé la porte.",
      en: "One continuous patient journey, a team working from a single screen, and a brand that reassures before anyone walks in.",
    },
    /* TODO(brand book): ce que « +120 » compte, sur quelle période, et ce que
       ça change pour la clinique. */
    metric: "+120",
  },

  work: [
    {
      image: "/work/medical-bay/medical-bay-brand-logo-3.png",
      alt: { fr: "Logo Medical Bay", en: "Medical Bay logo" },
    },
    {
      image: "/work/medical-bay/medical-bay-brand-reception-mockup.png",
      alt: { fr: "L'accueil Medical Bay", en: "The Medical Bay reception" },
    },
    {
      image: "/work/medical-bay/medical-bay-application.png",
      alt: {
        fr: "L'identité Medical Bay en situation",
        en: "The Medical Bay identity in place",
      },
    },
    {
      image: "/work/medical-bay/medical-bay-office.png",
      alt: {
        fr: "Un cabinet de Medical Bay",
        en: "A Medical Bay treatment room",
      },
    },
    {
      image: "/work/medical-bay/medical-bay-dental-campaign.png",
      alt: {
        fr: "Campagne dentaire Medical Bay",
        en: "Medical Bay dental campaign",
      },
    },
    {
      image: "/work/medical-bay/medical-bay-brand-logo-site.png",
      alt: {
        fr: "Le logo Medical Bay en ligne",
        en: "The Medical Bay logo online",
      },
    },
    {
      image: "/work/medical-bay/medical-bay-hero-flatlay.png",
      alt: { fr: "Medical Bay", en: "Medical Bay" },
    },
    {
      image: "/work/medical-bay/medical-bay-lobby.png",
      alt: { fr: "Le hall de Medical Bay", en: "The Medical Bay lobby" },
    },
  ],
};
