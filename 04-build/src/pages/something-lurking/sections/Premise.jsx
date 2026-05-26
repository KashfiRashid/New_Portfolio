import { SectionHead, Highlight } from '../primitives.jsx'

export default function Premise() {
  return (
    <section id="premise" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE PREMISE" title="The ship is failing. You are the only one left." />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Jack starts the shift in the corridor with Captain Harry on the radio. A routine fix. Then the power dies. The captain&rsquo;s radio cuts.
        </p>
        <p>
          Throughout the experience something else is on the ship. Sound cues build tension. Environmental details suggest watching. <Highlight>The presence is never visually resolved. The threat is implied. By design.</Highlight>
        </p>
      </div>
    </section>
  )
}
