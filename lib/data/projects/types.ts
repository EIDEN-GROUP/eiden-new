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
};

/**
 * A service as it was sold.
 *
 * Never a deliverable (`Homepage`), never a technology (`Next.js`). The `note`
 * is one line and is left off wherever the record cannot back the claim up  
 * a service listed bare is honest; a service given an invented description is
 * not.
 */
export type Service = { name: Localized; note?: Localized };

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
 * Read as a held section the visitor scrolls through: the disk turns, the
 * ground changes colour under them, and each beat says what that colour is
 * for. Optional — a project with no identity work has no palette to tell,
 * and a grid of swatches was never the point.
 */
export type PaletteStory = {
  title: Localized;
  lead: Localized;
  colors: PaletteColor[];
  states: PaletteState[];
};

/**
 * One project, written as a case rather than as a chronicle.
 *
 * The spine is fixed   hero, services, transformation, work, outcome   and the
 * two optional blocks are the only places a page is allowed to grow. That is
 * deliberate: a `sections[]` array would let any page sprout any number of
 * blocks, and the rule this portfolio needed was the opposite one.
 *
 * `identity` appears only where there are real identity assets to show, and
 * `feature` only where the work has a genuine second act   a system, a portal,
 * a catalogue. Neither is a slot to fill.
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

  /** Exactly the services that were sold, in the order they are sold in. */
  services: Service[];

  /**
   * Where they were → what changed → where they are now.
   *
   * `text` is a run of lines rather than a paragraph because the section
   * lights them one at a time as it is scrolled through   the reader is meant
   * to arrive at the turn, not to be handed it.
   */
  transformation: { title: Localized; text: Localized[] };

  identity?: {
    title: Localized;
    text: Localized;
    shots: Shot[];
  };

  /** The palette as an experience rather than a legend. See `PaletteStory`. */
  paletteStory?: PaletteStory;

  feature?: {
    label: Localized;
    title: Localized;
    text: Localized;
    /**
     * Optional, and empty on the projects with four files to their name.
     * Showing the same screenshot here and again under selected work is
     * padding, and padding is what this section exists to avoid: where there
     * is nothing new to show, the second act is made in words alone.
     */
    shots?: Shot[];
  };

  /** Three to six. The cap is the point   this is a portfolio, not an archive. */
  work: Shot[];

  /**
   * The wider set, where one exists.
   *
   * Selected work is the argument; this is the evidence behind it. Optional
   * for the same reason identity is: five of these projects have four files
   * to their name, and a wall repeating the three pictures already shown
   * above it is worse than no wall.
   */
  gallery?: GalleryImage[];

  outcome: {
    title: Localized;
    text: Localized;
    /** Only ever a figure the client has already published. Never derived. */
    metric?: string;
  };
};
