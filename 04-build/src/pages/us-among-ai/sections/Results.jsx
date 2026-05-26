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
          The aesthetic carried it: glowing plinths, scanlines, a retro-futuristic server room. The Auditor makes players feel observed and judged on behaviours they&rsquo;d never normally think about: a hesitation before pressing Enter, an uneven rhythm. That feeling was the point, and we built the interface to land it.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        <img
          src="/us-among-ai/analyzing.png"
          alt="Us Among AI: behavioral data analysis screen"
          loading="lazy"
          className="w-full rounded-lg border border-white/10"
        />
        <img
          src="/us-among-ai/verdict.png"
          alt="Us Among AI: verdict screen, FLAGGED as human"
          loading="lazy"
          className="w-full rounded-lg border border-white/10"
        />
      </div>
    </section>
  )
}
