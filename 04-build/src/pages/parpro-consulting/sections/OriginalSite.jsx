import { SectionHead, PainPointCard } from '../primitives.jsx'

export default function OriginalSite() {
  return (
    <section id="original-site" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="THE ORIGINAL SITE"
        title="Four problems. Every later decision traces to one of them."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The competitor audit and the client interview produced a short list of problems on the existing Parpro site. The four below, in the order the client cared about them.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <PainPointCard index="01" title="Stock imagery overload">
          Every visual came from a stock library. Nothing showed what Parpro itself looked like.
        </PainPointCard>
        <PainPointCard index="02" title="Static engagement">
          No motion, no hover states, no scroll cues. The page sat still while the visitor scrolled.
        </PainPointCard>
        <PainPointCard index="03" title="Buried consultation path">
          The primary call to action was a footer link. Most visitors never reached it.
        </PainPointCard>
        <PainPointCard index="04" title="Template brand voice">
          Logo aside, the site read as a generic services template. No identity, no reason to trust.
        </PainPointCard>
      </div>
    </section>
  )
}
