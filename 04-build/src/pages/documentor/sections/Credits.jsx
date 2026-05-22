import { SectionHead } from '../primitives.jsx'

const TEAM = [
  {
    name: 'Md Kashfi Or Rashid Pranta',
    role: 'UX Lead Designer',
    contribution:
      'Owned the UX from the first sketch to validation. Defined the design challenge from lived experience, then ran the 45-interview bias test to confirm it generalized. Led the direction through rapid sketching, set the micro-step model, and held that through-line from research into the final screens.',
  },
  {
    name: 'Kate Luonge',
    role: 'UI Designer',
    contribution: 'Refined the UI and visual system on the UX structure.',
  },
  {
    name: 'Mariyam',
    role: 'UX Researcher',
    contribution: 'Ran research that validated the micro-step direction.',
  },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CREDITS" title="Team." />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {TEAM.map((m) => (
          <div key={m.name}>
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#F4C26B]">
              {m.name.toUpperCase()}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[20px] font-normal text-white">
              {m.name}
            </h3>
            <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">
              {m.role}
            </p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {m.contribution}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        UX Case Study · Mobile App · 8-Week Timeline
      </p>
    </section>
  )
}
