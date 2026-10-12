import type { Metadata } from "next";
import { ContactView } from "@/components/views/contact-view";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlons de votre projet digital : site web, branding, SEO ou campagnes. EIDEN GROUP, Agadir réponse sous 48 heures en français, anglais ou darija.",
  keywords: [
    "contacter agence digitale Agadir",
    "devis création site internet Maroc",
    "devis branding Maroc",
    "agence web Agadir contact",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | EIDEN GROUP",
    description:
      "Parlons de votre projet digital. Réponse sous 48 heures en français, anglais ou darija.",
    images: [
      {
        url: "/work/contact-bg.png",
        width: 1200,
        height: 630,
        alt: "Contacter EIDEN GROUP — agence digitale à Agadir",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactView />;
}
