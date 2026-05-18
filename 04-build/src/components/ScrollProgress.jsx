import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * <ScrollProgress /> — thin progress line at the top of the viewport.
 *
 * Visitor's color, 40% opacity, 1px height. Fixed position.
 * Uses framer-motion useScroll → scaleX. The spring is tuned snappy
 * (low damping, high stiffness) so the line tracks scroll near-1:1
 * — laggy progress bars feel unresponsive, especially on fast scrolls
 * down long case studies.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 520,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'var(--visitor-color)',
        opacity: 0.4,
        transformOrigin: '0%',
        scaleX,
        zIndex: 55,
        pointerEvents: 'none',
      }}
    />
  )
}
