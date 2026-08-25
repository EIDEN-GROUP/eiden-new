"use client";

import { BeforeAfter } from "@/components/solutions/before-after";
import { Capabilities, LocalGlobal, Process } from "@/components/solutions/process";
import { SolutionsHero } from "@/components/solutions/solutions-hero";
import { SolutionsIntro } from "@/components/solutions/solutions-intro";
import { CustomSolution, SolutionsCTA } from "@/components/solutions/solutions-cta";
import { SystemsOverview } from "@/components/solutions/systems-overview";

export function SolutionsView() {
  return (
    <div className="bg-canvas text-ink">
      <SolutionsHero />
      <SolutionsIntro />
      <SystemsOverview />
      <BeforeAfter />
      <Process />
      <Capabilities />
      {/* <LocalGlobal /> */}
      {/* <CustomSolution /> */}
      <SolutionsCTA />
    </div>
  );
}
