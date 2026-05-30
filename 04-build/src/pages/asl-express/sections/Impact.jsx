import { SectionHead, Prose, Stat } from '../primitives.jsx'

const NEXT = [
  'Full ASL alphabet recognition for a real vocabulary',
  'Voice feedback and confirmations via ElevenLabs',
  'Touchless kiosks in restaurants, hospitals, schools, airports',
  'On-device AI camera modules - drop the laptop dependency',
]

export default function Impact() {
  return (
    <section id="impact" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Why it matters" title="A small thing, done with dignity" />
      <div className="space-y-10">
        <Prose className="max-w-[700px]">
          <p>
            For a deaf or non-verbal person, ordering food can mean writing notes, pointing,
            or bringing someone along to speak for you. ASL Express removes the middleman for
            one everyday task - and for a marginalized community, removing the middleman is
            the difference between being served and being independent.
          </p>
          <p>
            <span className="text-[#6EE7B7]">Why we built it as a demo:</span> a hackathon
            gave us 24 hours to prove the whole loop end-to-end and validate the use case
            before betting on it. four gestures was enough to show the system works for a
            real person; Best Hardware was the signal the bounded approach is worth scaling.
            you de-risk the big version by shipping the small one first.
          </p>
          <p>
            And it does scale - the same recognition core grows in obvious directions:
          </p>
        </Prose>

        <div className="grid gap-3 sm:grid-cols-3">
          <Stat value="4+1" label="gestures: A/B/C, quantity, done" />
          <Stat value="3" label="layers integrated into one loop" />
          <Stat value="24h" label="built at StormHacks 2025" />
        </div>

        <ul className="space-y-2 border-l border-[#10B981]/40 pl-6">
          {NEXT.map((n) => (
            <li key={n} className="font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">{n}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
