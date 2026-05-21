import { SectionHead, PainPointCard, Highlight } from '../primitives.jsx'

export default function Problem() {
  return (
    <section id="problem" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="PROBLEM"
        title="The data was the first problem. Discovery was the second."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Three problems, stacked. <Highlight>The build had to clear all three before BC Connect could exist.</Highlight>
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <PainPointCard index="01" title="Two schemas, no shape">
          The same business carried different fields and codes in every dataset. Until the data had one consistent shape, nothing could be built on top of it.
        </PainPointCard>
        <PainPointCard index="02" title="No discovery layer">
          Even clean data had nowhere to live. Investors scrolled LinkedIn, founders relied on word of mouth, and the two sides never met in one place.
        </PainPointCard>
        <PainPointCard index="03" title="Regional invisibility">
          Coverage followed whoever published. A startup outside the Lower Mainland didn't rank low in the directory. It had no row in it.
        </PainPointCard>
      </div>
      <div className="mx-auto mt-16 max-w-[760px] text-center">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          The design challenge
        </p>
        <p className="mt-4 font-[family-name:var(--font-display)] text-[26px] font-normal leading-snug tracking-[-0.01em] text-white lg:text-[34px]">
          How might we build one directory of BC's startup ecosystem that respects the data, surfaces the regions nobody else shows, and stays out of the user's way?
        </p>
      </div>
    </section>
  )
}
