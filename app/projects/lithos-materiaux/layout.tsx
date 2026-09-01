import type { Metadata } from "next";

/**
 * LITHOS — the case's own title, description and share card.
 *
 * Held in a layout rather than in the page because the page is a client
 * component: `generateMetadata` is server-only, and the page is where the
 * design lives. Change the copy here and it changes this case alone.
 */
export const metadata: Metadata = {
  title: "LITHOS",
  description:
    "Un fournisseur de calcaire, de travertin et de marbre dans le sud de la France, avec un catalogue qui devait fonctionner comme un architecte prescrit réellement.",
  openGraph: {
    title: "LITHOS | EIDEN GROUP",
    description:
      "Un fournisseur de calcaire, de travertin et de marbre dans le sud de la France, avec un catalogue qui devait fonctionner comme un architecte prescrit réellement.",
    images: [{ url: "/work/lithos-materiaux/luthos hero.png" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
