"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A picture pinned to the viewport, seen through the section it sits in.
 *
 * This is `background-attachment: fixed` — the image holds still while the
 * section slides over it, so scrolling wipes the band open like a window —
 * written as a transform instead, because Safari on iOS has never honoured
 * the fixed attachment and drops the effect on every phone. A layer exactly
 * one viewport tall is pushed back up by the section's own offset on each
 * frame, which lands it where the CSS would have, on every device.
 *
 * The loop ticks only while the band is near the screen, and not at all for
 * visitors who ask for reduced motion — they get the picture sitting still
 * inside the band.
 */
export function FixedBackdrop({
  src,
  /** Passed to `next/image`; the band is full-bleed by default. */
  sizes = "100vw",
  className,
}: {
  src: string;
  sizes?: string;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let painted = Number.NaN;

    // A frame loop rather than a scroll listener: Lenis, trackpad inertia and
    // iOS momentum all move the page without landing a `scroll` event on
    // every frame, and the lag reads as the picture sliding a beat late.
    const paint = () => {
      const { top } = frame.getBoundingClientRect();
      const offset = Math.round(top);
      if (offset !== painted) {
        painted = offset;
        layer.style.transform = `translate3d(0, ${-offset}px, 0)`;
      }
      raf = requestAnimationFrame(paint);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(paint);
          return;
        }
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
          painted = Number.NaN;
        }
      },
      // Start a frame early, so the first painted pixel is already in place.
      { rootMargin: "25% 0px" },
    );

    observer.observe(frame);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      aria-hidden
      className={cn("absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {/* `lvh` and not `dvh`: mobile chrome sliding in and out would otherwise
          resize the picture mid-scroll, which shows up as a shiver. */}
      <div
        ref={layerRef}
        className="absolute inset-x-0 top-0 h-lvh will-change-transform motion-reduce:h-full motion-reduce:will-change-auto"
      >
        <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
