"use client";

import { useSyncExternalStore } from "react";

/**
 * Whether the intro loader is out of the way, kept outside React.
 *
 * Chrome that has to wait for it   the WhatsApp tag's one-time peek   should
 * not have to know how the loader is timed, or whether it ran at all. Same
 * shape as the footer-reveal store.
 */

type Listener = () => void;

const listeners = new Set<Listener>();
let done = false;

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Called once the loader is gone   or once it is known it will never show. */
export function setIntroDone() {
  if (done) return;
  done = true;
  for (const listener of listeners) listener();
}

export function useIntroDone(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => done,
    () => false,
  );
}
