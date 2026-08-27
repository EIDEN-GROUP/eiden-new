"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { setFooterRevealed } from "@/lib/footer-reveal";

/** The routes that are read rather than browsed, and end on their own door. */
function isCase(pathname: string | null) {
  return Boolean(pathname?.startsWith("/projects/"));
}

/**
 * The one piece of furniture a case study does without.
 *
 * The header, the language and WhatsApp tags and the way back to the top all
 * stay: a case is still a page of this site and should be navigable like one.
 * The footer does not, because a case study already ends on a door   the switch
 * to the next project   and a sitemap underneath it would be asking the reader
 * to leave twice.
 *
 * The footer flag is cleared on the way in. It lives outside React so that
 * chrome can read it without being nested in the footer, which also means it
 * survives the footer unmounting: leave a page with the curtain up, open a
 * case, and the header would still think it was stowed.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bare = isCase(pathname);

  useEffect(() => {
    if (bare) setFooterRevealed(false);
  }, [bare]);

  if (bare) return null;

  return <>{children}</>;
}
