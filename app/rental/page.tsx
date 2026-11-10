import type { Metadata } from "next";
import { RentalView } from "@/components/views/rental-view";
import { siteConfig } from "@/lib/data/site";

/* FR is the shipping language of the route (the toggle is client-side), so the
   static metadata and the JSON-LD below are both authored in French. The EN
   equivalents live in lib/data/rental.ts and in the report. */
const title = "Location de salle de formation à Agadir | EIDEN GROUP";
const description =
  "Location de salle de formation à Agadir : 15 places, écran 4K, Wi-Fi fibre et pause café incluse. À partir de 650 DH. Réservez en ligne.";

export const metadata: Metadata = {
  /* `title` string + the layout template produce the FR title shipped today. */
  title: "Location de salle de formation à Agadir",
  description,
  alternates: { canonical: "/rental" },
  openGraph: {
    type: "website",
    url: "/rental",
    siteName: siteConfig.name,
    locale: "fr_MA",
    alternateLocale: ["en_US"],
    title,
    description,
    images: [
      {
        url: "/rental-room.jpg",
        width: 2399,
        height: 1713,
        alt: "Salle de formation équipée EIDEN à Agadir Bay : grande table et 15 chaises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/rental-room.jpg"],
  },
};

/* Kept in sync with the visible copy in lib/data/rental.ts and with the
   organization graph already injected in app/layout.tsx (#business). */
const rentalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/rental#webpage`,
      url: `${siteConfig.url}/rental`,
      name: title,
      description,
      inLanguage: "fr",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/rental-room.jpg`,
        width: 2399,
        height: 1713,
      },
    },
    {
      "@type": "Service",
      "@id": `${siteConfig.url}/rental#service`,
      name: "Location de salle de formation à Agadir",
      serviceType: "Location de salle de formation",
      provider: { "@id": `${siteConfig.url}/#business` },
      areaServed: { "@type": "City", name: "Agadir" },
      url: `${siteConfig.url}/rental`,
      description:
        "Location à Agadir Bay (Technopole 1, Bloc B101) d'une salle de formation équipée de 15 places : écran 55 pouces 4K (HDMI et USB-C), sonorisation et micro, tableau blanc, Wi-Fi fibre symétrique sur réseau dédié, climatisation, pause café.",
      offers: [
        {
          "@type": "Offer",
          name: "Pack Demi-Journée",
          description:
            "Location de la salle de formation pour une demi-journée de 4 heures, salle entièrement équipée et pause café incluse.",
          price: "650",
          priceCurrency: "MAD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "650",
            priceCurrency: "MAD",
            unitText: "demi-journée (4 heures)",
          },
        },
        {
          "@type": "Offer",
          name: "Pack Journée Complète",
          description:
            "Location de la salle de formation pour une journée complète de 8 heures, salle entièrement équipée, pause café et accueil personnalisé.",
          price: "1150",
          priceCurrency: "MAD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "1150",
            priceCurrency: "MAD",
            unitText: "journée complète (8 heures)",
          },
        },
        {
          "@type": "Offer",
          name: "Location sur devis",
          description:
            "Location de la salle de formation pour plusieurs sessions ou plusieurs jours, réservations régulières ou récurrentes, tarifs négociés sur la durée et la fréquence.",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}/rental#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Location de salle de formation à Agadir",
          item: `${siteConfig.url}/rental`,
        },
      ],
    },
  ],
};

export default function RentalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rentalJsonLd) }}
      />
      <RentalView />
    </>
  );
}
