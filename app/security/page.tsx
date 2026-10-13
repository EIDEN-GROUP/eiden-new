import type { Metadata } from "next";
import { SecurityContent } from "@/components/legal-content";

export const metadata: Metadata = {
  title: "Sécurité",
  description:
    "Sécurité chez EIDEN GROUP : chiffrement HTTPS, protection du formulaire, accès restreints et signalement de faille. Agence digitale à Agadir, Maroc.",
  keywords: [
    "sécurité site web Maroc",
    "protection données agence Agadir",
  ],
  alternates: { canonical: "/security" },
  robots: { index: true, follow: true },
};

export default function SecurityPage() {
  return <SecurityContent />;
}
