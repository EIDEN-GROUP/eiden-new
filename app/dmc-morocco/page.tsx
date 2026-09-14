import type { Metadata } from "next";
import { DmcMoroccoV2View } from "@/components/views/dmc-morocco-v2-view";

const description =
  "Un opérateur hôtelier dont la réputation ne circulait que de bouche à oreille. Nous avons commencé à la page blanche : le nom, puis tout ce qui en découle.";

export const metadata: Metadata = {
  title: "DMC Hospitality Morocco",
  description,
  openGraph: {
    title: "DMC Hospitality Morocco | EIDEN GROUP",
    description,
    images: [{ url: "/work/dmc-morocco/dmc-hero.png" }],
  },
};

export default function DmcMoroccoPage() {
  return <DmcMoroccoV2View />;
}
