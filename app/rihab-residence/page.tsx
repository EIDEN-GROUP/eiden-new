import type { Metadata } from "next";
import { RihabResidenceV2View } from "@/components/views/rihab-residence-v2-view";

const description =
  "Une adresse familiale à cinq minutes de l'Atlantique, dans un marché où les voisins vendaient un luxe qu'ils n'avaient pas.";

export const metadata: Metadata = {
  title: "Résidence Rihab",
  description,
  openGraph: {
    title: "Résidence Rihab | EIDEN GROUP",
    description,
    images: [{ url: "/work/rihab-residence/HERO PAGE RIHAB.png" }],
  },
};

export default function RihabResidencePage() {
  return <RihabResidenceV2View />;
}
