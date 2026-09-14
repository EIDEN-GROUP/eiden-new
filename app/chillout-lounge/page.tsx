import type { Metadata } from "next";
import { ChilloutLoungeV2View } from "@/components/views/chillout-lounge-v2-view";

const description =
  "Musique live, cocktails et couchers de soleil face à l'Atlantique   avec un seul travail à faire en ligne : remplir ce soir.";

export const metadata: Metadata = {
  title: "CHILLOUT Lounge",
  description,
  openGraph: {
    title: "CHILLOUT Lounge | EIDEN GROUP",
    description,
    images: [{ url: "/work/chillout-lounge/chilout hero.png" }],
  },
};

export default function ChilloutLoungePage() {
  return <ChilloutLoungeV2View />;
}
