"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Wordmark } from "@/components/ui/wordmark";
import { useLanguage } from "@/components/providers/language-provider";
import { useMediaQuery } from "@/lib/hooks";

const SESSION_KEY = "eiden.introSeen";

/** Session storage never changes under us mid-visit, so there is nothing to subscribe to. */
const noopSubscribe = () => () => {};

/**
 * First-visit intro: the wordmark resolves out of the forest surface while a
 * hairline progress bar fills. Shown once per browser session, and skipped
 * entirely for visitors who prefer reduced motion.
 */
export function PageLoader() {
  const { t } = useLanguage();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const introSeen = useSyncExternalStore(
    noopSubscribe,
    useCallback(() => window.sessionStorage.getItem(SESSION_KEY) === "1", []),
    () => true,
  );

  const [dismissed, setDismissed] = useState(false);
  const [progress, setProgress] = useState(0);

  const visible = !introSeen && !reduced && !dismissed;

  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = "hidden";

    // Ease towards 100% so the bar never stalls at a fixed value.
    const tick = window.setInterval(() => {
      setProgress((value) =>
        value >= 100 ? 100 : value + (100 - value) * 0.18 + 2,
      );
    }, 90);

    const finish = window.setTimeout(() => {
      setProgress(100);
      window.setTimeout(() => {
        window.sessionStorage.setItem(SESSION_KEY, "1");
        setDismissed(true);
      }, 420);
    }, 1500);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(finish);
      document.body.style.overflow = "";
    };
  }, [visible]);

  // Repeat visitors and reduced-motion visitors never see it; mark it seen anyway.
  useEffect(() => {
    if (reduced) window.sessionStorage.setItem(SESSION_KEY, "1");
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          className="grain bg-forest fixed inset-0 z-[100] flex flex-col items-center justify-center"
          role="status"
          aria-live="polite"
          aria-label={t.common.loading}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-canvas"
          >
            <Wordmark className="h-11 sm:h-14" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="bg-canvas/15 mt-10 h-px w-40 overflow-hidden sm:w-56"
          >
            <div
              className="bg-gold h-full transition-[width] duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="eyebrow text-canvas/40 mt-6"
          >
            Agadir · Maroc
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
