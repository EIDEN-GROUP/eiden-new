import type { Localized } from "@/lib/data/localized";
import type { ProjectSlug } from "@/lib/data/site";

export type { Localized };

/**
 * A picture, and what it is an example of.
 *
 * The label is the only writing a visual gets. It names the kind of work —
 * `Website`, `Campaign`, `B2B Portal` — rather than describing the picture,
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
 * is one line and is left off wherever the record cannot back the claim up —
 * a service listed bare is honest; a service given an invented description is
 * not.
 */
export type Service = { name: Localized; note?: Localized };

/**
 * One project, written as a case rather than as a chronicle.
 *
 * The spine is fixed — hero, services, transformation, work, outcome — and the
 * two optional blocks are the only places a page is allowed to grow. That is
 * deliberate: a `sections[]` array would let any page sprout any number of
 * blocks, and the rule this portfolio needed was the opposite one.
 *
 * `identity` appears only where there are real identity assets to show, and
 * `feature` only where the work has a genuine second act — a system, a portal,
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
   * lights them one at a time as it is scrolled through — the reader is meant
   * to arrive at the turn, not to be handed it.
   */
  transformation: { title: Localized; text: Localized[] };

  identity?: {
    title: Localized;
    text: Localized;
    /** Painted from their own hex, so no project borrows another's colours. */
    palette?: { name: Localized; hex: string }[];
    shots: Shot[];
  };

  feature?: {
    label: Localized;
    title: Localized;
    text: Localized;
    shots: Shot[];
  };

  /** Three to six. The cap is the point — this is a portfolio, not an archive. */
  work: Shot[];

  outcome: {
    title: Localized;
    text: Localized;
    /** Only ever a figure the client has already published. Never derived. */
    metric?: string;
  };
};
