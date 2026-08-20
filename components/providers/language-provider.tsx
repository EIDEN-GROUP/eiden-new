"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getDictionary, type Dictionary, type Locale } from "@/lib/i18n";
import {
  getLocaleSnapshot,
  getServerLocaleSnapshot,
  subscribeLocale,
  writeLocale,
} from "@/lib/i18n/locale-store";

type LanguageContextValue = {
  locale: Locale;
  /** Dictionary for the active locale. */
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // The stored preference lives outside React so SSR renders French and the
  // visitor's real choice is applied right after hydration.
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );

  // Keep the document language in sync for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => writeLocale(next), []);
  const toggleLocale = useCallback(
    () => writeLocale(locale === "fr" ? "en" : "fr"),
    [locale],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, t: getDictionary(locale), setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return context;
}
