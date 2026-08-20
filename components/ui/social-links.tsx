import type { ComponentType, SVGProps } from "react";
import { siteConfig } from "@/lib/data/site";

type Glyph = ComponentType<SVGProps<SVGSVGElement>>;

const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function LinkedInGlyph(props: SVGProps<SVGSVGElement>) {
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

function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** The outbound accounts, in the order they are shown site-wide. */
export const socialAccounts: {
  label: string;
  href: string;
  Icon: Glyph;
}[] = [
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    Icon: LinkedInGlyph,
  },
  {
    label: "Instagram",
    href: siteConfig.socials.instagram,
    Icon: InstagramGlyph,
  },
];
