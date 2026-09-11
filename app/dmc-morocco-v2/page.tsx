import type { Metadata } from "next";
import { DmcMoroccoV2View } from "@/components/views/dmc-morocco-v2-view";

export const metadata: Metadata = {
  title: "DMC Hospitality Morocco v2",
  description:
    "Un opérateur hôtelier dont la réputation ne circulait que de bouche à oreille. Nous avons commencé à la page blanche : le nom, puis tout ce qui en découle.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/projects/dmc-morocco" },
};

export default function DmcMoroccoV2Page() {
  return <DmcMoroccoV2View />;
}
