import { cn } from "@/lib/utils";

/** Trig output rounded so server and client markup match exactly. */
const round = (value: number) => Math.round(value * 1000) / 1000;

type GlyphName = "rings" | "orbit" | "quadrants" | "burst";

/**
 * Architectural line glyphs used as the right-hand marker of each service row.
 * Drawn rather than imported so they inherit `currentColor` on both surfaces.
 */
export function ServiceGlyph({
  name,
  className,
}: {
  name: GlyphName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={cn("size-full", className)}
    >
      {name === "rings" ? (
        <g stroke="currentColor" strokeWidth="1.1">
          <circle cx="32" cy="32" r="30" opacity="0.28" />
          <circle cx="32" cy="32" r="23" opacity="0.45" />
          <circle cx="32" cy="32" r="16" opacity="0.65" />
          <circle cx="32" cy="32" r="9" />
          <path d="M32 23v18" strokeWidth="1.6" />
        </g>
      ) : null}

      {name === "orbit" ? (
        <g fill="currentColor">
          {Array.from({ length: 9 }).map((_, index) => {
            const angle = (index / 9) * Math.PI * 2 - Math.PI / 2;
            return (
              <circle
                key={index}
                cx={round(32 + Math.cos(angle) * 22)}
                cy={round(32 + Math.sin(angle) * 22)}
                r={index % 3 === 0 ? 5.2 : 3.6}
                opacity={0.35 + (index % 3) * 0.22}
              />
            );
          })}
        </g>
      ) : null}

      {name === "quadrants" ? (
        <g fill="currentColor">
          <path d="M32 32V2A30 30 0 0 1 62 32Z" opacity="0.9" />
          <path d="M32 32h30a30 30 0 0 1-30 30Z" opacity="0.45" />
          <path d="M32 32v30A30 30 0 0 1 2 32Z" opacity="0.75" />
          <path d="M32 32H2A30 30 0 0 1 32 2Z" opacity="0.3" />
          <circle
            cx="32"
            cy="32"
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </g>
      ) : null}

      {name === "burst" ? (
        <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          {Array.from({ length: 28 }).map((_, index) => {
            const angle = (index / 28) * Math.PI * 2;
            const inner = 14;
            const outer = index % 2 === 0 ? 30 : 24;
            return (
              <line
                key={index}
                x1={round(32 + Math.cos(angle) * inner)}
                y1={round(32 + Math.sin(angle) * inner)}
                x2={round(32 + Math.cos(angle) * outer)}
                y2={round(32 + Math.sin(angle) * outer)}
                opacity={index % 2 === 0 ? 0.85 : 0.4}
              />
            );
          })}
        </g>
      ) : null}
    </svg>
  );
}

export const serviceGlyphs: GlyphName[] = ["rings", "orbit", "quadrants", "burst"];
