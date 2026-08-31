import type { ProjectCase } from "./types";

const MABROUK = { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" };

export const mabrouk: ProjectCase = {
  slug: "mabrouk",
  client: "Mabrouk Hôtel",
  year: "2026",
  category: { fr: "Hôtellerie", en: "Hospitality" },

  /** Bois #2A211B, out of the brand book. */
  ground: "#2A211B",

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

  fracture: {
    reality: [
      {
        fr: "Un bâtiment qui a tout son caractère : le laiton, le bois, le velours.",
        en: "A building with all its character: brass, wood, velvet.",
      },
      {
        fr: "Une lumière qui n'appartient qu'à cette maison.",
        en: "A light that belongs to this house alone.",
      },
      {
        fr: "Des clients qui repartent en parlant du calme et de l'accueil.",
        en: "Guests who leave talking about the quiet and the welcome.",
      },
    ],
    fracture: [
      {
        fr: "Rien de tout cela n'arrivait au client avant sa réservation.",
        en: "None of it reached a guest before they booked.",
      },
      {
        fr: "Ni photographie, ni ton, ni direction.",
        en: "No photography, no tone, no direction.",
      },
      {
        fr: "Un marché qui ne vend que des étoiles et des équipements.",
        en: "A market that sells nothing but stars and amenities.",
      },
    ],
    statement: {
      fr: "La maison avait un caractère. Personne ne le voyait avant d'entrer.",
      en: "The house had a character. Nobody saw it before walking in.",
    },
  },

  architecture: {
    decision: {
      fr: "Partir de la matière et de la lumière plutôt que de la catégorie.",
      en: "Start from the materials and the light rather than from the category.",
    },
    chain: [
      { fr: "Positionnement", en: "Positioning" },
      { fr: "Marque", en: "Brand" },
      { fr: "Photographie", en: "Photography" },
      { fr: "Média", en: "Media" },
      { fr: "Commercial", en: "Commercial" },
    ],
    text: {
      fr: "Le positionnement a laissé la liste d'équipements aux comparateurs et écrit ce qu'un client raconte réellement en repartant. La marque a relevé la palette et la lumière sur le bâtiment lui-même. La photographie montre la maison à l'heure où elle est le plus elle-même. Et l'offre comme la dépense ont été réglées séparément sur la haute saison et sur le reste de l'année, dirigées vers la réservation directe plutôt que vers les plateformes.",
      en: "Positioning left the amenity list to the comparison sites and wrote down what a guest actually tells people afterwards. The brand took its palette and its light off the building itself. The photography shows the house at the hour it is most itself. And the offer and the spend were tuned separately against high season and against the rest of the year, pointed at direct booking rather than at the platforms.",
    },
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
      blocks: [
        {
          key: "positioning",
          labels: [{ fr: "Positionnement", en: "Positioning" }],
          title: {
            fr: "Une maison, pas une catégorie d'étoiles.",
            en: "A house, not a star rating.",
          },
          text: {
            fr: "Le marché vend des équipements : le nombre d'étoiles, la taille de la piscine, la liste de ce qui est inclus. Rien de tout cela ne distingue une maison d'une autre. Le repositionnement a écrit ce qu'un client raconte réellement en repartant   la lumière, le calme, l'accueil   et a laissé la liste aux comparateurs.",
            en: "The market sells amenities: the star count, the size of the pool, the list of what is included. None of it separates one house from another. The reposition wrote down what a guest actually tells people afterwards   the light, the quiet, the welcome   and left the list to the comparison sites.",
          },
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
            title: {
              fr: "Une maison, pas un standard",
              en: "A house, not a standard",
            },
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
      blocks: [
        {
          key: "revenue",
          labels: [
            { fr: "Revenu", en: "Revenue" },
            { fr: "Achat média", en: "Media Buying" },
          ],
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
    },
  ],

  impact: {
    title: {
      fr: "Un hôtel qui ressemble enfin à ce qu'il fait ressentir.",
      en: "A hotel that finally looks like what it feels like.",
    },
    text: {
      fr: "Une marque tirée du bâtiment plutôt que de sa catégorie, une photographie qui montre la maison à son heure, et un positionnement qui laisse la liste d'équipements aux comparateurs.",
      en: "A brand taken from the building rather than from its category, photography that shows the house at its own hour, and a position that leaves the amenity list to the comparison sites.",
    },
  },

  work: [
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
};
