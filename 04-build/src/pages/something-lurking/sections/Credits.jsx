import { SectionHead } from '../primitives.jsx'

const TEAM = [
  { name: 'Md Kashfi Or Rashid Pranta', role: 'Story arc \u00b7 Design philosophy \u00b7 Sound \u00b7 Iteration', contribution: 'Drafted the three-act narrative spine. Generated the character voices in Eleven Labs and treated them in Audacity. Held the iteration loop from whiteboard to Unity.' },
  { name: 'Eric Gabriel Cheng Li', role: 'Sole 3D Modeler \u00b7 Environments', contribution: 'Modeled every 3D asset in the experience. After P1, built the entire second-half environment in one push.' },
  { name: 'Michael Kim', role: 'Mechanics \u00b7 Socket Interactors \u00b7 Poke UI', contribution: 'Built the socket interactor systems that drive the wire, fuse, and chip-grid puzzles.' },
  { name: 'Kento Weil', role: 'Mechanics \u00b7 Mystery & Isolation Beats', contribution: 'Co-built the mechanics layer with Michael.' },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CREDITS" title="Team." />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {TEAM.map((m) => (
          <div key={m.name}>
            <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-white">{m.name}</h3>
            <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">{m.role}</p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">{m.contribution}</p>
          </div>
        ))}
      </div>
      <p className="mt-14 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Immersive Environments &#xB7; SFU SIAT &#xB7; Fall 2025
      </p>
    </section>
  )
}
