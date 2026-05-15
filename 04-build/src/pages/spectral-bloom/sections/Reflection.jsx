import { SectionHead } from '../primitives.jsx'

// Draft reflection, written from the project source material (proposal,
// README, deck, the build itself). Kash to confirm or replace in his
// own words. See /public/spectral-bloom/ASSETS.md.
const PARAGRAPHS = [
  'The proposal was the most ambitious thing I had ever written down, and cutting it was the right call. A learned cross-modal diffusion pipeline on a GPU backend would have looked impressive on paper and run nowhere by the deadline. The shipped version is smaller and it actually works, and I would rather defend a thing that runs than a thing that reads well.',
  'The decision I am most sure about is keeping the AI layer additive. Claude shapes the palette, the spread, the camera, but it never gets veto power over the generative core. If it did, the system would feel puppeted instead of alive. The AI is a collaborator in the visuals, not the author of them, and that boundary is the whole design.',
  'What I did not get to is the part of the proposal I still believe in most: the user study. I think semantic interpretation beats frequency mapping, but I think it, I have not measured it. With more time the Creativity Support Index comparison is the first thing I would run.',
]

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="REFLECTION" title="What six weeks taught me." />
      <div className="max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        {PARAGRAPHS.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <p className="font-[family-name:var(--font-sans)] text-sm italic text-zinc-500">
          Draft, written from the project materials. Replace with your own words before this goes live.
        </p>
      </div>
    </section>
  )
}
