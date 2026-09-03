"use client";

import { CaseShowcase, type ShowcaseCase } from "@/components/ui/case-showcase";
import { useLanguage } from "@/components/providers/language-provider";
import { caseStudies, proofTexture } from "@/lib/data/site";

export function Proof() {
  const { t } = useLanguage();

  const showcase: ShowcaseCase[] = t.proof.cases
    .map((entry): ShowcaseCase | null => {
      const record = caseStudies.find((item) => item.slug === entry.slug);
      if (!record) return null;
      return {
        slug: entry.slug,
        client: record.client,
        title: entry.title,
        text: entry.text,
        tags: entry.tags,
        image: record.image,
        imageAlt: record.imageAlt,
        href: `/clients#${entry.slug}`,
        quote: entry.quote,
        author: entry.author,
      };
    })
    .filter((entry): entry is ShowcaseCase => entry !== null);

  return (
    <div id="preuves">
      <CaseShowcase
        cases={showcase}
        intro={{
          eyebrow: t.proof.eyebrow,
          title: t.proof.title,
          text: t.proof.text,
          cue: t.hero.scroll,
          texture: proofTexture,
        }}
        outro={{
          eyebrow: t.proof.outro.eyebrow,
          blocks: [
            {
              title: t.proof.outro.projectsTitle,
              text: t.proof.outro.projectsText,
              cta: t.proof.ctaPortfolio,
              href: "/clients",
            },
            {
              title: t.proof.outro.solutionsTitle,
              text: t.proof.outro.solutionsText,
              cta: t.proof.ctaSolutions,
              href: "/nos-solutions",
            },
          ],
        }}
        label={t.hero.featured.badge}
        cta={t.common.seeCase}
      />
    </div>
  );
}
