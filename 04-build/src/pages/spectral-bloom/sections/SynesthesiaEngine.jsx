import { SectionHead } from '../primitives.jsx'
import AISynesthesiaFlow from '../diagrams/AISynesthesiaFlow.jsx'

const WITHOUT_AI = [
  'Colors come from math formulas',
  'Same input produces the same output, every time',
  'No mood, no atmosphere',
  'Reacts to loudness, not meaning',
]

const WITH_AI = [
  'Claude picks artistic color palettes',
  'Same input gets a fresh interpretation each pass',
  'Surfaces a mood word and an atmosphere phrase',
  'Reads the character of the sound',
]

export default function SynesthesiaEngine() {
  return (
    <section id="synesthesia" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="SYNESTHESIA ENGINE"
        title="Claude reads the audio and answers one question: what should this look like?"
      />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Every few seconds the engine snapshots the current audio features and sends them to Claude with a single instruction: act as a synesthesia engine. Claude returns a small JSON payload, a color palette, a mood word, particle spread and speed, a camera distance, an atmosphere phrase. The visualizer lerps toward it.
        </p>
      </div>

      <div className="mt-16">
        <AISynesthesiaFlow />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border border-white/[0.06] bg-white/[0.02] p-6">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Without the AI layer
          </p>
          <ul className="mt-4 space-y-2">
            {WITHOUT_AI.map((line) => (
              <li key={line} className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-[#FF3D6E]/30 bg-[#FF3D6E]/[0.04] p-6">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#FF7DA3]">
            With the AI layer
          </p>
          <ul className="mt-4 space-y-2">
            {WITH_AI.map((line) => (
              <li key={line} className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-200">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 max-w-[720px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-400">
        <p>
          The AI layer is additive. It nudges lights, spread, and camera over two to three seconds, and it never overrides the generative core. When no API key is set, an algorithmic mood generator fills the same slot, so the visualizer works fully on its own.
        </p>
      </div>
    </section>
  )
}
