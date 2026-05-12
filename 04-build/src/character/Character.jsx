import { motion, AnimatePresence } from 'framer-motion'
import { useCharacter } from './CharacterContext.jsx'
import CharacterSprite from './CharacterSprite.jsx'
import CharacterBubble from './CharacterBubble.jsx'
import ReelHandoff from './ReelHandoff.jsx'

/**
 * Character — main rendered component.
 * Per character-spec.md:
 *   - Viewport-fixed (doesn't scroll with content)
 *   - Renders sprite at position from CharacterContext
 *   - Renders speech bubble above head
 *   - Renders reel via ReelHandoff when in custody
 *   - Fades in/out on section change
 *
 * Mobile: only visible during greeting, reel, and exit moments.
 * Reduced-motion: no walk animations, instant positioning.
 */
export default function Character() {
  const {
    state, position, facing, posture, charBubble,
    reelActive, reelClip, reelCarried, visible,
    activeProps,
    dismissReel,
  } = useCharacter()

  // Don't render when invisible or in 'gone' sub-phase of taking_reel
  const isGone = state === 'taking_reel' && position.x < -50 || position.x > (typeof window !== 'undefined' ? window.innerWidth + 50 : 2000)
  const showSprite = visible && !isGone && state !== 'inactive'

  // Character width for bubble positioning
  const charWidth = 22

  return (
    <>
      {/* Character sprite */}
      <AnimatePresence>
        {showSprite && (
          <motion.div
            key="character"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              left: position.x - charWidth / 2,
              top: position.y - 36,
              zIndex: 55,
              pointerEvents: 'none',
              transform: facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
              willChange: ['entering', 'wandering', 'curious', 'chased',
                'summoning_reel', 'taking_reel'].includes(state)
                ? 'transform' : 'auto',
            }}
            aria-hidden="true"
          >
            <CharacterSprite
              posture={posture}
              size={36}
              visible={true}
              props={activeProps}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speech bubble above character */}
      {showSprite && charBubble && (
        <CharacterBubble
          text={charBubble.text}
          id={charBubble.id}
          charX={position.x - charWidth / 2}
          charY={position.y - 36}
          charWidth={charWidth}
        />
      )}

      {/* Reel custody */}
      <ReelHandoff
        active={reelActive}
        clip={reelClip}
        carried={reelCarried}
        charPosition={position}
        onDismiss={dismissReel}
      />
    </>
  )
}
