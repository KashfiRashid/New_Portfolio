import { useEffect, useRef } from 'react'

/**
 * useReelTriggers — three contextual reel detectors.
 * Per character-spec-patch-contextual-intelligence.md §A:
 *
 *   1. bottom-of-page    — visitor scrolled within 200px of doc bottom,
 *                          session ≥90s, fires AT MOST ONCE PER SESSION
 *   2. section-dwell     — 40s in same section with no click, fires AT
 *                          MOST ONCE PER SECTION PER SESSION
 *   3. deep-idle         — 60s of no activity (mousemove/scroll/key/touch/
 *                          wheel/click), 3-minute cooldown between fires
 *
 * Returns nothing — fires via the injected `fire({ triggerType, section })`
 * callback. The parent (CharacterContext) chooses the reel clip and
 * transitions the state machine.
 *
 * Priority gate: all three triggers skip if the character is currently in
 * `chased`/`hiding`/`showcasing`/`summoning_reel`/`watching_reel`/`taking_reel`.
 * Deep-idle additionally defers when a bubble is active (priority 4 > 5).
 *
 * @param {object}   opts
 * @param {string}   opts.section        — current section key
 * @param {boolean}  opts.enabled        — gate (mobile + spawn + visibility)
 * @param {function} opts.getState       — () => current state name
 * @param {function} opts.isBubbleActive — () => boolean
 * @param {function} opts.fire           — ({ triggerType, section }) => void
 */
export function useReelTriggers({
  section,
  enabled,
  getState,
  isBubbleActive,
  fire,
}) {
  const sessionStartRef = useRef(Date.now())
  const bottomFiredRef = useRef(false)
  const sectionDwellFiredRef = useRef({})
  const deepIdleLastFireRef = useRef(0)
  const dwellStartRef = useRef(Date.now())

  // Keep callbacks fresh without re-binding listeners.
  const enabledRef = useRef(enabled)
  const getStateRef = useRef(getState)
  const isBubbleActiveRef = useRef(isBubbleActive)
  const fireRef = useRef(fire)
  const sectionRef = useRef(section)
  useEffect(() => { enabledRef.current = enabled }, [enabled])
  useEffect(() => { getStateRef.current = getState }, [getState])
  useEffect(() => { isBubbleActiveRef.current = isBubbleActive }, [isBubbleActive])
  useEffect(() => { fireRef.current = fire }, [fire])
  useEffect(() => { sectionRef.current = section }, [section])

  const BLOCKING_STATES = [
    'chased', 'hiding', 'showcasing',
    'summoning_reel', 'watching_reel', 'taking_reel',
    // patch v1.4: reel triggers must not fire while the character is
    // being held, thrown, or running back to safety.
    'grabbed', 'thrown', 'running_away',
  ]

  const canFire = (triggerType) => {
    if (!enabledRef.current) return false
    const s = getStateRef.current?.() || 'inactive'
    if (BLOCKING_STATES.includes(s)) return false
    // Priority 5 (deepIdle) defers to active bubbles (priority 4).
    if (triggerType === 'deepIdle' && isBubbleActiveRef.current?.()) return false
    return true
  }

  /* ── Trigger 1: bottom-of-page ──────────────────────────────────── */
  // The handler reads `document.documentElement.scrollHeight`, which
  // is a layout-forcing property. Scroll events can fire dozens of
  // times per frame, so we coalesce through requestAnimationFrame —
  // at most one layout read per animation frame, regardless of event
  // density. The early-exit on `bottomFiredRef` still applies: once
  // the bottom trigger has fired, both onScroll and the scheduled
  // rAF tick become near-free no-ops.
  useEffect(() => {
    if (typeof window === 'undefined') return

    const SESSION_MIN_MS = 90_000
    const BOTTOM_THRESHOLD_PX = 200

    let rafId = 0
    let pending = false

    const tick = () => {
      pending = false
      if (bottomFiredRef.current) return
      if (!canFire('bottom')) return
      if (Date.now() - sessionStartRef.current < SESSION_MIN_MS) return

      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const distFromBottom = docHeight - (scrollY + winHeight)

      if (distFromBottom < BOTTOM_THRESHOLD_PX) {
        bottomFiredRef.current = true
        fireRef.current?.({ triggerType: 'bottom', section: sectionRef.current })
      }
    }

    const onScroll = () => {
      if (bottomFiredRef.current) return
      if (pending) return
      pending = true
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── Trigger 2: section dwell ───────────────────────────────────── */
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (!section) return

    // Reset dwell clock on section change.
    dwellStartRef.current = Date.now()
    const DWELL_MS = 40_000

    const onClick = () => {
      // Any click in this section resets the dwell clock.
      dwellStartRef.current = Date.now()
    }

    const id = setInterval(() => {
      if (sectionDwellFiredRef.current[section]) return
      if (!canFire('dwell')) return
      if (Date.now() - dwellStartRef.current >= DWELL_MS) {
        sectionDwellFiredRef.current[section] = true
        fireRef.current?.({ triggerType: 'dwell', section })
      }
    }, 2000)

    document.addEventListener('click', onClick, true)
    return () => {
      clearInterval(id)
      document.removeEventListener('click', onClick, true)
    }
  }, [section])

  /* ── Trigger 3: deep idle ───────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return

    const DEEP_IDLE_MS = 60_000
    const COOLDOWN_MS = 180_000
    let timeoutId = null

    const reset = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (!canFire('deepIdle')) return
        if (Date.now() - deepIdleLastFireRef.current < COOLDOWN_MS) return
        deepIdleLastFireRef.current = Date.now()
        fireRef.current?.({ triggerType: 'deepIdle', section: sectionRef.current })
      }, DEEP_IDLE_MS)
    }

    const events = ['mousemove', 'scroll', 'keydown', 'touchstart', 'wheel', 'click']
    events.forEach(evt => window.addEventListener(evt, reset, { passive: true }))
    reset()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      events.forEach(evt => window.removeEventListener(evt, reset))
    }
  }, [])
}

export default useReelTriggers
