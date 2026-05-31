import { SectionHead, Prose, Highlight, Stat, Figure } from '../primitives.jsx'
import KNNPipeline from '../diagrams/KNNPipeline.jsx'

const PREP = [
  { t: 'Strings, not data', d: 'The product column was text - "[\'Milk\',\'Bread\']". I parsed it safely with ast.literal_eval before anything else.' },
  { t: 'The 899,895 fix', d: 'Total_Items counted quantities, not unique products. 899,895 rows were wrong. I recomputed basket size from unique products so similarity meant something.' },
  { t: 'The toothpaste problem', d: 'Toothpaste appeared 73,324 times vs a 36,612 median. Left alone, the model recommends it for everything. I down-weighted high-frequency items by 50%.' },
  { t: 'Rebuilt journeys', d: 'Sorted by customer then date to reconstruct real purchase sequences, keeping customers with 3+ transactions, and split by time (train 2020-2023, test 2024) to stop leakage.' },
]

export default function Phase2() {
  return (
    <section id="phase-2" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Phase 2 - the recommender" title="What will they buy next?" />
      <div className="space-y-12">
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <Figure
            src="/market-basket/panel-knn.jpg"
            alt="The recommendation panel: ranked next-item suggestions with confidence and a revenue-source breakdown."
            caption="The recommendation panel: ranked next items + cross-sell revenue share."
          />
          <Prose className="max-w-[560px]">
            <p>
              Most of Phase 2 was not modeling - it was cleaning data honestly. The dataset
              looked tidy and was not.
            </p>
          </Prose>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PREP.map((p) => (
            <div key={p.t} className="border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#F4D6A6]">{p.t}</div>
              <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">{p.d}</p>
            </div>
          ))}
        </div>

        <Prose className="max-w-[700px]">
          <p>
            The model itself is deliberately plain: each basket becomes an 81-dimension
            binary vector, and KNN finds the <Highlight>10 nearest baskets by cosine
            similarity</Highlight>, then ranks the products those neighbors bought. No
            training phase - new data is instantly usable.
          </p>
        </Prose>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 lg:p-8">
          <KNNPipeline />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat value="38.75%" label="Hit rate" sub="31,231 of 80,000 baskets" />
          <Stat value="k=10" label="Neighbors" sub="Cosine, brute force" />
          <Stat value="~1%" label="Random baseline" sub="What chance would score" />
        </div>

        <Prose className="max-w-[700px]">
          <p>
            Held out the last item of each basket and asked the model to predict it: it was
            in the list 38.75% of the time. That is competitive with Netflix (~30-40%) and
            Amazon item-to-item (~35-50%) - from a model with no training phase and one
            tunable number.
          </p>
        </Prose>
      </div>
    </section>
  )
}
