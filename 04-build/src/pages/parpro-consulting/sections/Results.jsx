import { SectionHead } from '../primitives.jsx'
import BeforeAfterComparison from '../diagrams/BeforeAfterComparison.jsx'

const STATS = [
  { value: '3 days', label: 'total timeline' },
  { value: '4', label: 'interaction types' },
  { value: '4', label: 'problems addressed' },
  { value: '0', label: 'user tests run' },
]

export default function Results() {
  return (
    <section id="results" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="RESULTS" title="What shipped, and what we did not get to." />
      <div className="max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          I delivered a complete interaction redesign in three days: competitor audit, user flow, wireframes, mockups, design system foundations, and an interactive prototype with four interaction types. The four audited problems each have a response in the artifact.
        </p>
        <p>
          What did not happen is validation. There was no time to test the redesign with users or the client, and the case study says so plainly rather than implying a proof that was never run.
        </p>
      </div>

      <div className="mt-12">
        <video
          src="/parpro/final-site.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls
          aria-label="Completed Parpro prototype recorded end to end: the artifact that shipped to the client."
          className="w-full rounded-lg border border-white/[0.06] bg-black object-contain"
          style={{ aspectRatio: '1440 / 1080' }}
        />
      </div>

      <div className="mt-12">
        <BeforeAfterComparison />
      </div>

      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-[#0F1216] p-6">
            <p className="font-[family-name:var(--font-display)] text-[34px] font-normal leading-none tracking-[-0.02em] text-white lg:text-[44px]">
              {stat.value}
            </p>
            <p className="mt-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
