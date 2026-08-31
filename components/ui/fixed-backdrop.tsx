"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function FixedBackdrop({
  src,
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
      { rootMargin: "25% 0px" },
    );

    observer.observe(frame);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={frameRef} aria-hidden className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      <div ref={layerRef} className="absolute inset-x-0 top-0 h-lvh will-change-transform motion-reduce:h-full motion-reduce:will-change-auto">
        <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
