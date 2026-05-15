import { SectionHead } from '../primitives.jsx'
import AudioPipelineDiagram from '../diagrams/AudioPipelineDiagram.jsx'

const NOTES = [
  {
    title: 'Adaptive beat detection',
    body: 'Beats are not a fixed threshold. The engine keeps a 50-frame rolling history of energy and fires only when the current frame breaks above that running average, so a quiet track and a loud track both get musical beats.',
  },
  {
    title: 'Three-tier smoothing',
    body: 'Raw FFT data jitters. Each feature is lerped at its own rate, fast for bass and beats, slow for loudness, very slow for tonal brightness, so the visuals feel buttery instead of twitchy.',
  },
]

export default function AudioFeatures() {
  return (
    <section id="audio" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="AUDIO FEATURES" title="One FFT pass. Six features. Six jobs." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          A single 2048-point FFT runs every frame. From that one pass the engine pulls six features, and each one is wired to a specific part of the visual.
        </p>
      </div>

      <div className="mt-16">
        <AudioPipelineDiagram />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {NOTES.map((note) => (
          <div key={note.title} className="border border-white/[0.06] bg-white/[0.02] p-6">
            <h3 className="font-[family-name:var(--font-sans)] text-lg font-medium text-white">
              {note.title}
            </h3>
            <p className="mt-2 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
              {note.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
