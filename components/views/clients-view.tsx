"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState, type PointerEvent } from "react";
import { ContactBanner } from "@/components/sections/contact-banner";
import { ButtonLink } from "@/components/ui/button";
import { LogoMarquee } from "@/components/ui/marquee";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { clientLogos, portfolioProjectUrl, projects, type ProjectCategory,} from "@/lib/data/site";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "all";

const FILTERS: Filter[] = ["all", "web", "hospitality", "education", "health"];

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

  const mosaic = projects.slice(0, 4);

  return (
    <div data-nav-tone="dark" className="bg-ink text-canvas">
      {/* ── The claim, with the work already showing beside it ────────── */}
      <section className="grain">
        <div className="container-eiden pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
            <div>
              <Reveal direction="none" duration={0.5}>
                <p className="eyebrow text-gold flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-current opacity-50" />
                  {page.eyebrow}
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="text-canvas mt-7 max-w-2xl text-[clamp(2.25rem,5.4vw,4.25rem)]">
                  {page.workTitle}
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="text-canvas/60 mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                  {page.workLead}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                  <ButtonLink href="/contact" variant="gold" size="lg" dot>
                    {t.common.bookCall}
                  </ButtonLink>

                  <div className="border-canvas/15 flex items-baseline gap-3 border-l pl-8">
                    <span className="font-display text-canvas text-[1.75rem] leading-none font-extrabold tracking-[-0.04em]">
                      {projects.length}
                    </span>
                    <span className="text-canvas/50 text-[0.9375rem]">
                      {page.statLabel}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} direction="left" className="hidden lg:block">
              <div className="grid grid-cols-2 gap-3">
                {mosaic.map((project, index) => (
                  <div
                    key={project.slug}
                    className={cn(
                      "ring-canvas/10 relative overflow-hidden rounded-2xl ring-1",
                      index % 3 === 0 ? "aspect-4/5" : "aspect-4/3",
                      index === 1 && "mt-8",
                      index === 3 && "-mt-8",
                    )}
                  >
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="22vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="container-eiden border-canvas/10 border-y py-8">
          <LogoMarquee logos={clientLogos} tone="light" speed={44} />
        </div>

        <div className="container-eiden pt-16 pb-24 sm:pt-20 sm:pb-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:gap-12">
            <div className="lg:sticky lg:top-32">
              <div className="border-canvas/10 bg-canvas/[0.03] rounded-[1.75rem] border p-4">
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
                            "font-label focus-visible:outline-gold inline-flex items-center gap-2 rounded-full px-5 py-3",
                            "text-[0.875rem] font-bold tracking-[0.05em] transition-colors duration-300 ease-[var(--ease-brand)]",
                            "focus-visible:outline-2 focus-visible:outline-offset-2",
                            on
                              ? "bg-canvas text-ink"
                              : "bg-canvas/[0.06] text-canvas/70 hover:bg-canvas/12 hover:text-canvas",
                          )}
                        >
                          {page.filters[filter]}
                          <span
                            className={cn(
                              "text-[0.78rem] tabular-nums",
                              on ? "text-ink/45" : "text-canvas/35",
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

              <ButtonLink href="/contact" variant="gold" size="lg" className="mt-4 w-full">
                {t.contact.cta}
              </ButtonLink>
            </div>

            {shown.length === 0 ? (
              <p className="text-canvas/45 text-[0.9375rem]">{page.empty}</p>
            ) : (
              <RevealGroup key={active} className="grid gap-4 sm:grid-cols-2">
                {shown.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    href={portfolioProjectUrl(project.slug)}
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
      <section className="border-canvas/10 border-t">
        <div className="container-eiden py-24 sm:py-32">
          <Reveal direction="none" duration={0.5}>
            <p className="eyebrow text-gold flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {page.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-canvas mt-7 max-w-2xl text-[clamp(1.75rem,3.6vw,2.75rem)]">
              {page.sectorsTitle}
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3">
            {page.sectors.map((sector) => (
              <article
                key={sector.title} className="bg-canvas/[0.04] hover:bg-canvas/[0.08] p-8 transition-colors duration-500">
                <h3 className="font-display text-canvas text-lg font-bold tracking-[-0.02em]">
                  {sector.title}
                </h3>
                <p className="text-canvas/55 mt-3 text-[0.9375rem] leading-relaxed">
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

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onPointerMove={track}
      className={cn(
        "group focus-visible:outline-gold relative block focus-visible:outline-2 focus-visible:outline-offset-4",
        wide && "sm:col-span-2",
      )}
    >
      <div className={cn( "bg-canvas/[0.04] relative overflow-hidden rounded-[1.25rem]", wide ? "aspect-4/3 sm:aspect-16/9" : "aspect-4/3", )}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes={
            wide
              ? "(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 62vw"
              : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
          }
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.04] motion-reduce:transition-none"
        />

        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent"/>

        <p className="eyebrow text-canvas/80 absolute bottom-4 left-4 flex items-center gap-2">
          <span className="text-gold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden className="bg-canvas/30 h-3 w-px" />
          {category}
        </p>

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

      <h3 className="font-display text-canvas group-hover:text-gold mt-5 text-[1.0625rem] leading-snug font-bold tracking-[-0.02em] transition-colors duration-300 sm:text-lg">
        {name}
      </h3>
      <p className="text-canvas/50 mt-2 line-clamp-2 max-w-lg text-[0.9375rem] leading-relaxed">
        {line}
      </p>
    </a>
  );
}
