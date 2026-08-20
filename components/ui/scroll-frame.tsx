"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useHydrated } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type ScrollFrameProps = {
  children: ReactNode;
  className?: string;
  /** Scale reached at both ends of the traversal. */
  min?: number;
};

/**
 * Scroll-linked "card zoom".
 *
 * A frame sits at full size while it owns the viewport and eases down to `min`
 * on the way in and on the way out, so consecutive full-bleed cards read as a
 * stack that hands over rather than a hard cut.
 *
 * Reduced-motion visitors get the same markup with a flat 1 → 1 ramp.
 *
 * The transform is only bound after mount: scroll progress reads 0 until the
 * element has been measured, so binding it during SSR would ship markup already
 * scaled to `min` and hydration would disagree with it.
 */
export function ScrollFrame({ children, className, min = 0.94 }: ScrollFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const measured = useHydrated();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 1],
    reduced ? [1, 1, 1, 1] : [min, 1, 1, min],
  );

  return (
    <motion.div
      ref={ref}
      style={measured ? { scale } : undefined}
      className={cn("origin-center will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
