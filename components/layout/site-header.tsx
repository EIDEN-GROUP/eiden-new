"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/ui/wordmark";
import { socialAccounts } from "@/components/ui/social-links";
import { useLanguage } from "@/components/providers/language-provider";
import { menuMedia, navRoutes, siteConfig } from "@/lib/data/site";
import { useFooterRevealed } from "@/lib/footer-reveal";
import { cn } from "@/lib/utils";

/** Milliseconds: the circle has to be most of the way open first. */
const LINE_LEAD = 320;
const LINE_STEP = 70;

type Tone = "dark" | "light";

/** Relative luminance, near enough for a light-or-dark decision. */
function isDark(colour: string) {
  const parts = colour.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return true;
  const [r, g, b] = parts.map(Number);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
}

/**
 * What is behind a point on the screen, as something to draw against.
 *
 * A band may declare itself with `data-nav-tone` — the only way to be right
 * about a photograph or a ground that is cross-fading, neither of which a
 * computed colour describes. Everything else is read straight off the first
 * opaque background under the point, so an ordinary section needs no mark.
 *
 * Declarations are taken in a pass of their own, ahead of any colour: a band
 * that says what it is outranks a layer inside it that merely has a fill.
 */
function toneAt(x: number, y: number, ignore: HTMLElement | null): Tone {
  const stack = document
    .elementsFromPoint(x, y)
    .filter((el) => !ignore?.contains(el)) as HTMLElement[];

  for (const el of stack) {
    const declared = el.dataset?.navTone;
    if (declared === "light" || declared === "dark") return declared;
  }

  for (const el of stack) {
    const style = getComputedStyle(el);
    if (Number(style.opacity) < 0.5) continue;
    const bg = style.backgroundColor;
    const alpha = bg.match(/[\d.]+/g);
    if (!alpha) continue;
    // `rgb(...)` is opaque; `rgba(...)` carries the alpha as a fourth value.
    if (alpha.length > 3 && Number(alpha[3]) < 0.5) continue;
    return isDark(bg) ? "dark" : "light";
  }

  return "dark";
}

