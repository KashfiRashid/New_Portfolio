import { useEffect, useState } from 'react'
import { SideNav } from './primitives.jsx'
import Hero from './sections/Hero.jsx'
import Challenge from './sections/Challenge.jsx'
import Research from './sections/Research.jsx'
import Insights from './sections/Insights.jsx'
import Solution from './sections/Solution.jsx'
import Journey from './sections/Journey.jsx'
import Features from './sections/Features.jsx'
import FinalDesign from './sections/FinalDesign.jsx'
import Impact from './sections/Impact.jsx'
import Credits from './sections/Credits.jsx'

const SECTION_IDS = [
  'challenge', 'research', 'insights', 'journey',
  'solution', 'features', 'final-design', 'impact', 'credits',
]

export default function TruckingAcademyPage() {
  const [activeId, setActiveId] = useState('')
  useEffect(() => {
    const TRIGGER = 140
    let raf = 0
    const recompute = () => {
      raf = 0
      const nodes = SECTION_IDS.map((id) => ({ id, el: document.getElementById(id) })).filter((n) => n.el)
      if (nodes.length === 0) return
      let current = ''
      let bestTop = -Infinity
      for (const { id, el } of nodes) {
        const top = el.getBoundingClientRect().top
        if (top <= TRIGGER && top > bestTop) { bestTop = top; current = id }
      }
      setActiveId(current)
    }
    const onScroll = () => { if (raf) return; raf = window.requestAnimationFrame(recompute) }
    recompute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className="relative min-h-screen bg-[#0F1216] text-zinc-200 antialiased selection:bg-[#8B0000]/40"
      style={{
        '--font-display': '"Instrument Serif", Georgia, serif',
        '--font-sans': '"DM Sans", system-ui, sans-serif',
        '--font-mono': '"DM Mono", ui-monospace, monospace',
      }}
    >
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-red-950/[0.06] via-transparent to-transparent" aria-hidden />
      <SideNav activeId={activeId} />
      <main className="relative mx-auto max-w-[860px] px-6 pb-32 pt-20 lg:ml-[220px] lg:max-w-[calc(100vw-220px-2rem)] lg:px-10 lg:pt-24">
        <Hero />
        <Challenge />
        <Research />
        <Insights />
        <Journey />
        <Solution />
        <Features />
        <FinalDesign />
        <Impact />
        <Credits />
      </main>
    </div>
  )
}
