"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";
import type { ConsentChoice } from "@/lib/analytics";

const copy = {
  fr: {
    text: "Nous mesurons la fréquentation de façon anonyme pour améliorer le site (Google Analytics, heatmaps). Acceptez-vous ces mesures ?",
    accept: "Accepter",
    decline: "Refuser",
  },
  en: {
    text: "We measure visits anonymously to improve the site (Google Analytics, heatmaps). Do you accept these measurements?",
    accept: "Accept",
    decline: "Decline",
  },
} as const;

/**
 * Consent banner. Appears once, with a beat of delay so it never fights the
 * intro loader; the choice persists in localStorage and upgrades Consent
 * Mode (GA4/GTM) or boots Clarity outright.
 */
export function CookieBanner({
  onChoice,
}: {
  onChoice: (choice: ConsentChoice) => void;
}) {
  const { locale } = useLanguage();
  const [shown, setShown] = useState(false);
  const t = locale === "en" ? copy.en : copy.fr;

  useEffect(() => {
    const id = window.setTimeout(() => setShown(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.accept}
      className={cn(
        "fixed inset-x-4 bottom-4 z-[90] sm:right-6 sm:bottom-6 sm:left-auto sm:max-w-sm",
        "transition-[opacity,transform] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <div className="glass-dark bg-ink text-canvas rounded-2xl p-5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)]">
        <p className="text-[0.85rem] leading-relaxed text-balance">{t.text}</p>
        <div className="mt-4 flex gap-2.5">
          <button
            type="button"
            onClick={() => onChoice("denied")}
            className="font-label border-canvas/25 hover:border-canvas flex-1 rounded-full border px-4 py-2.5 text-[0.72rem] font-bold tracking-[0.16em] uppercase transition-colors duration-300"
          >
            {t.decline}
          </button>
          <button
            type="button"
            onClick={() => onChoice("granted")}
            className="font-label bg-gold text-ink hover:bg-canvas flex-1 rounded-full px-4 py-2.5 text-[0.72rem] font-bold tracking-[0.16em] uppercase transition-colors duration-300"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
