import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * CharacterBubble — speech bubble anchored to the character.
 *
 * The bubble is a FIXED width (BUBBLE_WIDTH) so it never resizes between
 * quips — every bubble is the same shape, and there is no measure-then-
 * resize jump on first paint. Only the height is measured, and only to
 * decide whether the bubble sits above or below the character.
 *
 *   - Default: GAP px above the character's head, centered on it.
 *   - Flips below the character if it would clip the top of the viewport.
 *   - Horizontal clamp: stays >= VIEWPORT_PAD from either edge, so the
 *     text can never run off-screen.
 *   - Pixel-art SVG tail that keeps pointing at the character even when
 *     the bubble is clamped against an edge.
 */

const BUBBLE_WIDTH = 240
const VIEWPORT_PAD = 16
const GAP = 10
const SURFACE_FILL = 'rgba(22, 25, 27, 0.9)'

export default function CharacterBubble({
  text, id, charX, charY, charWidth, charHeight,
}) {
  const bubbleRef = useRef(null)
  // Only the height is dynamic — the width is fixed.
  const [boxH, setBoxH] = useState(56)

  useLayoutEffect(() => {
    if (bubbleRef.current) {
      const h = Math.round(bubbleRef.current.getBoundingClientRect().height)
      if (h !== boxH) setBoxH(h)
    }
  }, [text, boxH])

  if (!text) return null

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const cw = charWidth || 20
  const ch = charHeight || cw
  const charCenterX = charX + cw / 2

  // Default: above the head, centered on the character.
  let bubbleX = Math.round(charCenterX - BUBBLE_WIDTH / 2)
  let bubbleY = Math.round(charY - boxH - GAP)
  let placement = 'above'

  // Flip below if it would clip the top of the viewport.
  if (bubbleY < VIEWPORT_PAD) {
    bubbleY = Math.round(charY + ch + GAP)
    placement = 'below'
  }

  // Horizontal clamp — keep the whole bubble on-screen.
  const maxX = Math.max(VIEWPORT_PAD, vw - BUBBLE_WIDTH - VIEWPORT_PAD)
  if (bubbleX < VIEWPORT_PAD) bubbleX = VIEWPORT_PAD
  if (bubbleX > maxX) bubbleX = maxX

  // Tail stays pointed at the character even when the bubble is clamped.
  const TAIL_MIN = 10
  const TAIL_MAX = BUBBLE_WIDTH - 10
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
          width: BUBBLE_WIDTH,
          textAlign: 'center',
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
   BubbleTail — pixel-art stair-step triangle. shape-rendering="crispEdges"
   disables anti-aliasing so the rects sit on the pixel grid like the
   sprite. Flipped vertically when the bubble drops below the character.
   ----------------------------------------------------------------------- */
function BubbleTail({ placement, left }) {
  const W = 7
  const H = 6
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      shapeRendering="crispEdges"
      style={{
        position: 'absolute',
        left,
        marginLeft: -Math.round(W / 2),
        ...(placement === 'above'
          ? { bottom: -H + 1 }
          : { top: -H + 1, transform: 'scaleY(-1)' }),
        display: 'block',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <rect x="1" y="0" width="5" height="2" fill={SURFACE_FILL} />
      <rect x="2" y="2" width="3" height="2" fill={SURFACE_FILL} />
      <rect x="3" y="4" width="1" height="2" fill={SURFACE_FILL} />
    </svg>
  )
}
