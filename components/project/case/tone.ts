import type { ChapterTone } from "@/lib/data/projects/types";

/**
 * The grounds a section can stand on, and everything that has to change with
 * them.
 *
 * Kept in one table rather than spread through the sections: a case study is
 * read as one run, and the only way a run stays a set is if the rule for "what
 * the writing does on this wall" is written once.
 *
 * The case is read in daylight. `canvas` and `cream` are the two the page
 * actually alternates between   near enough that the change reads as a breath
 * rather than as a new page, far enough that a section has an edge. The deep
 * grounds are still here and still used, but as punctuation: one section, at
 * the point where the case stops describing and starts claiming.
 */
export type DisplayTone = ChapterTone | "cream";

export type ToneSkin = {
  /**
   * The section itself. `grain` is on the dark two, where it reads.
   *
   * The forest ground is the project's own, handed down as `--case-ground`
   * from the article and falling back to the portfolio's forest.
   */
  panel: string;
  /** What the fixed chrome should colour itself against. */
  nav: "light" | "dark";
  /** The discipline label above the headline. */
  label: string;
  /** The headline. */
  title: string;
  /** The paragraph under it. */
  body: string;
  /** Hairlines: the rail, the rule under the label. */
  rule: string;
  /** The plate a picture sits on before it has loaded. */
  frame: string;
  /** The hairline around a picture in the drifting wall. */
  ring: string;
  /** A caption under or over a picture. */
  caption: string;
  /**
   * What is out of joint: the fracture column, and nothing else.
   *
   * The only colour on the page that belongs neither to the brand nor to the
   * ground   an ochre that reads as a flag on every ground without turning a
   * diagnosis into an error message.
   */
  flag: string;
  /** The outline control — "view the site", the social accounts. */
  control: string;
  /** A card lifted off the ground: the facts panel, a figure tile. */
  card: string;
};

export const TONES: Record<DisplayTone, ToneSkin> = {
  canvas: {
    panel: "bg-canvas text-ink",
    nav: "light",
    label: "text-teal",
    title: "text-ink",
    body: "text-ink/60",
    rule: "border-ink/12",
    frame: "bg-ink/[0.05]",
    ring: "ring-ink/10",
    caption: "text-ink/40",
    flag: "text-[#8a6412]",
    control: "border-ink/20 text-ink hover:bg-ink hover:text-canvas",
    card: "border-ink/8 bg-cream/70",
  },
  cream: {
    panel: "bg-cream text-ink",
    nav: "light",
    label: "text-teal",
    title: "text-ink",
    body: "text-ink/60",
    rule: "border-ink/12",
    frame: "bg-ink/[0.06]",
    ring: "ring-ink/10",
    caption: "text-ink/40",
    flag: "text-[#8a6412]",
    control: "border-ink/20 text-ink hover:bg-ink hover:text-canvas",
    card: "border-ink/8 bg-canvas",
  },
  ink: {
    panel: "grain bg-ink text-canvas",
    nav: "dark",
    label: "text-gold",
    title: "text-canvas",
    body: "text-canvas/55",
    rule: "border-canvas/12",
    frame: "bg-canvas/[0.06]",
    ring: "ring-canvas/10",
    caption: "text-canvas/45",
    flag: "text-gold-dk",
    control: "border-canvas/25 text-canvas hover:bg-canvas hover:text-ink",
    card: "border-canvas/12 bg-canvas/[0.04]",
  },
  forest: {
    panel: "grain bg-[var(--case-ground)] text-canvas",
    nav: "dark",
    label: "text-gold",
    title: "text-canvas",
    body: "text-canvas/60",
    rule: "border-canvas/14",
    frame: "bg-canvas/[0.06]",
    ring: "ring-canvas/12",
    caption: "text-canvas/45",
    flag: "text-gold-dk",
    control: "border-gold/40 text-gold hover:bg-gold hover:text-forest",
    card: "border-canvas/12 bg-canvas/[0.05]",
  },
};
