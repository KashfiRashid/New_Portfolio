import { SectionHead, Prose, Highlight } from '../primitives.jsx'

export default function Decision() {
  return (
    <section id="decision" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="The pivot / 2025" title="Giving the brain a body and a job" />
      <div className="space-y-8">
        <Prose className="max-w-[720px]">
          <p>
            So at StormHacks 2025 we didn&rsquo;t start over - we took Signify&rsquo;s
            recognition core and pointed it at one bounded, high-value task instead of all
            of language. the move was deliberate: stop trying to translate everything, and
            do one real thing completely.
          </p>
          <p>
            We picked ordering food - without speech, without touching a shared screen,
            without needing a person to translate for you. a drive-thru, a counter, a
            kiosk: the exact places where the communication gap stops being abstract and
            becomes a daily friction for deaf and non-verbal people.
          </p>
          <p>
            <Highlight>ASL Express is Signify with a body and a job.</Highlight> the same
            YOLO + FastText recognition core carried straight over - Rownak fine-tuned
            it for the hackathon, Gemini was added to map a gesture to intent, a real ordering interface, and an ESP32 rig
            that confirms the order out loud, on screen, and in light. the research became
            a product you could walk up to and use.
          </p>
          <p className="text-zinc-400">
            The point was never convenience. it was doing an ordinary thing on your own
            terms - independence and dignity, not a workaround.
          </p>
        </Prose>

        <div className="grid gap-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] sm:grid-cols-2">
          <div className="border border-white/[0.08] bg-white/[0.02] p-5">
            <div className="text-zinc-500">Signify (2024)</div>
            <div className="mt-2 font-[family-name:var(--font-sans)] text-sm normal-case tracking-normal text-zinc-300">
              General ASL to text. A recognition brain. Research-scale, hard to ship.
            </div>
          </div>
          <div className="border border-[#10B981]/30 bg-[#10B981]/[0.05] p-5">
            <div className="text-[#6EE7B7]">ASL Express (2025)</div>
            <div className="mt-2 font-[family-name:var(--font-sans)] text-sm normal-case tracking-normal text-zinc-200">
              One bounded job: touchless ordering. Same core, plus intent, UI, and hardware.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
