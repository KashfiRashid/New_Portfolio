import { SectionHead, Prose, Highlight } from '../primitives.jsx'
import DevelopmentTimeline from '../diagrams/DevelopmentTimeline.jsx'

export default function Stages() {
  return (
    <section id="stages" className="scroll-mt-28 border-t border-white/[0.06] py-16 lg:py-24">
      <SectionHead kicker="Built in stages" title="How it came together" />
      <Prose className="mb-12 max-w-[680px]">
        <p>
          I built it in stages: art first, then a shared object model, then one playable room,
          then the next. Each stage left something I could actually run, which kept the scope
          honest and the bugs small.
        </p>
        <p>
          Order mattered. Because the <Highlight>abstract Item base and the factory came before
          any room</Highlight>, every object I added later already knew how to be clicked,
          dragged, and drawn.
        </p>
      </Prose>
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 lg:p-10">
        <DevelopmentTimeline />
      </div>
    </section>
  )
}
// end Stages.jsx
