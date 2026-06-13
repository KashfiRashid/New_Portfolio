import { lazy, memo, Suspense, useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { useVisitorIdentity } from './hooks/useVisitorIdentity.js'
import { useIdleDetection } from './hooks/useIdleDetection.js'
import { useExitIntent } from './hooks/useExitIntent.js'

import { getNextIdleContent } from './companion/idlePool.js'

import { CharacterProvider, useCharacter } from './character/CharacterContext.jsx'
import { CompanionProvider, useCompanion } from './companion/CompanionContext.jsx'
import Companion from './companion/Companion.jsx'

import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import SiteNav from './components/SiteNav.jsx'
import GridBackground from './components/GridBackground.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// Route pages are code-split: each is its own lazy() chunk, fetched only
// when its route is first visited. This pulls all 9 pages - plus every case
// study (see pages/projects.js) - out of the initial bundle. <Suspense>
// inside AppRoutes covers the load.
const Home = lazy(() => import('./sections/Home.jsx'))
const Work = lazy(() => import('./sections/Work.jsx'))
const About = lazy(() => import('./pages/about/AboutPage.jsx'))
const Arcade = lazy(() => import('./sections/Arcade.jsx'))
import PageGuide from './companion/PageGuide.jsx'

// Case studies are routed through one shared route, /projects/:slug, which
// reads the project registry (pages/projects.js) and renders the matching
// case study component. ProjectRoute is itself a lazy chunk, and each case
// study inside the registry is lazy too - see pages/projects.js.
const ProjectRoute = lazy(() => import('./pages/ProjectRoute.jsx'))

/**
 * App - top-level shell.
 *
 * Composition order:
 *   1. useVisitorIdentity (hook) - hydrates from localStorage
 *   2. CharacterProvider - provides autonomous character state machine
 *   3. CompanionProvider - provides fire() to all children (reads character for distance gating)
 *   4. <AppShell /> - runs companion-aware effects (returning visitor, idle, exit-intent)
 *
 * Spawn timing (per character-spec answers):
 *   - First-time visitor: character enters after onboarding completes
 *   - Returning visitor: 2s delay after page load
 *
 * The visitor's color is published as a CSS variable (--visitor-color) so
 * selection / cursor / accent borders can pick it up site-wide.
 */
export default function App() {
  const { identity, isLoaded, isReturning, reset } = useVisitorIdentity()
  // Publish visitor color to CSS variable for site-wide tinting
  useEffect(() => {
    const color = identity?.color?.hex || '#6B7B8C' // default slate
    document.documentElement.style.setProperty('--visitor-color', color)
  }, [identity])

  // Don't render anything before localStorage hydration completes
  if (!isLoaded) {
    return <div className="min-h-screen bg-surface-deep" aria-hidden="true" />
  }

  return (
    <ErrorBoundary label="app">
      <CharacterProvider
        identity={identity}
        isReturning={isReturning}
        onboardingDone={true}
      >
        <CompanionProvider visitor={identity}>
          <AppShell
            identity={identity}
            isReturning={isReturning}
            onReset={reset}
          />
        </CompanionProvider>
      </CharacterProvider>
    </ErrorBoundary>
  )
}

/* -----------------------------------------------------------------------
   AppShell - the actual rendered app, inside both providers so we can
   call useCompanion().fire() and useCharacter() for idle/reel routing.
   ----------------------------------------------------------------------- */

function AppShell({ identity, isReturning, onReset }) {
  const { fire, fireIdle, dismissAll } = useCompanion()
  const { setIdleState } = useCharacter()
  const location = useLocation()
  const idleSeenRef = useRef(new Set())

  // One clean entry greeting for first-time visitors (returning visitors get
  // R1/R2/R3 instead). No name is collected anymore - the greeting reflects that.
  useEffect(() => {
    if (!identity) return
    if (!isReturning) fire('E1', { elementId: 'session-entry' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity ? true : false])

  // Returning visitor recognition
  useEffect(() => {
    if (!identity || !isReturning) return
    const count = identity.visitCount || 0
    if (count === 2)      fire('R1', { elementId: 'returning-visit-2' })
    else if (count === 3) fire('R2', { elementId: 'returning-visit-3' })
    else if (count > 3)   fire('R3', { elementId: 'returning-visit-many' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity?.visitCount, isReturning])

  // Idle detection - continuous cycling system
  // First idle fires at 12s, then every 8s with quips/facts/reels from the pool
  // Movement dismisses everything immediately
  // Now routes through the character system for speech + reel custody
  useIdleDetection({
    idleMs: 18_000,
    cycleMs: 12_000,
    enabled: !!identity,
    onIdle: () => {
      // Signal character that visitor is idle
      setIdleState(true)
      // First idle hit - fire the first content from the pool
      const content = getNextIdleContent(idleSeenRef.current)
      if (content && content.index >= 0) idleSeenRef.current.add(content.index)
      if (content?.poolReset) idleSeenRef.current.clear()
      fireIdle(content)
    },
    onIdleCycle: () => {
      // Subsequent idle ticks - keep cycling through the pool
      const content = getNextIdleContent(idleSeenRef.current)
      if (content && content.index >= 0) idleSeenRef.current.add(content.index)
      if (content?.poolReset) idleSeenRef.current.clear()
      fireIdle(content)
    },
    onActivity: () => {
      // Movement detected - dismiss everything and signal character
      setIdleState(false)
      dismissAll()
    },
  })

  // Exit-intent
  useExitIntent(() => {
    const path = location.pathname
    if (path === '/')                          fire('X1', { elementId: 'exit-home' })
    else if (path.startsWith('/work'))         fire('X4', { elementId: 'exit-work' })
    else if (path.startsWith('/arcade'))       fire('X6', { elementId: 'exit-arcade' })
    else                                        fire('X1', { elementId: 'exit-default' })
  }, !!identity)

  return (
    <>
      {/* Ambient drifting blueprint grid - pure ground layer, behind all
          content and the character. See components/GridBackground.jsx. */}
      <GridBackground />

      {/* Thin scroll-progress line, fixed at the top of the viewport. */}
      <ScrollProgress />

      {/* Persistent top navigation - Work / About me / Resume. */}
      <SiteNav />

      {/* Routed page tree - isolated behind React.memo so the character's
          per-frame context updates can't reconcile it. See AppRoutes. */}
      <AppRoutes location={location} />

      <Footer
        identity={identity}
        onReset={onReset}
        lastUpdate={null /* server-side, placeholder for v1 */}
      />

      {/* Companion in its own silent boundary. The idle-cycle crash that
          blacks out the site renders inside here (character, speech
          bubbles, reels). If it throws, this boundary catches it: the
          companion vanishes, the console logs the exact error + component,
          and the rest of the site keeps working - no black screen. */}
      <ErrorBoundary label="companion" fallback={null}>
        <Companion />
        <PageGuide />
      </ErrorBoundary>
    </>
  )
}

/* -----------------------------------------------------------------------
   AppRoutes - the routed page tree, isolated behind React.memo.

   AppShell consumes character context, which changes on every frame while
   the character is walking. Without this boundary each of those updates
   would reconcile the entire routed page (hundreds of nodes, every SVG
   diagram) - the root cause of the site-wide scroll / mouse jank. memo +
   the stable `location` object means the page tree re-renders only on a
   real navigation, never from the character loop.

   Each <Route> element is a lazy() chunk; <Suspense> covers the load.
   ----------------------------------------------------------------------- */
const AppRoutes = memo(function AppRoutes({ location }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"               element={<Home />} />
            <Route path="/work"           element={<Work />} />
            <Route path="/projects/:slug" element={<ProjectRoute />} />
            <Route path="/about"          element={<About />} />
            <Route path="/arcade"         element={<Arcade />} />
            <Route path="*"               element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
})

/* Minimal route-load placeholder - holds viewport height so the layout
   doesn't collapse during a lazy chunk fetch. */
function RouteFallback() {
  return <div className="min-h-screen" aria-hidden="true" />
}

function NotFound() {
  return (
    <div className="section-page text-center py-32">
      <motion.h1
        className="text-display-xl font-display mb-4 inline-block"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        that page doesn&apos;t exist. it might never have.
      </motion.p>
    </div>
  )
}
