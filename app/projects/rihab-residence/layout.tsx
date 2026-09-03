import type { Metadata } from "next";

/**
 * Résidence Rihab   the case's own title, description and share card.
 *
 * Held in a layout rather than in the page because the page is a client
 * component: `generateMetadata` is server-only, and the page is where the
 * design lives. Change the copy here and it changes this case alone.
 */
export const metadata: Metadata = {
  title: "Résidence Rihab",
  description:
    "Une adresse familiale à cinq minutes de l'Atlantique, dans un marché où les voisins vendaient un luxe qu'ils n'avaient pas.",
  openGraph: {
    title: "Résidence Rihab | EIDEN GROUP",
    description:
      "Une adresse familiale à cinq minutes de l'Atlantique, dans un marché où les voisins vendaient un luxe qu'ils n'avaient pas.",
    images: [{ url: "/work/rihab-residence/HERO PAGE RIHAB.png" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
