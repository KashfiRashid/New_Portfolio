import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * CharacterBubble — speech bubble anchored to the character.
 *
 * patch v1.3 §C1+C2+C3:
 *   - Measure rendered bubble box, recompute on text change.
 *   - Default: 10px above the character's head, horizontally centered on it.
 *   - Flip below the character if the bubble would clip the top of the
 *     viewport (`bubbleY < 16`).
 *   - Horizontal clamp: bubble stays ≥16px from either viewport edge.
 *   - Pixel-art SVG tail that orients toward the character even when the
 *     bubble is clamped (so the tail still points at the speaker).
 *   - `shape-rendering: crispEdges` keeps the tail's stair-stepped triangle
 *     anti-alias-free, matching the pixel-art sprite.
 *
 * Original Section 7 behavior preserved:
 *   - Same dark backdrop styling.
 *   - No visitor-color border.
 *   - Bubble follows the character if it moves (positions are re-derived
 *     from the parent's per-frame {charX,charY}).
 */

const MAX_WIDTH = 280
const VIEWPORT_PAD = 16
const GAP = 10
const SURFACE_FILL = 'rgba(22, 25, 27, 0.9)'

export default function CharacterBubble({
  text, id, charX, charY, charWidth, charHeight,
}) {
  const bubbleRef = useRef(null)
  // Initial guesses keep the first paint sane before useLayoutEffect runs.
  const [box, setBox] = useState({ w: MAX_WIDTH, h: 56 })

  useLayoutEffect(() => {
    if (bubbleRef.current) {
      const rect = bubbleRef.current.getBoundingClientRect()
      // Round to whole pixels so the tail aligns with the pixel grid.
      const w = Math.round(rect.width)
      const h = Math.round(rect.height)
      if (w !== box.w || h !== box.h) setBox({ w, h })
    }
  }, [text, box.w, box.h])

  if (!text) return null

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const cw = charWidth || 20
  const ch = charHeight || cw
  const charCenterX = charX + cw / 2

  // Default: above the head with a small gap.
  let bubbleX = Math.round(charCenterX - box.w / 2)
  let bubbleY = Math.round(charY - box.h - GAP)
  let placement = 'above'

  // C2 flip: if the bubble would clip the top, drop it below the character.
  if (bubbleY < VIEWPORT_PAD) {
    bubbleY = Math.round(charY + ch + GAP)
    placement = 'below'
  }

  // Horizontal clamp keeps the bubble within the viewport.
  if (bubbleX < VIEWPORT_PAD) bubbleX = VIEWPORT_PAD
  if (bubbleX + box.w > vw - VIEWPORT_PAD) {
    bubbleX = Math.max(VIEWPORT_PAD, vw - box.w - VIEWPORT_PAD)
  }

  // Tail anchored to the character even when the bubble is clamped.
  // Constrained to stay inside the bubble's body (with a small margin).
  const TAIL_MIN = 10
  const TAIL_MAX = box.w - 10
  const tailLeft = Math.round(
    Math.max(TAIL_MIN, Math.min(TAIL_MAX, charCenterX - bubbleX))
  )

  return (
    <AnimatePresence>
      <motion.div
        ref={bubbleRef}
        key={id || text}
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: placement === 'above' ? 6 : -6, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{
          opacity: 0,
          y: placement === 'above' ? -4 : 4,
          scale: 0.96,
          transition: { duration: 0.18 },
        }}
        transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
        style={{
          position: 'fixed',
          left: bubbleX,
          top: bubbleY,
          maxWidth: MAX_WIDTH,
          zIndex: 52,
          pointerEvents: 'none',
        }}
        className="bg-surface-mid/90 backdrop-blur-md text-text-primary text-sm leading-snug px-4 py-3 rounded-sm shadow-2xl"
      >
        {text}
        <BubbleTail placement={placement} left={tailLeft} />
      </motion.div>
    </AnimatePresence>
  )
}

/* -----------------------------------------------------------------------
   BubbleTail — pixel-art stair-step triangle (patch v1.3 §C3).
   shape-rendering="crispEdges" disables anti-aliasing so the rects sit
   on the pixel grid the way the sprite does. The same SVG is flipped
   vertically when the bubble drops below the character.
   ----------------------------------------------------------------------- */
function BubbleTail({ placement, left }) {
  const W = 7
  const H = 6
  // The tail's body stair-steps from a 5-wide base down to a 1-wide tip,
  // shifted up by 1 row so the bubble surface and tail visually merge.
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      shapeRendering="crispEdges"
      style={{
        position: 'absolute',
        left,
        // Pull the tail in by half its width so `left` truly points at the char.
        marginLeft: -Math.round(W / 2),
        ...(placement === 'above'
          ? { bottom: -H + 1 }
          : { top: -H + 1, transform: 'scaleY(-1)' }),
        display: 'block',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {/* Three stepped rects = pixel-art downward triangle */}
      <rect x="1" y="0" width="5" height="2" fill={SURFACE_FILL} />
      <rect x="2" y="2" width="3" height="2" fill={SURFACE_FILL} />
      <rect x="3" y="4" width="1" height="2" fill={SURFACE_FILL} />
    </svg>
  )
}
