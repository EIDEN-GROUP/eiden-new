"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Global Framer Motion configuration.
 *
 * The reduced-motion preference is only readable in the browser, so the server
 * snapshot is `false` and the real preference is applied immediately after
 * hydration. Markup stays identical on both sides while visitors who ask for
 * reduced motion still get transform animations dropped.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <MotionConfig
      reducedMotion={reduced ? "always" : "never"}
      transition={{ ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
