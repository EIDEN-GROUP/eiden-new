import type { Metadata } from "next";
import { OrsenV2View } from "@/components/views/orsen-v2-view";

const description =
  "Marbre, pierre, béton, bois et métal sur une seule plateforme   avec une face publique pour les architectes et une face professionnelle derrière, pour le négoce.";

export const metadata: Metadata = {
  title: "ORSEN",
  description,
  openGraph: {
    title: "ORSEN | EIDEN GROUP",
    description,
    images: [{ url: "/work/orsen/orsen hero.png" }],
  },
};

export default function OrsenPage() {
  return <OrsenV2View />;
}
