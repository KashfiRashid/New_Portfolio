import { SectionHead, Prose, Highlight, Figure, Tag } from '../primitives.jsx'
import PlannedClassDiagram from '../diagrams/PlannedClassDiagram.jsx'

const STORYBOARD = [
  { src: '/clicker-forge/storyboard-1-empty.png', alt: 'Storyboard panel: empty smithy with smelter and copper on the shelf.', cap: '01 cold forge' },
  { src: '/clicker-forge/storyboard-2-copper.png', alt: 'Storyboard panel: copper dropped into the lit smelter.', cap: '02 copper in' },
  { src: '/clicker-forge/storyboard-3-molten.png', alt: 'Storyboard panel: copper glowing molten in the smelter.', cap: '03 molten' },
  { src: '/clicker-forge/storyboard-4-crucible.png', alt: 'Storyboard panel: crucible collecting the molten copper.', cap: '04 crucible' },
  { src: '/clicker-forge/storyboard-5-sword.png', alt: 'Storyboard panel: the finished blade resting in the smithy.', cap: '05 the blade' },
]

const PLANNED = ['Three weapons: sword, mace, shield', 'Three metals: iron, copper, silver', 'Customer orders with preferences', 'Handle and pommel fittings']
const SHIPPED = ['One weapon, forged deeply: the sword', 'One metal: copper', 'A single guided flow', 'Emblem and grip decorators']
const ADDED = ['Perlin smoke tied to bellows speed', 'A recursive fractal hammer minigame', 'Intro, instruction, and outro screens', 'Sound design and a custom cursor']

export default function Paper() {
  return (
    <section id="paper" className="scroll-mt-28 border-t border-white/[0.06] py-16 lg:py-24">
      <SectionHead kicker="Designed on paper first" title="From a weaponsmith to one blade" />
      <Prose className="mb-12 max-w-[700px]">
        <p>
          Clicker Forge did not start as a sword game. The proposal was bigger: a{' '}
          <Highlight>medieval weaponsmith sim</Highlight> where you smelt iron, copper, and
          silver, forge swords, maces, and shields, and fill custom orders. I storyboarded the
          whole flow and specced a full class hierarchy before writing code.
        </p>
        <p>
          Then I made the call that shipped a good project:{' '}
          <Highlight>cut the breadth, keep the depth</Highlight>. One metal, one weapon, one
          flow, every step polished. The structure held; I just aimed it at a smaller target.
        </p>
      </Prose>

      {/* Storyboard strip */}
      <div className="mb-6">
        <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#C8A24B]">The storyboard, from the proposal</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {STORYBOARD.map((s) => (
            <Figure key={s.src} src={s.src} alt={s.alt} caption={s.cap} aspect="3 / 2" />
          ))}
        </div>
      </div>

      {/* Concept to shipped: final storyboard vs the built scene */}
      <div className="mt-14">
        <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#C8A24B]">Concept to shipped</p>
        <div className="grid gap-6 md:grid-cols-2">
          <Figure src="/clicker-forge/storyboard-final.png" alt="The final storyboard: the whole forge scene planned in Figma." caption="Final storyboard" aspect="3 / 2" />
          <Figure src="/clicker-forge/shot-molten.png" alt="The shipped smelter, lit and molten." caption="Shipped" aspect="3 / 2" />
        </div>
      </div>

      {/* Planned vs shipped vs added */}
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-400">Planned</p>
          <ul className="space-y-2.5 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
            {PLANNED.map((x) => (
              <li key={x} className="flex gap-2"><span className="text-zinc-600">+</span>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#C8A24B]/25 bg-[#C8A24B]/[0.05] p-6">
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#E5C877]">Shipped</p>
          <ul className="space-y-2.5 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-200">
            {SHIPPED.map((x) => (
              <li key={x} className="flex gap-2"><span className="text-[#C8A24B]">+</span>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-400">Added beyond the plan</p>
          <ul className="space-y-2.5 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-300">
            {ADDED.map((x) => (
              <li key={x} className="flex gap-2"><span className="text-[#C8A24B]">+</span>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Planned class hierarchy */}
      <div className="mt-16">
        <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl text-white">The hierarchy I drew before coding</h3>
        <Prose className="mb-8 max-w-[700px]">
          <p>
            The proposal already had the architecture in it. I planned an{' '}
            <Highlight>abstract base class</Highlight>, named Ingots on paper and shipped as{' '}
            <code className="text-[#E5C877]">Item</code>, with molds branching into a cast per
            weapon. Narrowing scope meant dropping branches, not redesigning. Bronze nodes
            shipped; dashed ones were cut.
          </p>
        </Prose>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 lg:p-10">
          <PlannedClassDiagram />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Tag>abstraction up front</Tag>
          <Tag>scope cut, structure kept</Tag>
          <Tag>proposal to ship</Tag>
        </div>
      </div>
    </section>
  )
}
// end Paper.jsx
