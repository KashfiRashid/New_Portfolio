import { SectionHead, Highlight } from '../primitives.jsx'

export default function Build() {
  return (
    <section id="the-build" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE BUILD" title="Gemini as a load-bearing wall." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          The frontend is Next.js, React, and TypeScript. Zustand runs the whole game at 60fps game-loop speed — player position, task sequencing, the live suspicion meter, and eleven behavioral metrics: key timings, typing bursts, corrections, movement smoothness, hesitations, over-precision, backspace attempts, thinking pauses, and response latencies.
        </p>
        <p>
          <Highlight>The backend is Express and Socket.IO, with Gemini wired in as four endpoints — one per task.</Highlight> A keystroke buffer holds your last fifty inputs; every 30 seconds an AIEvaluator service packages that telemetry, sends it to Gemini 1.5 Flash, and gets back a humanness score from 0 to 100 with clinical reasoning — feeding straight into the live suspicion bar.
        </p>
        <p>
          Gemini judges patterns, not perfection — there is built-in tolerance for human error, so it is the rhythm of your mistakes that gives you away, not the mistakes themselves. The audio tasks run on the raw Web Audio API, and the whole thing wears a custom oklch neon system: scanlines, a cyber-grid, and a per-color glow.
        </p>
      </div>
    </section>
  )
}
