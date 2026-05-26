import { Link } from 'react-router-dom'
import { SectionHead, Highlight } from '../primitives.jsx'

const linkClass = 'text-[#9268E0] underline-offset-2 hover:underline'

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="REFLECTION" title="What this taught me." />
      <div className="max-w-[760px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          I loved this project. The iteration loop from board to paper to Discord to sketches to 3D to color to form to implementation was the kind of work I want to keep doing. Small wins mattered. A voice line that landed right. A vent geometry that read clearly at 1:1000 scale. A sound cue that made someone flinch in playtest.
        </p>
        <p>
          We committed to fully diegetic UI from the start because Dead Space taught us that 2D menus break immersion. We were right about removing the menus. We were wrong about not building the diegetic feedback to replace them. Next time I would design the diegetic feedback layer at the same time as the diegetic interaction layer.
        </p>
      </div>

      <div className="mt-16 border-t border-white/[0.06] pt-12">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#9268E0]">
          The pattern across three teams
        </p>
        <p className="mt-4 max-w-[760px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
          Three teams now where I held creative direction while my teammates handled engineering execution.{' '}
          <Link to="/projects/bc-connect" className={linkClass}>BC Connect</Link>,{' '}
          <Link to="/projects/blu" className={linkClass}>BLU</Link>, Something Lurking. <Highlight>I am the design conscience on engineering teams.</Highlight>
        </p>
      </div>
    </section>
  )
}
