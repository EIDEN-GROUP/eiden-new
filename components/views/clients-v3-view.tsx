"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, SlidersHorizontal, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { ContactBanner } from "@/components/sections/contact-banner";
import { ButtonLink } from "@/components/ui/button";
import { LogoMarquee } from "@/components/ui/marquee";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { scrollToElement, setScrollLock } from "@/components/providers/smooth-scroll";
import { useLanguage } from "@/components/providers/language-provider";
import { getProjectCase } from "@/lib/data/projects/index";
import { useFooterRevealed } from "@/lib/footer-reveal";
import { useHydrated } from "@/lib/hooks";
import { clientLogos, portfolioProjectUrl, projects, siteConfig, type ProjectCategory, } from "@/lib/data/site";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "all";

const FILTERS: Filter[] = [
  "all",
  "web",
  "hospitality",
  "restaurants",
  "lounge",
  "education",
  "health",
  "cooperative",
];

const THUMBS = FILTERS.reduce(
  (thumbs, filter) => {
    const found =
      filter === "all"
        ? projects[0]
        : projects.find((project) => project.category === filter);
    thumbs[filter] = (found ?? projects[0]).image;
    return thumbs;
  },
  {} as Record<Filter, string>,
);

const COLUMNS = [0, 1, 2].map((column) => ({
  seconds: [38, 30, 44][column],
  items: projects.filter((_, index) => index % 3 === column),
}));

function isWide(index: number) {
  return index >= 2 && (index - 2) % 5 === 0;
}

