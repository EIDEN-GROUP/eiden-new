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
    behance: "https://www.behance.net/",
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
  { src: "/work/dmc-morocco/dmc-brand-posters.png", client: "DMC Hospitality Morocco" },
  { src: "/work/educazen-kids/educazenkids-cover.png", client: "EducazenKids" },
  { src: "/work/lunja-village/lunja-brand-board.png", client: "Lunja Village" },
  { src: "/work/bopassage/bopassage-brand-identity.png", client: "Bôpassage" },
  { src: "/work/medical-bay/medical-bay-web-desktop.png", client: "Medical Bay" },
  { src: "/work/dmc-morocco/dmc-web-desktop.png", client: "DMC Hospitality Morocco" },
  { src: "/work/educazen-kids/educazenkids-brand-identity.png", client: "EducazenKids" },
  { src: "/work/lunja-village/lunja-brand-tote.png", client: "Lunja Village" },
  { src: "/work/dmc-morocco/dmc-cover.png", client: "DMC Hospitality Morocco" },
] as const;

export const clientLogos = [
  { name: "Bôpassage", src: "/clients/bopassage.png" },
  { name: "DMC Hospitality Morocco", src: "/clients/dmc.png" },
  { name: "Lunja Village", src: "/clients/lunja-village.png" },
  { name: "EducazenKids", src: "/clients/educazenkids.png" },
  { name: "Medical Bay", src: "/clients/medical-bay.png" },
  { name: "EIDEN Academy", src: "/clients/eiden-academy.png" },
  { name: "One Retail", src: "/clients/onereetail.png" },
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
    image: "/work/lunja-village/lunja-social-2.png",
    imageAlt:
      "Univers de marque Lunja Village : identité, réseaux sociaux et supports imprimés",
    website: "https://www.lunjavillage.com",
    metric: "+38%",
  },
  {
    slug: "bopassage",
    client: "Bôpassage",
    image: "/work/bopassage/bopassage.png",
    imageAlt: "Site web Bôpassage présenté sur tablette dans le restaurant",
    website: "https://bopassage.com",
    metric: "x3",
  },
  {
    slug: "medical-bay",
    client: "Medical Bay",
    image: "/work/medical-bay/medical-bay.png",
    imageAlt: "Accueil de la clinique Medical Bay à Agadir",
    website: "https://medicalbay.vercel.app/",
    metric: "+120",
  },
  {
    slug: "dmc-morocco",
    client: "DMC Hospitality Morocco",
    image: "/work/dmc-morocco/dmc-alt.png",
    imageAlt: "Affiches de marque DMC Hospitality Morocco",
    website: "https://dmchm.com",
    metric: "0 → 1",
  },
  {
    slug: "educazen-kids",
    client: "EducazenKids",
    image: "/work/educazen-kids/educazenkids-web-desktop.png",
    imageAlt: "Site web et plateforme EducazenKids sur ordinateur",
    metric: "+62%",
  },
];

export type ProjectCategory =
  | "web"
  | "hospitality"
  | "restaurants"
  | "lounge"
  | "education"
  | "health";

export type ProjectRecord = {
  slug: string;
  name: string;
  category: ProjectCategory;
  image: string;
  imageAlt: string;
};

export const projects = [
  {
    slug: "bopassage",
    name: "Bôpassage",
    category: "restaurants",
    image: "/work/bopassage/bopassage.png",
    imageAlt: "Identité et site web du restaurant Bôpassage",
  },
  {
    slug: "dmc-morocco",
    name: "DMC Hospitality Morocco",
    category: "hospitality",
    image: "/work/dmc-morocco/dmc-brand-logo.png",
    imageAlt: "Marque et supports DMC Hospitality Morocco",
  },
   {
    slug: "lunja-village",
    name: "Lunja Village",
    category: "hospitality",
    image: "/work/lunja-village/image lunja village portfoliio.png",
    imageAlt: "Univers de marque du village côtier Lunja Village",
  },
  {
    slug: "educazen-kids",
    name: "EducazenKids",
    category: "education",
    image: "/work/educazen-kids/educazen-hero.png",
    imageAlt: "Plateforme et identité EducazenKids",
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
    slug: "chillout-lounge",
    name: "CHILLOUT Lounge",
    category: "lounge",
    image: "/work/chillout-lounge/chilout card.png",
    imageAlt: "Site web du CHILLOUT Lounge",
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
    slug: "mabrouk",
    name: "Mabrouk Hôtel",
    category: "hospitality",
    image: "/work/mabrouk/imgg1 (1).png",
    imageAlt: "L’accueil du Mabrouk Hôtel",
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
  solutions: "/services/web-2.jpg",
  contact: "/work/contact-bg.png",
};

export const heroTexture = "/work/hero.png";

export const contactTexture = "/work/contact-bg.png";

export const aboutTexture = "/work/contact-bg.png";

export const proofTexture = "/work/contact-section-bg.png";

export const movementMedia = [
  "/media/heritage-1.jpeg",
  "/media/schema.jpeg",
  "/media/insight.jpg",
  "/media/architecture.jpg",
] as const;

export const serviceMedia: Record<string, string> = {
  web: "/services/web-2.jpg",
  visibilite: "/services/op-1.jpg",
  media: "/services/audit-2.jpg",
  contenu: "/services/illustration.jpg",
  photoVid: "/services/photoVid.jpeg",
};
