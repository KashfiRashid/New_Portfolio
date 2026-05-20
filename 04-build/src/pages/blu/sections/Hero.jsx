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
            BLU
          </h1>
          <p className="max-w-[640px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            A three-act animated short about a duckling who follows a blue feather into a wasteland it was warned to avoid. I held the creative direction, built both worlds, and designed the sound that carries the antagonist.
          </p>
        </header>
        <MetaBlock
          rows={[
            { label: 'Team', value: 'Semyon Kuznetsov, Benjamin Nichiporik, Kashfi Rashid, Abdul Aziz Hamoui, Cohen Jasper ter Heide, Eric Gabriel Cheng Li' },
            { label: 'My Roles', value: 'Creative Director · 3D Environment Modeler · Immersive Sound Engineer' },
            { label: 'Duration', value: 'Summer 2025 · 10 weeks' },
            { label: 'Software', value: 'Blender · Adobe Suite · immersive sound design' },
            { label: 'Context', value: 'CG Animation · SFU SIAT · Summer 2025' },
            { label: 'Format', value: '3-act CG short, ~2 to 3 minutes' },
          ]}
        />
        {/* TODO: download from Framer and self-host under /public/blu/hero-poster.png */}
        <img
          src="https://framerusercontent.com/images/dquDNrFwQ9hzCWLFQ1R8IxLEn1I.png"
          alt="BLU film poster: the duckling reaching toward the blue feather at the edge of Lumaland."
          loading="lazy"
          className="block w-full rounded-lg border border-white/[0.06] bg-zinc-900/40 object-cover"
        />
      </div>
    </section>
  )
}
