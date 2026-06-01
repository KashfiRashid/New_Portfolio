import { useEffect, useRef, useState } from 'react'
import { SerifHeadline, MonoLine } from '../primitives.jsx'

/**
 * Hero - full viewport. Reuses /home/scene-working.mp4, dimmed, as a quieter
 * register than the homepage hero. Respects prefers-reduced-motion (paused,
 * poster shown). Pure ASCII source (formatter-safe).
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
      aria-label="kashfi rashid about hero"
      className="relative flex h-screen min-h-[560px] w-full items-end overflow-hidden"
      style={{ backgroundColor: '#0F1112' }}
    >
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
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15,17,18,0.25) 0%, rgba(15,17,18,0.55) 60%, rgba(15,17,18,0.78) 100%)',
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-16 md:pb-24">
        <SerifHeadline size="lg" className="text-white">
          kashfi rashid
        </SerifHeadline>
        <SerifHeadline size="md" className="mt-2 italic">
          <span className="text-white/85">design engineer. mostly at 2am.</span>
        </SerifHeadline>
        <MonoLine size="md" className="mt-6 max-w-[560px]">
          <span style={{ color: 'rgba(255,255,255,0.75)' }}>
            SFU SIAT, class of 2026. Delta, BC.
          </span>
        </MonoLine>
      </div>
    </section>
  )
}
