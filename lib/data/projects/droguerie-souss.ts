import type { ProjectCase } from "./types";

/** No `identity` block   art direction is sold here, but nothing on file shows it. */
export const droguerieSouss: ProjectCase = {
  slug: "droguerie-souss",
  client: "Souss Droguerie",
  year: "2026",
  category: { fr: "Matériaux", en: "Materials" },
  location: { fr: "Agadir, Maroc", en: "Agadir, Morocco" },

  hero: {
    statement: {
      fr: "Concevoir pour une seule chose : que le téléphone sonne.",
      en: "Design for one outcome: the phone rings.",
    },
    intro: {
      fr: "Vingt ans de distribution de matériaux de construction, avec une présence digitale qui ne montrait ni la compétence, ni la réactivité, ni le stock.",
      en: "Twenty years of distributing building materials, with a digital presence that showed none of the competence, the speed, or the stock.",
    },
    image: "/work/hero drougure.png",
    alt: {
      fr: "Le comptoir Souss Droguerie",
      en: "The Souss Droguerie trade counter",
    },
  },

  services: [
    {
      name: { fr: "Direction artistique", en: "Art Direction" },
      note: {
        fr: "Une présence qui montre la compétence au lieu de l'affirmer.",
        en: "A presence that shows the competence instead of claiming it.",
      },
    },
    {
      name: { fr: "Site web", en: "Website" },
      note: {
        fr: "Construit autour d'un seul acte : passer l'appel.",
        en: "Built around one act: making the call.",
      },
    },
    {
      name: { fr: "E-commerce", en: "E-commerce" },
      note: {
        fr: "La gamme, tarifée et commandable.",
        en: "The range, priced and orderable.",
      },
    },
    {
      name: { fr: "Catalogue", en: "Catalogue" },
      note: {
        fr: "Honnête sur ce qui est réellement disponible.",
        en: "Honest about what is actually available.",
      },
    },
    {
      name: { fr: "Expérience digitale", en: "Digital Experience" },
      note: {
        fr: "Utilisable par un chef de chantier, entre deux livraisons.",
        en: "Usable by a site manager, between two deliveries.",
      },
    },
  ],

  transformation: {
    title: {
      fr: "De vingt ans de compétence invisible à un comptoir qu'on peut vérifier avant d'appeler.",
      en: "From twenty years of invisible competence to a counter you can check before you call.",
    },
    text: [
      {
        fr: "Personne ne voyait le savoir-faire.",
        en: "Nobody could see the expertise.",
      },
      {
        fr: "Et personne ne voyait le stock.",
        en: "And nobody could see the stock.",
      },
      {
        fr: "Le site montre maintenant les deux.",
        en: "The site now shows both.",
      },
      {
        fr: "Et garde le numéro à l'écran, parce que la transaction se conclut toujours au téléphone.",
        en: "And keeps the number on screen, because the transaction still finishes on the phone.",
      },
    ],
  },

  feature: {
    label: { fr: "Catalogue", en: "Catalogue" },
    title: {
      fr: "La gamme, et ce qu'il en reste.",
      en: "The range, and what is left of it.",
    },
    text: {
      fr: "C'est ce que le négoce vient chercher : pas une brochure, mais l'état réel du stock. Un catalogue qui dit « en rupture » vaut mieux qu'un catalogue qui ne dit rien.",
      en: "This is what the trade actually comes for: not a brochure, but the real state of the stock. A catalogue that says “out of stock” is worth more than one that says nothing.",
    },
  },

  work: [
    {
      image: "/work/web-droguerie-souss-desktop.jpg",
      alt: {
        fr: "Le site Souss Droguerie sur écran",
        en: "The Souss Droguerie site on desktop",
      },
      label: { fr: "Site web", en: "Website" },
    },
    {
      image: "/work/web-droguerie-souss-mobile.jpg",
      alt: {
        fr: "Le site Souss Droguerie sur téléphone",
        en: "The Souss Droguerie site on a phone",
      },
      label: { fr: "Mobile", en: "Mobile" },
    },
    {
      image: "/work/web-droguerie-souss-cover.jpg",
      alt: {
        fr: "L'expérience catalogue Souss Droguerie",
        en: "The Souss Droguerie catalogue experience",
      },
      label: { fr: "Expérience digitale", en: "Digital Experience" },
    },
  ],

  outcome: {
    title: {
      fr: "Vingt ans de métier, enfin visibles avant le premier appel.",
      en: "Twenty years of trade, finally visible before the first call.",
    },
    text: {
      fr: "Une compétence montrée plutôt qu'affirmée, un catalogue honnête sur la disponibilité, et un site construit autour d'un seul acte.",
      en: "Competence shown rather than claimed, a catalogue honest about availability, and a site built around one act.",
    },
  },
};
