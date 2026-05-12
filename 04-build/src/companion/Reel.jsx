import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * <Reel /> — ambient visual pane that surfaces during idle.
 *
 * Shows animated "desk footage" scenes — CSS-driven visuals that simulate
 * clips from the 2am studio. Each clip ID maps to a different visual:
 *   - 'blu-0-42':           Audio waveform visualization
 *   - 'desk-ambient':       Warm desk lamp glow with floating particles
 *   - 'spectral-bloom-demo': Color spectrum animation
 *   - 'sketch-scan':        Notebook grid with "pen strokes"
 *   - null (default):       Monitor glow with code-like scrolling lines
 *
 * Dismiss logic is handled ENTIRELY by the idle cycle system (CompanionContext
 * calls dismissAll on activity). The reel itself just renders and stays.
 *
 * @param {object} props.reel — { clip: string|null, firedAt: number }
 * @param {function} props.onDismiss — clears active reel from companion context
 */

const CAPTIONS = {
  'blu-0-42': "BLU at 0:42. just listen.",
  'desk-ambient': "the desk at 2am. quiet one.",
  'spectral-bloom-demo': "spectral bloom reacting to audio.",
  'sketch-scan': "early sketch. don't judge the handwriting.",
  default: "a clip from the desk.",
}

export default function Reel({ reel, onDismiss, embedded = false }) {
  const clip = reel.clip || 'default'
  const caption = CAPTIONS[clip] || CAPTIONS.default

  // Auto-dismiss after 20s (in case idle system doesn't clear it)
  useEffect(() => {
    const t = setTimeout(onDismiss, 20_000)
    return () => clearTimeout(t)
  }, [onDismiss])

  // Inner visual content — shared between embedded and standalone modes
  const reelContent = (
    <div className="bg-surface-deep/95 backdrop-blur-md border border-surface-raised rounded-sm overflow-hidden shadow-2xl">
      {/* Visual pane — 16:9 */}
      <div className="aspect-video relative overflow-hidden">
        <ReelVisual clip={clip} />

        {/* Scanline overlay — barely visible */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(232,184,106,0.03) 49%, rgba(232,184,106,0.06) 50%, rgba(232,184,106,0.03) 51%, transparent 100%)',
            height: '200%',
          }}
        />

        {/* Vignette corners */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(15,17,18,0.6) 100%)',
          }}
        />
      </div>

      {/* Caption */}
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-text-muted text-xs">{caption}</span>
        <span className="text-text-faint text-[9px] font-mono opacity-50">REC</span>
      </div>
    </div>
  )

  // Embedded mode: ReelHandoff handles positioning and motion
  if (embedded) {
    return reelContent
  }

  // Standalone mode: original fixed-position rendering
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.4 } }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-40 pointer-events-none"
      style={{ width: 340 }}
      role="presentation"
    >
      {reelContent}
    </motion.div>
  )
}

/* -----------------------------------------------------------------------
   ReelVisual — renders a CSS-driven ambient animation per clip type.
   No real video needed — these are atmospheric visuals.
   ----------------------------------------------------------------------- */

function ReelVisual({ clip }) {
  switch (clip) {
    case 'blu-0-42':
      return <WaveformVisual />
    case 'spectral-bloom-demo':
      return <SpectrumVisual />
    case 'sketch-scan':
      return <NotebookVisual />
    case 'desk-ambient':
      return <DeskGlowVisual />
    default:
      return <MonitorVisual />
  }
}

/* Waveform — animated bars simulating audio playback */
function WaveformVisual() {
  const bars = 24
  return (
    <div className="absolute inset-0 bg-surface-deep flex items-end justify-center gap-[3px] px-6 pb-4 pt-8">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{ backgroundColor: 'var(--visitor-color)', opacity: 0.6 }}
          animate={{
            height: [
              `${20 + Math.random() * 30}%`,
              `${10 + Math.random() * 60}%`,
              `${15 + Math.random() * 40}%`,
              `${20 + Math.random() * 50}%`,
            ],
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.05,
          }}
        />
      ))}
      {/* Playhead time */}
      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-text-faint">
        <TimerDisplay />
      </div>
    </div>
  )
}

