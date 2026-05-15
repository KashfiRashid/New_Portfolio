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
            Spectral Bloom
          </h1>
          <p className="max-w-[640px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            A real-time audio visualizer that reads the meaning of music, not just its volume. I built the engine, the five visualization modes, and the AI layer that turns sound into a creative brief.
          </p>
        </header>

        <MetaBlock
          rows={[
            { label: 'Context', value: 'IAT 460 Generative AI · SFU · Final Project' },
            { label: 'Stack', value: 'Three.js r128 · Web Audio API · Claude API · Vanilla JS' },
            { label: 'Role', value: 'Solo: concept, engine, AI layer, interface, design' },
            { label: 'Duration', value: 'Spring 2026 · 6 weeks' },
          ]}
        />

        {/* Hero video — the 1-minute walkthrough, embedded directly. Plays
            on load, muted, looping. No music in the demo so the visualizer
            speaks for itself. */}
        <figure className="space-y-3">
          <video
            className="w-full rounded-lg border border-white/[0.08]"
            src="/spectral-bloom/spectral-bloom-demo.mp4"
            poster="/spectral-bloom/spectral-bloom-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            controls
          />
          <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
            One-minute capture · live mic and file playback across all five modes
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
