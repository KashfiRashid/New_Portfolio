import { SectionHead, Highlight } from '../primitives.jsx'

export default function DesignersMind() {
  return (
    <section id="designers-mind" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="THE DESIGNER'S MIND"
        title="Every platform has a register. I chose ours first."
      />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          LinkedIn reads as professional. Instagram is edited and personal. Reddit is raw. Coursera is study. Every product picks a register, on purpose or by accident, and a user feels it before reading a word.
        </p>
        <p>
          <Highlight>Ours had to read like LinkedIn and Coursera, a surface for real decisions.</Highlight> Not Instagram's filter, not Reddit's noise. That one choice set the fonts, the palette, the spacing, and the restraint, and by the time components shipped, the register was a decision nobody had to remake.
        </p>
      </div>
    </section>
  )
}
