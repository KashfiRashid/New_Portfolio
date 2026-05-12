import { createContext, useContext, useCallback, useMemo, useRef, useState } from 'react'
import { useCharacter } from '../character/CharacterContext.jsx'
import { getBubble, renderBubbleText } from './bubbleLibrary.js'

/**
 * CompanionContext — provides fire() for section triggers and fireIdle() for
 * the continuous idle cycle. Two separate systems:
 *
 * fire() — section triggers (entry, hover, click, scroll, exit-intent)
 *   - Max 8 bubbles per session
 *   - 8s cooldown between bubbles
 *   - Per-element cap: each elementId fires at most once per session
 *
 * fireIdle() — idle cycle content (bypasses normal frequency rules)
 *   - No cooldown (the cycle timer handles pacing)
 *   - No session cap (idle content is free)
 *   - Each idle item shown at most once per session (shuffled pool)
 *
 * Source of truth: /01-brand-book/04-companion-spec.md frequency rules.
 */

const CompanionContext = createContext(null)

const SESSION_BUBBLE_CAP = 8
const COOLDOWN_MS = 8000

export function CompanionProvider({ visitor, children }) {
  const character = useCharacter()

  // Active bubble being rendered (or null)
  const [active, setActive] = useState(null)
  // Active idle reel reference (or null) — legacy, character handles reels now
  const [activeReel, setActiveReel] = useState(null)

  // Per-session counters — refs so they don't trigger re-renders
  const firedCountRef = useRef(0)
  const lastFiredAtRef = useRef(0)
  const firedElementsRef = useRef(new Set())
  const dismissTimerRef = useRef(null)

  /**
   * fire — attempt to fire a bubble from the library. Respects frequency rules.
   * @param {string} bubbleId — e.g. 'H17'
   * @param {object} opts
   * @param {string} opts.elementId — optional unique key for per-element cap
   * @returns {boolean} true if fired, false if suppressed
   */
  const fire = useCallback((bubbleId, opts = {}) => {
    const bubble = getBubble(bubbleId)
    if (!bubble) {
      console.warn(`Companion.fire: unknown bubble ${bubbleId}`)
      return false
    }

    const now = Date.now()

    // Frequency rule 1 — session cap
    if (firedCountRef.current >= SESSION_BUBBLE_CAP) return false

    // Frequency rule 2 — cooldown
    if (now - lastFiredAtRef.current < COOLDOWN_MS) return false

    // Frequency rule 3 — per-element cap
    const elementKey = opts.elementId || bubbleId
    if (firedElementsRef.current.has(elementKey)) return false

    // Distance gating — character must be within 250px of cursor
    // Exception: exit-intent bubbles fire regardless of distance
    const isExitIntent = bubble.trigger === 'exit-intent'
    if (!isExitIntent && character?.getPosition) {
      const charPos = character.getPosition()
      const cursorX = typeof window !== 'undefined' ? (window.__lastCursorX ?? 0) : 0
      const cursorY = typeof window !== 'undefined' ? (window.__lastCursorY ?? 0) : 0
      const dist = Math.hypot(charPos.x - cursorX, charPos.y - cursorY)
      if (dist > 250) return false
    }

    // Render text with visitor variables substituted
    const text = renderBubbleText(bubble.text, visitor)

    setActive({
      id: bubble.id,
      text,
      anchor: opts.anchor || null,
      firedAt: now,
    })

    // Route to character for above-head rendering
    if (character?.speakBubble) {
      character.speakBubble(text, bubble.id)
    }

    firedCountRef.current += 1
    lastFiredAtRef.current = now
    firedElementsRef.current.add(elementKey)

    // Auto-dismiss after 4s
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current)
    dismissTimerRef.current = setTimeout(() => {
      setActive(null)
    }, 4000)

    return true
  }, [visitor, character])

  /**
   * fireIdle — fire idle content directly (bypasses cooldown/cap).
   * Used by the idle cycle system in App.jsx.
   *
   * @param {{ type: string, text: string, clip?: string }} content
   */
  const fireIdle = useCallback((content) => {
    if (!content) return

    // Route all idle content through the character system
    if (character?.handleIdleContent) {
      const text = renderBubbleText(content.text, visitor)
      character.handleIdleContent({ ...content, text })
      return
    }

    // Fallback if character system isn't available (shouldn't happen)
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current)
    const text = renderBubbleText(content.text, visitor)
    setActive({
      id: `idle-${Date.now()}`,
      text,
      anchor: null,
      firedAt: Date.now(),
      isIdle: true,
    })
    dismissTimerRef.current = setTimeout(() => {
      setActive(null)
    }, 6000)
  }, [visitor, character])

  /**
   * dismiss — cancel the active bubble manually.
   */
  const dismiss = useCallback(() => {
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current)
    setActive(null)
  }, [])

  /**
   * dismissReel — stop the active idle reel.
   */
  const dismissReel = useCallback(() => {
    setActiveReel(null)
  }, [])

  /**
   * dismissAll — dismiss both bubble and reel (used when activity resumes).
   */
  const dismissAll = useCallback(() => {
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current)
    setActive(null)
    setActiveReel(null)
  }, [])

  const value = useMemo(() => ({
    active,
    activeReel,
    fire,
    fireIdle,
    dismiss,
    dismissReel,
    dismissAll,
    visitor,
  }), [active, activeReel, fire, fireIdle, dismiss, dismissReel, dismissAll, visitor])

  return (
    <CompanionContext.Provider value={value}>
      {children}
    </CompanionContext.Provider>
  )
}

export function useCompanion() {
  const ctx = useContext(CompanionContext)
  if (!ctx) {
    throw new Error('useCompanion must be used inside <CompanionProvider>')
  }
  return ctx
}
