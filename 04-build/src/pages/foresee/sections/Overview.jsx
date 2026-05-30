import { SectionHead, Highlight } from '../primitives.jsx'

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="OVERVIEW" title="Predict the tab. Protect the vibe." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          ForeSee is a personal finance app built on top of RBC&rsquo;s Nomi. Instead of organizing spending by categories like &ldquo;food&rdquo; or &ldquo;entertainment&rdquo;, it organizes by the social contexts your money actually lives in: Work, Friends, Spouse, Personal. Every transaction has a social story.
        </p>
        <p>
          <Highlight>Calendar events feed in, Gemini classifies them into the right board and predicts the cost, and a voice coach speaks back to you with data-backed advice.</Highlight> We shipped it in a weekend at Mountain Madness 2026 and won Best Use of ElevenLabs.
        </p>
      </div>

      <figure className="mt-12 space-y-3">
        <img
          src="/foresee/interface.png"
          alt="ForeSee Spouse Board \u2014 an event timeline with actual and predicted spending traces."
          loading="lazy"
          className="w-full rounded-xl border border-white/[0.08]"
        />
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span className="text-[#A5B4FC]">Board view</span> &#xB7; spending laid out on a timeline, with the predicted trace extending past today
        </figcaption>
      </figure>
    </section>
  )
}
