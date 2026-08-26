import type { ProjectCase } from "./types";

/** No `identity` block   art direction is sold here, but nothing on file shows it. */
export const lithosMateriaux: ProjectCase = {
  slug: "lithos-materiaux",
  client: "LITHOS",
  year: "2026",
  category: { fr: "Matériaux", en: "Materials" },
  location: { fr: "Aix-en-Provence, France", en: "Aix-en-Provence, France" },

  hero: {
    statement: {
      fr: "La matière, racontée avec soin.",
      en: "Material, told with care.",
    },
    intro: {
      fr: "Un fournisseur de calcaire, de travertin et de marbre dans le sud de la France, avec un catalogue qui devait fonctionner comme un architecte prescrit réellement.",
      en: "A limestone, travertine and marble supplier in southern France, with a catalogue that needed to work the way an architect actually specifies.",
    },
    image: "/work/luthos hero.png",
    alt: { fr: "Le catalogue LITHOS", en: "The LITHOS catalogue" },
  },

  services: [
    {
      name: { fr: "Direction artistique", en: "Art Direction" },
      note: {
        fr: "Une identité qui vient de la carrière, pas d'une palette générique.",
        en: "An identity that comes from the quarry, not a stock palette.",
      },
    },
    {
      name: { fr: "Design system", en: "Design System" },
      note: {
        fr: "Un système qui tient de l'écran large jusqu'au téléphone.",
        en: "One system holding from a wide screen down to a phone.",
      },
    },
    {
      name: { fr: "Site web", en: "Website" },
      note: {
        fr: "Le catalogue comme produit, pas comme annexe.",
        en: "The catalogue as the product, not a supplement to it.",
      },
    },
    {
      name: { fr: "Expérience catalogue", en: "Catalogue Experience" },
      note: {
        fr: "Trois entrées, selon la façon dont on cherche.",
        en: "Three ways in, depending on how you search.",
      },
    },
    { name: { fr: "Motion", en: "Motion" } },
  ],

  transformation: {
    title: {
      fr: "D'une liste de références à un catalogue parcouru par effet, par espace et par ambiance.",
      en: "From a list of reference numbers to a catalogue browsed by effect, space and mood.",
    },
    text: [
      {
        fr: "Un architecte ne prescrit pas une pierre par numéro d'article.",
        en: "Architects do not specify stone by reference number.",
      },
      {
        fr: "Il cherche par effet, par espace, par ambiance.",
        en: "They search by effect, by space, by mood.",
      },
      {
        fr: "Nous avons reconstruit le catalogue autour de ces trois façons.",
        en: "We rebuilt the catalogue around those three ways.",
      },
      {
        fr: "La matière se trouve maintenant comme elle se choisit : par ce qu'elle donne.",
        en: "The material is now found the way it is chosen   by what it gives you.",
      },
    ],
  },

  feature: {
    label: { fr: "Expérience catalogue", en: "Catalogue Experience" },
    title: {
      fr: "Trois chemins vers la même pierre.",
      en: "Three routes to the same stone.",
    },
    text: {
      fr: "Par effet, par espace, par ambiance. Le même catalogue, trois entrées, parce qu'un architecte qui cherche un sol de salle de bain et un architecte qui cherche « quelque chose de chaud » ne cherchent pas la même chose.",
      en: "By effect, by space, by mood. One catalogue, three ways in, because an architect looking for a bathroom floor and an architect looking for “something warm” are not looking for the same thing.",
    },
  },

  work: [
    {
      image: "/work/web-lithos-desktop.jpg",
      alt: { fr: "Le site LITHOS sur écran", en: "The LITHOS site on desktop" },
      label: { fr: "Site web", en: "Website" },
    },
    {
      image: "/work/web-lithos-mobile.jpg",
      alt: {
        fr: "Le site LITHOS sur téléphone",
        en: "The LITHOS site on a phone",
      },
      label: { fr: "Mobile", en: "Mobile" },
    },
    {
      image: "/work/web-lithos-cover.jpg",
      alt: { fr: "Une fiche matière LITHOS", en: "A LITHOS material sheet" },
      label: { fr: "Catalogue", en: "Catalogue" },
    },
  ],

  outcome: {
    title: {
      fr: "Un catalogue parcouru comme une pierre se choisit.",
      en: "A catalogue browsed the way a stone is chosen.",
    },
    text: {
      fr: "Une identité tirée de la matière elle-même, trois entrées dans la gamme, et un système qui tient jusqu'au téléphone.",
      en: "An identity taken from the material itself, three routes into the range, and a system that holds down to a phone.",
    },
  },
};
