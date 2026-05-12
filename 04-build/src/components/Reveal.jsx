import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * <Reveal /> — scroll-triggered entrance for content blocks.
 *
 * Wraps children in a motion.div that fades + translates upward when
 * entering the viewport. Fires once (no re-trigger on scroll back up).
 *
 * Per /01-brand-book/06-visual-direction.md motion principles:
 *   - 250–400ms duration
 *   - 4–12px translate
 *   - ease-out or custom bezier
 *   - Reduced motion: fade only
 *
 * @param {object} props
 * @param {number} props.delay — delay in seconds before the reveal fires (default 0)
 * @param {number} props.y — translateY offset in px (default 8)
 * @param {number} props.duration — animation duration in seconds (default 0.5)
 * @param {string} props.className — optional className pass-through
 * @param {React.ReactNode} props.children
 */
export default function Reveal({ delay = 0, y = 8, duration = 0.5, className = '', children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * <RevealGroup /> — staggered reveal for a list of items.
 *
 * Each child gets an incremental delay (staggerMs apart).
 * Useful for card grids, opinion lists, people entries.
 *
 * @param {object} props
 * @param {number} props.staggerMs — delay between children in ms (default 60)
 * @param {number} props.baseDelay — base delay before the first child in ms (default 0)
 * @param {number} props.y — translateY offset (default 8)
 * @param {string} props.className — optional className for the container
 * @param {React.ReactNode} props.children
 */
export function RevealGroup({ staggerMs = 60, baseDelay = 0, y = 8, className = '', children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={child?.key ?? i}
              initial={{ opacity: 0, y }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
              transition={{
                duration: 0.45,
                delay: (baseDelay + i * staggerMs) / 1000,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </div>
  )
}
