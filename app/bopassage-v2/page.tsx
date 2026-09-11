import type { Metadata } from "next";
import { BopassageV2View } from "@/components/views/bopassage-v2-view";

export const metadata: Metadata = {
  title: "Bôpassage v2",
  description:
    "Un café-restaurant de Founty qui avait tout, sauf de quoi se faire trouver. Nous avons construit la marque, le site et le rythme qui portent le lieu au-delà de sa porte.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/projects/bopassage" },
};

export default function BopassageV2Page() {
  return <BopassageV2View />;
}
