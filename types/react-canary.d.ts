/// <reference types="react/canary" />

/**
 * `<ViewTransition>` ships in the React build the App Router runs on, but the
 * published `@types/react` keeps it behind the canary channel. This reference
 * pulls those declarations in once for the whole project; without it the
 * component exists at runtime and not at the type level, which is the worst of
 * both.
 */
export {};
