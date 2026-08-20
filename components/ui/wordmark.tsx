import { cn } from "@/lib/utils";

/** Native proportions of the traced EIDEN wordmark. */
const RATIO = 500 / 194;

type WordmarkProps = {
  className?: string;
  /** Rendered as an accessible label; omit for decorative instances. */
  label?: string;
};

/**
 * The EIDEN GROUP wordmark, drawn as a CSS mask over `currentColor`.
 *
 * Masking (rather than an `<img>`) keeps the mark crisp at any size and lets it
 * inherit the surrounding text colour — forest on light surfaces, canvas on dark
 * ones — without shipping a second asset.
 */
export function Wordmark({ className, label }: WordmarkProps) {
  return (
    <span
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("block h-8 w-auto bg-current", className)}
      style={{
        aspectRatio: RATIO,
        WebkitMaskImage: "url(/brand/eiden-wordmark.svg)",
        maskImage: "url(/brand/eiden-wordmark.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