/* Spectrum — flowing color bands (Spectral Bloom style) */
function SpectrumVisual() {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF8C69']
  return (
    <div className="absolute inset-0 bg-surface-deep overflow-hidden">
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 80 + i * 20,
            height: 80 + i * 20,
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
          animate={{
            x: [
              `${20 + i * 10}%`,
              `${50 - i * 5}%`,
              `${30 + i * 8}%`,
            ],
            y: [
              `${10 + i * 8}%`,
              `${40 - i * 3}%`,
              `${20 + i * 6}%`,
            ],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* Notebook — grid paper with animated "pen strokes" */
function NotebookVisual() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: '#1a1a1a',
        backgroundImage: `
          linear-gradient(rgba(232,184,106,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232,184,106,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}
    >
      {/* Animated pen strokes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: 30,
            top: 25 + i * 28,
            height: 1,
            backgroundColor: 'var(--visitor-color)',
            opacity: 0.4,
          }}
          initial={{ width: 0 }}
          animate={{ width: 100 + Math.random() * 160 }}
          transition={{
            duration: 1.5,
            delay: 0.8 + i * 0.6,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        />
      ))}
      {/* Small circle "bullet points" */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute rounded-full"
          style={{
            left: 20,
            top: 23 + i * 28,
            width: 4,
            height: 4,
            backgroundColor: 'var(--visitor-color)',
            opacity: 0.3,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 + i * 0.6 }}
        />
      ))}
    </div>
  )
}

/* Desk glow — warm light source with drifting particles */
function DeskGlowVisual() {
  return (
    <div className="absolute inset-0 bg-surface-deep overflow-hidden">
      {/* Warm desk lamp glow */}
      <motion.div
        className="absolute"
        style={{
          width: 200,
          height: 200,
          top: '-20%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(232,184,106,0.15) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Floating dust particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent-glow"
          style={{
            width: 2,
            height: 2,
            opacity: 0.2 + Math.random() * 0.2,
          }}
          animate={{
            x: [
              Math.random() * 300,
              Math.random() * 300,
              Math.random() * 300,
            ],
            y: [
              Math.random() * 170,
              Math.random() * 170,
              Math.random() * 170,
            ],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

/* Monitor — scrolling code-like lines (the "2am at the desk" default) */
function MonitorVisual() {
  const lines = [
    '  const companion = useCompanion()',
    '  fire("H17", { elementId: "blu" })',
    '  // this line took 3 tries',
    '  return <Reel clip={clip} />',
    '  // 2:47am. one more fix.',
    '  setActive({ text, id })',
    '  // okay that actually worked',
    '  const [idle, setIdle] = useState()',
    '  // shipping this before sleep',
    '  export default function App() {',
  ]

  return (
    <div className="absolute inset-0 bg-[#0a0d0e] overflow-hidden px-3 py-2">
      <motion.div
        animate={{ y: [0, -200] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...lines, ...lines, ...lines].map((line, i) => (
          <motion.div
            key={i}
            className="font-mono text-[9px] leading-5 whitespace-nowrap"
            style={{
              color: line.startsWith('  //')
                ? 'rgba(232,184,106,0.3)'
                : 'rgba(200,210,220,0.25)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            {line}
          </motion.div>
        ))}
      </motion.div>
      {/* Cursor blink */}
      <motion.div
        className="absolute"
        style={{
          bottom: 8,
          left: 12,
          width: 6,
          height: 12,
          backgroundColor: 'var(--visitor-color)',
        }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  )
}

/* Timer display — ticking seconds like a media player */
function TimerDisplay() {
  const [seconds, setSeconds] = useState(42)
  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return <span>{m}:{s.toString().padStart(2, '0')}</span>
}
