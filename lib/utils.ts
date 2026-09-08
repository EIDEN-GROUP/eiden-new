import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, letting later Tailwind utilities win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Which cut of the arrow cursor a hand-set ground needs: `"light"` for the
 * cream arrow, `"dark"` for the forest one.
 *
 * The cursor is swapped in CSS off the background utilities, which cannot see
 * a colour that arrives as an inline style   a brand ground, a palette
 * swatch   so those elements declare their own cut with
 * `data-cursor={cursorOn(hex)}`. Same weighting the header uses to dress
 * itself against the ground it is over.
 */
export function cursorOn(background: string): "light" | "dark" {
  const parts = background.startsWith("#")
    ? [1, 3, 5].map((i) =>
        background.length === 4
          ? parseInt(background[(i + 1) / 2] + background[(i + 1) / 2], 16)
          : parseInt(background.slice(i, i + 2), 16),
      )
    : background
        .match(/[\d.]+/g)
        ?.slice(0, 3)
        .map(Number);

  if (!parts || parts.length < 3 || parts.some(Number.isNaN)) return "dark";

  const [r, g, b] = parts;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5 ? "light" : "dark";
}
