import { MetaBlock } from '../primitives.jsx'

export default function Hero() {
  return (
    <section className="scroll-mt-28 py-20 lg:py-32">
      <div className="space-y-12">
        <header className="space-y-8">
          <h1
            className="font-[family-name:var(--font-display)] text-[56px] font-normal text-white lg:text-[96px]"
            style={{ letterSpacing: '-0.03em', lineHeight: '0.95' }}
          >
            Trucking Academy
          </h1>
          <p className="max-w-[640px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            A mobile learning platform for the Canadian trucking industry, designed to address the real problem hiding behind a client&rsquo;s marketing brief: a generational worker shortage. Built on ethnographic research with ten real drivers.
          </p>
        </header>

        <MetaBlock
          rows={[
            { label: 'Role', value: 'UX Researcher · Designer' },
            { label: 'Client', value: 'Cullen Western Star' },
            { label: 'Timeline', value: '4 months' },
            { label: 'Platform', value: 'Mobile app' },
            { label: 'Methods', value: '10 driver interviews · 3 personas · participatory workshop' },
            { label: 'Outcome', value: 'High-fidelity prototype · validated with the field' },
          ]}
        />

        <img
          src="/trucking-academy/hero.png"
          alt="Trucking Academy — the final mobile app screens composited together."
          loading="eager"
          className="w-full rounded-xl border border-white/[0.08]"
        />
      </div>
    </section>
  )
}
