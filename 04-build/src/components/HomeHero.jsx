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
 * Welcome-act mechanics:
 *   - The outer <section> is HOME_HERO_PIN_VH * 100vh tall (default 2x).
 *   - A sticky 100vh frame inside holds the scene + the identity content,
 *     so the video stays fixed and playing while the visitor scrolls.
 *   - The identity content (clock, name, lines, scroll cue) translates
 *     upward over the held video for ~80% of the section's scroll, then
 *     fades out as the existing dark scale + vignette release fires once
 *     in the last ~18% of the section.
 *   - The sticky is contained inside the hero section, so the video
 *     never extends behind the Work / cards / Hall of Fame / Featured
 *     Work sections — the room is the prologue, the work is the canvas.
 *
 * Layer order (back to front), inside the sticky frame:
 *   0. Poster image (instant paint, no blank frame ever)
 *   1. Looping video, time-of-day aware (mounted only on desktop +
 *      not reduced-motion; faded in on canplay; muted, loop, playsInline)
 *   2. Legibility scrim (fixed gradient, never animates)
 *   3. Vignette darken (scroll-driven, fires once at release)
 *   4. Identity content layer — translates up; opacity fades at release
 *
 * Accessibility:
 *   - prefers-reduced-motion: video does not mount; scale + bounce gated
 *     off; section height drops to 100svh so no extra pin scroll
 *   - mobile coarse pointer < 768px: same poster-only fallback (video off)
 *   - video is aria-hidden; the name is a real heading
 *   - clock uses tabular numerals so width does not jitter
 *   - autoplay wrapped in play().catch(() => {}); silent failure to poster
 *   - cached-asset edge case handled by readyState check
 */

const SURFACE_DEEP = '#0F1112'
// Legibility scrim — a constant vertical wash on top of the held video.
// Three-stop gradient with the mid stop pulled UP to 45% of the height,
// so the upper-middle (where the name and identity lines sit) gets
// dark fast enough for the off-white text to read clearly against
// the busy pixel-art room, while the top stays light enough that
// the clock and scene status feel "in the room" rather than on a
// banner.
//
// The bottom is pushed to ~95% surface-deep so the held video meets
// the footer's solid surface-deep background almost exactly — no
// visible seam where the section ends and the footer begins. The
// existing scale + vignette release at HOME_HERO_RELEASE_START closes
// the last 5% during the transition.
//
// Stays at full opacity for the entire pin — does NOT fade out. The
// steady-state dim is what makes the room read as the 2am studio it
// is, not as a bright wallpaper.
//
// Tunable:
//   - SCRIM_TOP ~0.18–0.32 for top legibility
//   - SCRIM_MID ~0.50–0.65 for the name area
//   - SCRIM_BOTTOM ~0.88–1.00 for the footer blend
const SCRIM_TOP = 'rgba(15, 17, 18, 0.28)'
const SCRIM_MID = 'rgba(15, 17, 18, 0.58)'
const SCRIM_BOTTOM = 'rgba(15, 17, 18, 0.95)'

// === Welcome-act pin distance (standalone fallback) ===
// Used only when HomeHero is rendered without children — in that case
// the section is `HOME_HERO_PIN_VH * 100vh` tall and pins the scene
// for that span. One-line tunable between 1.5 and 3.0. Default 2.0.
//
// In the primary usage (Home wraps its content as `<HomeHero>...</HomeHero>`),
// the section height is content-driven and the video stays pinned for
// the entire homepage scroll — see the `HOME_HERO_RELEASE_START` constant
// below for where the scale + vignette release fires.
const HOME_HERO_PIN_VH = 2.0

// === Release fraction ===
// Where the scale + vignette release fires inside the section's
// scrollYProgress. Progress 1 corresponds to the section's bottom
// hitting the top of the viewport — i.e., the moment the footer would
// enter. Default 0.88 means the room dims through the last 12% of the
// homepage scroll, landing the release right before the footer.
const HOME_HERO_RELEASE_START = 0.88

