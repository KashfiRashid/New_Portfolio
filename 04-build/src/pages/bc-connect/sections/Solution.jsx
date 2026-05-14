import { SectionHead, AssetPlaceholder } from '../primitives.jsx'
import UserFlowDiagram from '../diagrams/UserFlowDiagram.jsx'

const ACTIONS = [
  {
    label: 'ACTION 01',
    title: 'Wrote the three laws before any components shipped',
    body: "Open Ground starts with three design laws: Earn Your Pixel, Ground Before Signal, Connect Don't Decorate. Every component got measured against them. The laws weren't decoration. They were the contract.",
  },
  {
    label: 'ACTION 02',
    title: "Defined the token system the team didn't have to negotiate",
    body: 'Color, type, spacing, radius, shadow, motion. Every value got a token name, so nobody hardcoded anything twice. DM Sans for doing, Instrument Serif for reading, DM Mono for knowing.',
  },
  {
    label: 'ACTION 03',
    title: 'Built and documented 16 components',
    body: 'Sixteen components, covering every surface the product needed. Each documented with its props, states, and motion rules. No transforms on hover, opacity-only entrances, a 500ms animation ceiling.',
  },
  {
    label: 'ACTION 04',
    title: 'Integrated the system across every flow the product shipped',
    body: "Six flows, one system underneath: landing, directory, detail, auth, dashboard, admin. Two integration moves were mine. Every business detail page generates its own SVG hero from the industry tag, one primitive across seven variants. The directory runs Near Me: geolocation plus the Haversine formula, sorting cards by distance. The geocoding pipeline behind it went to Abdul.",
    showUserFlow: true,
    asset: {
      kind: 'SCREENSHOT',
      slotId: 'Slot 5, Integration',
      dimensions: '2400 × 1500 · 16:10',
      description:
        'A composite or single screenshot showing two or more product surfaces (landing plus directory, or directory plus dashboard) visually demonstrating system consistency.',
    },
  },
]

export default function Solution() {
  return (
    <section id="solution" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="WHAT I DID" title="I built the system the product ran on." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          I led the design system and the frontend architecture. Before any components shipped, the contract had to exist. Tokens, laws, components, and the integration surface that connected everything. Four moves, in order.
        </p>
      </div>
      <div>
        {ACTIONS.map((action) => (
          <article key={action.label} className="space-y-8 py-16">
            <div className="space-y-3">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[#1B6B4F]">
                {action.label}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-[28px] font-normal tracking-[-0.02em] text-white lg:text-[36px]">
                {action.title}
              </h3>
              <p className="max-w-[720px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
                {action.body}
              </p>
            </div>
            {action.showUserFlow ? (
              <div>
                <UserFlowDiagram />
                <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Three roles. Three surfaces. Progressive disclosure as architecture.
                </p>
              </div>
            ) : null}
            {action.asset ? (
              <AssetPlaceholder
                kind={action.asset.kind}
                slotId={action.asset.slotId}
                dimensions={action.asset.dimensions}
                description={action.asset.description}
              />
            ) : null}
          </article>
        ))}
      </div>
      <div className="max-w-[720px] border-t border-zinc-800 pt-12">
        <p className="font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
          Some of the work didn't fit any section header. The .env.local config bug that was masking 90,000 records as 12, found in a routine API trace, fixed in a single var change. The map race condition where markers tried to render before Google Maps mounted, solved with a ready-state gate. Reaching out to Helmine on Discord for the production card-image spec so we'd stop shipping placeholders. Cleanup work on primitives.jsx, removing 13 components that had drifted out of the active surface. None of it shows up in the demo, but the demo doesn't ship without it.
        </p>
      </div>
    </section>
  )
}
