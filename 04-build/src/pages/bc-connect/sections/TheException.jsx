import { SectionHead } from '../primitives.jsx'

const PARAGRAPHS = [
  "It was late. Probably 11pm or midnight before the demo. The hero had two restrained pill buttons, black and signal green, completely on-system. They worked. But I wasn't sure they'd pull.",
  "So I built the alternative. A full-spectrum animated gradient. A spinning conic ring around the border. Shimmer sweep, particles, glow. Every color in the system flowing through one element. I wrote the entire CSS class for it. It still lives in globals.css between lines 394 and 531.",
  "I never applied it. I looked at the gradient version on the page next to everything else and the maximalism didn't make the page convert harder. It made the page louder. Loud is not the same as effective. And the gradient violated all three of my own design laws in one component. I shipped the restrained pair.",
  "The dead CSS is the record of a question I asked and answered. You can grep for btn-creative in the BC Connect codebase. You will find the definition. You will not find a single component using it. That gap is the work. The decision to not ship something is design too.",
]

export default function TheException() {
  return (
    <section id="the-exception" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="RESTRAINT"
        title="The one rule I almost broke. And why I didn't."
      />
      <div className="max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        {PARAGRAPHS.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <blockquote className="mx-auto mt-12 max-w-[900px] text-center font-[family-name:var(--font-display)] text-[28px] italic leading-snug text-[#1B6B4F] lg:text-[36px]">
        The best exception is the one you don't make.
      </blockquote>
    </section>
  )
}
