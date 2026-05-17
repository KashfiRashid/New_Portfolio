import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  getActiveScene,
  getVancouverTimeString,
  HOME_HERO_POSTER,
  HOME_HERO_POSTER_FALLBACK,
} from './homeHeroSchedule.js'

/**
 * <HomeHero /> — full-viewport living window into Kash's day.
 *
 * Layer order (back to front):
 *   0. Poster image (instant paint, no blank frame ever)
 *   1. Looping video, time-of-day aware (mounted only on desktop +
 *      not reduced-motion; faded in on canplay; muted, loop, playsInline)
 *   2. Legibility scrim (fixed gradient, never animates)
 *   3. Identity layer (clock + status + name + identity line + voice
 *      line + status line + photo placeholder + scroll cue)
 *
 * Transition: scroll-driven scale + vignette darken into surface.deep
 * over the last 40% of the hero's height — the room dims and you
 * "leave" into the editorial portfolio below.
 *
 * Accessibility:
 *   - prefers-reduced-motion: video does not mount; scale + bounce gated off
 *   - mobile coarse pointer < 768px: same poster-only fallback
 *   - video is aria-hidden; the name is a real heading
 *   - clock uses tabular numerals so width does not jitter
 *   - autoplay wrapped in play().catch(() => {}); silent failure to poster
 *   - cached-asset edge case handled by readyState check
 */

const SURFACE_DEEP = '#0F1112'
// Scrim is biased toward the lower-left where the name + identity text
// lives, with a top wash so the clock + status read on bright frames,
// and a flat ~22% baseline floor everywhere for the busy middle band.
const SCRIM_BOTTOM = 'rgba(15, 17, 18, 0.88)'
const SCRIM_MID = 'rgba(15, 17, 18, 0.55)'
const SCRIM_TOP = 'rgba(15, 17, 18, 0.35)'
const SCRIM_LEFT = 'rgba(15, 17, 18, 0.85)'
const SCRIM_FADE = 'rgba(15, 17, 18, 0.0)'

/** Photo slot — honest placeholder until /home/kash.jpg lands. */
function PhotoPlaceholder() {
  return (
    <div
      className="
        relative shrink-0
        w-20 h-20 md:w-24 md:h-24
        rounded-sm
        border border-dashed border-white/[0.18]
        bg-white/[0.02]
        flex flex-col items-center justify-center
        font-mono text-[9px] uppercase tracking-[0.16em] text-text-faint
        select-none
      "
      aria-label="Photo placeholder — pending /home/kash.jpg"
      title="/home/kash.jpg pending — square, face crop"
    >
      <span>photo</span>
      <span className="text-text-faint/60 mt-0.5 normal-case tracking-normal text-[8px]">pending</span>
    </div>
  )
}

