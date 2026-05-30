import { SectionHead, Prose, Highlight, Figure } from '../primitives.jsx'

const BUILT = [
  { t: 'The dispensing mechanism', d: 'Designed in Onshape and 3D-printed after cardboard prototypes failed on friction - a disk-and-housing sorter that releases exactly one pill per rotation.' },
  { t: 'Motion-triggered dispensing', d: 'Arduino ultrasonic code that detects the patient hand in the bay and fires the correct medicine motor.' },
  { t: 'The secure lid', d: 'A pressure-sensor-gated lid for doctor-only refills, plus the physical build, wiring, and the system schematics.' },
]

const STEPS = [
  { src: '/pharmabotics/sketch-pillsorter.jpg', cap: '1. The idea: a pill sorter (sketch)' },
  { src: '/pharmabotics/prototype.png', cap: '2. Cardboard prototype - failed on friction' },
  { src: '/pharmabotics/3d-print-design-software.png', cap: '3. Modeled in Onshape' },
  { src: '/pharmabotics/3d-printing-onprocess.png', cap: '4. 3D-printed' },
  { src: '/pharmabotics/working-prototype-pill-sorter.png', cap: '5. In the machine, sorting pills' },
]

export default function MyRole() {
  return (
    <section id="my-role" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="What I built" title="The mechanism: idea to part" />
      <div className="space-y-10">
        <Prose className="max-w-[700px]">
          <p>
            My part was the physical machine. I owned the{' '}
            <Highlight>dispensing mechanism and the embedded code that drives it</Highlight> -
            the part that has to be mechanically reliable, not just demo-able. (Harjot built the
            React/Node app and the fingerprint integration; Faaiz the Node backend and sensors.)
          </p>
        </Prose>

        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <Figure
            src="/pharmabotics/sensor-testing.png"
            alt="The 3D-printed dispenser auger held over the cardboard rig, wired to a breadboard and Arduino for testing."
            caption="The 3D-printed auger, wired to the Arduino and bench-tested before it went in the machine."
          />
          <div className="grid gap-4 sm:grid-cols-1 self-center">
            {BUILT.map((b) => (
              <div key={b.t} className="border border-white/[0.08] bg-white/[0.02] p-6">
                <div className="font-[family-name:var(--font-display)] text-xl text-white">{b.t}</div>
                <p className="mt-3 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">{b.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#5EEAD4]">Sketch to working part</p>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s) => (
              <Figure key={s.src} src={s.src} alt={s.cap} caption={s.cap} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
