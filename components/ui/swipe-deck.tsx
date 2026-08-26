"use client";

import {
  Children,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** The lean each card keeps in the pile, cycled down the deck. */
const TILT = [2.5, -3.5, 2, -3];

/**
 * A pile of cards, dealt one at a time by a sideways swipe.
 *
 * Below `lg` there is room for one card, not a row of them, so the cards are
 * gathered into a deck instead of stacked down the page: the one in hand sits
 * in front, the rest lean out behind it far enough to say there is more to
 * come. The track underneath is a real scroller — one full-width slot per
 * card, snapped — so the swipe is the browser's own, with its momentum, its
 * scrollbar-free feel and its keyboard; this only reads `--deck-p`, the scroll
 * position measured in slots, back out of it and hands it to the CSS.
 *
 * The cards never leave their slots. They are placed with `translate`,
 * `rotate` and `scale`, which compose on top of whatever `transform` a card
 * already carries for its own entrance rather than fighting it.
 *
 * From `lg` the slots stop generating boxes and the cards fall straight into
 * whatever grid the caller put on the deck, untouched.
 */
export function SwipeDeck({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const deckRef = useRef<HTMLDivElement>(null);
  const wide = useMediaQuery("(min-width: 64rem)");

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    if (wide) {
      deck.style.removeProperty("--deck-p");
      deck.style.removeProperty("--deck-w");
      return;
    }

    let frame = 0;

    const read = () => {
      frame = 0;
      const slot = deck.firstElementChild as HTMLElement | null;
      const width = slot?.offsetWidth ?? 0;
      /* One slot is one card, so the scroll reads directly as a position in
         the deck. The width goes with it: the cards have to be pulled back
         out of their slots and onto the pile. */
      deck.style.setProperty("--deck-w", `${width}`);
      deck.style.setProperty(
        "--deck-p",
        width ? `${deck.scrollLeft / width}` : "0",
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    deck.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      deck.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [wide]);

  return (
    <div
      ref={deckRef}
      style={{ "--n": `${Children.count(children)}` } as CSSProperties}
      className={cn("swipe-deck", className)}
    >
      {Children.map(children, (child, index) => (
        <div
          className="swipe-slot"
          style={
            {
              "--i": `${index}`,
              "--tilt": `${TILT[index % TILT.length]}deg`,
            } as CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
