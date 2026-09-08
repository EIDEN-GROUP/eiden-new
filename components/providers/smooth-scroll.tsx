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

/** How many overlays are currently holding the page still. */
let locks = 0;

/**
 * Hold the page still while an overlay owns the screen.
 *
 * Two things scroll this site and both have to stop. `overflow: hidden` on the
 * body handles the browser; Lenis has to be told, because it drives the scroll
 * position itself and would go on running underneath a lightbox that only
 * clipped the page. The width the scrollbar gives back is paid to the body as
 * padding, so nothing behind the overlay moves while it is open.
 *
 * Counted rather than boolean, because three things cover this screen   the
 * intro, the menu and the lightbox   and they overlap: the menu opens over the
 * intro, a lightbox opens on a page the menu navigated to. Each of them used to
 * write `body.style.overflow` on its own, so whichever released first handed
 * scrolling back while another overlay was still up, and whichever released
 * last could leave `hidden` standing over a page with nothing on it. That last
 * case is a page that cannot be scrolled again until the tab is reloaded.
 *
 * So the body is clipped on the way up from zero and released on the way back
 * down to it, and the depth in between is nobody's business. Releases below
 * zero are ignored rather than trusted: an unbalanced caller should not be able
 * to unlock an overlay that is still open.
 */
export function setScrollLock(locked: boolean) {
  const { body } = document;

  if (locked) {
    if (++locks > 1) return;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    instance?.stop();
    return;
  }

  if (locks === 0 || --locks > 0) return;
  body.style.overflow = "";
  body.style.paddingRight = "";
  instance?.start();
}

/**
 * Snap to the top with no easing at all.
 *
 * Landing on a new page has to put the reader at the top of it, and Lenis is
 * the one thing that can stop that happening: it owns the scroll position, so a
 * bare `window.scrollTo` is overwritten on its next frame. Both are called   the
 * instance for the case where it is running, the window for the case where it
 * is not.
 *
 * The window call names its behaviour rather than inheriting it. `html` carries
 * `scroll-behavior: smooth`, so a bare `scrollTo` is an animation, and landing
 * on a case study ran that animation against the snap above it.
 */
export function jumpToTop() {
  instance?.scrollTo(0, { immediate: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}

/**
 * Lenis smooth scrolling, mounted once at the root.
 * Disabled entirely when the visitor prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) return;

    /* Smooth, but under the hand rather than ahead of it.

       This ran at 1.45s with a 0.85 wheel: every notch moved less than the
       browser would have, and then took a second and a half to settle. The
       easing is an expo-out, so almost all of the distance is covered early  
       what a long duration buys is tail, not glide. Just under a second keeps
       the landing soft and gives the wheel back to the visitor. */
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    instance = lenis;
    /* An overlay may already be open   a remount in development, or a lightbox
       that outlived the previous instance. Start where the page actually is. */
    if (locks > 0) lenis.stop();

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
