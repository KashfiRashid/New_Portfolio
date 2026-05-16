import { SectionHead } from '../primitives.jsx'

const TEAMMATE_LINE = 'Collaborated across the competitor audit, design system, and prototype.'

const TEAM = [
  {
    name: 'Kashfi Rashid',
    role: 'Interaction Designer',
    contribution:
      'Owned the interactive prototype and the four interaction patterns (entrance, scroll, click, hover). Shared work across the competitor audit, the user flow, the wireframes, the mockups, and the design system.',
  },
  {
    name: 'Benjamin Nichiporik',
    role: 'Team',
    contribution: TEAMMATE_LINE,
  },
  {
    name: 'Mariyam',
    role: 'Team',
    contribution: TEAMMATE_LINE,
  },
  {
    name: 'Rahil Virani',
    role: 'Team',
    contribution: TEAMMATE_LINE,
  },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CREDITS" title="Team." />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {TEAM.map((member) => (
          <div key={member.name}>
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#EC613B]">
              {member.name.toUpperCase()}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[20px] font-normal text-white">
              {member.name}
            </h3>
            <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">
              {member.role}
            </p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {member.contribution}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        FLUI-25 hackathon · four-person team · 3-day timeline
      </p>
    </section>
  )
}
