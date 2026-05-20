import { SectionHead, Figure } from '../primitives.jsx'
import CourseworkToPuzzleTranslation from '../diagrams/CourseworkToPuzzleTranslation.jsx'

export default function Translation() {
  return (
    <section id="translation" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="FOUNDATION TO BUILD"
        title="The puzzles exist because earlier design papers proposed them."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          I came into Something Lurking with two earlier design papers I'd written. The first argued that scaling without mechanical purpose is empty spectacle — shrinking has to do something. The second proposed specific mechanics: pipe, valve, and circuit work driven by the hand at small scale. The team built the space station puzzles on top of that thinking. The fusebox the player opens at 1:100 is the wire mechanic from the second paper. The circuit the player completes at 1:1000 is the same hand-mechanic miniaturised. The vent flow logic is the valve work.
        </p>
      </div>

      <div className="mt-16">
        <CourseworkToPuzzleTranslation />
      </div>

      <Figure
        className="mt-16"
        src="/something-lurking/fig-grab-interactions.png"
        alt="Three in-game screenshots showing the grab-based puzzle interactions: a fusebox with multi-color fuses, a manually dragged sci-fi door, and the chip-space wire grid puzzle."
        label="Figure 2"
        caption="Grab-based puzzles · fusebox fuses (1:100) · manual sliding door · chip-grid wire puzzle (1:1000)"
      />
    </section>
  )
}
