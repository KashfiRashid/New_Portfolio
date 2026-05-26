import { SectionHead } from '../primitives.jsx'

export default function Concept() {
  return (
    <section id="concept" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE CONCEPT" title="Can you pass as a machine?" />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          It started as a 2am question: what if Among Us, but the AI is the crewmate? We wanted to flip the usual prompt (&ldquo;can a machine pass as a human?&rdquo;) on its head.
        </p>
        <p>
          The more interesting question now isn&rsquo;t whether machines can imitate us. It&rsquo;s whether we can imitate them. Can you pass as a boring, rhythmically perfect, emotionless algorithm?
        </p>
      </div>
    </section>
  )
}
