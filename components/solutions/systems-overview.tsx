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

  /*
   * The pinned title stands over every panel that slides beneath it, so its
   * height is published as a custom property and each panel clears exactly
   * that much. Measured rather than guessed: the title wraps at some widths
   * and not at others. The fallback below is deliberately a little generous —
   * too much clearance costs a band of ground, too little puts the title over
   * the type.
   */
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
    <section
      ref={sectionRef}
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

        <div
          ref={barRef}
          className="bg-forest-md sticky top-0 z-30 pt-20 pb-6 sm:pt-28 sm:pb-10"
        >
          <div className="container-eiden">
            <RevealWords
              as="h2"
              text={say(copy.title)}
              delay={0.06}
              className="text-canvas block text-center text-[clamp(1.75rem,5vw,3.75rem)] uppercase"
            />
          </div>
        </div>

        {/* ── The systems, dealt one over the last ─────────────────────
            Each panel pins to the top of the screen and the next rides up and
            covers it, so a system is replaced rather than scrolled past. The
            whole stack is `sticky` plus a rising z-index — no scroll listener,
            nothing to re-render, and it holds its finished state without
            JavaScript.

            It is only asked for from `lg`, where a panel's three columns fit
            one screen. Below that the columns fall into a single tall run that
            passes any phone, and a panel taller than the viewport cannot be
            pinned without stranding its own bottom — so the panels drop back
            to ordinary flow, keeping every reveal and transition. */}
        <div>
          {systems.map((system, index) => (
            <div
              key={system.slug}
              style={{ zIndex: index + 1 }}
              className="bg-forest-md lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:overflow-hidden lg:pt-[var(--systems-bar,14rem)]"
            >
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
