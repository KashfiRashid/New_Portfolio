import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * <OnboardingModal /> — cursor-attached visitor identity prompt.
 *
 * Behavior:
 *   1. Appears near cursor, follows it for ~1.5s (entrance feel)
 *   2. Auto-anchors in place after 1.5s and auto-focuses the input
 *   3. Visitor types their name and submits (or skips)
 *   4. Fades out, companion E1/E2 fires
 *
 * Same form factor as companion bubbles: left border in visitor color,
 * backdrop blur, same shadow and text style.
 */
export default function OnboardingModal({ open, onSubmit, onSkip }) {
  const [value, setValue] = useState('')
  const [isAnchored, setIsAnchored] = useState(false)
  const [pos, setPos] = useState(null)
  const inputRef = useRef(null)

  // Track cursor position before anchoring
  useEffect(() => {
    if (!open || isAnchored) return

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [open, isAnchored])

  // Auto-anchor after 1.5s and focus the input
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => {
      setIsAnchored(true)
      // Focus input after anchoring so the user can immediately type
      setTimeout(() => inputRef.current?.focus(), 100)
    }, 1500)
    return () => clearTimeout(t)
  }, [open])

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setIsAnchored(false)
      setPos(null)
      setValue('')
    }
  }, [open])

  // Esc to skip
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'Escape') onSkip()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onSkip])

  const handleSubmit = (e) => {
    e?.preventDefault()
    const trimmed = value.trim()
    if (trimmed.length === 0) {
      onSkip()
    } else {
      onSubmit(trimmed)
    }
  }

  // Position computation
  const promptWidth = 340
  const promptHeight = 130
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  // Default to right of center if cursor hasn't moved yet
  const rawPos = pos || { x: vw * 0.55, y: vh * 0.4 }

  let left = rawPos.x + 28
  let top = rawPos.y + 28

  // Edge awareness
  if (left + promptWidth > vw - 16) left = rawPos.x - promptWidth - 28
  if (top + promptHeight > vh - 16) top = rawPos.y - promptHeight - 12
  left = Math.max(16, Math.min(left, vw - promptWidth - 16))
  top = Math.max(16, Math.min(top, vh - promptHeight - 16))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          style={{
            position: 'fixed',
            left: isAnchored ? undefined : left,
            top: isAnchored ? undefined : top,
            // When anchored, use centered positioning for stability
            ...(isAnchored
              ? {
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }
              : {}),
            width: promptWidth,
            zIndex: 45,
            pointerEvents: 'auto',
          }}
          role="dialog"
          aria-label="Visitor identity prompt"
        >
          <div
            className="bg-surface-mid/90 backdrop-blur-md rounded-sm px-5 py-4 shadow-2xl"
            style={{
              borderLeft: '1px solid var(--visitor-color)',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="text-text-primary text-sm leading-snug">
                what should i call you while you&apos;re here?
              </p>

              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value.slice(0, 20))}
                  maxLength={20}
                  className="flex-1 bg-transparent border-b border-surface-raised focus:border-accent-glow outline-none text-text-primary py-1.5 text-sm placeholder:text-text-faint transition-all duration-300"
                  style={{ boxShadow: 'none' }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 4px 16px -4px var(--visitor-color)'
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none'
                  }}
                  aria-label="Your name (optional, max 20 characters)"
                />
                <button
                  type="submit"
                  className="text-text-muted hover:text-accent-glow transition-colors duration-250 px-1.5 py-1.5 text-base"
                  aria-label="Submit name"
                >
                  →
                </button>
              </div>

              <button
                type="button"
                onClick={onSkip}
                className="text-text-faint hover:text-text-muted text-xs transition-colors duration-250"
              >
                or skip
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
