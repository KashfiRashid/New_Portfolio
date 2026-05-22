import { memo } from 'react'
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
function ScrollProgress() {
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

// memo: no props, so it renders once and is skipped on every subsequent
// AppShell re-render. The progress line still tracks scroll - useScroll +
// useSpring drive it through a motion value, which bypasses React renders.
export default memo(ScrollProgress)
