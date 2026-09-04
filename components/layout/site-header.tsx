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

const LINE_LEAD = 320;
const LINE_STEP = 70;
const LIFT = 24;

type Tone = "dark" | "light";

function isDark(colour: string) {
  const parts = colour.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return true;
  const [r, g, b] = parts.map(Number);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
}

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
    if (alpha.length > 3 && Number(alpha[3]) < 0.5) continue;
    return isDark(bg) ? "dark" : "light";
  }

  return "light";
}

function useGround(open: boolean) {
  const ref = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = ref.current;
    const bar = barRef.current;
    if (!frame || !bar) return;

    let lifted = false;
    let tone: Tone | null = null;
    let raf = 0;

    const draw = () => {
      raf = 0;
      const nowLifted = !open && window.scrollY > LIFT;
      if (nowLifted !== lifted) {
        lifted = nowLifted;
        bar.dataset.lifted = String(nowLifted);
      }
      const nowTone: Tone =
        open || lifted
          ? "light"
          : toneAt(24, bar.getBoundingClientRect().height / 2, frame);

      if (nowTone !== tone) {
        tone = nowTone;
        bar.dataset.tone = nowTone;
      }
    };

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [open]);

  return { ref, barRef };
}

const inlineRoutes = navRoutes.filter((route) => route.key !== "contact");

