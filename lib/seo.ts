import { siteConfig } from "@/lib/data/site";

/**
 * The keyword inventory, in one place.
 *
 * French carries the demand (Agadir + Maroc + national terms); English covers
 * the Morocco-positioned international queries. `meta[name=keywords]` barely
 * moves rankings on its own — the titles, descriptions, headings and copy that
 * use these same terms do — so every page title/description below is written
 * from this list rather than beside it.
 */
export const siteKeywords = [
  // Brand + core, high intent
  "EIDEN GROUP",
  "agence digitale Maroc",
  "agence web Agadir",
  "agence marketing digital Agadir",
  "agence communication Agadir",
  // Web
  "création site internet Maroc",
  "création site web Agadir",
  "refonte site internet Maroc",
  "site vitrine Maroc",
  "site e-commerce Agadir",
  "agence e-commerce Maroc",
  "développement application web Maroc",
  // Brand
  "branding Maroc",
  "identité visuelle Maroc",
  "création logo Agadir",
  "studio créatif Maroc",
  // Visibility (SEO / GEO / AI)
  "SEO Maroc",
  "agence SEO Agadir",
  "référencement naturel Maroc",
  "audit SEO Maroc",
  "GEO Maroc",
  "visibilité IA Maroc",
  // Ads & social
  "Google Ads Maroc",
  "publicité Google Ads Agadir",
  "Meta Ads Maroc",
  "community management Maroc",
  "gestion réseaux sociaux Agadir",
  // Content
  "création contenu Maroc",
  "shooting photo produit Agadir",
  "production vidéo Maroc",
  // Longue traîne : devis, prix, pages, maintenance
  "prix création site web Maroc",
  "devis site internet Agadir",
  "coût refonte site Maroc",
  "meilleure agence digitale Maroc",
  "landing page Maroc",
  "site vitrine Agadir",
  "maintenance site web Maroc",
  "hébergement et maintenance site Maroc",
  "tournage vidéo entreprise Agadir",
  "photographe produit Agadir",
  "gestion Instagram entreprise Maroc",
] as const;

export const siteKeywordsEn = [
  "digital agency Morocco",
  "web agency Agadir",
  "branding agency Morocco",
  "SEO agency Morocco",
  "web development Morocco",
  "e-commerce agency Morocco",
] as const;

/** V2 case routes that stay public and belong in the sitemap. */
export const indexedCaseSlugs = [
  "lunja-village",
  "bopassage",
  "dmc-morocco",
  "educazen-kids",
  "mabrouk",
  "chillout-lounge",
] as const;

/** Service routes, from `fr.services.items`. */
export const indexedServiceSlugs = [
  "strategie",
  "web",
  "visibilite",
  "media",
  "photoVid",
] as const;

/**
 * Organization + local-business structured data for the root layout.
 * One graph, two nodes: the company and the site. Kept here so the copy
 * (address, phone, socials) can only drift in one file.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phoneMa,
        foundingDate: siteConfig.founded,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Agadir Bay, Technopole 1, Bloc B101",
          addressLocality: "Agadir",
          postalCode: "80000",
          addressCountry: "MA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 30.4278,
          longitude: -9.5981,
        },
        areaServed: [
          { "@type": "City", name: "Agadir" },
          { "@type": "Country", name: "Morocco" },
        ],
        sameAs: [
          siteConfig.socials.linkedin,
          siteConfig.socials.instagram,
          siteConfig.socials.facebook,
        ],
        knowsAbout: [
          "Stratégie digitale",
          "Branding",
          "Création de sites web",
          "SEO",
          "GEO et visibilité IA",
          "Google Ads",
          "Création de contenu",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: ["fr", "en"],
        publisher: { "@id": `${siteConfig.url}/#business` },
      },
    ],
  };
}
