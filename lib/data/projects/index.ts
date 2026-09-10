import type { ProjectCase } from "./types";
import { bopassage } from "./bopassage";
import { dmcMorocco } from "./dmc-morocco";
import { educazenKids } from "./educazen-kids";
import { lunjaVillage } from "./lunja-village";
import { mabrouk } from "./mabrouk";
import { medicalBay } from "./medical-bay";
import { orsen } from "./orsen";
import { lithosMateriaux } from "./lithos-materiaux";
import { rihabResidence } from "./rihab-residence";
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
  rihabResidence,
  chilloutLounge,
  orsen,
  lithosMateriaux,
  droguerieSouss,
  anisal,
  madaef,
  centreAccompagnement,
];

export function getProjectCase(slug: string) {
  return projectCases.find((project) => project.slug === slug);
}

export function getNextCases(slug: string, count = 2) {
  const index = projectCases.findIndex((project) => project.slug === slug);
  if (index < 0) return [];

  const size = projectCases.length;
  return Array.from({ length: Math.min(count, size - 1) }, (_, step) => {
    return projectCases[(index + step + 1) % size];
  });
}
