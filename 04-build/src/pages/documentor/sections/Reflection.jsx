import { SectionHead } from '../primitives.jsx'

// Growth-voice reflection, kept near the live portfolio voice and
// sharpened around the bias-check angle. Three short paragraphs.
const PARAGRAPHS = [
  "This project taught me that personal experience is a design asset only if you are willing to test it against people who are not you. I started with my own frustration. I did not let it become the brief.",
  "Leading Kate and Mariyam taught me to balance vision with execution: hold the through-line, trust specialists with their craft, and make sure the core idea survives from research into the final screen.",
  "More than anything, I grew into a designer who designs not just for usability, but for empathy and impact, with the discipline to check that the empathy is evidenced and not assumed.",
]

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="REFLECTION" title="Growing as a designer." />
      <div className="max-w-[760px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        {PARAGRAPHS.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}
