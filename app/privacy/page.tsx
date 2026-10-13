import type { Metadata } from "next";
import { PrivacyContent } from "@/components/legal-content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité d'EIDEN GROUP : données collectées, cookies et mesures d'audience, droits loi 09-08. Agence digitale à Agadir, Maroc.",
  keywords: [
    "politique confidentialité agence Maroc",
    "données personnelles loi 09-08",
    "cookies site Maroc",
  ],
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
