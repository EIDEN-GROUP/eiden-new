"use client";

import { ArrowDown } from "lucide-react";
import { FilmHero } from "@/components/layout/film-hero";
import { useSay } from "@/components/solutions/shared";
import { solutionsCopy } from "@/lib/data/solutions";

export function SolutionsHero() {
  const say = useSay();
  const copy = solutionsCopy.hero;

  return (
    <FilmHero
      eyebrow={say(copy.eyebrow)}
      titleLead={say(copy.titleLead)}
      titleAccent={say(copy.titleAccent)}
      titleTail={say(copy.titleTail)}
      lead={say(copy.lead)}
      image="/media/bg-1.jpeg"
      imageClassName="scale-110 object-cover object-center blur-[6px]"
    >
      <a href="#systemes" className="group glass-dark bg-canvas text-ink hover:bg-teal hover:text-canvas inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.9375rem] transition-colors duration-300">
        {say(copy.cta)}
        <ArrowDown
          className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-y-1 motion-reduce:transition-none"
          strokeWidth={1.8}
          aria-hidden
        />
      </a>
    </FilmHero>
  );
}
