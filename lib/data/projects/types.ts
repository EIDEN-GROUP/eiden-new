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
 * A picture in the wall.
 *
 * No label, unlike a `Shot`: a gallery is looked at rather than read, and
 * captioning nine images turns a wall back into a list.
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
 * belongs to the branding room and is written inside it   a palette is one of
 * the things branding produced, not a subject of its own.
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
 * What the work came to.
 *
 * Short, and qualitative unless the client has already published a figure.
 * `metric` is only ever a number the client has put its own name to.
 */
export type Outcome = {
  title: Localized;
  text: Localized;
  metric?: string;
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
 * One room of the case.
 *
 * This replaced the single "what we did" list, and then replaced the panel-per-
 * service that followed it. A service is not a section: branding and its
 * palette are one piece of work, a site and the system behind it are one piece
 * of work, and the money disciplines are only interesting next to the result
 * they produced. So a room can cover more than one discipline   `labels` is
 * what it covers   and carries whatever that work actually produced.
 *
 * The optional blocks are what make a room longer than a screen. `palette`
 * belongs to branding, `wall` to the social work it is the volume behind, and
 * `outcome` to the room that earned it. Each is rendered as a further held
 * screen inside the same room, on the same ground, so the run still reads as
 * one section rather than three.
 *
 * `shots` is allowed to be empty, and several rooms across this portfolio are:
 * positioning, revenue and media buying were sold and delivered without
 * producing an image, and a room that says so in type is honest where one
 * padded with a borrowed screenshot is not.
 */
export type Chapter = {
  /** Stable key, for React and for the hero's rail. */
  key: string;
  /** The disciplines this room covers, in the order they were sold. */
  labels: Localized[];
  /** The room's own headline   what this work did here, not in general. */
  title: Localized;
  /** One or two sentences. The first screen holds no more than that. */
  text: Localized;
  tone: ChapterTone;
  /** Four at most: the first screen is a screen, and a fifth would scroll. */
  shots?: Shot[];
  /** The site, the accounts   wherever this work is live and checkable. */
  links?: ChapterLink[];
  /** Branding only: the palette, told as its own held run. */
  palette?: PaletteStory;
  /** The wider set, drifting. Belongs under the work it is the evidence for. */
  wall?: GalleryImage[];
  /**
   * The figure this room moved, stated inside it.
   *
   * Only where revenue or paid media was sold: those disciplines are only worth
   * reading next to the number they moved, so the result is written into this
   * room's own text rather than given a section of its own. Only ever a figure
   * the client has already published.
   */
  metric?: string;
};

/**
 * One project, written as a case rather than as a chronicle.
 *
 * Hero → the turn → the rooms. `chapters` is the only place a page is allowed
 * to grow, and the growth is bounded by what was actually sold, so a page can
 * never sprout a section no invoice backs.
 *
 * `outcome` closes the case on its own screen   unless one of the rooms has
 * claimed it, which is what happens wherever revenue or paid media was sold:
 * those disciplines are only worth reading next to the figure they moved. One
 * or the other is always present; never both.
 */
export type ProjectCase = {
  slug: ProjectSlug;
  client: string;
  year: string;
  category: Localized;
  location?: Localized;

  hero: {
    /** The line the project reduces to. Short enough to set large. */
    statement: Localized;
    /** Two sentences at most: who they are, and what we did. */
    intro: Localized;
    image: string;
    alt: Localized;
  };

  /**
   * Where they were → what changed → where they are now.
   *
   * `text` is a run of lines rather than a paragraph because the section
   * brings them in one at a time   the reader is meant to arrive at the turn,
   * not to be handed it.
   */
  transformation: { title: Localized; text: Localized[] };

  /** The rooms, in reading order. Three to five. */
  chapters: Chapter[];

  /** The closing screen. Left out where a room states the result instead. */
  outcome?: Outcome;
};
