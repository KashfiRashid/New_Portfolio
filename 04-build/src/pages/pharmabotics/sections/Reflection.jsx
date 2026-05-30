import { SectionHead, Prose, Highlight } from '../primitives.jsx'

const BETTER = [
  { t: 'Test the motors first', d: 'The DC-motor drift cost us days. We should have validated the motors before designing the whole mechanism around them.' },
  { t: 'Size the enclosure last', d: 'We built a big box early, then ran out of time to shrink it once the water tank was cut.' },
  { t: 'Cut faster', d: 'We spent 20+ hours fighting the water dispenser before admitting it had to go.' },
  { t: 'One source of truth', d: 'The dosing-schedule logic ended up split between the server and a dead stub - it should live in one place.' },
]

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Reflection" title="What I took from it" />
      <div className="space-y-10">
        <Prose className="max-w-[700px]">
          <p>
            Hardware is humbling. a UI bug you hotfix; a sorter that drops two pills you have to
            re-print. designing for{' '}
            <Highlight>mechanical reliability - not just a working demo</Highlight> - changed what
            &ldquo;done&rdquo; means to me.
          </p>
          <p>
            It is also the project that proved I can take something from a sketch to a working
            physical product, across software and hardware both. that range is the part I am
            proudest of here.
          </p>
        </Prose>
        <div>
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#5EEAD4]">What we would do differently</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {BETTER.map((b) => (
              <div key={b.t} className="border border-white/[0.08] bg-white/[0.02] p-6">
                <div className="font-[family-name:var(--font-sans)] text-base text-white">{b.t}</div>
                <p className="mt-2 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
