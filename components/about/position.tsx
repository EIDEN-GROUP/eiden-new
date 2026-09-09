"use client";

import { useRef } from "react";
import { useTravel } from "@/components/home2/motion";
import { RevealLines } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";


export function AboutPosition({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useTravel(sectionRef, { from: 0.72, to: 0.22, property: "--split" });

  return (
    <section ref={sectionRef} className="bg-canvas py-24 sm:py-32">
      <div className="container-eiden grid items-end gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
        <div className="split-part split-lead lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </div>

        <div className="split-part split-body">
          <RevealLines
            text={body}
            delay={0.06}
            step={0.3}
            className="editorial text-forest text-[clamp(1rem,2.4vw,1.5rem)] leading-snug"
            lineClassName="mt-4 first:mt-0"
          />
        </div>
      </div>
    </section>
  );
}
