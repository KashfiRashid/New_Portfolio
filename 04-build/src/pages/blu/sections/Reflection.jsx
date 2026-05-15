import { SectionHead } from '../primitives.jsx'

const PROMPTS = [
  'What did being Creative Director on a team of six teach you?',
  'What would you do differently on the environment work given more time?',
  'What did the sound-as-character constraint teach you about working within production limits?',
  'Would you take a creative direction role again? Under what conditions?',
]

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="REFLECTION" title="What I'd do differently." />
      <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#4FC3F7]">
        Placeholder. To be filled by Kash.
      </p>
      <div className="mt-6 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          REFLECTION CONTENT TO BE FILLED BY KASH. The autonomous build left this section as a placeholder rather than fabricate a reflection in Kash's voice. The four prompts below are the seeds. Two paragraphs in the cadence of the BC Connect Reflection section is the target shape.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          {PROMPTS.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
