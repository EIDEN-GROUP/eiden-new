export const siteConfig = {
  name: "EIDEN GROUP",
  domain: "eiden-group.com",
  url: "https://eiden-group.com",
  founded: "2025",
  email: "contact@eiden-group.com",
  phoneMa: "+212 777 777 428",
  address: "Agadir Bay, Technopole 1, Bloc B101 Agadir 80000, Maroc",
  bookingUrl: "/contact",
  portfolioUrl: "https://portfolio.eiden-group.com",
  socials: {
    linkedin: "https://www.linkedin.com/company/eiden-group/",
    instagram: "https://www.instagram.com/eiden.group/",
    facebook: "https://www.facebook.com/eiden.group/",
  },
} as const;

export type NavRoute = {
  href: string;
  key: "home" | "about" | "clients" | "solutions" | "contact";
};

export const navRoutes: NavRoute[] = [
  { href: "/", key: "home" },
  { href: "/a-propos", key: "about" },
  { href: "/clients", key: "clients" },
  { href: "/nos-solutions", key: "solutions" },
  { href: "/contact", key: "contact" },
];

export const projectGallery = [
  { src: "/work/lunja-village/lunja-hero.png", client: "Lunja Village" },
  { src: "/work/bopassage/bopassage-web-desktop.png", client: "Bôpassage" },
  { src: "/work/medical-bay/medical-bay-brand.png", client: "Medical Bay" },
  {
    src: "/work/dmc-morocco/dmc-brand-posters.png",
    client: "DMC Hospitality Morocco",
  },
  { src: "/work/educazen-kids/educazenkids-cover.png", client: "EducazenKids" },
  { src: "/work/lunja-village/lunja-brand-board.png", client: "Lunja Village" },
  { src: "/work/bopassage/bopassage-brand-identity.png", client: "Bôpassage" },
  { src: "/work/medical-bay/medical-bay-web-desktop.png", client: "Medical Bay" },
  {
    src: "/work/dmc-morocco/dmc-web-desktop.png",
    client: "DMC Hospitality Morocco",
  },
  {
    src: "/work/educazen-kids/educazenkids-brand-identity.png",
    client: "EducazenKids",
  },
  { src: "/work/lunja-village/lunja-brand-tote.png", client: "Lunja Village" },
  { src: "/work/dmc-morocco/dmc-cover.png", client: "DMC Hospitality Morocco" },
] as const;

export const clientLogos = [
  { name: "Bôpassage", src: "/clients/bopassage.png" },
  { name: "DMC Hospitality Morocco", src: "/clients/dmc.png" },
  { name: "Lunja Village", src: "/clients/lunja-village.png" },
  { name: "MADAEF", src: "/clients/madaef.png" },
  { name: "Anisal", src: "/clients/anisal.png" },
  { name: "EducazenKids", src: "/clients/educazenkids.png" },
  { name: "Medical Bay", src: "/clients/medical-bay.png" },
  // { name: "EIDEN Academy", src: "/clients/eiden-academy.png" },
  { name: "One Retail", src: "/clients/one-retail.png" },
  { name: "Droguerie Souss", src: "/clients/souss-drougerie.png" },
  { name: "Chill Out", src: "/clients/chill-out.png" },
] as const;

export type CaseStudyRecord = {
  slug: string;
  client: string;
  image: string;
  imageAlt: string;
  website?: string;
  metric: string;
};

export const caseStudies: CaseStudyRecord[] = [
  {
    slug: "lunja-village",
    client: "Lunja Village",
    image: "/work/lunja-village/1.png",
    imageAlt: "Vue aérienne du village Lunja Village au coucher du soleil",
    website: "https://www.lunjavillage.com",
    metric: "+38%",
  },
  {
    slug: "dmc-morocco",
    client: "DMC Hospitality Morocco",
    image: "/work/dmc-morocco/dmc site image.png",
    imageAlt: "Bureaux DMC Hospitality Morocco avec la marque sur la paroi vitrée",
    website: "https://dmchm.com",
    metric: "0 → 1",
  },
  // {
  //   slug: "mabrouk",
  //   client: "Hôtel Mabrouk",
  //   image: "/work/mabrouk-hotel/mabrouk-hotel-brand.png",
  //   imageAlt: "Identité du hotel Mabrouk à Agadir",
  //   metric: "+120",
  // },
  {
    slug: "bopassage",
    client: "Bôpassage",
    image: "/work/bopassage/image web site eiden bo.png",
    imageAlt: "Terrasse du restaurant Bôpassage à Agadir",
    website: "https://bopassage.com",
    metric: "x3",
  },
  // {
  //   slug: "educazen-kids",
  //   client: "EducazenKids",
  //   image: "/work/educazen-kids/educazen-hero.png",
  //   imageAlt: "Site web et plateforme EducazenKids sur ordinateur",
  //   metric: "+62%",
  // },
];

export type ProjectCategory =
  | "web"
  | "hospitality"
  | "restaurants"
  | "lounge"
  | "education"
  | "health"
  | "cooperative";

export type ProjectRecord = {
  slug: string;
  name: string;
  category: ProjectCategory;
  image: string;
  imageAlt: string;
};

