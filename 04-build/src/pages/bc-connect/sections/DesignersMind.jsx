import { SectionHead } from '../primitives.jsx'

export default function DesignersMind() {
  return (
    <section id="designers-mind" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="THE DESIGNER'S MIND"
        title="Before pixels, I designed for the platform's vibe."
      />
      <div className="max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          Every platform has a register. LinkedIn is professional. Instagram is edited personal content. YouTube is fun and trivia. Coursera is professional learning. Discord is connection and collaboration. Reddit and Twitter are raw and unfiltered.
        </p>
        <p>
          BC Connect needed the LinkedIn and Coursera register. A trustworthy data surface for investors and founders making real decisions. Not Instagram's filter aesthetic. Not Reddit's rawness. The vibe had to match what the platform was for.
        </p>
        <p>
          So I designed for that. I explored fonts. I tested palettes. I sat with the spacing until the rhythm felt right for the demographic in mind. Iteration wasn't ornament. It was how I calibrated the system to the audience it was for.
        </p>
        <p>
          By the time we started shipping components, the vibe was already a decision the team didn't have to remake. Cards, navigation, hero, map view, all of it inherited from the register I'd set early.
        </p>
      </div>
    </section>
  )
}
