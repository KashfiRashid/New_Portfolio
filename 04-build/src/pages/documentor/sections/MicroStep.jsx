import { SectionHead, AppShot } from '../primitives.jsx'
import CognitiveOverloadContrast from '../diagrams/CognitiveOverloadContrast.jsx'
import MicroStepDecomposition from '../diagrams/MicroStepDecomposition.jsx'

export default function MicroStep() {
  return (
    <section id="micro-step" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="THE MICRO-STEP MODEL"
        title="Make the next step small enough that no one freezes."
      />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          A government process is intimidating because it presents every requirement at once. DocuMentor presents one step, confirms it, then reveals the next.
        </p>
      </div>

      <div className="mt-12">
        <CognitiveOverloadContrast />
      </div>

      <div className="mt-16">
        <MicroStepDecomposition />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <AppShot
          src="https://kashfirashid.com/media/documentor/App_Stacked.png"
          alt="Stacked DocuMentor app screens showing the step-by-step progression."
          caption="One step on screen at a time"
        />
        <AppShot
          src="https://kashfirashid.com/media/documentor/Feature-Highlight.png"
          alt="A DocuMentor feature highlight showing the progress indicator in context."
          caption="Progress always visible"
        />
      </div>
    </section>
  )
}
