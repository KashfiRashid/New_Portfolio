import { SectionHead } from '../primitives.jsx'

const BUCKETS = [
  {
    kicker: 'BUCKET 01',
    title: 'Bugs I caught and fixed',
    items: [
      'The .env.local connection bug that was masking 90,000 records as 12. Found it during a routine API trace, fixed the var, the directory grew by four orders of magnitude that afternoon.',
      "The Jobs tab nav highlight that wasn't lighting up when the user was on the Jobs page. Tracked it to a route-matcher edge case, patched the active state logic.",
      'The map race condition where markers tried to render before the Google Maps instance finished mounting. Added a ready-state gate so markers wait for the map.',
    ],
  },
  {
    kicker: 'BUCKET 02',
    title: 'Features I added beyond the brief',
    items: [
      'Profile dashboard with a Saved tab, a Recommendations tab showing three AI matches with percentage scores, and an inline-editable username field that PATCHes on commit.',
      'Hybrid map view: replaced the broken Leaflet integration with Google Maps under custom styling.',
      'Pagination that loads 50, then offers a View More button for the next 50 instead of dumping all 90,000 at once.',
      'Jobs section redesign, nav logo SVG, custom favicon.',
    ],
  },
  {
    kicker: 'BUCKET 03',
    title: 'Coordination work',
    items: [
      "Reached out to Helmine on Discord for the production card image spec so we'd stop shipping placeholders.",
      'Cleaned up the design system: removed 13 unused components from primitives.jsx that had drifted out of the active surface area.',
    ],
  },
]

export default function BeyondDesign() {
  return (
    <section id="beyond-design" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="BEYOND DESIGN" title="The work nobody graded." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          The case study so far has been about the system and the surfaces. Underneath that is a layer of work that doesn't appear in any component spec. Bugs caught. Features added without being asked. Quiet coordination work. Three buckets.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {BUCKETS.map((bucket) => (
          <div key={bucket.kicker}>
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#1B6B4F]">
              {bucket.kicker}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[20px] font-normal text-white lg:text-[22px]">
              {bucket.title}
            </h3>
            <ul className="mt-4 space-y-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {bucket.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
