import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";

/**
 * AI crawlers stay explicitly allowed: GEO/AEO visibility (ChatGPT, Claude,
 * Perplexity, Gemini, Copilot answers) depends on them being able to read the
 * site. Nothing here is training-consent — that is a separate decision.
 */
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Cohere-ai",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
