"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import type { Localized } from "@/lib/data/localized";
import { cn } from "@/lib/utils";

/**
 * Reads a `Localized` in the visitor's language.
 *
 * Every section takes its content already localised through this, so none of
 * them has to know that a record carries two languages at once.
 */
export function useLocalized() {
  const { locale } = useLanguage();
  return (value: Localized) => value[locale];
}

/**
 * The rule every section on the page hangs from: a numbered label on the
 * left, a hairline running out to the margin. It is the only thing marking
 * one section off from the next   there are no boxes on this page.
 */
export function SectionLabel({
  number,
  children,
  className,
}: {
  number: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal direction="none" duration={0.5} className={className}>
      <div className="border-ink/15 flex items-baseline gap-4 border-t pt-5">
        <span className="eyebrow text-ink/35 tabular-nums">{number}</span>
        <span className="eyebrow text-ink">{children}</span>
      </div>
    </Reveal>
  );
}

/** The page's own measure   wide gutters, and never wider than the eye. */
export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container-eiden py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}
