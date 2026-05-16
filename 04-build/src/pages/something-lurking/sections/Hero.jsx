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
            Something Lurking
          </h1>
          <p className="max-w-[640px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            A VR sci-fi horror set aboard a failing space station. The player shrinks to 1:100 and 1:1000 scales to keep the ship alive. Three engineering teammates built the world and the mechanics. I held the story arc, the design philosophy, and the sound.
          </p>
        </header>

        <MetaBlock
          rows={[
            { label: 'Team', value: 'Eric Cheng Li · Kento Weil · Michael Kim · Kashfi Rashid' },
            { label: 'My roles', value: 'Story arc · Design philosophy · Sound · Iteration' },
            { label: 'Stack', value: 'Unity · Blender · Audacity · Eleven Labs · XR Toolkit' },
            { label: 'Course', value: 'IAT 445 Immersive Environments · SFU · Fall 2025' },
          ]}
        />

        {/* Hero video — the team demo, embedded directly from YouTube */}
        <figure className="space-y-3">
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/[0.08] bg-black">
            <iframe
              src="https://www.youtube.com/embed/eK9rhROT4ds?rel=0"
              title="Something Lurking demo walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
            />
          </div>
          <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
            Full demo · IAT 445 final critique cut · Fall 2025
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
