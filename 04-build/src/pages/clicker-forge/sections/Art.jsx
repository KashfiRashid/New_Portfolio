import { SectionHead, Prose, Highlight } from '../primitives.jsx'

const PALETTE = [
  { hex: '#B5562A', name: 'copper' },
  { hex: '#C8A24B', name: 'bronze' },
  { hex: '#6B4A2F', name: 'wood' },
  { hex: '#8A8A93', name: 'steel' },
  { hex: '#241B0E', name: 'forge dark' },
]

const PRINCIPLES = [
  'Flat shapes and bold outlines, readable at game size.',
  'A warm, limited palette: copper, bronze, wood, steel.',
  'One vector library, reused across every room.',
]

const ASSETS = [
  { src: '/clicker-forge/art/furnace.svg', label: 'Furnace' },
  { src: '/clicker-forge/art/cauldron.svg', label: 'Smelter' },
  { src: '/clicker-forge/art/crucible.svg', label: 'Crucible' },
  { src: '/clicker-forge/art/copper-brick.svg', label: 'Copper' },
  { src: '/clicker-forge/art/sword-cast.svg', label: 'Sword molds' },
  { src: '/clicker-forge/art/sword.svg', label: 'Sword' },
  { src: '/clicker-forge/art/anvil.svg', label: 'Anvil' },
  { src: '/clicker-forge/art/hammer.svg', label: 'Hammer' },
  { src: '/clicker-forge/art/sign.svg', label: 'Sign' },
  { src: '/clicker-forge/art/window.svg', label: 'Window' },
  { src: '/clicker-forge/art/barrel.svg', label: 'Barrel' },
  { src: '/clicker-forge/art/chain.svg', label: 'Chain' },
]

function AssetTile({ src, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-white/[0.07] bg-[#c9b89a] p-4">
        <img src={src} alt={label} loading="lazy" className="h-full w-full object-contain" />
      </div>
      <span className="font-[family-name:var(--font-mono)] text-[9.5px] uppercase tracking-[0.14em] text-zinc-500">{label}</span>
    </div>
  )
}

export default function Art() {
  return (
    <section id="art" className="scroll-mt-28 border-t border-white/[0.06] py-16 lg:py-24">
      <SectionHead kicker="Art direction" title="Every asset, drawn by hand" />
      <Prose className="mb-10 max-w-[700px]">
        <p>
          I was the artist and the engineer. Before building rooms I set an{' '}
          <Highlight>art direction</Highlight> and held to it: flat vector shapes, bold outlines,
          and a warm medieval palette, all drawn in Figma.
        </p>
        <p>
          Then I built a <Highlight>reusable asset library</Highlight>, each piece exported as a
          clean SVG. Every room composes from the same parts, the same modular instinct as the
          code.
        </p>
      </Prose>

      {/* art direction spec */}
      <div className="mb-12 grid gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 lg:grid-cols-[auto_1fr] lg:gap-10 lg:p-8">
        <div>
          <p className="mb-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[#C8A24B]">Palette</p>
          <div className="flex gap-2">
            {PALETTE.map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-1.5">
                <span className="h-10 w-10 rounded-md border border-white/10" style={{ backgroundColor: c.hex }} />
                <span className="font-[family-name:var(--font-mono)] text-[8.5px] uppercase tracking-[0.1em] text-zinc-500">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[#C8A24B]">Principles</p>
          <ul className="space-y-2 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-300">
            {PRINCIPLES.map((p) => (
              <li key={p} className="flex gap-2"><span className="text-[#C8A24B]">+</span>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* SVG asset library */}
      <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#C8A24B]">The vector library (live SVG)</p>
      <div className="mb-16 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {ASSETS.map((a) => (
          <AssetTile key={a.src} src={a.src} label={a.label} />
        ))}
      </div>

      {/* Bellows: first draft to finished */}
      <h3 className="mb-3 font-[family-name:var(--font-display)] text-3xl text-white">The bellows: from sketch to motion</h3>
      <Prose className="mb-8 max-w-[700px]">
        <p>
          The bellows is where art and code meet. It began as a{' '}
          <Highlight>first draft</Highlight> sheet, the motion worked out across nine stages. I
          refined the shapes to read at game size, then looped them into the finished bellows.
        </p>
        <p>
          Then I wired it into Java. The frame advances with how fast you{' '}
          <Highlight>click</Highlight>, and the same input speeds the Perlin smoke. Drawing,
          animation, and mechanic are one gesture.
        </p>
      </Prose>

      <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
        <figure className="lg:col-span-1">
          <div className="flex items-center justify-center rounded-xl border border-white/[0.08] bg-[#7c7c7c] p-3" style={{ aspectRatio: '1 / 2' }}>
            <img src="/clicker-forge/1st-Draft-Bellows-9stages.png" alt="The bellows first draft: the motion worked out across nine stages in Figma." loading="lazy" className="h-full w-full object-contain" />
          </div>
          <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">First draft: nine stages</figcaption>
        </figure>
        <figure className="lg:col-span-2">
          <div className="flex items-center justify-center rounded-xl border border-white/[0.08] bg-[#1b1208] p-6" style={{ aspectRatio: '16 / 10' }}>
            <img src="/clicker-forge/Bellower.gif" alt="The finished, refined bellows animation." loading="lazy" className="h-full w-full object-contain" />
          </div>
          <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">The finished bellows. Its frame advances with your click rate in Java.</figcaption>
        </figure>
      </div>
    </section>
  )
}
// end Art.jsx
