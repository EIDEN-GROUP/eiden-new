"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState, type CSSProperties, type PointerEvent } from "react";
import { ContactBanner } from "@/components/sections/contact-banner";
import { ButtonLink } from "@/components/ui/button";
import { LogoMarquee } from "@/components/ui/marquee";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getProjectCase } from "@/lib/data/projects/index";
import {
  clientLogos,
  portfolioProjectUrl,
  projects,
  type ProjectCategory,
} from "@/lib/data/site";
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
];

const COLUMNS = [0, 1, 2].map((column) => ({
  seconds: [38, 30, 44][column],
  items: projects.filter((_, index) => index % 3 === column),
}));

function isWide(index: number) {
  return index >= 2 && (index - 2) % 5 === 0;
}

export function ClientsView() {
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

  return (
    <div data-nav-tone="light" className="bg-canvas text-forest">
      {/* ── The claim, with the work already showing beside it ────────── */}
      <section className="grain">
        <div className="container-eiden">
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
                  <ButtonLink href="/contact" variant="primary" size="lg">
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
        </div>

        <div className="container-eiden border-forest/12 border-y py-3">
          <LogoMarquee logos={clientLogos} tone="dark" speed={44} />
        </div>

        <div className="container-eiden pt-16 pb-24 sm:pt-20 sm:pb-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start lg:gap-10 xl:gap-12">
            <div className="lg:sticky lg:top-32">
              <div className="glass-light border-forest/12 bg-forest/[0.03] rounded-[1.75rem] border p-4">
                <ul className="flex flex-wrap gap-2.5">
                  {FILTERS.map((filter) => {
                    const on = filter === active;
                    return (
                      <li key={filter}>
                        <button
                          type="button"
                          onClick={() => setActive(filter)}
                          aria-pressed={on}
                          className={cn(
                            "font-label focus-visible:outline-teal inline-flex items-center gap-2 rounded-full px-5 py-3",
                            "text-[0.875rem] font-bold tracking-[0.05em] transition-colors duration-300 ease-[var(--ease-brand)]",
                            "focus-visible:outline-2 focus-visible:outline-offset-2",
                            on
                              ? "bg-forest text-canvas"
                              : "bg-forest/[0.05] text-forest/70 hover:bg-forest/10 hover:text-forest",
                          )}
                        >
                          {page.filters[filter]}
                          <span
                            className={cn(
                              "text-[0.78rem] tabular-nums",
                              on ? "text-canvas/50" : "text-forest/45",
                            )}
                          >
                            {counts[filter]}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <ButtonLink
                href="/contact"
                variant="primary"
                size="lg"
                className="mt-4 w-full"
              >
                {t.contact.cta}
              </ButtonLink>
            </div>

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
      </section>

      {/* ── The ground the work stands on ────────────────────────────── */}
      <section className="border-forest/12 border-t">
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
              <article
                key={sector.title}
                className="bg-forest/[0.04] hover:bg-forest/[0.07] p-8 transition-colors duration-500"
              >
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
      </section>

      <ContactBanner />
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

  /* A written case opens over this page rather than replacing it, so it goes
     through the router carrying the transition type the curtain listens for.
     A project we only host a screenshot of still leaves the site, and leaving
     the site is an ordinary link. */
  const Tag = external ? "a" : Link;
  const opening = external
    ? { target: "_blank" as const, rel: "noreferrer noopener" }
    : { transitionTypes: ["case-open"] };

  return (
    <Tag
      href={href}
      {...opening}
      onPointerMove={track}
      className={cn(
        "group focus-visible:outline-teal relative block focus-visible:outline-2 focus-visible:outline-offset-4",
        wide && "sm:col-span-2",
      )}
    >
      <div
        className={cn(
          "bg-forest/[0.04] relative overflow-hidden rounded-[1.25rem]",
          wide ? "aspect-4/3 sm:aspect-16/9" : "aspect-4/3",
        )}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes={
            wide
              ? "(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 62vw"
              : "(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 50vw"
          }
          className="size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.04] motion-reduce:transition-none"
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/100 to-transparent"
        />

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
