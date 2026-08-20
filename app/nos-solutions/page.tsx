import type { Metadata } from "next";
import { SolutionsView } from "@/components/views/solutions-view";

export const metadata: Metadata = {
  title: "Nos solutions",
  description:
    "Création web et applications, SEO et visibilité IA, performance media et ads, stratégie de contenu : les solutions digitales EIDEN GROUP.",
};

export default function SolutionsPage() {
  return <SolutionsView />;
}
