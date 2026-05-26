import { SectionHead, Highlight } from '../primitives.jsx'

export default function Role() {
  return (
    <section id="what-i-did" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="WHAT I DID" title="Structure, fast." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          Two hours in, ideas were pouring in but we had no structure. <Highlight>I stepped in as team lead: assigned roles, scoped what could realistically ship in the time we had, and set the foundation the rest of the team built on.</Highlight>
        </p>
        <p>
          From there I worked across design and development, keeping four people aligned on one direction under time pressure. The look (futuristic, minimalist, glowing neon) came from growing up on Pok&eacute;mon on retro PSPs and a recent obsession with Stardew Valley. I wanted an interface where the glow itself reads as being watched.
        </p>
        <p>
          That early structure is what let us ship a finished game by the end of the night.
        </p>
      </div>
    </section>
  )
}
