import type { Metadata } from "next";
import { MedicalBayV2View } from "@/components/views/medical-bay-v2-view";

const description =
  "Un centre médical qui existait sur le papier   une vision claire, et rien dessous. Nous avons construit l'activité, la marque et le système ensemble.";

export const metadata: Metadata = {
  title: "Medical Bay",
  description,
  openGraph: {
    title: "Medical Bay | EIDEN GROUP",
    description,
    images: [{ url: "/work/medical-bay/medical-bay-lobby.png" }],
  },
};

export default function MedicalBayPage() {
  return <MedicalBayV2View />;
}
