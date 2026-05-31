import { SectionHead, Prose, Highlight } from '../primitives.jsx'

const DID = [
  { t: 'Data engineering', d: 'The 899,895-row count fix, the toothpaste outlier handling, customer-journey reconstruction, and the time-based split.' },
  { t: 'Both models', d: 'The XGBoost / Random Forest high-value classifier and the KNN cosine recommender, plus the hold-out evaluation.' },
  { t: 'The demo', d: 'The Tkinter desktop app that runs both models live with gauges, charts, and ranked offers.' },
  { t: 'The write-up', d: 'Methodology, evaluation, benchmarking, and the deck.' },
]

export default function MyRole() {
  return (
    <section id="my-role" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="What I did" title="End to end, with a partner" />
      <div className="space-y-10">
        <Prose className="max-w-[700px]">
          <p>
            This was a two-person project with Rahil Virani. I worked
            <Highlight>across the whole pipeline</Highlight> - the data wrangling, both
            models, the demo, and the evaluation. The most useful work was not the
            algorithms; it was being honest about the data and knowing when to stop adding
            complexity.
          </p>
        </Prose>
        <div className="grid gap-4 sm:grid-cols-2">
          {DID.map((p) => (
            <div key={p.t} className="border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="font-[family-name:var(--font-display)] text-xl text-white">{p.t}</div>
              <p className="mt-3 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
