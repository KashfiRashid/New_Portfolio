import { SectionHead, AssetPlaceholder } from '../primitives.jsx'

const ACTIONS = [
  {
    label: 'ACTION 01',
    title: 'Wrote the three laws before any components shipped',
    body: "Open Ground starts with three design laws. Earn Your Pixel, Ground Before Signal, Connect Don't Decorate. Every component the team built afterward was evaluated against them. The laws weren't decoration. They were the contract.",
    asset: {
      kind: 'SCREENSHOT',
      slotId: 'Slot 2, Three Laws',
      dimensions: '2400 × 1200 · 2:1',
      description:
        'Visual of the three design laws as numbered cards or a documented section from Open Ground.',
    },
  },
  {
    label: 'ACTION 02',
    title: "Defined the token system the team didn't have to negotiate",
    body: 'Color, type, spacing, radius, shadow, motion. Every value got a token name so nobody hardcoded anything twice. DM Sans for doing, Instrument Serif for reading, DM Mono for knowing. Signal green for brand, ink scale for text, mist for surface ground.',
    asset: {
      kind: 'SCREENSHOT',
      slotId: 'Slot 3, Tokens',
      dimensions: '2400 × 1500 · 16:10',
      description:
        'Palette swatches, type ramp, spacing scale documented as a single visual or the Open Ground tokens page.',
    },
  },
  {
    label: 'ACTION 03',
    title: 'Built and documented 16 components',
    body: 'The component library covered every surface the product would need: LatticeMark, Wordmark, Navbar, SearchBar, Hero, Principles, Stats, DirectoryPreview, BusinessCard, IndustryTag, StatusBadge, FilterPills, JobCard, JobsSection, CTA, Footer. Every one documented with its props, states, and motion rules. No transforms on hover. Opacity-only entrances. Max animation duration 500ms.',
    asset: {
      kind: 'SCREENSHOT',
      slotId: 'Slot 4, Components',
      dimensions: '2400 × 1500 · 16:10',
      description:
        'Component library page or a screenshot of multiple components rendered together.',
    },
  },
  {
    label: 'ACTION 04',
    title: 'Integrated the system across every flow the product shipped',
    body: 'Landing, directory with hybrid cards and Google Maps, business detail with industry-gradient hero, sliding-tab auth, member dashboard with saved and recommendations, admin moderation surface. Six flows, one system underneath. The cards in the directory and the cards in the dashboard are the same primitive. The map view inherits the spacing tokens that govern the rest of the surface.',
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
            <AssetPlaceholder
              kind={action.asset.kind}
              slotId={action.asset.slotId}
              dimensions={action.asset.dimensions}
              description={action.asset.description}
            />
          </article>
        ))}
      </div>
    </section>
  )
}
