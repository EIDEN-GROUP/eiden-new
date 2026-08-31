"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ChevronLeft } from "lucide-react";
import type { CSSProperties } from "react";
import { useLocalized } from "@/components/project/shared";
import { chapterCovers, chapterId } from "./chapter";
import { useHeldHero } from "./stack";
import type { Chapter, Localized, ProjectCase } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

const ENTER = "motion-safe:[animation:eiden-fade-in_0.9s_var(--ease-brand)_both]";
const stage = (seconds: number) =>
  ({ animationDelay: `${seconds}s` }) as CSSProperties;
const WORD_LEAD = 0.18;
const WORD_STEP = 0.075;


export function CaseHero({
  project,
  chapters,
}: {
  project: ProjectCase;
  chapters: Chapter[];
}) {
  const say = useLocalized();
  const ref = useHeldHero();
  const rail = [
    say(project.category),
    project.location ? say(project.location) : null,
    project.year,
  ]
    .filter(Boolean)
    .join(" · ");

  const words = project.client.split(" ").filter(Boolean);

  return (
    <section ref={ref} data-nav-tone="dark" className="bg-ink sticky isolate z-0 min-h-svh" >
      <div className="container-eiden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32">
        <Link
          href="/clients"
          transitionTypes={["case-close"]}
          className={cn(
            ENTER,
            "group text-canvas/55 hover:text-canvas font-label inline-flex items-center gap-1.5 text-[0.72rem] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] sm:text-[0.78rem]",
          )}
          style={stage(0.02)}
        >
          <ChevronLeft className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:-translate-x-0.5 motion-reduce:transition-none" strokeWidth={2} aria-hidden />
          {say({ fr: "Clients", en: "Clients" })}
          <span aria-hidden className="text-canvas/25 mx-1"> / </span>
          <span className="text-canvas/80">{project.client}</span>
        </Link>

        {/* ── The still, and the contents along its foot ──────────────── */}
        <div className="relative mt-5 overflow-hidden rounded-[1.25rem] sm:mt-6 sm:rounded-[1.75rem] lg:rounded-[2.25rem]">
          <div className="relative h-[46svh] min-h-[18rem] sm:h-[54svh] lg:h-[62svh]">
            <Image
              src={project.hero.image}
              alt={say(project.hero.alt)}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center motion-safe:[animation:eiden-film-settle_2.4s_var(--ease-brand)_both]"
            />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,15,12,0.72)_0%,rgba(10,15,12,0.12)_45%,rgba(10,15,12,0.28)_100%)]" />
          </div>

          <nav
            aria-label={say({ fr: "Sections du projet", en: "Case contents" })}
            className={cn(ENTER, "absolute inset-x-0 bottom-0 hidden lg:grid")}
            style={{
              ...stage(0.72),
              gridTemplateColumns: `repeat(${chapters.length}, minmax(0, 1fr))`,
            }}
          >
            {chapters.map((chapter) => (
              <Tab key={chapter.key} chapter={chapter} say={say} />
            ))}
          </nav>
        </div>

        {/* ── The name, and the line the project reduces to ───────────── */}
        <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
          <div>
            <p className={cn(ENTER, "eyebrow text-gold flex items-center gap-3")} style={stage(0.06)} >
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {rail}
            </p>

            <h1 className="text-canvas mt-5 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.96] font-extrabold tracking-[-0.05em]">
              {words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={cn(
                    "inline-block overflow-hidden pb-[0.12em] align-bottom",
                    index < words.length - 1 && "mr-[0.22em]",
                  )}
                >
                  <span className="inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]" style={stage(WORD_LEAD + index * WORD_STEP)} >
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <div>
            <p className={cn( ENTER, "text-balance-tight text-canvas text-[clamp(1.25rem,2.6vw,1.875rem)] leading-[1.18] font-medium", )} style={stage(0.5)} >
              {say(project.hero.statement)}
            </p>
            <p className={cn( ENTER, "text-canvas/50 mt-5 max-w-2xl text-[0.9375rem] leading-relaxed", )} style={stage(0.62)} >
              {say(project.hero.intro)}
            </p>
            <ul className={cn(ENTER, "mt-7 flex flex-wrap gap-2")} style={stage(0.74)} >
              {project.architecture.chain.map((item) => (
                <li key={say(item)} className="border-canvas/15 text-canvas/70 font-label rounded-full border px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.16em] uppercase sm:text-[0.75rem]">
                  {say(item)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tab({
  chapter,
  say,
}: {
  chapter: Chapter;
  say: (value: Localized) => string;
}) {
  const covers = chapterCovers(chapter).map(say);
  const shots = [
    ...(chapter.shots ?? []),
    ...(chapter.blocks ?? []).flatMap((block) => block.shots ?? []),
  ];
  const pieces = Array.from(new Set(shots.map((shot) => say(shot.label))));

  return (
    <a
      href={`#${chapterId(chapter.key)}`}
      data-scroll-offset="0"
      className={cn(
        "group/tab border-canvas/10 text-canvas relative flex items-center justify-between gap-4 border-l px-6 py-4 first:border-l-0",
        "bg-ink/70 hover:bg-ink/85 backdrop-blur-md transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
      )}
    >
      <span className="font-label truncate text-[0.82rem] font-bold tracking-[0.02em]">
        {covers.join(" · ")}
      </span>
      <ArrowUp
        className="size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-brand)] group-hover/tab:-translate-y-0.5 motion-reduce:transition-none"
        strokeWidth={1.8}
        aria-hidden
      />

      <span
        aria-hidden
        className={cn(
          "bg-ink/90 pointer-events-none absolute inset-x-0 bottom-full flex flex-col justify-end gap-4 p-6 backdrop-blur-md",
          "rounded-t-[1.25rem] opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
          "translate-y-6 group-hover/tab:translate-y-0 group-hover/tab:opacity-100",
        )}
      >
        <span className="text-canvas/45 block text-[0.8125rem]">
          {say({ fr: "Nous avons travaillé sur", en: "We worked on the" })}
        </span>
        <span className="font-display text-canvas block text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none font-extrabold tracking-[-0.04em]">
          {covers.join(" + ")}
        </span>
        {pieces.length ? (
          <span className="flex flex-wrap gap-2">
            {pieces.map((piece) => (
              <span
                key={piece}
                className="border-canvas/15 text-canvas/70 rounded-full border px-3.5 py-1.5 text-[0.78rem]"
              >
                {piece}
              </span>
            ))}
          </span>
        ) : null}
      </span>
    </a>
  );
}
