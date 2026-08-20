"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Browser-only values read through `useSyncExternalStore`.
 *
 * The server snapshot is the neutral default, so SSR and hydration agree; React
 * then re-renders with the real value. That avoids both hydration mismatches
 * and the cascading re-render of setting state inside an effect.
 */

const neverChanges = () => () => {};

/**
 * `false` on the server and through hydration, `true` from the first client
 * render onwards.
 *
 * Use it to hold back markup that can only be computed in the browser — the
 * server tree and the hydrating tree agree, and the browser value lands on the
 * re-render immediately after.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );
}

/** `true` when the media query currently matches. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** `true` once the page has scrolled past `threshold` pixels. */
export function useScrolledPast(threshold: number): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
