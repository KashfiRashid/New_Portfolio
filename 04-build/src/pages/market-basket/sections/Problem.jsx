import { SectionHead, Prose, Highlight, Stat } from '../primitives.jsx'

export default function Problem() {
  return (
    <section id="problem" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="The problem" title="Retail analytics is fragmented" />
      <div className="space-y-10">
        <Prose className="max-w-[680px]">
          <p>
            Most retail systems answer one question at a time - either <em>who</em> is a
            high-value customer <em>or</em> <em>what</em> to recommend - and never connect
            the two. Classic market-basket analysis (the famous "beer and diapers" pattern)
            describes what already happened; it cannot predict the next item in a cart that
            is still being filled.
          </p>
          <p>
            That gap is expensive. <Highlight>Roughly 35% of Amazon's revenue comes from
            recommendations</Highlight>, yet most mid-market retailers have nothing like it.
            Our question: can one system optimize transaction value and next-item
            recommendations together, on ordinary retail data?
          </p>
        </Prose>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat value="1M" label="Transactions" sub="Four years, 2020-2024" />
          <Stat value="329,738" label="Customers" sub="10 cities, 6 store types" />
          <Stat value="81" label="Products" sub="Across 11 categories" />
        </div>
      </div>
    </section>
  )
}
