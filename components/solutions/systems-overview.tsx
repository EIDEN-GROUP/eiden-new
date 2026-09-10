"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef } from "react";
import { BandLabel, useSay } from "@/components/solutions/shared";
import { SystemFeature } from "@/components/solutions/system-feature";
import { FixedBackdrop } from "@/components/ui/fixed-backdrop";
import { RevealWords } from "@/components/ui/reveal";
import { solutionCover, systemPanelTextures } from "@/lib/data/site";
import { solutionsCopy, systems } from "@/lib/data/solutions";

const PANEL_TONE = {
  ground: "#f4efe7",
  canvas: "#122620",
  ink: "#fefdfb",
  accent: "#0e7a73",
};

export function SystemsOverview() {
  const say = useSay();
  const copy = solutionsCopy.systems;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const panels = section.querySelectorAll<HTMLElement>("[data-system-panel]");

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const node = entry.target as HTMLElement;
        const { height } = node.getBoundingClientRect();
        node.style.setProperty("--panel-h", `${Math.round(height)}px`);
      }
    });

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="systemes" data-nav-tone="light" className="grain bg-ink text-canvas scroll-mt-24">
      <div className="relative z-2">
        <div
          data-nav-tone="dark"
          className="grain bg-forest text-canvas sticky top-0 z-0 flex min-h-svh flex-col"
        >
          <FixedBackdrop src={solutionCover} imageClassName="scale-110 blur-2xl" />

          <div className="container-eiden pt-20 sm:pt-28">
            <BandLabel number="01" tone="forest">
              {say(copy.eyebrow)}
            </BandLabel>
          </div>

          <div className="container-eiden flex flex-1 items-center justify-center py-16">
            <RevealWords as="h2" text={say(copy.title)} delay={0.06} className="text-canvas mx-auto block max-w-4xl text-center text-[clamp(1.75rem,5vw,3.75rem)] uppercase" />
          </div>
        </div>
        <div>
          {systems.map((system, index) => {
            const texture = systemPanelTextures[index % systemPanelTextures.length];
            return (
              <div key={system.slug} data-system-panel data-cursor="dark" className="relative isolate sticky top-[calc(100lvh-var(--panel-h,999vh))] min-h-svh lg:top-0 lg:flex lg:h-svh lg:min-h-0 lg:flex-col lg:justify-center lg:overflow-hidden">
                <FixedBackdrop src={texture} imageClassName="scale-110 object-cover object-center blur-xl" />
                <span aria-hidden className="bg-canvas/75 absolute inset-0 -z-10" />
                {/* <Image src={texture} alt="" fill sizes="100vw" className="-z-10 object-cover blur-2xl" /> */}

                <div className="container-eiden w-full py-16 lg:py-12">
                  <SystemFeature system={system} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
