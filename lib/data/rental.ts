import type { Locale } from "@/lib/i18n";

export type RentalFeature = { title: string; detail: string };
export type RentalPack = {
  badge: string;
  title: string;
  price: string;
  unit: string;
  description: string;
  points: string[];
  cta: string;
  image: string;
  alt: string;
};
export type RentalKit = { title: string; detail: string };
export type RentalLink = { href: string; text: string };
export type RentalFaq = { q: string; a: string; link?: RentalLink };

export type RentalCopy = {
  crumbs: {
    navLabel: string;
    home: string;
    current: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primary: string;
    secondary: string;
    address: string;
  };
  features: RentalFeature[];
  packs: {
    kicker: string;
    title: string;
    titleAccent: string;
    lead: string;
    popular: string;
    items: RentalPack[];
  };
  practice: {
    kicker: string;
    title: string;
    lead: string;
    kitTitle: string;
    kit: RentalKit[];
    photos: { src: string; alt: string; caption: string }[];
  };
  faq: {
    kicker: string;
    title: string;
    items: RentalFaq[];
  };
  reasons: {
    kicker: string;
    kickerAccent: string;
    title: string;
    lead: string;
    cta: string;
    items: RentalFeature[];
  };
  cta: {
    kicker: string;
    title: string;
    titleAccent: string;
    text: string;
    callLabel: string;
    whatsapp: string;
    reply: string;
    stub: string;
  };
  form: {
    title: string;
    subtitle: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    package: string;
    datetime: string;
    datetimePlaceholder: string;
    participants: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    close: string;
  };
  chooser: {
    title: string;
    subtitle: string;
    whatsappTitle: string;
    whatsappSub: string;
    emailTitle: string;
    emailSub: string;
    whatsappGeneric: string;
    whatsappMessages: string[];
  };
  packages: string[];
};

