import { SectionHead } from '../primitives.jsx'

// Truthful reflection. Replaces both the harsh "shipped blind" version
// and the fabricated A/B-test growth version. Matches what Kash's live
// portfolio actually says: the redesign was not validated, and the case
// study names that gap rather than implying a proof that was never run.
const PARAGRAPHS = [
  "Three days taught me that a clear process is what makes constraint survivable. With no time to explore every direction, every interaction had to earn its place by tying back to a problem from the audit, not by looking good.",
  "The honest limit is the validation. I designed four interaction patterns I believed in and did not get to put them in front of a user or the client. If I ran this again with more time, the first thing I would add is usability testing. The redesign is a defensible set of decisions, not a proven one, and I want to be exact about which of those two it is.",
]

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="REFLECTION" title="Growing as an interaction designer." />
      <div className="max-w-[760px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        {PARAGRAPHS.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </section>
  )
}
