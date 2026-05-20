import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useCompanion } from './CompanionContext.jsx'
import Character from '../character/Character.jsx'
import CharacterDebug from '../character/debug/CharacterDebug.jsx'

/**
 * <Companion /> — renders three things:
 *   1. The custom cursor (12px circle in visitor's color, near-1:1 tracking)
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

  // Cursor motion values + spring (for the dot only).
  //
  // This dot IS the cursor — the native OS pointer is hidden site-wide
  // (`cursor: none` in index.css). So any spring lag here reads as the
  // whole mouse feeling slow, not as "personality." The spring is tuned
  // very stiff and near-critically-damped: it settles within ~1 frame,
  // so the dot tracks the pointer 1:1 to the eye while still smoothing
  // raw pointer-sample jitter. Do NOT soften this back toward a visible
  // trail (the old 280/0.4 values) — it reads as input lag.
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 30, stiffness: 2000, mass: 0.08 })
  const springY = useSpring(cursorY, { damping: 30, stiffness: 2000, mass: 0.08 })

  // Detect fine pointer (desktop) vs. coarse (mobile/touch)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setIsFinePointer(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Track cursor position + interactive-element hover state.
  // Also publishes cursor position to window for distance gating in
  // CompanionContext.
  useEffect(() => {
    if (!isFinePointer) return undefined

    let rafId = 0
    let hitTestPending = false
    let lastX = 0
    let lastY = 0

    // Hover hit-test — document.elementFromPoint forces a hit-test, so
    // it must NOT run on every mousemove event (mousemove fires many
    // times per frame on a fast move, and a per-event hit-test on a
    // heavy page is a real source of main-thread jank — which itself
    // reads as a slow mouse). Coalesced to one run per animation frame.
    const runHitTest = () => {
      hitTestPending = false
      const el = document.elementFromPoint(lastX, lastY)
      const interactive = el?.closest?.(
        'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])',
      )
      setIsHoverInteractive(!!interactive)
    }

    const handleMove = (e) => {
      // Cheap — runs every event so the dot tracks the pointer 1:1.
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      window.__lastCursorX = e.clientX
      window.__lastCursorY = e.clientY
      // Expensive — coalesced to at most one hit-test per frame.
      lastX = e.clientX
      lastY = e.clientY
      if (!hitTestPending) {
        hitTestPending = true
        rafId = requestAnimationFrame(runHitTest)
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
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
