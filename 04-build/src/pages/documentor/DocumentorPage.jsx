import { useEffect, useState } from 'react'

import { SideNav } from './primitives.jsx'

import Hero from './sections/Hero.jsx'
import Overview from './sections/Overview.jsx'
import Problem from './sections/Problem.jsx'
import BiasCheck from './sections/BiasCheck.jsx'
import WhatIDid from './sections/WhatIDid.jsx'
import MicroStep from './sections/MicroStep.jsx'
import Build from './sections/Build.jsx'
import Features from './sections/Features.jsx'
import Results from './sections/Results.jsx'
import Reflection from './sections/Reflection.jsx'
import Credits from './sections/Credits.jsx'

const SECTION_IDS = [
  'overview',
  'problem',
  'bias-check',
  'what-i-did',
  'micro-step',
  'build',
  'features',
  'results',
  'reflection',
  'credits',
]

export default function DocumentorPage() {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (nodes.length === 0) return undefined

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      { root: null, rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    )

    nodes.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div
      className="relative min-h-screen bg-[#0F1216] text-zinc-200 antialiased selection:bg-[#E8A53B]/30"
      style={{
        '--font-display': '"Editorial New", "Reckless Neue", Georgia, ui-serif, serif',
        '--font-sans': 'Inter, "Söhne", "Geist Sans", system-ui, sans-serif',
        '--font-mono': '"JetBrains Mono", "Geist Mono", ui-monospace, monospace',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 bg-gradient-to-br from-[#E8A53B]/[0.04] via-transparent to-transparent"
        aria-hidden
      />

      <SideNav activeId={activeId} />

      <main className="relative mx-auto max-w-[860px] px-6 pb-32 pt-16 lg:ml-[220px] lg:max-w-[calc(100vw-220px-2rem)] lg:px-10 lg:pt-20">
        <Hero />
        <Overview />
        <Problem />
        <BiasCheck />
        <WhatIDid />
        <MicroStep />
        <Build />
        <Features />
        <Results />
        <Reflection />
        <Credits />
      </main>
    </div>
  )
}
