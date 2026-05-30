import { SectionHead } from '../primitives.jsx'

export default function FinalDesign() {
  return (
    <section id="final-design" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="FINAL DESIGN" title="Shipped: a complete mobile app." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          Onboarding, courses, practice quizzes, voice-matching for community calls, forums, and a job board. The final cut shipped as a high-fidelity prototype validated with the same drivers who shaped it.
        </p>
      </div>

      <figure className="mt-12 space-y-3">
        <img src="/trucking-academy/final-screens.png" alt="Final mobile app design \u2014 all screens composited together." loading="lazy" className="w-full rounded-xl border border-white/[0.08]" />
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span className="text-[#FF6B6B]">Final screens</span> &#xB7; the full app at a glance
        </figcaption>
      </figure>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((n) => (
          <figure key={n} className="space-y-3">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/[0.08] bg-zinc-900">
              <img
                src={`/trucking-academy/app-in-use-${n}.png`}
                alt={`Trucking Academy app in use \u2014 view ${n}.`}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </figure>
        ))}
      </div>
    </section>
  )
}
