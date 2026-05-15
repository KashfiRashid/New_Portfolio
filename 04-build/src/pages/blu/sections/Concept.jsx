import { SectionHead } from '../primitives.jsx'

const ACTS = [
  {
    kicker: 'ACT 01',
    title: 'The grove, and the warning at the edge.',
    body: 'In a peaceful, glowing green grove, a duckling runs around happily and plays. On the other end, a barren land lies with a sign at the border. The sign reads: "DO NOT ENTER. NO LIFE BEYOND." As night falls, the duckling sees a blue glistening feather flickering just past the barrier. Ignoring the warning, it watches and steps toward it.',
  },
  {
    kicker: 'ACT 02',
    title: 'Into the barren land, behind the feather.',
    body: 'The duckling follows the blue glistening feather into the barren land. The feather hovers, then moves forward. Distant sounds emerge: a growl, wind through bones, the crack of brittle branches. The duck navigates past swamps that pull at its feet, whispers in the wind, and a gust storm that almost blows it away. Each time it doubts, the feather glistens to get back its attention. The duck continues its chase.',
  },
  {
    kicker: 'ACT 03',
    title: 'The shadow, the ledge, and the cut to black.',
    body: 'A howl is heard and a shadow rushes by. The duckling panics and slips, falling into a crevice. The blue glistening feather floats just ahead. The duck musters courage, climbs out, and reaches a cliff ledge. The shadow grows on top of the duck, as if coming closer. Right when the shadow lunges, the scene cuts to black. After the credits, the feather is seen falling into the ground on top of a pile of bones and losing its shine.',
  },
]

export default function Concept() {
  return (
    <section id="concept" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CONCEPT" title="Desire, and the line you cross to follow it." />
      <div className="max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Breaking the rules by following desires has become the philosophy of our age. The film asks what happens when desire wins, every time. Not a moral lecture. A short, quiet warning, told through one duckling, one feather, and a wasteland that already knows the ending.
        </p>
        <p>
          The story works in three acts. Each one tightens the screw. The grove is safe. The wasteland is not. The feather is a promise the world will not keep.
        </p>
      </div>

      <div className="mt-12 space-y-10">
        {ACTS.map((act) => (
          <div key={act.kicker}>
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#4FC3F7]">
              {act.kicker}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[22px] font-normal tracking-[-0.02em] text-white lg:text-[26px]">
              {act.title}
            </h3>
            <p className="mt-3 max-w-[720px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
              {act.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-12 font-[family-name:var(--font-mono)] text-sm italic text-zinc-500">
        Moderation in everything. Sometimes reason and rules should win over desire.
      </p>
    </section>
  )
}
