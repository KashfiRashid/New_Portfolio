import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useCompanion } from './CompanionContext.jsx'
import Character from '../character/Character.jsx'
import CharacterDebug from '../character/debug/CharacterDebug.jsx'

/**
 * <Companion /> — renders three things:
 *   1. The custom cursor (12px circle in visitor's color, soft trailing motion)
 *   2. The autonomous character (sprite + bubbles above head + reel custody)
 *   3. Mobile toast fallback (bottom-anchored bubble on coarse pointers)
 *
 * Per character-spec.md:
 *   - Bubbles now appear above the character's head, not at the cursor.
 *   - The cursor dot stays as the visitor's identity marker (separate entity).
 *   - Reels are handled by the character's custody mechanic.
 *   - CursorBubble (desktop cursor-attached) is removed — Character handles speech.
 *
 * Mobile:
 *   - Bubbles fall back to ToastBubble at bottom of screen.
 *   - Character only appears for greeting, reel, and exit moments.
 */
export default function Companion() {
  const { active, dismiss, visitor } = useCompanion()
  const [isFinePointer, setIsFinePointer] = useState(true)
  const [isHoverInteractive, setIsHoverInteractive] = useState(false)

  // Cursor motion values + soft spring (for the dot only)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 28, stiffness: 280, mass: 0.4 })
  const springY = useSpring(cursorY, { damping: 28, stiffness: 280, mass: 0.4 })

  // Detect fine pointer (desktop) vs. coarse (mobile/touch)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setIsFinePointer(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Track cursor position + interactive-element hover state
  // Also publish cursor position to window for distance gating in CompanionContext
  useEffect(() => {
    if (!isFinePointer) return

    const handleMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      // Publish for distance gating
      window.__lastCursorX = e.clientX
      window.__lastCursorY = e.clientY
      // Detect if the cursor is over an interactive element
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const interactive = el?.closest?.('a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])')
      setIsHoverInteractive(!!interactive)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [isFinePointer, cursorX, cursorY])

  const cursorColor = visitor?.color?.hex || '#6B7B8C'

  return (
    <>
      {/* Custom cursor — desktop only. Single dot, no trail.
          This is the VISITOR's cursor identity — separate from the character. */}
      {isFinePointer && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            x: springX,
            y: springY,
            pointerEvents: 'none',
            zIndex: 60,
            mixBlendMode: 'difference',
          }}
        >
          <motion.div
            animate={{
              width: isHoverInteractive ? 24 : 12,
              height: isHoverInteractive ? 24 : 12,
              opacity: isHoverInteractive ? 0.9 : 0.7,
            }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            style={{
              borderRadius: '50%',
              backgroundColor: cursorColor,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </motion.div>
      )}

      {/* The autonomous character — handles its own movement, speech, and reel custody.
          On desktop, bubbles appear above the character's head (not at cursor).
          On mobile, character appears only at key moments. */}
      <Character />

      {/* Mobile toast fallback — coarse pointers get bottom-anchored bubbles */}
      <AnimatePresence>
        {active && !isFinePointer && (
          <ToastBubble key={active.id} active={active} visitor={visitor} onDismiss={dismiss} />
        )}
      </AnimatePresence>

      {/* Debug overlay — activated via ?debug=character */}
      <CharacterDebug />
    </>
  )
}

/* -----------------------------------------------------------------------
   ToastBubble — mobile, bottom-anchored. Text appears instantly.
   Preserved from v1.1 for coarse-pointer devices.
   ----------------------------------------------------------------------- */

function ToastBubble({ active, visitor, onDismiss }) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, transition: { duration: 0.18, delay: 0.08 } }}
      transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
      style={{
        position: 'fixed',
        left: '16px',
        right: '16px',
        bottom: '16px',
        borderLeft: `2px solid ${visitor?.color?.hex || '#6B7B8C'}`,
        zIndex: 50,
      }}
      className="bg-surface-mid/95 backdrop-blur-md text-text-primary text-sm leading-snug px-4 py-3 rounded-sm shadow-2xl"
      onClick={onDismiss}
    >
      {active.text}
    </motion.div>
  )
}
