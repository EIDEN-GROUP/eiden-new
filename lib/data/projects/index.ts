import type { ProjectCase } from "./types";
import { bopassage } from "./bopassage";
import { dmcMorocco } from "./dmc-morocco";
import { educazenKids } from "./educazen-kids";
import { lunjaVillage } from "./lunja-village";
import { medicalBay } from "./medical-bay";
import { orsen } from "./orsen";
import { lithosMateriaux } from "./lithos-materiaux";
import { rihabResidence } from "./rihab-residence";
import { chilloutLounge } from "./chillout-lounge";
import { droguerieSouss } from "./droguerie-souss";

export type { ProjectCase, Service, Shot, Localized } from "./types";

/**
 * The portfolio, in reading order.
 *
 * The order is the running order of the site — it decides what "next project"
 * means at the foot of every page — so it is written here rather than sorted
 * at render. Hospitality, education and healthcare first, then the three
 * materials platforms, so a visitor walking the whole set meets the range
 * before the repetition.
 */
export const projectCases: ProjectCase[] = [
  bopassage,
  dmcMorocco,
  educazenKids,
  lunjaVillage,
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

/** The next case in the running order, wrapping at the end. */
export function getNextCase(slug: string) {
  const index = projectCases.findIndex((project) => project.slug === slug);
  if (index < 0 || projectCases.length < 2) return undefined;
  return projectCases[(index + 1) % projectCases.length];
}
