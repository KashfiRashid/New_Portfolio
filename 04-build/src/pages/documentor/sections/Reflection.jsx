import { SectionHead, Highlight } from '../primitives.jsx'

const PARAGRAPHS = [
  "Leading Kate and Mariyam taught me to balance vision with execution: hold the through-line, trust specialists with their craft, and make sure the core idea survives from research into the final screen.",
  "Most of all, I learned to design with empathy, and to check that the empathy is evidenced and not just assumed.",
]

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="REFLECTION" title="Growing as a designer." />
      <div className="max-w-[760px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          This project taught me that personal experience is a design asset only if you are willing to test it against people who are not you. I started with my own frustration. <Highlight>I did not let it become the brief.</Highlight>
        </p>
        {PARAGRAPHS.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}
