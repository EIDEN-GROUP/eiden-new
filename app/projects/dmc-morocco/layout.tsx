import type { Metadata } from "next";

/**
 * DMC Hospitality Morocco — the case's own title, description and share card.
 *
 * Held in a layout rather than in the page because the page is a client
 * component: `generateMetadata` is server-only, and the page is where the
 * design lives. Change the copy here and it changes this case alone.
 */
export const metadata: Metadata = {
  title: "DMC Hospitality Morocco",
  description:
    "Un opérateur hôtelier dont la réputation ne circulait que de bouche à oreille. Nous avons commencé à la page blanche : le nom, puis tout ce qui en découle.",
  openGraph: {
    title: "DMC Hospitality Morocco | EIDEN GROUP",
    description:
      "Un opérateur hôtelier dont la réputation ne circulait que de bouche à oreille. Nous avons commencé à la page blanche : le nom, puis tout ce qui en découle.",
    images: [{ url: "/work/dmc-morocco/dmc-hero.png" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
