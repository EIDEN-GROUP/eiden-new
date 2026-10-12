import type { ProjectCase } from "./types";
import { bopassage } from "./bopassage";
import { dmcMorocco } from "./dmc-morocco";
import { educazenKids } from "./educazen-kids";
import { lunjaVillage } from "./lunja-village";
import { mabrouk } from "./mabrouk";
import { medicalBay } from "./medical-bay";
import { chilloutLounge } from "./chillout-lounge";
import { droguerieSouss } from "./droguerie-souss";
import { anisal } from "./anisal";
import { madaef } from "./madaef";
import { centreAccompagnement } from "./centre-accompagnement";

export type {
  Architecture,
  Chapter,
  ChapterTone,
  Fracture,
  GalleryImage,
  Impact,
  ImpactRow,
  Localized,
  ProjectCase,
  Shot,
} from "./types";


export const projectCases: ProjectCase[] = [
  bopassage,
  dmcMorocco,
  educazenKids,
  lunjaVillage,
  mabrouk,
  medicalBay,
  chilloutLounge,
  droguerieSouss,
  anisal,
  madaef,
  centreAccompagnement,
];

/**
 * Hidden from the frontend without deleting anything: the case modules above
 * stay imported so nothing is removed. Restore them by emptying this set.
 */
export const HIDDEN_PROJECT_SLUGS = new Set<string>([
  "medical-bay",
  "droguerie-souss",
]);

export function getProjectCase(slug: string) {
  if (HIDDEN_PROJECT_SLUGS.has(slug)) return undefined;
  return projectCases.find((project) => project.slug === slug);
}

export function getNextCases(slug: string, count = 2) {
  const visible = projectCases.filter(
    (project) => !HIDDEN_PROJECT_SLUGS.has(project.slug),
  );
  const index = visible.findIndex((project) => project.slug === slug);
  if (index < 0) return [];

  const size = visible.length;
  return Array.from({ length: Math.min(count, size - 1) }, (_, step) => {
    return visible[(index + step + 1) % size];
  });
}
