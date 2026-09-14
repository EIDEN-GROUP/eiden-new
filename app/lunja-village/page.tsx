import type { Metadata } from "next";
import { LunjaVillageV2View } from "@/components/views/lunja-village-v2-view";

const description =
  "Un village côtier dont la marque disait encore « resort » alors que ceux qui arrivaient étaient surfeurs, nomades et collectifs créatifs. Nous l'avons reconstruite pour le client qui vient vraiment.";

export const metadata: Metadata = {
  title: "Lunja Village",
  description,
  openGraph: {
    title: "Lunja Village | EIDEN GROUP",
    description,
    images: [{ url: "/work/lunja-village/image lunja hero 1.png" }],
  },
};

export default function LunjaVillagePage() {
  return <LunjaVillageV2View />;
}