// === Identity column fade window ===
// Where the centered identity column (name, lines, scroll cue) leaves
// the viewport. Expressed as raw scrollY pixels so the timing stays
// consistent regardless of how tall the section is. By 700px of scroll
// the column is fully off-screen; the held video reads as itself behind
// the editorial sections, with only the sticky clock+status header
// staying pinned at the top.
const IDENTITY_FADE_PX = 700

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
  const { scrollYProgress, scrollY } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  })

  // Scale + vignette release — fires once in the last ~12% of the
  // section, landing right before the footer enters the viewport.
  const sceneScale = useTransform(
    scrollYProgress,
    [HOME_HERO_RELEASE_START, 1],
    reducedMotion ? [1, 1] : [1, 1.06]
  )
  const vignetteOpacity = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [HOME_HERO_RELEASE_START, 1],
    reducedMotion ? [0, 0] : [0, 1]
  )

  // Identity column translates up and fades within the first viewport
  // of scroll — by ~700px the centered name + lines + scroll cue are
  // off-screen and the cards rise into place over the held video.
  // Driven by raw scrollY (px) so the curve is consistent regardless
  // of how tall the section grows from the children below.
  const contentY = useTransform(
    scrollY,
    reducedMotion ? [0, 1] : [0, IDENTITY_FADE_PX],
    reducedMotion ? ['0vh', '0vh'] : ['0vh', '-110vh']
  )
  const contentOpacity = useTransform(
    scrollY,
    reducedMotion ? [0, 1] : [IDENTITY_FADE_PX * 0.6, IDENTITY_FADE_PX],
    reducedMotion ? [1, 1] : [1, 0]
  )

  // Sticky clock + status header fade — stays full while the page
  // scrolls; fades quickly through the scale + vignette release so the
  // chrome doesn't bleed into the footer.
  const stickyHeaderOpacity = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [HOME_HERO_RELEASE_START, HOME_HERO_RELEASE_START + 0.06],
    reducedMotion ? [1, 1] : [1, 0]
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
  //   - With children (primary usage from Home.jsx): height is content-
  //     driven, so the sticky frame pins the scene for the entire
  //     homepage scroll. Cards + HoF + Featured Work + "shipped" rise
  //     up over the held video.
  //   - Without children (standalone fallback): fixed at
  //     HOME_HERO_PIN_VH * 100vh, with the reduced-motion 100svh
  //     collapse so reduced-motion visitors don't pay the pin cost.
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
      {/* Sticky frame — pins the scene for the welcome act / entire page.
          When children are passed, this sticky stays pinned through the
          editorial sections (cards rise up over the held video). When
          standalone, it pins for HOME_HERO_PIN_VH viewport heights. */}
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

          {/* Layer 2 — legibility scrim. Constant 3-stop vertical wash
              on the held video. The mid stop is pulled up to 45% of
              the height so the upper-middle (where the name + identity
              lines live) gets dark fast enough for off-white text to
              read clearly against the busy pixel-art room. The bottom
              approaches surface-deep so the held video meets the
              footer's solid background with no visible seam at the
              section's end. Does NOT fade with scroll. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, ${SCRIM_TOP} 0%, ${SCRIM_MID} 45%, ${SCRIM_BOTTOM} 100%)`,
            }}
          />

          {/* Vignette darken — scroll-driven (the room dimming). Fires
              once in the last segment of the pin span. */}
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

        {/* Sticky top header — clock left, scene status right. Sits
            above the held video and DOES NOT translate with content, so
            it stays pinned at the top of the viewport for the entire
            page scroll. Fades out through the release at the bottom of
            the section so the chrome doesn't bleed into the footer.
            Gradient backdrop + hairline define it as a discrete element.

            Note: opacity is driven by a MotionValue (stickyHeaderOpacity)
            so we don't use the fadeUp helper here — that would set
            initial:opacity:0 which collides with the MotionValue. */}
        <motion.div
          initial={{ y: 8 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: easing }}
          className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
          style={{ opacity: stickyHeaderOpacity }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                'linear-gradient(180deg, rgba(15,17,18,0.78) 0%, rgba(15,17,18,0.45) 55%, rgba(15,17,18,0) 100%)',
            }}
          />
          <div className="max-w-6xl mx-auto w-full flex items-start justify-between gap-4 px-6 pt-8 pb-7 md:px-10 md:pt-10 md:pb-9">
            {/* Clock — Heading 1 register, mono, tabular-nums */}
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
            {/* Scene status — Caption, right-aligned, subordinate to clock */}
            <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-text-faint text-right pt-2 max-w-[14rem]">
              {scene.status}
            </span>
          </div>
          {/* Hairline separator — quietly defines the header zone */}
          <div
            aria-hidden="true"
            className="absolute inset-x-6 md:inset-x-10 bottom-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(232, 230, 225, 0.10) 20%, rgba(232, 230, 225, 0.10) 80%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* Scrolling identity column — name + identity + voice + status
            + fallback note + scroll cue. Translates up via contentY and
            slides under the pinned clock/status header above; opacity
            fades through the existing scale + vignette release. */}
        <motion.div
          className="relative z-10 flex flex-col w-full h-full"
          style={{ y: contentY, opacity: contentOpacity, willChange: 'transform, opacity' }}
        >
          {/* Centered identity column — name + identity + voice + status
              + fallback note share one aligned measure. Type scale per
              01-brand-book/06-visual-direction.md. */}
          <div className="flex-1 flex items-center">
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

          {/* Scroll cue */}
          <motion.div
            {...fadeUp(0.7)}
            className="px-6 md:px-10 pb-8 md:pb-10 max-w-6xl mx-auto w-full flex items-center justify-center"
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
        </motion.div>
      </div>

      {/* Children — the rest of the homepage (top bar, editorial,
          cards, HoF, Featured Work, "shipped"). Flows after the sticky
          in document order, so each section rises up over the held
          video as the visitor scrolls. The scale + vignette release
          lands right before the section ends and the footer takes
          over. */}
      {hasChildren && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </section>
  )
}
