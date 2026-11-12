import type { Metadata } from "next";
import { ContactView } from "@/components/views/contact-view";
import { ContactFaq } from "@/components/contact-faq";
import { siteConfig } from "@/lib/data/site";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: `${siteConfig.url}/contact`,
    },
  ],
};

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactView />
      <ContactFaq />
    </>
  );
}
