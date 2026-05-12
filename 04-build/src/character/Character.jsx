import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCharacter } from './CharacterContext.jsx'
import CharacterSprite from './CharacterSprite.jsx'
import CharacterBubble from './CharacterBubble.jsx'
import ReelHandoff from './ReelHandoff.jsx'

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
  } = useCharacter()

  const isMobile = useIsMobile()
  const size = isMobile ? MOBILE_SIZE : DESKTOP_SIZE

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
              // through `grabbed` so the cursor style holds; in every
              // other state the character stays click-through (non-blocking).
              pointerEvents: grabbable || isGrabbed ? 'auto' : 'none',
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
