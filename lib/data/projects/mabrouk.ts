import type { ProjectCase } from "./types";

const MABROUK = { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" };

export const mabrouk: ProjectCase = {
  slug: "mabrouk",
  client: "Mabrouk Hôtel",
  year: "2026",
  category: { fr: "Hôtellerie", en: "Hospitality" },

  hero: {
    statement: {
      fr: "Une maison qui se reconnaît à sa lumière.",
      en: "A house you recognise by its light.",
    },
    intro: {
      fr: "Un hôtel dont tout le caractère est dans la matière   le laiton, le bois, le velours   et dont rien de tout cela n'arrivait jusqu'au client avant sa réservation. Nous avons reconstruit la marque autour de ce que la maison est déjà.",
      en: "A hotel whose whole character is in its materials   brass, wood, velvet   and none of which reached a guest before they booked. We rebuilt the brand around what the house already is.",
    },
    image: "/work/mabrouk/imgg1 (18).png",
    alt: {
      fr: "L'escalier du Mabrouk Hôtel sous ses lanternes de laiton",
      en: "The Mabrouk Hôtel staircase under its brass lanterns",
    },
  },

  transformation: {
    title: {
      fr: "D'un hôtel qu'il fallait avoir vu, à une maison qui se reconnaît avant d'y entrer.",
      en: "From a hotel you had to have seen, to a house you recognise before walking in.",
    },
    text: [
      {
        fr: "Le caractère était entièrement dans le bâtiment.",
        en: "The character was entirely inside the building.",
      },
      {
        fr: "Et rien n'en sortait : ni photographie, ni ton, ni direction.",
        en: "And none of it got out: no photography, no tone, no direction.",
      },
      {
        fr: "Nous avons pris la matière et la lumière comme point de départ.",
        en: "We took the materials and the light as the starting point.",
      },
      {
        fr: "La maison se reconnaît maintenant sur un écran comme dans son hall.",
        en: "The house now reads the same on a screen as it does in its own lobby.",
      },
    ],
  },

  chapters: [
    {
      key: "rebranding",
      labels: [{ fr: "Rebranding", en: "Rebranding" }],
      tone: "forest",
      title: {
        fr: "Le laiton, le bois et la lumière basse, tenus en système.",
        en: "Brass, wood and low light, held as a system.",
      },
      text: {
        fr: "Rien n'a été inventé : la palette, la lumière et la matière sont relevées sur le bâtiment lui-même   l'accueil, l'escalier, les lanternes, les claustras. La marque est ce que la maison fait déjà, écrit une fois pour toutes.",
        en: "Nothing was invented: the palette, the light and the materials were taken off the building itself   the desk, the staircase, the lanterns, the fretwork. The brand is what the house already does, written down once.",
      },
      shots: [
        {
          image: "/work/mabrouk/imgg1 (1).png",
          alt: {
            fr: "L'accueil du Mabrouk Hôtel",
            en: "The Mabrouk Hôtel reception",
          },
          label: { fr: "Accueil", en: "Reception" },
        },
        {
          image: "/work/mabrouk/imgg1 (18).png",
          alt: {
            fr: "L'escalier et ses lanternes de laiton",
            en: "The staircase and its brass lanterns",
          },
          label: { fr: "Escalier", en: "Staircase" },
        },
        {
          image: "/work/mabrouk/imgg1 (19).png",
          alt: {
            fr: "Les lanternes de laiton du Mabrouk Hôtel",
            en: "The Mabrouk Hôtel brass lanterns",
          },
          label: { fr: "Matière", en: "Material" },
        },
        {
          image: "/work/mabrouk/imgg1 (20).png",
          alt: {
            fr: "Le salon du Mabrouk Hôtel derrière son claustra",
            en: "The Mabrouk Hôtel lounge behind its fretwork screen",
          },
          label: { fr: "Salon", en: "Lounge" },
        },
      ],
      palette: {
        title: { fr: "Le langage visuel", en: "The visual language" },
        lead: {
          fr: "Quatre tons relevés sur le bâtiment, et pas un choisi dans un nuancier.",
          en: "Four tones taken off the building, and not one of them picked from a swatch book.",
        },
        colors: [
          {
            name: "Laiton",
            hex: "#B08D57",
            role: { fr: "Signature", en: "Signature" },
          },
          {
            name: "Grenat",
            hex: "#6E2230",
            role: { fr: "Accent", en: "Accent" },
          },
          {
            name: "Sable",
            hex: "#E9DDCB",
            role: { fr: "Respiration", en: "Breath" },
          },
          {
            name: "Bois",
            hex: "#2A211B",
            role: { fr: "Ancrage", en: "Anchor" },
          },
        ],
        states: [
          {
            title: { fr: "Ce qu'on voit en premier", en: "What you see first" },
            text: {
              fr: "Le laiton est partout dans la maison : les lanternes, les claustras, les poignées. Ce n'était pas une couleur de marque, c'était déjà la couleur du lieu.",
              en: "Brass is everywhere in the house: the lanterns, the screens, the handles. It was never a brand colour   it was already the colour of the place.",
            },
            colorIndex: 0,
          },
          {
            title: { fr: "Ce qui réchauffe", en: "What warms it" },
            text: {
              fr: "Le grenat vient du velours des salons. Il est rare, et c'est ce qui le rend chaud plutôt que lourd : employé partout, un rouge profond ferme une pièce.",
              en: "The garnet came from the velvet in the lounges. It is used sparingly, which is what makes it warm rather than heavy: used everywhere, a deep red closes a room.",
            },
            colorIndex: 1,
          },
          {
            title: { fr: "L'air entre les deux", en: "The air between them" },
            text: {
              fr: "Le sable est ce qui empêche le laiton et le grenat de se battre. C'est le mur, le drap, la page   la matière la plus présente et la moins remarquée.",
              en: "Sand is what keeps the brass and the garnet from fighting. It is the wall, the sheet, the page   the most present material and the least noticed.",
            },
            colorIndex: 2,
          },
          {
            title: { fr: "Ce qui tient le tout", en: "What holds it together" },
            text: {
              fr: "Le bois sombre ancre la lumière basse du soir. Sans lui la palette flotterait ; avec lui, une photographie prise à vingt heures tient sur un écran.",
              en: "The dark wood anchors the low evening light. Without it the palette would float; with it, a photograph taken at eight in the evening holds on a screen.",
            },
            colorIndex: 3,
          },
          {
            title: { fr: "Une maison, pas un standard", en: "A house, not a standard" },
            text: {
              fr: "Les quatre ensemble se reconnaissent sur une chambre comme sur un hall. C'est ce qui distingue un hôtel de la catégorie à laquelle il appartient.",
              en: "The four together are recognisable in a bedroom and in a lobby. That is what separates a hotel from the category it belongs to.",
            },
            colorIndex: 0,
          },
        ],
      },
    },
    {
      key: "positioning",
      labels: [{ fr: "Positionnement", en: "Positioning" }],
      tone: "canvas",
      title: {
        fr: "Une maison, pas une catégorie d'étoiles.",
        en: "A house, not a star rating.",
      },
      text: {
        fr: "Le marché vend des équipements : le nombre d'étoiles, la taille de la piscine, la liste de ce qui est inclus. Rien de tout cela ne distingue une maison d'une autre. Le repositionnement a écrit ce qu'un client raconte réellement en repartant   la lumière, le calme, l'accueil   et a laissé la liste aux comparateurs.",
        en: "The market sells amenities: the star count, the size of the pool, the list of what is included. None of it separates one house from another. The reposition wrote down what a guest actually tells people afterwards   the light, the quiet, the welcome   and left the list to the comparison sites.",
      },
    },
    {
      key: "marketing",
      labels: [{ fr: "Marketing", en: "Marketing" }],
      tone: "ink",
      title: {
        fr: "Photographier la maison comme on l'habite, pas comme on l'inventorie.",
        en: "Photograph the house the way it is lived in, not the way it is inventoried.",
      },
      text: {
        fr: "Une chambre d'hôtel photographiée de face, au flash, ressemble à toutes les autres. Chaque prise a donc été faite à l'heure où la maison est la plus elle-même, et cadrée sur ce qu'un client remarque vraiment : une matière, une lumière, un coin.",
        en: "A hotel bedroom shot square on, with flash, looks like every other one. So each frame was made at the hour the house is most itself, and framed on what a guest actually notices: a material, a light, a corner.",
      },
      shots: [
        {
          image: "/work/mabrouk/imgg1 (10).png",
          alt: {
            fr: "Le salon d'une suite du Mabrouk Hôtel",
            en: "The living area of a Mabrouk Hôtel suite",
          },
          label: { fr: "Suite", en: "Suite" },
        },
        {
          image: "/work/mabrouk/imgg1 (12).png",
          alt: {
            fr: "Une chambre du Mabrouk Hôtel",
            en: "A Mabrouk Hôtel bedroom",
          },
          label: { fr: "Chambre", en: "Bedroom" },
        },
        {
          image: "/work/mabrouk/imgg1 (16).png",
          alt: {
            fr: "Une chambre du Mabrouk Hôtel",
            en: "A Mabrouk Hôtel bedroom",
          },
          label: { fr: "Chambre", en: "Bedroom" },
        },
        {
          image: "/work/mabrouk/imgg1 (17).png",
          alt: {
            fr: "Le salon du Mabrouk Hôtel",
            en: "The Mabrouk Hôtel lounge",
          },
          label: { fr: "Salon", en: "Lounge" },
        },
      ],
      wall: [
        { image: "/work/mabrouk/imgg1 (2).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (13).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (14).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (15).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (21).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (22).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (23).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (24).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (25).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (26).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (27).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (32).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (44).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (50).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (56).png", alt: MABROUK },
        { image: "/work/mabrouk/imgg1 (9).png", alt: MABROUK },
      ],
    },
    {
      key: "revenue",
      labels: [
        { fr: "Revenu", en: "Revenue" },
        { fr: "Achat média", en: "Media Buying" },
      ],
      tone: "forest",
      title: {
        fr: "Vendre les nuits que personne ne vient chercher.",
        en: "Selling the nights nobody comes looking for.",
      },
      text: {
        fr: "Un hôtel n'a pas un problème de remplissage : il en a deux, et ils ne se ressemblent pas. La haute saison se vend seule et se défend sur le prix ; le reste de l'année se gagne en donnant une raison de venir. L'offre et la dépense ont été réglées séparément sur ces deux-là, et le budget dirigé vers la réservation directe plutôt que vers les plateformes.",
        en: "A hotel does not have one occupancy problem: it has two, and they look nothing alike. High season sells itself and is defended on price; the rest of the year is won by giving someone a reason to come. The offer and the spend were tuned separately against each, and the budget pointed at direct booking rather than at the platforms.",
      },
    },
  ],

  outcome: {
    title: {
      fr: "Un hôtel qui ressemble enfin à ce qu'il fait ressentir.",
      en: "A hotel that finally looks like what it feels like.",
    },
    text: {
      fr: "Une marque tirée du bâtiment plutôt que de sa catégorie, une photographie qui montre la maison à son heure, et un positionnement qui laisse la liste d'équipements aux comparateurs.",
      en: "A brand taken from the building rather than from its category, photography that shows the house at its own hour, and a position that leaves the amenity list to the comparison sites.",
    },
  },
};
