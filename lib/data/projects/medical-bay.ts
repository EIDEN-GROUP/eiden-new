import type { ProjectCase } from "./types";

export const medicalBay: ProjectCase = {
  slug: "medical-bay",
  client: "Medical Bay",
  year: "2026",
  category: { fr: "Santé", en: "Healthcare" },
  location: { fr: "Agadir, Maroc", en: "Agadir, Morocco" },

  hero: {
    statement: {
      fr: "Concevoir la clinique et son logiciel comme une seule chose.",
      en: "Design the clinic and its software as one thing.",
    },
    intro: {
      fr: "Un centre médical qui existait sur le papier   une vision claire, et rien dessous. Nous avons construit l'activité, la marque et le système ensemble.",
      en: "A medical centre that existed on paper   a clear vision, and nothing underneath it. We built the business, the brand and the system together.",
    },
    image: "/work/medical-bay-lobby.png",
    alt: {
      fr: "Le hall de la clinique Medical Bay",
      en: "The Medical Bay clinic lobby",
    },
  },

  services: [
    {
      name: { fr: "Architecture d'activité", en: "Business Architecture" },
      note: {
        fr: "Le parcours patient dessiné avant le moindre pixel.",
        en: "The patient journey designed before the pixels.",
      },
    },
    {
      name: { fr: "Branding", en: "Branding" },
      note: {
        fr: "Une identité qui rassure avant le premier rendez-vous.",
        en: "An identity that reassures before the first appointment.",
      },
    },
    {
      name: { fr: "Site web", en: "Website" },
      note: {
        fr: "La porte d'entrée du parcours, pas une brochure.",
        en: "The front door of the journey, not a brochure.",
      },
    },
    {
      name: { fr: "CRM", en: "CRM" },
      note: {
        fr: "Rendez-vous et suivis sur un seul écran.",
        en: "Appointments and follow-ups on a single screen.",
      },
    },
    {
      name: { fr: "Marketing", en: "Marketing" },
      note: {
        fr: "Des campagnes par traitement, pas par saison.",
        en: "Campaigns per treatment, not per season.",
      },
    },
  ],

  transformation: {
    title: {
      fr: "D'une clinique sur le papier à une clinique qui tourne sur un système.",
      en: "From a clinic on paper to a clinic running on a system.",
    },
    text: [
      {
        fr: "Pas de marque, pas de parcours patient, pas de CRM, aucun tunnel.",
        en: "No brand, no patient journey, no CRM, no funnel.",
      },
      {
        fr: "La clinique existait sur le papier.",
        en: "The clinic existed on paper.",
      },
      {
        fr: "Nous avons conçu l'espace et le logiciel comme un seul travail.",
        en: "We designed the space and the software as one piece of work.",
      },
      {
        fr: "L'équipe suit maintenant chaque rendez-vous depuis un écran, et le patient voit un chemin continu.",
        en: "The team now follows every appointment from one screen, and the patient sees one continuous path.",
      },
    ],
  },

  identity: {
    title: {
      fr: "Le calme, avant le rendez-vous",
      en: "Calm, before the appointment",
    },
    text: {
      fr: "La marque, et l'espace physique avec lequel elle a été dessinée   les deux ont été pensés ensemble, et c'est ce que le patient rencontre en premier.",
      en: "The mark, and the physical space it was designed alongside   the two were drawn together, and they are the first thing a patient meets.",
    },
    shots: [
      {
        image: "/work/medical-bay-brand-application.png",
        alt: {
          fr: "L'identité Medical Bay en application",
          en: "The Medical Bay identity applied",
        },
        label: { fr: "Logo", en: "Logo" },
      },
      {
        image: "/work/medical-bay-reception.png",
        alt: {
          fr: "L'accueil de Medical Bay",
          en: "The Medical Bay reception",
        },
        label: { fr: "Application", en: "Application" },
      },
    ],
  },

  feature: {
    label: { fr: "Système d'exploitation", en: "Business System" },
    title: {
      fr: "Un parcours patient dessiné de bout en bout, et l'écran qui le fait tourner.",
      en: "A patient journey drawn end to end, and the screen that runs it.",
    },
    text: {
      fr: "C'est la partie qui rend l'architecture d'activité lisible : le tableau de bord depuis lequel l'accueil suit les rendez-vous, les rappels et les suivis, au lieu d'un classeur et d'un téléphone.",
      en: "This is the part that makes the business architecture legible: the dashboard the front desk follows appointments, reminders and follow-ups from, instead of a binder and a phone.",
    },
    shots: [
      {
        image: "/work/medical-bay-dashboard.png",
        alt: {
          fr: "Le tableau de bord Medical Bay",
          en: "The Medical Bay dashboard",
        },
        label: { fr: "CRM", en: "CRM" },
      },
    ],
  },

  paletteStory: {
    title: { fr: "Le langage visuel", en: "The visual language" },
    lead: {
      fr: "Une clinique doit rassurer avant d'expliquer. La couleur s'en charge en premier.",
      en: "A clinic has to reassure before it explains. Colour does that first.",
    },
    colors: [
      {
        name: "Teal",
        hex: "#2BBAA5",
        role: { fr: "Signature", en: "Signature" },
      },
      {
        name: "Teal Deep",
        hex: "#1F9187",
        role: { fr: "Profondeur", en: "Depth" },
      },
      {
        name: "Mist",
        hex: "#E8F5F3",
        role: { fr: "Calme", en: "Calm" },
      },
      {
        name: "Ink",
        hex: "#0D1A18",
        role: { fr: "Ancrage", en: "Anchor" },
      },
    ],
    states: [
      {
        title: { fr: "Ce qu'on ressent en entrant", en: "What you feel walking in" },
        text: {
          fr: "Le teal est choisi contre le bleu clinique. Il rassure sans avoir l'air d'un hôpital, ce qui est exactement la distance que le patient cherche.",
          en: "The teal was chosen against clinical blue. It reassures without reading as a hospital, which is exactly the distance a patient is looking for.",
        },
        colorIndex: 0,
      },
      {
        title: { fr: "La hiérarchie, sans hausser le ton", en: "Hierarchy, without raising the voice" },
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
        title: { fr: "Une clinique, pas un cabinet", en: "A clinic, not a practice" },
        text: {
          fr: "L'ensemble tient de l'accueil au tableau de bord. C'est la même marque qui rassure le patient et qui structure l'écran de l'équipe.",
          en: "The set holds from the reception desk to the dashboard. The same brand reassures the patient and structures the team's screen.",
        },
        colorIndex: 0,
      },
    ],
  },
  work: [
    {
      image: "/work/medical-bay-web-desktop.png",
      alt: {
        fr: "Le site Medical Bay sur écran",
        en: "The Medical Bay site on desktop",
      },
      label: { fr: "Site web", en: "Website" },
    },
    {
      image: "/work/medical-bay-web-mobile.png",
      alt: {
        fr: "Le site Medical Bay sur téléphone",
        en: "The Medical Bay site on a phone",
      },
      label: { fr: "Mobile", en: "Mobile" },
    },
    {
      image: "/work/medical-bay-campaign-implant.png",
      alt: {
        fr: "Campagne Medical Bay   implants",
        en: "Medical Bay campaign   implants",
      },
      label: { fr: "Campagne", en: "Campaign" },
    },
    {
      image: "/work/medical-bay-campaign-veneer.png",
      alt: {
        fr: "Campagne Medical Bay   facettes",
        en: "Medical Bay campaign   veneers",
      },
      label: { fr: "Campagne", en: "Campaign" },
    },
    {
      image: "/work/medical-bay-office.png",
      alt: { fr: "Un cabinet de Medical Bay", en: "A Medical Bay treatment room" },
      label: { fr: "Application", en: "Application" },
    },
  ],

  gallery: [
    {
      image: "/work/medical-bay-brand.png",
      alt: { fr: "Identité Medical Bay", en: "Medical Bay identity" },
    },
    {
      image: "/work/medical-bay-brand-logo-3.png",
      alt: { fr: "Logo Medical Bay", en: "Medical Bay logo" },
    },
    {
      image: "/work/medical-bay-brand-reception-mockup.png",
      alt: { fr: "L'accueil Medical Bay", en: "The Medical Bay reception" },
    },
    {
      image: "/work/medical-bay-application.png",
      alt: { fr: "L'identité Medical Bay en situation", en: "The Medical Bay identity in place" },
    },
    {
      image: "/work/medical-bay-campaign-zirconia.png",
      alt: { fr: "Campagne Medical Bay — zircone", en: "Medical Bay campaign — zirconia" },
    },
    {
      image: "/work/medical-bay-dental-campaign.png",
      alt: { fr: "Campagne dentaire Medical Bay", en: "Medical Bay dental campaign" },
    },
    {
      image: "/work/medical-bay-tourism-medical.png",
      alt: { fr: "Tourisme médical Medical Bay", en: "Medical Bay medical tourism" },
    },
    {
      image: "/work/medical-bay-hero-flatlay.png",
      alt: { fr: "Medical Bay", en: "Medical Bay" },
    },
  ],
  outcome: {
    title: {
      fr: "Une clinique qui tourne sur un système, plus sur des tableurs.",
      en: "A clinic that runs on a system instead of on spreadsheets.",
    },
    text: {
      fr: "Un parcours patient continu, une équipe qui travaille depuis un seul écran, et une marque qui rassure avant que quiconque ait poussé la porte.",
      en: "One continuous patient journey, a team working from a single screen, and a brand that reassures before anyone walks in.",
    },
    metric: "+120",
  },
};
