import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * CharacterSprite — pixel-art sprite renderer.
 *   - PNG sprites in /public/character/, image-rendering: pixelated
 *   - 96px desktop / 72px mobile (size from parent)
 *   - Walk frames walk-a / walk-b stay mounted for the whole session and
 *     swap by opacity, so the cycle can never stutter or "stick on walk-a".
 *   - Every other sprite change cross-fades (250ms) via AnimatePresence.
 *   - Vertical bob (±2px) on idle/walking, suppressed for seated postures.
 *   - Direction via scaleX(-1). Missing sprite: 404 -> falls back to idle.
 */

const POSTURE_TO_SPRITE = {
  standing:      'idle',
  walking1:      'walk-a',
  walking2:      'walk-b',
  running:       'walk-a',
  sitting:       'sit',
  waving:        'wave',
  laptop_open:   'sit-laptop',
  peeking:       'peek',
  stretching:    'stretch',
  contemplating: 'sit',
  holding_mug:   'Coffee',
  coffee_hold:   'Coffee',
  coffee_sip:    'sipping-coffee',
  coffee_sipoff: 'sipping-off-coffee',
  showcasing:    'idle',
}

const WALKING_POSTURES = new Set(['walking1', 'walking2', 'running'])
const SEATED_POSTURES = new Set(['sitting', 'laptop_open', 'contemplating', 'peeking'])
const WALK_SPRITES = new Set(['walk-a', 'walk-b'])
const NO_BOB_POSTURES = new Set(['coffee_hold', 'coffee_sip', 'coffee_sipoff'])
// Both walk frames are kept mounted (see render below) so they decode once.
const WALK_FRAMES = ['walk-a', 'walk-b']

export function getSpriteForPosture(posture) {
  return POSTURE_TO_SPRITE[posture] || 'idle'
}

export default function CharacterSprite({
  posture = 'standing',
  facing = 'right',
  size = 96,
  pixelInspect = false,
  rotation = 0,
  onSpriteMissing,
  onSpriteLoaded,
}) {
  const reduceMotion = useReducedMotion()

  const requested = getSpriteForPosture(posture)
  // Track sprite files that 404'd this session — render idle in their place.
  const missingRef = useRef(new Set())
  const [, force] = useState(0)
  const sprite = missingRef.current.has(requested) ? 'idle' : requested
  const isWalkSprite = WALK_SPRITES.has(sprite)

  const markMissing = (name) => {
    if (!missingRef.current.has(name)) {
      missingRef.current.add(name)
      onSpriteMissing?.(name)
      force(n => n + 1)
    }
  }

  // Bob behaviour depends on posture.
  const bobAmplitude = reduceMotion ? 0
    : SEATED_POSTURES.has(posture) ? 0
      : NO_BOB_POSTURES.has(posture) ? 0
        : 2
  const bobPeriod = WALKING_POSTURES.has(posture) ? 0.5 : 2.0

  // Memoized so a per-frame re-render can't restart the bob mid-cycle.
  const cycle = useMemo(
    () => (bobAmplitude > 0 ? { y: [0, -bobAmplitude, 0] } : { y: 0 }),
    [bobAmplitude],
  )
  const bobTransition = useMemo(
    () => (bobAmplitude > 0
      ? { duration: bobPeriod, repeat: Infinity, ease: 'easeInOut' }
      : { duration: 0 }),
    [bobAmplitude, bobPeriod],
  )

  const imgStyle = {
    width: size,
    height: size,
    userSelect: 'none',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg) scale(${pixelInspect ? 2 : 1})`,
        transformOrigin: '50% 12%',
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          width: size,
          height: size,
          transform: `scaleX(${facing === 'left' ? -1 : 1})`,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <motion.div
          style={{ width: size, height: size, position: 'relative' }}
          animate={cycle}
          transition={bobTransition}
        >
          {/* Walk frames — walk-a and walk-b are BOTH mounted for the whole
              session, so each decodes exactly once. Only the active frame is
              opaque; the swap is a pure opacity flip (no src change, no
              re-decode), so the walk cycle can never stutter or stick on one
              frame. Both stay hidden (opacity 0) whenever not walking. */}
          {WALK_FRAMES.map((frame) => (
            <img
              key={frame}
              src={`/character/${frame}.png`}
              width={size}
              height={size}
              alt=""
              draggable={false}
              onError={() => markMissing(frame)}
              onLoad={() => onSpriteLoaded?.(frame)}
              className="pixel-sprite"
              style={{
                ...imgStyle,
                opacity: isWalkSprite && sprite === frame ? 1 : 0,
              }}
            />
          ))}

          {/* Non-walk sprites — 250ms cross-fade. Not rendered while walking. */}
          {!isWalkSprite && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={sprite}
                src={`/character/${sprite}.png`}
                width={size}
                height={size}
                alt=""
                draggable={false}
                onError={() => markMissing(requested)}
                onLoad={() => onSpriteLoaded?.(sprite)}
                initial={{ opacity: reduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: reduceMotion ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className="pixel-sprite"
                style={imgStyle}
              />
            </AnimatePresence>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
