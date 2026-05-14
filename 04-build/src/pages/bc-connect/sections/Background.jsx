import { SectionHead } from '../primitives.jsx'
import EcosystemMap from '../diagrams/EcosystemMap.jsx'

export default function Background() {
  return (
    <section id="background" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="BACKGROUND" title="The BC startup ecosystem is fragmented by structure." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          BC has thousands of startups spread across eight regions. The City of Vancouver publishes business types. Surrey publishes NAICS codes. Both are public records of who operates where. Neither was built to agree with the other.
        </p>
        <p>
          Everyone else relies on LinkedIn and word of mouth. The portals only cover the cities that bothered to publish, so a startup outside the Lower Mainland doesn't just rank low. It doesn't appear anywhere at all.
        </p>
      </div>
      <div className="mt-12">
        <EcosystemMap />
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
          Eight regions. Two open-data portals. Zero shared directory.
        </p>
      </div>
    </section>
  )
}
