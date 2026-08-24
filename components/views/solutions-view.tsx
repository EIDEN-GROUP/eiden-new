"use client";

import { BeforeAfter } from "@/components/solutions/before-after";
import { Capabilities, LocalGlobal, Process } from "@/components/solutions/process";
import { SolutionsHero } from "@/components/solutions/solutions-hero";
import { SolutionsIntro } from "@/components/solutions/solutions-intro";
import { CustomSolution, SolutionsCTA } from "@/components/solutions/solutions-cta";
import { SystemsOverview } from "@/components/solutions/systems-overview";

/**
 * Solutions.
 *
 * Claim → the problem with tools → the four systems → the shift they make →
 * how one gets built → what one can carry → where we build them → the one
 * we have not built yet → the close.
 *
 * The order is the argument, so it lives here; everything the page says
 * lives in `lib/data/solutions.ts`.
 */
export function SolutionsView() {
  return (
    <div className="bg-canvas text-ink">
      <SolutionsHero />
      <SolutionsIntro />
      <SystemsOverview />
      <BeforeAfter />
      <Process />
      <Capabilities />
      <LocalGlobal />
      <CustomSolution />
      <SolutionsCTA />
    </div>
  );
}
