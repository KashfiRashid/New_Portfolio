import { SectionHead } from '../primitives.jsx'

const PARAGRAPHS = [
  "I shipped a progressive disclosure model I believe in architecturally but never validated. I wanted real user testing on the auth gate to know whether visitors understood why they were hitting a wall before they could save a startup or submit one. The time pressure cost me that. Whether visitors hit the wall and turn around or hit the wall and sign up, I genuinely don't know.",
  'I would also have done one round of accessibility work I never got to. Color contrast audits, keyboard navigation testing, semantic HTML pass, ARIA roles on the filter pills and the moderation queue. The system supports it. I just never got the hours.',
]

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="REFLECTION" title="What I'd do differently with more time." />
      <div className="max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        {PARAGRAPHS.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </section>
  )
}
