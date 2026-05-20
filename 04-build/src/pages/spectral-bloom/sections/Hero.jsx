import { useEffect, useRef, useState } from 'react'
import { MetaBlock } from '../primitives.jsx'

/**
 * Hero video — auto-plays when visible, pauses when scrolled off-screen,
 * and defers loading the src until the visitor actually reaches it. The
 * poster paints instantly so the figure never goes empty. Mirrors the
 * LazyVideo pattern used in sections/FiveModes.jsx so the entire case
 * study has consistent off-screen behavior.
 *
 * Why this exists: previously the hero <video> was `autoPlay loop` with
 * no IntersectionObserver, so the browser kept decoding + compositing
 * the video for the full length of the case study even after the
 * visitor scrolled past. This pauses it once the hero leaves the
 * viewport — frees decode + paint cost for the rest of the page.
 *
 * Keeps `controls` so the visitor can scrub. Threshold 0.25 matches
 * FiveModes' LazyVideo.
 */
function LazyHeroVideo() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className="w-full rounded-lg border border-white/[0.08]"
      src={visible ? '/spectral-bloom/spectral-bloom-demo.mp4' : undefined}
      poster="/spectral-bloom/spectral-bloom-poster.jpg"
      data-cursor-label="sixty seconds"
      muted
      loop
      playsInline
      controls
      preload="none"
    />
  )
}

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
            { label: 'Context', value: 'Generative AI · SFU SIAT · Spring 2026' },
            { label: 'Stack', value: 'Three.js · Web Audio API · Claude · vanilla JavaScript' },
            { label: 'Role', value: 'Solo: concept, engine, AI layer, interface, design' },
            { label: 'Duration', value: 'Spring 2026 · 6 weeks' },
          ]}
        />

        {/* Hero video — the 1-minute walkthrough. Plays when visible,
            pauses when scrolled off-screen. No music in the demo so the
            visualizer speaks for itself. */}
        <figure className="space-y-3">
          <LazyHeroVideo />
          <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
            One-minute capture · live mic and file playback across all five modes
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
