import { useEffect, useState } from 'react'
import { SideNav } from './primitives.jsx'
import Hero from './sections/Hero.jsx'
import Problem from './sections/Problem.jsx'
import Ideation from './sections/Ideation.jsx'
import WhatItDoes from './sections/WhatItDoes.jsx'
import HowItWorks from './sections/HowItWorks.jsx'
import MyRole from './sections/MyRole.jsx'
import Iteration from './sections/Iteration.jsx'
import Outcome from './sections/Outcome.jsx'
import Reflection from './sections/Reflection.jsx'

const SECTION_IDS = ['problem', 'ideation', 'what-it-does', 'how-it-works', 'my-role', 'iteration', 'outcome', 'reflection']

export default function PharmaBoticsPage() {
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
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) window.cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0B1211] text-zinc-200 antialiased selection:bg-[#14B8A6]/30"
      style={{ '--font-display': '"Instrument Serif", Georgia, serif', '--font-sans': '"DM Sans", system-ui, sans-serif', '--font-mono': '"DM Mono", ui-monospace, monospace' }}>
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-teal-950/[0.10] via-transparent to-transparent" aria-hidden />
      <SideNav activeId={activeId} />
      <main className="relative mx-auto max-w-[860px] px-6 pb-32 pt-20 lg:ml-[220px] lg:max-w-[calc(100vw-220px-2rem)] lg:px-10 lg:pt-24">
        <Hero />
        <Problem />
        <Ideation />
        <WhatItDoes />
        <HowItWorks />
        <MyRole />
        <Iteration />
        <Outcome />
        <Reflection />
      </main>
    </div>
  )
}
