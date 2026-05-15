import { SectionHead } from '../primitives.jsx'

const ACTIONS = [
  {
    label: 'ACTION 01',
    title: 'Held the vision as Creative Director.',
    body: "I pitched the central concept and held the creative direction across story, tone, and aesthetic. The two-environment contrast, the feather as the only saturated color in The Dims, the wolf as a sound rather than a body. Those calls were mine to hold. My teammates were solving real production problems in animation, rigging, lighting, and cinematography. I made sure every one of those problems was solving for the same film.",
  },
  {
    label: 'ACTION 02',
    title: 'Built both worlds: Lumaland and The Dims.',
    body: "I modeled both environments end to end. Lumaland is the soft, glowing meadow the duckling starts in: warm light, calm grass, dusk sky. The Dims is the wasteland the feather pulls it into: fog, broken trees, harsh moonlight, long shadows. The two were designed to feel like opposites of the same world. That contrast is the visual carrier for the story's theme, so the environments do narrative work, not decoration.",
  },
  {
    label: 'ACTION 03',
    title: 'Designed the sound, including the unseen wolf.',
    body: "I designed the audio for the film. The wolf is the antagonist, but it is never fully shown. It exists through howls, footsteps, and shadow cues. Around that, I built the atmospheric layers of The Dims: wind through bones, distant howls, swamp suction, the gust storm in Act 02. The sound is what makes the wasteland feel dangerous before anything dangerous appears on screen.",
  },
  {
    label: 'ACTION 04',
    title: 'Made the cross-team calls a director has to make.',
    body: "Creative direction on a team of six is mostly small decisions made fast. Which storyboard frame survives. Whether the feather glow reads as light or paint. Whether a sound cue should arrive before the visual or behind it. I made those calls, kept them consistent, and protected the through-line so the film didn't drift act to act. The team did the heavy lifting. I held the shape.",
  },
]

export default function WhatIDid() {
  return (
    <section id="what-i-did" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="WHAT I DID" title="I held the vision, built the worlds, designed the sound." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          Three roles, one project. Creative Director carrying the vision. Environment Modeler building the two worlds the duckling moves through. Sound Engineer turning the antagonist into audio. Each one was a different kind of work. All three were mine.
        </p>
      </div>
      <div>
        {ACTIONS.map((action) => (
          <article key={action.label} className="space-y-8 py-16">
            <div className="space-y-3">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[#4FC3F7]">
                {action.label}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-[28px] font-normal tracking-[-0.02em] text-white lg:text-[36px]">
                {action.title}
              </h3>
              <p className="max-w-[720px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
                {action.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
