"use client";

import { memo, useEffect, useImperativeHandle, useRef, type ReactNode, type Ref } from "react";
import { PageFlip } from "page-flip";

export type BookHandle = { pageFlip: () => PageFlip | null };

// page-flip moves the sheets React rendered into its own wrapper. It is built once per
// mount and taken down a tick after unmount, so StrictMode's instant remount keeps it.
export const Book = memo(function Book({
  ref,
  settings,
  onFlip,
  children,
}: {
  ref?: Ref<BookHandle>;
  settings: Record<string, unknown>;
  onFlip: (page: number) => void;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const book = useRef<PageFlip | null>(null);
  const drop = useRef(0);
  const first = useRef({ settings, onFlip });

  useImperativeHandle(ref, () => ({ pageFlip: () => book.current }), []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    window.clearTimeout(drop.current);

    if (!book.current) {
      const flip = new PageFlip(el, first.current.settings);
      flip.loadFromHTML([...el.children] as HTMLElement[]);
      flip.on("flip", (e) => first.current.onFlip(e.data));
      book.current = flip;
    }

    const current = book.current;
    return () => {
      drop.current = window.setTimeout(() => {
        current.getUI().destroy();
        // Its animation loop never stops by itself.
        Object.assign(current.getRender(), { render: () => {} });
        book.current = null;
      });
    };
  }, []);

  return <div ref={root}>{children}</div>;
});
