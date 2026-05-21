import { SectionHead, Highlight } from '../primitives.jsx'

export default function TheException() {
  return (
    <section id="the-exception" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="RESTRAINT" title="The button I built and never used." />
      <div className="max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          The night before the demo, the landing page had two plain buttons, one black and one green. They followed every rule in my design system. Sitting there that late, I worried they were too quiet to make anyone stop and look.
        </p>
        <p>
          So I built the loud version: one button with an animated rainbow gradient, a glowing ring spinning around its edge, a shimmer sweeping across it, small points of light. Every color in the system, moving at once. I wrote the whole thing.
        </p>
        <p>
          Then I set the loud button next to the plain ones and looked at them together. It caught the eye, but it made nothing clearer. It only made the page busier, and it broke all three of my design rules at once. So I kept the plain pair. The loud button still lives in the code, a finished style called btn-creative that nothing on the site uses. <Highlight>Choosing what to leave out is design work too.</Highlight>
        </p>
      </div>
    </section>
  )
}
