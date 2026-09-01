import type { StaticImageData } from "next/image";
import type { Localized } from "@/lib/data/localized";

import gestioMockup from "@/public/solutions/gestion-mockup.png";
import kavoMockup from "@/public/solutions/kavo-mockup.png";
import scholnexaMockup from "@/public/solutions/schoolnexa-mockup.png";
import stayDeskMockup from "@/public/solutions/staydesk-mockup.png";

export type SystemRecord = {
  slug: string;
  number: string;
  name: string;
  category: Localized;
  tagline: Localized;
  description: Localized;
  url: string;
  audience: Localized[];
  capabilities: { group?: Localized; items: Localized[] }[];
  /** A raw capture, shown in browser chrome. Used only without a `mockup`. */
  screenshot?: string;
  /**
   * An art-directed composition of the product, shown whole.
   *
   * Imported rather than pathed so its dimensions travel with it: the frame
   * reserves the right box before the file lands, and swapping in art of a
   * different shape needs no second edit.
   */
  mockup?: StaticImageData;
};

export const systems: SystemRecord[] = [
  {
    slug: "gestio",
    number: "01",
    name: "Gestio",
    category: { fr: "Centres spécialisés", en: "Specialised centres" },
    tagline: {
      fr: "Le système d'exploitation des centres spécialisés.",
      en: "The operating system for specialised centres.",
    },
    description: {
      fr: "Les dossiers, les paiements et les rendez-vous d'un centre, réunis sur un seul tableau de bord au lieu d'un classeur Excel et d'un groupe WhatsApp.",
      en: "A centre's records, payments and appointments on one dashboard instead of a spreadsheet and a WhatsApp group.",
    },
    url: "https://demo.eiden-group.com/",
    audience: [
      { fr: "Centres spécialisés", en: "Specialised centres" },
      { fr: "Éducation", en: "Education" },
      { fr: "Services de soin", en: "Care services" },
    ],
    capabilities: [
      {
        items: [
          { fr: "Tableau de bord", en: "Dashboard" },
          { fr: "Dossiers", en: "Records" },
          { fr: "Paiements", en: "Payments" },
          { fr: "Rendez-vous", en: "Appointments" },
          { fr: "Équipe", en: "Team" },
          { fr: "Planifications", en: "Planning" },
        ],
      },
    ],
    mockup: gestioMockup,
  },
  {
    slug: "scholnexa",
    number: "02",
    name: "Scholnexa",
    category: { fr: "Écoles", en: "Schools" },
    tagline: {
      fr: "Une façon plus claire de gérer une école.",
      en: "A smarter way to manage education.",
    },
    description: {
      fr: "Une plateforme de gestion scolaire, pensée pour les organismes de formation et les équipes pédagogiques.",
      en: "A school management platform, built for training organisations and academic teams.",
    },
    url: "https://scholnexa.vercel.app/dashboard",
    audience: [
      { fr: "Écoles", en: "Schools" },
      { fr: "Organismes de formation", en: "Educational organisations" },
      { fr: "Équipes pédagogiques", en: "Academic teams" },
    ],
    /* The product sits behind a login, so this list is read off the capture
       beside it rather than the live app: its own section labels (Scolarité,
       Finances), page titles and dashboard tiles. Keep the two in step   if
       the mockup is replaced, these are the names that have to match it. */
    capabilities: [
      {
        items: [
          { fr: "Vue d'ensemble", en: "Overview" },
          { fr: "Étudiants", en: "Students" },
          { fr: "Filières", en: "Programmes" },
          { fr: "Emploi du temps", en: "Timetable" },
          { fr: "Examens", en: "Exams" },
          { fr: "Paiements", en: "Payments" },
        ],
      },
    ],
    mockup: scholnexaMockup,
  },
  {
    slug: "kavo",
    number: "03",
    name: "Kavo",
    category: { fr: "Immobilier", en: "Real estate" },
    tagline: {
      fr: "Un système, deux métiers de votre agence immobilière.",
      en: "One system for both sides of a property business.",
    },
    description: {
      fr: "Le CRM qui pilote les ventes et l'ERP qui gère l'arrière-boutique, dans un seul produit et sous un seul compte.",
      en: "The CRM that runs the sales floor and the ERP that runs the back office, in one product under one account.",
    },
    url: "https://kavo-ops.vercel.app/",
    audience: [
      { fr: "Agences immobilières", en: "Real estate agencies" },
      { fr: "Équipes de gestion", en: "Property teams" },
      { fr: "Opérateurs en croissance", en: "Growing operators" },
    ],
    capabilities: [
      {
        group: { fr: "CRM", en: "CRM" },
        items: [
          { fr: "Biens", en: "Properties" },
          { fr: "Prospects", en: "Leads" },
          { fr: "Offres", en: "Offers" },
          { fr: "Agents", en: "Agents" },
        ],
      },
      {
        group: { fr: "ERP", en: "ERP" },
        items: [
          { fr: "Stock", en: "Inventory" },
          { fr: "Achats", en: "Purchases" },
          { fr: "Facturation", en: "Invoicing" },
          { fr: "Personnel", en: "HR" },
        ],
      },
    ],
    mockup: kavoMockup,
  },
  {
    slug: "staydesk",
    number: "04",
    name: "StayDesk",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    tagline: {
      fr: "Le système d'exploitation de l'hébergement moderne.",
      en: "The operating system for modern stays.",
    },
    description: {
      fr: "Toute la propriété dans un seul système : réservations, réception, profils clients, facturation, ménage et tarifs. Rien à installer.",
      en: "A whole property in one system: reservations, front desk, guest profiles, billing, housekeeping and rates. Nothing to install.",
    },
    url: "https://operaflow.eiden-group.com/",
    audience: [
      { fr: "Hôtels indépendants", en: "Independent hotels" },
      { fr: "Maisons d'hôtes", en: "Guest houses" },
      { fr: "Hébergements de charme", en: "Boutique stays" },
      { fr: "Groupes multi-sites", en: "Multi-property teams" },
    ],
    capabilities: [
      {
        items: [
          { fr: "Réservations", en: "Reservations" },
          { fr: "Profils clients", en: "Guest profiles" },
          { fr: "Facturation", en: "Folio & billing" },
          { fr: "Ménage", en: "Housekeeping" },
          { fr: "Tarifs & revenus", en: "Rates & revenue" },
          { fr: "Moteur de réservation", en: "Booking engine" },
        ],
      },
    ],
    mockup: stayDeskMockup,
  },
];

