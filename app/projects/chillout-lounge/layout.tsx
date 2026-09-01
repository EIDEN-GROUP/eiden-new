import type { Metadata } from "next";

/**
 * CHILLOUT Lounge — the case's own title, description and share card.
 *
 * Held in a layout rather than in the page because the page is a client
 * component: `generateMetadata` is server-only, and the page is where the
 * design lives. Change the copy here and it changes this case alone.
 */
export const metadata: Metadata = {
  title: "CHILLOUT Lounge",
  description:
    "Musique live, cocktails et couchers de soleil face à l'Atlantique   avec un seul travail à faire en ligne : remplir ce soir.",
  openGraph: {
    title: "CHILLOUT Lounge | EIDEN GROUP",
    description:
      "Musique live, cocktails et couchers de soleil face à l'Atlantique   avec un seul travail à faire en ligne : remplir ce soir.",
    images: [{ url: "/work/chillout-lounge/chilout hero.png" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
