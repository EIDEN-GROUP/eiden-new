import type { Metadata } from "next";
import { TermsContent } from "@/components/legal-content";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description:
    "Conditions générales d'utilisation d'EIDEN GROUP : services, devis, propriété intellectuelle et responsabilités. Agence digitale à Agadir, Maroc.",
  keywords: [
    "conditions générales utilisation agence Maroc",
    "CGU agence digitale Agadir",
  ],
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <TermsContent />;
}
