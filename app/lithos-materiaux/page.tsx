import type { Metadata } from "next";
import { LithosMateriauxV2View } from "@/components/views/lithos-materiaux-v2-view";

const description =
  "Un fournisseur de calcaire, de travertin et de marbre dans le sud de la France, avec un catalogue qui devait fonctionner comme un architecte prescrit réellement.";

export const metadata: Metadata = {
  title: "LITHOS",
  description,
  openGraph: {
    title: "LITHOS | EIDEN GROUP",
    description,
    images: [{ url: "/work/lithos-materiaux/luthos hero.png" }],
  },
};

export default function LithosMateriauxPage() {
  return <LithosMateriauxV2View />;
}
