import { useEffect, useRef, useState } from 'react'
import { SerifHeadline, MonoLine, ABOUT_INK } from '../primitives.jsx'

/**
 * Hero — Block 0. Full viewport.
 *
 * Reuses /home/scene-working.mp4 (the only working scene) as the about
 * hero. The video is dimmed and slightly desaturated so the about hero
 * reads as a quieter register than the homepage hero — same room, later
 * in the night.
 *
 * Overlay (per brief):
 *   - "kashfi rashid" in Instrument Serif large
 *   - "design engineer. mostly at 2am." slightly smaller, same family
 *   - DM Mono subline: "final-year SFU SIAT. graduating June 10, 2026. Delta, BC."
 *   - No CTA, no scroll arrow.
 *
 * Respects prefers-reduced-motion: the video is paused and a static
 * poster is shown instead (matches the homepage hero discipline).
 */
export default function Hero() {
  const videoRef = useRef(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const handler = (e) => setReduceMotion(e.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (reduceMotion) {
      try { v.pause() } catch {}
    } else {
      v.play?.().catch(() => {})
    }
  }, [reduceMotion])

  return (
    <section
      aria-label="kashfi rashid — about hero"
      className="relative flex h-screen min-h-[560px] w-full items-end overflow-hidden"
      style={{ backgroundColor: '#0F1112' }}
    >
      {/* Video layer — kept behind the overlay scrim, slightly dimmed */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/home/scene-working.mp4"
        poster="/home/hero-poster.webp"
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={{ filter: 'saturate(0.85) brightness(0.78)' }}
      />

      {/* Tint scrim — pulls the room down so the white headline reads
          without competing with the lamp light. Top is gentle, bottom is
          heavier where the copy sits. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15,17,18,0.25) 0%, rgba(15,17,18,0.55) 60%, rgba(15,17,18,0.78) 100%)',
        }}
      />

      {/* Copy column — bottom-left, restrained */}
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-16 md:pb-24">
        <SerifHeadline size="lg" className="text-white">
          kashfi rashid
        </SerifHeadline>
        <SerifHeadline
          size="md"
          className="mt-2 italic"
          // visually one notch quieter than the name
        >
          <span className="text-white/85">design engineer. mostly at 2am.</span>
        </SerifHeadline>
        <MonoLine size="md" className="mt-6 max-w-[560px]">
          <span className="text-white/75" style={{ color: 'rgba(255,255,255,0.75)' }}>
            final-year SFU SIAT. graduating June 10, 2026. Delta, BC.
          </span>
        </MonoLine>
      </div>
    </section>
  )
}
