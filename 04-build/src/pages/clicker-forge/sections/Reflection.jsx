import { SectionHead, Prose, Highlight } from '../primitives.jsx'

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 border-t border-white/[0.06] py-16 lg:py-24">
      <SectionHead kicker="Reflection" title="What it taught me" />
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Prose>
          <p>
            This is where object-oriented programming clicked for me. Writing a base class, a
            factory, and a decorator chain, then watching them make new features cheap to add,
            taught me to <Highlight>design before I typed</Highlight>.
          </p>
          <p>
            It also showed me the value of being both artist and engineer. Because I drew every
            sprite myself, I could tune the art and the code together until the feel was right.
          </p>
          <p>
            If I came back to it, I would split the 1,327 line panel into smaller state handlers
            and lift the hard coded coordinates into a config. But the bones are sound.
          </p>
        </Prose>
        <div className="space-y-4 self-start rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#C8A24B]">Took away</p>
          <ul className="space-y-3 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-300">
            <li>Abstraction, factory, and decorator patterns in real use</li>
            <li>State machines as a way to tame game flow</li>
            <li>Procedural graphics with Perlin noise and recursion</li>
            <li>Graphics2D transforms, sprites, and event handling</li>
            <li>Designing architecture before writing features</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
// end Reflection.jsx
