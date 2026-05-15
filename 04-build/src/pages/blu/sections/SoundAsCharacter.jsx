import { SectionHead, PullQuote } from '../primitives.jsx'

const LAYERS = [
  {
    label: 'Layer 01',
    title: 'Atmospheric bed',
    body: 'Wind through bones, distant howls, the low hum of fog. Constant under Act 02 and Act 03 so the wasteland never feels neutral.',
  },
  {
    label: 'Layer 02',
    title: 'Diegetic threat',
    body: 'Footsteps, growls, the crack of brittle branches as something heavy moves through them. These cues arrive before the shadow does, so the audience expects the predator long before it appears.',
  },
  {
    label: 'Layer 03',
    title: 'Lumaland counterweight',
    body: 'Soft wind, distant birdsong, light grass rustle. Designed to feel pleasant for exactly as long as the audience needs it to, so the loss reads when the duckling crosses the sign.',
  },
]

export default function SoundAsCharacter() {
  return (
    <section id="sound-as-character" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="SOUND AS CHARACTER" title="The wolf is heard, never seen." />
      <div className="max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The antagonist of BLU is a wolf. The wolf is never fully shown. It exists in audio: howls in the distance, footsteps closing in, a low growl behind the wind. The audience builds the wolf inside their own head, which is the only place it can be more dangerous than anything we could have modeled.
        </p>
        <p>
          This was a creative call before it was a production call. I wanted the threat to feel ambient rather than animated. A wolf you can see is a wolf you can measure. A wolf you can only hear is a wolf the size of the room you are in. The film's tension lives in that gap.
        </p>
        <p>
          The production call sat underneath the creative one. A team of six, ten weeks, and a wolf that fully animates is a wolf that eats the schedule. Choosing audio over visual let our character animators stay focused on the duckling, where the emotional weight needed to land. Constraint and craft pointed in the same direction. I claimed both, in that order.
        </p>
      </div>

      <div className="mt-12">
        {/* TODO: download from Framer and self-host under /public/blu/char-wolf.png */}
        <img
          src="https://framerusercontent.com/images/m1xugKsyR8RUXDBIB0oGFdGdomc.png"
          alt="Concept render of the wolf antagonist. The wolf is barely visible, mostly shadow and silhouette, kept off-screen in the film."
          loading="lazy"
          className="block w-full rounded-lg border border-white/[0.06] bg-zinc-900/40 object-cover"
        />
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
          The wolf, concept reference. Kept off-screen in the final film.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {LAYERS.map((layer) => (
          <article key={layer.label} className="rounded-lg border border-zinc-800 p-6">
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#4FC3F7]">
              {layer.label}
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-[24px] font-normal tracking-[-0.02em] text-white lg:text-[28px]">
              {layer.title}
            </h3>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {layer.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <PullQuote>The unseen is louder.</PullQuote>
      </div>
    </section>
  )
}
