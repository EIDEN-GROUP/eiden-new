/**
 * French content   the source of truth for the whole site.
 *
 * `lib/i18n/en.ts` is typed as `typeof fr`, so any key added here must be
 * translated there before the project type-checks.
 */
export const fr = {
  locale: "fr-MA",
  htmlLang: "fr",

  meta: {
    title: "EIDEN GROUP   Agence digitale au Maroc",
    description:
      "Agence digitale marocaine. Stratégie, marque, site web, campagnes et contenu : nous construisons les systèmes digitaux qui font grandir votre entreprise.",
  },

  common: {
    bookCall: "Réserver un appel",
    seeSolutions: "Nos solutions",
    seeCase: "Voir le projet",
    seeAllCases: "Voir tous les projets",
    contactUs: "Nous contacter",
    email: "Écrivez-nous",
    previous: "Précédent",
    next: "Suivant",
    pause: "Mettre le défilement en pause",
    play: "Reprendre le défilement",
    menu: "Menu",
    close: "Fermer",
    loading: "Chargement",
    langSwitch: "Switch to English",
    langName: "Français",
    backHome: "Retour à l'accueil",
    backToTop: "Retour en haut",
    whatsapp: "Écrire sur WhatsApp",
    skipToContent: "Aller au contenu principal",
  },

  nav: {
    home: "Accueil",
    about: "à propos",
    clients: "Clients",
    solutions: "Nos solutions",
    contact: "Contact",
  },

  /* The full-screen menu. One caption per route   the line that runs under
     the picture when a column is opened. */
  menu: {
    label: "Menu",
    captions: {
      home: "Là où tout commence.",
      about: "La structure avant la façade.",
      clients: "Le travail, sans filtre.",
      solutions: "Ce que nous savons faire.",
      contact: "On vous ouvre la porte.",
    },
    booking: "Prendre RDV",
  },

  hero: {
    titleLead: "La structure digitale qui fait",
    titleAccent: "grandir",
    titleTail: "votre entreprise.",
    description:
      "Web-apps, marque, marketing & ads : la plupart des entreprises ajoutent ces éléments un par un, chacun de son côté. Nous faisons l’inverse. Nous construisons d’abord une base solide, puis nous ajoutons chaque pièce dessus pour que tout fonctionne ensemble.",
    stats: [
      { value: "25+", label: "Entreprises accompagnées" },
      { value: "92%", label: "Clients en accompagnement continu" },
    ],
    trust: "Plus de 10 entreprises accompagnées",
    trustSub: "Maroc, Afrique et Moyen-Orient",
    clientsLabel: "Ils nous font confiance",
    featured: {
      badge: "Étude de cas",
      text: "Comment Lunja Village est devenu une marque côtière que ses clients reconnaissent et réservent en direct.",
      metricLabel: "de réservations directes en 6 mois",
      cta: "Lire l'étude de cas",
    },
    scroll: "Découvrir",
  },

  idea: {
    eyebrow: "L'idée EIDEN",
    title: "Nous ne donnons pas de conseils. Nous construisons.",
    lead: "La plupart des entreprises marocaines n'ont pas un problème d'idées. Elles ont un problème de structure. Le site existe mais ne vend pas. Les réseaux tournent mais n'amènent personne. La publicité coûte sans qu'on sache ce qu'elle rapporte.",
    lead2:
      "EIDEN met de l'ordre là-dedans. Nous partons de vos chiffres et de vos clients, puis nous construisons un ensemble cohérent : une marque claire, un site qui convertit, des campagnes mesurées. Vous gardez tout. Vous comprenez tout.",
    pillars: [
      {
        n: "01",
        title: "D'abord comprendre",
        text: "Audit de votre marché, de vos clients et de vos chiffres. On identifie ce qui bloque avant de proposer quoi que ce soit.",
      },
      {
        n: "02",
        title: "Ensuite construire",
        text: "Marque, site, contenu, campagnes. Chaque pièce est conçue pour un objectif précis et s'emboîte avec les autres.",
      },
      {
        n: "03",
        title: "Enfin faire tourner",
        text: "On mesure, on ajuste, on améliore chaque mois. Le digital n'est pas un projet qui se termine : c'est un système qui vit.",
      },
    ],
    shiftLead: "Ce qui change",
    shiftTail: "quand vous travaillez avec nous.",
    cards: [
      {
        label: "Ce qui s'arrête",
        body: "Le digital en pièces détachées.",
        points: [
          "Un site, des publicités, un logo. Trois prestataires qui ne se parlent pas.",
          "Vous ignorez d’où viennent vos clients, et ce qu’ils vous coûtent.",
          "Vos accès, comptes et données sont chez le prestataire, pas chez vous.",
          "Les décisions se prennent au ressenti, pas sur des chiffres.",
          "Chaque nouveau besoin repart de zéro.",
          "Vous payez sans rien construire qui reste.",
        ],
      },
      {
        label: "Ce qui commence",
        body: "Une structure qui tient dans le temps.",
        points: [
          "Une équipe, un plan. Site, marque, publicité et contenu avancent ensemble.",
          "Chaque mois, un rapport clair : ce qui marche, ce qu’on change.",
          "Tout est à votre nom. Si vous partez, vous partez avec tout.",
          "Les décisions viennent des chiffres, pas des opinions.",
          "On ajoute sans tout casser. La base porte la suite.",
          "Chaque mois, vous êtes plus solide que le précédent.",
        ],
      },
    ],
    stats: [
      { value: "25+", label: "Entreprises accompagnées" },
      { value: "6", label: "Secteurs d'expertise" },
      { value: "2025", label: "Année de création" },
      { value: "4", label: "Continents servis" },
    ],
  },

  services: {
    eyebrow: "Quatre capacités. Une architecture.",
    title: "Ce ne sont pas quatre prestations. C'est un seul système.",
    hint: "Survolez une expertise pour voir le détail",
    deliverablesLabel: "Prestations & livrables",
    items: [
      {
        slug: "web",
        title: "Création web & apps",
        kicker: "La fondation sur laquelle tout le reste tient",
        text: "Nous créons votre site ou votre application. Rapide à charger, clair à lire, pensé pour transformer un visiteur en client pas seulement pour être joli.",
        deliverables: [
          "Sites vitrines",
          "E-commerce",
          "Applications mobiles (iOS / Android)",
          "Plateformes métier sur mesure",
        ],
      },
      {
        slug: "visibilite",
        title: "SEO, GEO & visibilité IA",
        kicker: "Être trouvé là où se fait la prochaine recherche",
        text: "Être trouvé au moment où quelqu’un vous cherche. Sur Google, sur la carte quand on cherche « près de moi », et désormais dans les réponses des IA comme ChatGPT.",
        deliverables: [
          "SEO technique",
          "Contenu & netlinking",
          "GEO (moteurs génératifs)",
          "Visibilité ChatGPT / Gemini / Perplexity",
        ],
      },
      {
        slug: "media",
        title: "Performance media & ads",
        kicker: "Acheter du trafic n'est pas construire une acquisition",
        text: "Vos publicités sur Google, Instagram, Facebook et TikTok, lancées et surveillées chaque semaine. Pas « on booste un post », mais un vrai pilotage.",
        deliverables: [
          "Google Ads",
          "Publicité réseaux sociaux",
          "Programmatique",
          "Génération de prospects (leads)",
          "Optimisation du taux de conversion",
        ],
      },
      {
        slug: "contenu",
        title: "Stratégie, contenu & image",
        kicker: "L'identité qui rend le reste reconnaissable",
        text: "Le travail qui vient avant tout le reste. Qui vous êtes, à qui vous parlez, et pourquoi on vous choisit vous plutôt qu’un autre.",
        deliverables: [
          "Audit & stratégie",
          "Vidéo & motion design",
          "Photo",
          "Ligne éditoriale",
          "Community management",
          "E-réputation & gestion de crise",
        ],
      },
      {
        slug: "photoVid",
        title: "Photos & vidéos",
        kicker: "Ce que la marque donne à voir",
        text: "Des images qui vous ressemblent vraiment. Vos lieux, vos produits, votre équipe pas des banques d’images achetées que tout le monde utilise déjà.",
        deliverables: [
          "Shooting photo",
          "Production vidéo",
          "Reels & contenus social media",
          "Montage & post-production",
        ],
      },
    ],
  },

  vsl: {
    eyebrow: "En 90 secondes",
    title: "Voici comment nous travaillons.",
    text: "Pas de jargon, pas de promesses. On vous montre la méthode : le diagnostic, la construction, puis le suivi mensuel. Trois étapes, toujours les mêmes.",
    play: "Lancer la vidéo",
    pause: "Mettre en pause",
    mute: "Couper le son",
    unmute: "Activer le son",
    sound: "Son",
    fullscreen: "Plein écran",
  },

  team: {
    eyebrow: "L'équipe",
    title: "Les personnes derrière nos résultats.",
    text: "Un fondateur qui reste sur chaque dossier, et quatre spécialistes derrière lui. Un seul interlocuteur pour vous, une équipe complète au travail.",
    founder: {
      initials: "OL",
      name: "Oualid Laati",
      role: "Fondateur · Architecte en chef",
      text: "Il ouvre chaque mission par le diagnostic et reste l'interlocuteur du projet jusqu'à la livraison. Stratégie, arbitrages, architecture : rien ne sort sans passer par lui.",
    },
    members: [
      {
        initials: "HE",
        name: "Hassan ElKhadiri",
        role: "Responsable Marque & Marketing",
        text: "Positionnement, identité et acquisition.",
      },
      {
        initials: "YA",
        name: "Youssef Azella",
        role: "Directeur Récit & Motion",
        text: "Direction artistique, film et motion design.",
      },
      {
        initials: "AA",
        name: "Abdelhakim Akhidar",
        role: "Architecte Solution & Lead Dev",
        text: "Web, plateformes, intégrations et performance.",
      },
      {
        initials: "AO",
        name: "Aya Ouahyb",
        role: "Admin & Gestion des Tâches",
        text: "Planning, suivi des livrables et coordination.",
      },
    ],
    note: "Basés à Agadir. Nous intervenons partout au Maroc, en présentiel ou à distance.",
  },

  proof: {
    eyebrow: "Preuves & résultats",
    title: "Le travail parle avant nous.",
    text: "Des marques, des sites et des campagnes livrés pour des entreprises marocaines qui voulaient passer à l'échelle.",
    statsNote: "Chiffres consolidés sur nos missions 2024–2026.",
    ctaPortfolio: "Portfolio",
    ctaSolutions: "Solutions",
    outro: {
      eyebrow: "La suite",
      projectsTitle: "Ce n'est qu'une partie du travail.",
      projectsText:
        "Marques, sites et campagnes : le reste des projets vous attend dans le portfolio.",
      solutionsTitle: "Vous voulez la même chose chez vous ?",
      solutionsText:
        "Ce que nous savons faire, comment nous le faisons, et ce que vous gardez à la fin.",
    },
    railTitle: "Le portfolio, en continu.",
    railText:
      "Marques, sites et campagnes livrés pour des entreprises marocaines. Laissez défiler, ou ouvrez le portfolio complet.",
    stats: [
      { value: "25+", label: "Projets livrés" },
      { value: "6", label: "Secteurs couverts" },
      { value: "92%", label: "Clients en accompagnement continu" },
      { value: "48h", label: "Délai de réponse moyen" },
    ],
    cases: [
      {
        slug: "lunja-village",
        title:
          "Une identité côtière complète et une présence sociale qui remplit les saisons.",
        text: "Pour Lunja Village, nous avons construit toute la marque : logo, univers visuel, supports, contenus sociaux et site. Le complexe est passé d'un nom peu connu à une destination que les voyageurs cherchent par son nom.",
        tags: ["Branding", "Réseaux sociaux", "Site web"],
        quote: "",
        author: "",
      },
      {
        slug: "bopassage",
        title:
          "Un café-restaurant d'Agadir enfin visible en ligne, du premier clic à la table réservée.",
        text: "Bôpassage avait la salle et les clients fidèles, mais aucun site ni rythme social. Nous avons lancé le site, structuré la ligne éditoriale et mis en place les campagnes Google Ads orientées réservation.",
        tags: ["Site web", "Contenu", "Google Ads"],
        quote: "",
        author: "",
      },
      {
        slug: "medical-bay",
        title:
          "Un centre médical repensé, de l'expérience patient jusqu'au suivi des rendez-vous.",
        text: "Marque, signalétique, site et campagnes pour Medical Bay. L'objectif : rendre la prise de rendez-vous évidente et faire venir aussi les patients du tourisme médical.",
        tags: ["Identité", "Site web", "Campagnes"],
        quote: "",
        author: "",
      },
      {
        slug: "dmc-morocco",
        title:
          "Trente ans d'expertise hôtelière transformés en marque, de la page blanche au premier contrat.",
        text: "Naming, identité, site et stratégie LinkedIn pour DMC Hospitality Morocco. Une expertise qui existait depuis longtemps, mais qui n'avait jamais eu de visage.",
        tags: ["Naming", "Identité", "LinkedIn"],
        quote: "",
        author: "",
      },
      {
        slug: "educazen-kids",
        title:
          "Une école qui gère enfin ses inscriptions et sa communication au même endroit.",
        text: "Site, plateforme et outils internes pour EducazenKids. Les parents s'inscrivent en ligne, l'équipe suit tout depuis un seul tableau de bord.",
        tags: ["Plateforme", "Site web", "Outils internes"],
        quote: "",
        author: "",
      },
    ],
    testimonials: [
      {
        quote:
          "Ils ont commencé par écouter et par regarder nos chiffres. Le site est arrivé après, et il ressemble enfin à ce qu'on est vraiment.",
        author: "Direction",
        company: "Hôtellerie Agadir",
      },
      {
        quote:
          "On savait qu'il fallait faire du digital sans savoir par où commencer. EIDEN a mis un ordre clair, étape par étape.",
        author: "Fondateur",
        company: "Commerce & distribution   Casablanca",
      },
      {
        quote:
          "Le suivi mensuel change tout. On voit ce que la publicité rapporte, en dirhams, pas en impressions.",
        author: "Direction marketing",
        company: "Santé   Agadir",
      },
      {
        quote:
          "Une équipe qui répond vite et qui explique en français simple. C'est rare et ça compte beaucoup.",
        author: "Direction",
        company: "Éducation Marrakech",
      },
    ],
  },

  offer: {
    eyebrow: "Nos 4 expertises",
    title: "Des services digitaux complets, depuis le Maroc.",
    text: "Ce que vous obtenez concrètement, avec les livrables et les résultats attendus.",
    items: [
      {
        n: "01",
        title: "Création web & apps",
        text: "Sites vitrines, e-commerce, applications mobiles (iOS / Android) et plateformes métier sur mesure.",
        detail:
          "Nous concevons des solutions digitales rapides et durables : sites ultra-performants, boutiques en ligne, applications natives et outils internes. Le code vous appartient.",
        link: "Découvrir nos solutions",
        href: "/nos-solutions#web",
      },
      {
        n: "02",
        title: "SEO, GEO & visibilité IA",
        text: "Soyez visible là où vos clients cherchent : sur Google, mais aussi dans les réponses des IA.",
        detail:
          "SEO technique, contenu, netlinking et GEO (Generative Engine Optimization) pour apparaître dans ChatGPT, Gemini et Perplexity. Objectif : devenir la référence de votre marché.",
        link: "Optimiser votre visibilité",
        href: "/nos-solutions#visibilite",
      },
      {
        n: "03",
        title: "Performance media & ads",
        text: "Des campagnes publicitaires précises : Google Ads, réseaux sociaux, programmatique.",
        detail:
          "Media buying et génération de prospects. Nous pilotons vos budgets au ROI, avec un suivi mensuel clair et un travail continu sur le taux de conversion.",
        link: "Accélérer votre acquisition",
        href: "/nos-solutions#media",
      },
      {
        n: "04",
        title: "Stratégie, contenu & image",
        text: "De l'audit à la production : vidéo, motion design, photo et ligne éditoriale.",
        detail:
          "Community management, veille concurrentielle et gestion de crise. Nous protégeons votre e-réputation et donnons à votre audience une raison de vous suivre.",
        link: "Structurer votre stratégie",
        href: "/nos-solutions#contenu",
      },
    ],
  },

  bookCall: {
    eyebrow: "Prochaine étape",
    title: "Un appel de 30 minutes. Un plan clair.",
    text: "On regarde ensemble votre situation actuelle, ce qui bloque et ce qui peut être lancé rapidement. Sans engagement, sans discours commercial.",
    points: [
      "Un diagnostic honnête de votre présence digitale",
      "Les deux ou trois priorités qui comptent vraiment",
      "Un ordre de budget réaliste, dès le premier échange",
    ],
    cta: "Réserver mon appel",
    secondary: "Écrire un e-mail",
  },

  pricing: {
    eyebrow: "Tarifs",
    title: "Des budgets clairs, dès le départ.",
    text: "Trois façons de travailler ensemble. Le chiffrage final est établi après le premier appel, en fonction du périmètre réel.",
    note: "Montants indicatifs en dirhams, hors taxes.",
    popular: "Le plus choisi",
    cta: "Demander un devis",
    plans: [
      {
        name: "Lancement",
        price: "À partir de 25 000 MAD",
        billing: "projet ponctuel",
        text: "Pour poser des bases propres : une marque, un site et les outils de mesure.",
        features: [
          "Atelier de cadrage et audit initial",
          "Identité visuelle ou refonte légère",
          "Site vitrine jusqu'à 6 pages",
          "Mise en place du suivi et des analytics",
          "Formation à la prise en main",
        ],
      },
      {
        name: "Croissance",
        price: "À partir de 12 000 MAD",
        billing: "par mois",
        text: "Pour installer un rythme : contenu, campagnes et optimisation continue.",
        features: [
          "Tout ce qui est inclus dans Lancement",
          "Campagnes Google Ads et réseaux sociaux",
          "Production de contenu mensuelle",
          "SEO technique et éditorial",
          "Rapport mensuel et appel de pilotage",
          "Interlocuteur unique dédié",
        ],
      },
      {
        name: "Sur-mesure",
        price: "Sur devis",
        billing: "selon périmètre",
        text: "Pour les plateformes, les applications et les organisations multi-sites.",
        features: [
          "Application web ou mobile sur mesure",
          "Plateforme métier et intégrations",
          "Architecture technique et sécurité",
          "Accompagnement multi-marques ou multi-pays",
          "Contrat de maintenance et SLA",
        ],
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Puissions-nous être la solution",
    text: "Nous répondons sous 48 heures, en français, en anglais ou en darija.",
    cta: "Réserver un appel",
    infoLabels: {
      email: "E-mail",
      phone: "Téléphone",
      address: "Adresse",
      hours: "Horaires",
    },
    hours: "Lundi – vendredi, 9h – 18h (GMT+1)",
    /* The card beside the form: a call is the shorter way in, so it is
       given its own seal rather than a line in the copy. */
    book: {
      stamp: "Parlez-nous de votre projet",
      title: "Cliquez ici pour réserver un appel",
      text: "30 minutes, sans engagement. On regarde où vous en êtes, et ce qu'il y a à construire.",
      whatsapp:
        "Bonjour EIDEN, j'aimerais réserver un appel pour parler de mon projet.",
    },
    map: {
      label: "Nous trouver",
      action: "Ouvrir dans Google Maps",
      frameTitle: "Carte des bureaux EIDEN GROUP à Agadir",
    },
    form: {
      title: "Écrivez-nous",
      name: "Nom complet",
      company: "Entreprise",
      email: "Adresse e-mail",
      phone: "Téléphone",
      subject: "Votre besoin",
      subjects: [
        "Site web ou application",
        "Identité de marque",
        "Publicité & acquisition",
        "Contenu & réseaux sociaux",
        "Autre",
      ],
      otherLabel: "Précisez votre besoin",
      otherPlaceholder: "En deux mots.",
      message: "Votre message",
      messagePlaceholder:
        "Parlez-nous de votre activité, de votre objectif et de votre échéance.",
      submit: "Envoyer la demande",
      sending: "Envoi en cours…",
      success:
        "Merci. Votre demande est prête   votre messagerie va s'ouvrir pour l'envoyer.",
      error: "Une erreur est survenue. Réessayez ou écrivez-nous directement.",
      required: "Champ obligatoire",
      invalidEmail: "Adresse e-mail invalide",
      optional: "facultatif",
    },
  },

  footer: {
    tagline: "Là où le chaos devient architecture.",
    bookCall: "Réserver un appel",
    email: "Écrire un e-mail",
    navLabel: "Navigation",
    socialLabel: "Réseaux",
    contactLabel: "Contact",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    rights: "Tous droits réservés",
    madeIn: "Conçu et développé à Agadir, Maroc",
    phoneMaLabel: "Maroc",
  },

  pages: {
    about: {
      eyebrow: "À propos",
      titleLead: "Un cabinet bâti sur une",
      titleAccent: "catégorie",
      titleTail: "qui n'existait pas encore.",
      lead: "Le premier cabinet d'architecture d'entreprise de la région MENA. Le siège est à Agadir ; le travail se fait sur quatre continents.",

      positionEyebrow: "Notre position",
      positionTitle: "Nous ne donnons pas d'avis. Nous posons la structure.",
      positionBody:
        "L'architecture d'entreprise, c'est la structure invisible qui décide si une activité passe à l'échelle ou s'étouffe. Nous la traitons comme un architecte traite un bâtiment : étudiée, structurée, délibérée avec la rigueur d'un ingénieur et l'œil d'un designer.",

      storyEyebrow: "L'origine",
      storyTitle: "Quatre mouvements.",
      movements: [
        {
          n: "I",
          title: "L'héritage",
          text: "Notre fondateur a passé plus de dix ans au sein d’entreprises marocaines et internationales : d’abord comme opérateur, puis comme stratège commercial et marketing, et enfin comme celui que les entreprises appelaient lorsque la croissance ralentissait sans que personne ne sache vraiment pourquoi.",
        },
        {
          n: "II",
          title: "Le schéma",
          text: "Toujours la même scène. Des fondateurs solides. De bons produits. Des équipes compétentes. Et dessous : des fuites de revenus que personne n'a cartographiées, des opérations qui tournent sur des notes vocales WhatsApp.",
        },
        {
          n: "III",
          title: "L'intuition",
          text: "Ce qui manquait n'était pas un avis de plus. C'était l'architecture. Et personne, dans la région, ne traitait ce travail comme un métier à part entière.",
        },
        {
          n: "IV",
          title: "L'architecture",
          text: "EIDEN est née de là : la rigueur des ingénieurs et la sensibilité des designers, appliquées à une entreprise comme on les applique à un bâtiment.",
        },
      ],

      principlesEyebrow: "Nos principes",
      principlesTitle: "Quatre règles, tenues sur chaque dossier.",
      principles: [
        {
          n: "01",
          title: "L'architecture avant l'avis",
          text: "Nous écoutons le système entier avant de proposer quoi que ce soit.",
          quote:
            "On cartographie avant de bouger. Le réseau des fractures d'abord, les interventions ensuite.",
        },
        {
          n: "02",
          title: "La structure avec le style",
          text: "La rigueur opérationnelle et le soin de la forme ne sont pas deux métiers séparés.",
          quote:
            "Des opérations qui ne ressemblent à rien sont des opérations qu'on ignore.",
        },
        {
          n: "03",
          title: "L'exécution, pas le conseil",
          text: "Nous restons jusqu'à la mise en service. Nous facturons une transformation, pas des livrables.",
          quote:
            "Des systèmes livrés. Des équipes formées. Des résultats mesurables.",
        },
        {
          n: "04",
          title: "Ancrés au Maroc, à l'aise partout",
          text: "Le siège est marocain, la portée est internationale   Afrique, Europe, Amérique du Nord.",
          quote:
            "Agadir. Casablanca. Paris. Montréal. Floride. Dubaï. Un studio, plusieurs fuseaux.",
        },
      ],

      methodsEyebrow: "Nos méthodes",
      methodsTitle: "Quatre cadres, développés en interne.",
      methods: [
        {
          name: "Hydra Analysis™",
          text: "Le diagnostic. Une lecture à 360° de l'entreprise   marque, présence digitale, opérations, expérience client   chaque pilier noté séparément, avant la moindre recommandation.",
          quote:
            "Coupez une tête. Deux repoussent. Chaque fracture tient aux autres.",
        },
        {
          name: "Architecture of Scale",
          text: "La séquence. Quatre piliers, toujours dans cet ordre : Infrastructure → Process → Capital humain → Moteur de revenus. Le marketing se branche sur le quatrième, jamais sur le premier.",
          quote:
            "On ne décore pas une façade avant de savoir ce que le bâtiment doit porter.",
        },
        {
          name: "Fountain Build™",
          text: "La mise en œuvre. Elle se fait aux côtés de vos équipes, service par service, jusqu'à ce que l'entreprise fasse tourner le système seule.",
          quote: "On remplit un étage. On le laisse déborder. Puis le suivant.",
        },
        {
          name: "B-Arch Labs™",
          text: "Le laboratoire interne. Formats publicitaires, tunnels et systèmes créatifs sont testés ici avant de toucher un compte client.",
          quote: "Votre budget ne sert pas à découvrir ce qui ne marche pas.",
        },
      ],

      numbersEyebrow: "En chiffres",
      numbers: [
        { value: "2025", label: "Année de création" },
        { value: "27+", label: "Entreprises architecturées" },
        { value: "43 %", label: "Gain d'efficacité moyen" },
        { value: "04", label: "Continents servis" },
      ],

      placesEyebrow: "Nos ancrages",
      placesTitle: "Un studio, plusieurs fuseaux.",
      placesNote:
        "Nous travaillons en français et en anglais, avec l'arabe pour nos clients marocains et du Golfe.",
      places: [
        { city: "Agadir", role: "Siège", zone: "GMT+1" },
        { city: "Casablanca", role: "Principal", zone: "GMT+1" },
        { city: "Paris", role: "Expansion", zone: "GMT+1" },
        { city: "Montréal", role: "Expansion", zone: "GMT−5" },
        { city: "Floride", role: "Expansion", zone: "GMT−5" },
        { city: "Dubaï", role: "Expansion", zone: "GMT+4" },
      ],

      faqEyebrow: "Questions fréquentes",
      faqTitle: "Ce qu'on nous demande le plus.",
      faq: [
        {
          q: "Qu'est-ce que l'architecture d'entreprise ?",
          a: "La structure invisible qui décide si une activité passe à l'échelle ou s'étouffe : la façon dont la marque, les opérations, la stratégie et les fondations tiennent ensemble. Nous l'étudions et nous la posons, comme un architecte le ferait d'un bâtiment.",
        },
        {
          q: "En quoi est-ce différent du conseil ?",
          a: "Un consultant remet un rapport et s'en va. Nous restons jusqu'à la mise en service : systèmes livrés, équipes formées, résultats mesurables. Nous facturons une transformation, pas des livrables.",
        },
        {
          q: "Comment se déroule une mission ?",
          a: "Elle s'ouvre par la Hydra Analysis™, le diagnostic à 360° qui note chaque pilier avant la moindre recommandation. L'Architecture of Scale fixe ensuite l'ordre du chantier : Infrastructure, Process, Capital humain, Moteur de revenus. Le Fountain Build™ met en œuvre aux côtés de vos équipes, service par service, jusqu'à ce que vous fassiez tourner le système seuls.",
        },
        {
          q: "Qu'est-ce que la Hydra Analysis™ ?",
          a: "Deux heures, une conversation. Vous repartez avec la Hydra Map : l'état de vos fractures visibles et la façon dont elles se tiennent les unes aux autres.",
        },
        {
          q: "Combien de temps avant de voir des résultats ?",
          a: "Le scan tient en deux heures et la carte est à vous le jour même. Pour le reste, la durée dépend de l'étendue des fractures   nous l'annonçons après le scan, jamais avant.",
        },
        {
          q: "Travaillez-vous en dehors du Maroc ?",
          a: "Oui. Le siège est à Agadir, et nous intervenons aussi depuis Casablanca, Paris, Montréal, la Floride et Dubaï. Nous travaillons en français et en anglais, avec l'arabe pour nos clients marocains et du Golfe.",
        },
      ],

      ctaEyebrow: "Commencer",
      ctaTitle: "Votre premier mouvement.",
      ctaText:
        "Deux heures. Une conversation. Nous cartographions chaque fracture visible de votre activité, et vous repartez avec la Hydra Map.",
      ctaAction: "Réserver une Hydra Analysis",
    },
    clients: {
      eyebrow: "Clients",
      titleLead: "Ceux pour qui nous",
      titleAccent: "construisons.",
      titleTail: "",
      lead: "Hôtellerie, restauration, santé, éducation, commerce, services. Des structures différentes, un même besoin : de la clarté et des résultats mesurables.",
      sectorsTitle: "Les secteurs que nous connaissons le mieux",
      statLabel: "projets livrés",
      workTitle: "Ce dont nous sommes le plus fiers",
      workLead:
        "Marque, site, contenu, campagnes douze chantiers menés de bout en bout, chacun détaillé sur notre portfolio.",
      viewProject: "Voir le projet",
      filters: {
        all: "Tous les projets",
        web: "Web design",
        hospitality: "Hôtellerie",
        restaurants: "Cafés & restaurants",
        lounge: "Lounge",
        education: "Éducation",
        health: "Santé",
      },
      empty: "Aucun projet dans cette catégorie pour l'instant.",
      projectLines: {
        bopassage:
          "Le lieu où l'on revient toujours, avec la couche digitale qui va avec.",
        "dmc-morocco":
          "Authenticité et excellence : une expertise hôtelière traduite de la marque jusqu'à la demande.",
        "educazen-kids":
          "Une éducation sur mesure, avec la structure digitale et opérationnelle qui suit.",
        "lunja-village":
          "Surf, nomades, communauté : une marque de village côtier rebâtie pour ceux qui arrivent vraiment.",
        "medical-bay":
          "Un centre médical, pensé de l'expérience patient jusqu'à la logique de revenus.",
        orsen: "La matière avant le décor.",
        "lithos-materiaux": "La matière, racontée avec soin.",
        "rihab-residence":
          "Une adresse marocaine tranquille, à cinq minutes de l'Atlantique.",
        "lunja-village-vibes": "Ta parenthèse ensoleillée à Imi Ouaddar.",
        "chillout-lounge":
          "Musique live, cocktails et couchers de soleil face à l'Atlantique.",
        "one-retail": "Au cœur du commerce marocain moderne.",
        "droguerie-souss": "Bâtissez avec les meilleurs matériaux.",
        mabrouk:
          "Une maison qui se reconnaît à sa lumière : laiton, bois et velours, tenus en marque.",
      },
      sectors: [
        {
          title: "Hôtellerie & tourisme",
          text: "Hôtels, riads, complexes et restaurants. Réservation directe, image de marque et contenu.",
        },
        {
          title: "Santé & bien-être",
          text: "Cliniques, cabinets et centres médicaux. Prise de rendez-vous, confiance et visibilité locale.",
        },
        {
          title: "Éducation & formation",
          text: "Écoles, centres de formation et plateformes. Inscriptions en ligne et outils de gestion.",
        },
        {
          title: "Commerce & e-commerce",
          text: "Boutiques et distributeurs. Catalogue, tunnel d'achat et campagnes d'acquisition.",
        },
        {
          title: "Services aux entreprises",
          text: "Cabinets, agences et prestataires. Positionnement, génération de prospects et LinkedIn.",
        },
        {
          title: "Immobilier & construction",
          text: "Promoteurs et groupes. Présentation des programmes et qualification des contacts.",
        },
      ],
      portfolioTitle: "Le portfolio complet",
      portfolioText:
        "Chaque projet est détaillé   contexte, travail réalisé, résultats   sur notre portfolio.",
      portfolioCta: "Ouvrir le portfolio",
    },
    solutions: {
      eyebrow: "Nos solutions",
      title: "Ce que nous construisons pour vous.",
      lead: "Quatre familles de solutions. Elles se combinent selon votre situation et votre budget.",
      deliverablesTitle: "Livrables inclus",
      processTitle: "Comment ça se passe",
      process: [
        {
          n: "01",
          title: "Appel de découverte",
          text: "30 minutes pour comprendre votre activité, votre objectif et votre échéance.",
        },
        {
          n: "02",
          title: "Audit & proposition",
          text: "Un diagnostic écrit, un périmètre précis et un budget clair. Sous 5 jours ouvrés.",
        },
        {
          n: "03",
          title: "Construction",
          text: "Ateliers, maquettes, développement et production. Vous validez à chaque étape.",
        },
        {
          n: "04",
          title: "Lancement & suivi",
          text: "Mise en ligne, formation, mesure. Puis optimisation mois après mois.",
        },
      ],
      groups: [
        {
          id: "web",
          title: "Création web & apps",
          text: "Sites, boutiques en ligne, applications mobiles et plateformes métier.",
          deliverables: [
            "Architecture de l'information et maquettes",
            "Design system réutilisable",
            "Développement responsive et accessible",
            "Hébergement, sécurité et sauvegardes",
            "Formation et documentation",
          ],
        },
        {
          id: "visibilite",
          title: "SEO, GEO & visibilité IA",
          text: "Être trouvé sur Google et cité par les assistants IA.",
          deliverables: [
            "Audit technique et sémantique",
            "Optimisation on-page et vitesse",
            "Contenu éditorial et maillage interne",
            "Fiche Google Business et référencement local",
            "Suivi de positions et rapport mensuel",
          ],
        },
        {
          id: "media",
          title: "Performance media & ads",
          text: "Des campagnes pilotées au résultat, pas à l'impression.",
          deliverables: [
            "Stratégie d'acquisition et budgets",
            "Campagnes Google, Meta et TikTok",
            "Création des visuels et des messages",
            "Tracking, conversions et tableau de bord",
            "Optimisation continue du coût par prospect",
          ],
        },
        {
          id: "contenu",
          title: "Stratégie, contenu & image",
          text: "Une marque cohérente et une présence qu'on suit vraiment.",
          deliverables: [
            "Plateforme de marque et ton de voix",
            "Identité visuelle et supports",
            "Production photo, vidéo et motion design",
            "Calendrier éditorial et community management",
            "Veille et gestion de l'e-réputation",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Dites-nous où vous en êtes.",
      lead: "Un message, un appel ou un e-mail. Nous répondons sous 48 heures.",
    },
    notFound: {
      title: "Page introuvable.",
      text: "Le lien que vous avez suivi n'existe pas ou a été déplacé.",
    },
  },
};

export type Dictionary = typeof fr;
