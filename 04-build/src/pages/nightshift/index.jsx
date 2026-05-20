import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * <NightshiftPage /> — coming-soon teaser for the Nightshift project.
 *
 * This is NOT a case study. Nightshift is unannounced; the page is a
 * single full-viewport teaser that borrows the home hero's "living
 * window" register so it reads as part of the same site:
 *
 *   - Full-bleed looping video (UnderConstruction_Video) behind a
 *     constant legibility scrim — the same 3-stop dark wash the home
 *     hero uses so off-white text reads on a busy pixel-art frame.
 *   - A centered column carrying the same three type registers as the
 *     home hero: mono chrome (the "Coming soon" / "Under construction"
 *     labels), display serif (the project name, where "Kashfi" sits on
 *     the home hero), and sans body (the one teaser line).
 *
 * What it deliberately drops from the home hero: the live clock, the
 * time-of-day scene schedule, the scroll pin, and the scroll cue —
 * all of those are home-only. There is no content below the fold, so
 * the section is a single 100svh screen.
 *
 * Capability gating mirrors HomeHero:
 *   - prefers-reduced-motion or narrow/coarse pointer (<768px) → the
 *     video does not mount; the poster frame carries the page.
 *   - desktop + motion-ok → video mounts, fades in on canplay.
 *
 * Accessibility: the video and poster are aria-hidden; the project
 * name is a real <h1>; a Return link gives a way back to /work.
 */

const SURFACE_DEEP = '#0F1112'

// Legibility scrim — constant 3-stop vertical wash on the held video,
// mirroring HomeHero's scrim. Mid stop pulled up to 45% so the centered
// column reads clearly; bottom near surface-deep so the frame settles
// into the dark.
const SCRIM_TOP = 'rgba(15, 17, 18, 0.30)'
const SCRIM_MID = 'rgba(15, 17, 18, 0.62)'
const SCRIM_BOTTOM = 'rgba(15, 17, 18, 0.92)'

const VIDEO_SRC = '/nightshift/nightshift-teaser.mp4'
const POSTER_SRC = '/nightshift/nightshift-poster.jpg'

export default function NightshiftPage() {
  // Capability detection — same gates as HomeHero.
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isNarrow, setIsNarrow] = useState(false)

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const widthMq = window.matchMedia('(min-width: 768px)')
    const sync = () => {
      setReducedMotion(motionMq.matches)
      setIsNarrow(!widthMq.matches)
    }
    sync()
    motionMq.addEventListener('change', sync)
    widthMq.addEventListener('change', sync)
    return () => {
      motionMq.removeEventListener('change', sync)
      widthMq.removeEventListener('change', sync)
    }
  }, [])

  const shouldMountVideo = !reducedMotion && !isNarrow

  // Video element — autoplay after canplay, opacity fade-in. Includes
  // the cached-asset shim from HomeHero: if readyState is already high
  // when the effect attaches, canplay may never fire, so trigger once.
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoErrored, setVideoErrored] = useState(false)

  useEffect(() => {
    if (!shouldMountVideo) return undefined
    const v = videoRef.current
    if (!v) return undefined
    const onCanPlay = () => {
      setVideoReady(true)
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
    const onError = () => {
      setVideoErrored(true)
      setVideoReady(false)
    }
    if (v.readyState >= 3) onCanPlay()
    v.addEventListener('canplay', onCanPlay)
    v.addEventListener('error', onError)
    return () => {
      v.removeEventListener('canplay', onCanPlay)
      v.removeEventListener('error', onError)
    }
  }, [shouldMountVideo])

  // Reveal cadence — matches the rest of the site.
  const easing = [0.22, 0.61, 0.36, 1]
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: easing },
  })

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh', backgroundColor: SURFACE_DEEP }}
      aria-label="Nightshift — coming soon"
    >
      {/* Layer 0 — poster (instant paint, and the whole picture on
          reduced-motion / narrow surfaces where the video never mounts) */}
      <img
        src={POSTER_SRC}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        decoding="async"
      />

      {/* Layer 1 — video (desktop + motion-ok only) */}
      {shouldMountVideo && !videoErrored && (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: videoReady ? 1 : 0 }}
        />
      )}

      {/* Layer 2 — legibility scrim (constant, never animates) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${SCRIM_TOP} 0%, ${SCRIM_MID} 45%, ${SCRIM_BOTTOM} 100%)`,
        }}
      />

      {/* Return link — top-left, mono, faint. The one way back out.
          z-20 so it sits ABOVE the centered column (z-10): the column
          is a full-size flex box, later in the DOM, so at equal
          z-index it would paint over the link and swallow the click. */}
      <motion.div {...fadeUp(0.05)} className="absolute left-0 top-0 z-20 p-6 md:p-10">
        <Link
          to="/work"
          className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-text-primary text-hero-legible"
        >
          ← Return
        </Link>
      </motion.div>

      {/* Centered column — mono label / serif name / mono label / teaser.
          The two mono labels bracket the name, echoing the home hero's
          mono chrome around the display serif. */}
      <div className="relative z-10 flex min-h-[100svh] items-center">
        <div className="mx-auto w-full max-w-3xl px-6 py-20 md:px-10 md:py-28">
          {/* Coming-soon kicker — the hype tag, in the accent color */}
          <motion.p
            {...fadeUp(0.15)}
            className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-accent-glow text-hero-legible md:text-sm"
          >
            Coming soon
          </motion.p>

          {/* Project name — display serif, where "Kashfi" sits on the
              home hero. clamp is sized for a 10-letter word: it never
              wraps (single word) and stays inside the column at the
              top end while staying legible on a phone at the low end.
              fontVariantLigatures:none keeps the f/t pair honest. */}
          <motion.h1
            {...fadeUp(0.22)}
            className="font-display leading-[0.95] tracking-[-0.01em] text-text-primary text-hero-legible text-[clamp(3rem,9vw,7rem)]"
            style={{ fontVariantLigatures: 'none' }}
          >
            Nightshift
          </motion.h1>

          {/* Status line — mono, below the name, mirroring the kicker */}
          <motion.p
            {...fadeUp(0.34)}
            className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-text-muted text-hero-legible md:text-sm"
          >
            Under construction
          </motion.p>

          {/* Teaser — the one vague line. No description, on purpose. */}
          <motion.p
            {...fadeUp(0.46)}
            className="mt-5 max-w-md font-sans text-base leading-relaxed text-text-faint text-hero-legible md:text-lg"
          >
            Something new is being built here — after hours, the way the good ones are. Back soon.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
