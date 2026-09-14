import type { Metadata } from "next";
import { BopassageV2View } from "@/components/views/bopassage-v2-view";

const description =
  "Un café-restaurant de Founty qui avait tout, sauf de quoi se faire trouver. Nous avons construit la marque, le site et le rythme qui portent le lieu au-delà de sa porte.";

export const metadata: Metadata = {
  title: "Bôpassage",
  description,
  openGraph: {
    title: "Bôpassage | EIDEN GROUP",
    description,
    images: [{ url: "/work/bopassage/bopassage-hero.png" }],
  },
};

export default function BopassagePage() {
  return <BopassageV2View />;
}
