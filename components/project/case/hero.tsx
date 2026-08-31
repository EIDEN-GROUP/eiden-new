"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import {
  HERO_WORD_LEAD,
  HERO_WORD_STEP,
  heroEnter as ENTER,
  heroStage as stage,
  useHeroDepart,
} from "@/components/layout/film-hero";
import type { ProjectCase } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

export function CaseHero({ project }: { project: ProjectCase }) {
  const say = useLocalized();
  const ref = useHeroDepart<HTMLElement>();
  const words = project.client.split(" ").filter(Boolean);
  const rail = [
    say(project.category),
    project.location ? say(project.location) : null,
    project.year,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section ref={ref} data-nav-tone="dark" className="hero-depart relative isolate flex min-h-[68svh] flex-col overflow-hidden bg-black sm:min-h-[74svh]">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden motion-safe:[animation:eiden-film-settle_2.4s_var(--ease-brand)_both]">
        <Image
          src={project.hero.image}
          alt={say(project.hero.alt)}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(10,15,12,1)_16%,rgba(10,15,12,0.90)_44%,rgba(10,15,12,0.80)_100%)]"/>

      <div className="container-eiden relative flex flex-1 flex-col pt-28 pb-10 sm:pt-20 sm:pb-10">
        <Link
          href="/clients"
          transitionTypes={["case-close"]}
          className={cn(
            ENTER,
            "group text-canvas/50 hover:text-canvas font-label inline-flex w-fit items-center gap-1.5 text-[0.72rem] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] sm:text-[0.78rem]",
          )}
          style={stage(0.02)}
        >
          <ChevronLeft
            className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:-translate-x-0.5 motion-reduce:transition-none"
            strokeWidth={2}
            aria-hidden
          />
          {say({ fr: "Tous les projets", en: "All projects" })}
        </Link>

        <div className="mt-10 pt-3">
          {/* ① Where the visitor is. */}
          <p className={cn(ENTER, "eyebrow text-gold flex items-center gap-3")} style={stage(0.06)}>
            <span aria-hidden className="h-px w-8 bg-current opacity-50" />
            {say({ fr: "Étude de cas", en: "Case study" })}
          </p>

          {/* ② WHO. */}
          <h1 className="text-balance-tight text-canvas mt-2 text-[clamp(2.75rem,8vw,6rem)] leading-[0.96] font-extrabold">
            {words.map((word, index) => {
              const rise = stage(HERO_WORD_LEAD + index * HERO_WORD_STEP);
              const last = index === words.length - 1;

              if (!last) {
                return (
                  <span key={`${word}-${index}`} className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom" >
                    <span className="inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]" style={rise} >
                      {word}
                    </span>
                  </span>
                );
              }

              return (
                <span key={`${word}-${index}`} className="relative inline-block">
                  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                    <span className="text-gold inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]" style={rise} >
                      {word}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="bg-gold/60 absolute bottom-[0.05em] left-0 h-[3px] w-full origin-left motion-safe:[animation:eiden-underline_0.9s_var(--ease-brand)_1.15s_both]"
                  />
                </span>
              );
            })}
          </h1>

          {/* ③ WHY. The reasoning, and it out-ranks the description under it. */}
          <p className={cn( ENTER, "editorial text-canvas mt-8 max-w-[34ch] text-[clamp(1.375rem,3vw,2.125rem)]", )} style={stage(0.5)}>
            {say(project.hero.statement)}
          </p>

          {/* ④ WHAT. One short paragraph, never two. */}
          <p className={cn( ENTER, "text-canvas/60 mt-6 max-w-[52ch] text-[0.9375rem] leading-relaxed sm:text-[1.0625rem]", )} style={stage(0.6)}>
            {say(project.hero.intro)}
          </p>

          {/* ⑤ SCOPE. What of the business was touched, before a single scroll. */}
          {/* <ul className={cn(ENTER, "mt-9 flex flex-wrap gap-2")} style={stage(0.7)}>
            {project.architecture.chain.map((item) => (
              <li key={say(item)} className="border-canvas/20 text-canvas/75 font-label rounded-full border px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.16em] uppercase sm:text-[0.75rem]">
                {say(item)}
              </li>
            ))}
          </ul> */}

          {/* ⑥ Metadata. */}
          <p className={cn( ENTER, "border-canvas/12 text-canvas/45 mt-9 border-t pt-5 text-[0.8125rem] tracking-[0.02em]", )} style={stage(0.78)}>
            {rail}
          </p>
        </div>
      </div>
    </section>
  );
}
