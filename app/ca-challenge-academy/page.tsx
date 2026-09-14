import type { Metadata } from "next";
import { CaChallengeAcademyV2View } from "@/components/views/ca-challenge-academy-v2-view";

const description =
  "Un centre où le travail commence bien avant la première séance et ne s'arrête pas à la dernière   et dont rien, jusque-là, ne le disait.";

export const metadata: Metadata = {
  title: "CA Challenge Academy",
  description,
  openGraph: {
    title: "CA Challenge Academy | EIDEN GROUP",
    description,
    images: [{ url: "/media/eiden-hero-poster.jpg" }],
  },
};

export default function CaChallengeAcademyPage() {
  return <CaChallengeAcademyV2View />;
}
