import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useCompanion } from './CompanionContext.jsx'
import { guideForPath } from './pageGuide.js'

// Session memory: a guide line ('<path>::<seg>') is spoken at most once per
// visit, so navigating back and forth never re-greets or repeats a line.
const SEEN = new Set()

/**
 * <PageGuide /> - renders nothing. Drives the companion's docent mode:
 *   - on route change: load that page's guide lines, greet after a beat
 *   - on scroll: figure out which real section is on screen and speak the line
 *     tied to it (falls back to scroll-percentage if a page has no <section>s)
 * One line per section, max once each. AFK is handled by the idle cycle;
 * scrolling resumes the guide.
 */
export default function PageGuide() {
  const { fireGuide } = useCompanion()
  const { pathname } = useLocation()
  const linesRef = useRef([])
  const lastAtRef = useRef(0)

  // Route change: load lines, reset, greet.
  useEffect(() => {
    const lines = guideForPath(pathname) || []
    linesRef.current = lines
    if (lines.length === 0) return undefined
    const greetKey = `${pathname}::0`
    if (SEEN.has(greetKey)) return undefined
    const t = setTimeout(() => {
      SEEN.add(greetKey)
      lastAtRef.current = Date.now()
      fireGuide(lines[0], greetKey)
    }, 1400)
    return () => clearTimeout(t)
  }, [pathname, fireGuide])

  // Scroll: fire the line for whichever section is currently on screen.
  useEffect(() => {
    let raf = 0

    // Which guide segment matches what's on screen right now?
    const currentSegment = (lineCount) => {
      // Prefer real sections so the line tracks the content, not a raw %.
      let sections = Array.from(document.querySelectorAll('section[id]'))
      if (sections.length < 2) sections = Array.from(document.querySelectorAll('main section, section'))
      if (sections.length >= 2) {
        // the deepest section whose top has crossed ~42% down the viewport
        // is the one the visitor is actually reading
        const trigger = window.innerHeight * 0.42
        let idx = 0
        sections.forEach((el, i) => {
          if (el.getBoundingClientRect().top <= trigger) idx = i
        })
        return Math.min(lineCount - 1, idx)
      }
      // Fallback: scroll percentage buckets.
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const pct = max > 0 ? window.scrollY / max : 0
      return Math.min(lineCount - 1, Math.floor(pct * lineCount))
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const lines = linesRef.current
        if (lines.length < 2) return
        const seg = currentSegment(lines.length)
        if (seg <= 0) return
        const key = `${pathname}::${seg}`
        if (SEEN.has(key)) return
        if (Date.now() - lastAtRef.current < 4500) return // pace it
        SEEN.add(key)
        lastAtRef.current = Date.now()
        fireGuide(lines[seg], key)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [pathname, fireGuide])

  return null
}
// end PageGuide.jsx
