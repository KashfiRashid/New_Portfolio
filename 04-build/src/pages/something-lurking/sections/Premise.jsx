import { SectionHead } from '../primitives.jsx'
import ThreeActStructure from '../diagrams/ThreeActStructure.jsx'

export default function Premise() {
  return (
    <section id="premise" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE PREMISE" title="The ship is failing. You are the only one left." />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Jack starts the shift in the corridor with Captain Harry on the radio. A routine fix. A fusebox on the upper deck needs a wiring repair. Jack shrinks to 1:100 to climb inside the box and finish the job.
        </p>
        <p>
          Then the power dies. The captain's radio cuts. Jack finds the captain's cracked helmet alone in the dark. To restore the station Jack has to navigate the vents and shrink again, this time to 1:1000, to repair the main computer from inside its chip-space.
        </p>
        <p>
          Throughout the experience something else is on the ship. Sound cues build tension. Environmental details suggest watching. The presence is never visually resolved. The threat is implied. By design.
        </p>
      </div>

      {/* Three-scale grid — one panel per scale, captioned individually.
          Lets each scale carry its own beat instead of collapsing them
          into a single thumbnail strip. */}
      <div className="mt-12">
        <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          The three scales
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              src: '/something-lurking/scale-1to1.png',
              scale: '1:1',
              label: 'Corridor',
              caption: 'Jack starts here. The captain is on the radio. The ship feels broken but stable.',
            },
            {
              src: '/something-lurking/scale-1to100.png',
              scale: '1:100',
              label: 'Fusebox',
              caption: 'Wires and fuses by hand. The first proof that scaling has a job to do.',
            },
            {
              src: '/something-lurking/scale-1to1000.png',
              scale: '1:1000',
              label: 'Chip-space',
              caption: 'Bioluminescent green. Circuit completion at the smallest scale. The ship\'s nervous system.',
            },
          ].map((panel) => (
            <figure key={panel.scale} className="flex flex-col gap-3 border border-white/[0.06] bg-white/[0.02] p-3">
              <img
                src={panel.src}
                alt={`The ${panel.label} environment at ${panel.scale} scale.`}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-sm object-cover"
              />
              <figcaption className="px-1 pb-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#6E3FB3]">
                    {panel.scale}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-lg italic text-white">
                    {panel.label}
                  </span>
                </div>
                <p className="mt-2 font-[family-name:var(--font-sans)] text-[13px] leading-relaxed text-zinc-400">
                  {panel.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <ThreeActStructure />
      </div>
    </section>
  )
}
