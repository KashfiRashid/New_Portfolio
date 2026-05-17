import { SectionHead, AppShot } from '../primitives.jsx'

const M = 'https://kashfirashid.com/media/documentor'

const ROWS = [
  {
    label: 'Rapid sketches · I set direction here',
    items: [
      { src: `${M}/sketch_1.png`, alt: 'First round of rapid sketches exploring DocuMentor directions.' },
      { src: `${M}/sketch_2.png`, alt: 'Second round of rapid sketches refining the direction.' },
    ],
  },
  {
    label: 'Wireframes · structure and flow',
    items: [
      { src: `${M}/1.png`, alt: 'Low-fidelity wireframe defining structure for the onboarding flow.' },
      { src: `${M}/3.png`, alt: 'Low-fidelity wireframe defining structure for the progress flow.' },
    ],
  },
  {
    label: "Concept development · team refinement",
    items: [
      { src: `${M}/4.png`, alt: 'Concept development screen showing visual refinement.' },
      { src: `${M}/5.png`, alt: 'Concept development screen iterating on UI direction.' },
    ],
  },
  {
    label: "Final UI · Kate's refinement on my structure",
    items: [
      { src: `${M}/6.png`, alt: 'Final UI screen with the applied design system.' },
      { src: `${M}/7.png`, alt: 'Second final UI screen showing the polished interface.' },
    ],
  },
]

export default function Build() {
  return (
    <section id="build" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE BUILD" title="Sketch, structure, refine." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The product moved from rapid sketches to wireframes to refined UI, with the micro-step logic held constant at every stage.
        </p>
      </div>

      <div className="mt-12 space-y-12">
        {ROWS.map((row) => (
          <div key={row.label}>
            <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              {row.label}
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {row.items.map((it) => (
                <AppShot key={it.src} src={it.src} alt={it.alt} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
