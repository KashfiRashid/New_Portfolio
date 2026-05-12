import { motion, AnimatePresence } from 'framer-motion'
import Reel from '../companion/Reel.jsx'

/**
 * ReelHandoff — reel custody integration.
 * Per character-spec.md Section 6:
 *   - Reel materializes adjacent to character when summoned
 *   - When carried, reel follows character and shrinks
 *   - When character exits, reel goes with it
 *   - Reel size: 240×160px desktop, 200×130px mobile
 *
 * The actual reel visuals come from the existing Reel.jsx component.
 * This component handles the custody choreography.
 */
export default function ReelHandoff({ active, clip, carried, charPosition, onDismiss }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const reelW = isMobile ? 200 : 240
  const reelH = isMobile ? 130 : 160

  // Normal position: to the left of the character
  const normalX = charPosition.x - reelW - 20
  const normalY = charPosition.y - reelH + 10

  // Carried position: shrunk, attached to character
  const carriedX = charPosition.x - 30
  const carriedY = charPosition.y - 24

  const x = carried ? carriedX : Math.max(12, normalX)
  const y = carried ? carriedY : Math.max(12, normalY)
  const scale = carried ? 0.3 : 1

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="reel-handoff"
          initial={{ opacity: 0, y: y + 6, scale: 0.96 }}
          animate={{
            opacity: 1,
            x,
            y,
            scale,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.3 },
          }}
          transition={{
            opacity: { duration: 0.4 },
            x: { duration: 0.15, ease: 'linear' },
            y: { duration: 0.15, ease: 'linear' },
            scale: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] },
          }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: reelW,
            zIndex: 42,
            pointerEvents: 'none',
            transformOrigin: 'bottom right',
          }}
          role="presentation"
        >
          <Reel
            reel={{ clip: clip || null, firedAt: Date.now() }}
            onDismiss={onDismiss}
            embedded={true}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
