import { SectionHead, Highlight } from '../primitives.jsx'
import EcosystemMap from '../diagrams/EcosystemMap.jsx'
import DataNormalizationDiagram from '../diagrams/DataNormalizationDiagram.jsx'

export default function Background() {
  return (
    <section id="background" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="BACKGROUND" title="The ecosystem is fragmented by structure." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          BC has thousands of startups across eight regions. The City of Vancouver publishes its businesses as licence types. Surrey publishes them as NAICS codes. Both are public records of who operates where, and neither was built to agree with the other. <Highlight>Most cities publish nothing at all.</Highlight>
        </p>
      </div>
      <div className="mt-12">
        <EcosystemMap />
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
          Eight regions, two open-data portals, zero shared directory.
        </p>
        <div className="mt-12">
          <DataNormalizationDiagram />
          <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
            Two schemas in, one queryable surface out.
          </p>
        </div>
      </div>
    </section>
  )
}
