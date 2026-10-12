import { ViewTransition } from "react";
import type { Metadata } from "next";
import { ClientsV2View } from "@/components/views/clients-v2-view";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Hôtellerie, Cafés & restaurants, santé, Éducation, commerce : les entreprises marocaines pour lesquelles EIDEN GROUP construit marques, sites et campagnes.",
  keywords: [
    "portfolio agence digitale Maroc",
    "réalisations agence web Agadir",
    "études de cas branding Maroc",
    "projets création site internet Maroc",
  ],
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Clients | EIDEN GROUP",
    description:
      "Les entreprises marocaines pour lesquelles EIDEN GROUP construit marques, sites et campagnes.",
    images: [
      {
        url: "/media/clients-bg.png",
        width: 1200,
        height: 630,
        alt: "Réalisations EIDEN GROUP — portfolio d'agence digitale au Maroc",
      },
    ],
  },
};

export default function PortfolioPage() {
  return (
    <ViewTransition
      name="clients-page"
      enter={{ "case-close": "case-restore", default: "none" }}
      exit={{ "case-open": "case-under", default: "none" }}
      default="none"
    >
      <ClientsV2View />
    </ViewTransition>
  );
}
