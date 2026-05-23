import { useEffect, useState } from 'react'
import { useCharacter } from '../CharacterContext.jsx'
import { getSpriteForPosture } from '../CharacterSprite.jsx'

/**
 * CharacterDebug - live debug panel for the character system.
 *
 * Armed when: running in dev (import.meta.env.DEV), OR the URL carries
 * ?debug=character (so a deployed build can still be inspected on demand).
 *
 * Toggle the panel with the `9` key - press to open, press 9 again to close.
 *
 * Shows: state, position, facing, posture, the resolved sprite + current
 * walk frame, the sprite load/missing registry, activity + props, bubble
 * and reel status, live FPS / frame-time, and the recent transition log.
 *
 * Extra shortcuts (while armed):
 *   1-5  force an activity (laptop / peek / stretch / contemplate / beverage)
 *   O    force a showcase moment (uses the first Work card on the page)
 *   P    toggle 2x pixel-inspection
 *   X    simulate a full grab -> thrown -> running_away sequence
 */

const ACTIVITY_SHORTCUTS = {
  1: 'laptop_session',
  2: 'peek_reveal',
  3: 'stretch',
  4: 'contemplation',
  5: 'beverage',
}

// posture -> the sprite frame the walk cycle is showing right now
const WALK_FRAME = { walking1: 'walk-a', walking2: 'walk-b', running: 'walk-a' }

function isArmed() {
  if (typeof window === 'undefined') return false
  if (import.meta.env.DEV) return true
  return new URLSearchParams(window.location.search).get('debug') === 'character'
}

function Row({ label, value, color }) {
  return (
    <div>
      {label}: <span style={{ color: color || '#E8E6E1' }}>{value}</span>
    </div>
  )
}

export default function CharacterDebug() {
  const {
    state, position, facing, posture, charBubble,
    reelActive, reelCarried, debugLog, visible,
    activeActivity, activeProps,
    pixelInspect, spriteRegistry, swayRotation,
    forceActivity, forceShowcase, forceGrab, togglePixelInspect,
  } = useCharacter()

  const armed = isArmed()
  const [open, setOpen] = useState(false)
  const [perf, setPerf] = useState({ fps: 0, ms: 0 })

  // Key handling - `9` toggles the panel; the rest are armed shortcuts.
  useEffect(() => {
    if (!armed) return undefined
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      const key = e.key.toLowerCase()
      if (key === '9') { setOpen((v) => !v); return }
      if (ACTIVITY_SHORTCUTS[key] && forceActivity) forceActivity(ACTIVITY_SHORTCUTS[key])
      if (key === 'o' && forceShowcase) forceShowcase()
      if (key === 'p' && togglePixelInspect) togglePixelInspect()
      if (key === 'x' && forceGrab) forceGrab()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [armed, forceActivity, forceShowcase, forceGrab, togglePixelInspect])

  // Live FPS / frame-time meter - only runs while the panel is open.
  useEffect(() => {
    if (!open) return undefined
    let raf = 0
    let last = performance.now()
    let frames = 0
    let acc = 0
    const tick = (now) => {
      const dt = now - last
      last = now
      frames += 1
      acc += dt
      if (acc >= 500) {
        setPerf({
          fps: Math.round((frames * 1000) / acc),
          ms: Number((acc / frames).toFixed(1)),
        })
        frames = 0
        acc = 0
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [open])

  if (!armed || !open) return null

  const propsStr = Object.entries(activeProps || {})
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join(', ') || 'none'
  const currentSprite = getSpriteForPosture(posture)
  const missing = spriteRegistry?.missing || []
  const loaded = spriteRegistry?.loaded || []
  const walkFrame = WALK_FRAME[posture] || '-'
  const spriteMissing = missing.includes(currentSprite)

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 8,
          left: 8,
          zIndex: 100,
          background: 'rgba(15, 17, 18, 0.94)',
          border: '1px solid rgba(200, 181, 130, 0.35)',
          borderRadius: 6,
          padding: '10px 13px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: '#E8E6E1',
          lineHeight: 1.55,
          width: 300,
          pointerEvents: 'none',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            color: '#c8b582',
            fontWeight: 600,
            marginBottom: 5,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>CHARACTER DEBUG</span>
          <span style={{ color: '#6B6963', fontWeight: 400 }}>press 9 to close</span>
        </div>

        <Row label="state" value={state} color="#4ECDC4" />
        <Row label="pos" value={`(${position.x.toFixed(0)}, ${position.y.toFixed(0)})`} />
        <Row label="facing" value={facing} />
        <Row label="posture" value={posture} />
        <Row
          label="rotation"
          value={`${(swayRotation || 0).toFixed(1)} deg`}
          color={Math.abs(swayRotation || 0) > 0.5 ? '#E8B86A' : '#6B6963'}
        />
        <Row label="visible" value={visible ? 'yes' : 'no'} />
        <Row label="bubble" value={charBubble ? `"${charBubble.text.slice(0, 26)}"` : 'none'} />
        <Row label="reel" value={reelActive ? (reelCarried ? 'carried' : 'active') : 'none'} />

        <div style={{ marginTop: 5, borderTop: '1px solid rgba(200,181,130,0.12)', paddingTop: 4 }}>
          <Row
            label="sprite"
            value={`${currentSprite}.png`}
            color={spriteMissing ? '#FF6B6B' : '#E8B86A'}
          />
          <Row
            label="walk frame"
            value={walkFrame}
            color={walkFrame === '-' ? '#6B6963' : '#4ECDC4'}
          />
          <Row
            label="loaded"
            value={loaded.length ? loaded.join(', ') : 'none yet'}
            color="#4ECDC4"
          />
          <Row
            label="missing"
            value={missing.length ? missing.join(', ') : 'none'}
            color={missing.length ? '#FF6B6B' : '#6B6963'}
          />
          <Row label="pixel 2x" value={pixelInspect ? 'on' : 'off'} />
        </div>

        <div style={{ marginTop: 5, borderTop: '1px solid rgba(200,181,130,0.12)', paddingTop: 4 }}>
          <Row
            label="activity"
            value={activeActivity || 'none'}
            color={activeActivity ? '#E8B86A' : '#6B6963'}
          />
          <Row label="props" value={propsStr} />
        </div>

        <div style={{ marginTop: 5, borderTop: '1px solid rgba(200,181,130,0.12)', paddingTop: 4 }}>
          <Row
            label="fps"
            value={perf.fps}
            color={perf.fps >= 50 ? '#4ECDC4' : perf.fps >= 30 ? '#E8B86A' : '#FF6B6B'}
          />
          <Row label="frame" value={`${perf.ms} ms`} />
        </div>

        <div style={{ marginTop: 6, borderTop: '1px solid rgba(200,181,130,0.18)', paddingTop: 4 }}>
          <div style={{ color: '#c8b582', fontSize: 9 }}>TRANSITION LOG</div>
          {debugLog.slice(-7).map((entry, i) => (
            <div key={i} style={{ color: '#9C9A95', fontSize: 9 }}>{entry}</div>
          ))}
        </div>

        <div
          style={{
            marginTop: 6,
            borderTop: '1px solid rgba(200,181,130,0.18)',
            paddingTop: 4,
            color: '#6B6963',
            fontSize: 9,
          }}
        >
          1-5 activities . O showcase . P pixel-2x . X grab
        </div>
      </div>

      {/* Position marker - a small dot at the character's feet. */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: position.x - 3,
          top: position.y - 3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#4ECDC4',
          opacity: 0.7,
          zIndex: 99,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
