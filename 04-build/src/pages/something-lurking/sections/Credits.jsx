import { SectionHead } from '../primitives.jsx'

const TEAM = [
  {
    label: 'KASHFI RASHID',
    name: 'Md Kashfi Or Rashid Pranta',
    role: 'Story arc · Design philosophy · Sound · Iteration',
    contribution:
      'Drafted the three-act narrative spine the team built around. Brought two earlier design papers — one on purposeful scaling, one proposing pipe-and-valve hand mechanics — into the project\'s mechanic vocabulary. Generated the character voices in Eleven Labs and treated them in Audacity. Authored the environmental sound cues. Held the iteration loop from whiteboard to Unity.',
  },
  {
    label: 'ERIC GABRIEL CHENG LI',
    name: 'Eric Gabriel Cheng Li',
    role: 'Sole 3D Modeler · Environments',
    contribution:
      'Modeled every 3D asset in the experience. Corridor, stairway, generator platform, the 1:100 fusebox interior, the 1:1000 vent and chip-space, control room, elevator and corridor, garage, escape pod, the astronaut, the armband. After P1, built the entire second-half environment in one push.',
  },
  {
    label: 'MICHAEL KIM',
    name: 'Michael Kim',
    role: 'Mechanics · Socket Interactors · Poke UI',
    contribution:
      'Built the socket interactor systems that drive the wire, fuse, and chip-grid puzzles. Wired the doors, the teleport speed changers, the poke-based armband UI after the P1 raycast feedback. Made the ship feel like a working machine.',
  },
  {
    label: 'KENTO WEIL',
    name: 'Kento Weil',
    role: 'Mechanics · Mystery & Isolation Beats',
    contribution:
      'Co-built the mechanics layer with Michael. Brought his prior work on a murder-mystery plot set in an isolated location — the foundation the team built Something Lurking on top of — into the experience\'s atmosphere. The empty-corridor pacing and the captain-cuts-out beat carry his fingerprints.',
  },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CREDITS" title="Team." />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {TEAM.map((m) => (
          <div key={m.label}>
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#6E3FB3]">
              {m.label}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[20px] font-normal text-white">
              {m.name}
            </h3>
            <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">{m.role}</p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {m.contribution}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-zinc-500">
            Tools
          </p>
          <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
            Unity (XR Toolkit, scenes, scripting) · Blender (modeling) · Sketchfab and Adobe Substance (assets and materials) · Audacity (sound post) · Eleven Labs (voice generation) · Pixabay (button and item SFX).
          </p>
        </div>
        <div>
          <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-zinc-500">
            Inspirations
          </p>
          <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
            Dead Space (Visceral Games, 2008 / 2023) for the diegetic UI. Among Us (InnerSloth, 2018) for the wire fixing minigame. Flow Free (2012) for the chip-grid connection puzzle. Alien (Ridley Scott, 1979) for the unseen-threat atmosphere. Red Matter (Vertical Robot, 2018) for the VR object handling register.
          </p>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap gap-6">
        <a
          href="https://www.sfu.ca/siat/showcase/fall-2025-project-showcase/iat-445-something-lurking.html"
          target="_blank"
          rel="noreferrer"
          className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[#9268E0] underline-offset-4 hover:underline"
        >
          SFU SIAT showcase →
        </a>
        <a
          href="https://youtu.be/eK9rhROT4ds"
          target="_blank"
          rel="noreferrer"
          className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[#9268E0] underline-offset-4 hover:underline"
        >
          Demo video →
        </a>
        <a
          href="https://www.sfu.ca/content/dam/sfu/siat/Showcase/2025-Fall/IAT-445-Something-Lurking/Something_Lurking_Comic.pdf"
          target="_blank"
          rel="noreferrer"
          className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[#9268E0] underline-offset-4 hover:underline"
        >
          Comic PDF →
        </a>
      </div>

      <p className="mt-14 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Immersive Environments · SFU SIAT · Fall 2025
      </p>
    </section>
  )
}
