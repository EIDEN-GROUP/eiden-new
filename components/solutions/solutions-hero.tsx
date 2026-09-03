"use client";

import { ArrowDown } from "lucide-react";
import { FilmHero } from "@/components/layout/film-hero";
import { useSay } from "@/components/solutions/shared";
import { solutionsCopy } from "@/lib/data/solutions";

/**
 * The masthead, on the same still frame as the about page: the picture settles
 * over 2.4s, the eyebrow fades in, the title rises a word at a time with the
 * accented one ruled in gold, and the whole frame steps back as the page is
 * scrolled off it.
 *
 * Only the still differs   a lit architectural model rather than the company
 * portrait, so the two pages open on the same gesture without opening on the
 * same picture. The one way down is kept: this page's argument is the systems
 * under the fold.
 */
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
      image="/media/architecture-1.jpg"
      imageClassName="scale-110 object-cover object-center opacity-40 blur-[6px]"
    >
      <a
        href="#systemes"
        className="group bg-ink text-canvas hover:bg-teal inline-flex h-9 items-center gap-2 rounded-full px-6 text-[0.9375rem] transition-colors duration-300"
      >
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
