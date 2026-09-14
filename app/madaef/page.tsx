import type { Metadata } from "next";
import { MadaefV2View } from "@/components/views/madaef-v2-view";

const description =
  "Un portefeuille de destinations qui n'avaient en commun que leur propriétaire, et qui devaient désormais avoir en commun leur exigence.";

export const metadata: Metadata = {
  title: "MADAEF",
  description,
  openGraph: {
    title: "MADAEF | EIDEN GROUP",
    description,
    images: [{ url: "/media/bg-3.jpeg" }],
  },
};

export default function MadaefPage() {
  return <MadaefV2View />;
}
