import type { Localized } from "@/lib/data/localized";
import type { ProjectSlug } from "@/lib/data/site";

export type { Localized };

/**
 * A picture, and what it is an example of.
 *
 * The label is the only writing a visual gets. It names the kind of work
 * `Website`, `Campaign`, `B2B Portal`   rather than describing the picture,
 * because a reader scanning a wall of work is asking what they are looking at,
 * not what is in the frame.
 */
export type Shot = {
  image: string;
  alt: Localized;
  label: Localized;
  /**
   * How the picture meets its frame. `cover` by default, which is right for a
   * photograph   the crop costs nothing. A phone screenshot is the exception:
   * it is much taller than any frame on the page, so covering it throws away
   * the top and bottom of the screen being shown. Those ask for `contain`.
   */
  fit?: "cover" | "contain";
};

/**
 * A picture in the gallery.
 *
 * No label, unlike a `Shot`: a gallery is looked at rather than read, and
 * captioning nine images turns it back into a list.
 */
export type GalleryImage = { image: string; alt: Localized };

/** One colour of a brand palette, as the brand book itself names it. */
export type PaletteColor = {
  /** The brand's own name for it — "Forêt", "Keppel", "Magenta". */
  name: string;
  hex: string;
  /** What it does in the system, not what it looks like. */
  role: Localized;
};

/** One beat of the palette story, and the colour it turns the room. */
export type PaletteState = {
  title: Localized;
  text: Localized;
  /** Index into `colors`. Beats may return to a colour already used. */
  colorIndex: number;
};

/**
 * The palette, told rather than listed.
 *
 * Read as a held run the visitor scrolls through: the disk turns, the ground
 * changes colour under them, and each beat says what that colour is for. It
 * belongs to the branding chapter and is written inside it   a palette is one
 * of the things branding produced, not a subject of its own.
 */
export type PaletteStory = {
  title: Localized;
  lead: Localized;
  colors: PaletteColor[];
  states: PaletteState[];
};

/**
 * Somewhere the work is live.
 *
 * `kind` only decides which mark is drawn beside the label; the label is what
 * is read. Never write a link that has not been checked   an account that has
 * been renamed is worse than no link at all.
 */
export type ChapterLink = {
  href: string;
  label: Localized;
  kind?: "site" | "instagram" | "facebook" | "linkedin" | "tiktok";
};

/**
 * The ground a room stands on.
 *
 * Three, and only three. A case study is a set of rooms the reader walks
 * through, and a room changes by changing its walls   canvas for the work that
 * has to be looked at in daylight, ink for the work that was made for a
 * screen, forest for the turns. A fourth ground would stop reading as a change
 * and start reading as decoration.
 */
export type ChapterTone = "canvas" | "ink" | "forest";

/**
 * The diagnosis: what was already true, and what was out of joint.
 *
 * This is the section that makes a case unmistakably EIDEN, and it is the one
 * place the reader is allowed to see the business before the design. It is
 * written as two columns because a fracture is only legible next to the thing
 * it broke away from   a list of problems on its own reads as a pitch, and a
 * list of strengths on its own reads as a compliment.
 *
 * `statement` closes it in one line. Two short clauses, the second turning on
 * the first: "Le lieu savait qui il était. La marque, non."
 */
export type Fracture = {
  /** What the business already had. Three or four, short. */
  reality: Localized[];
  /** What was misaligned with it. Three or four, short. */
  fracture: Localized[];
  /** The line the diagnosis reduces to. */
  statement: Localized;
};

/**
 * The decision, and the system it set in motion.
 *
 * The difference between EIDEN and an agency is written here: one business
 * problem answered by connected disciplines rather than by a list of
 * deliverables. `chain` is that system in order   positioning → brand →
 * content → media → commercial   and `text` says how each link holds the next
 * one up. Never more than five links: a chain nobody can hold in their head is
 * an org chart, not an architecture.
 */
export type Architecture = {
  /** What EIDEN understood and decided, in one sentence. */
  decision: Localized;
  /** The connected system, in the order it runs. */
  chain: Localized[];
  /** How the links hold together. One paragraph. */
  text: Localized;
};

/**
 * One figure, and everything that makes it mean something.
 *
 * A number alone is not evidence   "+38%" with no unit and no period is a
 * decoration. Every field except the figure is allowed to be `null`, and a
 * `null` is rendered as nothing rather than as a guess: on this portfolio a
 * missing timeframe is written by the client or it is not written at all.
 */
export type ImpactRow = {
  /** The figure, as the client publishes it. */
  metric: string;
  /** What it counts. `null` until the client has said. */
  measures: Localized | null;
  /** Over what period. `null` until the client has said. */
  period: Localized | null;
  /** Why it matters commercially. `null` until the client has said. */
  meaning: Localized | null;
};

