import { SectionHead, Highlight } from '../primitives.jsx'

export default function Impact() {
  return (
    <section id="impact" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="IMPACT" title="Solve the cause, not the symptom." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          The brief asked for a marketing facelift. The field said the problem was further upstream. <Highlight>By running the workshops and trusting what the drivers said, we built a product that addresses the actual blocker — entry into the trade — instead of polishing the symptom.</Highlight>
        </p>
        <p>
          Designed for: lower barriers to entry, faster skill development, real peer support, and a direct line between drivers and the employers who need them.
        </p>
      </div>

      <p className="mt-12 text-center font-[family-name:var(--font-display)] text-2xl italic text-[#FF6B6B] md:text-3xl">
        The brief is rarely the problem. The field is where the problem lives.
      </p>
    </section>
  )
}
