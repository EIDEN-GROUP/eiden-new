"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/ui/wordmark";
import { socialAccounts } from "@/components/ui/social-links";
import { useLanguage } from "@/components/providers/language-provider";
import { navRoutes, siteConfig } from "@/lib/data/site";
import { useScrolledPast } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** Vertical slats the mobile sheet wipes in with. */
const SLATS = 5;

export function SiteHeader() {
  const { t, locale, toggleLocale } = useLanguage();
  const pathname = usePathname();
  const scrolled = useScrolledPast(24);
  const [open, setOpen] = useState(false);

  const rowRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  /*
   * The gathered width is the two clusters' own widths plus the gap and the
   * row's padding. Measuring it lets `max-width` carry the whole collapse as
   * one CSS transition: the row narrows, `justify-between` walks the clusters
   * toward each other, and `mx-auto` lands the result in the centre.
   *
   * Both clusters are `shrink-0` and keep constant padding, so their measured
   * width never moves while the row is mid-transition.
   */
  useEffect(() => {
    const row = rowRef.current;
    const nav = navRef.current;
    const actions = actionsRef.current;
    if (!row || !nav || !actions) return;

    const measure = () => {
      const gathered = nav.offsetWidth + actions.offsetWidth + 8 + 12;
      row.style.setProperty("--nav-gathered", `${Math.ceil(gathered)}px`);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    observer.observe(actions);
    return () => observer.disconnect();
  }, []);

  // Lock the page behind the mobile sheet while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes it; so does a back/forward navigation underneath it.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPopState = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const links = navRoutes.filter((route) => route.key !== "home");

  const pillSkin =
    "border-forest/8 bg-canvas/85 shadow-[0_10px_40px_-16px_rgba(18,38,32,0.35)] backdrop-blur-xl";
  const pillFade =
    "transition-[background-color,border-color,box-shadow] duration-600 ease-[var(--ease-brand)] motion-reduce:transition-none";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding] duration-600 ease-[var(--ease-brand)]",
          scrolled ? "pt-3" : "pt-4 sm:pt-6",
        )}
      >
        <div className="container-eiden">
          <div
            ref={rowRef}
            className={cn(
              "mx-auto flex items-center justify-between gap-2 rounded-full border",
              "transition-[max-width,background-color,border-color,box-shadow] duration-700 ease-[var(--ease-brand)] motion-reduce:transition-none",
              scrolled
                ? cn("max-w-[var(--nav-gathered,100%)] p-1.5", pillSkin)
                : "max-w-full border-transparent bg-transparent p-1.5 shadow-none",
            )}
          >
            {/* Wordmark + primary navigation */}
            <nav
              ref={navRef}
              aria-label={t.footer.navLabel}
              className={cn(
                "flex shrink-0 items-center gap-1 rounded-full border p-1.5 pl-4",
                pillFade,
                scrolled
                  ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
                  : pillSkin,
              )}
            >
              <Link
                href="/"
                className="text-forest mr-2 flex items-center gap-2 sm:mr-4"
                aria-label={`${siteConfig.name} — ${t.nav.home}`}
              >
                <Wordmark className="h-5 sm:h-[1.35rem]" />
              </Link>

              <ul className="hidden items-center lg:flex">
                {links.map((route) => {
                  const active = pathname === route.href;
                  return (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                          active
                            ? "text-forest"
                            : "text-forest/60 hover:text-forest",
                        )}
                      >
                        {active ? (
                          <motion.span
                            layoutId="nav-active"
                            className="bg-beige absolute inset-0 rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                            }}
                          />
                        ) : null}
                        <span className="relative">{t.nav[route.key]}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t.common.menu}
                aria-expanded={open}
                className="bg-forest text-canvas hover:bg-teal ml-1 flex size-9 items-center justify-center rounded-full transition-colors lg:hidden"
              >
                <Menu className="size-4" strokeWidth={1.8} aria-hidden />
              </button>
            </nav>

            {/* Language switch + booking CTA */}
            <div ref={actionsRef} className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={toggleLocale}
                title={t.common.langSwitch}
                aria-label={t.common.langSwitch}
                className={cn(
                  "hidden h-11 items-center gap-1.5 rounded-full border px-4 sm:flex",
                  "font-label text-forest/70 text-[0.7rem] font-semibold tracking-[0.2em] uppercase",
                  "hover:text-forest",
                  pillFade,
                  scrolled
                    ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
                    : pillSkin,
                )}
              >
                <span className={cn(locale === "fr" && "text-teal")}>FR</span>
                <span aria-hidden className="text-forest/25">
                  /
                </span>
                <span className={cn(locale === "en" && "text-teal")}>EN</span>
              </button>

              <Link
                href="/contact"
                className="group bg-forest text-canvas hover:bg-teal flex h-11 items-center gap-2 rounded-full pr-1.5 pl-5 text-sm shadow-[0_10px_40px_-16px_rgba(18,38,32,0.6)] transition-colors duration-300"
              >
                <span className="hidden sm:inline">{t.common.bookCall}</span>
                <span className="sm:hidden">{t.nav.contact}</span>
                <span className="bg-gold text-forest flex size-8 items-center justify-center rounded-full transition-transform duration-300 ease-[var(--ease-brand)] group-hover:rotate-45">
                  <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile sheet — wipes in as vertical slats ───────────────── */}
      <div
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          open ? "visible" : "pointer-events-none invisible",
        )}
        style={{ transition: `visibility 0s linear ${open ? "0s" : "0.6s"}` }}
      >
        <div aria-hidden className="absolute inset-0 flex">
          {Array.from({ length: SLATS }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "grain bg-ink h-full flex-1 origin-left",
                "transition-transform duration-[520ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none",
                open ? "scale-x-100" : "scale-x-0",
              )}
              style={{
                // Opening runs left to right; closing peels back the other way.
                transitionDelay: `${(open ? index : SLATS - 1 - index) * 55}ms`,
              }}
            />
          ))}
        </div>

        <div
          className={cn(
            "relative flex h-full flex-col",
            "transition-[opacity,transform] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
            open
              ? "translate-y-0 opacity-100 delay-300"
              : "translate-y-3 opacity-0 delay-0",
          )}
        >
          <div className="container-eiden flex items-center justify-between pt-6">
            <Wordmark className="text-canvas h-6" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.common.close}
              className="border-canvas/15 text-canvas hover:bg-canvas/10 flex size-11 items-center justify-center rounded-full border transition-colors"
            >
              <X className="size-5" strokeWidth={1.6} aria-hidden />
            </button>
          </div>

          <nav
            aria-label={t.footer.navLabel}
            className="container-eiden flex flex-1 flex-col justify-center"
          >
            <ul className="flex flex-col">
              {navRoutes.map((route, index) => (
                <li
                  key={route.href}
                  className={cn(
                    "transition-[opacity,transform] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  )}
                  style={{
                    transitionDelay: open ? `${360 + index * 60}ms` : "0ms",
                  }}
                >
                  <Link
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className="border-canvas/10 font-display text-canvas hover:text-gold flex items-baseline justify-between border-b py-4 text-[clamp(1.75rem,9vw,2.5rem)] font-extrabold tracking-[-0.03em] transition-colors"
                  >
                    {t.nav[route.key]}
                    <span className="eyebrow text-canvas/30">0{index + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="container-eiden flex flex-col gap-5 pb-10">
            <ul className="flex items-center gap-2.5">
              {socialAccounts.map((account) => (
                <li key={account.label}>
                  <a
                    href={account.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={account.label}
                    className="border-canvas/20 text-canvas/70 hover:border-canvas/60 hover:text-canvas flex size-10 items-center justify-center rounded-full border transition-colors"
                  >
                    <account.Icon className="size-[1.05rem]" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-canvas/60 hover:text-canvas text-sm underline-offset-4 transition-colors hover:underline"
              >
                {siteConfig.email}
              </a>
              <button
                type="button"
                onClick={toggleLocale}
                className="eyebrow border-canvas/20 text-canvas/70 hover:text-canvas rounded-full border px-4 py-2.5 transition-colors"
              >
                {locale === "fr" ? "EN" : "FR"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
