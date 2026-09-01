import type { Metadata } from "next";

/**
 * Medical Bay — the case's own title, description and share card.
 *
 * Held in a layout rather than in the page because the page is a client
 * component: `generateMetadata` is server-only, and the page is where the
 * design lives. Change the copy here and it changes this case alone.
 */
export const metadata: Metadata = {
  title: "Medical Bay",
  description:
    "Un centre médical qui existait sur le papier   une vision claire, et rien dessous. Nous avons construit l'activité, la marque et le système ensemble.",
  openGraph: {
    title: "Medical Bay | EIDEN GROUP",
    description:
      "Un centre médical qui existait sur le papier   une vision claire, et rien dessous. Nous avons construit l'activité, la marque et le système ensemble.",
    images: [{ url: "/work/medical-bay/medical-bay-lobby.png" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
