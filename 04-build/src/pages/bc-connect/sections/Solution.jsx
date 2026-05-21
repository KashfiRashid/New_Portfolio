import { SectionHead, Highlight } from '../primitives.jsx'
import UserFlowDiagram from '../diagrams/UserFlowDiagram.jsx'

const ACTIONS = [
  {
    label: 'ACTION 01',
    title: 'Wrote the three laws before any component',
    body: "Open Ground starts with three laws: Earn Your Pixel, Ground Before Signal, Connect Don't Decorate. Every component was measured against them. The laws were the contract, not decoration.",
  },
  {
    label: 'ACTION 02',
    title: 'Built the token system the team never had to negotiate',
    body: 'Color, type, spacing, radius, shadow, motion. Every value got a token name, so nothing was hardcoded twice. DM Sans for doing, Instrument Serif for reading, DM Mono for knowing.',
  },
  {
    label: 'ACTION 03',
    title: 'Built and documented sixteen components',
    body: 'Sixteen components covering every surface the product needed, each with its props, states, and motion rules written down. No transforms on hover, opacity-only entrances, a 500ms ceiling on animation.',
  },
  {
    label: 'ACTION 04',
    title: 'Integrated the system across every flow',
    body: 'Six flows ran on one system: landing, directory, detail, auth, dashboard, admin. Two integration moves were mine. Every business detail page generates its own SVG hero from the industry tag, one primitive across seven variants. The directory runs Near Me, geolocation plus the Haversine formula, sorting cards by distance. Abdul built the geocoding pipeline behind it.',
    showUserFlow: true,
  },
]

export default function Solution() {
  return (
    <section id="solution" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="WHAT I DID" title="I built the system the product ran on." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          With the register decided, what remained was four moves. <Highlight>The laws, the tokens, the components, and the integration that tied them to the product.</Highlight>
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
                  Three roles, three surfaces, progressive disclosure as architecture.
                </p>
              </div>
            ) : null}
          </article>
        ))}
      </div>
      <div className="max-w-[720px] border-t border-zinc-800 pt-12">
        <p className="font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
          Some of the work fit no section header. A config bug in .env.local was masking the directory down to 12 records, caught in a routine API trace and fixed in one variable. A race condition where map markers tried to render before Google Maps had mounted, closed with a ready-state gate. A message to Helmine on Discord to get the production card-image spec so we stopped shipping placeholders. A pass over primitives.jsx that cut thirteen components that had drifted off the active surface. None of it shows in the demo. The demo doesn't ship without it.
        </p>
      </div>
    </section>
  )
}
