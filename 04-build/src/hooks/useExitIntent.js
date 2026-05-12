import { useEffect, useRef } from 'react'

/**
 * useExitIntent — fires a callback when the cursor moves toward the top of
 * the viewport, suggesting the visitor is heading for the close button or
 * tab bar.
 *
 * Desktop only — mobile has no equivalent gesture and would need a separate
 * "back gesture" detection.
 *
 * @param {function} onExit — callback fired once per session on first detect
 * @param {boolean} enabled — gate the listener
 */
export function useExitIntent(onExit, enabled = true) {
  const firedRef = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const handler = (e) => {
      // Only fire when the cursor moves up out of the viewport (clientY < 0)
      // and only once per session.
      if (firedRef.current) return
      if (e.clientY <= 0) {
        firedRef.current = true
        if (typeof onExit === 'function') onExit()
      }
    }

    document.addEventListener('mouseleave', handler)
    return () => document.removeEventListener('mouseleave', handler)
  }, [enabled, onExit])
}
