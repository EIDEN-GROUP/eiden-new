"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties,} from "react";
import { createPortal } from "react-dom";
import { setScrollLock } from "@/components/providers/smooth-scroll";
import { useLanguage } from "@/components/providers/language-provider";
import { ButtonLink } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { HeroVideo } from "@/components/ui/hero-video";
import { getProjectCase } from "@/lib/data/projects/index";
import { useFooterRevealed } from "@/lib/footer-reveal";
import { useHydrated } from "@/lib/hooks";
import { portfolioProjectUrl, projects, siteConfig, type ProjectCategory, } from "@/lib/data/site";
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
];

const SHOW_FILTERS = false;
const DELIVERED = "+20";
const ZOOM ="transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.05] motion-reduce:transition-none";
const HIDDEN = new Set<string>(["anisal", "madaef", "centre-accompagnement"]);
const LISTED = projects.filter((project) => !HIDDEN.has(project.slug));
// Three cards per screen: the big one is first on screens 1, 3, 5… and last on 2, 4…
const ORDER = [
  "lunja-village",
  "educazen-kids",
  "bopassage",

  "dmc-morocco",
  "mabrouk",
  "chillout-lounge",

  "medical-bay",
  "droguerie-souss",
];
const WALL: Project[] = [
  ...ORDER.flatMap((slug) => LISTED.filter((project) => project.slug === slug)),
  ...LISTED.filter((project) => !ORDER.includes(project.slug)),
];

const V2_CASES: Record<string, string> = {
  "lunja-village": "/lunja-village",
  bopassage: "/bopassage",
  "dmc-morocco": "/dmc-morocco",
  "educazen-kids": "/educazen-kids",
  "medical-bay": "/medical-bay",
  "droguerie-souss": "/droguerie-souss",
  anisal: "/anisal",
  madaef: "/madaef",
  "chillout-lounge": "/chillout-lounge",
  mabrouk: "/mabrouk",
  "centre-accompagnement": "/ca-challenge-academy",
};

const COVERS: Record<string, string> = {
  bopassage: "/work/bopassage/bopassage-cover.jpg",
};

const VIDEOS: Record<string, { src: string; poster: string }> = {
  "lunja-village": {
    src: "/work/lunja-village/lunja-web-1080p.mp4",
    poster: "/work/lunja-village/lunja-poster.jpg",
  },
  //  "bopassage": {
  //   src: "/work/bopassage/bo_passage_web_1080.mp4",
  //   poster: "/work/bopassage/bopassage-cover.jpg",
  // },
  "chillout-lounge": {
    src: "/work/chillout-lounge/chilloutt-web-1080p.mp4",
    poster: "/work/chillout-lounge/chillout-poster.jpg",
  },
};

