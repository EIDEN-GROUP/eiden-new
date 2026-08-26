"use client";

import { Children, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A row of cards that becomes a swipeable track below `lg`.
 *
 * At that width there is room for one card, not a row of them, so the cards
 * are laid along a plain horizontal scroller instead of stacked down the page:
 * one full-width slot each, snapped, with the next card left a thumb proud of
 * the frame so the edge of it says there is another to come. The swipe, its
 * momentum, its scrollbar-free feel and its keyboard are the browser's own  
 * nothing here is driven by script.
 *
 * From `lg` the slots stop generating boxes and the cards fall straight into
 * whatever grid the caller put on the deck, untouched. `--n` and `--i` are
 * written at both widths: they say how many cards there are and which one this
 * is, which is what a caller's own scroll choreography reads to stage them.
 */
export function SwipeDeck({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      style={{ "--n": `${Children.count(children)}` } as CSSProperties}
      className={cn("swipe-deck", className)}
    >
      {Children.map(children, (child, index) => (
        <div className="swipe-slot" style={{ "--i": `${index}` } as CSSProperties}>
          {child}
        </div>
      ))}
    </div>
  );
}
