import type { Metadata } from "next";
import { AboutView } from "@/components/views/about-view";

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
  return <AboutView />;
}
