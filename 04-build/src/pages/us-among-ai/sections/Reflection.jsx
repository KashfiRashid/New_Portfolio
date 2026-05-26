import { SectionHead } from '../primitives.jsx'

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="REFLECTION" title="Looking back." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          Us Among AI isn&rsquo;t really about the tasks. It&rsquo;s about feeling audited. The interface, the sound, and the interaction design all say the same thing, and that&rsquo;s where it lands.
        </p>
        <p>
          The architecture scales. Today it reads keystrokes, timing, and movement, but every human micro-habit is a detection vector: mouse paths, scroll behaviour, even facial expression. The same pipeline could drive a multiplayer mode where one player becomes the live auditor, adaptive difficulty that learns your tells across runs, or real behavioural verification for fraud detection.
        </p>
      </div>
      <p className="mt-12 text-center font-[family-name:var(--font-display)] text-2xl italic text-[#3DE8B0] md:text-3xl">
        The AI isn&rsquo;t the enemy. Your own instincts are.
      </p>
    </section>
  )
}