export const solutionsCopy = {
  hero: {
    eyebrow: { fr: "Nos systèmes", en: "Our systems" },
    /* Split for the film hero, which raises the title a word at a time and
       rules the accented one in gold. Same three parts the about page uses. */
    titleLead: { fr: "Des", en: "" },
    titleAccent: { fr: "systèmes", en: "Systems" },
    titleTail: {
      fr: "construits autour de votre métier.",
      en: "built around your business.",
    },
    lead: {
      fr: "Nous concevons et construisons des systèmes digitaux qui réunissent vos opérations, vos informations et vos équipes au même endroit.",
      en: "We design and build digital systems that bring your operations, information and teams into one place.",
    },
    cta: { fr: "Découvrir nos systèmes", en: "Explore our systems" },
  },

  intro: {
    eyebrow: { fr: "Le point de départ", en: "The starting point" },
    title: {
      fr: "Nous ne faisons pas que du logiciel.",
      en: "We don't just build software.",
    },
    problem: [
      {
        fr: "La plupart des entreprises ont déjà assez d'outils.",
        en: "Most businesses already have enough tools.",
      },
      {
        fr: "Le problème, c'est qu'ils ne se parlent pas.",
        en: "The problem is that they don't talk to each other.",
      },
      {
        fr: "L'information est partout.",
        en: "Information is everywhere.",
      },
      {
        fr: "Les équipes passent d'une plateforme à l'autre.",
        en: "Teams switch between different platforms.",
      },
      {
        fr: "Les tâches importantes dépendent encore du travail manuel.",
        en: "Important tasks still depend on manual work.",
      },
    ],
    turn: {
      fr: "Nous construisons le système autour de l'entreprise elle-même.",
      en: "We build systems around the business itself.",
    },
    answer: [
      { fr: "Un seul flux de travail.", en: "One workflow." },
      { fr: "Une seule source de vérité.", en: "One source of truth." },
      { fr: "Un seul endroit pour travailler.", en: "One place to operate." },
    ],
  },

  systems: {
    eyebrow: { fr: "Nos systèmes", en: "Our systems" },
    title: {
      fr: "Une philosophie. Quatre systèmes.",
      en: "One philosophy. Four systems.",
    },
    explore: { fr: "Découvrir", en: "Explore" },
    builtFor: { fr: "Conçu pour", en: "Built for" },
    inside: { fr: "Dans le système", en: "Inside the system" },
    /* Shown in place of a capability list when a product is not public. */
    privateNote: {
      fr: "Accès sur demande.",
      en: "Access on request.",
    },
  },

  shift: {
    title: {
      fr: "De l'éparpillé au connecté.",
      en: "From scattered to connected.",
    },
    beforeLabel: { fr: "Éparpillé", en: "Scattered" },
    afterLabel: { fr: "Connecté", en: "Connected" },
    before: [
      { fr: "Excel", en: "Excel" },
      { fr: "WhatsApp", en: "WhatsApp" },
      { fr: "Relances manuelles", en: "Manual follow-ups" },
      { fr: "Des outils différents", en: "Different tools" },
      { fr: "L'information partout", en: "Information everywhere" },
    ],
    after: [
      { fr: "Un seul système", en: "One system" },
      { fr: "Des flux connectés", en: "Connected workflows" },
      { fr: "Des données centralisées", en: "Centralised data" },
      { fr: "Des tâches automatisées", en: "Automated tasks" },
      { fr: "Une visibilité claire", en: "Clear visibility" },
    ],
  },

  process: {
    title: {
      fr: "Construit autour de votre façon de travailler.",
      en: "Built around the way you work.",
    },
    lead: {
      fr: "Pas un logiciel générique auquel il faudrait s'adapter.",
      en: "Not generic software you have to bend yourself around.",
    },
    steps: [
      {
        title: { fr: "Comprendre", en: "Understand" },
        text: {
          fr: "Le flux de travail, l'équipe, les données et ce qui bloque.",
          en: "The workflow, the team, the data and what gets stuck.",
        },
      },
      {
        title: { fr: "Structurer", en: "Structure" },
        text: {
          fr: "Des processus compliqués transformés en système clair.",
          en: "Complicated processes turned into a clear system.",
        },
      },
      {
        title: { fr: "Concevoir", en: "Design" },
        text: {
          fr: "Une interface que l'équipe prend en main sans formation.",
          en: "An interface the team picks up without training.",
        },
      },
      {
        title: { fr: "Construire", en: "Build" },
        text: {
          fr: "Un produit utilisable, et prêt à grandir.",
          en: "A product that works, and is ready to grow.",
        },
      },
      {
        title: { fr: "Faire évoluer", en: "Evolve" },
        text: {
          fr: "Le système suit l'entreprise, année après année.",
          en: "The system follows the business, year after year.",
        },
      },
    ],
  },

  layers: {
    title: {
      fr: "Un système. Plusieurs couches.",
      en: "One system. Many layers.",
    },
    modules: [
      {
        title: { fr: "CRM", en: "CRM" },
        text: {
          fr: "Gérer les prospects, les contacts et les opportunités.",
          en: "Manage leads, contacts and opportunities.",
        },
      },
      {
        title: { fr: "Opérations", en: "Operations" },
        text: {
          fr: "Suivre le travail quotidien au même endroit.",
          en: "Follow the daily work in one place.",
        },
      },
      {
        title: { fr: "Finance", en: "Finance" },
        text: {
          fr: "Suivre les paiements, les factures et l'activité financière.",
          en: "Track payments, invoices and financial activity.",
        },
      },
      {
        title: { fr: "Planification", en: "Planning" },
        text: {
          fr: "Organiser les rendez-vous, les plannings et les ressources.",
          en: "Organise appointments, schedules and resources.",
        },
      },
      {
        title: { fr: "Équipes", en: "Teams" },
        text: {
          fr: "Donner à chacun le bon accès et la bonne vue.",
          en: "Give each person the right access and the right view.",
        },
      },
      {
        title: { fr: "Analytique", en: "Analytics" },
        text: {
          fr: "Voir ce qui avance, et ce qui bloque.",
          en: "See what is moving, and what is stuck.",
        },
      },
      {
        title: { fr: "Expérience client", en: "Customer experience" },
        text: {
          fr: "Tenir le fil du premier contact jusqu'au suivi.",
          en: "Hold the thread from first contact to follow-up.",
        },
      },
      {
        title: { fr: "Modules sur mesure", en: "Custom modules" },
        text: {
          fr: "Ce que votre métier a en plus, et personne d'autre.",
          en: "Whatever your business has that nobody else does.",
        },
      },
    ],
  },

  local: {
    title: {
      fr: "Construit pour la façon dont on travaille ici.",
      en: "Built for the way business works here.",
    },
    text: {
      fr: "Nos systèmes sont dessinés autour de flux réels, d'équipes locales et de contraintes qui existent vraiment. Mais ils sont construits avec les standards produit d'aujourd'hui.",
      en: "Our systems are designed around real workflows, local teams and real operational constraints. But they are built to modern product standards.",
    },
    statement: {
      fr: "Réalité locale. Pensée produit globale.",
      en: "Local reality. Global product thinking.",
    },
  },

  custom: {
    title: {
      fr: "Votre activité n'entre pas dans un modèle.",
      en: "Your business doesn't fit a template.",
    },
    text: {
      fr: "Nous pouvons concevoir et construire un système autour de votre opération précise d'un outil interne jusqu'à une plateforme complète.",
      en: "We can design and build a system around your specific operation from an internal tool to a complete operational platform.",
    },
    cta: {
      fr: "Construire votre système avec EIDEN",
      en: "Build your system with EIDEN",
    },
  },

  closing: {
    title: {
      fr: "Votre entreprise est déjà un système.",
      en: "Your business is already a system.",
    },
    text: {
      fr: "Nous la rendons simplement plus facile à faire tourner.",
      en: "We just make it easier to run.",
    },
    cta: { fr: "Construisons le vôtre", en: "Let's build yours" },
  },
};
