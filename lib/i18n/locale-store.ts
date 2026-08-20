import { defaultLocale, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "eiden.locale";

type Listener = () => void;

const listeners = new Set<Listener>();
let snapshot: Locale = defaultLocale;
let resolved = false;

function readEnvironment(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "fr" || stored === "en") return stored;
  // French is the default market; only fall back to English for English browsers.
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "fr";
}

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeLocale(listener: Listener) {
  listeners.add(listener);

  // Keep other tabs of the same site in step.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    snapshot = readEnvironment();
    emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getLocaleSnapshot(): Locale {
  if (!resolved) {
    resolved = true;
    snapshot = readEnvironment();
  }
  return snapshot;
}

export function getServerLocaleSnapshot(): Locale {
  return defaultLocale;
}

export function writeLocale(next: Locale) {
  resolved = true;
  snapshot = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  emit();
}
