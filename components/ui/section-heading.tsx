import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type Tone = "dark" | "light";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
  /** Extra content rendered under the lead (buttons, meta…). */
  children?: ReactNode;
};

/** Eyebrow + title + lead, in the brand's five-voice type hierarchy. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  className,
  children,
}: SectionHeadingProps) {
  const onDark = tone === "light";

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
              "eyebrow flex items-center gap-3",
              align === "center" && "justify-center",
              onDark ? "text-gold" : "text-teal",
            )}
          >
            <span aria-hidden className="h-px w-8 bg-current opacity-50" />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-5 text-[clamp(2rem,5vw,3.75rem)]",
            onDark ? "text-canvas" : "text-forest",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-base leading-relaxed sm:text-lg",
              align === "center" && "mx-auto",
              onDark ? "text-canvas/65" : "text-forest/65",
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
