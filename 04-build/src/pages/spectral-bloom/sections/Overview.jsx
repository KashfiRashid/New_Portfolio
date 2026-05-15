import { SectionHead, StatBlock, PullQuote } from '../primitives.jsx'

const STATS = [
  { value: '12,000', label: 'particles' },
  { value: '5', label: 'visualization modes' },
  { value: '60 fps', label: 'render target' },
  { value: '2048-pt', label: 'FFT analysis' },
  { value: '6', label: 'audio features' },
  { value: '1 file', label: 'zero build step' },
]

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="OVERVIEW"
        title="Most visualizers react to loudness. I wanted one that reads meaning."
      />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Spectral Bloom listens to live or uploaded audio and turns it into a 3D particle world. The Web Audio API does the measuring. Claude does the interpreting. The result is a system that treats a soft piano ballad and an aggressive drop as two different things to look at, even when their frequency profiles overlap.
        </p>
        <p>
          It runs entirely in the browser, in a single HTML file, with no build step and no backend.
        </p>
      </div>

      <div className="mt-12">
        <StatBlock stats={STATS} />
      </div>

      <div className="mt-16">
        <PullQuote>
          The interesting part was never the rendering. It was teaching the visuals to have an opinion about the sound.
        </PullQuote>
      </div>
    </section>
  )
}
