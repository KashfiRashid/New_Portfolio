import { SectionHead, Prose } from '../primitives.jsx'

const GAMES = [
  {
    name: 'Jacksmith',
    line: 'Flipline&apos;s 2012 flash game, where a donkey blacksmith forges weapons for warrior clans. Its hands-on crafting and warm cartoon art set my whole direction.',
    shots: [
      { src: '/clicker-forge/Jack_smith.png', cap: 'the shop: craft to order' },
      { src: '/clicker-forge/Jack_smith_Smelter.png', cap: 'the smelter, with a bellows to pump' },
    ],
  },
  {
    name: 'Minecraft',
    line: 'Smelting ore in a furnace, raw block to ingot. That raw-to-made loop is the core of Clicker Forge.',
    shots: [
      { src: '/clicker-forge/Minecraft_furnace_Smleters.png', cap: 'furnaces' },
      { src: '/clicker-forge/Minecraft_Smelting_Process.png', cap: 'raw to ingot' },
    ],
  },
]

function Shot({ src, cap }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0F0B06]" style={{ aspectRatio: '16 / 10' }}>
        <img src={src} alt={cap} loading="lazy" className="h-full w-full object-contain" />
      </div>
      <figcaption className="mt-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-zinc-500">{cap}</figcaption>
    </figure>
  )
}

export default function Inspiration() {
  return (
    <section id="inspo" className="scroll-mt-28 border-t border-white/[0.06] py-16 lg:py-24">
      <SectionHead kicker="Inspirations" title="The games I grew up with" />
      <Prose className="mb-12 max-w-[640px]">
        <p>Clicker Forge comes straight out of the flash games I grew up playing.</p>
      </Prose>

      <div className="space-y-14">
        {GAMES.map((g) => (
          <div key={g.name} className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-3xl text-white">{g.name}</h3>
              <p className="mt-2 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">{g.line}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {g.shots.map((s) => (
                <Shot key={s.src} src={s.src} cap={s.cap} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
// end Inspiration.jsx
