import { SectionHead, Highlight } from '../primitives.jsx'

const RESULTS = [
  '2,847 startups unified from fragmented municipal open data',
  'Three roles, with JWT-authenticated access control enforced at the UI',
  'A hybrid list and map directory with debounced search and multi-select filters',
  'A member dashboard with saved businesses and three live recommendations',
  'An admin panel: moderation queue, member management, and a full action audit log',
  'Shipped on time, demoed live to the cohort',
]

const TESTIMONIALS = [
  {
    quote:
      'The typography sets the tone immediately. The category system is not just navigation. It is how the platform actually solves the discovery problem.',
    attribution: 'MARKUS, COHORT REVIEWER',
  },
  {
    quote:
      'The role architecture is essential. Visitors, members, and admins each get a clear lane, and the platform genuinely connects businesses through one surface. One note: the filter interactions could use more spatial feedback for a directory this dense.',
    attribution: 'NINA, COHORT REVIEWER',
  },
]

export default function Results() {
  return (
    <section id="results" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="RESULTS" title="What shipped, and what people said." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          BC Connect demoed live to the cohort, on time. <Highlight>Every flow in the proposal shipped, on one design system.</Highlight> The directory carries startups from eight regions behind one interface, with three roles and a full admin moderation surface.
        </p>
      </div>
      <ul className="mt-12 max-w-[720px] space-y-2 font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
        {RESULTS.map((result, i) => (
          <li key={i}>{result}</li>
        ))}
      </ul>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((testimonial) => (
          <figure key={testimonial.attribution} className="rounded-lg border border-zinc-800 p-6">
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
