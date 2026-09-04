import type { Dictionary } from "@/lib/i18n/fr";

/** English translation. Typed against the French dictionary to guarantee parity. */
export const en: Dictionary = {
  locale: "en",
  htmlLang: "en",

  meta: {
    title: "EIDEN GROUP   Digital agency in Morocco",
    description:
      "Moroccan digital agency. Strategy, brand, website, campaigns and content: we build the digital systems that grow your business.",
  },

  common: {
    bookCall: "Book a call",
    seeSolutions: "Our solutions",
    seeCase: "View project",
    seeAllCases: "View all projects",
    contactUs: "Contact us",
    email: "Email us",
    previous: "Previous",
    next: "Next",
    pause: "Pause the carousel",
    play: "Resume the carousel",
    menu: "Menu",
    close: "Close",
    loading: "Loading",
    langSwitch: "Passer en français",
    langName: "English",
    backHome: "Back to home",
    backToTop: "Back to top",
    whatsapp: "Message us on WhatsApp",
    skipToContent: "Skip to main content",
  },

  nav: {
    home: "Home",
    about: "Architecture",
    clients: "Clients",
    solutions: "Solutions",
    contact: "Contact",
  },

  menu: {
    label: "Menu",
    captions: {
      home: "Where it all begins.",
      about: "The structure before the façade.",
      clients: "The work, unfiltered.",
      solutions: "What we know how to do.",
      contact: "We open the door.",
    },
    booking: "Book a slot",
  },

  hero: {
    titleLead: "The digital structure that",
    titleAccent: "grows",
    titleTail: "your business.",
    description:
      "Web-apps, marque, marketing & ads : most companies add these one at a time, each on its own. We do the opposite. We build a solid base first, then add each piece on top of it, so everything works together ",
    stats: [
      { value: "25+", label: "Businesses supported" },
      { value: "92%", label: "Clients on a continuous retainer" },
    ],
    trust: "More than 25 businesses supported",
    trustSub: "Morocco, Africa and the Middle East",
    clientsLabel: "Trusted by",
    featured: {
      badge: "Case study",
      text: "How Lunja Village became a coastal brand its guests recognise   and book directly.",
      metricLabel: "direct bookings in 6 months",
      cta: "Read the case study",
    },
    scroll: "Explore",
  },

  idea: {
    eyebrow: "The EIDEN idea",
    title: "We don't hand out advice. We build.",
    lead: "Most Moroccan businesses don't have an idea problem. They have a structure problem. The website exists but doesn't sell. Social media runs but brings no one in. Ads cost money without anyone knowing what comes back.",
    lead2:
      "EIDEN puts that in order. We start from your numbers and your customers, then build one coherent whole: a clear brand, a site that converts, campaigns that are measured. You own all of it. You understand all of it.",
    pillars: [
      {
        n: "01",
        title: "Understand first",
        text: "An audit of your market, your customers and your numbers. We find what is blocking you before proposing anything.",
      },
      {
        n: "02",
        title: "Then build",
        text: "Brand, site, content, campaigns. Every piece is designed for a precise goal and fits with the others.",
      },
      {
        n: "03",
        title: "Then keep it running",
        text: "We measure, adjust and improve every month. Digital isn't a project that ends: it's a system that lives.",
      },
    ],
    shiftLead: "What changes",
    shiftTail: "when you work with us.",
    cards: [
      {
        label: "What stops",
        body: "Digital in scattered pieces",
        points: [
          "A website, ads, a logo. Three suppliers who never talk.",
          "You don’t know where your customers come from, or what they cost.",
          "Your access, accounts and data sit with the agency, not with you.",
          "Decisions get made on gut feeling, not on numbers.",
          "Every new need starts again from zero.",
          "You pay without building anything that lasts.",
        ],
      },
      {
        label: "What starts",
        body: "A structure that holds",
        points: [
          "One team, one plan. Website, brand, ads and content move together.",
          "A clear report every month: what works, what we’re changing.",
          "Everything is in your name. If you leave, you leave with all of it.",
          "Decisions come from numbers, not opinions.",
          "We add without breaking. The base carries what comes next.",
          "Every month, you’re stronger than the month before.",
        ],
      },
    ],
    stats: [
      { value: "25+", label: "Businesses supported" },
      { value: "6", label: "Sectors of expertise" },
      { value: "2025", label: "Founded" },
      { value: "4", label: "Continents served" },
    ],
  },

  services: {
    eyebrow: "Four capabilities. One architecture.",
    title: "These are not four services. They are one system.",
    hint: "Hover an expertise to see the detail",
    deliverablesLabel: "Scope & deliverables",
    items: [
      {
        slug: "web",
        title: "Web & app creation",
        kicker: "The foundation everything else stands on",
        text: "Brochure sites, online shops, direct booking, business apps. You own it, and you can update your own text and images.",
        deliverables: [
          "Marketing sites",
          "E-commerce",
          "Mobile apps (iOS / Android)",
          "Bespoke business platforms",
        ],
      },
      {
        slug: "visibilite",
        title: "SEO, GEO & AI visibility",
        kicker: "Being found where the next search actually happens",
        text: "A site Google understands, a complete and active Google Business profile, and content written so that search engines classic and AI mention you before your competitors.",
        deliverables: [
          "Technical SEO",
          "Content & link building",
          "GEO (generative engines)",
          "Visibility in ChatGPT / Gemini / Perplexity",
        ],
      },
      {
        slug: "media",
        title: "Performance media & ads",
        kicker: "Buying traffic is not the same as building acquisition",
        text: "A budget that goes where it returns. You know what a customer costs you, which campaigns we stop and which we scale. No spending without an explanation.",
        deliverables: [
          "Google Ads",
          "Paid social",
          "Programmatic",
          "Lead generation",
          "Conversion-rate optimisation",
        ],
      },
      {
        slug: "contenu",
        title: "Strategy, content & image",
        kicker: "The identity that makes the rest recognizable",
        text: "Clear positioning, a full visual identity, simple messages you can repeat everywhere, and the content that brings them to life: social media, articles, presentations.",
        deliverables: [
          "Audit & strategy",
          "Video & motion design",
          "Photography",
          "Editorial line",
          "Community management",
          "Online reputation & crisis handling",
        ],
      },
      {
        slug: "photoVid",
        title: "Photos & videos",
        kicker: "What the brand actually gives people to look at",
        text: " On-location shoots, retouched photos, short videos formatted for social. Delivered ready to publish.",
        deliverables: [
          "Photography shoots",
          "Video production",
          "Reels & social media content",
          "Editing & post-production",
        ],
      },
    ],
  },

  vsl: {
    eyebrow: "In 90 seconds",
    title: "Here is how we work.",
    text: "No jargon, no promises. We show you the method: diagnosis, build, then monthly follow-up. Three steps, always the same.",
    play: "Play video",
    pause: "Pause",
    mute: "Mute",
    unmute: "Unmute",
    sound: "Sound",
    fullscreen: "Fullscreen",
  },

  team: {
    eyebrow: "The team",
    title: "The people behind our results.",
    text: "A founder who stays on every file, and four specialists behind him. One point of contact for you, a complete team at work.",
    founder: {
      initials: "OL",
      name: "Oualid Laati",
      role: "Founder · Chief architect",
      text: "He opens every engagement with the diagnosis and stays the project's contact through to delivery. Strategy, trade-offs, architecture: nothing ships without going through him.",
    },
    members: [
      {
        initials: "HE",
        name: "Hassan ElKhadiri",
        role: "Head of Brand & Marketing",
        text: "Positioning, identity and acquisition.",
      },
      {
        initials: "YA",
        name: "Youssef Azella",
        role: "Director of Story & Motion",
        text: "Art direction, film and motion design.",
      },
      {
        initials: "AA",
        name: "Abdelhakim Akhidar",
        role: "Solution Architect & Lead Dev",
        text: "Web, platforms, integrations and performance.",
      },
      {
        initials: "AO",
        name: "Aya Ouahyb",
        role: "Admin & Task Management",
        text: "Planning, delivery tracking and coordination.",
      },
    ],
    note: "Based in Agadir. We work across Morocco, on site or remotely.",
  },

  proof: {
    eyebrow: "Proof & results",
    title: "The work speaks before we do.",
    text: "Brands, websites and campaigns delivered for Moroccan businesses that wanted to scale.",
    statsNote: "Consolidated figures across our 2024–2026 engagements.",
    ctaPortfolio: "Portfolio",
    ctaSolutions: "Solutions",
    outro: {
      eyebrow: "What next",
      projectsTitle: "This is only part of the work.",
      projectsText:
        "Brands, sites and campaigns: the rest of the projects are waiting in the portfolio.",
      solutionsTitle: "Want the same for your business?",
      solutionsText: "What we do, how we do it, and what stays yours at the end.",
    },
    railTitle: "The portfolio, on a loop.",
    railText:
      "Brands, sites and campaigns delivered for Moroccan businesses. Let it run, or open the full portfolio.",
    stats: [
      { value: "25+", label: "Projects delivered" },
      { value: "6", label: "Sectors covered" },
      { value: "92%", label: "Clients on ongoing retainers" },
      { value: "48h", label: "Average response time" },
    ],
    cases: [
      {
        slug: "lunja-village",
        title:
          "A complete coastal identity and a social presence that fills the seasons.",
        text: "For Lunja Village we built the entire brand: logo, visual world, collateral, social content and site. The resort went from a name few knew to a destination travellers search for by name.",
        tags: ["Branding", "Social media", "Website"],
        quote: "",
        author: "",
      },
      {
        slug: "bopassage",
        title:
          "An Agadir café-restaurant finally visible online, from first click to booked table.",
        text: "Bôpassage had the room and the regulars, but no site and no social rhythm. We launched the site, structured the editorial line and ran Google Ads campaigns aimed at bookings.",
        tags: ["Website", "Content", "Google Ads"],
        quote: "",
        author: "",
      },
      {
        slug: "medical-bay",
        title:
          "A medical centre rethought, from patient experience through to appointment follow-up.",
        text: "Brand, signage, website and campaigns for Medical Bay. The goal: make booking obvious, and bring in medical-tourism patients too.",
        tags: ["Identity", "Website", "Campaigns"],
        quote: "",
        author: "",
      },
      {
        slug: "dmc-morocco",
        title:
          "Thirty years of hotel expertise turned into a brand, from blank page to first contract.",
        text: "Naming, identity, website and LinkedIn strategy for DMC Hospitality Morocco. Expertise that had existed for years, but had never had a face.",
        tags: ["Naming", "Identity", "LinkedIn"],
        quote: "",
        author: "",
      },
      {
        slug: "educazen-kids",
        title:
          "A school that finally runs enrolment and communication in one place.",
        text: "Website, platform and internal tools for EducazenKids. Parents enrol online, the team follows everything from a single dashboard.",
        tags: ["Platform", "Website", "Internal tools"],
        quote: "",
        author: "",
      },
    ],
    testimonials: [
      {
        quote:
          "They started by listening and by looking at our numbers. The website came after, and it finally looks like who we actually are.",
        author: "Management",
        company: "Hospitality   Agadir",
      },
      {
        quote:
          "We knew we needed digital but not where to start. EIDEN put a clear order on it, step by step.",
        author: "Founder",
        company: "Retail & distribution   Casablanca",
      },
      {
        quote:
          "The monthly follow-up changes everything. We see what the ads bring back, in dirhams, not impressions.",
        author: "Marketing director",
        company: "Healthcare   Agadir",
      },
      {
        quote:
          "A team that answers fast and explains in plain language. That's rare, and it matters a lot.",
        author: "Management",
        company: "Education Marrakech",
      },
    ],
  },

  offer: {
    eyebrow: "Our 4 areas of expertise",
    title: "Complete digital services, from Morocco.",
    text: "What you actually get, with the deliverables and the expected outcomes.",
    items: [
      {
        n: "01",
        title: "Web & app creation",
        text: "Marketing sites, e-commerce, mobile apps (iOS / Android) and bespoke business platforms.",
        detail:
          "We design digital solutions that are fast and built to last: high-performance sites, online stores, native apps and internal tools. The code is yours.",
        link: "Explore our solutions",
        href: "/nos-solutions#web",
      },
      {
        n: "02",
        title: "SEO, GEO & AI visibility",
        text: "Be visible where your customers search: on Google, and inside AI answers.",
        detail:
          "Technical SEO, content, link building and GEO (Generative Engine Optimization) so you appear in ChatGPT, Gemini and Perplexity. The goal: become the reference in your market.",
        link: "Improve your visibility",
        href: "/nos-solutions#visibilite",
      },
      {
        n: "03",
        title: "Performance media & ads",
        text: "Precise advertising campaigns: Google Ads, social platforms, programmatic.",
        detail:
          "Media buying and lead generation. We steer your budgets on ROI, with clear monthly reporting and continuous conversion-rate work.",
        link: "Accelerate acquisition",
        href: "/nos-solutions#media",
      },
      {
        n: "04",
        title: "Strategy, content & image",
        text: "From audit to production: video, motion design, photography and editorial line.",
        detail:
          "Community management, competitive monitoring and crisis handling. We protect your online reputation and give your audience a reason to follow you.",
        link: "Structure your strategy",
        href: "/nos-solutions#contenu",
      },
    ],
  },

  bookCall: {
    eyebrow: "Next step",
    title: "A 30-minute call. A clear plan.",
    text: "We look together at where you stand, what is blocking you and what can start quickly. No commitment, no sales pitch.",
    points: [
      "An honest diagnosis of your digital presence",
      "The two or three priorities that actually matter",
      "A realistic budget range, from the first conversation",
    ],
    cta: "Book my call",
    secondary: "Send an email",
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Clear budgets, from the start.",
    text: "Three ways to work together. Final pricing is set after the first call, based on the real scope.",
    note: "Indicative amounts in Moroccan dirhams, excluding tax.",
    popular: "Most chosen",
    cta: "Request a quote",
    plans: [
      {
        name: "Launch",
        price: "From 25,000 MAD",
        billing: "one-off project",
        text: "To lay clean foundations: a brand, a site and the measurement tools.",
        features: [
          "Framing workshop and initial audit",
          "Visual identity or light rebrand",
          "Marketing site up to 6 pages",
          "Tracking and analytics setup",
          "Hands-on training",
        ],
      },
      {
        name: "Growth",
        price: "From 12,000 MAD",
        billing: "per month",
        text: "To set a rhythm: content, campaigns and continuous optimisation.",
        features: [
          "Everything included in Launch",
          "Google Ads and social campaigns",
          "Monthly content production",
          "Technical and editorial SEO",
          "Monthly report and steering call",
          "One dedicated point of contact",
        ],
      },
      {
        name: "Bespoke",
        price: "On request",
        billing: "scope-based",
        text: "For platforms, applications and multi-site organisations.",
        features: [
          "Custom web or mobile application",
          "Business platform and integrations",
          "Technical architecture and security",
          "Multi-brand or multi-country support",
          "Maintenance contract and SLA",
        ],
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "MAY WE BE THE SOLUTION",
    text: "We reply within 48 hours, in French, English or Darija.",
    cta: "Book a call",
    infoLabels: {
      email: "Email",
      phone: "Phone",
      address: "Address",
      hours: "Hours",
    },
    hours: "Monday – Friday, 9am – 6pm (GMT+1)",
    /* The card beside the form: a call is the shorter way in, so it is
       given its own seal rather than a line in the copy. */
    book: {
      stamp: "Tell us about your project",
      title: "Click here to schedule a call",
      text: "30 minutes, no strings. We look at where you stand, and what there is to build.",
      whatsapp: "Hello EIDEN, I'd like to book a call to talk about my project.",
    },
    map: {
      label: "Find us",
      action: "Open in Google Maps",
      frameTitle: "Map of EIDEN GROUP's offices in Agadir",
    },
    form: {
      title: "Write to us",
      name: "Full name",
      company: "Company",
      email: "Email address",
      phone: "Phone",
      subject: "What you need",
      subjects: [
        "Website or application",
        "Brand identity",
        "Advertising & acquisition",
        "Content & social media",
        "Other",
      ],
      otherLabel: "Tell us what you need",
      otherPlaceholder: "In a few words.",
      message: "Your message",
      messagePlaceholder:
        "Tell us about your business, your goal and your timeline.",
      submit: "Send request",
      sending: "Sending…",
      success:
        "Thank you. Your request is ready   your mail app will open to send it.",
      error: "Something went wrong. Try again or email us directly.",
      required: "Required field",
      invalidEmail: "Invalid email address",
      optional: "optional",
    },
  },

  footer: {
    tagline: "Where chaos becomes architecture.",
    bookCall: "Book a call",
    email: "Drop us an email",
    navLabel: "Navigation",
    socialLabel: "Social",
    contactLabel: "Contact",
    legal: "Legal notice",
    privacy: "Privacy",
    rights: "All rights reserved",
    madeIn: "Designed and built in Agadir, Morocco",
    phoneMaLabel: "Morocco",
  },

  pages: {
    about: {
      eyebrow: "About",
      titleLead: "A firm built on a",
      titleAccent: "category",
      titleTail: "that did not exist yet.",
      lead: "The MENA region's first business architecture firm. Headquartered in Agadir; at work across four continents.",

      positionEyebrow: "Where we stand",
      positionTitle: "We do not hand out advice. We lay the structure.",
      positionBody:
        "Business architecture is the invisible structure that decides whether a company scales or suffocates. We treat it the way an architect treats a building: studied, structured, deliberate   with an engineer's rigour and a designer's eye.",

      storyEyebrow: "The origin",
      storyTitle: "Four movements.",
      movements: [
        {
          n: "I",
          title: "The inheritance",
          text: "Our founder spent over a decade working in Moroccan and international businesses as an operator, a sales and marketing strategist, and eventually, the person companies turned to when growth stalled and no one knew why.",
        },
        {
          n: "II",
          title: "The pattern",
          text: "The same scene, every time. Strong founders. Good products. Capable teams. And underneath: revenue leaking through gaps nobody had mapped, operations running on WhatsApp voice notes.",
        },
        {
          n: "III",
          title: "The insight",
          text: "What was missing was not one more opinion. It was architecture. And no firm in the region was treating that work as a discipline of its own.",
        },
        {
          n: "IV",
          title: "The architecture",
          text: "EIDEN came out of that: the rigour of engineers and the sensibility of designers, brought to a business the way they are brought to a building.",
        },
      ],

      principlesEyebrow: "Our principles",
      principlesTitle: "Four rules, held on every engagement.",
      principles: [
        {
          n: "01",
          title: "Architecture before advice",
          text: "We listen to the whole system before we suggest anything at all.",
          quote:
            "We map before we move. The fracture network first, the interventions second.",
        },
        {
          n: "02",
          title: "Structure with style",
          text: "Operational rigour and care for form are not two separate trades.",
          quote:
            "Operations that look like nothing are operations that get ignored.",
        },
        {
          n: "03",
          title: "Execution, not consulting",
          text: "We stay through to go-live. We price a transformation, not a stack of deliverables.",
          quote: "Shipped systems. Trained teams. Measurable outcomes.",
        },
        {
          n: "04",
          title: "Rooted in Morocco, fluent anywhere",
          text: "The base is Moroccan, the reach is international   Africa, Europe, North America.",
          quote:
            "Agadir. Casablanca. Paris. Montréal. Florida. Dubai. One studio, many timezones.",
        },
      ],

      methodsEyebrow: "Our methods",
      methodsTitle: "Four frameworks, built in-house.",
      methods: [
        {
          name: "Hydra Analysis™",
          text: "The diagnosis. A 360° read of the business   brand, digital presence, operations, customer experience   every pillar scored on its own, before a single recommendation.",
          quote:
            "Cut one head. Two more appear. Every fracture holds to the others.",
        },
        {
          name: "Architecture of Scale",
          text: "The sequence. Four pillars, always in this order: Infrastructure → Process → Human Capital → Revenue Engine. Marketing plugs into the fourth, never the first.",
          quote:
            "You don't dress a façade before you know what the building has to carry.",
        },
        {
          name: "Fountain Build™",
          text: "The build. It happens alongside your own team, department by department, until the business can run the system on its own.",
          quote: "Fill one tier. Let it overflow. Then the next.",
        },
        {
          name: "B-Arch Labs™",
          text: "The internal lab. Ad formats, funnels and creative systems are tested here before they touch a client account.",
          quote: "Your budget is not there to find out what doesn't work.",
        },
      ],

      numbersEyebrow: "By the numbers",
      numbers: [
        { value: "2025", label: "Founded" },
        { value: "27+", label: "Businesses architected" },
        { value: "43%", label: "Average efficiency gain" },
        { value: "04", label: "Continents served" },
      ],

      placesEyebrow: "Where we sit",
      placesTitle: "One studio, many timezones.",
      placesNote:
        "We work in French and English, with Arabic for our Moroccan and Gulf clients.",
      places: [
        { city: "Agadir", role: "Headquarters", zone: "GMT+1" },
        { city: "Casablanca", role: "Primary", zone: "GMT+1" },
        { city: "Paris", role: "Expansion", zone: "GMT+1" },
        { city: "Montréal", role: "Expansion", zone: "GMT−5" },
        { city: "Florida", role: "Expansion", zone: "GMT−5" },
        { city: "Dubai", role: "Expansion", zone: "GMT+4" },
      ],

      faqEyebrow: "Frequently asked",
      faqTitle: "What we get asked most.",
      faq: [
        {
          q: "What is business architecture?",
          a: "The invisible structure that decides whether a company scales or suffocates: how the brand, the operations, the strategy and the foundation hold together. We study it and we lay it, the way an architect would with a building.",
        },
        {
          q: "How is this different from consulting?",
          a: "A consultant hands over a report and leaves. We stay through to go-live: shipped systems, trained teams, measurable outcomes. We price a transformation, not a stack of deliverables.",
        },
        {
          q: "How does an engagement run?",
          a: "It opens with the Hydra Analysis™, the 360° diagnosis that scores every pillar before a single recommendation. Architecture of Scale then sets the order of the build: Infrastructure, Process, Human Capital, Revenue Engine. Fountain Build™ implements alongside your own team, department by department, until you run the system without us.",
        },
        {
          q: "What is the Hydra Analysis™?",
          a: "Two hours, one conversation. You leave with the Hydra Map: the state of your visible fractures and the way they hold to one another.",
        },
        {
          q: "How long before we see results?",
          a: "The scan takes two hours and the map is yours the same day. Beyond that, the timeline follows the spread of the fractures   we quote it after the scan, never before.",
        },
        {
          q: "Do you work outside Morocco?",
          a: "Yes. The base is Agadir, and we also work out of Casablanca, Paris, Montréal, Florida and Dubai. We operate in French and English, with Arabic for our Moroccan and Gulf clients.",
        },
      ],

      ctaEyebrow: "Begin",
      ctaTitle: "Your first move.",
      ctaText:
        "Two hours. One conversation. We map every visible fracture in your business, and you leave with the Hydra Map.",
      ctaAction: "Book a Hydra Analysis",
    },
    clients: {
      eyebrow: "Clients",
      titleLead: "The people we",
      titleAccent: "build",
      titleTail: "for.",
      lead: "Hospitality, food, healthcare, education, retail, services. Different structures, one shared need: clarity and measurable results.",
      sectorsTitle: "The sectors we know best",
      statLabel: "projects delivered",
      workTitle: "What we are proudest of",
      workLead:
        "Brand, site, content, campaigns   twelve projects carried end to end, each one written up in full on our portfolio.",
      viewProject: "See the project",
      filters: {
        all: "All work",
        web: "Web design",
        hospitality: "Hospitality",
        restaurants: "Cafés & Restaurants",
        lounge: "Lounge",
        education: "Education",
        health: "Healthcare",
      },
      empty: "Nothing in this category yet.",
      projectLines: {
        bopassage:
          "The place you always come back to   now with the digital layer to match.",
        "dmc-morocco":
          "Authenticity and excellence: hotel expertise translated from the mark to the inquiry.",
        "educazen-kids":
          "Tailored education, with the digital and operational stack to match.",
        "lunja-village":
          "Surf, nomads, community   a coastal village brand rebuilt for who is actually arriving.",
        "medical-bay":
          "A medical centre, architected from patient experience to revenue logic.",
        orsen: "Substance before decoration.",
        "lithos-materiaux": "Material, told with care.",
        "rihab-residence":
          "A quiet Moroccan address, five minutes from the Atlantic.",
        "lunja-village-vibes": "Your sunlit break in Imi Ouaddar.",
        "chillout-lounge":
          "Live music, cocktails and sunset sessions facing the Atlantic.",
        "one-retail": "At the heart of modern Moroccan retail.",
        "droguerie-souss": "Build with the best materials.",
        mabrouk:
          "A house you recognise by its light: brass, wood and velvet, held as a brand.",
      },
      sectors: [
        {
          title: "Hospitality & tourism",
          text: "Hotels, riads, resorts and restaurants. Direct bookings, brand image and content.",
        },
        {
          title: "Health & wellbeing",
          text: "Clinics, practices and medical centres. Appointments, trust and local visibility.",
        },
        {
          title: "Education & training",
          text: "Schools, training centres and platforms. Online enrolment and management tools.",
        },
        {
          title: "Retail & e-commerce",
          text: "Stores and distributors. Catalogue, checkout funnel and acquisition campaigns.",
        },
        {
          title: "Business services",
          text: "Firms, agencies and providers. Positioning, lead generation and LinkedIn.",
        },
        {
          title: "Real estate & construction",
          text: "Developers and groups. Programme presentation and lead qualification.",
        },
      ],
      portfolioTitle: "The full portfolio",
      portfolioText:
        "Every project is detailed   context, work delivered, results   on our portfolio.",
      portfolioCta: "Open the portfolio",
    },
    solutions: {
      eyebrow: "Our solutions",
      title: "What we build for you.",
      lead: "Four families of solutions. They combine according to your situation and your budget.",
      deliverablesTitle: "Deliverables included",
      processTitle: "How it works",
      process: [
        {
          n: "01",
          title: "Discovery call",
          text: "30 minutes to understand your business, your goal and your timeline.",
        },
        {
          n: "02",
          title: "Audit & proposal",
          text: "A written diagnosis, a precise scope and a clear budget. Within 5 working days.",
        },
        {
          n: "03",
          title: "Build",
          text: "Workshops, mockups, development and production. You approve at every step.",
        },
        {
          n: "04",
          title: "Launch & follow-up",
          text: "Go live, training, measurement. Then optimisation month after month.",
        },
      ],
      groups: [
        {
          id: "web",
          title: "Web & app creation",
          text: "Sites, online stores, mobile apps and business platforms.",
          deliverables: [
            "Information architecture and mockups",
            "Reusable design system",
            "Responsive, accessible development",
            "Hosting, security and backups",
            "Training and documentation",
          ],
        },
        {
          id: "visibilite",
          title: "SEO, GEO & AI visibility",
          text: "Get found on Google and cited by AI assistants.",
          deliverables: [
            "Technical and semantic audit",
            "On-page and speed optimisation",
            "Editorial content and internal linking",
            "Google Business profile and local SEO",
            "Rank tracking and monthly reporting",
          ],
        },
        {
          id: "media",
          title: "Performance media & ads",
          text: "Campaigns steered on results, not impressions.",
          deliverables: [
            "Acquisition strategy and budgets",
            "Google, Meta and TikTok campaigns",
            "Creative assets and messaging",
            "Tracking, conversions and dashboard",
            "Continuous cost-per-lead optimisation",
          ],
        },
        {
          id: "contenu",
          title: "Strategy, content & image",
          text: "A coherent brand and a presence people actually follow.",
          deliverables: [
            "Brand platform and tone of voice",
            "Visual identity and collateral",
            "Photo, video and motion production",
            "Editorial calendar and community management",
            "Monitoring and online reputation",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Tell us where you stand.",
      lead: "A message, a call or an email. We reply within 48 hours.",
    },
    notFound: {
      title: "Page not found.",
      text: "The link you followed doesn't exist or has moved.",
    },
  },
};
