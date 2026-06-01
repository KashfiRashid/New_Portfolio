import { MetaBlock, LinkButton, Figure } from '../primitives.jsx'

const LINKS = [
  { label: 'Slide deck', href: 'https://www.figma.com/deck/vYtZfWpa0JRWuqdSYKRHRW/IAT461?node-id=1-372' },
  { label: 'Dataset', href: 'https://www.kaggle.com/datasets/prasad22/retail-transactions-dataset' },
]

export default function Hero() {
  return (
    <section className="scroll-mt-28 py-10 lg:py-16">
      <div className="space-y-12">
        <header className="space-y-8">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#F4D6A6]">
            Machine learning &middot; IAT 461 &middot; Summer 2025
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[36px] sm:text-[52px] font-normal text-white lg:text-[88px]" style={{ letterSpacing: '-0.03em', lineHeight: '0.95' }}>
            Predictive Market Basket Analysis
          </h1>
          <p className="max-w-[680px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            A retail-intelligence system that predicts who will spend big and what they
            will buy next. We started with an ambitious integrated platform, over-engineered
            the recommender to a 3-4% accuracy dead end, and then stripped it back to a
            simple KNN model that hit a <span className="text-[#F4D6A6]">38.75% next-item hit rate</span>.
            The story is the retreat from complexity.
          </p>
        </header>

        <MetaBlock
          rows={[
            { label: 'My Role', value: 'End-to-end - data, both models, the demo, evaluation (two-person team)' },
            { label: 'Team', value: 'Md Kashfi Or Rashid + Rahil Virani' },
            { label: 'Context', value: 'IAT 461, Special Topics in Computational Media - SFU, Summer 2025' },
            { label: 'Result', value: '38.75% recommender hit rate; 91.87% high-value classifier' },
            { label: 'Stack', value: 'Python / scikit-learn / XGBoost / pandas / Tkinter' },
            { label: 'Data', value: '1M retail transactions, 2020-2024 (329,738 customers)' },
          ]}
        />

        <div className="flex flex-wrap gap-3">
          {LINKS.map((l) => (<LinkButton key={l.href} href={l.href}>{l.label}</LinkButton>))}
        </div>

        <Figure
          src="/market-basket/demo-hero.jpg"
          alt="The Dual AI Retail Intelligence demo: a high-value prediction gauge on the left and live product recommendations on the right."
          caption="The demo: high-value prediction (left) and live next-item recommendations (right), running both models on one customer."
        />
      </div>
    </section>
  )
}
