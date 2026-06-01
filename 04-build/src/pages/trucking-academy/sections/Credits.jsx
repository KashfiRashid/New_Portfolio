import { SectionHead } from '../primitives.jsx'

const TEAM = [
  {
    name: 'Md Kashfi Or Rashid Pranta',
    role: 'Team Lead & UX Researcher',
    contribution:
      'Drove the idea and led the team. Ran the driver interviews, co-facilitated the participatory workshop, and synthesized the field research into the design direction.',
  },
  {
    name: 'Isaac Cheung',
    role: 'Client Liaison & UX',
    contribution:
      'Main point of contact for Cullen Western Star and co-facilitated the participatory workshop.',
  },
  {
    name: 'Semyon Kuznetsov',
    role: 'UI Design Lead',
    contribution: 'Owned the core UI - the visual system and interface design.',
  },
  {
    name: 'Rahil Virani',
    role: 'UX Researcher',
    contribution: 'Ran research alongside Kashfi - interviews, synthesis, and persona work.',
  },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CREDITS" title="Team and attribution." />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((m) => (
          <div key={m.name}>
            <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-white">{m.name}</h3>
            <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">{m.role}</p>
            {m.contribution ? (
              <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">{m.contribution}</p>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-12 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Cullen Western Star &#xB7; SFU SIAT
      </p>
    </section>
  )
}
