import type { MetadataRoute } from "next";
import { navRoutes, siteConfig } from "@/lib/data/site";
import { indexedCaseSlugs, indexedServiceSlugs } from "@/lib/seo";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

/**
 * Every indexable route, written out. Deliberately absent:
 * - `/projects/*`: they 301 to the canonical V2 case URLs below.
 * - medical-bay, droguerie-souss, anisal, madaef, centre-accompagnement:
 *   hidden from the frontend, so never handed to crawlers either.
 */
const entries: Entry[] = [
  ...navRoutes.map((route) => ({
    path: route.href,
    changeFrequency: "weekly" as const,
    priority: route.href === "/" ? 1 : 0.9,
  })),
  { path: "/nos-solutions", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/security", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/rental", changeFrequency: "monthly" as const, priority: 0.9 },
  ...indexedCaseSlugs.map((slug) => ({
    path: `/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  ...indexedServiceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
];

const rentalImages = [
  `${siteConfig.url}/rental-room.jpg`,
  `${siteConfig.url}/rental-screen-1.webp`,
  `${siteConfig.url}/rental-screen-2.webp`,
  `${siteConfig.url}/rental-meeting-room.webp`,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return entries.map((entry) => {
    const url = `${siteConfig.url}${entry.path === "/" ? "" : entry.path}`;

    /* Every route is FR/EN via a client-side toggle — same URL, never two.
       Both hreflang values are therefore identical; Google allows this and
       the AI crawlers reading the sitemap see the language pairing explicitly. */
    return {
      url,
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: {
          fr: url,
          en: url,
          "x-default": url,
        },
      },
      images: entry.path === "/rental" ? rentalImages : undefined,
    };
  });
}
