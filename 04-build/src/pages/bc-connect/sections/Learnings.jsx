import { SectionHead, Highlight } from '../primitives.jsx'

const LEARNINGS = [
  {
    kicker: '01',
    title: 'I was the only one holding the interface.',
    body: 'My teammates were solving real backend problems: auth, schema, API design. Nobody else was going to stop and ask whether a hover state felt right. I made the restraint calls alone, with no one to pressure-test them. The system was the easy part. Holding the vision solo and fast, while still shipping, was the work.',
  },
  {
    kicker: '02',
    title: 'A system is the cheapest decision a team can make.',
    body: (
      <>
        Open Ground took about a week of front-loaded work. Every component after it cost a fraction of what it would have without it. The cards in the directory are the cards in the dashboard, and the auth surface inherits the same tokens as everything else.{' '}
        <Highlight>Front-loaded restraint pays back at compounding rates.</Highlight>
      </>
    ),
  },
  {
    kicker: '03',
    title: "I'd do this again, with one change.",
    body: 'I would take the design lead role again without hesitating. But I would negotiate one thing going in: a weekly thirty-minute design review with one teammate, designer or not, just someone to say this feels off or this makes sense. Restraint without pressure-testing is faith. Restraint after pressure-testing is rigor.',
  },
]

export default function Learnings() {
  return (
    <section id="learnings" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="LEARNINGS" title="What I learned." />
      <div className="space-y-10">
        {LEARNINGS.map((learning) => (
          <div key={learning.kicker}>
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#1B6B4F]">
              {learning.kicker}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[22px] font-normal tracking-[-0.02em] text-white lg:text-[26px]">
              {learning.title}
            </h3>
            <p className="mt-3 max-w-[720px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
              {learning.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
