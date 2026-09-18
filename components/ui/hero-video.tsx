"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
