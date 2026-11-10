import type { Metadata } from "next";
import { AboutView } from "@/components/views/about-view";
import { siteConfig } from "@/lib/data/site";
import { dictionaries } from "@/lib/i18n";

/* FR is the shipping language of the route (client-side toggle), so the
   static metadata and this structured data are authored in French. Mirrors
   the visible FAQ on the page — zero visible change. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: dictionaries.fr.pages.about.faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const metadata: Metadata = {
  title: "À propos",
  description:
    "EIDEN GROUP, agence digitale fondée en 2025 à Agadir. Stratégie, marque, web, SEO et contenu : notre façon de travailler, comprendre, construire, puis faire tourner.",
  keywords: [
    "agence digitale Agadir histoire",
    "équipe agence web Maroc",
    "EIDEN GROUP à propos",
  ],
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos | EIDEN GROUP",
    description:
      "EIDEN GROUP, agence digitale fondée en 2025 à Agadir : comprendre, construire, puis faire tourner.",
    images: [
      {
        url: "/media/eiden-hero-poster.jpg",
        width: 1200,
        height: 630,
        alt: "EIDEN GROUP — agence digitale fondée à Agadir en 2025",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AboutView />
    </>
  );
}
