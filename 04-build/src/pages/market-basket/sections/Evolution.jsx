import { SectionHead, Prose, Highlight } from '../primitives.jsx'
import EvolutionDiagram from '../diagrams/EvolutionDiagram.jsx'

export default function Evolution() {
  return (
    <section id="evolution" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="The pivot" title="From complexity to effectiveness" />
      <div className="space-y-10">
        <Prose className="max-w-[700px]">
          <p>
            We planned an integrated five-module platform - high-value transactions,
            next-item, upsell, substitution, and sequential forecasting, fused by a
            meta-learner. The feature engineering and evaluation overhead buried us before
            any single piece worked. So we cut to a dual-AI design: XGBoost for value, KNN
            for recommendations.
          </p>
          <p>
            Then we over-engineered the recommender too - Random Forest and XGBoost with
            40+ features, temporal patterns, customer embeddings, category affinities. It
            scored <Highlight>3-4% top-3 accuracy</Highlight>. A dead end.
          </p>
        </Prose>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 lg:p-8">
          <EvolutionDiagram />
        </div>

        <Prose className="max-w-[700px]">
          <p>
            The fix was to stop adding. A plain k-nearest-neighbors model with cosine
            similarity - "customers with similar current baskets buy similar next items" -
            hit <Highlight>38.75%</Highlight>. The lesson we actually shipped: on sparse
            retail data, a simple, well-executed model beats a complex integrated one.
          </p>
        </Prose>
      </div>
    </section>
  )
}
