import type { Metadata } from "next";
import { EducazenKidsV2View } from "@/components/views/educazen-kids-v2-view";

const description =
  "Un centre qui change la vie d'enfants tous les jours, avec une présence digitale qui n'en montrait rien. Nous avons rafraîchi la marque et mis les inscriptions sur rails.";

export const metadata: Metadata = {
  title: "EducazenKids",
  description,
  openGraph: {
    title: "EducazenKids | EIDEN GROUP",
    description,
    images: [{ url: "/work/educazen-kids/educazen-hero.png" }],
  },
};

export default function EducazenKidsPage() {
  return <EducazenKidsV2View />;
}
