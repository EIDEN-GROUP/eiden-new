"use client";

import { useEffect, useRef } from "react";
import { BandLabel, useSay } from "@/components/solutions/shared";
import { SystemFeature } from "@/components/solutions/system-feature";
import { RevealWords } from "@/components/ui/reveal";
import { solutionsCopy, systems } from "@/lib/data/solutions";

/**
 * The four systems, held one at a time while the next travels over it.
 *
 * From `lg` a panel is exactly a window tall, so it is pinned at the top of
 * the frame and read whole while it waits there. Below that a panel stands
 * well over a window tall — the product carries a description, a mockup and
 * the list of what is inside it — and pinning its top would bury everything
 * past the first screenful.
 *
 * So the pin is set at the panel's own overhang instead: `top` is however far
 * the panel is taller than the window, as a negative number. The panel scrolls
 * through the window on its own, all of it, and only catches once its last
 * line has arrived; from there it holds while the next one climbs over it,
 * exactly as at width. Nothing is dropped to make it fit, and a panel that is
 * only a window tall lands back on `top: 0` of its own accord.
 *
 * Until the measurement lands the fallback is deliberately larger than any
 * panel, which parks the pin out of reach and leaves the section scrolling
 * plainly. Nothing is ever held over content that has not been read — that is
 * the right way to be wrong here, and it is also the no-script state.
 */
export function SystemsOverview() {
  const say = useSay();
  const copy = solutionsCopy.systems;
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const section = sectionRef.current;
    if (!bar || !section) return;

    const panels = section.querySelectorAll<HTMLElement>("[data-system-panel]");

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const node = entry.target as HTMLElement;
        const { height } = node.getBoundingClientRect();

        if (node === bar) {
          section.style.setProperty("--systems-bar", `${Math.round(height)}px`);
          continue;
        }

        /* How far this panel hangs below one window, which is what its own
           sticky offset is measured against. Writing it back on the panel
           cannot change the panel's size, so this settles in one pass. */
        node.style.setProperty("--panel-h", `${Math.round(height)}px`);
      }
    });

    observer.observe(bar);
    panels.forEach((panel) => observer.observe(panel));
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

        {/* Pinned only where the panels leave a gap for it. Below `lg` they
            are pinned to the foot of the frame instead and travel over each
            other through the whole height of the window, so a bar held at the
            top would sit on top of every one of them. */}
        <div ref={barRef} className="bg-forest-md z-30 pt-20 pb-6 sm:pt-28 sm:pb-10 lg:sticky lg:top-0">
          <div className="container-eiden">
            <RevealWords as="h2" text={say(copy.title)} delay={0.06} className="text-canvas block text-center text-[clamp(1.75rem,5vw,3.75rem)] uppercase" />
          </div>
        </div>
        <div>
          {systems.map((system, index) => (
            <div key={system.slug} data-system-panel style={{ zIndex: index + 1 }} className="bg-forest-md sticky top-[calc(100svh-var(--panel-h,200vh))] min-h-svh lg:top-0 lg:flex lg:h-svh lg:min-h-0 lg:flex-col lg:justify-center lg:overflow-hidden lg:pt-[var(--systems-bar,14rem)]">
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
