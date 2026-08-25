"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { useSay } from "@/components/solutions/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { solutionsCopy } from "@/lib/data/solutions";

export function BeforeAfter() {
  const say = useSay();
  const copy = solutionsCopy.shift;

  return (
    <section data-nav-tone="dark" className="grain bg-ink text-canvas">
      <div className="container-eiden py-20">
        <RevealWords
          as="h2"
          text={say(copy.title)}
          className="text-canvas block max-w-4xl text-[clamp(1.875rem,5vw,3.75rem)] uppercase"
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-12">
          <div>
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow text-canvas/30">{say(copy.beforeLabel)}</p>
            </Reveal>

            <RevealGroup className="mt-6 flex flex-col gap-3">
              {copy.before.map((line, index) => (
                <p
                  key={say(line)}
                  style={{ marginLeft: `${(index % 3) * 1.25}rem` }}
                  className="border-canvas/12 text-canvas/45 w-fit rounded-full border px-5 py-2.5 text-[0.9375rem] line-through decoration-1"
                >
                  {say(line)}
                </p>
              ))}
            </RevealGroup>
          </div>

          {/* The turn. Down the page on a phone, across it on a wide screen. */}
          <Reveal
            direction="none"
            duration={0.5}
            className="flex justify-center lg:self-center"
          >
            <span className="border-canvas/20 text-gold flex size-12 items-center justify-center rounded-full border">
              <ArrowDown
                className="size-5 lg:hidden"
                strokeWidth={1.6}
                aria-hidden
              />
              <ArrowRight
                className="hidden size-5 lg:block"
                strokeWidth={1.6}
                aria-hidden
              />
            </span>
          </Reveal>

          <div>
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow text-gold">{say(copy.afterLabel)}</p>
            </Reveal>

            <RevealGroup className="mt-6 flex flex-col">
              {copy.after.map((line) => (
                <p
                  key={say(line)}
                  className="border-canvas/12 text-canvas border-b py-4 text-[clamp(1rem,1.5vw,1.25rem)] first:border-t"
                >
                  {say(line)}
                </p>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
