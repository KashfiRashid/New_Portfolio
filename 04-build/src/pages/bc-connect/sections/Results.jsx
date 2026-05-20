import { SectionHead, AssetPlaceholder } from '../primitives.jsx'

const RESULTS = [
  '90,000+ businesses unified from fragmented municipal open data',
  'Three user roles with JWT-authenticated RBAC at the UI layer',
  'Hybrid list and map directory with debounced search and multi-select filtering',
  'Member dashboard with AI recommendations and saved businesses',
  'Admin panel with moderation queue, member management, and full action audit log',
  'Shipped on time and demoed live to the cohort',
]

const TESTIMONIALS = [
  {
    quote:
      "The typography choice sets the tone immediately. The category system isn't just navigation. It's how the platform actually solves the discovery problem.",
    attribution: 'MARKUS, COHORT REVIEWER',
  },
  {
    quote:
      'The role architecture is essential. Visitors, members, admins each get a clear lane. And the platform genuinely connects businesses through one surface. One design note: the filter interactions could use more spatial feedback for a directory this dense.',
    attribution: 'NINA, COHORT REVIEWER',
  },
]

export default function Results() {
  return (
    <section id="results" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="RESULTS" title="What shipped, and what people said." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          BC Connect shipped on time and demoed live to the cohort. The directory now surfaces 90,000+ businesses across eight BC regions, behind one searchable interface, with three user roles and a complete admin moderation surface.
        </p>
      </div>
      <div className="mt-10">
        <AssetPlaceholder
          kind="SCREENSHOT OR VIDEO"
          slotId="Slot 4 — Shipped directory"
          filename="/bc-connect/directory-shipped.png  (or .mp4)"
          dimensions="2400 × 1500 · 16:10 · still, or a short clip"
          description="The directory page in use: the card grid, the FilterPills row, the search bar, the map toggle. A short screen recording of filtering in action is stronger than a still here, since it shows the product actually working."
        />
      </div>
      <ul className="mt-12 max-w-[720px] space-y-2 font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
        {RESULTS.map((result, i) => (
          <li key={i}>{result}</li>
        ))}
      </ul>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.attribution}
            className="rounded-lg border border-zinc-800 p-6"
          >
            <blockquote className="font-[family-name:var(--font-display)] text-[20px] italic leading-relaxed text-zinc-200">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-4 font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-zinc-500">
              {testimonial.attribution}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