export default function HomeHero() {
  // -------------------------------------------------------------------
  // Capability detection
  // -------------------------------------------------------------------
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isNarrow, setIsNarrow] = useState(false)

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const widthMq = window.matchMedia('(min-width: 768px)')
    const setBoth = () => {
      setReducedMotion(motionMq.matches)
      setIsNarrow(!widthMq.matches)
    }
    setBoth()
    motionMq.addEventListener('change', setBoth)
    widthMq.addEventListener('change', setBoth)
    return () => {
      motionMq.removeEventListener('change', setBoth)
      widthMq.removeEventListener('change', setBoth)
    }
  }, [])

  const shouldMountVideo = !reducedMotion && !isNarrow

  // -------------------------------------------------------------------
  // Active scene — re-evaluated every minute (covers boundary crossings
  // on long-open tabs)
  // -------------------------------------------------------------------
  const [scene, setScene] = useState(() => getActiveScene())
  useEffect(() => {
    const id = setInterval(() => setScene(getActiveScene()), 60 * 1000)
    return () => clearInterval(id)
  }, [])

  // -------------------------------------------------------------------
  // Live clock — 1s tick
  // -------------------------------------------------------------------
  const [timeString, setTimeString] = useState(() => getVancouverTimeString())
  useEffect(() => {
    const id = setInterval(() => setTimeString(getVancouverTimeString()), 1000)
    return () => clearInterval(id)
  }, [])

  // -------------------------------------------------------------------
  // Video element — autoplay after canplay, opacity fade in.
  // Includes a cached-asset shim: if readyState >= 3 by the time the
  // effect attaches (Safari, back-forward cache, repeat visits), the
  // canplay event may never fire, so we trigger manually.
  // -------------------------------------------------------------------
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoErrored, setVideoErrored] = useState(false)

  useEffect(() => {
    setVideoReady(false)
    setVideoErrored(false)
  }, [scene.video])

  useEffect(() => {
    if (!shouldMountVideo) return
    const v = videoRef.current
    if (!v) return
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
  }, [shouldMountVideo, scene.video])

  // -------------------------------------------------------------------
  // Scroll-driven transition. Framer-motion's useTransform applies
  // inline styles that bypass the global "prefers-reduced-motion" CSS
  // rule, so we gate both transforms explicitly here.
  // -------------------------------------------------------------------
  const wrapperRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  })
  const sceneScale = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [1, 1.06]
  )
  const vignetteOpacity = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.6, 1],
    reducedMotion ? [0, 0] : [0, 1]
  )

  // -------------------------------------------------------------------
  // Identity copy
  // -------------------------------------------------------------------
  const identityLine =
    'Designer and developer. I find the real problem and ship the disciplined version of it.'
  const voiceLine =
    'I design and ship. Mostly at 2am. Mostly with AI as the orchestra and me as the conductor.'
  const statusLine =
    'Currently at FIC IT Squad · graduating SFU SIAT June 10 · Delta, BC'

  // -------------------------------------------------------------------
  // Reveal cadence — matches the rest of the site
  // -------------------------------------------------------------------
  const easing = useMemo(() => [0.22, 0.61, 0.36, 1], [])
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: easing },
  })

  return (
    <section
      ref={wrapperRef}
      className="relative w-full"
      style={{ minHeight: '100svh', backgroundColor: SURFACE_DEEP }}
      aria-label="Kashfi Rashid — designer and developer"
    >
      {/* The scene wrapper scales on scroll; everything visual sits inside. */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ scale: sceneScale }}
      >
        {/* Layer 0 — poster (instant paint) */}
        <picture aria-hidden="true">
          <source srcSet={HOME_HERO_POSTER} type="image/webp" />
          <img
            src={HOME_HERO_POSTER_FALLBACK}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            decoding="async"
          />
        </picture>

        {/* Layer 1 — video (capable surfaces only) */}
        {shouldMountVideo && !videoErrored && (
          <video
            ref={videoRef}
            key={scene.video}
            src={scene.video}
            muted
            loop
            playsInline
            preload="metadata"
            autoPlay
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: videoReady ? 1 : 0 }}
          />
        )}

        {/* Layer 2 — legibility scrim (3 stacked gradients + floor) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              `linear-gradient(180deg, ${SCRIM_TOP} 0%, ${SCRIM_MID} 50%, ${SCRIM_BOTTOM} 100%),` +
              `linear-gradient(90deg, ${SCRIM_LEFT} 0%, ${SCRIM_MID} 40%, ${SCRIM_FADE} 75%),` +
              `rgba(15, 17, 18, 0.22)`,
          }}
        />

        {/* Vignette darken — scroll-driven (the room dimming) */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: vignetteOpacity,
            background:
              `radial-gradient(ellipse 120% 80% at 50% 70%, transparent 0%, ${SURFACE_DEEP} 75%)`,
          }}
        />
      </motion.div>

      {/* Layer 3 — identity content (above the scene, does NOT scale) */}
      <div
        className="relative z-10 flex flex-col w-full"
        style={{ minHeight: '100svh' }}
      >
        {/* Top row — clock left, status right */}
        <motion.div
          {...fadeUp(0.05)}
          className="flex items-start justify-between gap-4 px-6 pt-8 md:px-10 md:pt-10 max-w-6xl mx-auto w-full"
        >
          <span
            className="font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-text-muted"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {timeString}
          </span>
          <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-text-faint text-right">
            {scene.status}
          </span>
        </motion.div>

        {/* Center stack — the load-bearing identity */}
        <div className="flex-1 flex items-center">
          <div className="px-6 md:px-10 max-w-6xl mx-auto w-full py-16 md:py-24">
            <motion.p
              {...fadeUp(0.15)}
              className="font-mono text-xs uppercase tracking-[0.22em] text-text-faint mb-4"
            >
              my name is
            </motion.p>

            <div className="flex items-end gap-5 md:gap-6 mb-6">
              <motion.h1
                {...fadeUp(0.22)}
                className="text-display-xl font-display tracking-tight text-text-primary leading-[0.95]"
              >
                Kashfi Rashid
              </motion.h1>
              <motion.div {...fadeUp(0.32)} className="pb-2 hidden sm:block">
                <PhotoPlaceholder />
              </motion.div>
            </div>

            <motion.p
              {...fadeUp(0.38)}
              className="text-text-primary text-lg md:text-xl leading-relaxed max-w-prose mb-5"
            >
              {identityLine}
            </motion.p>

            <motion.p
              {...fadeUp(0.46)}
              className="text-text-muted text-base md:text-lg leading-relaxed max-w-prose mb-6"
            >
              {voiceLine}
            </motion.p>

            <motion.p
              {...fadeUp(0.54)}
              className="font-mono text-xs md:text-sm text-text-faint"
            >
              {statusLine}
            </motion.p>

            {scene.isFallbackVideo && (
              <motion.p
                {...fadeUp(0.62)}
                className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint/70"
              >
                scene set: working · other time-of-day clips pending
              </motion.p>
            )}
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          {...fadeUp(0.7)}
          className="px-6 md:px-10 pb-8 md:pb-10 max-w-6xl mx-auto w-full flex items-center justify-center"
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-faint inline-flex items-center gap-2"
            aria-hidden="true"
          >
            <motion.span
              animate={reducedMotion ? { y: 0 } : { y: [0, 3, 0] }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
              }
              className="inline-block"
            >
              ↓
            </motion.span>
            scroll
          </span>
        </motion.div>
      </div>
    </section>
  )
}
