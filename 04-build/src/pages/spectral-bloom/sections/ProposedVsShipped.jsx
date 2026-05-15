import { SectionHead, PullQuote } from '../primitives.jsx'
import ProposedVsShippedDiagram from '../diagrams/ProposedVsShippedDiagram.jsx'

export default function ProposedVsShipped() {
  return (
    <section id="the-pivot" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="THE PIVOT"
        title="I proposed a research pipeline. I shipped a leaner one."
      />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The proposal called for a learned cross-modal stack: Wav2CLIP encoding audio into CLIP embedding space, SDXL Turbo generating imagery through cross-attention injection, a WebSocket bridge to a GPU backend, and a user study to measure it all.
        </p>
        <p>
          Six weeks in, the math on that did not hold. A WebSocket round trip to a Colab GPU could not keep perceptual continuity at 60 fps, and the diffusion stack was not going to be demoable in time. So I kept the thesis and swapped the spine. Claude became the semantic layer instead of a learned embedding, and the whole system collapsed into one browser file.
        </p>
      </div>

      <div className="mt-16">
        <ProposedVsShippedDiagram />
      </div>

      <div className="mt-16">
        <PullQuote>
          The idea was never the diffusion model. The idea was that the visuals should understand the music. That part shipped.
        </PullQuote>
      </div>
    </section>
  )
}
