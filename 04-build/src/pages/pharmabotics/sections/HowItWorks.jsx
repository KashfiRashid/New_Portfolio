import { SectionHead, Prose, Figure } from '../primitives.jsx'
import SystemDiagram from '../diagrams/SystemDiagram.jsx'
import SerialProtocol from '../diagrams/SerialProtocol.jsx'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="How it works" title="The full loop, end to end" />
      <div className="space-y-12">
        <Prose className="max-w-[680px]">
          <p>
            Three layers talk to each other in real time: a React client, a Node/Express server
            with MongoDB, and an Arduino Uno running the sensors and motors. The server is also
            the bridge - REST to the browser, raw serial to the board.
          </p>
        </Prose>
        <div>
          <SystemDiagram />
          <p className="mt-4 text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">React client / Node server + MongoDB / Arduino + sensors.</p>
        </div>
        <div>
          <SerialProtocol />
          <p className="mt-4 text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">The actual serial exchange, read from server.js + connectarduino.ino.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:items-start">
          <Figure src="/pharmabotics/circuit-schematic.png" alt="The PharmaBotics circuit schematic with labeled pins, sensors, and motors." aspect="4 / 5" caption="The real wiring schematic." />
          <Figure src="/pharmabotics/finger-print-green-signal.png" alt="The fingerprint sensor lighting green on a successful match." aspect="4 / 3" caption="Auth pass: the sensor glows green, LEDs confirm." />
        </div>
      </div>
    </section>
  )
}
