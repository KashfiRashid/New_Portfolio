import { SectionHead, Prose, Highlight } from '../primitives.jsx'
import ArchitectureDiagram from '../diagrams/ArchitectureDiagram.jsx'
import StateMachineDiagram from '../diagrams/StateMachineDiagram.jsx'

export default function Architecture() {
  return (
    <section id="architecture" className="scroll-mt-28 border-t border-white/[0.06] py-16 lg:py-24">
      <SectionHead kicker="Under the hood" title="One hub, many packages" />
      <Prose className="mb-10 max-w-[680px]">
        <p>
          At the centre is <Highlight>SmelterPanel</Highlight>, one class that is the paint loop,
          the input router, and the state machine at once. It owns the current state, decides what
          to draw each frame, and routes every event. Every package hangs off it.
        </p>
      </Prose>
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 lg:p-10">
        <ArchitectureDiagram />
      </div>
      <div className="mt-14">
        <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl text-white">The loop the panel runs</h3>
        <Prose className="mb-8 max-w-[680px]">
          <p>
            That state is a single value the panel advances as you play. The whole game is one
            forward pipeline with a restart loop.
          </p>
        </Prose>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 lg:p-10">
          <StateMachineDiagram />
        </div>
      </div>
    </section>
  )
}
// end Architecture.jsx
