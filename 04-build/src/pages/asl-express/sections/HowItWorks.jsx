import { SectionHead, Prose, Highlight, Figure, VideoFigure } from '../primitives.jsx'
import PipelineDiagram from '../diagrams/PipelineDiagram.jsx'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Under the hood" title="How a sign becomes an order" />
      <div className="space-y-12">
        <Prose className="max-w-[680px]">
          <p>
            Four people, one real-time loop. the camera and the recognition model are{' '}
            <Highlight>mine</Highlight> - my Signify model, refined by Rownak; Faaiz ran the
            backend, Riyan built the rig. I built the front end and wired it all into one
            system.
          </p>
        </Prose>

        <div>
          <PipelineDiagram />
          <p className="mt-5 text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            One pass: sign in, order out, confirmed back to the user.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <VideoFigure src="/asl-express/hardware-demo.mp4" poster="/asl-express/hardware-poster.jpg" caption="The rig running, live." />
          <Figure src="/asl-express/Hardware-Better-angle.jpg" alt="ESP32 rig wired on the breadboard." position="center" caption="ESP32-S3, sensor, buzzer, LEDs." />
          <Figure src="/asl-express/Hardware.jpg" alt="LCD reading: Order Fries, Qty 3." position="top" caption="The loop closing: a real order on the LCD." />
          <Figure src="/asl-express/Messy-layout.png" alt="The hackathon build table." position="center" caption="24 hours, one very full table." />
        </div>
      </div>
    </section>
  )
}
