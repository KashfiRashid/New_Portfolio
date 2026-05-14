import { SectionHead, PainPointCard } from '../primitives.jsx'

export default function Problem() {
  return (
    <section id="problem" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="PROBLEM"
        title="The data was the first problem. Discovery was the second."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The directory had three problems stacked on top of each other. None of them could be solved in isolation.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <PainPointCard index="01" title="Two schemas, no shape">
          Vancouver publishes business types. Surrey publishes NAICS codes. Same idea, incompatible structure. The data was the first problem the directory had to solve.
        </PainPointCard>
        <PainPointCard index="02" title="No discovery layer">
          Investors scroll LinkedIn. Founders rely on word of mouth. The directory the province needs doesn't exist, so neither side ever finds the other in one place.
        </PainPointCard>
        <PainPointCard index="03" title="Regional invisibility">
          The Open Data portals only cover the cities that publish. A startup outside the Lower Mainland doesn't just rank low. It doesn't appear anywhere at all.
        </PainPointCard>
      </div>
    </section>
  )
}
