import { motion, AnimatePresence } from 'framer-motion'

/**
 * CharacterSprite — SVG silhouette figure with posture animations.
 * Per character-spec.md Section 2 + patch-activities.md:
 *   - Dark fill #1a1916, warm accent #c8b582 (monitor glow catch)
 *   - No facial features. Mood from posture only.
 *   - 36px tall desktop, 28px mobile
 *   - Direction via scaleX(-1) to mirror
 *
 * 11 postures: standing, walking1, walking2, sitting, waving, running,
 *              laptop_open, peeking, stretching, contemplating, holding_mug
 *
 * 2 props: laptop (during laptop_session), mug (during beverage)
 *
 * Transitions via framer-motion animate on individual body parts.
 */

const FILL = '#1a1916'
const ACCENT = '#c8b582'
const GLOW_COLOR = 'rgba(200, 181, 130, 0.08)'

// Posture keyframes for each body part (relative transforms)
const POSTURES = {
  standing: {
    body: { y: 0, rotate: 0 },
    head: { y: 0, rotate: 0 },
    leftArm: { rotate: 0, y: 0 },
    rightArm: { rotate: 0, y: 0 },
    leftLeg: { rotate: 0, y: 0, x: 0 },
    rightLeg: { rotate: 0, y: 0, x: 0 },
  },
  walking1: {
    body: { y: -1, rotate: 0 },
    head: { y: -1, rotate: 2 },
    leftArm: { rotate: 15, y: -1 },
    rightArm: { rotate: -15, y: 1 },
    leftLeg: { rotate: -18, y: 0, x: -1 },
    rightLeg: { rotate: 18, y: 0, x: 1 },
  },
  walking2: {
    body: { y: -1, rotate: 0 },
    head: { y: -1, rotate: -2 },
    leftArm: { rotate: -15, y: 1 },
    rightArm: { rotate: 15, y: -1 },
    leftLeg: { rotate: 18, y: 0, x: 1 },
    rightLeg: { rotate: -18, y: 0, x: -1 },
  },
  sitting: {
    body: { y: 6, rotate: 0 },
    head: { y: 5, rotate: 0 },
    leftArm: { rotate: -10, y: 5 },
    rightArm: { rotate: 10, y: 5 },
    leftLeg: { rotate: -75, y: -2, x: -2 },
    rightLeg: { rotate: -75, y: -2, x: 2 },
  },
  waving: {
    body: { y: 0, rotate: 0 },
    head: { y: 0, rotate: 5 },
    leftArm: { rotate: 0, y: 0 },
    rightArm: { rotate: -140, y: -4 },
    leftLeg: { rotate: 0, y: 0, x: 0 },
    rightLeg: { rotate: 0, y: 0, x: 0 },
  },
  running: {
    body: { y: -2, rotate: 8 },
    head: { y: -2, rotate: 8 },
    leftArm: { rotate: 25, y: -2 },
    rightArm: { rotate: -30, y: 2 },
    leftLeg: { rotate: -30, y: 0, x: -2 },
    rightLeg: { rotate: 35, y: -1, x: 2 },
  },

  /* ── Activity postures (patch-activities.md) ───────────────────── */

  // laptop_session — seated with slight forward lean, hands at lap level for typing
  laptop_open: {
    body: { y: 6, rotate: 6 },
    head: { y: 5, rotate: 8 },
    leftArm: { rotate: -40, y: 4 },
    rightArm: { rotate: 40, y: 4 },
    leftLeg: { rotate: -75, y: -2, x: -2 },
    rightLeg: { rotate: -75, y: -2, x: 2 },
  },

  // peek_reveal — partial body, head and shoulders only (body lowered off-frame)
  peeking: {
    body: { y: 14, rotate: 0 },
    head: { y: 10, rotate: 0 },
    leftArm: { rotate: 0, y: 12 },
    rightArm: { rotate: 0, y: 12 },
    leftLeg: { rotate: 0, y: 14, x: 0 },
    rightLeg: { rotate: 0, y: 14, x: 0 },
  },

  // stretch — arms overhead, body slightly elongated
  stretching: {
    body: { y: -2, rotate: 0 },
    head: { y: -3, rotate: 0 },
    leftArm: { rotate: -160, y: -6 },
    rightArm: { rotate: -160, y: -6 },
    leftLeg: { rotate: 0, y: 0, x: -1 },
    rightLeg: { rotate: 0, y: 0, x: 1 },
  },

  // contemplation — seated, head tilted, one arm raised supporting head
  contemplating: {
    body: { y: 6, rotate: -3 },
    head: { y: 5, rotate: -12 },
    leftArm: { rotate: -100, y: 1 },
    rightArm: { rotate: 10, y: 5 },
    leftLeg: { rotate: -75, y: -2, x: -2 },
    rightLeg: { rotate: -75, y: -2, x: 2 },
  },

  // beverage — standing/seated, one arm raised toward head (holding mug)
  holding_mug: {
    body: { y: 0, rotate: 0 },
    head: { y: 0, rotate: 3 },
    leftArm: { rotate: 0, y: 0 },
    rightArm: { rotate: -110, y: -2 },
    leftLeg: { rotate: 0, y: 0, x: 0 },
    rightLeg: { rotate: 0, y: 0, x: 0 },
  },
}

const springConfig = { type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }

