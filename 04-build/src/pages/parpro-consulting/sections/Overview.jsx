import { SectionHead } from '../primitives.jsx'

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="OVERVIEW"
        title="Three days. A real client. A redesign that had to earn every interaction."
      />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Parpro is a Canadian bookkeeping firm whose site read like a 2010 template. Stock imagery, no motion, the consultation path buried in a footer. Four of us had three hackathon days to deliver a full interaction redesign: competitor audit, client interview, user flow, wireframes, mockups, design system foundations, and an interactive prototype with four interaction types. I owned the prototype and the four interaction patterns. The audit, the flow, the mockups, and the system were team deliverables we built together.
        </p>
      </div>

      <figure className="mt-12 space-y-3">
        <video
          src="/parpro/original-site.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls
          aria-label="The original Parpro website before the redesign: template feel, stock imagery, static surface."
          className="w-full rounded-lg border border-white/[0.06] bg-black object-contain"
          style={{ aspectRatio: '1920 / 922' }}
        />
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
          The original Parpro site &middot; functional but forgettable
        </figcaption>
      </figure>
    </section>
  )
}
