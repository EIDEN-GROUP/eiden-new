import type { SVGProps } from "react";

/**
 * The outbound marks.
 *
 * Drawn here rather than pulled from an icon set: the set this project uses
 * dropped its brand marks, and a logo redrawn at the wrong weight beside our
 * own type reads as a sticker. One stroke, one weight, the same square as the
 * rest of the interface   recognisable without pretending to be the official
 * asset.
 */
const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function LinkedInGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M7.5 10.6V17" />
      <path d="M11.6 17v-3.5a2.35 2.35 0 0 1 4.7 0V17" />
      <path d="M11.6 10.6V17" />
      <circle cx="7.5" cy="7.4" r="0.95" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M15.4 7.6h-1.2a2 2 0 0 0-2 2v8.8" />
      <path d="M9.9 12.4h4.7" />
    </svg>
  );
}

export function TikTokGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <circle cx="10.6" cy="14.4" r="2.7" />
      <path d="M13.3 14.4V7.3" />
      <path d="M13.3 7.3a3.5 3.5 0 0 0 3.4 3.1" />
    </svg>
  );
}