export default function CharacterSprite({
  posture = 'standing',
  size = 36,
  visible = true,
  props: activeProps = {},
}) {
  const p = POSTURES[posture] || POSTURES.standing
  const aspectRatio = 40 / 24
  const width = size / aspectRatio
  const height = size

  // Intensify monitor glow during laptop_session
  const glowIntensity = posture === 'laptop_open' ? 0.7 : 0.5
  const shoulderGlowIntensity = posture === 'laptop_open' ? 0.55 : 0.35

  // Stretch scale bounce
  const stretchScale = posture === 'stretching' ? 1.06 : 1

  if (!visible) return null

  return (
    <motion.svg
      viewBox="0 0 24 40"
      width={width}
      height={height}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
      animate={{ scaleY: stretchScale }}
      transition={{ type: 'spring', damping: 14, stiffness: 180 }}
    >
      {/* Ambient glow underneath */}
      <ellipse cx="12" cy="38" rx="8" ry="2.5" fill={GLOW_COLOR} />

      {/* ── Props layer (behind body parts) ──────────────────────── */}

      {/* Laptop prop — during laptop_session */}
      <AnimatePresence>
        {activeProps.laptop && (
          <motion.g
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ originX: '12px', originY: '28px' }}
          >
            {/* Laptop base */}
            <rect x="5" y="27" width="14" height="2.5" rx="0.5" fill={FILL} />
            {/* Laptop screen (open lid) */}
            <motion.rect
              x="5.5" y="20" width="13" height="7"
              rx="0.5"
              fill={ACCENT}
              opacity="0.5"
              animate={{ opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Screen glow cast on character */}
            <rect x="6" y="20.5" width="12" height="6" rx="0.5" fill={ACCENT} opacity="0.15" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Mug prop — during beverage activity */}
      <AnimatePresence>
        {activeProps.mug && (
          <motion.g
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.25 }}
          >
            {/* Mug body */}
            <rect x="17" y="5" width="5" height="6" rx="1.5" fill="#2a2520" />
            {/* Mug handle */}
            <path d="M22 7 Q24.5 8 22 10" stroke="#2a2520" strokeWidth="1.2" fill="none" />
            {/* Warm fill inside */}
            <rect x="17.5" y="5.5" width="4" height="2" rx="0.8" fill={ACCENT} opacity="0.4" />
            {/* Steam particles */}
            <motion.circle
              cx="19" cy="3" r="0.6"
              fill={ACCENT} opacity="0.3"
              animate={{ y: [-1, -4], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.circle
              cx="20.5" cy="3.5" r="0.5"
              fill={ACCENT} opacity="0.25"
              animate={{ y: [-0.5, -3.5], opacity: [0.25, 0] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            />
            <motion.circle
              cx="18" cy="3.2" r="0.4"
              fill={ACCENT} opacity="0.2"
              animate={{ y: [-0.8, -3], opacity: [0.2, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
            />
          </motion.g>
        )}
      </AnimatePresence>

      {/* ── Body parts ──────────────────────────────────────────── */}

      {/* Body group — torso */}
      <motion.g
        animate={{ y: p.body.y, rotate: p.body.rotate }}
        transition={springConfig}
        style={{ originX: '12px', originY: '18px' }}
      >
        {/* Torso */}
        <rect x="8" y="12" width="8" height="11" rx="2" fill={FILL} />
        {/* Shoulder highlight — monitor glow catch */}
        <motion.rect
          x="8" y="12" width="8" height="1.5" rx="0.75"
          fill={ACCENT}
          animate={{ opacity: shoulderGlowIntensity }}
          transition={{ duration: 0.8 }}
        />
      </motion.g>

      {/* Head */}
      <motion.g
        animate={{ y: p.head.y, rotate: p.head.rotate }}
        transition={springConfig}
        style={{ originX: '12px', originY: '7px' }}
      >
        <circle cx="12" cy="7" r="4.5" fill={FILL} />
        {/* Head top highlight — warm glow (intensifies during laptop) */}
        <motion.path
          d="M8.5 4.5 Q12 2.5 15.5 4.5"
          stroke={ACCENT}
          strokeWidth="1.2"
          fill="none"
          animate={{ opacity: glowIntensity }}
          transition={{ duration: 0.8 }}
          strokeLinecap="round"
        />
      </motion.g>

      {/* Left arm */}
      <motion.g
        animate={{
          rotate: p.leftArm.rotate,
          y: p.leftArm.y,
        }}
        transition={springConfig}
        style={{ originX: '7px', originY: '13px' }}
      >
        <rect x="3.5" y="13" width="3.5" height="9" rx="1.75" fill={FILL} />
      </motion.g>

      {/* Right arm */}
      <motion.g
        animate={{
          rotate: p.rightArm.rotate,
          y: p.rightArm.y,
        }}
        transition={springConfig}
        style={{ originX: '17px', originY: '13px' }}
      >
        <rect x="17" y="13" width="3.5" height="9" rx="1.75" fill={FILL} />
        {/* Arm accent on right (slightly visible edge) */}
        <rect x="19.5" y="13" width="1" height="3" rx="0.5" fill={ACCENT} opacity="0.2" />
      </motion.g>

      {/* Left leg */}
      <motion.g
        animate={{
          rotate: p.leftLeg.rotate,
          y: p.leftLeg.y,
          x: p.leftLeg.x || 0,
        }}
        transition={springConfig}
        style={{ originX: '9.5px', originY: '23px' }}
      >
        <rect x="7.5" y="23" width="4" height="12" rx="2" fill={FILL} />
      </motion.g>

      {/* Right leg */}
      <motion.g
        animate={{
          rotate: p.rightLeg.rotate,
          y: p.rightLeg.y,
          x: p.rightLeg.x || 0,
        }}
        transition={springConfig}
        style={{ originX: '14.5px', originY: '23px' }}
      >
        <rect x="12.5" y="23" width="4" height="12" rx="2" fill={FILL} />
      </motion.g>
    </motion.svg>
  )
}
