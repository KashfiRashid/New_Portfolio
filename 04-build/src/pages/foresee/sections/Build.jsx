import { SectionHead, Highlight } from '../primitives.jsx'

export default function Build() {
  return (
    <section id="the-build" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE BUILD" title="Multi-model AI, running in parallel." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          Frontend: React, TypeScript, shadcn/ui, on a zinc/white/indigo design system. Backend: Express and TypeScript with Supabase (PostgreSQL) as the data layer, seven tables driving boards, events, transactions, and suggestions.
        </p>
        <p>
          A four-step pipeline handles every calendar event: a webhook fires, Gemini 3 Flash classifies the event into the right social board, Gemini predicts a cost from your history at similar events, and OpenAI o3 generates structured savings suggestions with confidence scores. Users never touch it. The event arrives and the work happens behind the page.
        </p>
        <p>
          <Highlight>The voice coach runs GPT-4o-mini and ElevenLabs in parallel over Server-Sent Events.</Highlight> A sentence splitter buffers text tokens, and the moment a sentence completes it fires off ElevenLabs TTS while the language model keeps generating. The bubble I built syncs to that audio stream in real time, so the visual reaction and the voice land together.
        </p>
      </div>

      <figure className="mt-12 space-y-3">
        <img
          src="/foresee/suggestion.png"
          alt="A smart spending suggestion card with a save-amount, a confidence bar, and a vote button — the o3 output landing in the board."
          loading="lazy"
          className="w-full rounded-xl border border-white/[0.08]"
        />
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span className="text-[#A5B4FC]">Smart spending</span> · o3 returns a save-amount, a confidence, and a reason. Board members vote.
        </figcaption>
      </figure>
    </section>
  )
}