/**
 * What changed.
 *
 * The close of the case, on its own screen. `metric` is only ever a number the
 * client has put its own name to, and `rows` is where that number is given its
 * unit, its period and its commercial meaning   the three things that turn a
 * figure into an argument.
 */
export type Impact = {
  title: Localized;
  text: Localized;
  /** The headline figure. Left out wherever the result is qualitative. */
  metric?: string;
  /** The headline figure, read out. Left out until there is something to say. */
  rows?: ImpactRow[];
};

/**
 * A further piece of work, read inside the room it belongs to.
 *
 * Some work only means anything next to the work beside it: a position is the
 * argument the branding then draws, and the money is what the content it sits
 * under was for. Those are blocks rather than rooms   same ground, same
 * curtain, one after the other   because a curtain between them would say they
 * were bought separately, which is the opposite of what the case is claiming.
 *
 * It carries everything a chapter does except the two things that belong to a
 * room rather than to a piece of work: the ground it stands on, and the
 * palette.
 */
export type ChapterBlock = {
  /** Stable key, for React. */
  key: string;
  /** The parts of the business this block covers. */
  labels: Localized[];
  /** The decision, stated. */
  title: Localized;
  /** One or two sentences. */
  text: Localized;
  /** Four at most, as in a chapter. */
  shots?: Shot[];
  /** Wherever this work is live and checkable. */
  links?: ChapterLink[];
};

/**
 * One chapter of what was built.
 *
 * A chapter is not a service and not a deliverable   it is one decision, the
 * work it produced, and the proof it left behind, in that order. `labels` is
 * what part of the business it covers, `title` is the decision stated as a
 * sentence, `text` explains it in two, and `shots` prove it. A chapter whose
 * disciplines produced nothing to photograph is set in type alone, which is
 * honest where a borrowed screenshot is not.
 *
 * `palette` belongs to the branding chapter and is rendered as a further held
 * screen inside the same room, on the same ground, so the run still reads as
 * one chapter rather than two.
 */
export type Chapter = {
  /** Stable key, for React and for the hero's rail. */
  key: string;
  /** The parts of the business this chapter covers. */
  labels: Localized[];
  /** The decision, stated. Not "Branding" but what the branding decided. */
  title: Localized;
  /** One or two sentences. The first screen holds no more than that. */
  text: Localized;
  tone: ChapterTone;
  /** Four at most: the first screen is a screen, and a fifth would scroll. */
  shots?: Shot[];
  /** The site, the accounts   wherever this work is live and checkable. */
  links?: ChapterLink[];
  /**
   * The work that is only legible next to this chapter's, read after it and
   * before the palette. Never a second subject   always the same one, carried
   * one step further.
   */
  blocks?: ChapterBlock[];
  /** Branding only: the palette, told as its own held run   always last. */
  palette?: PaletteStory;
};

/**
 * One project, written as a business case rather than as a portfolio entry.
 *
 * The running order is fixed and every case is read through it:
 *
 *   hero → fracture → architecture → chapters → impact → work → next
 *
 * Which is: who this is, what was broken, what EIDEN decided, what that
 * produced, what it changed, and the pictures that prove it. The structure
 * never varies   it is what makes eleven different businesses read as one
 * practice   while the depth does: a project that needed three chapters gets
 * three, and a result the client has never published stays qualitative.
 *
 * The order is deliberate on one point in particular: the pictures come last.
 * A gallery placed before the argument becomes the argument, and the case stops
 * being about the business.
 */
export type ProjectCase = {
  slug: ProjectSlug;
  client: string;
  year: string;
  category: Localized;
  location?: Localized;

  /**
   * The dark ground this case is read on, as a hex.
   *
   * The three grounds are the portfolio's, not the client's   but the deep one
   * is where a case spends half its length, and running eleven different
   * businesses over the same green makes them look like one. So the forest
   * ground is swapped for a colour out of the project's own brand book: the
   * Forêt of a restaurant, the Bois of a hotel, the Violet of a children's
   * centre. Dark enough for the canvas type to hold, always   and left out
   * wherever there is no brand palette to take one from, which falls back to
   * the portfolio's own forest.
   */
  ground?: string;

  hero: {
    /** WHY   the line the project reduces to. Short enough to set large. */
    statement: Localized;
    /** WHAT   two sentences at most: who they are, and what we did. */
    intro: Localized;
    image: string;
    alt: Localized;
  };

  /** The diagnosis. */
  fracture: Fracture;

  /**
   * The decision, and the system it set in motion.
   *
   * Its chain is also the hero's scope   the parts of the business are named
   * once, in one place, so what the hero promises before the visitor scrolls
   * is exactly what the case then walks them through.
   */
  architecture: Architecture;

  /** What was built, chapter by chapter. Three to five. */
  chapters: Chapter[];

  /** What changed. */
  impact: Impact;

  /** The proof, after the argument. Left out where there is no set to show. */
  work?: GalleryImage[];
};
