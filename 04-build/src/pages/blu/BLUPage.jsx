import { useEffect, useState } from 'react'

import { SideNav } from './primitives.jsx'

import Hero from './sections/Hero.jsx'
import Overview from './sections/Overview.jsx'
import Concept from './sections/Concept.jsx'
import WhatIDid from './sections/WhatIDid.jsx'
import TwoWorlds from './sections/TwoWorlds.jsx'
import SoundAsCharacter from './sections/SoundAsCharacter.jsx'
import Process from './sections/Process.jsx'
import Results from './sections/Results.jsx'
import Reflection from './sections/Reflection.jsx'
import Credits from './sections/Credits.jsx'

const SECTION_IDS = [
  'overview',
  'concept',
  'what-i-did',
  'two-worlds',
  'sound-as-character',
  'process',
  'results',
  'reflection',
  'credits',
]

export default function BLUPage() {
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
      className="relative min-h-screen bg-[#0F1216] text-zinc-200 antialiased selection:bg-[#2C7FB8]/30"
      style={{
        '--font-display': '"Instrument Serif", Georgia, serif',
        '--font-sans': '"DM Sans", system-ui, sans-serif',
        '--font-mono': '"DM Mono", ui-monospace, monospace',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 bg-gradient-to-br from-amber-950/[0.04] via-transparent to-transparent"
        aria-hidden
      />

      <SideNav activeId={activeId} />

      <main className="relative mx-auto max-w-[860px] px-6 pb-32 pt-16 lg:ml-[220px] lg:max-w-[calc(100vw-220px-2rem)] lg:px-10 lg:pt-20">
        <Hero />
        <Overview />
        <Concept />
        <WhatIDid />
        <TwoWorlds />
        <SoundAsCharacter />
        <Process />
        <Results />
        <Reflection />
        <Credits />
      </main>
    </div>
  )
}
