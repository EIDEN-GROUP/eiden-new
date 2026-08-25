"use client";

import { BandLabel, useSay } from "@/components/solutions/shared";
import { SystemFeature } from "@/components/solutions/system-feature";
import { RevealWords } from "@/components/ui/reveal";
import { solutionsCopy, systems } from "@/lib/data/solutions";

export function SystemsOverview() {
  const say = useSay();
  const copy = solutionsCopy.systems;

  return (
    <section
      id="systemes"
      data-nav-tone="dark"
      className="grain bg-forest-md text-canvas scroll-mt-24"
    >
      <div className="relative z-2">
        <div className="container-eiden pt-20 sm:pt-28">
          <BandLabel number="01" tone="dark">
            {say(copy.eyebrow)}
          </BandLabel>
        </div>

        {/* The top padding is what clears the fixed site header; it is kept as
            tight as that allows, because a bar pinned for the length of this
            run is screen a phone does not get back. */}
        <div className="bg-forest-md sticky top-0 z-3 pt-20 pb-6 sm:pt-28 sm:pb-10">
          <div className="container-eiden">
            <RevealWords
              as="h2"
              text={say(copy.title)}
              delay={0.06}
              className="text-canvas block text-center text-[clamp(1.75rem,5vw,3.75rem)] uppercase"
            />
          </div>

          {/* Carries the last of the ground past the bar's edge, so art slides
              away into the colour instead of snapping off a hard line.
              `from-*` needs its direction and stop or the box paints nothing. */}
          {/* <span
            aria-hidden
            className="from-forest-md pointer-events-none absolute inset-x-0 top-full h-14 bg-gradient-to-b to-transparent"
          /> */}
        </div>

        <div className="container-eiden flex flex-col gap-24 pb-24 sm:gap-28 sm:pb-32">
          {systems.map((system) => (
            <SystemFeature key={system.slug} system={system} />
          ))}
        </div>
      </div>
    </section>
  );
}
