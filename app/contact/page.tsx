import type { Metadata } from "next";
import { ContactView } from "@/components/views/contact-view";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlons de votre projet digital. EIDEN GROUP, Agadir — réponse sous 48 heures en français, anglais ou darija.",
};

export default function ContactPage() {
  return <ContactView />;
}
