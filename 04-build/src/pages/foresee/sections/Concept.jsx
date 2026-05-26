import { SectionHead, Highlight } from '../primitives.jsx'

export default function Concept() {
  return (
    <section id="concept" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE CONCEPT" title="Money lives in social contexts, not categories." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          Budgeting apps treat money like numbers. $46 at Cactus Club tells you nothing. <Highlight>$46 at Cactus Club with the work team, the third time this month, tells you everything.</Highlight>
        </p>
        <p>
          ForeSee throws away the SKU-style category list and organizes finances by the people you spend with. Work, Friends, Spouse, Personal. Each board is a living feed of events with the real transactions linked underneath.
        </p>
      </div>
    </section>
  )
}
