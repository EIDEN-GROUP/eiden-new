"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal } from "@/components/ui/reveal";
import type { ProjectCase } from "@/lib/data/projects/types";

/**
 * 08 — Next project.
 *
 * One project, not a grid of them. A visitor who has read to the bottom of a
 * case has already chosen to keep going; offering them three more is offering
 * them a decision they did not ask for, and it is how a portfolio turns back
 * into an index.
 */
export function CaseNext({ project }: { project: ProjectCase }) {
  const say = useLocalized();

  return (
    <section className="bg-cream">
      <div className="container-eiden py-16 sm:py-20">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-ink/35">
            {say({ fr: "Projet suivant", en: "Next project" })}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <Link
            href={`/projects/${project.slug}`}
            className="group border-ink/12 hover:border-ink/30 mt-6 flex flex-col gap-6 border-t pt-6 transition-colors duration-500 ease-[var(--ease-brand)] sm:flex-row sm:items-center sm:gap-10"
          >
            <div className="bg-ink/5 relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-[1.2rem] sm:w-56 lg:w-72">
              <Image
                src={project.hero.image}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 40rem) 92vw, 18rem"
                className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105 motion-reduce:transition-none"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="eyebrow text-ink/35">{say(project.category)}</p>
              <h2 className="font-display text-ink group-hover:text-teal mt-3 text-[clamp(1.75rem,4.4vw,3rem)] leading-none font-extrabold tracking-[-0.04em] uppercase transition-colors duration-500 ease-[var(--ease-brand)]">
                {project.client}
              </h2>
            </div>

            <span className="border-ink/20 text-ink group-hover:bg-ink group-hover:text-canvas flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                strokeWidth={1.8}
                aria-hidden
              />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
