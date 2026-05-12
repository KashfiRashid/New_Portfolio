import { useEffect, useState } from 'react'
import { useCharacter } from '../CharacterContext.jsx'

/**
 * CharacterDebug — debug overlay for the character system.
 * Per character-spec.md Section 11 + patch-activities.md.
 *
 * Toggled via URL param ?debug=character
 *
 * Shows:
 *   - Corner overlay: state, position, facing, posture, bubble status, activity
 *   - Perch visualization: colored dots at perch positions
 *   - Console logging (state transitions logged in CharacterContext)
 *   - Keyboard shortcuts to force state transitions + activities
 */

const SHORTCUTS = {
  'g': 'greeting',
  'w': 'wandering',
  'c': 'curious',
  'h': 'chased',
  'r': 'summoning_reel',
  'i': 'idling',
}

const ACTIVITY_SHORTCUTS = {
  '1': 'laptop_session',
  '2': 'peek_reveal',
  '3': 'stretch',
  '4': 'contemplation',
  '5': 'beverage',
}

export default function CharacterDebug() {
  const {
    state, position, facing, posture, charBubble,
    reelActive, reelCarried, debugLog, visible,
    activeActivity, activeProps,
    forceActivity,
  } = useCharacter()

  const [overlayVisible, setOverlayVisible] = useState(true)

  // Check if debug mode is enabled via URL param
  const isDebug = typeof window !== 'undefined'
    && new URLSearchParams(window.location.search).get('debug') === 'character'

  // Keyboard shortcuts
  useEffect(() => {
    if (!isDebug) return

    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      const key = e.key.toLowerCase()

      if (key === 'd') {
        setOverlayVisible(v => !v)
        return
      }

      // State shortcuts
      if (SHORTCUTS[key]) {
        console.log(`[CHARACTER DEBUG] Manual trigger: ${SHORTCUTS[key]}`)
      }

      // Activity shortcuts (1-5)
      if (ACTIVITY_SHORTCUTS[key] && forceActivity) {
        forceActivity(ACTIVITY_SHORTCUTS[key])
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isDebug, forceActivity])

  if (!isDebug) return null

  // Format active props for display
  const propsStr = Object.entries(activeProps || {})
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join(', ') || 'none'

  return (
    <>
      {/* State overlay — top-left corner */}
      {overlayVisible && (
        <div
          style={{
            position: 'fixed',
            top: 8,
            left: 8,
            zIndex: 100,
            background: 'rgba(15, 17, 18, 0.92)',
            border: '1px solid rgba(200, 181, 130, 0.3)',
            borderRadius: 4,
            padding: '8px 12px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color: '#E8E6E1',
            lineHeight: 1.5,
            maxWidth: 280,
            pointerEvents: 'none',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{ color: '#c8b582', fontWeight: 600, marginBottom: 4 }}>
            CHARACTER DEBUG
          </div>
          <div>state: <span style={{ color: '#4ECDC4' }}>{state}</span></div>
          <div>pos: ({position.x.toFixed(0)}, {position.y.toFixed(0)})</div>
          <div>facing: {facing}</div>
          <div>posture: {posture}</div>
          <div>visible: {visible ? 'yes' : 'no'}</div>
          <div>bubble: {charBubble ? `"${charBubble.text.slice(0, 30)}..."` : 'none'}</div>
          <div>reel: {reelActive ? (reelCarried ? 'carried' : 'active') : 'none'}</div>

          {/* Activity info */}
          <div style={{ marginTop: 4, borderTop: '1px solid rgba(200,181,130,0.1)', paddingTop: 3 }}>
            <div>activity: <span style={{ color: activeActivity ? '#E8B86A' : '#6B6963' }}>
              {activeActivity || 'none'}
            </span></div>
            <div>props: {propsStr}</div>
          </div>

          <div style={{ marginTop: 6, borderTop: '1px solid rgba(200,181,130,0.15)', paddingTop: 4 }}>
            <div style={{ color: '#c8b582', fontSize: 9 }}>TRANSITION LOG</div>
            {debugLog.slice(-6).map((entry, i) => (
              <div key={i} style={{ color: '#9C9A95', fontSize: 9 }}>{entry}</div>
            ))}
          </div>

          <div style={{ marginTop: 6, borderTop: '1px solid rgba(200,181,130,0.15)', paddingTop: 4, color: '#6B6963', fontSize: 9 }}>
            States: G=greet W=wander C=curious H=chase R=reel I=idle D=toggle
          </div>
          <div style={{ color: '#6B6963', fontSize: 9 }}>
            Activities: 1=laptop 2=peek 3=stretch 4=contemplate 5=beverage
          </div>
        </div>
      )}

      {/* Perch visualization — small dots */}
      {overlayVisible && (
        <PerchDots />
      )}
    </>
  )
}

function PerchDots() {
  const { position } = useCharacter()

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x - 3,
        top: position.y - 3,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#4ECDC4',
        opacity: 0.6,
        zIndex: 99,
        pointerEvents: 'none',
      }}
    />
  )
}
