/**
 * Measurement stack: GA4 + GTM + Clarity (heatmaps & recordings).
 *
 * Everything is env-gated — without IDs nothing loads and nothing breaks:
 *   NEXT_PUBLIC_GA4_ID      G-XXXXXXXXXX  (Google Analytics 4)
 *   NEXT_PUBLIC_GTM_ID      GTM-XXXXXXX   (Google Tag Manager)
 *   NEXT_PUBLIC_CLARITY_ID  xxxxxxxx      (Microsoft Clarity)
 *
 * Consent Mode v2 defaults to denied (see the inline script in the root
 * layout `<head>`); the cookie banner upgrades to granted on accept. Clarity
 * has no consent-mode integration, so its script only renders after accept.
 */

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim() ?? "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID?.trim() ?? "";

export const CONSENT_STORAGE_KEY = "eiden-consent-v1";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

export function readStoredConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeStoredConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* Private mode: consent simply doesn't persist. */
  }
}

/** Push a Consent Mode v2 update; safe to call before any library loads. */
export function applyConsent(choice: ConsentChoice) {
  try {
    window.gtag?.("consent", "update", {
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
      analytics_storage: choice,
      functionality_storage: "granted",
      security_storage: "granted",
    });
  } catch {
    /* Measurement is best-effort; the site never depends on it. */
  }
}

/**
 * One conversion event, routed once: through GTM when a container exists
 * (GTM forwards to GA4), otherwise straight to gtag. Never both — that
 * would double-count every conversion.
 */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
) {
  try {
    if (GTM_ID) {
      window.dataLayer?.push({ event: name, ...params });
      return;
    }
    window.gtag?.("event", name, params);
  } catch {
    /* Best-effort, as above. */
  }
}
