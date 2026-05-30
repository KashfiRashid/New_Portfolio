import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * <CursorGlow /> - subtle radial glow that follows the cursor.
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
 * @param {string} props.className - className for the outer container
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

  // Track cursor relative to container.
  //
  // The container's bounding rect is cached rather than read on every
  // mousemove: getBoundingClientRect() forces a synchronous layout, so
  // calling it per mouse event is a layout-thrash hot path. The rect only
  // changes on scroll / resize / layout, so it is refreshed on those
  // events (and on mouseenter) and simply read from the cache while the
  // cursor moves.
  useEffect(() => {
    if (!isFinePointer) return
    const el = containerRef.current
    if (!el) return

    let rect = el.getBoundingClientRect()
    const refreshRect = () => { rect = el.getBoundingClientRect() }

    const handleMove = (e) => {
      glowX.set(e.clientX - rect.left)
      glowY.set(e.clientY - rect.top)
    }
    const handleEnter = () => { refreshRect(); setIsInside(true) }
    const handleLeave = () => setIsInside(false)

    el.addEventListener('mousemove', handleMove, { passive: true })
    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)
    window.addEventListener('scroll', refreshRect, { passive: true })
    window.addEventListener('resize', refreshRect)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('scroll', refreshRect)
      window.removeEventListener('resize', refreshRect)
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