const THUMBS = FILTERS.reduce(
  (thumbs, filter) => {
    const found =
      filter === "all"
        ? LISTED[0]
        : LISTED.find((project) => project.category === filter);
    thumbs[filter] = (found ?? LISTED[0]).image;
    return thumbs;
  },
  {} as Record<Filter, string>,
);

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

  const screens = useMemo(() => {
    const grouped: { project: Project; index: number }[][] = [];
    shown.forEach((project, index) => {
      if (index % 3 === 0) grouped.push([]);
      grouped[grouped.length - 1].push({ project, index });
    });
    return grouped;
  }, [shown]);

  return (
    <div data-nav-tone="light" className="bg-canvas text-ink">
      <div className="lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <Rail
          eyebrow={page.eyebrow}
          title={page.workTitle}
          lead={page.workLead}
          statLabel={page.statLabel}
          cta={t.common.bookCall}
        />

        <div className="min-w-0 p-1.5">
          {shown.length === 0 ? (
            <p className="text-ink/55 px-4 py-24 text-[0.9375rem]">{page.empty}</p>
          ) : (
            <div key={active} className="grid gap-1.5">
              {screens.map((screen, row) => (
                <div
                  key={row}
                  className={cn(
                    "grid grid-cols-1 gap-1.5 sm:grid-cols-2",
                    screen.length === 2
                      ? "sm:h-[calc((100svh-1.125rem)/2)] sm:grid-rows-1"
                      : "sm:h-[calc(100svh-0.75rem)] sm:grid-rows-2",
                  )}
                >
                  {screen.map(({ project, index }, slot) => (
                    <Tile
                      key={project.slug}
                      project={project}
                      index={index}
                      image={COVERS[project.slug] ?? project.image}
                      video={VIDEOS[project.slug]}
                      className={place(screen.length, row, slot)}
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

      {SHOW_FILTERS ? (
        <FilterDock
          active={active}
          counts={counts}
          labels={page.filters}
          copy={copy}
          onPick={setActive}
        />
      ) : null}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   The rail   everything the old page put in a hero, stood on its side
   ──────────────────────────────────────────────────────────────────────── */

function Rail({
  eyebrow,
  title,
  lead,
  statLabel,
  cta,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  statLabel: string;
  cta: string;
}) {
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
          <ButtonLink href={`https://wa.me/${siteConfig.phoneMa.replace(/\D/g, "")}`} variant="dark" size="md">
            {cta}
          </ButtonLink>

          <div className="border-ink/15 flex items-baseline gap-3 border-l pl-6">
            <span className="font-display text-ink text-[1.5rem] leading-none font-extrabold tracking-[-0.04em]">
              <CountUp value={DELIVERED} />
            </span>
            <span className="text-ink/50 text-[0.875rem]">{statLabel}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   One brick of the wall
   ──────────────────────────────────────────────────────────────────────── */

// On a phone the big card fills the screen and the others go two to a screen.
const WHOLE_SCREEN = "h-[calc(100svh-0.75rem)]";
const HALF_SCREEN = "h-[calc((100svh-1.125rem)/2)]";

function place(size: number, row: number, slot: number) {
  if (size === 1) return cn(WHOLE_SCREEN, "sm:col-span-2 sm:row-span-2");
  if (size === 2) return HALF_SCREEN;
  const left = row % 2 === 0;
  if (slot !== (left ? 0 : size - 1)) return HALF_SCREEN;
  return cn(
    WHOLE_SCREEN,
    "sm:row-start-1 sm:row-span-2",
    left ? "sm:col-start-1" : "sm:col-start-2",
  );
}

function Tile({
  project,
  image,
  video,
  index,
  className,
  category,
  line,
  label,
}: {
  project: Project;
  image: string;
  video?: { src: string; poster: string };
  index: number;
  className?: string;
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
          animationDelay: `${Math.min(index * 45, 450)}ms`,
        } as CSSProperties
      }
      className={cn(
        "group focus-visible:outline-gold relative block focus-visible:outline-2 focus-visible:-outline-offset-2 sm:h-auto",
        "motion-safe:[animation:eiden-tile-in_0.7s_var(--ease-brand)_both]",
        className,
      )}
    >
      <div className="bg-ink/5 relative size-full overflow-hidden rounded-xl">
        {video ? (
          <HeroVideo
            src={video.src}
            poster={video.poster}
            className={cn("absolute inset-0", ZOOM)}
          />
        ) : (
          <Image
            src={image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 1024px) 80vw, 75vw"
            quality={95}
            priority={index === 0}
            className={cn("size-full object-cover", ZOOM)}
          />
        )}

        <span aria-hidden className="from-ink/95 via-ink/25 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-500 ease-[var(--ease-brand)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100" />

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

        <span aria-hidden className="bg-canvas text-ink absolute right-4 bottom-4 flex size-9 scale-75 items-center justify-center rounded-full opacity-0 transition-[opacity,scale] duration-400 ease-[var(--ease-brand)] group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none" title={label}>
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      </div>
    </Tag>
  );
}


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
  const hydrated = useHydrated();

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
