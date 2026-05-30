import { SectionHead } from '../primitives.jsx'

const TEAM = [
  {
    name: 'Kashfi Pranta',
    role: 'Team Lead \u00b7 Designer \u00b7 Developer',
    contribution:
      'Set team direction two hours in: assigned roles, scoped the build, held the foundation the rest of the team worked from. Worked across design and development through the night.',
  },
  {
    name: 'Brett Rodrigues',
    role: 'Backend Developer',
    contribution:
      'Built the API endpoints and data pipelines that carried keystroke telemetry through the system.',
  },
  {
    name: 'Tawheed Sarker Aakash',
    role: 'Backend Engineer',
    contribution:
      'Engineered the backend (the server-side systems that ran the game logic and state).',
  },
  {
    name: 'Sadab Khan',
    role: 'Planning \u00b7 Frontend Coordination',
    contribution:
      'Drove planning and coordinated the frontend, keeping the build aligned across the team.',
  },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CREDITS" title="Team and attribution." />

      <figure className="mb-12">
        <img
          src="/us-among-ai/team.png"
          alt="The Us Among AI team at SillyHacks 2026"
          loading="lazy"
          className="w-full max-w-sm rounded-lg border border-white/10"
        />
        <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          The team at SillyHacks 2026, Best UI
        </figcaption>
      </figure>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member) => (
          <div key={member.name}>
            <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-white">
              {member.name}
            </h3>
            <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">{member.role}</p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {member.contribution}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Mentored by Hamzah Alshawwaf &#xB7; SillyHacks 2026, SFU Surge
      </p>
    </section>
  )
}
