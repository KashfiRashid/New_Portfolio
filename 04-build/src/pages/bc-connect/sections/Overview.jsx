import { SectionHead, Highlight } from '../primitives.jsx'
import StatBlock from '../diagrams/StatBlock.jsx'

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="OVERVIEW" title="Why the system came first." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          This is a case study about one decision. Before a single component shipped, I built the design system: the three laws, the tokens, the component library.
        </p>
        <p>
          <Highlight>Nobody grades a design system directly. I trusted it anyway.</Highlight> It paid off. Everything built after it started from a decision already made instead of starting over. Two engineers owned the data and the API. I held the interface alone, and the system is what made that possible.
        </p>
      </div>
      <div className="mt-12">
        <StatBlock />
      </div>
    </section>
  )
}
