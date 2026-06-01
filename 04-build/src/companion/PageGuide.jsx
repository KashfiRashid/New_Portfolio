import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useCompanion } from './CompanionContext.jsx'
import { guideForPath } from './pageGuide.js'

/**
 * <PageGuide /> - renders nothing. Drives the companion's docent mode:
 *   - on route change: load that page's guide lines, greet after a beat
 *   - on scroll: fire one line per page segment (one per "section")
 * AFK / boredom is handled by the existing idle cycle - when the visitor
 * stops scrolling, that takes over; scrolling resumes the guide.
 */
export default function PageGuide() {
  const { fireGuide } = useCompanion()
  const { pathname } = useLocation()
  const seenRef = useRef(new Set())
  const linesRef = useRef([])
  const lastAtRef = useRef(0)

  // Route change: load lines, reset, greet.
  useEffect(() => {
    const lines = guideForPath(pathname) || []
    linesRef.current = lines
    seenRef.current = new Set()
    if (lines.length === 0) return undefined
    const t = setTimeout(() => {
      seenRef.current.add(0)
      lastAtRef.current = Date.now()
      fireGuide(lines[0], `${pathname}::0`)
    }, 1400)
    return () => clearTimeout(t)
  }, [pathname, fireGuide])

  // Scroll: fire the next unseen segment, paced.
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const lines = linesRef.current
        if (lines.length < 2) return
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        const pct = max > 0 ? window.scrollY / max : 0
        const seg = Math.min(lines.length - 1, Math.floor(pct * lines.length))
        if (seg <= 0 || seenRef.current.has(seg)) return
        if (Date.now() - lastAtRef.current < 4500) return // pace it
        seenRef.current.add(seg)
        lastAtRef.current = Date.now()
        fireGuide(lines[seg], `${pathname}::${seg}`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [pathname, fireGuide])

  return null
}
