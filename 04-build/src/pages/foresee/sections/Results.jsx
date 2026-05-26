import { SectionHead } from '../primitives.jsx'

export default function Results() {
  return (
    <section id="results" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="RESULTS" title="Best Use of ElevenLabs at Mountain Madness 2026." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          ForeSee won the <strong className="text-white">[MLH] Best Use of ElevenLabs</strong> prize at Mountain Madness 2026, hosted by CSSS at SFU. The voice coach was the moment in the demo. People reacted to the coach speaking instantly more than they did to anything else on the page.
        </p>
        <p>
          The emotional bubble landed in particular because the audio and the visual hit together. Hearing the coach start mid-sentence while the bubble breathed in time made the agent read as something present, not as a recording playing back.
        </p>
      </div>

      <figure className="mt-12 space-y-3">
        <img
          src="/foresee/saving.png"
          alt="A ForeSee board mid-celebration — confetti raining down over a smart-spending suggestion the board just completed together."
          loading="lazy"
          className="w-full rounded-xl border border-white/[0.08]"
        />
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span className="text-[#A5B4FC]">Saving challenge</span> · completing a suggestion as a board fires confetti for the whole group
        </figcaption>
      </figure>
    </section>
  )
}
