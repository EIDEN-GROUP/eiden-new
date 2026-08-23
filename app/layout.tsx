import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  DM_Serif_Display,
  Inter,
  Outfit,
} from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/components/providers/language-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { PageLoader } from "@/components/layout/page-loader";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SideTags } from "@/components/layout/side-tags";
import { siteConfig } from "@/lib/data/site";

/* Five typefaces, five roles — per the EIDEN brand identity system. */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "EIDEN GROUP — Agence digitale au Maroc",
    template: `%s — ${siteConfig.name}`,
  },
  description:
    "Agence digitale marocaine basée à Agadir. Stratégie, marque, site web, campagnes et contenu : nous construisons les systèmes digitaux qui font grandir votre entreprise.",
  keywords: [
    "agence digitale Maroc",
    "agence web Agadir",
    "création site internet Maroc",
    "branding Maroc",
    "Google Ads Maroc",
    "SEO Maroc",
    "EIDEN GROUP",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "EIDEN GROUP — Agence digitale au Maroc",
    description:
      "Marque, site web, campagnes, contenu : nous installons les systèmes digitaux qui vous amènent des clients.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EIDEN GROUP — Agence digitale au Maroc",
    description:
      "Marque, site web, campagnes, contenu : nous installons les systèmes digitaux qui vous amènent des clients.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FEFDFB" },
    { media: "(prefers-color-scheme: dark)", color: "#122620" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${dmSerif.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <noscript>
          <style>{`[data-reveal="out"],[data-reveal-group="out"]>*{opacity:1!important;transform:none!important}[data-reveal-effect="curtain"]::before{transform:translateY(-100%)!important}.footer-rise,.word-rise{transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-canvas flex min-h-full flex-col">
        <LanguageProvider>
          <MotionProvider>
            <SmoothScroll />
            <PageLoader />
            <a href="#main" className="bg-forest text-canvas sr-only rounded-full px-5 py-3 text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110]">
              Aller au contenu principal
            </a>
            <SiteHeader />
            <div className="bg-canvas relative z-10 flex-1">
              <main id="main">{children}</main>
            </div>
            <SiteFooter />
            <FloatingActions />
            <SideTags />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
