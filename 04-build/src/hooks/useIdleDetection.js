import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useIdleDetection — fires continuously while the visitor is idle.
 *
 * Behavior:
 *   1. After `idleMs` (default 12s) of no activity, calls `onIdle()` for the first hit
 *   2. Then every `cycleMs` (default 8s), calls `onIdleCycle()` with the next item
 *   3. Any activity (mousemove, scroll, key, touch) immediately:
 *      - Resets the idle timer
 *      - Calls `onActivity()` so the caller can dismiss idle content
 *   4. The cycle continues indefinitely until activity is detected
 *
 * "Activity" = mousemove, scroll, keydown, touchstart, wheel.
 *
 * @param {object} options
 * @param {number}   options.idleMs      — ms of stillness before first idle (default 12000)
 * @param {number}   options.cycleMs     — ms between idle cycle ticks (default 8000)
 * @param {boolean}  options.enabled     — turn detection on/off
 * @param {function} options.onIdle      — first idle hit
 * @param {function} options.onIdleCycle — subsequent idle ticks
 * @param {function} options.onActivity  — any activity detected (dismiss signal)
 */
export function useIdleDetection({
  idleMs = 12000,
  cycleMs = 8000,
  enabled = true,
  onIdle,
  onIdleCycle,
  onActivity,
} = {}) {
  const [isIdle, setIsIdle] = useState(false)
  const idleTimerRef = useRef(null)
  const cycleTimerRef = useRef(null)
  const isIdleRef = useRef(false)

  // Keep callbacks in sync without re-binding listeners
  const onIdleRef = useRef(onIdle)
  const onIdleCycleRef = useRef(onIdleCycle)
  const onActivityRef = useRef(onActivity)
  useEffect(() => { onIdleRef.current = onIdle }, [onIdle])
  useEffect(() => { onIdleCycleRef.current = onIdleCycle }, [onIdleCycle])
  useEffect(() => { onActivityRef.current = onActivity }, [onActivity])

  // Start the cycling interval
  const startCycle = useCallback(() => {
    if (cycleTimerRef.current) clearInterval(cycleTimerRef.current)
    cycleTimerRef.current = setInterval(() => {
      if (typeof onIdleCycleRef.current === 'function') {
        onIdleCycleRef.current()
      }
    }, cycleMs)
  }, [cycleMs])

  // Stop the cycling interval
  const stopCycle = useCallback(() => {
    if (cycleTimerRef.current) {
      clearInterval(cycleTimerRef.current)
      cycleTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const reset = () => {
      // If we WERE idle, signal activity so caller can dismiss
      if (isIdleRef.current) {
        isIdleRef.current = false
        setIsIdle(false)
        stopCycle()
        if (typeof onActivityRef.current === 'function') {
          onActivityRef.current()
        }
      }

      // Reset the idle timer
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => {
        isIdleRef.current = true
        setIsIdle(true)

        // First idle hit
        if (typeof onIdleRef.current === 'function') {
          onIdleRef.current()
        }

        // Start cycling
        startCycle()
      }, idleMs)
    }

    // Activity events
    const events = ['mousemove', 'scroll', 'keydown', 'touchstart', 'wheel']
    events.forEach(evt => window.addEventListener(evt, reset, { passive: true }))

    // Start the first timer
    reset()

    return () => {
      events.forEach(evt => window.removeEventListener(evt, reset))
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      stopCycle()
    }
  }, [idleMs, enabled, startCycle, stopCycle])

  return { isIdle }
}
