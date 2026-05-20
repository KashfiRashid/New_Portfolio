import { SectionHead, Figure } from '../primitives.jsx'

const HIGHLIGHTS = [
  {
    label: 'Final critique',
    body: 'Playable VR build delivered for the final critique. All three acts, both scales, the diegetic feedback patch shipped.',
  },
  {
    label: 'SFU info session',
    body: 'Presented live at the SFU SIAT Prospective Student Info Session, Fall 2025. Used as a recruitment piece for the program.',
  },
  {
    label: 'Official showcase',
    body: 'Featured on the SFU SIAT Fall 2025 Project Showcase as one of the official Immersive Environments selections.',
  },
]

export default function Results() {
  return (
    <section id="results" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="RESULTS" title="Shipped. Presented. Showcased." />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-3">
        {HIGHLIGHTS.map((h) => (
          <div key={h.label} className="bg-[#0F1216] p-6">
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#6E3FB3]">
              {h.label}
            </p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {h.body}
            </p>
          </div>
        ))}
      </div>

      <Figure
        className="mt-16"
        src="/something-lurking/fig-art-collage.png"
        alt="The full 3D asset collage from the project report: corridor, stairway, generator platform, 1:100 fusebox, lower corridor, 1:1000 vent, control room, 1:1000 chips, elevator corridor, inside elevator, garage, inside spacepod, the astronaut model, armband, and the escape pod, with Blender, Sketchfab, and Adobe Substance noted as software."
        label="Figure 5"
        caption="The full art set Eric modeled · seven scaled environments · armband · escape pod · astronaut"
      />

      <div className="mt-12">
        <a
          href="https://www.sfu.ca/siat/showcase/fall-2025-project-showcase/iat-445-something-lurking.html"
          target="_blank"
          rel="noreferrer"
          className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[#9268E0] underline-offset-4 hover:underline"
        >
          See the SFU SIAT showcase entry →
        </a>
      </div>
    </section>
  )
}
