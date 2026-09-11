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
} from "react";
import { createPortal } from "react-dom";
import { setScrollLock } from "@/components/providers/smooth-scroll";
import { useLanguage } from "@/components/providers/language-provider";
import { ButtonLink } from "@/components/ui/button";
import { getProjectCase } from "@/lib/data/projects/index";
import { useFooterRevealed } from "@/lib/footer-reveal";
import { useHydrated } from "@/lib/hooks";
import {
  portfolioProjectUrl,
  projects,
  siteConfig,
  type ProjectCategory,
} from "@/lib/data/site";
import { cn } from "@/lib/utils";

type Project = (typeof projects)[number];
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

const HEADLINE_SHAPE = "aspect-2/3";
const MEDIUM_SHAPE = "aspect-4/3";
const HEADLINE = new Set<string>(["lunja-village", "dmc-morocco", "bopassage"]);
const WALL: Project[] = (() => {
  const list = [...projects];
  const lunja = list.findIndex((project) => project.slug === "lunja-village");
  const chillout = list.findIndex((project) => project.slug === "chillout-lounge");
  if (lunja >= 0 && chillout >= 0) {
    [list[lunja], list[chillout]] = [list[chillout], list[lunja]];
  }
  return list;
})();

const V2_CASES: Record<string, string> = {
  "lunja-village": "/lunja-village-v2",
  bopassage: "/bopassage-v2",
  "dmc-morocco": "/dmc-morocco-v2",
};

const COVERS: Record<string, string> = {
  bopassage: "/work/bopassage/bopassage-cover.jpg",
};

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

const FEATURED =
  projects.find((project) => getProjectCase(project.slug)) ?? projects[0];

