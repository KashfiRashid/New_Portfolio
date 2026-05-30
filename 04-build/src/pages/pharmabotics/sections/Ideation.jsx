import { SectionHead, Prose, Figure } from '../primitives.jsx'

export default function Ideation() {
  return (
    <section id="ideation" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Ideation & planning" title="From a whiteboard to a system" />
      <div className="space-y-12">
        <Prose className="max-w-[700px]">
          <p>
            We started on a whiteboard: pick a real, useful problem, then work out whether a
            machine could actually do it. The sketches below were the ideas - not the final
            design - and the system diagram was the plan we built against.
          </p>
        </Prose>

        <div className="grid gap-4 sm:grid-cols-2">
          <Figure src="/pharmabotics/ideating-team.png" alt="The team ideating together." aspect="16 / 10" caption="Working out the idea." />
          <Figure src="/pharmabotics/team-ideating-on-board.png" alt="The team at a whiteboard." aspect="16 / 10" caption="On the board." />
        </div>

        <div>
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">The ideas, on paper</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Figure src="/pharmabotics/sketch-fingerprint.jpg" alt="Concept sketch: fingerprint + LED feedback." aspect="4 / 3" position="top" caption="Sketch: auth + LED feedback." />
            <Figure src="/pharmabotics/sketch-machine.jpg" alt="Concept sketch: pill sorter, funnel, dispensing bay." aspect="4 / 3" position="top" caption="Sketch: the dispensing bay." />
          </div>
        </div>

        <Figure src="/pharmabotics/system-diagram.png" alt="The PharmaBotics system diagram: UI, input transducers, output transducers." aspect="16 / 9" caption="The plan: UI, input transducers (sensors), output transducers (motors, LEDs)." />
      </div>
    </section>
  )
}
