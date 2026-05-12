import { motion, AnimatePresence } from 'framer-motion'

/**
 * CharacterBubble — speech bubble rendered above the character's head.
 * Per character-spec.md Section 7:
 *   - Appears above character, not at cursor
 *   - Follows character if it moves during speech
 *   - Subtle downward-pointing tail
 *   - Same styling as v1.1 bubbles (dark surface, backdrop blur)
 *   - No visitor-color border (visitor color stays with visitor)
 */
export default function CharacterBubble({ text, id, charX, charY, charWidth }) {
  if (!text) return null

  const bubbleWidth = 280
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200

  // Position above character's head, centered
  let left = charX - bubbleWidth / 2 + (charWidth || 20) / 2
  const top = charY - 52

  // Viewport edge awareness
  if (left < 12) left = 12
  if (left + bubbleWidth > vw - 12) left = vw - bubbleWidth - 12

  return (
    <AnimatePresence>
      {text && (
        <motion.div
          key={id || text}
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.96, transition: { duration: 0.18 } }}
          transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
          style={{
            position: 'fixed',
            left,
            top,
            maxWidth: bubbleWidth,
            zIndex: 52,
            pointerEvents: 'none',
          }}
          className="bg-surface-mid/90 backdrop-blur-md text-text-primary text-sm leading-snug px-4 py-3 rounded-sm shadow-2xl"
        >
          {text}

          {/* Tail pointing down to character */}
          <div
            style={{
              position: 'absolute',
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '6px solid rgba(22, 25, 27, 0.9)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
