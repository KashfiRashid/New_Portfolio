import { useEffect, useState } from 'react'
import { useCharacter } from '../CharacterContext.jsx'
import { getSpriteForPosture } from '../CharacterSprite.jsx'

/**
 * CharacterDebug — debug overlay for the character system.
 * Per character-spec.md §11 + patch-showcase + patch-activities + v2-pixel.
 *
 * Toggled via URL param ?debug=character
 *
 * Shows:
 *   - State, position, facing, posture
 *   - Active sprite filename + missing-sprite list (v2-pixel)
 *   - Activity + props
 *   - Bubble + reel status
 *   - Transition log
 *
 * Keyboard shortcuts:
 *   D       → toggle overlay
 *   G/W/C/H/R/I → log state intent (display only)
 *   1–5     → force one of the five activities
 *   O       → force showcase moment (uses first Work card on page)
 *   P       → toggle 2× pixel-inspection view
 *   X       → simulate full grab → thrown → running_away sequence
 */

const SHORTCUTS = {
  g: 'greeting',
  w: 'wandering',
  c: 'curious',
  h: 'chased',
  r: 'summoning_reel',
  i: 'idling',
}

const ACTIVITY_SHORTCUTS = {
  1: 'laptop_session',
  2: 'peek_reveal',
  3: 'stretch',
  4: 'contemplation',
  5: 'beverage',
}

export default function CharacterDebug() {
  const {
    state, position, facing, posture, charBubble,
    reelActive, reelCarried, debugLog, visible,
    activeActivity, activeProps,
    pixelInspect, spriteRegistry,
    swayRotation,
    forceActivity, forceShowcase, forceGrab, togglePixelInspect,
  } = useCharacter()

  const [overlayVisible, setOverlayVisible] = useState(true)

  const isDebug = typeof window !== 'undefined'
    && new URLSearchParams(window.location.search).get('debug') === 'character'

  useEffect(() => {
    if (!isDebug) return

    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      const key = e.key.toLowerCase()

      if (key === 'd') {
        setOverlayVisible(v => !v)
        return
      }

      if (SHORTCUTS[key]) {
        console.log(`[CHARACTER DEBUG] Manual trigger: ${SHORTCUTS[key]}`)
      }

      if (ACTIVITY_SHORTCUTS[key] && forceActivity) {
        forceActivity(ACTIVITY_SHORTCUTS[key])
      }

      if (key === 'o' && forceShowcase) {
        forceShowcase()
      }

      if (key === 'p' && togglePixelInspect) {
        togglePixelInspect()
      }

      if (key === 'x' && forceGrab) {
        forceGrab()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isDebug, forceActivity, forceShowcase, forceGrab, togglePixelInspect])

  if (!isDebug) return null

  const propsStr = Object.entries(activeProps || {})
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join(', ') || 'none'

  const currentSprite = getSpriteForPosture(posture)
  const missing = spriteRegistry?.missing || []
  const loaded = spriteRegistry?.loaded || []

  return (
    <>
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
            maxWidth: 320,
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
          <div>rotation: <span style={{ color: Math.abs(swayRotation || 0) > 0.5 ? '#E8B86A' : '#6B6963' }}>
            {(swayRotation || 0).toFixed(1)}°
          </span></div>
          <div>visible: {visible ? 'yes' : 'no'}</div>
          <div>bubble: {charBubble ? `"${charBubble.text.slice(0, 30)}..."` : 'none'}</div>
          <div>reel: {reelActive ? (reelCarried ? 'carried' : 'active') : 'none'}</div>

          {/* Sprite info — v2-pixel additions */}
          <div style={{ marginTop: 4, borderTop: '1px solid rgba(200,181,130,0.1)', paddingTop: 3 }}>
            <div>sprite: <span style={{ color: '#E8B86A' }}>{currentSprite}.png</span></div>
            <div>
              loaded: <span style={{ color: '#4ECDC4' }}>
                {loaded.length ? loaded.join(', ') : 'none yet'}
              </span>
            </div>
            <div>
              missing: <span style={{ color: missing.length ? '#FF6B6B' : '#6B6963' }}>
                {missing.length ? missing.join(', ') : 'none'}
              </span>
            </div>
            <div>pixel inspect (2×): {pixelInspect ? 'on' : 'off'}</div>
          </div>

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
          <div style={{ color: '#6B6963', fontSize: 9 }}>
            Visual: O=showcase P=pixel-2x
          </div>
          <div style={{ color: '#6B6963', fontSize: 9 }}>
            Grab: X=simulate-grab
          </div>
        </div>
      )}

      {overlayVisible && <PerchDots />}
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
