import { SectionHead, Highlight } from '../primitives.jsx'

export default function Journey() {
  return (
    <section id="journey" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="USER JOURNEY" title="Ben's path to a Class 3 license." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          Ben is 28, currently a delivery driver, and wants upward mobility. Following him through the app made the design decisions concrete: <Highlight>every screen had to take him one clear step closer to his next license, with the cost and time-to-payoff visible at every stage.</Highlight>
        </p>
      </div>

      <figure className="mt-12 space-y-3">
        <img src="/trucking-academy/journey-map.png" alt="Ben's user journey map, from delivery driver to Class 3 license." loading="lazy" className="w-full rounded-xl border border-white/[0.08]" />
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span className="text-[#FF6B6B]">Journey map</span> · Ben, 28, delivery driver → Class 3
        </figcaption>
      </figure>
    </section>
  )
}
