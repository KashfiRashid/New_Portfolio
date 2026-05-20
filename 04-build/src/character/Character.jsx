import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCharacter } from './CharacterContext.jsx'
import CharacterSprite from './CharacterSprite.jsx'
import CharacterBubble from './CharacterBubble.jsx'
import ReelHandoff from './ReelHandoff.jsx'
import { PROJECT_VANISH_DURATION, PROJECT_VANISH_FRAME_COUNT } from './states.js'
import './vanishEffect.css'

/**
 * Character — main rendered component.
 * Per character-spec-v2-pixel.md + character-spec.md + patches:
 *   - Viewport-fixed sprite wrapper, whole-pixel positioning
 *   - z-index 48 at rest (above most page content); 60 while grab/throw
 *   - Showcase variant on the wrapper (8px hop + 1.04 scale + glow accent)
 *   - Mug overlay as a sibling element during beverage activity
 *   - Mobile: 72px sprite; desktop: 96px sprite
 *   - Reduced motion: instant transitions handled inside CharacterSprite
 */

const DESKTOP_SIZE = 96
const MOBILE_SIZE = 72

const SHOWCASE_VARIANTS = {
  standing: { y: 0, scale: 1 },
  showcasing: {
    y: [0, -8, -8, -2, 0],
    scale: [1, 1.04, 1.04, 1.01, 1],
    transition: { duration: 1.6, times: [0, 0.2, 0.6, 0.8, 1], ease: 'easeOut' },
  },
}

const TRANSLATING_STATES = new Set([
  'entering', 'wandering', 'curious', 'chased',
  'summoning_reel', 'taking_reel', 'showcasing',
  // patch v1.4: grab/throw/run all move the sprite each frame.
  'grabbed', 'thrown', 'running_away',
])

// patch v1.4 §"Input handling": states during which clicking the character
// MUST NOT start a grab. Mirrors GRAB_SUPPRESSION_LIST in CharacterContext.
const GRAB_SUPPRESSION_LIST = new Set([
  'summoning_reel', 'watching_reel', 'taking_reel',
  'showcasing', 'chased', 'hiding',
  // project_pinned: pinned to its corner on /projects/* — not grab-able.
  'project_pinned',
])

function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return mobile
}

