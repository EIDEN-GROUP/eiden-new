import type { Metadata } from "next";
import { AnisalV2View } from "@/components/views/anisal-v2-view";

const description =
  "Une coopérative dont le savoir-faire n'a jamais été en question, et dont le nom ne portait pas encore ce que les mains savaient faire.";

export const metadata: Metadata = {
  title: "Anisal",
  description,
  alternates: { canonical: "/anisal" },
  openGraph: {
    title: "Anisal | EIDEN GROUP",
    description,
    images: [
      {
        url: "/media/bg-2.jpeg",
        alt: "Anisal — identité de coopérative par EIDEN GROUP",
      },
    ],
  },
};

export default function AnisalPage() {
  return <AnisalV2View />;
}
