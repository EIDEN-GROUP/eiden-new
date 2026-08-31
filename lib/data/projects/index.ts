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

/**
 * The portfolio, in reading order.
 *
 * The order is the running order of the site   it decides what "next project"
 * means at the foot of every page   so it is written here rather than sorted
 * at render. Hospitality, education and healthcare first, then the three
 * materials platforms, so a visitor walking the whole set meets the range
 * before the repetition.
 */
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
];

export function getProjectCase(slug: string) {
  return projectCases.find((project) => project.slug === slug);
}

/**
 * The cases that follow this one in the running order, wrapping at the end.
 *
 * Two, because one reads as an afterthought and a grid of six reads as an
 * index. Never the project being read, and never the same one twice.
 */
export function getNextCases(slug: string, count = 2) {
  const index = projectCases.findIndex((project) => project.slug === slug);
  if (index < 0) return [];

  const size = projectCases.length;
  return Array.from({ length: Math.min(count, size - 1) }, (_, step) => {
    return projectCases[(index + step + 1) % size];
  });
}
