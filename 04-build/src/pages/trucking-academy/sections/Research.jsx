import { SectionHead, Highlight } from '../primitives.jsx'

const PERSONAS = [
  { src: '/trucking-academy/P1.png', label: 'Persona 1', name: 'Fleet Manager' },
  { src: '/trucking-academy/P2.jpg', label: 'Persona 2', name: 'Solo Operator' },
  { src: '/trucking-academy/P3.png', label: 'Persona 3', name: 'Junior Driver' },
]

export default function Research() {
  return (
    <section id="research" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="RESEARCH PROCESS" title="Ten drivers. Three personas. One workshop." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          I interviewed ten real truck drivers across experience levels and mapped the journey for each. From the field I built three sharply different personas: a Fleet Manager balancing dispatch and compliance, a Solo Operator on the road for weeks, and a Junior Driver figuring out the certification ladder for the first time.
        </p>
        <p>
          <Highlight>Then I ran a participatory workshop with eight participants spanning 0 to 20 years of experience.</Highlight> They co-mapped what onboarding into the industry actually looks like in 2024. The pain points were consistent across all three personas, and that consistency is what unlocked the design direction.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PERSONAS.map((p) => (
          <figure key={p.label} className="space-y-3">
            <div className="w-full overflow-hidden rounded-lg border border-white/[0.08] bg-zinc-900">
              <img
                src={p.src}
                alt={`${p.label} \u2014 ${p.name}`}
                loading="lazy"
                className="block w-full h-auto"
              />
            </div>
            <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              <span className="text-[#FF6B6B]">{p.label}</span> &#xB7; {p.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