export const projects = [
  {
    slug: "chillout-lounge",
    name: "CHILLOUT Lounge",
    category: "lounge",
    image: "/work/chillout-lounge/chilout card.png",
    imageAlt: "Site web du CHILLOUT Lounge",
  },
  {
    slug: "educazen-kids",
    name: "EducazenKids",
    category: "education",
    image: "/work/educazen-kids/educazen-hero.png",
    imageAlt: "Plateforme et identité EducazenKids",
  },
  {
    slug: "lunja-village",
    name: "Lunja Village",
    category: "hospitality",
    image: "/work/lunja-village/Drone 1.png",
    imageAlt: "Univers de marque du village côtier Lunja Village",
  },
  {
    slug: "medical-bay",
    name: "Medical Bay",
    category: "health",
    image: "/work/medical-bay/medical-bay-brand.png",
    imageAlt: "Identité du centre médical Medical Bay",
  },
  {
    slug: "droguerie-souss",
    name: "Souss Droguerie",
    category: "web",
    image: "/work/droguerie-souss/drogurie souss card.png",
    imageAlt: "Site web Souss Droguerie",
  },
  {
    slug: "orsen",
    name: "ORSEN",
    category: "web",
    image: "/work/orsen/orsen hero.png",
    imageAlt: "Site web ORSEN",
  },
  {
    slug: "mabrouk",
    name: "Mabrouk Hôtel",
    category: "hospitality",
    image: "/work/mabrouk/imgg1 (1).png",
    imageAlt: "L’accueil du Mabrouk Hôtel",
  },
  {
    slug: "dmc-morocco",
    name: "DMC Hospitality Morocco",
    category: "hospitality",
    image: "/work/dmc-morocco/dmc-cover.png",
    imageAlt: "Marque et supports DMC Hospitality Morocco",
  },
  {
    slug: "lithos-materiaux",
    name: "LITHOS",
    category: "web",
    image: "/work/lithos-materiaux/lotus card.png",
    imageAlt: "Site web LITHOS Matériaux",
  },
  {
    slug: "rihab-residence",
    name: "Résidence Rihab",
    category: "web",
    image: "/work/rihab-residence/web-rihab-desktop.jpg",
    imageAlt: "Site web de la Résidence Rihab",
  },
  {
    slug: "anisal",
    name: "Anisal",
    category: "cooperative",
    image: "/clients/anisal.png",
    imageAlt: "Identité de la coopérative Anisal",
  },
  {
    slug: "madaef",
    name: "MADAEF",
    category: "hospitality",
    image: "/clients/madaef.png",
    imageAlt: "Identité MADAEF",
  },
  {
    slug: "bopassage",
    name: "Bôpassage",
    category: "restaurants",
    image: "/work/bopassage/image web site eiden bo.png",
    imageAlt: "Identité et site web du restaurant Bôpassage",
  },
  {
    slug: "centre-accompagnement",
    name: "Centre d'accompagnement",
    category: "education",
    image: "/media/eiden-hero-poster.jpg",
    imageAlt: "Le centre d'accompagnement",
  },

  // {
  //   slug: "lunja-village-vibes",
  //   name: "Lunja Village Vibes",
  //   category: "web",
  //   image: "/work/lunja-village/web-lunja-vibes-cover.jpg",
  //   imageAlt: "Site web Lunja Village Vibes",
  // },
  // {
  //   slug: "one-retail",
  //   name: "One Retail",
  //   category: "web",
  //   image: "/work/one-retail/one reail card.png",
  //   imageAlt: "Site web One Retail",
  // },
] as const satisfies readonly ProjectRecord[];

export type ProjectSlug = (typeof projects)[number]["slug"];

export function portfolioProjectUrl(slug: string) {
  return `${siteConfig.portfolioUrl}/projects/${slug}`;
}

export const menuMedia: Record<NavRoute["key"], string> = {
  home: "/work/hero.png",
  about: "/media/eiden-hero-poster.jpg",
  clients: "/media/clients-bg.png",
  solutions: "/media/architecture-1.jpg",
  contact: "/work/contact-bg.png",
};

export const heroTexture = "/work/hero.png";

export const contactTexture = "/work/contact-bg.png";

export const aboutTexture = "/work/contact-bg.png";

export const proofTexture = "/work/project-5.jpg";

export const solutionCover = "/services/photo-5.jpg";

export const solutionTexture = "/media/contact-solution.png";

// export const solutionbg = "/media/bg-solution.jpeg";

export const ideaTexture = "/media/idea-bg.png";

/** Les deux rideaux de « Nos systèmes », alternés d'un panneau à l'autre. */
export const systemPanelTextures = [
  "/media/idea-bg.png",
] as const;

export const movementMedia = [
  "/media/heritage.png",
  "/media/schema.png",
  "/media/intuition.png",
  "/media/architecture.jpeg",
] as const;

/** One per principle, in the order the rules are written. */
export const principleMedia = [
  "/work/card-1.jpeg",
  "/work/card-2.jpeg",
  "/work/card-2.jpeg",
  "/work/card-1.jpeg",
] as const;

export const serviceMedia: Record<string, string> = {
  web: "/services/photo-5.jpg",
  visibilite: "/services/photo-1.jpeg",
  media: "/services/photo-2.png",
  strategie: "/services/photo-4.png",
  photoVid: "/services/photo-1.png",
};
