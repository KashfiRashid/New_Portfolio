import { SectionHead } from '../primitives.jsx'
import StatBlock from '../diagrams/StatBlock.jsx'

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="OVERVIEW" title="A directory the province didn't have." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          BC Connect is a unified directory of British Columbia's startup ecosystem. It pulls fragmented municipal open data, published city by city in schemas that don't match, and normalizes it into a single searchable surface. 90,000+ businesses, one interface, one way to query them.
        </p>
        <p>
          I led the design system and the frontend. Open Ground came first. Everything else inherited from it. The cards, the navigation, the map view, the auth flow: none of it was guesswork, because the system was already doing the thinking before the first component shipped.
        </p>
      </div>
      <div className="mt-12">
        <StatBlock />
      </div>
    </section>
  )
}
