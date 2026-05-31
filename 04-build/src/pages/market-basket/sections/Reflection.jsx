import { SectionHead, Prose, Highlight } from '../primitives.jsx'

const LIMITS = [
  'One metric. We optimized hit rate; precision@k, NDCG, and diversity would tell a fuller story.',
  'Binary signals. Bought-or-not ignores quantity, recency, and price sensitivity.',
  'Cold start. New customers and new products have no neighbors to learn from.',
  'Scale. Brute-force KNN grows quadratically; a real deployment needs approximate search.',
]

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Reflection" title="What it taught, and where it helps" />
      <div className="space-y-10">
        <Prose className="max-w-[700px]">
          <p>
            The headline lesson is about judgment, not algorithms. Our over-engineered
            recommender scored 3-4%; the simple one scored 38.75%. <Highlight>Knowing when
            to stop is a skill</Highlight>, and it is the thing I will carry into real work.
          </p>
          <p>
            It is also genuinely useful. A mid-market retailer could run this cheaply - no
            deep-learning infrastructure, interpretable results ("customers with baskets
            like yours bought..."), and instant updates because KNN has no training phase.
            It is a foundation you can trust and then extend.
          </p>
        </Prose>
        <div>
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">Honest limits</p>
          <ul className="space-y-3">
            {LIMITS.map((l) => (
              <li key={l} className="flex gap-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#E8B86A]" aria-hidden />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
