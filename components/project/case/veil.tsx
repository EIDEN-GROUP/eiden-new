"use client";

import { useEffect, useState } from "react";

/** How long the veil is given to clear the screen, plus a beat. */
const RUN_MS = 1000;

/**
 * The curtain, for browsers that cannot draw the real one.
 *
 * Where view transitions exist, the case study itself rises over the page it
 * was opened from and this never renders   `@supports (view-transition-name)`
 * takes it out, because the feature query and the API ship together. Where
 * they do not, an ink panel covers the case on arrival and slides off the foot
 * of the screen, which is the same gesture with none of the machinery.
 *
 * It is a fixed layer of its own rather than a transform on the article: a
 * transformed ancestor becomes the containing block for everything fixed
 * inside it, and the bar the case carries is fixed.
 */
export function CaseVeil() {
  const [present, setPresent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPresent(false), RUN_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!present) return null;

  return <div aria-hidden className="case-veil" />;
}
