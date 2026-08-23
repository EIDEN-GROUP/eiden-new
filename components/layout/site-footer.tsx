"use client";

import Link from "next/link";
import { ArrowRight, ArrowUp, AtSign } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";
import { socialAccounts } from "@/components/ui/social-links";
import { scrollToTop } from "@/components/providers/smooth-scroll";
import { useLanguage } from "@/components/providers/language-provider";
import { setFooterRevealed, useFooterRevealed } from "@/lib/footer-reveal";
import { navRoutes, siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/** Rise-from-below wrapper: the mask is the parent, the child does the moving. */
function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Seconds. */
  delay?: number;
  className?: string;
}) {
  return (
    <span className={cn("block overflow-hidden", className)}>
      <span
        className="footer-rise block"
        style={{ "--rise-delay": `${delay}s` } as CSSProperties}
      >
        {children}
      </span>
    </span>
  );
}

/**
 * Full-height footer revealed like a curtain.
 *
 * The panel is fixed behind the page, and an equally tall spacer in the flow
 * gives it scroll room; the page then slides up off it instead of pushing it
 * down. An observer on that spacer flips `data-footer-reveal`, which is what
 * drives the staged rise of the contents.
 */
export function SiteFooter() {
  const { t, locale, toggleLocale } = useLanguage();
  const year = new Date().getFullYear();

  const spacerRef = useRef<HTMLDivElement>(null);
  const revealed = useFooterRevealed();

  useEffect(() => {
    const node = spacerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterRevealed(entry.intersectionRatio > 0.12),
      { threshold: [0, 0.12, 0.4] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll room for the panel behind it — never painted. `dvh` and not
          `svh`: the panel below is sized by the viewport itself, so anything
          shorter leaves a strip of page permanently covering its top. */}
      <div ref={spacerRef} aria-hidden className="h-dvh shrink-0" />

      {/* `inset-0` rather than a viewport-height unit: the panel then measures
          exactly one frame on every device, with no seam at the edges. */}
      <footer
        data-footer-reveal={revealed ? "in" : "out"}
        className="grain bg-ink text-canvas fixed inset-0 z-0 flex flex-col overflow-hidden"
      >
        {/* Soft brand wash behind the wordmark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-[radial-gradient(120%_100%_at_50%_100%,rgba(12,87,82,0.4),transparent_66%)]"
        />

        {/* ── Address & actions ─────────────────────────────────────── */}
        <div className="container-eiden relative z-2 shrink-0 pt-[clamp(3.5rem,8svh,7rem)]">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <Rise>
                <h2 className="text-[clamp(1.75rem,4.4vw,3.5rem)] leading-[1.02] font-medium">
                  {t.footer.tagline}
                </h2>
              </Rise>

              <Rise delay={0.1} className="mt-[clamp(1.25rem,3.5svh,2rem)]">
                <span className="flex flex-wrap items-center gap-3">
                  <Link
                    href={siteConfig.bookingUrl}
                    className="group border-canvas/25 hover:bg-canvas hover:text-ink font-label inline-flex h-12 items-center gap-3 rounded-full border px-6 text-[0.7rem] font-semibold tracking-[0.18em] uppercase transition-colors duration-300"
                  >
                    {t.footer.bookCall}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1.5"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </Link>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group border-canvas/25 hover:bg-canvas hover:text-ink font-label inline-flex h-12 items-center gap-3 rounded-full border px-6 text-[0.7rem] font-semibold tracking-[0.18em] uppercase transition-colors duration-300"
                  >
                    {t.footer.email}
                    <AtSign
                      className="size-4 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:rotate-12"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </a>
                </span>
              </Rise>
            </div>

            {/* Link stacks — navigation and accounts */}
            <div className="grid grid-cols-2 gap-10 sm:gap-16">
              <Rise delay={0.16}>
                <nav aria-label={t.footer.navLabel}>
                  <p className="eyebrow text-canvas/35 mb-4">{t.footer.navLabel}</p>
                  <ul className="flex flex-col gap-1.5">
                    {navRoutes.map((route) => (
                      <li key={route.href}>
                        <Link
                          href={route.href}
                          className="hover:text-gold text-[1.0625rem] transition-colors duration-300 sm:text-xl"
                        >
                          {t.nav[route.key]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Rise>

              <Rise delay={0.22}>
                <div>
                  <p className="eyebrow text-canvas/35 mb-4">
                    {t.footer.socialLabel}
                  </p>
                  {/* The marks alone: two words of plain text next to a
                      navigation stack read as more navigation. */}
                  <ul className="flex flex-wrap items-center gap-2.5">
                    {socialAccounts.map((account) => (
                      <li key={account.label}>
                        <a
                          href={account.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={account.label}
                          title={account.label}
                          className="border-canvas/20 text-canvas/70 hover:border-gold/60 hover:text-gold flex size-11 items-center justify-center rounded-full border transition-colors duration-300"
                        >
                          <account.Icon className="size-[1.15rem]" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Rise>
            </div>
          </div>

          <Rise delay={0.28} className="mt-[clamp(1.25rem,3.5svh,2.5rem)]">
            <span className="text-canvas/45 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-canvas transition-colors duration-300"
              >
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phoneMa.replace(/\s/g, "")}`}
                className="hover:text-canvas transition-colors duration-300"
              >
                {siteConfig.phoneMa}
              </a>
              <span className="hidden lg:inline">{siteConfig.address}</span>
            </span>
          </Rise>
        </div>

        <div className="[container-type:size] relative z-2 mt-[clamp(1rem,2.5svh,2rem)] flex min-h-0 flex-1 items-end justify-center px-3 pb-2 sm:px-5 lg:px-8">
          <Rise delay={0.34} className="w-full">
            <h3 className="text-center text-[min(31vw,118cqh)] leading-[0.8] tracking-[-0.03em] text-white uppercase">
              eiden
            </h3>
          </Rise>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div className="container-eiden relative z-2 shrink-0">
          <div className="border-canvas/10 text-canvas/45 flex flex-col gap-4 border-t py-[clamp(1rem,2.5svh,1.5rem)] text-[0.8125rem] md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {siteConfig.name}. {t.footer.rights}.
            </p>
            <p className="md:text-center">{t.footer.madeIn}</p>
            {/* The floating badge stands down once the panel is up, so the way
                back to the top and the language switch live here instead. */}
            <div className="flex w-fit items-center gap-2">
              <button
                type="button"
                onClick={scrollToTop}
                title={t.common.backToTop}
                aria-label={t.common.backToTop}
                className="border-canvas/20 hover:border-canvas/60 hover:text-canvas flex size-9 items-center justify-center rounded-full border transition-colors duration-300"
              >
                <ArrowUp className="size-4" strokeWidth={1.8} aria-hidden />
              </button>
              <button
                type="button"
                onClick={toggleLocale}
                aria-label={t.common.langSwitch}
                className="border-canvas/20 font-label hover:border-canvas/60 hover:text-canvas flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-300"
              >
                {locale === "fr" ? "EN" : "FR"}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
