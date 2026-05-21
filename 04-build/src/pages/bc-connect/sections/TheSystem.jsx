import { SectionHead, MonoKicker } from '../primitives.jsx'
import SystemInheritanceDiagram from '../diagrams/SystemInheritanceDiagram.jsx'
import BrandMark from '../styleguide/BrandMark.jsx'
import ColorSystem from '../styleguide/ColorSystem.jsx'
import Typography from '../styleguide/Typography.jsx'
import Spacing from '../styleguide/Spacing.jsx'
import Motion from '../styleguide/Motion.jsx'
import Buttons from '../styleguide/Buttons.jsx'
import Inputs from '../styleguide/Inputs.jsx'
import Tags from '../styleguide/Tags.jsx'
import Cards from '../styleguide/Cards.jsx'

const LAWS = [
  {
    label: 'Law 01',
    title: 'Earn Your Pixel',
    body: "Every element must justify its presence. If it doesn't inform, orient, or delight, remove it. Default to removal.",
  },
  {
    label: 'Law 02',
    title: 'Ground Before Signal',
    body: 'Establish spatial clarity with neutral ground before introducing color or emphasis. White space is structure, not emptiness.',
  },
  {
    label: 'Law 03',
    title: "Connect, Don't Decorate",
    body: "Ornament for aesthetics alone isn't allowed. Every line, dot, and gradient should visualize a real relationship.",
  },
]

export default function TheSystem() {
  return (
    <section id="the-system" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE SYSTEM" title="Open Ground, before any component shipped." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          The system has three laws. Earn Your Pixel. Ground Before Signal. Connect, Don't Decorate. Every component the team built was evaluated against them. The laws came first because everything downstream had to either agree with them or be replaced.
        </p>
      </div>

      {/* PART A: the three laws */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {LAWS.map((law) => (
          <article key={law.label} className="rounded-lg border border-zinc-800 p-6">
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#1B6B4F]">
              {law.label}
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-[24px] font-normal tracking-[-0.02em] text-white lg:text-[28px]">
              {law.title}
            </h3>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {law.body}
            </p>
          </article>
        ))}
      </div>

      {/* System inheritance diagram */}
      <div className="mt-12">
        <SystemInheritanceDiagram />
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-zinc-500">
          Each layer is constrained by the one above.
        </p>
      </div>

      {/* ─── Live design-system showcase ───
          Each element of Open Ground recreated as a live component, framed
          in a white "museum" panel on the dark canvas. Foundations first;
          the component library follows in later exhibits. */}
      <div className="mt-20">
        <MonoKicker>FOUNDATIONS</MonoKicker>
        <p className="mt-3 max-w-[680px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-400">
          Not screenshots. Every element below is the real component, recreated
          and rendered live — so it can never drift out of date.
        </p>
        <div className="mt-10 space-y-16">
          <BrandMark />
          <ColorSystem />
          <Typography />
          <Spacing />
          <Motion />
        </div>
      </div>

      {/* ─── Component library group ─── */}
      <div className="mt-20">
        <MonoKicker>COMPONENT LIBRARY</MonoKicker>
        <p className="mt-3 max-w-[680px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-400">
          The system shipped sixteen components. Here are the most-used
          surfaces, recreated live and fully interactive.
        </p>
        <div className="mt-10 space-y-16">
          <Buttons />
          <Inputs />
          <Tags />
          <Cards />
        </div>
      </div>

    </section>
  )
}
