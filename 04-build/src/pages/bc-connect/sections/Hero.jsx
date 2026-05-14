import { MetaBlock, AssetPlaceholder } from '../primitives.jsx'

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
            A unified directory of British Columbia's startup ecosystem. I led the design system and the frontend that surfaces 90,000+ businesses through one searchable interface, and made the late-night calls that shaped both.
          </p>
        </header>
        <MetaBlock
          rows={[
            { label: 'Team', value: 'Abdul Aziz Hamoui, Veeraj Mishra, Kashfi Rashid' },
            { label: 'Stack', value: 'Next.js · React · Tailwind · MongoDB · JWT' },
            { label: 'Duration', value: 'Spring 2026 · 8 weeks' },
          ]}
        />
        <AssetPlaceholder
          kind="SCREENSHOT"
          slotId="Slot 1, Hero"
          dimensions="2400 × 1500 · 16:10"
          description="Full BC Connect landing page (desktop). Hero, value prop, lattice background visible."
        />
      </div>
    </section>
  )
}
