import { SectionHead, Highlight } from '../primitives.jsx'

export default function Build() {
  return (
    <section id="the-build" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE BUILD" title="Multi-model AI, running in parallel." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          Frontend: React, TypeScript, shadcn/ui. Backend: Express + Supabase (PostgreSQL). A four-step Gemini pipeline handles every calendar event: classification, cost prediction, then o3 generates structured savings suggestions.
        </p>
        <p>
          <Highlight>The voice coach runs GPT-4o-mini and ElevenLabs in parallel over Server-Sent Events.</Highlight> A sentence splitter buffers tokens and fires off TTS the moment a sentence completes, while the language model keeps generating. The bubble I built syncs to that audio stream in real time.
        </p>
      </div>
      <figure className="mt-12 space-y-3">
        <img
          src="/foresee/suggestion.png"
          alt="A smart spending suggestion card."
          loading="lazy"
          className="w-full rounded-xl border border-white/[0.08]"
        />
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span className="text-[#A5B4FC]">Smart spending</span> · o3 returns a save-amount, a confidence, and a reason
        </figcaption>
      </figure>
    </section>
  )
}
