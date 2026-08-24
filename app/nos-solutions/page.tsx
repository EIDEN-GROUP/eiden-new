import type { Metadata } from "next";
import { SolutionsView } from "@/components/views/solutions-view";

export const metadata: Metadata = {
  title: "Nos solutions",
  description:
    "Gestio, Scholnexa, Kavo, StayDesk : les systèmes digitaux d'EIDEN GROUP. Nous concevons et construisons des systèmes qui réunissent vos opérations, vos informations et vos équipes au même endroit.",
};

export default function SolutionsPage() {
  return <SolutionsView />;
}
