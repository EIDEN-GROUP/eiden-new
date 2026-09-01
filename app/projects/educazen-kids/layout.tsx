import type { Metadata } from "next";

/**
 * EducazenKids — the case's own title, description and share card.
 *
 * Held in a layout rather than in the page because the page is a client
 * component: `generateMetadata` is server-only, and the page is where the
 * design lives. Change the copy here and it changes this case alone.
 */
export const metadata: Metadata = {
  title: "EducazenKids",
  description:
    "Un centre qui change la vie d'enfants tous les jours, avec une présence digitale qui n'en montrait rien. Nous avons rafraîchi la marque et mis les inscriptions sur rails.",
  openGraph: {
    title: "EducazenKids | EIDEN GROUP",
    description:
      "Un centre qui change la vie d'enfants tous les jours, avec une présence digitale qui n'en montrait rien. Nous avons rafraîchi la marque et mis les inscriptions sur rails.",
    images: [{ url: "/work/educazen-kids/educazen-hero.png" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
