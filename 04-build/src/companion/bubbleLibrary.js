// Companion Bubble Library
// Source of truth: /01-brand-book/04-companion-spec.md
//
// 60 bubbles across 7 trigger categories:
//   E — Entry             (7 bubbles)
//   H — Hover             (18 bubbles)
//   C — Click             (8 bubbles)
//   S — Scroll            (7 bubbles)
//   I — Idle              (8 bubbles)
//   X — Exit-intent       (6 bubbles)
//   R — Returning visitor (6 bubbles)
//
// Variables:
//   {name}  — replaced with visitor name (or 'stranger')
//   {color} — replaced with visitor color label
//
// Rules (enforced in <Companion />):
//   - Max 5–8 bubbles per session
//   - 8s cooldown between bubbles
//   - Per-element cap: max 1 bubble per element ID per session
//   - Idle reel fires at most once per session
//
// v1 implementation: scripted from this library, not LLM-powered.
// v2 may add LLM augmentation with this library as voice anchor.

const bubbles = [
  // ─── ENTRY (E) ─────────────────────────────────────────────────────────
  { id: 'E1', trigger: 'entry', context: 'onboarding-complete',
    text: "hey {name}. you're {color}. sit anywhere." },
  { id: 'E2', trigger: 'entry', context: 'onboarding-skipped',
    text: "no name. fine. you're {color} by default." },
  { id: 'E3', trigger: 'entry', context: 'home-after-3s',
    text: "the line's not a typo. read it again." },
  { id: 'E4', trigger: 'entry', context: 'voice-page',
    text: "these are real takes. i had to argue myself into most of them." },
  { id: 'E5', trigger: 'entry', context: 'eye-page',
    text: "these aren't trends. they're just things i kept saving." },
  { id: 'E6', trigger: 'entry', context: 'work-page',
    text: "six. that's the cut. the rest are below if you want." },
  { id: 'E7', trigger: 'entry', context: 'origin-page',
    text: "this is the page where i had to be specific." },

  // ─── HOVER (H) ─────────────────────────────────────────────────────────
  { id: 'H1', trigger: 'hover', context: 'home-headline',
    text: "this is the line. don't ask." },
  { id: 'H2', trigger: 'hover', context: 'home-card-voice',
    text: "voice. opinions i'd actually defend." },
  { id: 'H3', trigger: 'hover', context: 'home-card-eye',
    text: "eye. things i find quietly beautiful." },
  { id: 'H4', trigger: 'hover', context: 'home-card-work',
    text: "work. six projects. each one taught me something specific." },
  { id: 'H5', trigger: 'hover', context: 'home-card-process',
    text: "process. how i conduct the orchestra." },
  { id: 'H6', trigger: 'hover', context: 'home-card-people',
    text: "people. named credits. the site doesn't pretend i did this alone." },
  { id: 'H7', trigger: 'hover', context: 'home-card-origin',
    text: "origin. dhaka → delta. the long route." },
  { id: 'H8', trigger: 'hover', context: 'home-card-hof',
    text: "this is the closest thing to a contact form i'll let you have." },
  { id: 'H9', trigger: 'hover', context: 'voice-opinion-1',
    text: "this one i'd actually defend." },
  { id: 'H10', trigger: 'hover', context: 'voice-opinion-2',
    text: "took me a while to be willing to say this." },
  { id: 'H11', trigger: 'hover', context: 'voice-opinion-3',
    text: "this one's the one i'd argue with you about." },
  { id: 'H12', trigger: 'hover', context: 'voice-opinion-4',
    text: "borrowed the bones of this from sazzad. he won't admit it." },
  { id: 'H13', trigger: 'hover', context: 'voice-opinion-5',
    text: "still working on this one. the take's getting sharper." },
  { id: 'H14', trigger: 'hover', context: 'voice-opinion-6',
    text: "this is the one i wrote at 2am. obviously." },
  { id: 'H15', trigger: 'hover', context: 'eye-personal-image',
    text: "this one i looked at a lot in 2024." },
  { id: 'H16', trigger: 'hover', context: 'eye-reference',
    text: "save this one. it's the bar." },
  { id: 'H17', trigger: 'hover', context: 'work-card-blu',
    text: "BLU. proudest of the sound. listen at 0:42." },
  { id: 'H18', trigger: 'hover', context: 'work-card-spectral-bloom',
    text: "this one taught me to design for ears, not just eyes." },
  { id: 'H19', trigger: 'hover', context: 'work-card-something-lurking',
    text: "the brief said 'calm.' i shipped 'quietly unsettling.'" },
  { id: 'H20', trigger: 'hover', context: 'work-card-bc-connect',
    text: "my first antigravity build. learned how it wants to be used." },
  { id: 'H21', trigger: 'hover', context: 'work-card-pitchflow',
    text: "the deck that won the room." },
  { id: 'H22', trigger: 'hover', context: 'work-card-foresee',
    text: "working with sazzad on this one." },
  { id: 'H28', trigger: 'hover', context: 'work-card-nightshift',
    text: "can't show this one yet. still building it after hours." },
  { id: 'H25', trigger: 'hover', context: 'process-chair-antigravity',
    text: "this one's the workhorse. shipped bc connect end-to-end." },
  { id: 'H26', trigger: 'hover', context: 'process-chair-cowork',
    text: "this brand book was made here, actually." },
  { id: 'H27', trigger: 'hover', context: 'process-chair-stitch',
    text: "first-pass only. don't ask it for hi-fi." },
  { id: 'H29', trigger: 'hover', context: 'people-tazwar',
    text: "the writing on this site is downstream of his." },
  { id: 'H30', trigger: 'hover', context: 'people-sazzad',
    text: "longest collaborator. blu wouldn't sound like blu without him." },
  { id: 'H31', trigger: 'hover', context: 'people-father',
    text: "this one's hard to write in one line." },
  { id: 'H34', trigger: 'hover', context: 'footer-changelog',
    text: "this updates when i ship something. it's not a flex; it's accountability." },
  { id: 'H35', trigger: 'hover', context: 'footer-reset',
    text: "reset wipes your name and color. won't break anything." },

  // ─── CLICK (C) ─────────────────────────────────────────────────────────
  { id: 'C1', trigger: 'click', context: 'voice-entry',
    text: "these are real takes. i had to argue myself into most of them." },
  { id: 'C2', trigger: 'click', context: 'voice-essay',
    text: "this one's about the tool taking over and me letting it." },
  { id: 'C3', trigger: 'click', context: 'eye-entry',
    text: "these aren't trends. they're just things i kept saving." },
  { id: 'C4', trigger: 'click', context: 'work-entry',
    text: "six. that's the cut. the rest are below if you want." },
  { id: 'C5', trigger: 'click', context: 'project-page-entry',
    text: "this one's longer. take your time." },
  { id: 'C6', trigger: 'click', context: 'audio-play-blu',
    text: "hold on. listen." },
  { id: 'C7', trigger: 'click', context: 'process-entry',
    text: "this is the framing i argue for. tools are tools. the conducting matters." },
  { id: 'C8', trigger: 'click', context: 'people-entry',
    text: "this page exists because the alternative — pretending — is worse." },
  { id: 'C10', trigger: 'click', context: 'hof-entry',
    text: "this is what i replaced the contact form with. start at the bottom, scroll up." },
  { id: 'C11', trigger: 'click', context: 'hof-empty-state',
    text: "empty. for now. you could change that." },
  { id: 'C12', trigger: 'click', context: 'hof-submit-panel-open',
    text: "keep it short. if you can't say it in 280, i can't ship it." },
  { id: 'C13', trigger: 'click', context: 'hof-submitted',
    text: "got it. i read every one. only the ones i ship show up here." },

  // ─── SCROLL (S) ────────────────────────────────────────────────────────
  { id: 'S1', trigger: 'scroll', context: 'voice-50pct',
    text: "a few more below." },
  { id: 'S2', trigger: 'scroll', context: 'eye-references',
    text: "these are the ones i actually read." },
  { id: 'S3', trigger: 'scroll', context: 'project-taught',
    text: "this one connects to opinion 03 if you've been to voice." },
  { id: 'S4', trigger: 'scroll', context: 'process-the-score',
    text: "this is what a working week actually looks like. nothing dramatic." },
  { id: 'S5', trigger: 'scroll', context: 'process-what-this-isnt',
    text: "i had to write this because people read it wrong otherwise." },
  { id: 'S6', trigger: 'scroll', context: 'people-more-to-come',
    text: "i'm not adding names without asking. that's the bar." },
  { id: 'S7', trigger: 'scroll', context: 'origin-dhaka',
    text: "this part i had to write specifically. anything general fell flat." },

  // ─── IDLE (I) ──────────────────────────────────────────────────────────
  // These trigger the idle reel — see useIdleDetection + reelPlaylist.
  { id: 'I1', trigger: 'idle', context: 'home',
    text: "want to see what i was working on at 2am last tuesday?",
    surfacesReel: true },
  { id: 'I2', trigger: 'idle', context: 'voice',
    text: "hold on. let me show you the desk where these took shape.",
    surfacesReel: true },
  { id: 'I3', trigger: 'idle', context: 'voice-second',
    text: "still here. okay. let me play you something." },
  { id: 'I4', trigger: 'idle', context: 'eye',
    text: "if you stop moving, i can show you a thing.",
    surfacesReel: true },
  { id: 'I5', trigger: 'idle', context: 'work-blu',
    text: "hold on. let me play you something from BLU.",
    surfacesReel: true, reelClip: 'blu-0-42' },
  { id: 'I6', trigger: 'idle', context: 'work-other',
    text: "want to see how this one came together?",
    surfacesReel: true },
  { id: 'I7', trigger: 'idle', context: 'origin',
    text: "this is a clip from delta. quiet one.",
    surfacesReel: true },
  { id: 'I8', trigger: 'idle', context: 'generic',
    text: "no rush. keep reading." },

  // ─── EXIT-INTENT (X) ───────────────────────────────────────────────────
  { id: 'X1', trigger: 'exit-intent', context: 'home',
    text: "leaving? cool. tell a friend, or don't." },
  { id: 'X2', trigger: 'exit-intent', context: 'voice',
    text: "the hall of fame's at the bottom if you have ten more seconds. it's where the site evolves." },
  { id: 'X3', trigger: 'exit-intent', context: 'footer-region',
    text: "you're at the bottom. that's where the small things live." },
  { id: 'X4', trigger: 'exit-intent', context: 'work',
    text: "six projects. i hope at least one stuck." },
  { id: 'X5', trigger: 'exit-intent', context: 'origin',
    text: "long way around. thanks for reading it." },
  { id: 'X6', trigger: 'exit-intent', context: 'hof',
    text: "if you have a note, drop it. monthly review." },

  // ─── RETURNING (R) ─────────────────────────────────────────────────────
  { id: 'R1', trigger: 'returning', context: 'visit-2',
    text: "you're back. the site's a little different than last time." },
  { id: 'R2', trigger: 'returning', context: 'visit-3',
    text: "third visit. i remember you. that's all i've got, but it counts." },
  { id: 'R3', trigger: 'returning', context: 'visit-many',
    text: "okay. you've been around. is something keeping you?" },
  { id: 'R4', trigger: 'returning', context: 'new-hof-since-last',
    text: "someone else left a suggestion since you were here. worth a look." },
  { id: 'R5', trigger: 'returning', context: 'own-hof-entry-found',
    text: "this one's yours, by the way." },
  { id: 'R6', trigger: 'returning', context: 'pending-submission',
    text: "hey {name}. yours is in the queue. monthly review." },
]

/* -----------------------------------------------------------------------
   Helpers
   ----------------------------------------------------------------------- */

/**
 * Look up a bubble by ID.
 */
export function getBubble(id) {
  return bubbles.find(b => b.id === id)
}

/**
 * Filter bubbles by trigger category.
 */
export function getBubblesByTrigger(trigger) {
  return bubbles.filter(b => b.trigger === trigger)
}

/**
 * Substitute {name} and {color} into a bubble text given a visitor object.
 * @param {string} text — raw bubble text with placeholders
 * @param {{name: string, color: {label: string}}} visitor
 */
export function renderBubbleText(text, visitor) {
  const name = visitor?.name || 'stranger'
  const colorLabel = visitor?.color?.label || 'slate'
  return text
    .replaceAll('{name}', name)
    .replaceAll('{color}', colorLabel)
}

export default bubbles
