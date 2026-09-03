import type { Metadata } from "next";

/**
 * Bôpassage   the case's own title, description and share card.
 *
 * Held in a layout rather than in the page because the page is a client
 * component: `generateMetadata` is server-only, and the page is where the
 * design lives. Change the copy here and it changes this case alone.
 */
export const metadata: Metadata = {
  title: "Bôpassage",
  description:
    "Un café-restaurant de Founty qui avait tout, sauf de quoi se faire trouver. Nous avons construit la marque, le site et le rythme qui portent le lieu au-delà de sa porte.",
  openGraph: {
    title: "Bôpassage | EIDEN GROUP",
    description:
      "Un café-restaurant de Founty qui avait tout, sauf de quoi se faire trouver. Nous avons construit la marque, le site et le rythme qui portent le lieu au-delà de sa porte.",
    images: [{ url: "/work/bopassage/bopassage-hero.png" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