const fr: RentalCopy = {
  crumbs: {
    navLabel: "Fil d'Ariane",
    home: "Accueil",
    current: "Location de salle de formation à Agadir",
  },
  hero: {
    eyebrow: "Location de salle · Agadir Bay",
    title: "Location de salle de formation à Agadir",
    lead: "15 places assises, un écran grand format, le tableau blanc et le Wi-Fi fibre. Tout est installé et prêt quand vous arrivez.",
    primary: "Réserver la salle",
    secondary: "Voir les formules",
    address: "Agadir Bay, Technopole 1, Bloc B101 Agadir 80000, Maroc",
  },
  features: [
    { title: "Salle équipée", detail: "écran 4K, son, tableau blanc" },
    { title: "Wi-Fi fibre", detail: "symétrique, réseau dédié" },
    { title: "Pause café", detail: "incluse dans la journée" },
    { title: "15 places", detail: "table ou disposition en U" },
    { title: "Agadir Bay", detail: "Bloc B101, Technopole 1" },
  ],
  packs: {
    kicker: "Prix de location",
    title: "Formules de location de salle de formation",
    titleAccent: "à Agadir.",
    lead: "Prix de location d'une salle de formation à Agadir : 650 DH la demi-journée (4 h), 1 150 DH la journée complète (8 h), sur devis pour plusieurs jours.",
    popular: "Le plus demandé",
    items: [
      {
        badge: "4 heures",
        title: "Pack Demi-Journée",
        price: "650",
        unit: "DH",
        description: "Pour un atelier, une réunion d'équipe ou un créneau de coaching.",
        points: [
          "Salle entièrement équipée",
          "Écran de présentation et sonorisation",
          "Tableau blanc et stylos",
          "Wi-Fi fibre illimité",
          "Pause café incluse",
        ],
        cta: "Réserver ce pack",
        image: "/rental-table.webp",
        alt: "Table de réunion en bois de la salle de formation EIDEN à Agadir Bay",
      },
      {
        badge: "8 heures",
        title: "Pack Journée Complète",
        price: "1 150",
        unit: "DH",
        description: "Pour une formation, un séminaire ou un comité qui doit avancer.",
        points: [
          "Salle entièrement équipée",
          "Écran de présentation et sonorisation",
          "Tableau blanc et stylos",
          "Wi-Fi fibre illimité",
          "Pause café et accueil personnalisé",
        ],
        cta: "Réserver ce pack",
        image: "/rental-screen-2.webp",
        alt: "Salle de formation équipée EIDEN à Agadir : écran 4K et tableau blanc face aux 15 chaises",
      },
      {
        badge: "Sur devis",
        title: "Location sur devis",
        price: "Sur devis",
        unit: "",
        description: "Plusieurs sessions, plusieurs jours, ou un format qui sort de l'ordinaire.",
        points: [
          "Location sur plusieurs jours",
          "Réservations régulières ou récurrentes",
          "Mobilier remis en place à la demande",
          "Tarifs négociés sur la durée et la fréquence",
        ],
        cta: "Demander un devis",
        image: "/rental-meeting-room.webp",
        alt: "Salle de formation avec tableau blanc et écran TV à Agadir Bay, EIDEN GROUP",
      },
    ],
  },
  practice: {
    kicker: "En pratique",
    title: "Salle de formation équipée à Agadir Bay",
    lead: "Salle de formation avec Wi-Fi, écran TV et tableau blanc à Agadir Bay : tout est déjà installé. Vous arrivez, vous branchez, vous travaillez.",
    kitTitle: "Dans la salle",
    kit: [
      { title: "Écran grand format 4K", detail: "HDMI et USB-C, 55 pouces" },
      { title: "Sonorisation et micro", detail: "pour les ateliers à la parole" },
      { title: "Tableau blanc", detail: "grands stylos, effacement complet" },
      { title: "Wi-Fi fibre", detail: "débit symétrique, réseau dédié" },
      { title: "Mobilier", detail: "15 chaises, table ou U" },
      { title: "Climatisation", detail: "et multiprises à chaque place" },
    ],
    photos: [
      {
        src: "/rental-screen-1.webp",
        alt: "Salle de formation équipée EIDEN à Agadir Bay : grande table, 15 chaises, écran 55 pouces et tableau blanc",
        caption: "Configuration table : comités, formations, réunions d'équipe",
      },
      {
        src: "/rental-screen-2.webp",
        alt: "Salle de formation EIDEN à Agadir vue depuis le fond : écran, sonorisation et tableau blanc face à la table",
        caption: "Écran, sonorisation et tableau blanc face à la table",
      },
      {
        src: "/rental-meeting-room.webp",
        alt: "Salle EIDEN avec mur ardoise, tableau blanc et écran TV, Agadir Bay",
        caption: "Lumière naturelle côté fenêtres, mur ardoise côté écran",
      },
    ],
  },
  faq: {
    kicker: "Questions fréquentes",
    title: "Questions fréquentes sur la location de salle à Agadir",
    items: [
      {
        q: "Combien coûte la location d'une salle de formation à Agadir ?",
        a: "Location de salle à la demi-journée à Agadir : 650 DH les 4 heures. Location de salle à la journée à Agadir : 1 150 DH les 8 heures. La pause café est incluse dans les deux formules.",
        link: { href: "#packs", text: "Voir les formules et les tarifs" },
      },
      {
        q: "Que comprend la location de la salle ?",
        a: "Tout l'équipement professionnel : écran 55 pouces 4K (HDMI et USB-C), sonorisation et micro, tableau blanc, Wi-Fi fibre symétrique sur réseau dédié, 15 chaises, table ou disposition en U, climatisation et multiprises à chaque place.",
        link: { href: "#equipement", text: "Voir l'équipement en détail" },
      },
      {
        q: "Quelle est la capacité de la salle ?",
        a: "15 places assises, en configuration table de réunion ou disposition en U.",
      },
      {
        q: "Où se trouve la salle et comment venir ?",
        a: "Agadir Bay, Technopole 1, Bloc B101 Agadir 80000, Maroc. Le technopôle est à 10 minutes de l'aéroport Agadir Al Massira.",
      },
      {
        q: "Peut-on louer la salle pour plusieurs jours ?",
        a: "Location de salle de formation pour plusieurs jours à Agadir : oui, via la formule Location sur devis. Séries de sessions, locations sur plusieurs jours et réservations régulières ou récurrentes, avec des tarifs négociés sur la durée et la fréquence.",
      },
      {
        q: "Comment réserver la salle ?",
        a: "Trois étapes : choisissez votre formule, envoyez votre date, votre horaire et le nombre de participants (formulaire, WhatsApp ou e-mail à contact@eiden-group.com), puis recevez la confirmation sous 24 heures ouvrées.",
      },
      {
        q: "Pour quels usages peut-on louer cette salle ?",
        a: "Formation professionnelle, ateliers, réunions d'équipe, comités de direction, séminaires, coaching, prospection et lancement d'offre : la salle se prête à toute journée où un groupe a besoin d'écran, de Wi-Fi et de calme.",
      },
      {
        q: "La pause café est-elle incluse ?",
        a: "Oui, la pause café est incluse dans les deux packs. Le Pack Journée Complète ajoute l'accueil personnalisé en plus de la pause café.",
      },
    ],
  },
  reasons: {
    kicker: "Pourquoi",
    kickerAccent: "EIDEN",
    title: "Pourquoi louer notre salle de réunion à Agadir",
    lead: "Équipement complet, tarifs lisibles, un seul interlocuteur. Vous réservez, vous installez, vous animez.",
    cta: "Demander une visite",
    items: [
      { title: "Équipement pro", detail: "écran, son, tableau : rien à installer" },
      { title: "Trois formules", detail: "4 h, 8 h ou devis" },
      { title: "Un seul contact", detail: "réservation, facture et technique au même endroit" },
      { title: "Agadir Bay", detail: "Technopole 1, à 10 min de l'aéroport" },
    ],
  },
  cta: {
    kicker: "Réservation · Agadir",
    title: "Réservez votre",
    titleAccent: "salle de formation",
    text: "Envoyez la date et le format : nous confirmons la disponibilité, le devis et la mise en place du mobilier.",
    callLabel: "Appelez-nous",
    whatsapp: "ou écrivez-nous sur WhatsApp →",
    reply: "Réponse sous 24 heures ouvrées.",
    stub: "places assises",
  },
  form: {
    title: "Réservez la salle",
    subtitle: "Date, format, nombre de participants : nous revenons avec la confirmation.",
    name: "Nom complet",
    company: "Société / organisation",
    email: "E-mail",
    phone: "Téléphone",
    package: "Formule",
    datetime: "Date et heure",
    datetimePlaceholder: "Choisissez une date et une heure",
    participants: "Participants",
    message: "Message / besoin",
    messagePlaceholder: "Atelier, comité, séminaire…",
    submit: "Envoyer ma demande",
    sending: "Envoi en cours",
    success: "Demande envoyée. Nous confirmons sous 24 h ouvrées.",
    error: "L'envoi a échoué. Réessayez ou appelez-nous.",
    close: "Fermer",
  },
  chooser: {
    title: "Comment souhaitez-vous réserver ?",
    subtitle:
      "Choisissez le canal qui vous arrange : nous confirmons sous 24 heures ouvrées.",
    whatsappTitle: "WhatsApp",
    whatsappSub: "Réponse rapide · message pré-rempli",
    emailTitle: "E-mail",
    emailSub: "Formulaire complet · confirmation écrite",
    whatsappGeneric:
      "Bonjour EIDEN Group,\n\nJ'ai une question concernant la location de votre salle de formation à Agadir.\n\nBonne journée.",
    whatsappMessages: [
      "Bonjour EIDEN Group,\n\nJe souhaite réserver votre salle de formation pour une session.\nFormule : Pack Demi-Journée (650 DH)\n\nDate souhaitée :\nHoraire :\nNombre de participants :\n\nPouvez-vous me confirmer les disponibilités ?\n\nNom :\nSociété :",
      "Bonjour EIDEN Group,\n\nJe souhaite réserver votre salle de formation pour une journée.\nFormule : Pack Journée Complète (1 150 DH)\n\nDate souhaitée :\nHoraire :\nNombre de participants :\n\nPouvez-vous me confirmer les disponibilités ?\n\nNom :\nSociété :",
      "Bonjour EIDEN Group,\n\nJ'aimerais un devis pour la mise à disposition de votre salle de formation.\nFormule : location sur devis (plusieurs sessions ou plusieurs jours)\n\nPériode envisagée :\nNombre de participants :\n\nPouvez-vous me recontacter avec une proposition ?\n\nNom :\nSociété :",
    ],
  },
  packages: [
    "Pack Demi-Journée · 650 DH",
    "Pack Journée Complète · 1 150 DH",
    "Location sur devis",
  ],
};