export function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const footerRevealed = useFooterRevealed();
  const [open, setOpen] = useState(false);

  const { ref: headerRef, barRef } = useGround(open);
  const originRef = useRef<HTMLSpanElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

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

  const stowed = footerRevealed && !open;
  const homeLabel = `${siteConfig.name} — ${t.nav.home}`;

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
      <header
        ref={headerRef}
        aria-hidden={stowed || undefined}
        inert={stowed ? true : undefined}
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-[70]",
          "transition-[opacity,transform] duration-600 ease-[var(--ease-brand)] motion-reduce:transition-none",
          stowed && "-translate-y-full opacity-0",
        )}
      >
        <div
          ref={barRef}
          data-lifted="false"
          data-tone="light"
          className={cn(
            "group/bar transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
            "text-ink data-[tone=dark]:text-canvas",
          )}
        >
          <div
            className={cn(
              "nav-bar glass-light flex h-16 items-center justify-between gap-4 px-5 sm:h-18 sm:px-10 lg:hidden",
              "border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
              /* Transparent on the first screen, its own white after it. */
              "group-data-[lifted=true]/bar:bg-canvas/88 group-data-[lifted=true]/bar:border-ink/8 group-data-[lifted=true]/bar:pointer-events-auto group-data-[lifted=true]/bar:backdrop-blur-xl",
            )}
          >
            <Link
              href="/"
              onClick={() => setOpen(false)}
              aria-label={homeLabel}
              className={cn(
                "pointer-events-auto transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                "hover:text-teal",
              )}
            >
              <Wordmark className="h-7 sm:h-8" />
            </Link>

            <button
              type="button"
              onClick={() => {
                placeOrigin();
                setOpen((current) => !current);
              }}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? t.common.close : t.common.menu}
              className={cn(
                "pointer-events-auto flex h-10 shrink-0 items-center gap-3.5 rounded-full border pr-4 pl-5 sm:h-11 sm:gap-4 sm:pr-5 sm:pl-6",
                "transition-[background-color,border-color,color] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                open
                  ? "glass-dark bg-ink border-ink text-canvas"
                  : "border-current/35 hover:border-current",
              )}
            >
              <span
                aria-hidden
                className="font-label text-[0.78rem] font-bold tracking-[0.26em] uppercase"
              >
                {t.menu.label}
              </span>

              <span
                ref={originRef}
                aria-hidden
                className="relative block h-3.5 w-[1.375rem]"
              >
                <span
                  className={cn(
                    "absolute left-0 h-0.5 rounded-full bg-current transition-[rotate,width,top] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    open ? "top-1/2 w-full rotate-45" : "top-0 w-full rotate-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 rounded-full bg-current transition-[rotate,width,top] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    open ? "top-1/2 w-full -rotate-45" : "bottom-0 w-3/5 rotate-0",
                  )}
                />
              </span>
            </button>
          </div>

          <div className="hidden px-10 lg:block xl:px-12">
            <div
              className={cn(
                "nav-shell glass-light text-ink pointer-events-auto mx-auto mt-3 flex h-18 w-full max-w-[100vw] items-center justify-between gap-6 rounded-full pr-2",
                "group-data-[lifted=true]/bar:h-14 group-data-[lifted=true]/bar:max-w-[44rem]",
                "group-data-[lifted=true]/bar:bg-white group-data-[lifted=true]/bar:shadow-[0_12px_36px_-16px_rgba(18,38,32,0.26)]",
              )}
            >
              <div
                className={cn(
                  "nav-capsule glass-light flex h-14 shrink-0 items-center gap-8 rounded-full bg-white px-7 xl:gap-10",
                  "shadow-[0_12px_36px_-16px_rgba(18,38,32,0.26)] group-data-[lifted=true]/bar:shadow-none",
                )}
              >
                <Link
                  href="/"
                  aria-label={homeLabel}
                  className="hover:text-teal shrink-0 transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
                >
                  <Wordmark className="h-7" />
                </Link>

                <nav
                  aria-label={t.footer.navLabel}
                  className="flex items-center gap-7 xl:gap-8"
                >
                  {inlineRoutes.map((route) => {
                    const active = pathname === route.href;

                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group/link relative py-1 text-[0.9375rem] font-semibold whitespace-nowrap",
                          "transition-opacity duration-400 ease-[var(--ease-brand)] motion-reduce:transition-none",
                          active ? "opacity-100" : "opacity-70 hover:opacity-100",
                        )}
                      >
                        {t.nav[route.key]}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute bottom-0 left-0 h-px w-full origin-left bg-current",
                            "transition-transform duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                            active
                              ? "scale-x-100"
                              : "scale-x-0 group-hover/link:scale-x-100",
                          )}
                        />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <Link
                href="/contact"
                className={cn(
                  "nav-capsule glass-dark bg-teal text-canvas hover:bg-teal-dk flex h-10 shrink-0 items-center gap-2 rounded-full pr-4 pl-5 text-[0.9375rem] font-semibold whitespace-nowrap",
                  "shadow-[0_12px_36px_-16px_rgba(18,38,32,0.26)] group-data-[lifted=true]/bar:shadow-none",
                )}
              >
                {t.nav.contact}
                <ArrowUpRight aria-hidden strokeWidth={2} className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        ref={veilRef}
        data-open={open}
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={cn(
          "menu-veil bg-beige text-ink fixed inset-0 z-[60] flex flex-col",
          !open && "pointer-events-none",
        )}
      >
        <div aria-hidden className="h-16 shrink-0 sm:h-18" />

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
                  "menu-col group/col border-ink/12 relative isolate flex",
                  "min-h-28 items-center overflow-hidden border-b md:min-h-0 md:border-r md:border-b-0",
                  "last:border-b-0 md:last:border-r-0",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "bg-ink absolute inset-0 -z-10 transition-opacity duration-700 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    "opacity-100 md:opacity-0",
                    "md:group-hover/col:opacity-100 md:group-focus-visible/col:opacity-100",
                    active && "md:opacity-100",
                  )}
                >
                  <Image
                    src={menuMedia[route.key]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <span className="bg-ink/60 absolute inset-0" />
                </span>

                <span
                  aria-hidden
                  className={cn(
                    "bg-cream absolute inset-0 -z-20 hidden transition-opacity duration-700 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    "md:block md:group-hover/col:opacity-0 md:group-focus-visible/col:opacity-0",
                    active && "md:opacity-0",
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
                      active && "md:translate-x-0 md:opacity-100",
                    )}
                  />
                  <span
                    className={cn(
                      "font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-none font-extrabold tracking-[-0.03em] uppercase",
                      "transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                      "text-canvas md:text-ink",
                      "md:group-hover/col:text-canvas md:group-focus-visible/col:text-canvas",
                      active && "md:text-canvas",
                    )}
                  >
                    {t.nav[route.key]}
                  </span>
                </span>

                {/* The line the picture is worth, once it is on show. */}
                <span
                  aria-hidden
                  className={cn(
                    "editorial text-canvas/85 absolute bottom-5 left-6 hidden text-[0.9375rem]",
                    "transition-opacity duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    "md:block md:opacity-0",
                    "md:group-hover/col:opacity-100 md:group-focus-visible/col:opacity-100",
                    active && "md:opacity-100",
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
                  className="font-label text-ink/70 hover:text-teal inline-flex items-center gap-1.5 text-[0.75rem] font-bold tracking-[0.2em] uppercase transition-colors duration-300"
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
                  className="text-ink/70 hover:text-teal text-[0.875rem] transition-colors duration-300"
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
