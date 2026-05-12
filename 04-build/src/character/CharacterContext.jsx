import {
  createContext, useContext, useCallback, useEffect,
  useMemo, useRef, useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import ALL_STATES from './states.js'
import { getPerches, sectionFromPath } from './perches.js'

/**
 * CharacterContext — state machine + context provider.
 * Per character-spec.md Sections 3–6, 8–10.
 *
 * Owns: state machine (11 states), position, facing, posture,
 *       idle speech, reel custody, debug info.
 *
 * The rAF loop calls the active state's tick() each frame.
 * Speaking is overlaid — any state can have a bubble.
 *
 * Spawn timing (per Kash's answers):
 *   - First-time visitor: enters after onboarding completes
 *   - Returning visitor: 2s delay after page load
 *
 * Chase cap: unlimited for v1.
 */

const CharacterContext = createContext(null)

/* ── Speeds & constants ────────────────────────────────────────────── */
const CHASE_SPEED_THRESHOLD = 600 // px/s
const CHASE_DISTANCE_THRESHOLD = 150 // px
const BUBBLE_DURATION = 5000 // ms
const STUCK_GUARD_SECONDS = 60

/* ── Reduced-motion check ──────────────────────────────────────────── */
function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ── Mobile check ──────────────────────────────────────────────────── */
function isMobileViewport() {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

export function CharacterProvider({ children, identity, isReturning, onboardingDone }) {
  /* ── React state (triggers re-renders for the UI) ──────────────── */
  const [state, setState] = useState('inactive') // 'inactive' until spawn
  const [position, setPositionState] = useState({ x: -100, y: -100 })
  const [facing, setFacingState] = useState('right')
  const [posture, setPostureState] = useState('standing')
  const [charBubble, setCharBubble] = useState(null) // { text, id }
  const [reelActive, setReelActive] = useState(false)
  const [reelClip, setReelClip] = useState(null)
  const [reelCarried, setReelCarried] = useState(false)
  const [visible, setVisible] = useState(false)
  const [debugLog, setDebugLog] = useState([])
  const [activeActivity, setActiveActivity] = useState(null) // current activity name
  const [activeProps, setActiveProps] = useState({})         // { laptop: bool, mug: bool }

  const location = useLocation()
  const section = sectionFromPath(location.pathname)

  /* ── Refs (mutable, no re-renders) ─────────────────────────────── */
  const rafRef = useRef(null)
  const lastTimeRef = useRef(0)
  const stateModuleRef = useRef(null)
  const reelShownRef = useRef(false)
  const bubbleTimerRef = useRef(null)
  const spawnedRef = useRef(false)
  const pausedRef = useRef(false)
  const isMobileRef = useRef(isMobileViewport())
  const reducedMotionRef = useRef(prefersReducedMotion())

  // Cursor tracking
  const cursorPosRef = useRef({ x: 400, y: 300 })
  const cursorSpeedRef = useRef(0)
  const prevCursorRef = useRef({ x: 400, y: 300, time: 0 })
  const cursorMovingTowardRef = useRef(false)

  // Idle tracking (set externally by App.jsx)
  const isIdleRef = useRef(false)
  const idleDurationRef = useRef(0)
  const idleStartRef = useRef(0)

  // Reel tracking
  const reelFinishedRef = useRef(false)
  const pendingReelClipRef = useRef(null)

  // Viewport
  const viewportRef = useRef({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  })

  // Perches (recalculated on section/resize change)
  const perchesRef = useRef([])

  // The mutable context object shared with state tick functions
  const ctxRef = useRef({
    position: { x: -100, y: -100 },
    facing: 'right',
    posture: 'standing',
    activeProps: {},
    cursorPos: { x: 400, y: 300 },
    cursorSpeed: 0,
    cursorMovingToward: false,
    viewport: viewportRef.current,
    perches: [],
    elapsed: 0,
    isIdle: false,
    idleDuration: 0,
    reelShown: false,
    reelFinished: false,
    reelCarried: false,
    stateData: {},
    // Methods filled below
    speakIdle: () => {},
    triggerReel: () => {},
    dismissReel: () => {},
    setReelShown: () => {},
  })

  /* ── Recalculate perches on section/resize ──────────────────────── */
  useEffect(() => {
    const recalc = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      viewportRef.current = { width: vw, height: vh }
      perchesRef.current = getPerches(section, vw, vh)
      ctxRef.current.viewport = viewportRef.current
      ctxRef.current.perches = perchesRef.current
      isMobileRef.current = isMobileViewport()
    }
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [section])

  /* ── Cursor tracking ────────────────────────────────────────────── */
  useEffect(() => {
    const handleMove = (e) => {
      const now = performance.now()
      const prev = prevCursorRef.current
      const dt = (now - prev.time) / 1000
      if (dt > 0.01) {
        const dx = e.clientX - prev.x
        const dy = e.clientY - prev.y
        cursorSpeedRef.current = Math.hypot(dx, dy) / dt

        // Check if cursor is moving toward character
        const charPos = ctxRef.current.position
        const toChar = { x: charPos.x - e.clientX, y: charPos.y - e.clientY }
        const dot = dx * toChar.x + dy * toChar.y
        cursorMovingTowardRef.current = dot > 0

        prevCursorRef.current = { x: e.clientX, y: e.clientY, time: now }
      }
      cursorPosRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  /* ── Tab visibility pause ───────────────────────────────────────── */
  useEffect(() => {
    const handler = () => {
      pausedRef.current = document.hidden
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [])

  /* ── Idle speech ────────────────────────────────────────────────── */
  const speakIdle = useCallback((text) => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current)
    const id = `char-${Date.now()}`
    setCharBubble({ text, id })
    bubbleTimerRef.current = setTimeout(() => setCharBubble(null), BUBBLE_DURATION)
  }, [])

  /* ── Reel controls ──────────────────────────────────────────────── */
  const triggerReel = useCallback(() => {
    const clip = pendingReelClipRef.current
    setReelActive(true)
    setReelClip(clip)
    setReelCarried(false)
    reelFinishedRef.current = false
  }, [])

  const dismissReel = useCallback(() => {
    setReelActive(false)
    setReelClip(null)
    setReelCarried(false)
    reelFinishedRef.current = true
  }, [])

  const markReelShown = useCallback(() => {
    reelShownRef.current = true
  }, [])

  /* ── Transition function ────────────────────────────────────────── */
  const transition = useCallback((nextStateName) => {
    const nextModule = ALL_STATES[nextStateName]
    if (!nextModule) {
      console.warn(`[CHARACTER] Unknown state: ${nextStateName}`)
      return
    }

    const prevName = stateModuleRef.current?.name || 'inactive'

    // Exit current state
    if (stateModuleRef.current?.exit) {
      stateModuleRef.current.exit(ctxRef.current)
    }

    // Setup context for new state
    ctxRef.current.elapsed = 0
    ctxRef.current.stateData = ctxRef.current.stateData || {}

    // Enter new state
    stateModuleRef.current = nextModule
    nextModule.enter(ctxRef.current)

    // Sync React state
    setState(nextStateName)
    setPositionState({ ...ctxRef.current.position })
    setFacingState(ctxRef.current.facing)
    setPostureState(ctxRef.current.posture)

    // Debug log
    const entry = `${prevName} → ${nextStateName}`
    console.log(`[CHARACTER] ${entry}`)
    setDebugLog(prev => [...prev.slice(-19), entry])
  }, [])

  /* ── Spawn logic ────────────────────────────────────────────────── */
  useEffect(() => {
    if (spawnedRef.current) return
    if (!identity) return

    const spawn = () => {
      spawnedRef.current = true
      setVisible(true)

      // For reduced motion, skip entering — appear at perch
      if (reducedMotionRef.current) {
        const perches = perchesRef.current
        if (perches.length > 0) {
          const perch = perches[perches.length - 1]
          ctxRef.current.position.x = perch.x
          ctxRef.current.position.y = perch.y
        }
        transition('greeting')
      } else {
        transition('entering')
      }
    }

    if (!onboardingDone && !isReturning) {
      // First-time: wait for onboarding to complete
      // This effect will re-run when onboardingDone flips to true
      return
    }

    if (isReturning) {
      // Returning visitor: 2s delay
      const t = setTimeout(spawn, 2000)
      return () => clearTimeout(t)
    }

    // Onboarding just completed
    if (onboardingDone) {
      const t = setTimeout(spawn, 400) // brief pause after modal closes
      return () => clearTimeout(t)
    }
  }, [identity, isReturning, onboardingDone, transition])

  /* ── Wire ctx methods ───────────────────────────────────────────── */
  useEffect(() => {
    ctxRef.current.speakIdle = speakIdle
    ctxRef.current.triggerReel = triggerReel
    ctxRef.current.dismissReel = dismissReel
    ctxRef.current.setReelShown = markReelShown
  }, [speakIdle, triggerReel, dismissReel, markReelShown])

  /* ── Main rAF loop ──────────────────────────────────────────────── */
  useEffect(() => {
    if (!visible) return

    lastTimeRef.current = performance.now()

    const loop = (time) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1) // cap dt
      lastTimeRef.current = time

      if (pausedRef.current || !stateModuleRef.current) {
        rafRef.current = requestAnimationFrame(loop)
        return
      }

      // Sync mutable ctx
      const ctx = ctxRef.current
      ctx.cursorPos = cursorPosRef.current
      ctx.cursorSpeed = cursorSpeedRef.current
      ctx.cursorMovingToward = cursorMovingTowardRef.current
      ctx.isIdle = isIdleRef.current
      ctx.idleDuration = isIdleRef.current
        ? (performance.now() - idleStartRef.current) / 1000
        : 0
      ctx.reelShown = reelShownRef.current
      ctx.reelFinished = reelFinishedRef.current
      ctx.elapsed += dt

      const currentState = stateModuleRef.current.name

      // ── Global chase detection ──
      const chasableStates = ['idling', 'wandering', 'curious']
      if (chasableStates.includes(currentState)) {
        const dist = Math.hypot(
          ctx.position.x - ctx.cursorPos.x,
          ctx.position.y - ctx.cursorPos.y
        )
        if (
          ctx.cursorSpeed > CHASE_SPEED_THRESHOLD &&
          dist < CHASE_DISTANCE_THRESHOLD &&
          ctx.cursorMovingToward
        ) {
          transition('chased')
          rafRef.current = requestAnimationFrame(loop)
          return
        }
      }

      // ── Stuck guard ──
      if (ctx.elapsed > STUCK_GUARD_SECONDS && currentState !== 'inactive') {
        console.warn(`[CHARACTER] Stuck guard: ${currentState} for ${ctx.elapsed.toFixed(0)}s`)
        transition('idling')
        rafRef.current = requestAnimationFrame(loop)
        return
      }

      // ── State tick ──
      const nextState = stateModuleRef.current.tick(ctx, dt)
      if (nextState) {
        transition(nextState)
      }

      // ── Sync React state (throttled — every 2 frames is fine visually) ──
      setPositionState({ x: ctx.position.x, y: ctx.position.y })
      setFacingState(ctx.facing)
      setPostureState(ctx.posture)
      if (ctx.reelCarried !== undefined) {
        setReelCarried(ctx.reelCarried)
      }
      // Sync activity state
      setActiveActivity(ctx.stateData?.activeActivity?.name || null)
      setActiveProps(ctx.activeProps || {})

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [visible, transition])

  /* ── Section change: fade out and reposition ────────────────────── */
  const prevSectionRef = useRef(section)
  useEffect(() => {
    if (!visible || !spawnedRef.current) return
    if (prevSectionRef.current === section) return
    prevSectionRef.current = section

    // Recalculate perches then reposition
    const perches = perchesRef.current
    if (perches.length > 0) {
      const perch = perches[Math.floor(Math.random() * perches.length)]
      ctxRef.current.position.x = perch.x
      ctxRef.current.position.y = perch.y
      ctxRef.current.stateData.currentPerchId = perch.id
    }

    // Clear any active bubble
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current)
    setCharBubble(null)

    // Reset to idling
    if (stateModuleRef.current && stateModuleRef.current.name !== 'inactive') {
      transition('idling')
    }
  }, [section, visible, transition])

  /* ── External API ───────────────────────────────────────────────── */

  /** Called by CompanionContext when a section bubble fires */
  const speakBubble = useCallback((text, id) => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current)
    setCharBubble({ text, id })
    bubbleTimerRef.current = setTimeout(() => setCharBubble(null), BUBBLE_DURATION)
  }, [])

  /** Called by App.jsx idle detection */
  const handleIdleContent = useCallback((content) => {
    if (!content) return
    if (content.type === 'reel') {
      pendingReelClipRef.current = content.clip || null
      // Character will transition to summoning_reel on next tick
      // (idling/wandering states check ctx.isIdle)
    } else {
      // Quip or fact — speak it
      speakIdle(content.text)
    }
  }, [speakIdle])

  /** Called by idle detection in App.jsx */
  const setIdleState = useCallback((idle) => {
    isIdleRef.current = idle
    if (idle) {
      idleStartRef.current = performance.now()
    }
    idleDurationRef.current = 0
  }, [])

  /** Get character position for distance gating */
  const getPosition = useCallback(() => {
    return ctxRef.current.position
  }, [])

  /** Force a specific activity (debug only) */
  const forceActivity = useCallback((activityName) => {
    const ctx = ctxRef.current
    if (stateModuleRef.current?.name !== 'idling') {
      // Force to idling first
      transition('idling')
    }
    // Set up the activity directly in stateData
    const activityMap = {
      laptop_session: { name: 'laptop_session', duration: 12 },
      peek_reveal: { name: 'peek_reveal', duration: 4 },
      stretch: { name: 'stretch', duration: 2 },
      contemplation: { name: 'contemplation', duration: 6 },
      beverage: { name: 'beverage', duration: 5 },
    }
    const activity = activityMap[activityName]
    if (!activity) return
    // End any current activity
    ctx.stateData.activeActivity = activity
    ctx.stateData.activityElapsed = 0
    // Apply posture + props
    const postureMap = {
      laptop_session: ['laptop_open', { laptop: true }],
      peek_reveal: ['peeking', {}],
      stretch: ['stretching', {}],
      contemplation: ['contemplating', {}],
      beverage: ['holding_mug', { mug: true }],
    }
    const [postureName, props] = postureMap[activityName]
    ctx.posture = postureName
    ctx.activeProps = props
    console.log(`[CHARACTER DEBUG] Forced activity: ${activityName}`)
  }, [transition])

  const value = useMemo(() => ({
    state,
    position,
    facing,
    posture,
    charBubble,
    reelActive,
    reelClip,
    reelCarried,
    visible,
    debugLog,
    activeActivity,
    activeProps,
    speakBubble,
    handleIdleContent,
    setIdleState,
    getPosition,
    dismissReel,
    forceActivity,
    reelShown: reelShownRef.current,
  }), [
    state, position, facing, posture, charBubble,
    reelActive, reelClip, reelCarried, visible, debugLog,
    activeActivity, activeProps,
    speakBubble, handleIdleContent, setIdleState, getPosition, dismissReel,
    forceActivity,
  ])

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacter() {
  const ctx = useContext(CharacterContext)
  if (!ctx) {
    throw new Error('useCharacter must be used inside <CharacterProvider>')
  }
  return ctx
}
