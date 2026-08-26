"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import type { ProjectCase } from "@/lib/data/projects/types";

/**
 * Next projects.
 *
 * Two, side by side. One reads as an afterthought and six read as an index;
 * two is a choice, which is what someone who has reached the bottom of a case
 * is ready to make.
 */
export function CaseNext({ projects }: { projects: ProjectCase[] }) {
  const say = useLocalized();

  if (!projects.length) return null;

  return (
    <section className="bg-cream">
      <div className="container-eiden py-16 sm:py-20">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-ink/35">
            {say({ fr: "Projets suivants", en: "Next projects" })}
          </p>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-5">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group border-ink/12 hover:border-ink/30 flex flex-col border-t pt-5 transition-colors duration-500 ease-[var(--ease-brand)]"
            >
              <div className="bg-ink/5 relative aspect-16/10 w-full overflow-hidden rounded-[1.2rem]">
                <Image
                  src={project.hero.image}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 40rem) 92vw, 44vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>

              <div className="mt-5 flex items-end justify-between gap-5">
                <div className="min-w-0">
                  <p className="eyebrow text-ink/35">{say(project.category)}</p>
                  <h3 className="font-display text-ink group-hover:text-teal mt-2.5 text-[clamp(1.375rem,2.8vw,2rem)] leading-none font-extrabold tracking-[-0.04em] uppercase transition-colors duration-500 ease-[var(--ease-brand)]">
                    {project.client}
                  </h3>
                </div>

                <span className="border-ink/20 text-ink group-hover:bg-ink group-hover:text-canvas flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
                  <ArrowRight
                    className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
