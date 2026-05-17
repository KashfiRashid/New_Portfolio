import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  getActiveScene,
  getVancouverTimeString,
  HOME_HERO_POSTER,
  HOME_HERO_POSTER_FALLBACK,
} from './homeHeroSchedule.js'

/**
 * <HomeHero /> — full-viewport living window into Kash's day, now a
 * full-page wrapper.
 *
 * Welcome-act mechanics (May 2026, "pin extends to footer" variant):
 *   - <HomeHero> now accepts `children` and wraps the entire editorial
 *     homepage. The outer <section>'s height is content-driven (the
 *     children determine how tall the page is).
 *   - A sticky 100vh frame inside holds the scene (poster, video, scrim,
 *     vignette). Because the section is now taller than the sticky, the
 *     scene stays pinned for the full editorial scroll.
 *   - The identity content (clock, name, lines, scroll cue) is an
 *     absolute overlay covering the first viewport on top of the sticky.
 *     It scrolls naturally with the document (no transform), so once the
 *     visitor scrolls past the first viewport the editorial cards rise
 *     up over the held video.
 *   - The scale + vignette release fires once in the last ~12% of the
 *     section's scrollYProgress, landing right before the footer enters.
 *
 * Standalone fallback (when called with no children):
 *   - Section is HOME_HERO_PIN_VH * 100vh tall (or 100svh under
 *     reduced motion). Same sticky/identity/release behavior, but
 *     scoped to the hero only.
 *
 * Layer order (back to front), inside the section:
 *   0. Sticky frame
 *      a. Poster (instant paint, no blank frame ever)
 *      b. Video, time-of-day aware (desktop + not reduced-motion only;
 *         faded in on canplay; muted, loop, playsInline)
 *      c. Legibility scrim (fixed gradient, never animates)
 *      d. Vignette darken (scroll-driven, fires once at release)
 *   1. Identity content overlay (absolute, first viewport, scrolls
 *      naturally with the document)
 *   2. Children — the rest of the homepage, flowing after the sticky
 *      so it rises over the held scene
 *
 * Accessibility:
 *   - prefers-reduced-motion: video does not mount; scale + bounce gated
 *     off; standalone-fallback section drops to 100svh; children-mode
 *     section is still content-driven (release transforms are no-ops)
 *   - mobile coarse pointer < 768px: same poster-only fallback (video off)
 *   - video is aria-hidden; the name is a real heading
 *   - clock uses tabular numerals so width does not jitter
 *   - autoplay wrapped in play().catch(() => {}); silent failure to poster
 *   - cached-asset edge case handled by readyState check
 *   - identity overlay's outer wrapper is pointer-events: none so clicks
 *     in the gaps fall through; only the interactive bits get auto.
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

// === Welcome-act pin distance (legacy / fallback) ===
// Originally the hero section was `HOME_HERO_PIN_VH * 100vh` tall and
// pinned the scene for the welcome act before releasing into the editorial
// homepage on a clean canvas. After Kash's "try that once" exploration,
// the scene is now pinned for the entire homepage (the editorial scrolls
// over the held video), so the section height is content-driven through
// `children` and this constant only kicks in if HomeHero is rendered
// without children — i.e., it's the standalone-hero fallback height.
//
// One-line tunable between 1.5 (snappy) and 3.0 (lingering).
const HOME_HERO_PIN_VH = 2.0

// === Release fraction ===
// Where the scale + vignette release fires inside the section's
// scrollYProgress. The section's scrollYProgress runs 0..1 from "top of
// section meets top of viewport" to "bottom of section meets top of
// viewport" — i.e., 1 corresponds to the section being fully scrolled
// past, which is the moment the footer would enter the viewport.
//
// Default 0.88 means the room dims through the last 12% of the homepage
// scroll, landing the release right before the footer.
const HOME_HERO_RELEASE_START = 0.88

/** Photo slot — honest placeholder until /home/kash.jpg lands.
 *  NOTE: As of the welcome-act refinement, this is no longer rendered —
 *  the name block stands on its own. The function is kept dormant so the
 *  visual treatment is recoverable if a real photo ships later. */
