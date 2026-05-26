import { SectionHead, Highlight } from '../primitives.jsx'
import ThreeActStructure from '../diagrams/ThreeActStructure.jsx'

export default function Premise() {
  return (
    <section id="premise" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE PREMISE" title="The ship is failing. You are the only one left." />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Jack starts the shift in the corridor with Captain Harry on the radio. A routine fix. A fusebox on the upper deck needs a wiring repair. Jack shrinks to 1:100 to climb inside the box and finish the job.
        </p>
        <p>
          Then the power dies. The captain&rsquo;s radio cuts. Jack finds the captain&rsquo;s cracked helmet alone in the dark. To restore the station Jack has to navigate the vents and shrink again, this time to 1:1000, to repair the main computer from inside its chip-space.
        </p>
        <p>
          Throughout the experience something else is on the ship. Sound cues build tension. Environmental details suggest watching. <Highlight>The presence is never visually resolved. The threat is implied. By design.</Highlight>
        </p>
      </div>

      <div className="mt-16">
        <ThreeActStructure />
      </div>
    </section>
  )
}
