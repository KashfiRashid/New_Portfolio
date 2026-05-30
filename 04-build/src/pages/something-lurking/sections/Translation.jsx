import { SectionHead, Figure, Highlight } from '../primitives.jsx'

export default function Translation() {
  return (
    <section id="translation" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="WHAT WE BUILT"
        title="A working ship. A three-act story. The puzzles in between."
      />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          What landed on the headset is a complete, atmospheric space station you can move through, listen to, and repair. Eric modelled twelve environments so every act has a real place to happen.
        </p>
        <p>
          <Highlight>The world, the puzzles, and the moments were built in the same passes, so the ship feels lived-in instead of staged.</Highlight>
        </p>
      </div>
      <Figure
        className="mt-16"
        src="/something-lurking/fig-grab-interactions.png"
        alt="Three in-game screenshots showing the grab-based puzzle interactions."
        label="Figure 2"
        caption="Grab-based puzzles \u00b7 fusebox fuses (1:100) \u00b7 manual sliding door \u00b7 chip-grid wire puzzle (1:1000)"
      />
    </section>
  )
}
