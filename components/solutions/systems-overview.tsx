"use client";

import { useEffect, useRef } from "react";
import { BandLabel, useSay } from "@/components/solutions/shared";
import { SystemFeature } from "@/components/solutions/system-feature";
import { RevealWords } from "@/components/ui/reveal";
import { solutionsCopy, systems } from "@/lib/data/solutions";

export function SystemsOverview() {
  const say = useSay();
  const copy = solutionsCopy.systems;
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const section = sectionRef.current;
    if (!bar || !section) return;

    const observer = new ResizeObserver(() => {
      const { height } = bar.getBoundingClientRect();
      section.style.setProperty("--systems-bar", `${Math.round(height)}px`);
    });

    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="systemes" data-nav-tone="dark" className="grain bg-forest-md text-canvas scroll-mt-24">
      <div className="relative z-2">
        <div className="container-eiden pt-20 sm:pt-28">
          <BandLabel number="01" tone="dark">
            {say(copy.eyebrow)}
          </BandLabel>
        </div>

        <div ref={barRef} className="bg-forest-md sticky top-0 z-30 pt-20 pb-6 sm:pt-28 sm:pb-10">
          <div className="container-eiden">
            <RevealWords as="h2" text={say(copy.title)} delay={0.06} className="text-canvas block text-center text-[clamp(1.75rem,5vw,3.75rem)] uppercase" />
          </div>
        </div>
        <div>
          {systems.map((system, index) => (
            <div key={system.slug} style={{ zIndex: index + 1 }} className="bg-forest-md lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:overflow-hidden lg:pt-[var(--systems-bar,14rem)]">
              <div className="container-eiden w-full py-16 lg:py-0">
                <SystemFeature system={system} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
