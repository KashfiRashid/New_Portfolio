import { SectionHead } from '../primitives.jsx'
import UserFlowDiagram from '../diagrams/UserFlowDiagram.jsx'

export default function UserFlow() {
  return (
    <section id="user-flow" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="USER FLOW"
        title="Landing to consultation, one path the whole way."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The original site gave a visitor no next step after landing. The redesigned flow funnels users toward a consultation with the primary CTA present across the journey.
        </p>
      </div>

      <div className="mt-12">
        <UserFlowDiagram />
      </div>

      <figure className="mt-12 space-y-3">
        <img
          src="/parpro/user-flow-original.png"
          alt="Finalized Parpro user flow: five sequenced states with the consultation CTA persistent across each stage."
          loading="lazy"
          className="w-full rounded-lg border border-white/[0.06] bg-black object-contain"
          style={{ aspectRatio: '2699 / 1470' }}
        />
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
          The user flow document delivered to the client
        </figcaption>
      </figure>
    </section>
  )
}
