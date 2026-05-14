import { SectionHead } from '../primitives.jsx'

const LEARNINGS = [
  {
    kicker: '01',
    title: 'I was the only one thinking about the interface the whole time.',
    body: 'My teammates were solving real backend problems. Auth, MongoDB schema, API design. Nobody was going to stop and ask whether the card hover state felt right. That was mine to hold. I made restraint calls and had no one to pressure-test them with. I just had to trust them. The system was the easy part. Holding the design vision alone, fast, while also trying to ship, was the work.',
  },
  {
    kicker: '02',
    title: 'A system is the cheapest decision a team can make.',
    body: 'Open Ground took maybe a week of front-loaded work. Every component built afterward took a fraction of what it would have without it. The cards in the directory are the cards in the dashboard. The auth surface inherits the same tokens as everything else. Front-loaded restraint pays itself back at compounding rates. Build the system first.',
  },
  {
    kicker: '03',
    title: "I'd do this again. With one negotiation.",
    body: `Yes, I'd take the design system lead role again. The work was good and I'd take it again. But I'd negotiate one thing going in: a weekly 30-minute design review with at least one teammate, even if they're not a designer. Just someone to say "this feels off" or "this makes sense." Flying solo the whole time is what I'd do differently. Restraint without pressure-testing is faith. Restraint after pressure-testing is rigor.`,
  },
]

export default function Learnings() {
  return (
    <section id="learnings" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="LEARNINGS" title="What I learned, in my own words." />
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
