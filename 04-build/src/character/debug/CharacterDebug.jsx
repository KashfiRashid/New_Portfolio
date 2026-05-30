import { useEffect, useRef, useState } from 'react'
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
 * Panel sections:
 *   STATE     - state machine, position, facing, posture, rotation, bubble
 *   SPRITE    - resolved sprite + a live preview thumbnail, load/missing tally
 *   WALK      - live walk-frame (a/b) indicator, per-frame counters, velocity.
 *               This is the section for diagnosing the walk glitch: if only
 *               walk-a ever lights up, the alternation is broken.
 *   ACTIVITY  - current activity + props
 *   PERF      - live FPS / frame-time
 *   LOG       - recent state transitions
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
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
      <span style={{ color: '#6B6963' }}>{label}</span>
      <span style={{ color: color || '#E8E6E1', textAlign: 'right' }}>{value}</span>
    </div>
  )
}

function Divider() {
  return (
    <div
      style={{
        borderTop: '1px solid rgba(200,181,130,0.14)',
        margin: '6px 0 4px',
      }}
    />
  )
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        color: '#c8b582',
        fontSize: 9,
        letterSpacing: 0.5,
        marginBottom: 2,
      }}
    >
      {children}
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
  const [walkStats, setWalkStats] = useState({ a: 0, b: 0 })
  const [velocity, setVelocity] = useState(0)

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

  // Walk-frame tally - counts each distinct walk-a / walk-b frame the state
  // machine commits. On a healthy walk these climb together; if the walk is
  // glitched ("only walk-a"), `b` stays at 0 and the bug is visible at a
  // glance. Runs whether the panel is open or not.
  const lastWalkPostureRef = useRef(null)
  useEffect(() => {
    const frame = WALK_FRAME[posture]
    if (!frame) { lastWalkPostureRef.current = null; return }
    if (lastWalkPostureRef.current === posture) return
    lastWalkPostureRef.current = posture
    setWalkStats((s) => ({
      a: s.a + (frame === 'walk-a' ? 1 : 0),
      b: s.b + (frame === 'walk-b' ? 1 : 0),
    }))
  }, [posture])

  // Character velocity (px/s) - sampled off position changes.
  const posTrackRef = useRef({ x: position.x, y: position.y, t: performance.now() })
  useEffect(() => {
    const now = performance.now()
    const prev = posTrackRef.current
    const dt = (now - prev.t) / 1000
    if (dt > 0.001) {
      const d = Math.hypot(position.x - prev.x, position.y - prev.y)
      setVelocity(d / dt)
    }
    posTrackRef.current = { x: position.x, y: position.y, t: now }
  }, [position.x, position.y])

  if (!armed || !open) return null

  const propsStr = Object.entries(activeProps || {})
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join(', ') || 'none'
  const currentSprite = getSpriteForPosture(posture)
  const missing = spriteRegistry?.missing || []
  const loaded = spriteRegistry?.loaded || []
  const walkFrame = WALK_FRAME[posture] || null
  const isWalking = walkFrame !== null
  const spriteMissing = missing.includes(currentSprite)
  const walkALoaded = loaded.includes('walk-a')
  const walkBLoaded = loaded.includes('walk-b')
  const walkGlitch = walkStats.a > 2 && walkStats.b === 0

  const frameChip = (name, active, loadedOk) => (
    <span
      style={{
        flex: 1,
        textAlign: 'center',
        padding: '4px 0',
        borderRadius: 4,
        fontSize: 9,
        fontWeight: 600,
        background: active ? 'rgba(78,205,196,0.22)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${active ? '#4ECDC4' : 'rgba(255,255,255,0.08)'}`,
        color: active ? '#4ECDC4' : loadedOk ? '#6B6963' : '#FF6B6B',
      }}
    >
      {name}{loadedOk ? '' : ' !'}
    </span>
  )

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 8,
          left: 8,
          zIndex: 100,
          background: 'rgba(15, 17, 18, 0.95)',
          border: '1px solid rgba(200, 181, 130, 0.35)',
          borderRadius: 6,
          padding: '10px 13px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: '#E8E6E1',
          lineHeight: 1.5,
          width: 286,
          maxHeight: '92vh',
          overflowY: 'auto',
          // Click-through HUD - the panel must NOT capture mouse events, or
          // it blocks grabbing the character anywhere beneath it. Only the
          // interactive bits below re-enable pointer events on themselves.
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
          <span style={{ color: '#6B6963', fontWeight: 400 }}>9 to close</span>
        </div>

        <SectionLabel>STATE</SectionLabel>
        <Row label="state" value={state} color="#4ECDC4" />
        <Row label="pos" value={`${position.x.toFixed(0)}, ${position.y.toFixed(0)}`} />
        <Row label="facing" value={facing} />
        <Row label="posture" value={posture} />
        <Row
          label="rotation"
          value={`${(swayRotation || 0).toFixed(1)} deg`}
          color={Math.abs(swayRotation || 0) > 0.5 ? '#E8B86A' : '#6B6963'}
        />
        <Row label="visible" value={visible ? 'yes' : 'no'} />
        <Row
          label="bubble"
          value={charBubble ? `"${charBubble.text.slice(0, 22)}"` : 'none'}
        />
        <Row
          label="reel"
          value={reelActive ? (reelCarried ? 'carried' : 'active') : 'none'}
        />

        <Divider />
        <SectionLabel>SPRITE</SectionLabel>
        <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
          <div
            style={{
              width: 46,
              height: 46,
              flexShrink: 0,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(200,181,130,0.2)',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={`/character/${spriteMissing ? 'idle' : currentSprite}.png`}
              alt=""
              width={38}
              height={38}
              style={{ imageRendering: 'pixelated', display: 'block' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Row
              label="sprite"
              value={`${currentSprite}.png`}
              color={spriteMissing ? '#FF6B6B' : '#E8B86A'}
            />
            <Row label="loaded" value={`${loaded.length} sprites`} color="#4ECDC4" />
            <Row
              label="missing"
              value={missing.length ? missing.join(',') : 'none'}
              color={missing.length ? '#FF6B6B' : '#6B6963'}
            />
            <Row label="pixel 2x" value={pixelInspect ? 'on' : 'off'} />
          </div>
        </div>

        <Divider />
        <SectionLabel>WALK / MOVEMENT</SectionLabel>
        <div style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
          {frameChip('walk-a', walkFrame === 'walk-a', walkALoaded)}
          {frameChip('walk-b', walkFrame === 'walk-b', walkBLoaded)}
        </div>
        <Row
          label="walk frame"
          value={isWalking ? walkFrame : 'not walking'}
          color={isWalking ? '#4ECDC4' : '#6B6963'}
        />
        <Row
          label="frames a / b"
          value={`${walkStats.a} / ${walkStats.b}`}
          color={walkGlitch ? '#FF6B6B' : '#E8E6E1'}
        />
        <Row
          label="velocity"
          value={`${velocity.toFixed(0)} px/s`}
          color={velocity > 1 ? '#4ECDC4' : '#6B6963'}
        />
        <Row
          label="walk-b ready"
          value={walkBLoaded ? 'yes' : 'loading'}
          color={walkBLoaded ? '#4ECDC4' : '#E8B86A'}
        />
        {walkGlitch && (
          <div style={{ color: '#FF6B6B', fontSize: 9, marginTop: 2 }}>
            walk-b never shown &#x2014; alternation broken
          </div>
        )}
        <div
          onClick={() => setWalkStats({ a: 0, b: 0 })}
          style={{ marginTop: 3, fontSize: 9, color: '#6B6963', cursor: 'pointer', pointerEvents: 'auto' }}
        >
          [reset tally]
        </div>

        <Divider />
        <SectionLabel>ACTIVITY</SectionLabel>
        <Row
          label="activity"
          value={activeActivity || 'none'}
          color={activeActivity ? '#E8B86A' : '#6B6963'}
        />
        <Row label="props" value={propsStr} />

        <Divider />
        <SectionLabel>PERF</SectionLabel>
        <Row
          label="fps"
          value={perf.fps}
          color={perf.fps >= 50 ? '#4ECDC4' : perf.fps >= 30 ? '#E8B86A' : '#FF6B6B'}
        />
        <Row label="frame" value={`${perf.ms} ms`} />

        <Divider />
        <SectionLabel>TRANSITION LOG</SectionLabel>
        {debugLog.length === 0 && (
          <div style={{ color: '#6B6963', fontSize: 9 }}>no transitions yet</div>
        )}
        {debugLog.slice(-7).map((entry, i) => (
          <div key={i} style={{ color: '#9C9A95', fontSize: 9 }}>{entry}</div>
        ))}

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