export function ClientsV3View() {
  const { t } = useLanguage();
  const page = t.pages.clients;
  const [active, setActive] = useState<Filter>("all");

  const counts = useMemo(() => {
    const tally = { all: projects.length } as Record<Filter, number>;
    for (const filter of FILTERS) {
      if (filter === "all") continue;
      tally[filter] = projects.filter(
        (project) => project.category === filter,
      ).length;
    }
    return tally;
  }, []);

  const shown = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((project) => project.category === active),
    [active],
  );

  /* Picking a filter from deep in the grid would leave the reader below a
     shorter list, so the grid is brought back up   but only when its top has
     already scrolled away. Measured at the pick, acted on after the commit,
     by which time the sheet has handed scrolling back. */
  const grid = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef(false);

  const pick = (filter: Filter) => {
    const top = grid.current?.getBoundingClientRect().top ?? 0;
    pendingScroll.current = filter !== active && top < 0;
    setActive(filter);
  };

  useEffect(() => {
    if (!pendingScroll.current) return;
    pendingScroll.current = false;
    if (grid.current) scrollToElement(grid.current);
  }, [active]);

  return (
    <div data-nav-tone="light" className="bg-canvas text-forest">
      {/* ── The claim, with the work already showing beside it ────────── */}
      <section className="grain">
        {/* <div className="container-eiden">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
            <div className="pt-20 pb-0 sm:pt-28 sm:pb-20">
              <Reveal direction="none" duration={0.5}>
                <p className="eyebrow text-teal flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-current opacity-50" />
                  {page.eyebrow}
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="text-forest mt-7 max-w-2xl text-[clamp(2.25rem,min(5.4vw,10vh),4.25rem)]">
                  {page.workTitle}
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="text-forest/65 mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                  {page.workLead}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                  <ButtonLink href={`https://wa.me/${siteConfig.phoneMa.replace(/\D/g, "")}`} variant="primary" size="lg">
                    {t.common.bookCall}
                  </ButtonLink>

                  <div className="border-forest/15 flex items-baseline gap-3 border-l pl-8">
                    <span className="font-display text-forest text-[1.75rem] leading-none font-extrabold tracking-[-0.04em]">
                      {projects.length}
                    </span>
                    <span className="text-forest/60 text-[0.9375rem]">
                      {page.statLabel}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} direction="left">
              <div
                aria-hidden
                className={cn(
                  ", relative h-[22rem] overflow-hidden [mask-image:linear-gradient(to_bottom,black_85%,transparent)] sm:h-[28rem] lg:h-[40rem]",
                )}
              >
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                  {COLUMNS.map((column, index) => (
                    <div
                      key={index}
                      className={cn("min-w-0", index === 2 && "hidden lg:block")}
                    >
                      <div
                        className="drift-y"
                        style={
                          {
                            "--drift-duration": `${column.seconds}s`,
                            "--drift-direction": index === 1 ? "reverse" : "normal",
                          } as CSSProperties
                        }
                      >
                        {[...column.items, ...column.items].map((project, i) => (
                          <div key={`${project.slug}-${i}`} className="pb-3">
                            <div
                              className={cn(
                                "glass-dark glass-top ring-forest/10 relative overflow-hidden rounded-2xl ring-1",
                                i % column.items.length === 0
                                  ? "aspect-4/5"
                                  : "aspect-4/3",
                              )}
                            >
                              <Image
                                src={project.image}
                                alt=""
                                fill
                                sizes="(max-width: 1024px) 70vw, 30vw"
                                className="size-full object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div> */}

        {/* <div className="container-eiden border-forest/12 border-y py-3">
          <LogoMarquee logos={clientLogos} tone="dark" speed={44} />
        </div> */}

        <div className="m-5 pt-5 pb-24 sm:pt-15 sm:pb-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start lg:gap-10 xl:gap-12">
            <div className="lg:sticky lg:top-0">
              <div className=" rounded-[1.75rem] p-4">
                <div className="pt-10 pb-0 sm:pt-15 sm:pb-20">
                <Reveal direction="none" duration={0.5}>
                  <p className="eyebrow text-teal flex items-center gap-3">
                    <span aria-hidden className="h-px w-8 bg-current opacity-50" />
                    {page.eyebrow}
                  </p>
                </Reveal>

              <Reveal delay={0.06}>
                  <h1 className="text-forest mt-7 max-w-2xl text-[clamp(2.25rem,min(5.4vw,10vh),4.25rem)]">
                    {page.workTitle}
                  </h1>
                </Reveal>

                <Reveal delay={0.12}>
                  <p className="text-forest/65 mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                    {page.workLead}
                  </p>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                    <ButtonLink href={`https://wa.me/${siteConfig.phoneMa.replace(/\D/g, "")}`} variant="primary" size="lg">
                      {t.common.bookCall}
                    </ButtonLink>

                    <div className="border-forest/15 flex items-baseline gap-3 border-l pl-8">
                      <span className="font-display text-forest text-[1.75rem] leading-none font-extrabold tracking-[-0.04em]">
                        {projects.length}
                      </span>
                      <span className="text-forest/60 text-[0.9375rem]">
                        {page.statLabel}
                      </span>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.24}>
                  <FilterControl
                    active={active}
                    counts={counts}
                    labels={page.filters}
                    copy={page.v2}
                    onPick={pick}
                  />
                </Reveal>
              </div>
              </div>
            </div>

            <div ref={grid} className="min-w-0">
            {shown.length === 0 ? (
              <p className="text-forest/55 text-[0.9375rem]">{page.empty}</p>
            ) : (
              <RevealGroup key={active} className="grid gap-4 sm:grid-cols-2">
                {shown.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    href={
                      getProjectCase(project.slug)
                        ? `/projects/${project.slug}`
                        : portfolioProjectUrl(project.slug)
                    }
                    external={!getProjectCase(project.slug)}
                    name={project.name}
                    category={page.filters[project.category]}
                    line={page.projectLines[project.slug]}
                    image={project.image}
                    imageAlt={project.imageAlt}
                    index={index}
                    label={page.viewProject}
                    wide={isWide(index)}
                  />
                ))}
              </RevealGroup>
            )}
            </div>
          </div>
        </div>
      </section>

      {/* ── The ground the work stands on ────────────────────────────── */}
      {/* <section className="border-forest/12 border-t">
        <div className="container-eiden py-24 sm:py-32">
          <Reveal direction="none" duration={0.5}>
            <p className="eyebrow text-teal flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {page.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-forest mt-7 max-w-2xl text-[clamp(1.75rem,3.6vw,2.75rem)]">
              {page.sectorsTitle}
            </h2>
          </Reveal>

          <RevealGroup className="glass-light mt-14 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3">
            {page.sectors.map((sector) => (
              <article key={sector.title} className="bg-forest/[0.04] hover:bg-forest/[0.07] p-8 transition-colors duration-500">
                <h3 className="font-display text-forest text-lg font-bold tracking-[-0.02em]">
                  {sector.title}
                </h3>
                <p className="text-forest/65 mt-3 text-[0.9375rem] leading-relaxed">
                  {sector.text}
                </p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section> */}

      {/* <ContactBanner /> */}
    </div>
  );
}