// eslint-disable-next-line no-unused-vars
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

export default function HomeHero({ children } = {}) {
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
  //
  // The outer section is HOME_HERO_PIN_VH viewport-heights tall and
  // contains a sticky 100vh frame. scrollYProgress goes 0..1 across the
  // full section. The content column rides upward over the pinned video
  // for most of that range; the existing scale + vignette release fires
  // once in the last ~18% so it lands at the unpin moment.
  // -------------------------------------------------------------------
  const wrapperRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  })

  // In the "pin extends to footer" mode (children passed), the section
  // height is content-driven and the sticky pins the scene for the entire
  // homepage scroll. Identity content is overlaid on the first viewport
  // and scrolls away naturally — no contentY translation needed, the
  // document scroll does the work.
  //
  // The scale + vignette release fires once at the very end of the
  // section, just before the footer enters. That's the only thing the
  // scroll-progress drives in this mode.
  const RELEASE_START = HOME_HERO_RELEASE_START

  const sceneScale = useTransform(
    scrollYProgress,
    [RELEASE_START, 1],
    reducedMotion ? [1, 1] : [1, 1.06]
  )
  const vignetteOpacity = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [RELEASE_START, 1],
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

  // -------------------------------------------------------------------
  // Clock parts — split the engine's string into a prominent time and a
  // secondary "PST · Delta, BC" meta line. We do NOT change the engine
  // (homeHeroSchedule.js stays exactly as it is) — we just present it
  // with hierarchy.
  //
  // Timezone label is normalized to "PST" per brand preference. The Intl
  // engine returns "PDT" in summer (Pacific Daylight) and "PST" in winter
  // (Pacific Standard); the brand wants the static "PST" tag, so we
  // rewrite at the display layer only — the actual displayed time stays
  // accurate for America/Vancouver regardless of season.
  // Format coming in: "HH:MM:SS <PDT|PST|PT> · Delta, BC".
  // -------------------------------------------------------------------
  const clockSpaceIdx = timeString.indexOf(' ')
  const clockTime =
    clockSpaceIdx > -1 ? timeString.slice(0, clockSpaceIdx) : timeString
  const clockMetaRaw =
    clockSpaceIdx > -1 ? timeString.slice(clockSpaceIdx + 1) : ''
  const clockMeta = clockMetaRaw.replace(/^P(?:DT|ST|T)\b/, 'PST')

  // Section sizing:
  //   - With children (the Home wrap-everything mode): height is content-
  //     driven. The sticky pins for the entire section, the identity
  //     overlay rides the first viewport via natural scroll, and children
  //     flow after the sticky so they rise over the held video.
  //   - Without children (standalone fallback): old behavior — fixed
  //     section height = HOME_HERO_PIN_VH * 100vh, or 100svh under
  //     prefers-reduced-motion.
  const hasChildren = children !== undefined && children !== null
  const sectionStyle = hasChildren
    ? { minHeight: '100svh', backgroundColor: SURFACE_DEEP }
    : {
        height: reducedMotion ? '100svh' : `${HOME_HERO_PIN_VH * 100}vh`,
        backgroundColor: SURFACE_DEEP,
      }

  return (
    <section
      ref={wrapperRef}
      className="relative w-full"
      style={sectionStyle}
      aria-label="Kashfi Rashid — designer and developer"
    >
      {/* Sticky scene — pinned for the entire section's scroll. With
          children, this means the video stays held all the way through
          the editorial homepage; release fires once at the bottom, just
          before the footer takes over. Without children, it pins for the
          old welcome-act window. */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden z-0"
        style={{ backgroundColor: SURFACE_DEEP }}
      >
        {/* The scene wrapper scales on scroll release; everything visual
            sits inside. */}
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

          {/* Vignette darken — scroll-driven (the room dimming). Fires
              once in the last segment of the section, landing the
              transition right before the footer enters the viewport. */}
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
      </div>

      {/* Identity content overlay — absolute, covers the first viewport on
          top of the sticky scene. Scrolls away naturally with the
          document (no transform), so by the time the editorial sections
          rise up they cover the now-empty hero zone behind the held video. */}
      <div className="absolute top-0 left-0 right-0 h-screen z-10 flex flex-col w-full pointer-events-none">
        {/* Top row — enlarged clock left, scene status right */}
        <motion.div
          {...fadeUp(0.05)}
          className="flex items-start justify-between gap-4 px-6 pt-8 md:px-10 md:pt-10 max-w-6xl mx-auto w-full pointer-events-auto"
        >
          {/* Clock — Heading 1 register per 06-visual-direction.md
              (44–52px range). Mono, tabular-nums, flat tracking so the
              seconds digit doesn't jitter the width. */}
          <div className="flex flex-col items-start leading-none">
            <span
              className="font-mono text-[2.75rem] md:text-[3rem] lg:text-[3.25rem] font-semibold text-text-primary leading-none"
              style={{
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0',
              }}
              aria-label={`Current time in Delta, BC: ${clockTime} ${clockMeta}`}
            >
              {clockTime}
            </span>
            {clockMeta && (
              <span
                aria-hidden="true"
                className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-text-muted mt-2.5"
              >
                {clockMeta}
              </span>
            )}
          </div>
          {/* Scene status — Caption register (12px), faint, right-aligned.
              Stays subordinate to the clock so the hierarchy reads. */}
          <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-text-faint text-right pt-2">
            {scene.status}
          </span>
        </motion.div>

        {/* Centered identity column — name, identity, voice, status, and
            the honest fallback note share one aligned measure.
            Type scale calibrated to 06-visual-direction.md:
              kicker → Caption  (~12px, mono, wide tracking)
              name   → Hero     (display-xl, 48–80px, line-height 1.05)
              identity → Body+  (16–18px, line-height 1.55)
              voice    → Body   (16px, line-height 1.55)
              status   → Small  (14px, mono)
              fallback → Caption (12px, faint)
        */}
        <div className="flex-1 flex items-center pointer-events-auto">
          <div className="px-6 md:px-10 mx-auto max-w-2xl w-full py-16 md:py-24">
            <motion.p
              {...fadeUp(0.15)}
              className="font-mono text-xs uppercase tracking-[0.22em] text-text-faint mb-5"
            >
              my name is
            </motion.p>

            <motion.h1
              {...fadeUp(0.22)}
              className="text-display-xl font-display tracking-tight text-text-primary leading-[1.05] mb-7"
            >
              Kashfi Rashid
            </motion.h1>

            <motion.p
              {...fadeUp(0.38)}
              className="text-text-primary text-base md:text-lg leading-[1.55] max-w-prose mb-5"
            >
              {identityLine}
            </motion.p>

            <motion.p
              {...fadeUp(0.46)}
              className="text-text-muted text-base leading-[1.55] max-w-prose mb-7"
            >
              {voiceLine}
            </motion.p>

            <motion.p
              {...fadeUp(0.54)}
              className="font-mono text-sm text-text-faint leading-[1.5]"
            >
              {statusLine}
            </motion.p>

            {scene.isFallbackVideo && (
              <motion.p
                {...fadeUp(0.62)}
                className="mt-6 font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-text-faint/80"
              >
                scene set: working · other time-of-day clips pending
              </motion.p>
            )}
          </div>
        </div>

        {/* Scroll cue — Caption register (~12px) per the brand book.
            The previous 10px sat below the caption baseline and read as
            too small relative to the rest of the chrome. */}
        <motion.div
          {...fadeUp(0.7)}
          className="px-6 md:px-10 pb-8 md:pb-10 max-w-6xl mx-auto w-full flex items-center justify-center pointer-events-auto"
        >
          <span
            className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-text-faint inline-flex items-center gap-2"
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

      {/* Children — the rest of the homepage. Flows after the sticky in
          the document, so the cards / Hall of Fame / Featured Work /
          shipped line rise up over the held video as the visitor scrolls.
          The scale + vignette release lands right before this section
          ends and the footer takes over. */}
      {hasChildren && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </section>
  )
}
