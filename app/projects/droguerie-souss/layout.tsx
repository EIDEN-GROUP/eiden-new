import type { Metadata } from "next";

/**
 * Souss Droguerie — the case's own title, description and share card.
 *
 * Held in a layout rather than in the page because the page is a client
 * component: `generateMetadata` is server-only, and the page is where the
 * design lives. Change the copy here and it changes this case alone.
 */
export const metadata: Metadata = {
  title: "Souss Droguerie",
  description:
    "Vingt ans de distribution de matériaux de construction, avec une présence digitale qui ne montrait ni la compétence, ni la réactivité, ni le stock.",
  openGraph: {
    title: "Souss Droguerie | EIDEN GROUP",
    description:
      "Vingt ans de distribution de matériaux de construction, avec une présence digitale qui ne montrait ni la compétence, ni la réactivité, ni le stock.",
    images: [{ url: "/work/droguerie-souss/hero drougure.png" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