function ProjectCard({
  href,
  external,
  name,
  category,
  line,
  image,
  imageAlt,
  index,
  label,
  wide,
}: {
  href: string;
  external: boolean;
  name: string;
  category: string;
  line: string;
  image: string;
  imageAlt: string;
  index: number;
  label: string;
  wide?: boolean;
}) {
  const track = (event: PointerEvent<HTMLAnchorElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--disc-x",
      `${event.clientX - box.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--disc-y",
      `${event.clientY - box.top}px`,
    );
  };

  const Tag = external ? "a" : Link;
  const opening = external
    ? { target: "_blank" as const, rel: "noreferrer noopener" }
    : { transitionTypes: ["case-open"] };

  return (
    <Tag href={href} {...opening} onPointerMove={track} className={cn( "group focus-visible:outline-teal relative block focus-visible:outline-2 focus-visible:outline-offset-4", wide && "sm:col-span-2", )}>
      <div className={cn( "bg-forest/[0.04] relative overflow-hidden rounded-[1.25rem]", wide ? "aspect-4/3 sm:aspect-16/9" : "aspect-4/3", )}>
        <Image src={image} alt={imageAlt} fill sizes={ wide ? "(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 62vw" : "(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 50vw" } className="size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.04] motion-reduce:transition-none" />
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/100 to-transparent" />
        <p className="eyebrow text-canvas/80 absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/80 px-5 py-2">
          <span className="numeral text-gold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden className="bg-canvas/30 h-3 w-px" />
          {category}
        </p>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-canvas group-hover:text-gold mt-5 text-[1.0625rem] leading-snug font-bold tracking-[-0.02em] transition-colors duration-300 sm:text-lg">
            {name}
          </h3>
          <p className="text-canvas/50 mt-2 line-clamp-2 max-w-lg text-[0.9375rem] leading-relaxed">
            {line}
          </p>
        </div>

        <span
          aria-hidden
          className={cn(
            "bg-gold text-ink pointer-events-none absolute z-10 hidden size-28 flex-col items-center justify-center gap-1 rounded-full text-center",
            "top-[var(--disc-y,50%)] left-[var(--disc-x,50%)] -translate-x-1/2 -translate-y-1/2",
            "scale-50 opacity-0 transition-[opacity,scale] duration-400 ease-[var(--ease-brand)]",
            "group-hover:scale-100 group-hover:opacity-100",
            "motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:flex",
          )}
        >
          <ArrowUpRight className="size-4" strokeWidth={2} />
          <span className="font-label px-4 text-[0.7rem] leading-tight font-bold tracking-[0.08em] uppercase">
            {label}
          </span>
        </span>
      </div>
    </Tag>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   The filter   a selector in the column, a dock for when it has scrolled
   away, and the sheet both of them open (the sheet is the /clients-v2 one)
   ──────────────────────────────────────────────────────────────────────── */

type Copy = {
  filterCta: string;
  filterTitle: string;
  filterClose: string;
};

function FilterControl({
  active,
  counts,
  labels,
  copy,
  onPick,
}: {
  active: Filter;
  counts: Record<Filter, number>;
  labels: Record<Filter, string>;
  copy: Copy;
  onPick: (filter: Filter) => void;
}) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);
  const selector = useRef<HTMLDivElement>(null);

  /* The selector lives in the column, which is pinned on a desktop and so
     never leaves the screen   there the dock is never needed. On a phone the
     column sits above the grid and scrolls away with it; the dock stands in
     for it from then on. The top margin is the fixed header: a selector
     tucked under the nav counts as gone. */
  const [selectorInView, setSelectorInView] = useState(true);

  useEffect(() => {
    const node = selector.current;
    if (!node) return;
    const watcher = new IntersectionObserver(
      ([entry]) => setSelectorInView(entry.isIntersecting),
      { rootMargin: "-88px 0px 0px 0px" },
    );
    watcher.observe(node);
    return () => watcher.disconnect();
  }, []);

  const footerRevealed = useFooterRevealed();
  const stowed = open || selectorInView || footerRevealed;
  const hydrated = useHydrated();
  const filtered = active !== "all";

  const show = (event: MouseEvent<HTMLButtonElement>) => {
    opener.current = event.currentTarget;
    setOpen(true);
  };

  /* Focus goes back to whichever control opened the sheet, without dragging
     the page to it. */
  const close = useCallback(() => {
    setOpen(false);
    opener.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <div ref={selector} className="border-forest/12 mt-10 border-t pt-6">
        <p className="text-forest/55 text-[0.875rem]">{copy.filterTitle}</p>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={show}
            aria-haspopup="dialog"
            aria-expanded={open}
            className={cn(
              "group focus-visible:outline-teal flex min-w-0 flex-1 items-center gap-3 rounded-2xl p-1.5 pr-4 text-left",
              "bg-forest/[0.05] ring-forest/10 hover:bg-forest/[0.09] ring-1 ring-inset",
              "transition-colors duration-300 ease-[var(--ease-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
            )}
          >
            <span className="bg-forest/10 relative size-12 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={THUMBS[active]}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>

            <span className="min-w-0 flex-1">
              <span className="text-forest block truncate text-[0.9375rem] leading-snug font-semibold">
                {labels[active]}
              </span>
              <span className="numeral text-forest/45 mt-0.5 block text-[0.7rem]">
                {String(counts[active]).padStart(2, "0")}
              </span>
            </span>

            <span className="font-label text-forest/60 group-hover:text-forest flex shrink-0 items-center gap-2 text-[0.7rem] font-bold tracking-[0.22em] uppercase transition-colors duration-300">
              {copy.filterCta}
              <SlidersHorizontal className="size-3.5" strokeWidth={2} aria-hidden />
            </span>
          </button>

          {/* One tap back to everything, only once there is something to undo. */}
          {filtered && (
            <button
              type="button"
              onClick={() => onPick("all")}
              aria-label={labels.all}
              title={labels.all}
              className={cn(
                "focus-visible:outline-teal flex w-[3.75rem] shrink-0 items-center justify-center rounded-2xl",
                "bg-forest/[0.05] ring-forest/10 text-forest/70 hover:bg-forest hover:text-canvas ring-1 ring-inset",
                "transition-colors duration-300 ease-[var(--ease-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
              )}
            >
              <X className="size-4" strokeWidth={1.8} aria-hidden />
            </button>
          )}
        </div>
      </div>

      {/* Portalled: the selector sits inside a Reveal, whose transform would
          otherwise become the dock's frame instead of the viewport. Left of
          the WhatsApp column rather than under it   both are pinned to the
          same corner, and the dock is the one that belongs to this page. */}
      {hydrated &&
        createPortal(
          <div className="pointer-events-none fixed right-[4.75rem] bottom-5 z-50 sm:right-[5.5rem] sm:bottom-8">
            <button
              type="button"
              onClick={show}
              aria-haspopup="dialog"
              aria-expanded={open}
              tabIndex={stowed ? -1 : undefined}
              aria-hidden={stowed || undefined}
              className={cn(
                "glass-dark bg-ink text-canvas hover:bg-teal flex h-11 items-center gap-3 rounded-full pr-4 pl-5",
                "shadow-[0_14px_44px_-16px_rgba(0,0,0,0.8)] transition-[color,border-color,opacity,scale] duration-300 ease-[var(--ease-brand)] motion-reduce:transition-none",
                stowed
                  ? "scale-90 opacity-0"
                  : "pointer-events-auto scale-100 opacity-100",
              )}
            >
              <span className="font-label text-[0.7rem] font-bold tracking-[0.22em] uppercase">
                {filtered ? labels[active] : copy.filterCta}
              </span>
              {filtered ? (
                <span aria-hidden className="bg-gold size-2 rounded-full" />
              ) : (
                <SlidersHorizontal className="size-3.5" strokeWidth={2} aria-hidden />
              )}
            </button>
          </div>,
          document.body,
        )}

      <FilterSheet
        open={open}
        active={active}
        counts={counts}
        labels={labels}
        copy={copy}
        onPick={(filter) => {
          onPick(filter);
          close();
        }}
        onClose={close}
      />
    </>
  );
}

function FilterSheet({
  open,
  active,
  counts,
  labels,
  copy,
  onPick,
  onClose,
}: {
  open: boolean;
  active: Filter;
  counts: Record<Filter, number>;
  labels: Record<Filter, string>;
  copy: Copy;
  onPick: (filter: Filter) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const closer = useRef<HTMLButtonElement>(null);

  /* Portalled onto the body, so held back until after the hydrating render
     otherwise the client tree would carry a dialog the server never sent. */
  const hydrated = useHydrated();

  /* Escape closes, Tab stays inside. */
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key !== "Tab") return;

      const stops = dialog.current?.querySelectorAll<HTMLElement>(
        "button:not([tabindex='-1'])",
      );
      if (!stops?.length) return;
      const first = stops[0];
      const last = stops[stops.length - 1];
      const on = document.activeElement;

      if (event.shiftKey && (on === first || !dialog.current?.contains(on))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && on === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* The page behind is held still, the smooth scroll included. */
  useEffect(() => {
    if (!open) return;
    setScrollLock(true);
    return () => setScrollLock(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    closer.current?.focus();
  }, [open]);

  if (!hydrated) return null;

  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={copy.filterTitle}
      inert={!open ? true : undefined}
      className={cn(
        "fixed inset-0 z-[100] overscroll-contain",
        "transition-opacity duration-[500ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <button
        type="button"
        tabIndex={-1}
        onClick={onClose}
        aria-label={copy.filterClose}
        className="absolute inset-0 cursor-default bg-black/90 backdrop-blur-[48px] md:bg-black/80 md:backdrop-blur-[32px]"
      />

      {/* Centred with auto margins rather than flex alignment, so a list taller
          than a short screen scrolls from its top instead of losing it. */}
      <div className="relative flex h-full overflow-y-auto px-5 py-20 sm:px-10 sm:py-24">
        <div className="m-auto w-full max-w-[56rem]">
          {/* The closer sits with the title: the sheet is opened from the
              column as often as from the corner, so the way out is kept next
              to what is being read. */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-canvas/80 text-[0.9375rem]">{copy.filterTitle}</p>
            <button
              ref={closer}
              type="button"
              onClick={onClose}
              aria-label={copy.filterClose}
              className="bg-canvas/12 text-canvas hover:bg-canvas hover:text-ink focus-visible:outline-gold flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ease-[var(--ease-brand)] focus-visible:outline-2 focus-visible:-outline-offset-2 motion-reduce:transition-none"
            >
              <X className="size-4.5" strokeWidth={1.8} aria-hidden />
            </button>
          </div>

          <ul className="mt-5 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {FILTERS.map((filter) => {
              const on = filter === active;

              return (
                <li key={filter}>
                  <button
                    type="button"
                    onClick={() => onPick(filter)}
                    aria-pressed={on}
                    className={cn(
                      "focus-visible:outline-gold flex w-full items-stretch gap-3 rounded-lg p-1.5 text-left",
                      "transition-colors duration-300 ease-[var(--ease-brand)] focus-visible:outline-2 focus-visible:-outline-offset-2 motion-reduce:transition-none",
                      on
                        ? "bg-canvas/22"
                        : "bg-canvas/[0.07] hover:bg-canvas/[0.14]",
                    )}
                  >
                    <span className="bg-canvas/10 relative size-14 shrink-0 overflow-hidden rounded-md sm:size-[5.375rem]">
                      <Image
                        src={THUMBS[filter]}
                        alt=""
                        fill
                        sizes="86px"
                        className="object-cover"
                      />
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col justify-between py-1.5 pr-2">
                      <span className="text-canvas line-clamp-2 text-[0.9375rem] leading-snug font-medium">
                        {labels[filter]}
                      </span>
                      <span className="numeral text-canvas/35 text-[0.7rem]">
                        {String(counts[filter]).padStart(2, "0")}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

    </div>,
    document.body,
  );
}
