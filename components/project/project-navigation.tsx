"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel, useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import type { ProjectPage } from "@/lib/data/projects";

/**
 * 08 — Next projects.
 *
 * The way out of a case study should be into another one, so the page ends
 * on two of them rather than on a footer link. Two is the point: one would
 * read as a queue the visitor is being marched along, a pair reads as a
 * choice.
 *
 * With nothing to suggest — a single record, or a slug with no neighbours —
 * it falls back to the index rather than rendering an empty shelf.
 */
export function ProjectNavigation({ suggestions }: { suggestions: ProjectPage[] }) {
  const say = useLocalized();
  const { t } = useLanguage();

  if (suggestions.length === 0) {
    return (
      <section className="border-ink/12 border-t">
        <div className="container-eiden py-20 sm:py-28">
          <Reveal>
            <Link
              href="/clients"
              className="group text-ink hover:text-teal inline-flex items-center gap-5 transition-colors duration-300"
            >
              <span className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.03em] uppercase">
                {t.common.seeAllCases}
              </span>
              <ArrowRight
                className="size-7 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-2 motion-reduce:transition-none"
                strokeWidth={1.6}
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="container-eiden py-20 sm:py-28">
      <SectionLabel number="08">Next projects</SectionLabel>

      <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-6">
        {suggestions.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group focus-visible:outline-teal block focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <div className="bg-cream relative aspect-4/3 w-full overflow-hidden">
              <Image
                src={project.hero.image}
                alt={say(project.hero.alt)}
                fill
                sizes="(max-width: 640px) 92vw, 46vw"
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.04] motion-reduce:transition-none"
              />
            </div>

            <div className="mt-5 flex items-start justify-between gap-6">
              <div className="min-w-0">
                <p className="eyebrow text-ink/35">
                  {say(project.sector)}
                  <span className="mx-2 opacity-50">·</span>
                  <span className="tabular-nums">{project.year}</span>
                </p>
                <h3 className="font-display text-ink group-hover:text-teal mt-3 text-[clamp(1.5rem,3vw,2.25rem)] leading-none font-extrabold tracking-[-0.03em] uppercase transition-colors duration-300">
                  {project.client}
                </h3>
              </div>

              <span className="border-ink/20 text-ink group-hover:bg-ink group-hover:text-canvas mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
                <ArrowRight className="size-4" strokeWidth={1.8} aria-hidden />
                <span className="sr-only">{t.common.seeCase}</span>
              </span>
            </div>
          </Link>
        ))}
      </RevealGroup>
    </section>
  );
}
