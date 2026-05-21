import { SectionHead, MonoKicker, Highlight } from '../primitives.jsx'
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
    body: "Every element justifies its presence. If it doesn't inform, orient, or delight, it goes. The default is removal.",
  },
  {
    label: 'Law 02',
    title: 'Ground Before Signal',
    body: 'Neutral ground sets spatial clarity before any color or emphasis. White space is structure, not emptiness.',
  },
  {
    label: 'Law 03',
    title: "Connect, Don't Decorate",
    body: "Ornament for its own sake isn't allowed. Every line, dot, and gradient visualizes a real relationship.",
  },
]

export default function TheSystem() {
  return (
    <section id="the-system" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE SYSTEM" title="Open Ground, before any component shipped." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          Open Ground is three laws, and the tokens and components built to obey them. <Highlight>Every component had to pass the three laws or be replaced.</Highlight>
        </p>
      </div>

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

      <div className="mt-12">
        <SystemInheritanceDiagram />
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-zinc-500">
          Each layer is constrained by the one above.
        </p>
      </div>

      <div className="mt-20">
        <MonoKicker>FOUNDATIONS</MonoKicker>
        <p className="mt-3 max-w-[680px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-400">
          Not screenshots. Every element below is the real component, rebuilt and rendered live, so it can't drift out of date.
        </p>
        <div className="mt-10 space-y-16">
          <BrandMark />
          <ColorSystem />
          <Typography />
          <Spacing />
          <Motion />
        </div>
      </div>

      <div className="mt-20">
        <MonoKicker>COMPONENT LIBRARY</MonoKicker>
        <p className="mt-3 max-w-[680px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-400">
          The system shipped sixteen components. These are the surfaces the product leaned on most, rebuilt here and fully interactive.
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