export function ClientsV2View() {
  const { t } = useLanguage();
  const page = t.pages.clients;
  const copy = page.v2;
  const [active, setActive] = useState<Filter>("all");

  const counts = useMemo(() => {
    const tally = { all: WALL.length } as Record<Filter, number>;
    for (const filter of FILTERS) {
      if (filter === "all") continue;
      tally[filter] = WALL.filter((project) => project.category === filter).length;
    }
    return tally;
  }, []);

  const shown = useMemo(
    () =>
      active === "all"
        ? WALL
        : WALL.filter((project) => project.category === active),
    [active],
  );

  const columns = useMemo(() => {
    const dealt: { project: Project; index: number }[][] = [[], []];
    shown.forEach((project, index) => dealt[index % 2].push({ project, index }));
    return dealt;
  }, [shown]);

  return (
    <div data-nav-tone="light" className="bg-canvas text-ink">
      <div className="lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <Rail
          copy={copy}
          eyebrow={page.eyebrow}
          title={page.workTitle}
          lead={page.workLead}
          statLabel={page.statLabel}
          featuredLine={page.projectLines[FEATURED.slug]}
          featuredCategory={page.filters[FEATURED.category]}
          cta={t.common.bookCall}
        />

        <div className="min-w-0 p-1.5">
          {shown.length === 0 ? (
            <p className="text-ink/55 px-4 py-24 text-[0.9375rem]">{page.empty}</p>
          ) : (
            <div
              key={active}
              className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:items-start"
            >
              {columns.map((column, side) => (
                <div
                  key={side}
                  className="contents sm:grid sm:content-start sm:gap-1.5"
                >
                  {column.map(({ project, index }) => (
                    <Tile
                      key={project.slug}
                      project={project}
                      index={index}
                      image={COVERS[project.slug] ?? project.image}
                      shape={
                        HEADLINE.has(project.slug) ? HEADLINE_SHAPE : MEDIUM_SHAPE
                      }
                      category={page.filters[project.category]}
                      line={page.projectLines[project.slug]}
                      label={page.viewProject}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <FilterDock
        active={active}
        counts={counts}
        labels={page.filters}
        copy={copy}
        onPick={setActive}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   The rail   everything the old page put in a hero, stood on its side
   ──────────────────────────────────────────────────────────────────────── */

function Rail({
  copy,
  eyebrow,
  title,
  lead,
  statLabel,
  featuredLine,
  featuredCategory,
  cta,
}: {
  copy: { featuredLabel: string };
  eyebrow: string;
  title: string;
  lead: string;
  statLabel: string;
  featuredLine: string;
  featuredCategory: string;
  cta: string;
}) {
  const featuredHref = getProjectCase(FEATURED.slug)
    ? `/projects/${FEATURED.slug}`
    : portfolioProjectUrl(FEATURED.slug);

  return (
    <aside className="border-ink/10 no-scrollbar relative z-20 border-b lg:sticky lg:top-0 lg:h-dvh lg:self-start lg:overflow-y-auto lg:border-r lg:border-b-0">
      <div className="flex h-full flex-col px-5 pt-24 pb-10 sm:px-10 sm:pt-32 lg:px-7 lg:pt-30 lg:pb-6 xl:px-9">
        <p className="eyebrow text-teal flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-current opacity-50" />
          {eyebrow}
        </p>

        <h1 className="text-ink mt-6 text-[clamp(1.75rem,4.4vw,2.5rem)] lg:mt-7 lg:text-[clamp(1.6rem,2.1vw,2.15rem)]">
          {title}
        </h1>

        <p className="text-ink/55 mt-5 max-w-md text-[0.9375rem] leading-relaxed lg:mt-6 lg:text-[0.9375rem]">
          {lead}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 lg:mt-8">
          <ButtonLink
            href={`https://wa.me/${siteConfig.phoneMa.replace(/\D/g, "")}`}
            variant="dark"
            size="md"
          >
            {cta}
          </ButtonLink>

          <div className="border-ink/15 flex items-baseline gap-3 border-l pl-6">
            <span className="font-display text-ink text-[1.5rem] leading-none font-extrabold tracking-[-0.04em]">
              {projects.length}
            </span>
            <span className="text-ink/50 text-[0.875rem]">{statLabel}</span>
          </div>
        </div>

        <Link
          href={featuredHref}
          {...(getProjectCase(FEATURED.slug)
            ? { transitionTypes: ["case-open"] }
            : {})}
          className="group border-ink/10 hover:border-ink/25 bg-ink/[0.03] hover:bg-ink/[0.06] mt-auto hidden items-center gap-3.5 rounded-2xl border p-3 transition-colors duration-500 ease-[var(--ease-brand)] lg:flex"
        >
          <span className="bg-ink/5 relative size-12 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={FEATURED.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 80vw, 75vw"
              quality={95}
              className="object-cover"
            />
          </span>

          <span className="min-w-0 flex-1">
            <span className="text-ink block truncate text-[0.875rem] font-semibold">
              {FEATURED.name}
            </span>
            <span className="text-ink/45 block truncate text-[0.8125rem]">
              {featuredLine}
            </span>
            <span className="font-label text-ink/35 mt-1.5 block text-[0.62rem] font-bold tracking-[0.18em] uppercase">
              {featuredCategory} · {copy.featuredLabel}
            </span>
          </span>

          <ArrowUpRight
            aria-hidden
            strokeWidth={1.8}
            className="text-ink/40 group-hover:text-teal size-4 shrink-0 self-start transition-[color,transform] duration-300 ease-[var(--ease-brand)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </Link>
      </div>
    </aside>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   One brick of the wall
   ──────────────────────────────────────────────────────────────────────── */

function Tile({
  project,
  image,
  index,
  shape,
  category,
  line,
  label,
}: {
  project: Project;
  /** The picture to hang, which is not always the one on the record. */
  image: string;
  index: number;
  shape: string;
  category: string;
  line: string;
  label: string;
}) {
  const cased = Boolean(getProjectCase(project.slug));
  const href =
    V2_CASES[project.slug] ??
    (cased ? `/projects/${project.slug}` : portfolioProjectUrl(project.slug));

  const Tag = cased ? Link : "a";
  const opening = cased
    ? { transitionTypes: ["case-open"] }
    : { target: "_blank" as const, rel: "noreferrer noopener" };

  return (
    <Tag
      href={href}
      {...opening}
      style={
        {
          order: index,
          animationDelay: `${Math.min(index * 45, 450)}ms`,
        } as CSSProperties
      }
      className={cn(
        "group focus-visible:outline-gold relative block focus-visible:outline-2 focus-visible:-outline-offset-2",
        "motion-safe:[animation:eiden-tile-in_0.7s_var(--ease-brand)_both]",
      )}
    >
      <div
        className={cn(
          "bg-ink/5 relative w-full overflow-hidden rounded-4xl",
          shape,
        )}
      >
        <Image
          src={image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 1024px) 80vw, 75vw"
          quality={95}
          priority={index === 0}
          className="size-full object-cover transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.05] motion-reduce:transition-none"
        />

        <span
          aria-hidden
          className="from-ink/95 via-ink/25 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-500 ease-[var(--ease-brand)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100"
        />

        <span className="numeral text-canvas absolute top-3 left-3.5 text-[0.7rem] font-bold tracking-[0.14em] mix-blend-difference">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-brand)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none sm:p-5 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          <p className="font-label text-gold text-[0.62rem] font-bold tracking-[0.2em] uppercase">
            {category}
          </p>
          <h2 className="font-display text-canvas mt-2 text-[1.0625rem] leading-snug font-bold tracking-[-0.02em] sm:text-lg">
            {project.name}
          </h2>
          <p className="text-canvas/60 mt-1.5 line-clamp-2 max-w-md text-[0.875rem] leading-relaxed">
            {line}
          </p>
        </div>

        <span
          aria-hidden
          className="bg-canvas text-ink absolute right-4 bottom-4 flex size-9 scale-75 items-center justify-center rounded-full opacity-0 transition-[opacity,scale] duration-400 ease-[var(--ease-brand)] group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none"
          title={label}
        >
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      </div>
    </Tag>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   The filter   a dock, and the sheet it opens
   ──────────────────────────────────────────────────────────────────────── */

type Copy = {
  filterCta: string;
  filterTitle: string;
  filterClose: string;
};

function FilterDock({
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
  const opener = useRef<HTMLButtonElement>(null);

  const footerRevealed = useFooterRevealed();
  const stowed = open || footerRevealed;

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Left of the WhatsApp column rather than under it: both are pinned to
          the same corner, and the dock is the one that belongs to this page. */}
      <div className="pointer-events-none fixed right-[4.75rem] bottom-5 z-50 sm:right-[5.5rem] sm:bottom-8">
        <button
          ref={opener}
          type="button"
          onClick={() => setOpen(true)}
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
            {copy.filterCta}
          </span>
          {active === "all" ? (
            <SlidersHorizontal className="size-3.5" strokeWidth={2} aria-hidden />
          ) : (
            <span aria-hidden className="bg-gold size-2 rounded-full" />
          )}
        </button>
      </div>

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
        onClose={() => {
          close();
          opener.current?.focus();
        }}
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

  /* The sheet is built on the client and only there   it is portalled onto the
     body, which the server has no equivalent of. Held back until after the
     hydrating render rather than merely until `document` exists: the browser
     has a document on that first pass too, so testing for one would put a
     dialog in the client tree that the server never sent, and React would call
     the whole page a mismatch. */
  const hydrated = useHydrated();

  /* Escape closes, Tab stays inside. Same handling the case-study lightbox
     uses   the ring is read off the DOM each time rather than held anywhere. */
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

  /* The wall behind is held still, the smooth scroll included. */
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
      {/* The ground behind: near-black, blurred hard, and blurred harder still
          on a phone, where the wall is closer to the eye. The radius is the
          dearest thing in the sheet, so it is kept only as wide as it has to
          be to read as glass under 80% black. It is also the first thing
          anyone clicks to leave. */}
      <button
        type="button"
        tabIndex={-1}
        onClick={onClose}
        aria-label={copy.filterClose}
        className="absolute inset-0 cursor-default bg-black/90 backdrop-blur-[48px] md:bg-black/80 md:backdrop-blur-[32px]"
      />

      <div className="relative flex h-full items-center justify-center overflow-y-auto px-5 py-24 sm:px-10">
        <div className="w-full max-w-[56rem]">
          <p className="text-canvas/80 text-[0.9375rem]">{copy.filterTitle}</p>

          <ul className="mt-5 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {FILTERS.map((filter) => {
              const on = filter === active;

              return (
                <li key={filter}>
                  {/* No rule around the card. It is told from the ground by its
                      own lift alone, so eight of them read as one block of
                      tiles rather than as eight framed boxes. */}
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
                    <span className="bg-canvas/10 relative size-[5.375rem] shrink-0 overflow-hidden rounded-md">
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

      {/* The closer takes the dock own place, so the corner does one job. */}
      <button
        ref={closer}
        type="button"
        onClick={onClose}
        aria-label={copy.filterClose}
        className="bg-canvas/12 text-canvas hover:bg-canvas hover:text-ink absolute right-[4.75rem] bottom-5 flex size-11 items-center justify-center rounded-lg transition-colors duration-300 ease-[var(--ease-brand)] motion-reduce:transition-none sm:right-[5.5rem] sm:bottom-8"
      >
        <X className="size-4.5" strokeWidth={1.8} aria-hidden />
      </button>
    </div>,
    document.body,
  );
}
