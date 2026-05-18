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

  // Sticky header MASK fade-in. The mask + hairline behind the clock
  // are INVISIBLE when the visitor lands on the page — so the room
  // reads cleanly with the clock floating on it, no dark band cutting
  // off the view. As the visitor starts scrolling and the editorial
  // content rises toward the clock zone, the mask fades in to
  // protect the clock from visual collision with the rising text.
  //
  // 0–150px scroll: mask fully invisible (clean hero)
  // 150–450px:      fades in (catches the editorial as it rises)
  // 450px+:         fully visible (mask doing its job)
  const stickyMaskOpacity = useTransform(
    scrollY,
    reducedMotion ? [0, 1] : [0, 150, 450],
    reducedMotion ? [0, 0] : [0, 0, 1]
  )

  // -------------------------------------------------------------------
  // Identity copy
  // -------------------------------------------------------------------
  // Identity line — one complete sentence, two semantic emphases:
  // "design engineer" (what I am) and "user experience" (what I focus
  // on). Both rendered in the same warm token color via Tailwind class
  // (`text-accent-glow` resolves through
  // theme.extend.colors.accent.glow in tailwind.config.js) plus
  // `font-semibold` — Apple HIG uses BOTH color and weight together
  // for emphasis, not color alone. Single color, two hits.
  //
  // Voice line, status line, and scene-fallback note were intentionally
  // removed from the hero (Apple-style restraint — one intro line, no
  // bluff). Their copy is still defined elsewhere in the project if we
  // want them back somewhere.
  //
  // Do NOT hardcode a hex. Do NOT use visitor color on hero text
  // (default slate is invisible on the dark video background).
  const identityLine = (
    <>
      I am a <span className="text-accent-glow font-semibold">design engineer</span> who loves designing creative solutions for <span className="text-accent-glow font-semibold">user experience</span>.
    </>
  )

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
      {/* Sticky top header (z-30) — clock + scene status pinned to
          viewport top for the entire section scroll. Lives OUTSIDE the
          video sticky frame so it stacks above children (z-10) in the
          section's stacking context; otherwise children's editorial
          content would paint over the clock as it scrolls up.

          Zero-height (`h-0`) — content is positioned absolutely from
          this anchor — so this layer doesn't take flow space; the
          video sticky below it still occupies the first 100vh of flow
          and pins normally.

          The fade-mask backdrop inside this layer is a vertical
          gradient from opaque (top of viewport) to transparent (where
          the hairline sits). As children scroll up through the clock
          zone, they pass behind the gradient and gradually fade out —
          so the editorial text appears to lose opacity as it
          approaches the clock and disappears by the time it crosses
          the hairline. */}
      <motion.div
        initial={{ y: 8 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease: easing }}
        className="sticky top-0 z-30 h-0 pointer-events-none"
        style={{ opacity: stickyHeaderOpacity }}
      >
        {/* Fade-mask backdrop — INVISIBLE at the top of the page so the
            room reads cleanly with the clock floating on it. Fades in
            on scroll (via stickyMaskOpacity) to protect the clock
            from collision with editorial text as it rises.
            Softer gradient (max ~82% surface-deep, not solid black)
            so even when the mask is fully active it feels like a
            "darker zone" rather than a cut-off slab. */}
        <motion.div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0"
          style={{
            opacity: stickyMaskOpacity,
            height: '210px',
            background:
              'linear-gradient(180deg, ' +
              'rgba(15, 17, 18, 0.82) 0%, ' +
              'rgba(15, 17, 18, 0.82) 55%, ' +
              'rgba(15, 17, 18, 0) 100%)',
          }}
        />

        {/* Clock + scene status content. Painted on top of the
            fade-mask backdrop within this z-30 layer. */}
        <div className="absolute top-0 left-0 right-0">
          <div className="max-w-6xl mx-auto w-full flex items-start justify-between gap-4 px-6 pt-8 pb-7 md:px-10 md:pt-10 md:pb-9">
            {/* Clock — Heading 1 register, mono, tabular-nums.
                `text-hero-legible` adds a soft dark halo via text-shadow
                so the digits stay readable on bright video frames
                without needing a visible dark backdrop band. */}
            <div className="flex flex-col items-start leading-none">
              <span
                className="font-mono text-[2.75rem] md:text-[3rem] lg:text-[3.25rem] font-semibold text-text-primary leading-none text-hero-legible"
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
                  className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-text-muted mt-2.5 text-hero-legible"
                >
                  {clockMeta}
                </span>
              )}
            </div>
            {/* Scene status — Caption, right-aligned, subordinate to clock.
                Same legibility halo so it doesn't dissolve on bright frames. */}
            <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-text-faint text-right pt-2 max-w-[14rem] text-hero-legible">
              {scene.status}
            </span>
          </div>
        </div>

        {/* Hairline — fades in with the mask (invisible at top of page,
            visible only when the mask is actively protecting the
            clock). Sits at the bottom of the fade zone where editorial
            text becomes fully visible. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-6 md:inset-x-10 h-px"
          style={{
            top: '210px',
            opacity: stickyMaskOpacity,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(232, 230, 225, 0.10) 20%, rgba(232, 230, 225, 0.10) 80%, transparent 100%)',
          }}
        />
      </motion.div>

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
              {/* Kicker — natural sentence intro, sized properly so it
                  reads at arm's length without straining. Sans-serif
                  (same family as the name), normal case, no extra
                  tracking. The 16-20px range is Apple HIG body-large /
                  callout territory — comfortably legible while still
                  clearly subordinate to the giant name below. */}
              <motion.p
                {...fadeUp(0.15)}
                className="font-sans text-base md:text-lg lg:text-xl text-text-muted mb-6 text-hero-legible"
              >
                my name is
              </motion.p>

              {/* Name — single-word product-hero treatment. Just "Kashfi"
                  at Apple-display scale: bold Inter (font-sans + bold),
                  very tight tracking (-0.045em), tight leading (0.92),
                  and a much larger clamp than the regular display
                  scale — 80px on small screens up to ~136px on wide
                  desktop. The font tokens still live in
                  tailwind.config.js (font-sans → Inter); only the size
                  is arbitrary here because the standard text-display-xl
                  scale wasn't big enough for a single-word hero. The
                  reference is Apple product pages: one word, oversized,
                  bold-but-not-aggressive, plenty of breathing room. */}
              <motion.h1
                {...fadeUp(0.22)}
                className="font-sans font-bold tracking-[-0.045em] text-text-primary leading-[0.92] mb-12 text-[clamp(5rem,12vw,8.5rem)]"
              >
                Kashfi
              </motion.h1>

              {/* Intro line — Apple HIG "Headline" / web-product-page
                  intro scale: 20-28px range, regular weight on the
                  prose, semibold + accent on the two emphasis phrases.
                  Leading 1.5 for comfortable reading at this size
                  (looser than 1.4 — gives the two-line wrap real
                  breathing room). max-w-prose keeps the measure at
                  roughly 60-65 characters per line. */}
              <motion.p
                {...fadeUp(0.38)}
                className="text-text-primary text-xl md:text-2xl lg:text-[1.625rem] leading-[1.55] max-w-prose"
              >
                {identityLine}
              </motion.p>

              {/* Voice line, status line, and scene-fallback note
                  intentionally removed for hero restraint. The intro
                  above carries the load: who you are + what you focus
                  on. Apple's iPhone landing pages model this exact
                  pattern — one product name, one intro sentence, one
                  CTA at most. */}
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