const en: RentalCopy = {
  crumbs: {
    navLabel: "Breadcrumb",
    home: "Home",
    current: "Training room rental in Agadir",
  },
  hero: {
    eyebrow: "Room hire · Agadir Bay",
    title: "Training room rental in Agadir",
    lead: "15 seats, a large display, a whiteboard and fibre Wi-Fi. Everything is installed and ready when you arrive.",
    primary: "Book the room",
    secondary: "See the packages",
    address: "Agadir Bay, Technopole 1, Bloc B101 Agadir 80000, Maroc",
  },
  features: [
    { title: "Equipped room", detail: "4K screen, sound, whiteboard" },
    { title: "Fibre Wi-Fi", detail: "symmetric, dedicated network" },
    { title: "Coffee break", detail: "included in the full day" },
    { title: "15 seats", detail: "boardroom or U-shape" },
    { title: "Agadir Bay", detail: "Bloc B101, Technopole 1" },
  ],
  packs: {
    kicker: "Rental prices",
    title: "Training room rental packages",
    titleAccent: "in Agadir.",
    lead: "Training room rental prices in Agadir: 650 MAD for a half day (4 h), 1,150 MAD for a full day (8 h), a quote for multi-day bookings.",
    popular: "Most requested",
    items: [
      {
        badge: "4 hours",
        title: "Half-Day Package",
        price: "650",
        unit: "MAD",
        description: "For a workshop, a team meeting or a coaching slot.",
        points: [
          "Fully equipped room",
          "Presentation screen and sound system",
          "Whiteboard and markers",
          "Unlimited fibre Wi-Fi",
          "Coffee break included",
        ],
        cta: "Book this package",
        image: "/rental-table.webp",
        alt: "Wooden meeting table in the EIDEN training room for rent in Agadir Bay",
      },
      {
        badge: "8 hours",
        title: "Full-Day Package",
        price: "1 150",
        unit: "MAD",
        description: "For a training, a seminar or a committee that needs to move forward.",
        points: [
          "Fully equipped room",
          "Presentation screen and sound system",
          "Whiteboard and markers",
          "Unlimited fibre Wi-Fi",
          "Coffee break and personal welcome",
        ],
        cta: "Book this package",
        image: "/rental-screen-2.webp",
        alt: "Fully equipped EIDEN training room in Agadir: 4K screen and whiteboard facing the 15 seats",
      },
      {
        badge: "On quote",
        title: "Custom quote",
        price: "On quote",
        unit: "",
        description: "Several sessions, several days, or a format that does not fit the standard packs.",
        points: [
          "Multi-day rental",
          "Regular or recurring bookings",
          "Furniture reset on request",
          "Negotiated rates by duration and frequency",
        ],
        cta: "Request a quote",
        image: "/rental-meeting-room.webp",
        alt: "Training and meeting room with whiteboard and TV screen in Agadir Bay, EIDEN GROUP",
      },
    ],
  },
  practice: {
    kicker: "In practice",
    title: "Fully equipped training room in Agadir Bay",
    lead: "Training room with Wi-Fi, TV screen and whiteboard in Agadir: everything is already installed. You arrive, you plug in, you work.",
    kitTitle: "In the room",
    kit: [
      { title: "55-inch 4K screen", detail: "HDMI and USB-C" },
      { title: "Sound and microphone", detail: "for lively workshops" },
      { title: "Whiteboard", detail: "large markers, full wipe" },
      { title: "Fibre Wi-Fi", detail: "symmetric speed, dedicated network" },
      { title: "Furniture", detail: "15 chairs, table or U-shape" },
      { title: "Air conditioning", detail: "and sockets at every seat" },
    ],
    photos: [
      {
        src: "/rental-screen-1.webp",
        alt: "Fully equipped EIDEN training room in Agadir Bay: long table, 15 chairs, 55-inch screen and whiteboard",
        caption: "Boardroom layout: committees, trainings, team meetings",
      },
      {
        src: "/rental-screen-2.webp",
        alt: "EIDEN training room in Agadir seen from the back: screen, sound and whiteboard facing the table",
        caption: "Screen, sound and whiteboard facing the table",
      },
      {
        src: "/rental-meeting-room.webp",
        alt: "EIDEN room with slate wall, whiteboard and TV screen, Agadir Bay",
        caption: "Daylight by the windows, slate wall by the screen",
      },
    ],
  },
  faq: {
    kicker: "FAQ",
    title: "Room rental in Agadir: frequently asked questions",
    items: [
      {
        q: "How much does training room rental cost in Agadir?",
        a: "Half-day training room rental in Agadir: 650 MAD for 4 hours. Full-day training room rental in Agadir: 1,150 MAD for 8 hours. Coffee break is included in both packages.",
        link: { href: "#packs", text: "See the packages and pricing" },
      },
      {
        q: "What is included with the room?",
        a: "All the professional equipment: 55-inch 4K screen (HDMI and USB-C), sound system and microphone, whiteboard, symmetric fibre Wi-Fi on a dedicated network, 15 chairs, boardroom or U-shape furniture, air conditioning and sockets at every seat. A fully equipped meeting room for rent in Agadir, ready on the day you arrive.",
        link: { href: "#equipement", text: "See the full equipment list" },
      },
      {
        q: "What is the room capacity?",
        a: "15 seats, in a boardroom or U-shape layout: a small meeting room for rent in Agadir for committees, workshops and board meetings.",
      },
      {
        q: "Where is the room and how do I get there?",
        a: "Agadir Bay, Technopole 1, Bloc B101 Agadir 80000, Maroc. The Technopole is 10 minutes from Agadir Al Massira Airport.",
      },
      {
        q: "Can I rent the room for several days?",
        a: "Yes: training room rental for multiple days in Agadir is available on quote, for several sessions, several days, and regular or recurring bookings, with rates negotiated by duration and frequency.",
      },
      {
        q: "How do I book the room?",
        a: "Three steps: choose your package, send us your date, time and number of participants (form, WhatsApp or email at contact@eiden-group.com), then receive the confirmation within 24 working hours.",
      },
      {
        q: "What is the room suited for?",
        a: "A corporate training venue in Agadir: professional trainings, workshops, team meetings, board meetings, seminars, coaching sessions, prospecting workshops and launch days. The room fits any day when a group needs a screen, Wi-Fi and focus.",
      },
      {
        q: "Is the coffee break included?",
        a: "Yes: coffee break is included in both packages. The Full-Day Package adds a personal welcome on top of the coffee break.",
      },
    ],
  },
  reasons: {
    kicker: "Why",
    kickerAccent: "EIDEN",
    title: "Why book our meeting room in Agadir",
    lead: "Affordable training room rental in Agadir: full equipment, readable rates and one contact. You book, you set up, you run the session.",
    cta: "Book a visit",
    items: [
      { title: "Pro equipment", detail: "screen, sound, whiteboard: nothing to install" },
      { title: "Three packages", detail: "4 h, 8 h or a quote" },
      { title: "One contact", detail: "booking, invoice and tech in the same place" },
      { title: "Agadir Bay", detail: "Technopole 1, 10 min from the airport" },
    ],
  },
  cta: {
    kicker: "Booking · Agadir",
    title: "Book your",
    titleAccent: "training room",
    text: "Send the date and the format: we confirm availability, the quote and the furniture setup.",
    callLabel: "Call us",
    whatsapp: "or message us on WhatsApp →",
    reply: "Answer within 24 working hours.",
    stub: "seats",
  },
  form: {
    title: "Book the room",
    subtitle: "Date, format, number of participants: we come back with the confirmation.",
    name: "Full name",
    company: "Company / organisation",
    email: "Email",
    phone: "Phone",
    package: "Package",
    datetime: "Date and time",
    datetimePlaceholder: "Pick a date and time",
    participants: "Participants",
    message: "Message / need",
    messagePlaceholder: "Workshop, committee, seminar…",
    submit: "Send my request",
    sending: "Sending",
    success: "Request sent. We confirm within 24 working hours.",
    error: "The send failed. Try again or call us.",
    close: "Close",
  },
  chooser: {
    title: "How would you like to book?",
    subtitle:
      "Choose the channel that suits you best. We confirm within 24 working hours.",
    whatsappTitle: "WhatsApp",
    whatsappSub: "Quick reply · prefilled message",
    emailTitle: "Email",
    emailSub: "Full form · written confirmation",
    whatsappGeneric:
      "Hello EIDEN Group,\n\nI have a question about hiring your training room in Agadir.\n\nBest regards.",
    whatsappMessages: [
      "Hello EIDEN Group,\n\nI would like to book your training room for a session.\nPackage: Half-Day Package (650 MAD)\n\nPreferred date:\nTime:\nNumber of participants:\n\nCould you confirm availability?\n\nName:\nCompany:",
      "Hello EIDEN Group,\n\nI would like to book your training room for a full day.\nPackage: Full-Day Package (1,150 MAD)\n\nPreferred date:\nTime:\nNumber of participants:\n\nCould you confirm availability?\n\nName:\nCompany:",
      "Hello EIDEN Group,\n\nI would like a quote for using your training room.\nPackage: on-quote rental (several sessions or several days)\n\nTentative dates:\nNumber of participants:\n\nCould you get back to me with a proposal?\n\nName:\nCompany:",
    ],
  },
  packages: [
    "Half-Day Package · 650 MAD",
    "Full-Day Package · 1 150 MAD",
    "Custom quote",
  ],
};

export const rentalCopy: Record<Locale, RentalCopy> = { fr, en };

export function getRentalCopy(locale: Locale): RentalCopy {
  return rentalCopy[locale] ?? rentalCopy.fr;
}
