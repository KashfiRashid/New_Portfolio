import { SectionHead, Figure } from '../primitives.jsx'
import CourseworkToPuzzleTranslation from '../diagrams/CourseworkToPuzzleTranslation.jsx'

export default function Translation() {
  return (
    <section id="translation" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="COURSEWORK TO PUZZLE"
        title="The puzzles exist because the prior coursework proposed them."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          I came into Something Lurking with two prior assignments that already argued the answer. A1 said scaling needs mechanical purpose. A2 proposed pipe, valve, and circuit mechanics for the hand. The team built the space station puzzles on top of that thinking. The fusebox the player opens at 1:100 is the wire mechanic from A2. The circuit the player completes at 1:1000 is the same hand-mechanic miniaturised. The vent flow logic is the valve work.
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