export function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const footerRevealed = useFooterRevealed();
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLAnchorElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const originRef = useRef<HTMLSpanElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  /* The circle the panel opens as, centred on the button that opened it. */
  const placeOrigin = useCallback(() => {
    const origin = originRef.current;
    const veil = veilRef.current;
    if (!origin || !veil) return;

    const box = origin.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    veil.style.setProperty("--menu-x", `${Math.round(x)}px`);
    veil.style.setProperty("--menu-y", `${Math.round(y)}px`);
    veil.style.setProperty("--menu-r", `${Math.ceil(radius)}px`);
  }, []);

  useEffect(() => {
    placeOrigin();
    if (!open) return;
    window.addEventListener("resize", placeOrigin);
    return () => window.removeEventListener("resize", placeOrigin);
  }, [open, placeOrigin]);

  /*
   * The mark and the controls are drawn against whatever they happen to be
   * over, and each is read where it sits — a picture wide enough to reach one
   * of them need not reach both.
   *
   * Written straight onto the nodes from a frame loop: the tone changes a
   * handful of times in a page, and re-rendering the panel and its five
   * pictures to move two colours would be paying far too much for it. The hit
   * test itself is skipped on any frame the page has not moved, so standing
   * still costs one property read.
   */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let raf = 0;
    let painted = Number.NaN;
    let forced = false;

    const paint = () => {
      // The panel's own bar is ink, whatever the page underneath is doing.
      if (open) {
        if (!forced) {
          forced = true;
          painted = Number.NaN;
          markRef.current?.setAttribute("data-tone", "dark");
          actionsRef.current?.setAttribute("data-tone", "dark");
        }
        raf = requestAnimationFrame(paint);
        return;
      }
      forced = false;

      const y = window.scrollY;
      if (y !== painted) {
        painted = y;
        for (const node of [markRef.current, actionsRef.current]) {
          if (!node) continue;
          const box = node.getBoundingClientRect();
          const tone = toneAt(
            box.left + box.width / 2,
            box.top + box.height / 2,
            header,
          );
          if (node.getAttribute("data-tone") !== tone) {
            node.setAttribute("data-tone", tone);
          }
        }
      }
      raf = requestAnimationFrame(paint);
    };

    paint();
    const remeasure = () => {
      painted = Number.NaN;
    };
    window.addEventListener("resize", remeasure);
    return () => {
      window.removeEventListener("resize", remeasure);
      cancelAnimationFrame(raf);
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

  /* The footer is its own full frame with its own navigation; the bar has
     nothing left to offer over it, so it stows itself. */
  const stowed = footerRevealed && !open;

  const reach = [
    { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    {
      label: siteConfig.phoneMa,
      href: `tel:${siteConfig.phoneMa.replace(/\s/g, "")}`,
    },
    { label: t.menu.booking, href: siteConfig.bookingUrl },
  ];

  return (
    <>
      {/* The bar itself never paints and never takes the pointer — only the
          mark and the controls do. That is what lets the tone read what is
          behind them instead of finding the bar in its own way. */}
      <header
        ref={headerRef}
        aria-hidden={stowed || undefined}
        inert={stowed ? true : undefined}
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-[70] py-4 sm:py-6",
          "transition-[opacity,transform] duration-600 ease-[var(--ease-brand)] motion-reduce:transition-none",
          stowed ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <div className="container-eiden flex items-center justify-between gap-4">
          <Link
            ref={markRef}
            href="/"
            data-tone="dark"
            onClick={() => setOpen(false)}
            aria-label={`${siteConfig.name} — ${t.nav.home}`}
            className={cn(
              "pointer-events-auto",
              "text-canvas data-[tone=light]:text-teal",
              "transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
            )}
          >
            <Wordmark className="h-8 sm:h-10" />
          </Link>

          <div
            ref={actionsRef}
            data-tone="dark"
            className={cn(
              "pointer-events-auto flex items-center",
              "text-canvas data-[tone=light]:text-ink",
              "transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
            )}
          >
            <button
              ref={buttonRef}
              type="button"
              onClick={() => {
                placeOrigin();
                setOpen((current) => !current);
              }}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? t.common.close : t.common.menu}
              className={cn(
                "flex h-11 shrink-0 items-center gap-3.5 rounded-full border pr-4 pl-5 sm:h-12 sm:gap-4 sm:pr-5 sm:pl-6",
                "transition-[background-color,border-color,color] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                open
                  ? "bg-ink border-ink text-canvas"
                  : "border-current/35 hover:border-current",
              )}
            >
              {/* The word the control is, kept inside its own border. The
                  button already carries the label for a screen reader, so
                  this is only here to be read. */}
              <span
                aria-hidden
                className="font-label text-[0.68rem] font-semibold tracking-[0.26em] uppercase"
              >
                {t.menu.label}
              </span>

              <span ref={originRef} aria-hidden className="relative block h-3 w-5">
                {/* Two rules of unequal length at rest — the mark of the
                    panel — crossing into a single X once it is open. */}
                <span
                  className={cn(
                    "absolute left-0 h-px bg-current transition-[transform,width] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    open ? "top-1/2 w-full rotate-45" : "top-0 w-full rotate-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px bg-current transition-[transform,width] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    open ? "top-1/2 w-full -rotate-45" : "bottom-0 w-3/5 rotate-0",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── The panel ───────────────────────────────────────────────────
          Opens as a circle struck from the button that opened it, then the
          routes rise into their columns behind it. */}
      <div
        id="site-menu"
        ref={veilRef}
        data-open={open}
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={cn(
          "menu-veil bg-ink text-canvas fixed inset-0 z-[60] flex flex-col",
          !open && "pointer-events-none",
        )}
      >
        {/* The bar sits over this, so the panel only has to leave it room. */}
        <div aria-hidden className="h-19 shrink-0 sm:h-24" />

        <nav
          aria-label={t.footer.navLabel}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-visible"
        >
          {navRoutes.map((route, index) => {
            const active = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                tabIndex={open ? undefined : -1}
                className={cn(
                  "menu-col group/col border-canvas/12 relative isolate flex",
                  "min-h-28 items-center overflow-hidden border-b md:min-h-0 md:border-r md:border-b-0",
                  "last:border-b-0 md:last:border-r-0",
                )}
              >
                {/* The picture. Always on show where the routes are stacked
                    and there is no pointer to open one with; from `md` up it
                    waits for the column to be opened.

                    It fills its slot, and no picture is drawn above its own
                    scale doing so — that is a property of the files chosen,
                    not of the fit, and `menuMedia` says what it costs. Fitting
                    the whole frame instead would strand the portraits as a
                    sliver down the middle of a phone's short, wide row. */}
                <span
                  aria-hidden
                  className={cn(
                    "bg-ink absolute inset-0 -z-10 transition-opacity duration-700 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    "opacity-100 md:opacity-0",
                    "md:group-hover/col:opacity-100 md:group-focus-visible/col:opacity-100",
                  )}
                >
                  <Image
                    src={menuMedia[route.key]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                  {/* What the type is read against, at every width. */}
                  <span className="bg-ink/60 absolute inset-0" />
                </span>

                {/* The cream the closed columns are cut from. */}
                <span
                  aria-hidden
                  className={cn(
                    "bg-cream absolute inset-0 -z-20 hidden transition-opacity duration-700 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    "md:block md:group-hover/col:opacity-0 md:group-focus-visible/col:opacity-0",
                  )}
                />

                <span
                  className={cn(
                    "flex w-full items-center gap-3 px-6 transition-[transform,opacity] duration-[750ms] ease-[var(--ease-brand)] motion-reduce:transition-none",
                    "md:justify-center md:px-4",
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  )}
                  style={{
                    transitionDelay: open
                      ? `${LINE_LEAD + index * LINE_STEP}ms`
                      : "0ms",
                  }}
                >
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={2}
                    className={cn(
                      "size-5 shrink-0 transition-[opacity,transform] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                      "text-canvas opacity-100",
                      "md:-translate-x-2 md:opacity-0",
                      "md:group-hover/col:translate-x-0 md:group-hover/col:opacity-100",
                      "md:group-focus-visible/col:translate-x-0 md:group-focus-visible/col:opacity-100",
                    )}
                  />
                  <span
                    className={cn(
                      "font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-none font-extrabold tracking-[-0.03em] uppercase",
                      "transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                      "text-canvas md:text-ink",
                      "md:group-hover/col:text-canvas md:group-focus-visible/col:text-canvas",
                      active && "md:text-gold-dk",
                    )}
                  >
                    {t.nav[route.key]}
                  </span>
                </span>

                {/* The line the picture is worth, once it is on show. */}
                <span
                  aria-hidden
                  className={cn(
                    "editorial text-canvas/85 absolute bottom-5 left-6 hidden text-sm",
                    "transition-opacity duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    "md:block md:opacity-0",
                    "md:group-hover/col:opacity-100 md:group-focus-visible/col:opacity-100",
                  )}
                >
                  {t.menu.captions[route.key]}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ── The strip under it ──────────────────────────────────────── */}
        <div
          className={cn(
            "container-eiden flex shrink-0 flex-col gap-3 py-4 transition-opacity duration-700 ease-[var(--ease-brand)] motion-reduce:transition-none",
            "sm:flex-row sm:items-center sm:justify-between sm:gap-6",
            open ? "opacity-100" : "opacity-0",
          )}
          style={{
            transitionDelay: open
              ? `${LINE_LEAD + navRoutes.length * LINE_STEP}ms`
              : "0ms",
          }}
        >
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {socialAccounts.map((account) => (
              <li key={account.label}>
                <a
                  href={account.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  tabIndex={open ? undefined : -1}
                  className="font-label text-canvas/70 hover:text-gold inline-flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-300"
                >
                  {account.label}
                  <ArrowUpRight className="size-3" strokeWidth={2} aria-hidden />
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {reach.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  tabIndex={open ? undefined : -1}
                  className="text-canvas/70 hover:text-gold text-[0.8125rem] transition-colors duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
