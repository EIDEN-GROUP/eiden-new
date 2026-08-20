import type { Metadata } from "next";
import { AboutView } from "@/components/views/about-view";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "EIDEN GROUP, agence digitale fondée en 2025 à Agadir. Notre façon de travailler : comprendre, construire, puis faire tourner.",
};

export default function AboutPage() {
  return <AboutView />;
}
