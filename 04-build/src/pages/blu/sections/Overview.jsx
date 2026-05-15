import { SectionHead } from '../primitives.jsx'

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="OVERVIEW" title="A short film about desire, and the line you cross to follow it." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          BLU is a three-act CG animated short produced in IAT 343 over the summer of 2025. A team of six built it across roughly ten weeks. A curious duckling crosses out of a glowing meadow into a wasteland it was warned to avoid, chasing a blue feather that is beautiful and probably not safe.
        </p>
        <p>
          I came in as Creative Director. I held the vision, made the calls on tone and aesthetic, and pitched the central concept the team built around. From there I owned two production roles: I modeled both environments (Lumaland and The Dims), and I designed the sound, including the unseen wolf that carries the third act through audio alone.
        </p>
      </div>
    </section>
  )
}
