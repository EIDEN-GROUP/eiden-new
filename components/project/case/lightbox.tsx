"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import type { GalleryImage } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

/**
 * One picture from the wall, opened.
 *
 * The wall is texture   it drifts, it is not read. But a reader who sees
 * something in it wants to look at it properly, and until now there was no way
 * to. This is that way: the picture whole, on ink, with the set it came from
 * still reachable either side of it.
 *
 * The whole overlay is one dialog rather than a route, so nothing about the
 * case behind it moves or reloads: the reader closes it and is exactly where
 * they left off, in the same section, at the same scroll position.
 *
 * Everything a reader might try works   the arrows, the arrow keys, Escape,
 * and clicking the ground behind. The page underneath is locked while it is
 * open, because a lightbox that scrolls the page under itself is the most
 * common way this pattern goes wrong.
 */
export function CaseLightbox({
  items,
  index,
  onClose,
  onMove,
}: {
  items: GalleryImage[];
  /** Which picture is open. `null` closes the whole thing. */
  index: number | null;
  onClose: () => void;
  onMove: (next: number) => void;
}) {
  const say = useLocalized();
  const open = index !== null;
  const total = items.length;

  const step = useCallback(
    (by: number) => {
      if (index === null) return;
      onMove((index + by + total) % total);
    },
    [index, onMove, total],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    /* The page is held still underneath. Its scroll position is put back on
       the way out, because locking with `overflow: hidden` alone loses it on
       iOS. */
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, step]);

  if (index === null) return null;

  const item = items[index];
  const control =
    "pointer-events-auto flex size-12 items-center justify-center rounded-full border border-canvas/20 bg-ink/70 text-canvas backdrop-blur-md transition-colors duration-300 hover:bg-canvas hover:text-ink motion-reduce:transition-none";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={say({ fr: "Galerie", en: "Gallery" })}
      className="bg-ink/95 fixed inset-0 z-[120] flex flex-col backdrop-blur-sm motion-safe:[animation:eiden-fade_0.25s_ease-out_both]"
    >
      {/* The ground itself closes. It is the gesture everyone tries first. */}
      <button
        type="button"
        onClick={onClose}
        aria-label={say({ fr: "Fermer", en: "Close" })}
        className="absolute inset-0 cursor-zoom-out"
      />

      <div className="pointer-events-none relative z-10 flex items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <p className="font-label text-canvas/60 text-[0.78rem] font-bold tracking-[0.2em] tabular-nums">
          {String(index + 1).padStart(2, "0")}
          <span className="text-canvas/25"> / {String(total).padStart(2, "0")}</span>
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label={say({ fr: "Fermer", en: "Close" })}
          className={control}
        >
          <X className="size-5" strokeWidth={1.8} aria-hidden />
        </button>
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-8">
        <figure className="pointer-events-none relative h-full w-full">
          <Image
            key={item.image}
            src={item.image}
            alt={say(item.alt)}
            fill
            sizes="100vw"
            priority
            className="object-contain motion-safe:[animation:eiden-fade_0.3s_var(--ease-brand)_both]"
          />
        </figure>
      </div>

      <div className="pointer-events-none relative z-10 flex items-center justify-between gap-4 px-5 pb-6 sm:px-8 sm:pb-8">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={say({ fr: "Image précédente", en: "Previous image" })}
          className={control}
        >
          <ArrowLeft className="size-5" strokeWidth={1.8} aria-hidden />
        </button>

        <p
          className={cn(
            "text-canvas/55 min-w-0 flex-1 truncate text-center text-[0.875rem]",
          )}
        >
          {say(item.alt)}
        </p>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label={say({ fr: "Image suivante", en: "Next image" })}
          className={control}
        >
          <ArrowRight className="size-5" strokeWidth={1.8} aria-hidden />
        </button>
      </div>
    </div>
  );
}
