"use client";

import { Band, useSay } from "@/components/solutions/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { solutionsCopy } from "@/lib/data/solutions";

/**
 * The argument, set as a list rather than a paragraph.
 *
 * Each line is its own row on a rule: the problem is that things are
 * scattered, so it is stated one scattered line at a time, and the answer
 * arrives as a single statement underneath.
 */
export function SolutionsIntro() {
  const say = useSay();
  const copy = solutionsCopy.intro;

  return (
    <Band>
      <RevealWords
        as="h2"
        text={say(copy.title)}
        className="text-ink block max-w-4xl text-[clamp(1.875rem,5vw,3.75rem)] uppercase"
      />

      <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
        <RevealGroup className="flex flex-col">
          {copy.problem.map((line) => (
            <p
              key={say(line)}
              className="border-ink/12 text-ink/55 border-b py-4 text-[clamp(1rem,1.5vw,1.25rem)] leading-snug first:border-t"
            >
              {say(line)}
            </p>
          ))}
        </RevealGroup>

        <div>
          <Reveal>
            <p className="font-display text-ink text-[clamp(1.375rem,2.6vw,2rem)] leading-tight font-extrabold tracking-[-0.03em]">
              {say(copy.turn)}
            </p>
          </Reveal>

          <RevealGroup className="mt-10 flex flex-col gap-4">
            {copy.answer.map((line) => (
              <p
                key={say(line)}
                className="text-teal flex items-baseline gap-4 text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug"
              >
                <span aria-hidden className="bg-teal/40 mt-2 h-px w-6 shrink-0" />
                {say(line)}
              </p>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Band>
  );
}
