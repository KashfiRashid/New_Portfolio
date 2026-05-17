import { SectionHead, AppShot } from '../primitives.jsx'
import BiasCheckDiagram from '../diagrams/BiasCheckDiagram.jsx'
import ResearchSynthesis from '../diagrams/ResearchSynthesis.jsx'

export default function BiasCheck() {
  return (
    <section id="bias-check" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="CHECKING MY BIAS"
        title="The risk of designing for your own problem is designing only for yourself."
      />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          I knew my frustration. I did not yet know if it was universal or just mine.
        </p>
        <p>
          So I ran 45 interviews across more than 12 countries, not to confirm what I felt, but to find out whether it generalized.
        </p>
      </div>

      <div className="mt-12">
        <BiasCheckDiagram />
      </div>

      <div className="mt-16 max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          It generalized. Three pain points surfaced in nearly every conversation: information overload, unclear progress, complex navigation.
        </p>
      </div>

      <div className="mt-12">
        <AppShot
          src="https://kashfirashid.com/media/documentor/PainPoints.png"
          alt="Research synthesis showing the three pain points that emerged from 45 interviews: information overload, unclear progress, complex navigation."
          caption="45 interviews · 12+ countries · three pain points held"
        />
      </div>

      <div className="mt-12">
        <ResearchSynthesis />
      </div>

      <p className="mt-12 max-w-[720px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-400">
        That is what earned the right to design from evidence instead of memory.
      </p>
    </section>
  )
}
