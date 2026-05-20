import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { useCompanion } from './CompanionContext.jsx'
import Character from '../character/Character.jsx'
import CharacterDebug from '../character/debug/CharacterDebug.jsx'

/**
 * <Companion /> — renders three things:
 *   1. The custom cursor (a context-aware mark in the visitor's color)
 *   2. The autonomous character (sprite + bubbles above head + reel custody)
 *   3. Mobile toast fallback (bottom-anchored bubble on coarse pointers)
 *
 * Custom cursor — the personality is in STATE, FORM, and REACTION, never
 * in positional lag. Position is pixel-locked 1:1 to the pointer (raw
 * motion values, no spring) because this dot IS the cursor: the native
 * OS pointer is hidden site-wide (`cursor: none` in index.css), so any
 * trailing would read as a slow mouse. The behaviors layered on top:
 *   - Context morph: a small dot by default; an outline ring over
 *     links/buttons; a labelled pill over project links ("View", or
 *     "Soon" over the Nightshift teaser).
 *   - Click feedback: the shape squishes on press, and a ripple ring
 *     expands out from the exact click point.
 *   - Idle breathing: when the mouse rests, the default dot gently
 *     pulses; the instant it moves it is a crisp dot again.
 * Breathing and the ripple are gated off under prefers-reduced-motion;
 * the squish stays (direct feedback to a deliberate press, not ambient).
 *
 * Per character-spec.md:
 *   - Bubbles now appear above the character's head, not at the cursor.
 *   - The cursor stays as the visitor's identity marker (separate entity).
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
  const [reducedMotion, setReducedMotion] = useState(false)

  // Cursor state — the dot's CONTEXT and REACTIONS, never its position.
  //   cursorMode: 'default' | 'interactive' | 'card'
  //   cardLabel : the word shown in 'card' mode ('View' / 'Soon')
  //   isPressed : mouse button held — drives the squish
  //   isIdle    : no movement for a beat — drives the breathing pulse
  //   ripples   : in-flight click ripples, each pinned to its click point
  const [cursorMode, setCursorMode] = useState('default')
  const [cardLabel, setCardLabel] = useState('')
  const [isPressed, setIsPressed] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const [ripples, setRipples] = useState([])
  const rippleId = useRef(0)

  // Cursor motion values — the dot renders at these RAW values, with
  // NO spring.
  //
  // This dot IS the cursor: the native OS pointer is hidden site-wide
  // (`cursor: none` in index.css). A spring — however stiff — always
  // trails the real pointer by a frame or two as it settles, and with
  // no native cursor underneath to give instant feedback that trail
  // reads as a slow mouse. Rendering straight off the raw pointer
  // position (set on every mousemove below) is the closest a DOM
  // element can get to a native cursor. Do NOT reintroduce a spring
  // here for "personality" — on a cursor it just reads as input lag.
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Detect fine pointer (desktop) vs. coarse (mobile/touch)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setIsFinePointer(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Respect reduced-motion — gates the breathing loop and the ripple
  // (ambient / decorative motion). The squish stays: it is direct
  // feedback to a deliberate press, not ambient motion.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Track cursor position, context mode, and idle state.
  // Also publishes cursor position to window for distance gating in
  // CompanionContext.
  useEffect(() => {
    if (!isFinePointer) return undefined

    let rafId = 0
    let hitTestPending = false
    let idleTimer = 0
    let lastX = 0
    let lastY = 0

    // Hover hit-test — document.elementFromPoint forces a hit-test, so
    // it must NOT run on every mousemove event (mousemove fires many
    // times per frame on a fast move, and a per-event hit-test on a
    // heavy page is a real source of main-thread jank). Coalesced to
    // one run per animation frame. Classifies what is under the pointer
    // into the cursor's context mode: a project link becomes a labelled
    // pill, any other interactive becomes a ring, everything else a dot.
    const runHitTest = () => {
      hitTestPending = false
      const el = document.elementFromPoint(lastX, lastY)
      const labelled = el?.closest?.('[data-cursor-label]')
      const link = el?.closest?.('a[href]')
      const interactive = el?.closest?.(
        'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])',
      )
      let mode = 'default'
      let label = ''
      const href = link?.getAttribute?.('href') || ''
      if (labelled) {
        // An element that declares its own cursor label — case-study
        // media tagged with data-cursor-label. Takes precedence over
        // the generic link / interactive classification so the pill
        // shows the media's own 1-3 word caption instead of "View".
        mode = 'card'
        label = labelled.getAttribute('data-cursor-label') || ''
      } else if (href.includes('/projects/')) {
        mode = 'card'
        label = href.includes('/projects/nightshift') ? 'Soon' : 'View'
      } else if (interactive) {
        mode = 'interactive'
      }
      // setState with an unchanged primitive is a no-op in React, so
      // this is safe to call on every frame the pointer moves.
      setCursorMode(mode)
      setCardLabel(label)
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
      // Idle clock — reset on every move; fires after a short rest.
      setIsIdle(false)
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => setIsIdle(true), 1500)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(idleTimer)
    }
  }, [isFinePointer, cursorX, cursorY])

  // Click feedback — squish on press, ripple from the click point.
  useEffect(() => {
    if (!isFinePointer) return undefined

    const onDown = (e) => {
      setIsPressed(true)
      if (reducedMotion) return
      const id = (rippleId.current += 1)
      setRipples((rs) => [...rs, { id, x: e.clientX, y: e.clientY }])
    }
    const onUp = () => setIsPressed(false)

    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [isFinePointer, reducedMotion])

  const removeRipple = (id) => setRipples((rs) => rs.filter((r) => r.id !== id))

  const cursorColor = visitor?.color?.hex || '#6B7B8C'
  const isBreathing =
    isIdle && cursorMode === 'default' && !isPressed && !reducedMotion

  return (
    <>
      {/* ============================ CUSTOM CURSOR =====================
          Desktop only. Position is pixel-locked 1:1 (raw motion values,
          no spring). All personality is state + form + reaction.
          ================================================================ */}
      {isFinePointer && (
        <>
          {/* Click ripples — each pinned to its OWN click point (not
              parented to the moving cursor), so the ring expands where
              you clicked even if the mouse moves on. Animates width /
              height / opacity only, so the static translate(-50%) that
              centers it on the click point is left untouched by motion.
              Self-removes when its animation completes. */}
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              aria-hidden="true"
              initial={{ width: 14, height: 14, opacity: 0.55 }}
              animate={{ width: 64, height: 64, opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              onAnimationComplete={() => removeRipple(r.id)}
              style={{
                position: 'fixed',
                left: r.x,
                top: r.y,
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: `1.5px solid ${cursorColor}`,
                mixBlendMode: 'difference',
                pointerEvents: 'none',
                zIndex: 60,
              }}
            />
          ))}

          {/* The cursor itself — a 0x0 grid "point" at the pointer.
              Every child is auto-centered on it (place-items: center),
              so the shapes can morph (width/height) and scale (squish,
              breathe) freely with no transform-based centering math. */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              x: cursorX,
              y: cursorY,
              width: 0,
              height: 0,
              display: 'grid',
              placeItems: 'center',
              pointerEvents: 'none',
              zIndex: 60,
              willChange: 'transform',
            }}
          >
            {cursorMode === 'card' ? (
              /* Card mode — a labelled pill. No blend mode here: the
                 text has to stay readable against any background. */
              <motion.div
                key="pill"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: isPressed ? 0.92 : 1 }}
                transition={{ type: 'spring', damping: 26, stiffness: 440 }}
                style={{
                  gridArea: '1 / 1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '5px 11px',
                  borderRadius: '999px',
                  backgroundColor: cursorColor,
                  color: '#0F1112',
                  fontFamily:
                    '"JetBrains Mono", "Geist Mono", ui-monospace, monospace',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {cardLabel}
              </motion.div>
            ) : (
              /* Default + interactive — one element that morphs between
                 a filled dot and an outline ring. The breath wrapper
                 pulses the whole thing, but only while idle. */
              <motion.div
                key="dotring"
                animate={{ scale: isBreathing ? [1, 1.16, 1] : 1 }}
                transition={
                  isBreathing
                    ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.25, ease: 'easeOut' }
                }
                style={{ gridArea: '1 / 1', display: 'grid', placeItems: 'center' }}
              >
                <motion.div
                  animate={{
                    width: cursorMode === 'interactive' ? 30 : 12,
                    height: cursorMode === 'interactive' ? 30 : 12,
                    opacity: cursorMode === 'interactive' ? 0.9 : 0.7,
                    borderWidth: cursorMode === 'interactive' ? 1.5 : 0,
                    backgroundColor:
                      cursorMode === 'interactive'
                        ? `${cursorColor}00`
                        : cursorColor,
                    scale: isPressed ? 0.78 : 1,
                  }}
                  transition={{ type: 'spring', damping: 26, stiffness: 440 }}
                  style={{
                    gridArea: '1 / 1',
                    borderRadius: '50%',
                    borderStyle: 'solid',
                    borderColor: cursorColor,
                    mixBlendMode: 'difference',
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        </>
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
