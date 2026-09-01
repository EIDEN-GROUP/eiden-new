import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lunja Village",
  description:
    "Un village côtier dont la marque disait encore « resort » alors que ceux qui arrivaient étaient surfeurs, nomades et collectifs créatifs. Nous l'avons reconstruite pour le client qui vient vraiment.",
  openGraph: {
    title: "Lunja Village | EIDEN GROUP",
    description:
      "Un village côtier dont la marque disait encore « resort » alors que ceux qui arrivaient étaient surfeurs, nomades et collectifs créatifs. Nous l'avons reconstruite pour le client qui vient vraiment.",
    images: [{ url: "/work/lunja-village/image lunja village portfoliio.png" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
