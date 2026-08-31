"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * The live instance, held at module scope so chrome outside this tree can
 * hand a scroll to the same easing. `null` whenever Lenis is not running  
 * on the server, before mount, or when the visitor prefers reduced motion.
 */
let instance: Lenis | null = null;

/** Scroll back to the top of the page, riding Lenis when it is running. */
export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0);
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}

/**
 * Hold the page still while an overlay owns the screen.
 *
 * Two things scroll this site and both have to stop. `overflow: hidden` on the
 * body handles the browser; Lenis has to be told, because it drives the scroll
 * position itself and would go on running underneath a lightbox that only
 * clipped the page. The width the scrollbar gives back is paid to the body as
 * padding, so nothing behind the overlay moves while it is open.
 */
export function setScrollLock(locked: boolean) {
  const { body } = document;

  if (!locked) {
    body.style.overflow = "";
    body.style.paddingRight = "";
    instance?.start();
    return;
  }

  const gap = window.innerWidth - document.documentElement.clientWidth;
  body.style.overflow = "hidden";
  if (gap > 0) body.style.paddingRight = `${gap}px`;
  instance?.stop();
}

/**
 * Snap to the top with no easing at all.
 *
 * Landing on a new page has to put the reader at the top of it, and Lenis is
 * the one thing that can stop that happening: it owns the scroll position, so a
 * bare `window.scrollTo` is overwritten on its next frame. Both are called   the
 * instance for the case where it is running, the window for the case where it
 * is not.
 */
export function jumpToTop() {
  instance?.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
}

/**
 * Lenis smooth scrolling, mounted once at the root.
 * Disabled entirely when the visitor prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) return;

    /* Longer than a browser's own scroll, and shorter per gesture than one.
       The case studies are read rather than skimmed   a notch of the wheel
       should move the page by less than a screen and land softly, so a room
       arrives instead of snapping into place. */
    const lenis = new Lenis({
      duration: 1.45,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.35,
    });

    instance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Let in-page anchors ride the same easing.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      /* Far enough short of the target to clear the fixed header, unless the
         anchor says otherwise: a room in a case study is pinned to the very
         top of the frame and stopping short of it shows a seam. */
      const asked = Number(anchor.dataset.scrollOffset);
      lenis.scrollTo(target, {
        offset: Number.isFinite(asked) ? asked : -96,
      });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
