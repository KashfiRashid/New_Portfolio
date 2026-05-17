import { SectionHead } from '../primitives.jsx'

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="OVERVIEW"
        title="A guide that turns a wall of requirements into one step at a time."
      />
      <div className="mt-8 max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          DocuMentor is a mobile app for international students facing the administrative maze of studying abroad. It decomposes dense government processes into sequential micro-steps with visual progress, so a student faces one confident action at a time instead of an intimidating wall.
        </p>
      </div>
    </section>
  )
}
