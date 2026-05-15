import { SectionHead, PainPointCard } from '../primitives.jsx'

export default function Problem() {
  return (
    <section id="problem" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="PROBLEM"
        title="Live visuals are expensive, manual, and a little bit deaf."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Stage and stream visuals have three problems stacked on top of each other. The third one is the one nobody talks about.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <PainPointCard index="01" title="Manual VJ workflows">
          Live visuals at concerts and raves need a dedicated VJ triggering clips and effects by hand. Expensive, inconsistent, and impossible to scale to every set.
        </PainPointCard>
        <PainPointCard index="02" title="Dumb visualizers">
          Most tools map frequency bins to colors with hard-coded rules. A piano ballad and an EDM drop can produce identical visuals if they share a frequency profile.
        </PainPointCard>
        <PainPointCard index="03" title="No semantic understanding">
          Existing systems react to loudness and frequency. They never react to the mood, the energy, or the emotional character of the music. The visuals do not understand what they are watching.
        </PainPointCard>
      </div>

      <div className="mx-auto mt-16 max-w-[760px] text-center">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          The design challenge
        </p>
        <p className="mt-4 font-[family-name:var(--font-display)] text-[26px] font-normal leading-snug tracking-[-0.01em] text-white lg:text-[34px]">
          How might a visualizer make creative decisions about what music should look like, instead of just charting how loud it is?
        </p>
      </div>
    </section>
  )
}
