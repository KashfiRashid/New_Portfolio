import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * CharacterSprite — pixel-art sprite renderer.
 * Per character-spec-v2-pixel.md:
 *   - PNG sprites in /public/character/, image-rendering: pixelated
 *   - 96px on desktop, 72px on mobile (size controlled by parent)
 *   - Cross-fade on sprite swap (250ms)
 *   - Walk cycle alternation comes from the state machine (postures
 *     `walking1` / `walking2` already swap inside states.js)
 *   - Vertical bob (±2px sine) on idle and walking postures, suppressed
 *     for seated / peeking / contemplating postures
 *   - Direction via scaleX(-1) — same asset, mirrored
 *   - Missing sprite: 404 → falls back to idle.png; calls onSpriteMissing
 *
 * Whole-pixel positioning is enforced by the parent (Character.jsx),
 * which rounds left/top before placing the wrapper.
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
  holding_mug:   'idle',
  showcasing:    'idle',
}

const WALKING_POSTURES = new Set(['walking1', 'walking2', 'running'])
const SEATED_POSTURES = new Set(['sitting', 'laptop_open', 'contemplating', 'peeking'])
const WALK_SPRITES = new Set(['walk-a', 'walk-b'])

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
  // Track which sprite files have 404'd this session — render idle in their place.
  const missingRef = useRef(new Set())
  const prevSpriteRef = useRef('idle')
  const [, force] = useState(0)
  const sprite = missingRef.current.has(requested) ? 'idle' : requested
  const previousSprite = prevSpriteRef.current
  const isWalkFrameSwap = WALK_SPRITES.has(previousSprite)
    && WALK_SPRITES.has(sprite)
    && previousSprite !== sprite

  useEffect(() => {
    prevSpriteRef.current = sprite
  }, [sprite])

  const handleError = () => {
    if (!missingRef.current.has(requested)) {
      missingRef.current.add(requested)
      onSpriteMissing?.(requested)
      force(n => n + 1)
    }
  }

  const handleLoad = () => {
    onSpriteLoaded?.(sprite)
  }

  // Bob behavior depends on posture
  const bobAmplitude = reduceMotion ? 0
    : SEATED_POSTURES.has(posture) ? 0
      : WALKING_POSTURES.has(posture) ? 0
        : 2
  const bobPeriod = WALKING_POSTURES.has(posture) ? 0.5 : 2.0

  const cycle = bobAmplitude > 0
    ? { y: [0, -bobAmplitude, 0] }
    : { y: 0 }

  return (
    <div
      style={{
        width: size,
        height: size,
        // Sway rotation (patch-grab-and-throw §"Rotation pendulum") rides on
        // the outermost wrapper with a pivot near the top of the sprite —
        // the spot the cursor visually "holds" while dragging. Combined
        // with the pixel-inspect scale so both transforms compose.
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
          transition={
            bobAmplitude > 0
              ? { duration: bobPeriod, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0 }
          }
        >
          {isWalkFrameSwap ? (
            <img
              src={`/character/${sprite}.png`}
              width={size}
              height={size}
              alt=""
              draggable={false}
              onError={handleError}
              onLoad={handleLoad}
              className="pixel-sprite"
              style={{
                width: size,
                height: size,
                userSelect: 'none',
                display: 'block',
                position: 'absolute',
                left: 0,
                top: 0,
              }}
            />
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={sprite}
                src={`/character/${sprite}.png`}
                width={size}
                height={size}
                alt=""
                draggable={false}
                onError={handleError}
                onLoad={handleLoad}
                initial={{ opacity: reduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: reduceMotion ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className="pixel-sprite"
                style={{
                  width: size,
                  height: size,
                  userSelect: 'none',
                  display: 'block',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                }}
              />
            </AnimatePresence>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
