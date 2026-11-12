import type { Metadata } from "next";
import { RentalView } from "@/components/views/rental-view";
import { siteConfig } from "@/lib/data/site";
import { rentalCopy } from "@/lib/data/rental";

/* FR is the shipping language of the route (the toggle is client-side), so the
   static metadata and the JSON-LD below are both authored in French. The EN
   equivalents live in lib/data/rental.ts and in the report. */
const title = "Location de salle de formation à Agadir | EIDEN GROUP";
const description =
  "Location de salle de formation à Agadir : 15 places, écran 4K, Wi-Fi fibre et pause café incluse. À partir de 650 DH. Réservez en ligne.";

const keywords = [
  "Location de salle de formation à Agadir",
  "Location de salle de réunion à Agadir",
  "Salle de formation équipée Agadir Bay",
  "Salle de formation à louer à Agadir",
  "Équipement salle de formation Agadir",
  "Training room rental in Agadir",
  "Meeting room rental in Agadir",
  "Fully equipped training room in Agadir Bay",
];

export const metadata: Metadata = {
  /* `title` string + the layout template produce the FR title shipped today. */
  title: "Location de salle de formation à Agadir",
  description,
  keywords,
  alternates: {
    canonical: "/rental",
    languages: { fr: "/rental", en: "/rental", "x-default": "/rental" },
  },
  other: {
    "geo.region": "MA-SM",
    "geo.placename": "Agadir",
    "geo.position": "30.4278;-9.5981",
    ICBM: "30.4278, -9.5981",
  },
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
      datePublished: "2026-11-10",
      dateModified: "2026-11-10",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      alternateName: [
        "Location salle de formation Agadir",
        "Salle de réunion Agadir",
        "Salle de formation équipée Agadir Bay",
        "Training room rental Agadir",
      ],
      keywords:
        "Location de salle de formation à Agadir, salle de réunion à Agadir, salle équipée, écran 4K, Wi-Fi fibre, Agadir Bay",
      mainEntity: { "@id": `${siteConfig.url}/rental#service` },
      about: { "@id": `${siteConfig.url}/rental#service` },
      mainContentOfPage: { "@id": `${siteConfig.url}/rental#webpage` },
      spatialCoverage: {
        "@type": "Place",
        name: "Agadir",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Agadir Bay, Technopole 1, Bloc B101",
          addressLocality: "Agadir",
          postalCode: "80000",
          addressCountry: "MA",
        },
      },
      relatedLink: [
        siteConfig.url,
        `${siteConfig.url}/contact`,
        `${siteConfig.url}/nos-solutions`,
      ],
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [
          ".hero-content .lead",
          "#packs-heading",
          "#practice-heading",
          "#faq-heading",
          ".faq-list .faq-item summary",
        ],
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/rental-room.jpg`,
        width: 2399,
        height: 1713,
        caption:
          "Salle de formation équipée EIDEN à Agadir Bay : grande table et 15 chaises",
      },
    },
    {
      "@type": "Service",
      "@id": `${siteConfig.url}/rental#service`,
      name: "Location de salle de formation à Agadir",
      serviceType: "Location de salle de formation",
      provider: { "@id": `${siteConfig.url}/#business` },
      areaServed: [
        { "@type": "City", name: "Agadir" },
        { "@type": "Country", name: "Morocco" },
      ],
      url: `${siteConfig.url}/rental`,
      category: "Salle de formation / Training room rental",
      serviceOutput: [{
        "@type": "Thing",
        name: "Réservation de la salle de formation",
      }],
      termsOfService: `${siteConfig.url}/terms`,
      potentialAction: [
        {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/rental`,
            actionPlatform: [
              "http://schema.org/DesktopWeb",
              "http://schema.org/MobileWeb",
            ],
          },
          result: {
            "@type": "Reservation",
            name: "Réservation de la salle de formation EIDEN à Agadir",
          },
        },
        {
          "@type": "CommunicateAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `mailto:${siteConfig.email}`,
            actionPlatform: [
              "http://schema.org/DesktopWeb",
              "http://schema.org/MobileWeb",
            ],
          },
          recipient: { "@id": `${siteConfig.url}/#business` },
        },
      ],
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
          eligibleRegion: { "@type": "City", name: "Agadir" },
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
          eligibleRegion: { "@type": "City", name: "Agadir" },
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
          eligibleRegion: { "@type": "City", name: "Agadir" },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/rental#faq`,
      mainEntity: rentalCopy.fr.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    {
      "@type": "HowTo",
      "@id": `${siteConfig.url}/rental#howto`,
      name: "Réserver la salle de formation EIDEN à Agadir",
      inLanguage: "fr",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Choisissez votre formule",
          text: "Demi-journée (650 DH), Journée complète (1 150 DH), ou Location sur devis (multi-jours ou récurrent).",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Choisissez votre date et votre plage horaire",
          text: "Sélectionnez une date de 8h à 21h30, et l'heure de début et l'heure de fin souhaitées.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Confirmez votre demande",
          text: "Nom, e-mail, téléphone, nombre de participants. Vous recevez la confirmation sous 24 heures ouvrées.",
        },
      ],
      totalTime: "PT5M",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "MAD",
        value: "650",
      },
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
