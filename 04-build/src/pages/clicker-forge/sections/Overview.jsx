import { SectionHead, Prose, Highlight, Stat } from '../primitives.jsx'

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 border-t border-white/[0.06] py-16 lg:py-24">
      <SectionHead kicker="The pitch" title="A forge you can feel" />
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Prose>
          <p>
            Most first projects are quiet: a calculator, a list, a shape that bounces. I wanted
            the opposite. Something with <Highlight>weight and craft</Highlight>, where a sword
            took real labour to make.
          </p>
          <p>
            Clicker Forge is that. You smelt copper, cast a blade, hammer it true, and finish it
            with emblems. Every interaction is a small physical metaphor: you drag the copper,
            pump the bellows, time the hammer.
          </p>
          <p>
            Under the charm, it was a deliberate exercise in software design: one abstract base
            class, a factory, a decorator chain, a single state machine, and generative graphics.
            The goal was a game <Highlight>built well enough to extend</Highlight>.
          </p>
        </Prose>
        <div className="grid grid-cols-2 gap-3 self-start">
          <Stat value="3" label="forging rooms" />
          <Stat value="8" label="packages" />
          <Stat value="30+" label="classes" />
          <Stat value="3" label="design patterns" />
        </div>
      </div>
    </section>
  )
}
// end Overview.jsx
