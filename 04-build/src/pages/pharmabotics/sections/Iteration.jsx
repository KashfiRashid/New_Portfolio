import { SectionHead, Prose, Figure } from '../primitives.jsx'

const PROBLEMS = [
  { t: 'Pill precision', d: 'Cardboard sorters had inconsistent friction and dropped multiple pills. I redesigned the mechanism in Onshape and 3D-printed it - reliable single-pill rotation.' },
  { t: 'DC-motor drift', d: 'The two dispensing motors spun differently under the same signal. We hand-tuned PWM pulse sequences until each one landed a clean rotation.' },
  { t: 'Fingerprint limit', d: 'The sensor will not export print data. So we matched its on-device IDs (0-244) to MongoDB user IDs - identity without ever copying biometrics.' },
  { t: 'The safer refill lid', d: 'After the water idea died, we gave the pressure sensor a smaller, dependable job: a refill lid that only unlocks when you press down. A feature we could trust on demo day.' },
]

export default function Iteration() {
  return (
    <section id="iteration" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Prototyping & iteration" title="What broke, and what we changed" />
      <div className="space-y-12">
        <Prose className="max-w-[680px]">
          <p>
            Most of the build was failing, then fixing. The interesting work was not the final
            machine - it was the decisions that got us there.
          </p>
        </Prose>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Figure src="/pharmabotics/team-collaboration.png" alt="The team building together at the table." caption="Heads down, building together." />
          <Figure src="/pharmabotics/team-working-on-prototype.png" alt="The team building the prototype." caption="Wiring the prototype." />
          <Figure src="/pharmabotics/checking-endpoints.png" alt="Debugging the server endpoints." caption="Debugging the serial endpoints." />
        </div>

        <div className="grid items-start gap-8 border-y border-white/[0.06] py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#5EEAD4]">
              The feature we cut
            </div>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-[28px] font-normal leading-[1.15] text-white lg:text-[34px]" style={{ letterSpacing: '-0.02em' }}>
              Water Integration
            </h3>
            <Prose className="mt-5 max-w-[560px]">
              <p>
                We wanted to let users place a cup onto a pressure sensor, and then dispense water
                for them while they were also retrieving their pills. We ran into two problems.
              </p>
              <p>
                First, our motor was not reliable enough to lift a jug or bottle to pour. Second,
                while testing with a bottle, we spilled a bunch of water onto the sensor - leaving
                us one day before the showcase and a six-day wait for a replacement.
              </p>
              <p>
                So we changed our final sensor and scrapped the water-dispensing idea, turning the
                pressure sensor into a simpler refill lid instead. The messy part of innovation.
              </p>
            </Prose>
          </div>
          <Figure
            src="/pharmabotics/water-integration.png"
            alt="Testing the water idea: a DC motor and string rigged to tip a bottle and pour into a cup."
            caption="Us trying to raise and tip a bottle with a motor and string to pour water into a cup (2024)."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
            <div key={p.t} className="border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#5EEAD4]">{p.t}</div>
              <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
