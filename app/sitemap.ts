import type { MetadataRoute } from "next";
import { navRoutes, siteConfig } from "@/lib/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return navRoutes.map((route) => ({
    url: `${siteConfig.url}${route.href === "/" ? "" : route.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.href === "/" ? 1 : 0.8,
  }));
}
