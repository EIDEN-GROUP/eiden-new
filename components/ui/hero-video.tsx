"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The brand film, running full bleed behind the hero.
 *
 * The loop has no seam to hide at runtime: the file was cut so its closing
 * half-second dissolves into its own opening frame, which means a plain
 * `loop` returns to a picture it already matches. Doing it in the file rather
 * than by crossfading two players keeps one decode on the page   the part a
 * phone actually feels.
 *
 * Reduced motion gets the poster frame and nothing moving.
 */
export function HeroVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.pause();
    video.removeAttribute("autoplay");
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden
      tabIndex={-1}
      className={cn("size-full object-cover", className)}
    />
  );
}
