import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Extra content rendered under the lead (buttons, meta…). */
  children?: ReactNode;
};

/**
 * Eyebrow + title + lead, in the brand's five-voice type hierarchy.
 *
 * There is no tone to pick any more: every ground on the site is canvas or the
 * warm one, so the heading is always written for daylight.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal direction="none" duration={0.5}>
          <p
            className={cn(
              "eyebrow text-teal flex items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            <span aria-hidden className="h-px w-8 bg-current opacity-50" />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <h2 className="text-forest mt-5 text-[clamp(2rem,5vw,3.75rem)]">
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-forest/65 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
