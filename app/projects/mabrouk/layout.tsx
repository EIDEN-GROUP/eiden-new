import type { Metadata } from "next";

/**
 * Mabrouk Hôtel   the case's own title, description and share card.
 *
 * Held in a layout rather than in the page because the page is a client
 * component: `generateMetadata` is server-only, and the page is where the
 * design lives. Change the copy here and it changes this case alone.
 */
export const metadata: Metadata = {
  title: "Mabrouk Hôtel",
  description:
    "Un hôtel dont tout le caractère est dans la matière   le laiton, le bois, le velours   et dont rien de tout cela n'arrivait jusqu'au client avant sa réservation. Nous avons reconstruit la marque autour de ce que la maison est déjà.",
  openGraph: {
    title: "Mabrouk Hôtel | EIDEN GROUP",
    description:
      "Un hôtel dont tout le caractère est dans la matière   le laiton, le bois, le velours   et dont rien de tout cela n'arrivait jusqu'au client avant sa réservation. Nous avons reconstruit la marque autour de ce que la maison est déjà.",
    images: [{ url: "/work/mabrouk/imgg1 (18).png" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
