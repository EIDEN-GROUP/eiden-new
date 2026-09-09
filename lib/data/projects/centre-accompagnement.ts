import type { ProjectCase } from "./types";

/**
 * Centre d'accompagnement.
 *
 * ⚠ The copy below was drafted by EIDEN's assistant, not supplied by the
 * client   including the client's own name, which is written here as the
 * generic one it was given. The fracture, the decision and the outcome are a
 * plausible reconstruction rather than a record. Correct it, and give the
 * centre its real name, before this case is shown to anyone.
 *
 * The picture is a placeholder from `/media`, not the centre.
 *
 * No figure appears on this case. `metric` is only ever a number the client
 * has published under its own name.
 */
export const centreAccompagnement: ProjectCase = {
  slug: "centre-accompagnement",
  client: "Centre d'accompagnement",
  year: "2025",
  category: { fr: "Éducation", en: "Education" },
  location: { fr: "Agadir, Maroc", en: "Agadir, Morocco" },

  hero: {
    statement: {
      fr: "Accompagner jusqu'au bout.",
      en: "See it through.",
    },
    intro: {
      fr: "Un centre où le travail commence bien avant la première séance et ne s'arrête pas à la dernière   et dont rien, jusque-là, ne le disait.",
      en: "A centre where the work starts well before the first session and does not stop at the last   and where nothing, until now, said so.",
    },
    /* The same placeholder the card carries, so the two match. Neither is
       the centre. */
    image: "/media/eiden-hero-poster.jpg",
    alt: {
      fr: "Le centre d'accompagnement",
      en: "The support centre",
    },
  },

  fracture: {
    reality: [
      {
        fr: "Un suivi individuel, tenu dans la durée.",
        en: "One-to-one support, held over time.",
      },
      {
        fr: "Des familles qui reviennent, et qui recommandent.",
        en: "Families who come back, and who recommend.",
      },
      {
        fr: "Une équipe qui connaît chaque dossier.",
        en: "A team who knows every file.",
      },
    ],
    fracture: [
      {
        fr: "Un premier contact qui reposait entièrement sur le téléphone.",
        en: "A first contact resting entirely on the telephone.",
      },
      {
        fr: "Une promesse indistincte de celle du soutien scolaire d'à côté.",
        en: "A promise indistinguishable from the tutoring shop next door.",
      },
      {
        fr: "Un suivi réel, dont il ne restait aucune trace lisible.",
        en: "Real follow-through, leaving no legible trace.",
      },
    ],
    statement: {
      fr: "Le centre accompagnait vraiment. Il se présentait comme s'il donnait des cours.",
      en: "The centre truly accompanied. It introduced itself as if it gave lessons.",
    },
  },

  architecture: {
    decision: {
      fr: "Faire du suivi la promesse, et non le supplément.",
      en: "Make the follow-through the promise, not the extra.",
    },
    chain: [
      { fr: "Positionnement", en: "Positioning" },
      { fr: "Identité", en: "Identity" },
      { fr: "Site web", en: "Website" },
      { fr: "Parcours d'inscription", en: "Enrolment journey" },
    ],
    text: {
      fr: "Le positionnement a déplacé le sujet : ce que le centre vend n'est pas une heure de cours mais un accompagnement qui va au bout, ce qui n'est pas la même promesse ni le même prix. L'identité a été dessinée pour une famille qui hésite plutôt que pour un élève qui compare   plus proche du cabinet que de l'école. Le site raconte le suivi dans l'ordre où il se vit, du premier appel à la dernière séance, parce qu'un parent qui comprend la méthode n'a plus besoin d'être convaincu du tarif. Et le parcours d'inscription a été réduit à ce qu'un parent peut remplir depuis son téléphone, en une fois, sans rappeler pour savoir où en est le dossier.",
      en: "Positioning moved the subject: what the centre sells is not an hour of teaching but support that is seen through, which is neither the same promise nor the same price. The identity was drawn for a family hesitating rather than a pupil comparing   closer to a practice than to a school. The site tells the follow-through in the order it is lived, from the first call to the last session, because a parent who understands the method no longer needs convincing about the fee. And the enrolment journey was cut down to what a parent can complete from a phone, in one pass, without calling back to ask where the file stands.",
    },
  },

  chapters: [
    {
      key: "positioning",
      labels: [{ fr: "Positionnement", en: "Positioning" }],
      tone: "forest",
      title: {
        fr: "Ce qui se vend, c'est le suivi.",
        en: "What is sold is the follow-through.",
      },
      text: {
        fr: "Un centre qui se présente par ses matières se fait comparer à l'heure. Un centre qui se présente par sa méthode se fait choisir pour l'année   et ce n'est ni la même conversation, ni le même engagement.",
        en: "A centre introducing itself by its subjects gets compared by the hour. A centre introducing itself by its method gets chosen for the year   and that is neither the same conversation nor the same commitment.",
      },
    },
    {
      key: "identity",
      labels: [{ fr: "Identité", en: "Identity" }],
      tone: "canvas",
      title: {
        fr: "Dessinée pour le parent qui hésite.",
        en: "Drawn for the parent who hesitates.",
      },
      text: {
        fr: "L'interlocuteur n'est pas l'élève. C'est une famille qui confie quelque chose, et qui cherche des signes de sérieux plutôt que des signes d'enthousiasme. L'identité a été réglée sur ce registre.",
        en: "The audience is not the pupil. It is a family entrusting something, looking for signs of seriousness rather than signs of enthusiasm. The identity was tuned to that register.",
      },
    },
    {
      key: "enrolment",
      labels: [
        { fr: "Site web", en: "Website" },
        { fr: "Parcours d'inscription", en: "Enrolment journey" },
      ],
      tone: "ink",
      title: {
        fr: "Du premier appel à la dernière séance.",
        en: "From the first call to the last session.",
      },
      text: {
        fr: "Le site suit l'ordre réel de l'accompagnement plutôt que l'ordre d'un catalogue. L'inscription se termine depuis un téléphone, en une fois, et le dossier n'a plus besoin d'un rappel pour avancer.",
        en: "The site follows the real order of the support rather than the order of a catalogue. Enrolment finishes from a phone, in one pass, and a file no longer needs a call-back to move.",
      },
    },
  ],

  impact: {
    title: {
      fr: "Un centre qu'on choisit pour sa méthode, pas pour son tarif horaire.",
      en: "A centre chosen for its method, not its hourly rate.",
    },
    text: {
      fr: "Une promesse qui ne se confond plus avec celle du soutien scolaire d'à côté, un premier contact qui ne dépend plus du téléphone, et une inscription qui se termine en une fois.",
      en: "A promise no longer confused with the tutoring shop next door, a first contact no longer resting on the telephone, and an enrolment that finishes in one pass.",
    },
  },
};
