import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter, Outfit } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

import { LanguageProvider } from "@/components/providers/language-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { PageLoader } from "@/components/layout/page-loader";
import { SiteChrome } from "@/components/layout/site-chrome";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SideTags } from "@/components/layout/side-tags";
import { InlineScript } from "@/components/ui/inline-script";
import { siteConfig } from "@/lib/data/site";
import { introSeenScript } from "@/lib/intro-seen";
import { organizationJsonLd, siteKeywords, siteKeywordsEn } from "@/lib/seo";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
    default: "EIDEN GROUP | Architecture & Business au Maroc",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Agence digitale marocaine basée à Agadir. Stratégie, marque, site web, SEO, campagnes et contenu : nous construisons les systèmes digitaux qui font grandir votre entreprise.",
  keywords: [...siteKeywords, ...siteKeywordsEn],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "EIDEN GROUP | Architecture & Business au Maroc",
    description:
      "Marque, site web, SEO, campagnes, contenu : nous installons les systèmes digitaux qui vous amènent des clients.",
    images: [
      {
        url: "/work/hero.png",
        width: 1200,
        height: 630,
        alt: "EIDEN GROUP — agence digitale à Agadir, Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EIDEN GROUP | Architecture & Business au Maroc",
    description:
      "Marque, site web, SEO, campagnes, contenu : nous installons les systèmes digitaux qui vous amènent des clients.",
    images: ["/work/hero.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
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
      className={`${outfit.variable} ${dmSerif.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={introSeenScript} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        {/* The cursor art is fetched the moment it is first needed, which
            would show one frame of the system arrow. Preloading both cuts
            keeps that frame from ever landing. */}
        <link rel="preload" as="image" href="/cursors/arrow.svg" />
        <link rel="preload" as="image" href="/cursors/arrow-light.svg" />
        <noscript>
          <style>{`.page-loader{display:none!important}[data-reveal="out"],[data-reveal-group="out"]>*{opacity:1!important;transform:none!important}[data-reveal-effect="curtain"]::before{transform:translateY(-100%)!important}.footer-rise,.word-rise{transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-canvas flex min-h-screen flex-col">
        <LanguageProvider>
          <MotionProvider>
            <SmoothScroll />
            <PageLoader />
            <a
              href="#main"
              className="bg-forest text-canvas sr-only rounded-full px-5 py-3 text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110]"
            >
              Aller au contenu principal
            </a>
            <SiteHeader />
            <div className="bg-canvas relative z-10 flex-1">
              <main id="main">{children}</main>
            </div>
            <SiteChrome>
              <SiteFooter />
            </SiteChrome>
            <FloatingActions />
            <SideTags />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
