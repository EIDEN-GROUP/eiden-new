"use client";

import { useSyncExternalStore } from "react";

/**
 * Whether the footer curtain has been scrolled into view, kept outside React.
 *
 * `SiteFooter` owns the observer, but chrome that lives beside it   the
 * floating language badge, for one   has to react to the same flag without
 * being nested inside the footer. Same shape as the locale store.
 */

type Listener = () => void;

const listeners = new Set<Listener>();
let revealed = false;

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setFooterRevealed(next: boolean) {
  if (revealed === next) return;
  revealed = next;
  for (const listener of listeners) listener();
}

/** `true` once the panel behind the page is showing. `false` through SSR. */
export function useFooterRevealed(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => revealed,
    () => false,
  );
}
