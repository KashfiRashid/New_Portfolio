import { MetaBlock } from '../primitives.jsx'
import heroLanding from '../hero-landing.png'

export default function Hero() {
  return (
    <section className="scroll-mt-28 py-20 lg:py-32">
      <div className="space-y-12">
        <header className="space-y-8">
          <h1
            className="font-[family-name:var(--font-display)] text-[56px] font-normal text-white lg:text-[96px]"
            style={{ letterSpacing: '-0.03em', lineHeight: '0.95' }}
          >
            BC Connect
          </h1>
          <p className="max-w-[640px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            A unified directory of British Columbia's startup ecosystem. I led the frontend and the design system that brings 2,847 startups into one searchable interface.
          </p>
        </header>
        <MetaBlock
          rows={[
            { label: 'Team', value: 'Abdul Aziz Hamoui, Veeraj Mishra, Md Kashfi Or Rashid Pranta' },
            { label: 'My Roles', value: 'UX/UI Designer · Frontend Developer · Design System Lead' },
            { label: 'Duration', value: '4 months' },
            { label: 'Stack', value: 'Next.js, React, Tailwind, MongoDB' },
            { label: 'Context', value: 'Startup Ecosystem' },
            { label: 'Format', value: 'Web Platform' },
          ]}
        />
        <img
          src={heroLanding}
          alt="The BC Connect landing page at desktop width"
          className="w-full rounded-xl border border-white/10"
        />
      </div>
    </section>
  )
}
