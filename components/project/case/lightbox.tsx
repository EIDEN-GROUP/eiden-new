"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { setScrollLock } from "@/components/providers/smooth-scroll";
import type { GalleryImage } from "@/lib/data/projects/types";

/**
 * One picture from the gallery, opened.
 *
 * The grid is texture   it is scanned, not read. A reader who sees something in
 * it wants to look at it properly, and this is where that happens: the picture
 * whole, on ink, with the set it came from still reachable either side of it.
 *
 * It is portalled onto the body rather than left where it was called from. A
 * case study is a stack of sections that deliberately overlap by z-index, and
 * inside that stack no overlay can win   the section after this one is drawn
 * over it whatever number it is given. On the body it is simply above the page,
 * header included.
 *
 * Everything a reader might try works: the arrows, the arrow keys, Escape, a
 * swipe, and clicking the ground behind. The page underneath is held still
 * while it is open, the smooth scroll included, because a lightbox that scrolls
 * the page under itself is the most common way this pattern goes wrong.
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

  const dialog = useRef<HTMLDivElement>(null);
  const closer = useRef<HTMLButtonElement>(null);
  /* A swipe ends on the ground, which closes. The flag lets that click through
     only when the finger did not travel. */
  const swipe = useRef({ x: 0, y: 0, moved: false });

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
      if (event.key === "Escape") return onClose();
      if (event.key === "ArrowRight") return step(1);
      if (event.key === "ArrowLeft") return step(-1);
      if (event.key !== "Tab") return;

      /* Tab is kept inside the dialog. Four controls at most, so the ring is
         read off the DOM each time rather than held anywhere. */
      const stops = dialog.current?.querySelectorAll<HTMLElement>(
        "button:not([tabindex='-1'])",
      );
      if (!stops?.length) return;
      const first = stops[0];
      const last = stops[stops.length - 1];
      const on = document.activeElement;

      if (event.shiftKey && (on === first || !dialog.current?.contains(on))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && on === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    setScrollLock(true);

    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLock(false);
    };
  }, [open, onClose, step]);

  /* Opening moves the focus in, closing puts it back where it was. Stepping
     between pictures leaves it alone. */
  useEffect(() => {
    if (!open) return;
    const before = document.activeElement as HTMLElement | null;
    closer.current?.focus();
    return () => before?.focus?.();
  }, [open]);

  /* Nothing is rendered until a picture is opened, and a picture can only be
     opened by a click   so by the time there is anything to portal, there is a
     document to portal it into, and the server and the client still agree on
     the first render. */
  if (index === null || typeof document === "undefined") return null;

  const item = items[index];

  const control =
    "pointer-events-auto flex items-center justify-center rounded-full border border-canvas/25 bg-ink/70 text-canvas shadow-[0_8px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors duration-300 ease-[var(--ease-brand)] hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas motion-reduce:transition-none";

  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={say({ fr: "Galerie", en: "Gallery" })}
      className="bg-ink/95 fixed inset-0 z-[120] overscroll-contain backdrop-blur-sm motion-safe:[animation:eiden-fade_0.25s_ease-out_both]"
      onTouchStart={(event) => {
        const touch = event.changedTouches[0];
        swipe.current = { x: touch.clientX, y: touch.clientY, moved: false };
      }}
      onTouchEnd={(event) => {
        const touch = event.changedTouches[0];
        const dx = touch.clientX - swipe.current.x;
        const dy = touch.clientY - swipe.current.y;
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
        swipe.current.moved = true;
        step(dx < 0 ? 1 : -1);
      }}
    >
      {/* The ground itself closes. It is the gesture everyone tries first. */}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => {
          if (swipe.current.moved) {
            swipe.current.moved = false;
            return;
          }
          onClose();
        }}
        aria-label={say({ fr: "Fermer", en: "Close" })}
        className="absolute inset-0 cursor-zoom-out"
      />

      {/* The picture, inside margins that leave the chrome its room. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 pt-20 pb-24 sm:px-24 sm:pt-24 lg:px-32">
        <figure className="relative h-full w-full">
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

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 px-4 py-4 sm:px-6 sm:py-6">
        <p className="font-label text-canvas/60 pt-3 text-[0.78rem] font-bold tracking-[0.2em] tabular-nums">
          {String(index + 1).padStart(2, "0")}
          <span className="text-canvas/30">
            {" "}
            / {String(total).padStart(2, "0")}
          </span>
        </p>

        <button
          ref={closer}
          type="button"
          onClick={onClose}
          aria-label={say({ fr: "Fermer", en: "Close" })}
          className={`${control} size-11 sm:size-12`}
        >
          <X className="size-5" strokeWidth={1.8} aria-hidden />
        </button>
      </div>

      {/* The arrows sit against the edges, clear of the picture at every width
          rather than only where there happens to be room. */}
      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={say({ fr: "Image précédente", en: "Previous image" })}
            className={`${control} absolute top-1/2 left-3 z-10 size-11 -translate-y-1/2 sm:left-6 sm:size-14`}
          >
            <ChevronLeft className="size-6" strokeWidth={1.6} aria-hidden />
          </button>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label={say({ fr: "Image suivante", en: "Next image" })}
            className={`${control} absolute top-1/2 right-3 z-10 size-11 -translate-y-1/2 sm:right-6 sm:size-14`}
          >
            <ChevronRight className="size-6" strokeWidth={1.6} aria-hidden />
          </button>
        </>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-6 sm:pb-8">
        <p className="text-canvas/55 mx-auto max-w-2xl truncate text-center text-[0.8125rem] sm:text-[0.875rem]">
          {say(item.alt)}
        </p>
      </div>
    </div>,
    document.body,
  );
}
