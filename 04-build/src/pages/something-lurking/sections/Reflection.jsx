import { Link } from 'react-router-dom'
import { SectionHead } from '../primitives.jsx'

// Verbatim per the approved brief: three Q3 reflection paragraphs plus
// the pattern-across-three-teams positioning paragraph. Do not paraphrase.
const PARAGRAPHS = [
  "I loved this project. The iteration loop from board to paper to Discord to sketches to 3D to color to form to implementation was the kind of work I want to keep doing. Small wins mattered. A voice line that landed right. A vent geometry that read clearly at 1:1000 scale. A sound cue that made someone flinch in playtest. The bigger picture stayed in view, but every small win along the way was worth marking.",
  "We committed to fully diegetic UI from the start because Dead Space taught us that 2D menus break immersion. We were right about removing the menus. We were wrong about not building the diegetic feedback to replace them. After the P1 review, the professor named audio and visual feedback as the project's clearest weakness, and we patched it in the final cut. The honest version: we treated 'no UI' as the design rule and forgot that no UI just shifts the feedback work elsewhere. Next time I would design the diegetic feedback layer at the same time as the diegetic interaction layer. Removing the menus is the easy part. Replacing what they did is the harder part.",
  "The three-act structure had the cliffhanger ending from the start. It is what makes the betrayal land. But the time pressure also made it the only ending we could ship. Both things are true. The cliffhanger reads as craft because it is. It also reads as constraint because that is also true. If I had two more weeks I would have built the resolution the experience set up. As shipped, I think the ambiguity is honest, but I want to be clear with myself that scope shaped the ending, not just narrative intent.",
]

const linkClass = 'text-[#9268E0] underline-offset-2 hover:underline'

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="REFLECTION" title="What this taught me." />
      <div className="max-w-[760px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        {PARAGRAPHS.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-16 border-t border-white/[0.06] pt-12">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#9268E0]">
          The pattern across three teams
        </p>
        <p className="mt-4 max-w-[760px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
          Three teams now where I held creative direction while my teammates handled engineering execution.{' '}
          <Link to="/projects/bc-connect" className={linkClass}>BC Connect</Link>
          : I led the design system while two teammates wrote backend.{' '}
          <Link to="/projects/blu" className={linkClass}>BLU</Link>
          : I directed and modeled environments while my teammates animated and rigged. Something Lurking: I held the narrative spine and sound while Eric built the world and Kento and Michael built the mechanics. It is the pattern. Not the accident. I am the design conscience on engineering teams. I can hold creative vision long enough for engineering teammates to ship it, and I build my own technical work where the case calls for it (BC Connect frontend,{' '}
          <Link to="/projects/spectral-bloom" className={linkClass}>Spectral Bloom</Link>
          {' '}Three.js). What I want to grow into: knowing when to stop being the conscience and start being a peer who pushes back on technical scope.
        </p>
      </div>
    </section>
  )
}
