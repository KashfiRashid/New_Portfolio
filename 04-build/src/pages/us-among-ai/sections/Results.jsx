import { SectionHead } from '../primitives.jsx'

export default function Results() {
  return (
    <section id="results" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="RESULTS" title="Best UI at SillyHacks 2026." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          We shipped a finished game, not a tech demo. It won <strong className="text-white">Best UI at SillyHacks 2026</strong>, hosted by SFU Surge.
        </p>
        <p>
          The aesthetic carried it: glowing plinths, scanlines, a retro-futuristic server room.
        </p>
      </div>
    </section>
  )
}
