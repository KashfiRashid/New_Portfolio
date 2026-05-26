import { SectionHead } from '../primitives.jsx'

const TEAM = [
  {
    name: 'Md Kashfi Or Rashid Pranta',
    role: 'Story arc · Design philosophy · Sound · Iteration',
    contribution:
      'Drafted the three-act narrative spine. Generated the character voices in Eleven Labs and treated them in Audacity. Authored the environmental sound cues. Held the iteration loop from whiteboard to Unity.',
  },
  {
    name: 'Eric Gabriel Cheng Li',
    role: 'Sole 3D Modeler · Environments',
    contribution:
      'Modeled every 3D asset in the experience. After P1, built the entire second-half environment in one push.',
  },
  {
    name: 'Michael Kim',
    role: 'Mechanics · Socket Interactors · Poke UI',
    contribution:
      'Built the socket interactor systems that drive the wire, fuse, and chip-grid puzzles. Made the ship feel like a working machine.',
  },
  {
    name: 'Kento Weil',
    role: 'Mechanics · Mystery & Isolation Beats',
    contribution:
      'Co-built the mechanics layer with Michael. The empty-corridor pacing and the captain-cuts-out beat carry his fingerprints.',
  },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CREDITS" title="Team." />

      <figure className="mb-12">
        <img
          src="/something-lurking/team.png"
          alt="The Something Lurking team at the SFU SIAT Fall 2025 showcase"
          loading="lazy"
          className="w-full max-w-xl rounded-lg border border-white/[0.08]"
        />
        <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          The team at the SIAT Fall 2025 showcase
        </figcaption>
      </figure>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {TEAM.map((m) => (
          <div key={m.name}>
            <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-white">
              {m.name}
            </h3>
            <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">
              {m.role}
            </p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {m.contribution}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-14 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Immersive Environments · SFU SIAT · Fall 2025
      </p>
    </section>
  )
}
