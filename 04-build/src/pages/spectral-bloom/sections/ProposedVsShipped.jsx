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
          The proposal called for a chain of trained AI models: Wav2CLIP to translate sound into the same mathematical space that images live in, SDXL Turbo to generate imagery from that translation, a live connection to a cloud graphics server to run it all, and a user study to measure the result.
        </p>
        <p>
          Six weeks in, the math did not hold. The round trip to a free cloud GPU could not stay smooth at sixty frames a second, and the image-generation pipeline was never going to be demo-ready in time. So I kept the thesis and swapped the spine. Claude became the layer that reads meaning &mdash; instead of an AI model I would have had to train myself &mdash; and the whole system collapsed into one browser file.
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
