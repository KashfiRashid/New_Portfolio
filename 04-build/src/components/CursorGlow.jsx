import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * <CursorGlow /> — subtle radial glow that follows the cursor.
 *
 * Per /01-brand-book/06-visual-direction.md:
 *   "Soft monitor-glow gradients behind hero or in select transition moments."
 *   "Cursor traces on screen."
 *
 * Creates a 240px radial glow in the visitor's color at ~4% opacity,
 * mix-blend-mode: screen, following the cursor within the wrapped section.
 * Desktop fine-pointer only. Mobile gets nothing.
 *
 * @param {object} props
 * @param {string} props.className — className for the outer container
 * @param {React.ReactNode} props.children
 */
export default function CursorGlow({ className = '', children }) {
  const containerRef = useRef(null)
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [isInside, setIsInside] = useState(false)

  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const springX = useSpring(glowX, { damping: 30, stiffness: 200, mass: 0.5 })
  const springY = useSpring(glowY, { damping: 30, stiffness: 200, mass: 0.5 })

  // Detect fine pointer
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setIsFinePointer(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Track cursor relative to container
  useEffect(() => {
    if (!isFinePointer) return
    const el = containerRef.current
    if (!el) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      glowX.set(e.clientX - rect.left)
      glowY.set(e.clientY - rect.top)
    }
    const handleEnter = () => setIsInside(true)
    const handleLeave = () => setIsInside(false)

    el.addEventListener('mousemove', handleMove, { passive: true })
    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [isFinePointer, glowX, glowY])

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ overflow: 'hidden' }}>
      {isFinePointer && (
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isInside ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            x: springX,
            y: springY,
            width: 240,
            height: 240,
            marginLeft: -120,
            marginTop: -120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--visitor-color) 0%, transparent 70%)',
            opacity: 0,
            mixBlendMode: 'screen',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
