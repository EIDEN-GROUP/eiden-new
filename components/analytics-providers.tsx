"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import {
  CLARITY_ID,
  GA4_ID,
  GTM_ID,
  applyConsent,
  readStoredConsent,
  writeStoredConsent,
  type ConsentChoice,
} from "@/lib/analytics";
import { CookieBanner } from "@/components/cookie-banner";

/**
 * Loads GA4 + GTM + Clarity (heatmaps & session recordings), all env-gated.
 * Renders nothing visible except the consent banner while no choice is stored.
 */
function subscribeConsent(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener("eiden-consent", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("eiden-consent", notify);
  };
}

function getConsentSnapshot(): ConsentChoice | null {
  return readStoredConsent();
}

function getServerConsentSnapshot(): ConsentChoice | null {
  return null;
}

export function AnalyticsProviders() {
  /* localStorage as external store: no render-phase reads, no hydration
     mismatch, and cross-tab choices propagate through `storage`. */
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  /* Stored grant or fresh choice: push it into Consent Mode. */
  useEffect(() => {
    if (consent) applyConsent(consent);
  }, [consent]);

  const choose = useCallback((choice: ConsentChoice) => {
    writeStoredConsent(choice);
    applyConsent(choice);
    window.dispatchEvent(new Event("eiden-consent"));
  }, []);

  return (
    <>
      {GA4_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
            onLoad={() => {
              window.gtag?.("js", new Date());
              window.gtag?.("config", GA4_ID);
            }}
          />
        </>
      ) : null}

      {GTM_ID ? (
        <>
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      ) : null}

      {/* Clarity only boots after accept — it has no consent-mode support. */}
      {consent === "granted" && CLARITY_ID ? (
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`,
          }}
        />
      ) : null}

      {consent === null ? <CookieBanner onChoice={choose} /> : null}
    </>
  );
}
