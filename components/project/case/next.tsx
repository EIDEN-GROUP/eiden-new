"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import type { ProjectCase } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

/**
 * The door the case ends on   two of them.
 *
 * One suggestion is a corridor: the reader either takes the project they are
 * handed or leaves. Two is a choice, which is the difference between being
 * moved on and being invited to carry on, and it is also the first moment in
 * the case where the portfolio stops being about one business and starts
 * reading as a practice with a range.
 *
 * Never more than two. A row of thumbnails at the end of a case study is a
 * related-posts widget, and it undoes the argument the case just spent seven
 * sections making.
 */
export function CaseNext({ next }: { next: ProjectCase[] }) {
  const say = useLocalized();
  const router = useRouter();

  useEffect(() => {
    for (const project of next) router.prefetch(`/projects/${project.slug}`);
  }, [router, next]);

  if (!next.length) return null;

  return (
    <section data-nav-tone="light" className="bg-canvas">
      {/* The writing stays on the measure, where the rest of the case was read.
          Only the doors are let out to the edges, and the way back to all the
          work comes up here beside the label rather than sitting under them:
          nothing is allowed below the doors, because the doors are the end of
          the page. */}
      <div className="container-eiden pb-5 sm:pb-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
          <Reveal direction="none" duration={0.5} amount={0.3}>
            <p className="eyebrow text-teal flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {say({ fr: "Transformations suivantes", en: "Next transformations" })}
            </p>
          </Reveal>

          <Reveal delay={0.1} amount={0.3}>
            <Link
              href="/clients"
              transitionTypes={["case-close"]}
              className="text-ink/45 hover:text-ink font-label inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] sm:text-[0.78rem]"
            >
              {say({ fr: "Tous les projets", en: "All projects" })}
              <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Edge to edge and flush to the foot of the page. A case study is the
          one route the site drops its footer on, so there is nothing under
          these: they are the last thing the reader is given, and a margin
          around them would leave the page trailing off instead of closing. */}
      <RevealGroup
        amount={0.12}
        className={cn("grid gap-px", next.length > 1 && "lg:grid-cols-2")}
      >
        {next.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            transitionTypes={["case-next"]}
            aria-label={`${project.client}   ${say(project.category)}`}
            /* The focus ring is drawn inside the door rather than around it:
                 at the edge of the window an outward ring is half off-screen. */
            className="group focus-visible:outline-teal relative block overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-4"
          >
            <div
              className={cn(
                "bg-ink/[0.05] relative",
                next.length > 1
                  ? "h-[42svh] min-h-[17rem] lg:h-[52svh]"
                  : "h-[52svh] min-h-[20rem] lg:h-[62svh]",
              )}
            >
              <Image
                src={project.hero.image}
                alt=""
                aria-hidden
                fill
                sizes={next.length > 1 ? "(max-width: 64rem) 100vw, 50vw" : "100vw"}
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-brand)] group-hover:scale-[1.04] motion-reduce:transition-none"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 sm:p-8">
              <div className="min-w-0">
                <h2
                  className={cn(
                    "font-display text-canvas leading-[0.95] font-extrabold tracking-[-0.05em] text-balance",
                    "transition-transform duration-700 ease-[var(--ease-brand)] group-hover:translate-x-1 motion-reduce:transition-none",
                    next.length > 1
                      ? "text-[clamp(1.75rem,4vw,3rem)]"
                      : "text-[clamp(2rem,6vw,4.5rem)]",
                  )}
                >
                  {project.client}
                </h2>
                <p className="text-canvas/60 mt-2.5 text-[0.9375rem]">
                  {say(project.category)}
                </p>
              </div>

              <span
                aria-hidden
                className="border-canvas/25 text-canvas group-hover:bg-canvas group-hover:text-ink flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
              >
                <ArrowUpRight className="size-5" strokeWidth={1.8} />
              </span>
            </div>
          </Link>
        ))}
      </RevealGroup>
    </section>
  );
}

