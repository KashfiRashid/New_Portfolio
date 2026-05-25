import { SectionHead } from '../primitives.jsx'

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="REFLECTION" title="Atmosphere is half the mechanic." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          A clever idea becomes unforgettable when the interface, the sound, and the interaction design all say the same thing. Us Among AI isn&rsquo;t really about the tasks — it&rsquo;s about feeling audited.
        </p>
        <p>
          And the architecture scales. Today it reads keystrokes, timing, and movement — but every human micro-habit is a detection vector: mouse paths, scroll behaviour, even facial expression. The same pipeline could drive a multiplayer mode where one player becomes the live auditor, adaptive difficulty that learns your tells across runs, or real behavioural verification for fraud detection.
        </p>
      </div>
      <p className="mt-12 text-center font-[family-name:var(--font-display)] text-2xl italic text-[#3DE8B0] md:text-3xl">
        The AI isn&rsquo;t the enemy. Your own instincts are.
      </p>
    </section>
  )
}
