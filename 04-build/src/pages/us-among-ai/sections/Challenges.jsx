import { SectionHead } from '../primitives.jsx'

export default function Challenges() {
  return (
    <section id="challenges" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CHALLENGES" title="What 'too human' looks like." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          Tracking inputs was easy. Deciding what &ldquo;too human&rdquo; looks like at a threshold level was the real problem. Making the behaviour analysis feel earned instead of random took far more tuning than we expected, deep into the night.
        </p>
        <p>
          Spatial interactions fought back too. Because the game is browser-based and coordinate-dependent, hitboxes and render scaling had to be handled carefully across screen sizes, or the whole thing fell apart. There was a brief period where clicking one plinth teleported your cursor somewhere else entirely.
        </p>
      </div>
    </section>
  )
}