export default function Character() {
  const {
    state, position, facing, posture, charBubble,
    reelActive, reelClip, reelCarried, visible,
    activeActivity,
    pixelInspect,
    swayRotation,
    markSpriteMissing,
    markSpriteLoaded,
    dismissReel,
    enterGrab,
    projectMode,
    onProjectCharacterHover,
  } = useCharacter()

  const isMobile = useIsMobile()
  const size = isMobile ? MOBILE_SIZE : DESKTOP_SIZE
  const reduceMotion = useReducedMotion()

  // Project-teleport render bookkeeping — see the project-mode block below.
  const prevProjectPhaseRef = useRef(null)
  const reappearStartRef = useRef(-Infinity)

  // patch v1.4: grab eligibility — desktop only, not while a higher-priority
  // moment owns the character.
  const grabbable = !isMobile && !GRAB_SUPPRESSION_LIST.has(state)
  const isGrabbed = state === 'grabbed'
  const isThrown = state === 'thrown'
  const allowSubpixel = isGrabbed || isThrown

  // Whole-pixel anchor: character horizontally centered on position.x,
  // feet at position.y. During grab/thrown the spec allows sub-pixel
  // positioning so the spring physics reads as smooth motion.
  const charLeft = allowSubpixel
    ? position.x - size / 2
    : Math.round(position.x - size / 2)
  const charTop = allowSubpixel
    ? position.y - size
    : Math.round(position.y - size)

  const handleGrabStart = (e) => {
    if (e.button !== 0) return
    if (!grabbable) return
    e.preventDefault()
    document.body.style.cursor = 'grabbing'
    enterGrab({ clientX: e.clientX, clientY: e.clientY })
  }

  // Off-viewport guard (used during taking_reel exit sequence)
  const offscreen = typeof window !== 'undefined'
    && (position.x < -size || position.x > window.innerWidth + size)

  // Project-mode teleport — the Goku-style vanish. During a warp the normal
  // sprite is swapped for <VanishFrames>, which steps the vanish-N.png
  // frames across the warp (forward to vanish, reversed to reappear).
  //   warping     — a warp_to_* phase is live: play the vanish forward.
  //   reappearing — the destination phase (tr/bl) just began straight out
  //     of a warp: play the frames reversed for one PROJECT_VANISH_DURATION
  //     window. Derived from the phase transition during render (not via an
  //     effect) so the vanish → reappear hand-off has no gap at the
  //     invisible teleport midpoint.
  const projectPhase = projectMode?.phase || null
  const warping =
    typeof projectPhase === 'string' && projectPhase.startsWith('warp')
  const projectHoverable = projectPhase === 'tr'

  if (projectPhase !== prevProjectPhaseRef.current) {
    const prev = prevProjectPhaseRef.current
    prevProjectPhaseRef.current = projectPhase
    if (
      (projectPhase === 'tr' || projectPhase === 'bl') &&
      (prev === 'warp_to_tr' || prev === 'warp_to_bl')
    ) {
      reappearStartRef.current = performance.now()
    }
  }
  const reappearing =
    !warping &&
    performance.now() - reappearStartRef.current < PROJECT_VANISH_DURATION * 1000

  // While the teleport frames play, the normal sprite is swapped out for
  // <VanishFrames>. Reduced motion shows neither — the teleport snaps.
  const showVanishFrames = !reduceMotion && (warping || reappearing)
  const showSprite = visible && !offscreen && state !== 'inactive'

  // willChange only during active translation (per main spec §11)
  const translating = TRANSLATING_STATES.has(state)

  return (
    <>
      {/* Character wrapper — viewport-fixed, whole-pixel positioned */}
      <AnimatePresence>
        {showSprite && (
          <motion.div
            key="character"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            onMouseDown={handleGrabStart}
            onMouseEnter={projectHoverable ? onProjectCharacterHover : undefined}
            style={{
              position: 'fixed',
              left: charLeft,
              top: charTop,
              width: size,
              height: size,
              // patch v1.4: lift above content during grab/throw so the
              // character clearly reads as picked up, then drop back.
              zIndex: (isGrabbed || isThrown) ? 60 : 48,
              // patch v1.4: pointer events flip on while grabbable so
              // the wrapper actually catches the mousedown. They stay on
              // through `grabbed` so the cursor style holds. They also
              // flip on while project-hoverable so the wrapper catches
              // the warp-back mouse-enter. Otherwise: click-through.
              pointerEvents:
                grabbable || isGrabbed || projectHoverable ? 'auto' : 'none',
              cursor: isGrabbed
                ? 'grabbing'
                : grabbable
                  ? 'grab'
                  : 'auto',
              // Soft drop-shadow polish only while held — sells the lift.
              filter: isGrabbed
                ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                : 'none',
              willChange: translating ? 'transform' : 'auto',
            }}
            aria-hidden="true"
          >
            {showVanishFrames ? (
              /* Teleport — the full vanish effect (frames + glow + sparks)
                 plays in place of the normal sprite. Keyed per warp phase
                 so each vanish / reappear gets a fresh run. */
              <VanishEffect
                key={projectPhase}
                reverse={reappearing}
                facing={facing}
                size={size}
                mobile={isMobile}
              />
            ) : (
              <motion.div
                variants={SHOWCASE_VARIANTS}
                animate={state === 'showcasing' ? 'showcasing' : 'standing'}
                style={{
                  width: size,
                  height: size,
                  position: 'relative',
                  transformOrigin: 'center bottom',
                }}
              >
                <AnimatePresence>
                  {state === 'showcasing' && (
                    <GlowAccent key="glow" size={size} />
                  )}
                </AnimatePresence>

                <CharacterSprite
                  posture={posture}
                  facing={facing}
                  size={size}
                  pixelInspect={pixelInspect}
                  rotation={swayRotation}
                  onSpriteMissing={markSpriteMissing}
                  onSpriteLoaded={markSpriteLoaded}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speech bubble anchored to character (patch v1.3 §C). */}
      {showSprite && charBubble && (
        <CharacterBubble
          text={charBubble.text}
          id={charBubble.id}
          charX={charLeft}
          charY={charTop}
          charWidth={size}
          charHeight={size}
        />
      )}

      {/* Mug overlay — separate sibling so it doesn't inherit scaleX or scale variant.
          Positioned in viewport coords; mirrors with facing. */}
      <AnimatePresence>
        {showSprite && activeActivity === 'beverage' && (
          <MugOverlay
            key="mug"
            charLeft={charLeft}
            charTop={charTop}
            size={size}
            facing={facing}
          />
        )}
      </AnimatePresence>

      {/* Reel custody */}
      <ReelHandoff
        active={reelActive}
        clip={reelClip}
        carried={reelCarried}
        charPosition={position}
        onDismiss={dismissReel}
      />
    </>
  )
}

/* -----------------------------------------------------------------------
   GlowAccent — warm radial gradient pulse behind the sprite during
   the `showcasing` state's flourish.
   Per character-spec-patch-showcase.md §"Glow pulse".
   ----------------------------------------------------------------------- */

function GlowAccent({ size }) {
  const reduceMotion = useReducedMotion()
  // Radius ~24px from spec; we scale with sprite (size/4 ≈ 24 for 96px).
  const radius = Math.round(size * 0.6)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={
        reduceMotion
          ? { opacity: 0.4 }
          : { opacity: [0, 0.7, 0.7, 0.3, 0] }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 1.4, times: [0, 0.15, 0.5, 0.8, 1], ease: 'easeOut' }
      }
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '60%',
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        pointerEvents: 'none',
        background:
          'radial-gradient(circle, rgba(232,184,106,0.9) 0%, rgba(200,181,130,0.5) 35%, rgba(200,181,130,0) 70%)',
        filter: 'blur(2px)',
        zIndex: 0,
      }}
    />
  )
}

