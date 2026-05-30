import { SectionHead, Highlight } from '../primitives.jsx'

const PAIRS = [
  {
    n: '01',
    pain: 'Convoluted learning paths',
    painBody: 'The certification system was hard to read. Drivers couldn\u2019t see how each course advanced them toward a license.',
    solution: 'Linear progression with visual progress',
    solutionBody: 'Color-coded courses, one path, a clear next step every time the user opens the app.',
  },
  {
    n: '02',
    pain: 'Dense, inaccessible resources',
    painBody: 'The official textbooks were heavy, dry, and impossible to read between hauls.',
    solution: 'Bite-sized content with instant feedback',
    solutionBody: 'Short modules and quick quizzes designed for the actual cadence of a driver\u2019s day.',
  },
  {
    n: '03',
    pain: 'High training costs, low certainty',
    painBody: 'Drivers were paying upfront with no sense of whether the work would be there at the end.',
    solution: 'Community support and direct employers',
    solutionBody: 'Connect with experienced drivers for mentorship, and apply to vetted employers in-app.',
  },
]

export default function Insights() {
  return (
    <section id="insights" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="KEY INSIGHTS" title="Pain points to solutions." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          From ten interviews and the workshop, three problems came up across every persona. <Highlight>Each one had a clear design move attached to it &#x2014; the fixes weren&rsquo;t guesses, they were what the drivers themselves had said would help.</Highlight>
        </p>
      </div>

      <figure className="mt-12 space-y-3">
        <img src="/trucking-academy/poster.png" alt="Pain points and solutions poster from the workshop synthesis." loading="lazy" className="w-full rounded-xl border border-white/[0.08]" />
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span className="text-[#FF6B6B]">Synthesis</span> &#xB7; pain points distilled from the field
        </figcaption>
      </figure>

      {/* Paired rows - each row is one insight: pain on left, solution on right.
          Three rows total, no empty cells. */}
      <div className="mt-12 space-y-6">
        {PAIRS.map((p) => (
          <div key={p.n} className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-2">
            <div className="bg-[#0F1216] p-6">
              <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#8B0000]">{p.n} &#xB7; Pain</p>
              <p className="mt-3 font-[family-name:var(--font-sans)] text-base font-medium text-white">{p.pain}</p>
              <p className="mt-2 font-[family-name:var(--font-sans)] text-[14px] leading-relaxed text-zinc-400">{p.painBody}</p>
            </div>
            <div className="bg-[#0F1216] p-6">
              <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#FF6B6B]">&#x2192; Solution</p>
              <p className="mt-3 font-[family-name:var(--font-sans)] text-base font-medium text-white">{p.solution}</p>
              <p className="mt-2 font-[family-name:var(--font-sans)] text-[14px] leading-relaxed text-zinc-400">{p.solutionBody}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
