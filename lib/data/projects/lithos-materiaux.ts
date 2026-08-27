import type { ProjectCase } from "./types";

/**
 * Five disciplines and four files. The design system and the motion are set in
 * type   both are things you feel across every other panel rather than things
 * there is a picture of.
 */
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
    image: "/work/lithos-materiaux/luthos hero.png",
    alt: { fr: "Le catalogue LITHOS", en: "The LITHOS catalogue" },
  },

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

  chapters: [
    {
      key: "art-direction",
      labels: [{ fr: "Direction artistique", en: "Art Direction" }],
      tone: "forest",
      title: {
        fr: "Une identité qui vient de la carrière, pas d'une palette générique.",
        en: "An identity that comes from the quarry, not a stock palette.",
      },
      text: {
        fr: "Les tons sont relevés sur les pierres elles-mêmes : le calcaire, le travertin, le veinage du marbre. Rien n'a été choisi dans un nuancier, ce qui est la seule façon pour une identité de matériaux de ne pas mentir sur ce qu'elle vend.",
        en: "The tones were taken off the stones themselves: the limestone, the travertine, the veining of the marble. Nothing was picked from a swatch book, which is the only way an identity for materials avoids lying about what it sells.",
      },
      shots: [
        {
          image: "/work/lithos-materiaux/lotus card.png",
          alt: { fr: "La marque LITHOS", en: "The LITHOS mark" },
          label: { fr: "Marque", en: "Brand" },
        },
        {
          image: "/work/lithos-materiaux/luthos hero.png",
          alt: { fr: "L'univers LITHOS", en: "The LITHOS world" },
          label: { fr: "Univers", en: "World" },
        },
      ],
    },
    {
      key: "design-system",
      labels: [{ fr: "Design system", en: "Design System" }],
      tone: "canvas",
      title: {
        fr: "Un système qui tient de l'écran large jusqu'au téléphone.",
        en: "One system holding from a wide screen down to a phone.",
      },
      text: {
        fr: "Une échelle typographique, six espacements, trois façons de poser une image. C'est peu, et c'est précisément ce qui permet d'ajouter une matière à la gamme sans avoir à redessiner une page.",
        en: "One type scale, six spacings, three ways to place an image. It is very little, and that is exactly what lets a material be added to the range without a page having to be redrawn.",
      },
    },
    {
      key: "website",
      labels: [{ fr: "Site web", en: "Website" }],
      tone: "ink",
      title: {
        fr: "Le catalogue comme produit, pas comme annexe.",
        en: "The catalogue as the product, not a supplement to it.",
      },
      text: {
        fr: "Sur la plupart des sites de fournisseurs, le catalogue est ce qui vient après la présentation de la société. Ici c'est l'inverse : la gamme est la page d'accueil, et l'entreprise se raconte à travers ce qu'elle a en carrière.",
        en: "On most supplier sites the catalogue is what comes after the company introduction. Here it is the other way round: the range is the homepage, and the company tells its story through what it has in the quarry.",
      },
      shots: [
        {
          image: "/work/lithos-materiaux/web-lithos-desktop.jpg",
          alt: { fr: "Le site LITHOS sur écran", en: "The LITHOS site on desktop" },
          label: { fr: "Desktop", en: "Desktop" },
        },
        {
          image: "/work/lithos-materiaux/web-lithos-mobile.jpg",
          fit: "contain",
          alt: {
            fr: "Le site LITHOS sur téléphone",
            en: "The LITHOS site on a phone",
          },
          label: { fr: "Mobile", en: "Mobile" },
        },
      ],
    },
    {
      key: "catalogue-experience",
      labels: [{ fr: "Expérience catalogue", en: "Catalogue Experience" }],
      tone: "forest",
      title: {
        fr: "Trois chemins vers la même pierre.",
        en: "Three routes to the same stone.",
      },
      text: {
        fr: "Par effet, par espace, par ambiance. Le même catalogue, trois entrées, parce qu'un architecte qui cherche un sol de salle de bain et un architecte qui cherche « quelque chose de chaud » ne cherchent pas la même chose.",
        en: "By effect, by space, by mood. One catalogue, three ways in, because an architect looking for a bathroom floor and an architect looking for “something warm” are not looking for the same thing.",
      },
      shots: [
        {
          image: "/work/lithos-materiaux/web-lithos-cover.jpg",
          alt: { fr: "Une fiche matière LITHOS", en: "A LITHOS material sheet" },
          label: { fr: "Fiche matière", en: "Material sheet" },
        },
      ],
    },
    {
      key: "motion",
      labels: [{ fr: "Motion", en: "Motion" }],
      tone: "canvas",
      title: {
        fr: "Rien ne bouge tant que le lecteur ne bouge pas.",
        en: "Nothing moves until the reader does.",
      },
      text: {
        fr: "Le mouvement ne sert qu'à faire tourner la lumière sur une surface   c'est-à-dire à montrer la seule chose qu'une photographie fixe ne montre pas d'une pierre. Tout le reste tient immobile.",
        en: "The motion exists only to turn the light across a surface   which is to say, to show the one thing a still photograph cannot tell you about a stone. Everything else holds still.",
      },
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
