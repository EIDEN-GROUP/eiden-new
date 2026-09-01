import type { ComponentType, SVGProps } from "react";
import { InstagramGlyph, LinkedInGlyph } from "@/components/ui/social-glyphs";
import { siteConfig } from "@/lib/data/site";

type Glyph = ComponentType<SVGProps<SVGSVGElement>>;

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
