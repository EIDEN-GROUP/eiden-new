import type { Metadata } from "next";
import { MabroukV2View } from "@/components/views/mabrouk-v2-view";

const description =
  "Un hôtel dont tout le caractère est dans la matière   le laiton, le bois, le velours   et dont rien de tout cela n'arrivait jusqu'au client avant sa réservation. Nous l'avons fait voir par le marketing, la photographie et le contenu.";

export const metadata: Metadata = {
  title: "Mabrouk Hôtel",
  description,
  openGraph: {
    title: "Mabrouk Hôtel | EIDEN GROUP",
    description,
    images: [{ url: "/work/mabrouk/imgg1 (18).png" }],
  },
};

export default function MabroukPage() {
  return <MabroukV2View />;
}
