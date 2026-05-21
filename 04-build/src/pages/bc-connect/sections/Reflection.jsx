import { SectionHead, Highlight } from '../primitives.jsx'

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="REFLECTION" title="What I'd do differently with more time." />
      <div className="max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          <Highlight>The hard part was never the design. It was integration.</Highlight> Merge conflicts across branches, environments that behaved differently on different machines, things breaking for no reason I could see until I traced them. The system held. Getting four streams of work to agree was the real test.
        </p>
        <p>
          With another week I would have put the auth gate in front of real users instead of trusting the model behind it. I shipped a progressive-disclosure flow I believe in but never watched anyone use. I would also have run the accessibility pass the system was built to support and never got the hours for: contrast audits, keyboard paths, semantic structure, ARIA on the filter pills and the moderation queue. The foundation was strong. I know what I would have built on it.
        </p>
      </div>
    </section>
  )
}
