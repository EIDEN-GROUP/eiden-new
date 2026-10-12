import type { Metadata } from "next";
import { SolutionsView } from "@/components/views/solutions-view";

export const metadata: Metadata = {
  title: "Nos solutions",
  description:
    "Skema, Essor, Kavo, StayDesk : les systèmes digitaux d'EIDEN GROUP. CRM, opérations, finance et analytique réunis au même endroit pour les entreprises marocaines.",
  keywords: [
    "solutions digitales entreprises Maroc",
    "logiciel gestion entreprise Maroc",
    "CRM Maroc",
    "Skema Essor Kavo StayDesk",
  ],
  alternates: { canonical: "/nos-solutions" },
  openGraph: {
    title: "Nos solutions | EIDEN GROUP",
    description:
      "Skema, Essor, Kavo, StayDesk : les systèmes digitaux d'EIDEN GROUP pour les entreprises.",
    images: [
      {
        url: "/services/photo-5.jpg",
        width: 1200,
        height: 630,
        alt: "Nos solutions — systèmes digitaux EIDEN GROUP",
      },
    ],
  },
};

export default function SolutionsPage() {
  return <SolutionsView />;
}
