import type { Metadata } from "next";
import { LunjaVillageV2View } from "@/components/views/lunja-village-v2-view";

export const metadata: Metadata = {
  title: "Lunja Village v2",
  description:
    "Un village côtier dont la marque disait encore « resort » alors que ceux qui arrivaient étaient surfeurs, nomades et collectifs créatifs. Nous l'avons reconstruite pour le client qui vient vraiment.",
  /* A second cut of a case that already exists, kept for comparison. The
     original is the page a search engine should find. */
  robots: { index: false, follow: false },
  alternates: { canonical: "/projects/lunja-village" },
};

export default function LunjaVillageV2Page() {
  return <LunjaVillageV2View />;
}
