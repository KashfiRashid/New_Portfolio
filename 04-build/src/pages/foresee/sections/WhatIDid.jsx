import { SectionHead, Highlight } from '../primitives.jsx'

export default function WhatIDid() {
  return (
    <section id="what-i-did" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="WHAT I DID" title="I built the part of the voice coach that feels alive." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          The voice coach was the moment in the demo. Harjot built the streaming pipeline behind it: GPT-4o-mini for the text, ElevenLabs for the voice, both flowing over Server-Sent Events in parallel so the coach starts speaking before the model is done thinking. My job was the front of that pipeline: <Highlight>the emotional bubble you actually talk to.</Highlight>
        </p>
        <p>
          The bubble breathes when it&rsquo;s idle. It shifts colors and pulse from a soft blue listening state to a calm green when the coach is speaking back. The motion syncs to the audio stream, so the visual reaction and the voice land together.
        </p>
        <p>
          The point was to make it feel like something living, not a text box with a play button. When you ask the coach about your spending, you should feel like something is listening back.
        </p>
      </div>

      <figure className="mt-12 space-y-3">
        <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-950">
          <video
            src="/foresee/Voice_orb.mp4"
            poster="/foresee/Voice_orb.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="The ForeSee voice coach bubble — live, breathing, and reacting to the coach's voice."
            className="block h-auto w-full"
          />
        </div>
        <figcaption className="text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span className="text-[#A5B4FC]">Voice coach</span> · listening → speaking → settled
        </figcaption>
      </figure>
    </section>
  )
}