/* -----------------------------------------------------------------------
   MugOverlay — small mug + 3 steam particles, rendered as a discrete
   element next to the character during the `beverage` activity.
   Per character-spec-v2-pixel.md §"Mug rendering" + brief pseudocode.
   ----------------------------------------------------------------------- */

function MugOverlay({ charLeft, charTop, size, facing }) {
  const mugSize = 16
  const reduceMotion = useReducedMotion()

  // Place the mug roughly at the character's hand area. Right of center by
  // default; mirror to the left when facing left.
  const offsetX = facing === 'left'
    ? Math.round(charLeft + size * 0.18 - mugSize / 2)
    : Math.round(charLeft + size * 0.82 - mugSize / 2)
  const offsetY = Math.round(charTop + size * 0.45)

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        left: offsetX,
        top: offsetY,
        width: mugSize,
        height: mugSize,
        zIndex: 41,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 16 16"
        width={mugSize}
        height={mugSize}
        className="pixel-sprite"
        style={{ display: 'block' }}
      >
        <rect x="3" y="6" width="9" height="9" fill="#3a2820" />
        <rect x="12" y="8" width="2" height="5" fill="#3a2820" />
        <rect x="3" y="6" width="9" height="2" fill="#c8b582" />
      </svg>

      {!reduceMotion && [0, 0.3, 0.6].map((delay, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: 4 + i * 3,
            top: -4,
            width: 2,
            height: 2,
            background: '#c8b582',
            borderRadius: '50%',
          }}
          animate={{ y: [-4, -16], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  )
}

/* -----------------------------------------------------------------------
   VanishEffect — the Goku teleport. Three layers, tied together:
     1. Frame art — /public/character/vanish-1.png .. vanish-N.png, stepped
        across the warp (1..N to vanish, N..1 to reappear), and mirrored
        (scaleX) to the character's facing — so a teleport to the top-right
        corner faces left, into the page.
     2. CSS opacity + glow — the `goku-warp-*` class (vanishEffect.css)
        fades the frame out with a warming glow; the same keyframes
        reversed give the reappear.
     3. Spark particles — <VanishParticles>, warm pixels drifting out (or
        converging inward, on reappear).
   Rendered in place of the normal sprite during a warp.
   ----------------------------------------------------------------------- */

function VanishEffect({ reverse, facing, size, mobile }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    let start = 0
    const durMs = PROJECT_VANISH_DURATION * 1000
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / durMs)
      setProgress(p)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const N = PROJECT_VANISH_FRAME_COUNT
  const step = Math.min(N - 1, Math.floor(progress * N))
  // Forward 1..N to vanish; N..1 to reappear.
  const frameNum = reverse ? N - step : step + 1
  // Mirror the art to the character's facing (faces left at the top corner).
  const mirror = facing === 'left' ? -1 : 1

  return (
    <>
      {/* Frame art + CSS opacity/glow. The class fades + glows the wrapper;
          the <img> just carries the current frame, mirrored by facing. */}
      <div
        className={reverse ? 'goku-warp-reappear' : 'goku-warp-vanish'}
        style={{
          position: 'absolute',
          inset: 0,
          '--goku-dur': `${PROJECT_VANISH_DURATION}s`,
        }}
      >
        <img
          src={`/character/vanish-${frameNum}.png`}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: size,
            height: size,
            objectFit: 'contain',
            transform: `scaleX(${mirror})`,
          }}
        />
      </div>
      {/* Spark particles — a sibling, so they keep their own fade curve. */}
      <VanishParticles reverse={reverse} count={mobile ? 6 : 12} />
    </>
  )
}

/* -----------------------------------------------------------------------
   VanishParticles — warm pixel-art sparks layered over the teleport.
   `count` 4px squares scatter up + outward while fading (vanishEffect.css
   → goku-particle). On reappear `reverse` runs the same animation
   backwards, so the sparks converge inward as the character re-forms.
   ----------------------------------------------------------------------- */

function VanishParticles({ reverse, count }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = Math.random() * Math.PI * 2
        const outward = 10 + Math.random() * 10 // 10-20px sideways
        return {
          id: i,
          px: Math.round(Math.cos(angle) * outward),
          py: -(30 + Math.round(Math.random() * 20)), // 30-50px upward
          delay: Math.round(Math.random() * 300), // staggered 0-300ms
          left: 28 + Math.random() * 44, // % within the sprite box
          top: 26 + Math.random() * 44,
        }
      }),
    [count],
  )

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={
            reverse ? 'goku-particle goku-particle--reverse' : 'goku-particle'
          }
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: 4,
            height: 4,
            '--px': `${p.px}px`,
            '--py': `${p.py}px`,
            '--goku-dur': `${PROJECT_VANISH_DURATION}s`,
            animationDelay: `${p.delay}ms`,
          }}
        />
      ))}
    </div>
  )
}
