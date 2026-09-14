import type { Metadata } from "next";
import { DroguerieSoussV2View } from "@/components/views/droguerie-souss-v2-view";

const description =
  "Vingt ans de distribution de matériaux de construction, avec une présence digitale qui ne montrait ni la compétence, ni la réactivité, ni le stock.";

export const metadata: Metadata = {
  title: "Souss Droguerie",
  description,
  openGraph: {
    title: "Souss Droguerie | EIDEN GROUP",
    description,
    images: [{ url: "/work/droguerie-souss/hero drougure.png" }],
  },
};

export default function DroguerieSoussPage() {
  return <DroguerieSoussV2View />;
}
