import type { ProjectCase } from "./types";

/**
 * Five disciplines and four files. The shop side and the conditions the site is
 * actually used in are set in type: both are decisions rather than screens, and
 * a fourth screenshot of the same catalogue would say nothing about either.
 */
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
    image: "/work/droguerie-souss/hero drougure.png",
    alt: {
      fr: "Le comptoir Souss Droguerie",
      en: "The Souss Droguerie trade counter",
    },
  },

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

  chapters: [
    {
      key: "art-direction",
      labels: [{ fr: "Direction artistique", en: "Art Direction" }],
      tone: "forest",
      title: {
        fr: "Une présence qui montre la compétence au lieu de l'affirmer.",
        en: "A presence that shows the competence instead of claiming it.",
      },
      text: {
        fr: "Le comptoir, les rayonnages, les mains qui servent : la direction artistique part de ce qui existe déjà dans le magasin plutôt que d'images de banque. Vingt ans de métier se montrent   ils ne se déclarent pas dans un slogan.",
        en: "The counter, the shelves, the hands doing the serving: the art direction starts from what is already in the shop rather than from stock photography. Twenty years of trade is shown   it is not declared in a strapline.",
      },
      shots: [
        {
          image: "/work/droguerie-souss/drogurie souss card.png",
          alt: {
            fr: "La marque Souss Droguerie",
            en: "The Souss Droguerie mark",
          },
          label: { fr: "Marque", en: "Brand" },
        },
        {
          image: "/work/droguerie-souss/hero drougure.png",
          alt: {
            fr: "Le comptoir Souss Droguerie",
            en: "The Souss Droguerie trade counter",
          },
          label: { fr: "Le comptoir", en: "The counter" },
        },
      ],
    },
    {
      key: "website",
      labels: [{ fr: "Site web", en: "Website" }],
      tone: "canvas",
      title: {
        fr: "Construit autour d'un seul acte : passer l'appel.",
        en: "Built around one act: making the call.",
      },
      text: {
        fr: "Dans ce métier la transaction se conclut au téléphone, quoi qu'en dise le e-commerce. Le numéro reste donc à l'écran du haut en bas de chaque page, et tout ce que le site fait par ailleurs sert à ce qu'on appelle déjà renseigné.",
        en: "In this trade the transaction still closes on the phone, whatever e-commerce would like to believe. So the number stays on screen from the top of every page to the bottom, and everything else the site does is there so that the call starts already informed.",
      },
      shots: [
        {
          image: "/work/droguerie-souss/web-droguerie-souss-desktop.jpg",
          alt: {
            fr: "Le site Souss Droguerie sur écran",
            en: "The Souss Droguerie site on desktop",
          },
          label: { fr: "Desktop", en: "Desktop" },
        },
        {
          image: "/work/droguerie-souss/web-droguerie-souss-mobile.jpg",
          fit: "contain",
          alt: {
            fr: "Le site Souss Droguerie sur téléphone",
            en: "The Souss Droguerie site on a phone",
          },
          label: { fr: "Mobile", en: "Mobile" },
        },
      ],
    },
    {
      key: "e-commerce",
      labels: [{ fr: "E-commerce", en: "E-commerce" }],
      tone: "ink",
      title: {
        fr: "La gamme, tarifée et commandable.",
        en: "The range, priced and orderable.",
      },
      text: {
        fr: "Un chef de chantier qui commande à sept heures du matin n'attend pas un devis : il veut un prix, une quantité et une date de livraison, et il veut les trois avant d'avoir fini son café.",
        en: "A site manager ordering at seven in the morning is not waiting for a quote: they want a price, a quantity and a delivery date, and they want all three before the coffee is finished.",
      },
    },
    {
      key: "catalogue",
      labels: [{ fr: "Catalogue", en: "Catalogue" }],
      tone: "forest",
      title: {
        fr: "La gamme, et ce qu'il en reste.",
        en: "The range, and what is left of it.",
      },
      text: {
        fr: "C'est ce que le négoce vient chercher : pas une brochure, mais l'état réel du stock. Un catalogue qui dit « en rupture » vaut mieux qu'un catalogue qui ne dit rien.",
        en: "This is what the trade actually comes for: not a brochure, but the real state of the stock. A catalogue that says “out of stock” is worth more than one that says nothing.",
      },
      shots: [
        {
          image: "/work/droguerie-souss/web-droguerie-souss-cover.jpg",
          alt: {
            fr: "Le catalogue Souss Droguerie",
            en: "The Souss Droguerie catalogue",
          },
          label: { fr: "Catalogue", en: "Catalogue" },
        },
      ],
    },
    {
      key: "digital-experience",
      labels: [{ fr: "Expérience digitale", en: "Digital Experience" }],
      tone: "canvas",
      title: {
        fr: "Utilisable par un chef de chantier, entre deux livraisons.",
        en: "Usable by a site manager, between two deliveries.",
      },
      text: {
        fr: "Une seule main, des gants, du soleil sur l'écran et une connexion qui tombe : ce sont les conditions réelles, et elles ont décidé de la taille des boutons plus sûrement que n'importe quelle grille.",
        en: "One hand, gloves on, sun on the screen and a connection that drops: those are the real conditions, and they decided the size of the buttons more surely than any grid could.",
      },
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
