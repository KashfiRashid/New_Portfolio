import { SectionHead, Highlight } from '../primitives.jsx'

export default function Sound() {
  return (
    <section id="sound" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="SOUND AS ARCHITECTURE" title="The antagonist is the sound." />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The unseen presence has no visual model. We agreed early that the threat is more frightening implied than shown. <Highlight>That decision put the entire antagonist budget on the sound layer.</Highlight>
        </p>
        <p>
          I built the character voices in Eleven Labs and treated each one in Audacity to sit inside the geometry of the scene: reverb to match the corridor, EQ to suggest distance through metal, subtle pitch variation to suggest something not quite human breathing nearby.
        </p>
      </div>
    </section>
  )
}
