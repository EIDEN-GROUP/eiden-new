"use client";

import { BeforeAfter } from "@/components/solutions/before-after";
import { Capabilities, LocalGlobal, Process } from "@/components/solutions/process";
import { SolutionsHero } from "@/components/solutions/solutions-hero";
import { SolutionsIntro } from "@/components/solutions/solutions-intro";
import { CustomSolution, SolutionsCTA } from "@/components/solutions/solutions-cta";
import { SystemsOverview } from "@/components/solutions/systems-overview";
import { solutionbg, solutionTexture } from "@/lib/data/site";
import { FixedBackdrop } from "../ui/fixed-backdrop";

export function SolutionsView() {
  return (
    <div className="bg-canvas text-ink">
      <SolutionsHero />
      <SolutionsIntro />
      <SystemsOverview />
      {/* <BeforeAfter /> */}
      <div className="relative isolate">
        <FixedBackdrop src={solutionbg} imageClassName="scale-110 object-cover object-center blur-md" />
        <span aria-hidden className="bg-canvas/95 absolute inset-0 -z-10" />
        <Process />
        <Capabilities />
      </div>
      {/* <LocalGlobal /> */}
      {/* <CustomSolution /> */}
      
      <div className="relative isolate">
        <FixedBackdrop
          src={solutionTexture}
          imageClassName="scale-110 object-cover object-center blur-md"
        />
        <span aria-hidden className="bg-ink/55 absolute inset-0 -z-10" />
        <SolutionsCTA />
      </div>
    </div>
  );
}
