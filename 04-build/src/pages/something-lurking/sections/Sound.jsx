import { SectionHead, PullQuote } from '../primitives.jsx'
import SoundPipelineDiagram from '../diagrams/SoundPipelineDiagram.jsx'
import SoundMoments from '../diagrams/SoundMoments.jsx'

export default function Sound() {
  return (
    <section id="sound" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="SOUND AS ARCHITECTURE" title="The antagonist is the sound." />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The unseen presence has no visual model. We agreed early that the threat is more frightening implied than shown. That decision put the entire antagonist budget on the sound layer. The shift in the ship's ambient layer when the player crosses a threshold. The voice line at the edge of audibility. The mechanical groan from a corridor the player has not entered yet. The growl that follows the escape pod.
        </p>
        <p>
          I built the character voices in Eleven Labs and treated each one in Audacity to sit inside the geometry of the scene: reverb to match the corridor, EQ to suggest distance through metal, subtle pitch variation to suggest something not quite human breathing nearby. Environmental cues, footsteps and alarms and the banging on the door, were authored in Audacity directly. The voices feel diegetic because they were processed diegetically.
        </p>
      </div>

      <div className="mt-16">
        <SoundPipelineDiagram />
      </div>

      <div className="mt-20">
        <p className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          The five sound beats that carry the story
        </p>
        <SoundMoments />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border border-white/[0.06] bg-white/[0.02] p-6">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Act I sound brief
          </p>
          <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
            Captain Harry on the radio. Friendly. Routine. A low hum from the station's systems. Footsteps on metal. The room sounds inhabited.
          </p>
        </div>
        <div className="border border-[#6E3FB3]/30 bg-[#6E3FB3]/[0.04] p-6">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#9268E0]">
            Act III sound brief
          </p>
          <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-200">
            Alarms. Banging on a door from the outside. The escape pod hisses shut. Then, from behind Jack, the growl that ends the experience without resolving it.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <PullQuote>
          The sound is the antagonist because the antagonist is never shown.
        </PullQuote>
      </div>
    </section>
  )
}
