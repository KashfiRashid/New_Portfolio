import { SectionHead, Prose, Stat, Figure } from '../primitives.jsx'
import FeatureImportance from '../diagrams/FeatureImportance.jsx'

export default function Phase1() {
  return (
    <section id="phase-1" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Phase 1 - high-value AI" title="Who will spend big?" />
      <div className="space-y-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <Prose className="max-w-[560px]">
            <p>
              The first model flags customers likely to make a large purchase, so marketing
              can target them. The catch is imbalance: only 10% of transactions clear the
              high-value line ($90.47, the 90th percentile). For this job precision matters
              more than recall - a wrong flag wastes spend.
            </p>
            <p>
              I engineered RFM features (recency, frequency, monetary) plus temporal and
              basket-intelligence signals, then compared XGBoost against Random Forest on a
              stratified 80/20 split. XGBoost won.
            </p>
          </Prose>
          <Figure
            src="/market-basket/panel-highvalue.jpg"
            alt="The high-value prediction panel: a probability gauge and a revenue-opportunity readout."
            caption="The high-value panel: probability gauge + revenue opportunity per customer."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <Stat value="91.9%" label="Accuracy" />
          <Stat value="96%" label="Precision" />
          <Stat value="79.2%" label="ROC-AUC" />
          <Stat value="19%" label="Recall (by design)" />
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 lg:p-8">
          <FeatureImportance />
        </div>
        <Prose className="max-w-[680px]">
          <p>
            The clearest finding: how often and how much a customer buys explains almost
            everything; demographics barely move the needle. Behavior beats identity.
          </p>
        </Prose>
      </div>
    </section>
  )
}
