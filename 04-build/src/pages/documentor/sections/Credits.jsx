import { SectionHead } from '../primitives.jsx'

const TEAM = [
  {
    name: 'Md Kashfi Or Rashid Pranta',
    role: 'UX Lead Designer',
    contribution:
      'Framed the design challenge, ran the 45-interview bias test, and set the micro-step model.',
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
            <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-white">
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
        UX Case Study &#xB7; Mobile App &#xB7; 8-Week Timeline
      </p>
    </section>
  )
}
