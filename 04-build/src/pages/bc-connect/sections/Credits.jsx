import { SectionHead } from '../primitives.jsx'

const TEAM = [
  {
    label: 'ABDUL AZIZ HAMOUI',
    name: 'Abdul Aziz Hamoui',
    role: 'Backend and admin systems',
    contribution:
      'Built the admin system, business CRUD, the data seeding and geocoding pipeline that normalized Vancouver and Surrey open data into the unified schema. Managed branches and pull requests across the team.',
  },
  {
    label: 'VEERAJ MISHRA',
    name: 'Veeraj Mishra',
    role: 'Backend and data',
    contribution:
      "Built the MongoDB schemas, the API routes, the auth integration, and the recommendations engine that powers the member dashboard's matching layer.",
  },
  {
    label: 'KASHFI RASHID',
    name: 'Kashfi Rashid',
    role: 'Design system and frontend lead',
    contribution:
      'Built Open Ground (the design system), the component library, all frontend architecture including auth UI, routing, hybrid map view, member dashboard, business detail pages, and the system documentation.',
  },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CREDITS" title="Team and attribution." />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {TEAM.map((member) => (
          <div key={member.label}>
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#1B6B4F]">
              {member.label}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[20px] font-normal text-white">
              {member.name}
            </h3>
            <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">
              {member.role}
            </p>
            <p className="mt-2 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {member.contribution}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Built for IAT 459 · Simon Fraser University · Spring 2026
      </p>
    </section>
  )
}
