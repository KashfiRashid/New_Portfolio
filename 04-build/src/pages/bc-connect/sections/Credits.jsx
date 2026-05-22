import { SectionHead } from '../primitives.jsx'

const TEAM = [
  {
    label: 'ABDUL AZIZ HAMOUI',
    name: 'Abdul Aziz Hamoui',
    role: 'Backend and admin systems',
    contribution:
      'Set up the repository and project foundations, then built the full admin system: dashboard, approval workflow, audit log, member management, and role-based access. Owned business CRUD, the data seeding and geocoding pipeline, and branch and PR management.',
  },
  {
    label: 'VEERAJ MISHRA',
    name: 'Veeraj Mishra',
    role: 'Backend and data',
    contribution:
      'Built the MongoDB schemas, API routes, models, and middleware, integrated authentication across the stack, and wrote the directory filtering, pagination, and the recommendations engine behind the member dashboard.',
  },
  {
    label: 'KASHFI RASHID',
    name: 'Md Kashfi Or Rashid Pranta',
    role: 'Design system and frontend lead',
    contribution:
      'Built Open Ground and the component library, and all frontend architecture: auth UI, routing, the hybrid map view, the member dashboard, the generated business detail pages, navigation and branding, and the system documentation.',
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
        SFU SIAT, Spring 2026
      </p>
    </section>
  )
}
