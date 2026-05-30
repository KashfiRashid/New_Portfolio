import { SectionHead } from '../primitives.jsx'

const PROBLEMS = [
  { t: 'Pill precision', d: 'Cardboard sorters had inconsistent friction and dropped multiple pills. I redesigned the mechanism in Onshape and 3D-printed it - reliable single-pill rotation.' },
  { t: 'DC-motor drift', d: 'The two dispensing motors spun differently under the same signal. We hand-tuned PWM pulse sequences until each one landed a clean rotation.' },
  { t: 'Fingerprint limit', d: 'The sensor will not export print data. So we matched its on-device IDs (0-244) to MongoDB user IDs - identity without ever copying biometrics.' },
  { t: 'Knowing what to cut', d: 'The planned water dispenser kept soaking the pressure sensor and risking the electronics. We dropped it for a safer pressure-gated refill lid.' },
]

export default function HardProblems() {
  return (
    <section id="hard-problems" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Engineering judgment" title="The hard problems" />
      <div className="grid gap-4 sm:grid-cols-2">
        {PROBLEMS.map((p) => (
          <div key={p.t} className="border border-white/[0.08] bg-white/[0.02] p-6">
            <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#5EEAD4]">{p.t}</div>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
