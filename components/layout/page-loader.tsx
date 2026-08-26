"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Wordmark } from "@/components/ui/wordmark";
import { useLanguage } from "@/components/providers/language-provider";
import { useHydrated, useMediaQuery } from "@/lib/hooks";
import { setIntroDone } from "@/lib/intro-store";
import { cn } from "@/lib/utils";

const SESSION_KEY = "eiden.introSeen";

/** Milliseconds: the mark fills, holds, then the curtains clear the frame. */
const FILL_MS = 950;
const HOLD_MS = 220;
const SWEEP_MS = 1150;

/**
 * The three colours that cross the frame, in the order they leave it.
 * Dark first and light last, so the final band before the page is gold.
 */
const CURTAINS = [
  { tone: "bg-teal", delay: 0.05 },
  { tone: "bg-teal-lt", delay: 0.12 },
  { tone: "bg-gold", delay: 0.19 },
];

/** Session storage never changes under us mid-visit, so there is nothing to subscribe to. */
const noopSubscribe = () => () => {};

/**
 * First-visit intro: the wordmark fills left to right behind a block riding
 * its own edge, and the frame is then carried off by a train of curtains  
 * the ground leading, three brand colours crossing it from off-stage left, so
 * the page is uncovered a band at a time rather than in one cut.
 *
 * Shown once per browser session, and skipped entirely for visitors who
 * prefer reduced motion.
 */
export function PageLoader() {
  const { t } = useLanguage();
  const hydrated = useHydrated();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const introSeen = useSyncExternalStore(
    noopSubscribe,
    useCallback(() => window.sessionStorage.getItem(SESSION_KEY) === "1", []),
    () => true,
  );

  const [dismissed, setDismissed] = useState(false);
  const [sweeping, setSweeping] = useState(false);

  const visible = !introSeen && !reduced && !dismissed;

  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = "hidden";

    const toSweep = window.setTimeout(() => setSweeping(true), FILL_MS + HOLD_MS);
    const toGone = window.setTimeout(
      () => {
        window.sessionStorage.setItem(SESSION_KEY, "1");
        setDismissed(true);
      },
      FILL_MS + HOLD_MS + SWEEP_MS,
    );

    return () => {
      window.clearTimeout(toSweep);
      window.clearTimeout(toGone);
      document.body.style.overflow = "";
    };
  }, [visible]);

  /*
   * Release the chrome that waits behind the intro. Guarded on hydration
   * because the server snapshot reports the intro as already seen   without
   * that, the very first commit would call this a beat before the loader
   * has even had a chance to appear.
   */
  useEffect(() => {
    if (!hydrated || visible) return;
    setIntroDone();
  }, [hydrated, visible]);

  // Repeat visitors and reduced-motion visitors never see it; mark it seen anyway.
  useEffect(() => {
    if (reduced) window.sessionStorage.setItem(SESSION_KEY, "1");
  }, [reduced]);

  if (!visible) return null;

  const fill = `${FILL_MS}ms var(--ease-brand) both`;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label={t.common.loading}
    >
      {/* The ground, already covering the frame and first to leave it. */}
      <div
        className={cn(
          "bg-ink absolute inset-0 flex items-center justify-center",
          sweeping &&
            "motion-safe:[animation:eiden-curtain-out_0.8s_var(--ease-brand)_both]",
        )}
      >
        <span className="relative grid h-9 sm:h-12">
          {/* The mark at rest, and the same mark lit   one on top of the
              other, with the clip opening the lit copy left to right. */}
          <Wordmark className="text-canvas/20 col-start-1 row-start-1 h-full" />
          <span
            className="col-start-1 row-start-1 motion-safe:[animation:eiden-mark-fill_var(--fill)]"
            style={{ "--fill": fill } as React.CSSProperties}
          >
            <Wordmark className="text-canvas h-full" />
          </span>

          {/* The block riding the edge of the fill, and left standing just
              past the mark when it lands. */}
          <span
            aria-hidden
            className="bg-gold absolute top-0 h-full motion-safe:[animation:eiden-mark-head_var(--fill)]"
            style={{ aspectRatio: 0.55, "--fill": fill } as React.CSSProperties}
          />
        </span>
      </div>

      {/* Three colours crossing the frame behind it, uncovering the page. */}
      {sweeping
        ? CURTAINS.map((curtain) => (
            <div
              key={curtain.tone}
              aria-hidden
              className={cn(
                "absolute inset-0",
                curtain.tone,
                "motion-safe:[animation:eiden-curtain-pass_0.95s_var(--ease-brand)_both]",
              )}
              style={{ animationDelay: `${curtain.delay}s` }}
            />
          ))
        : null}
    </div>
  );
}
