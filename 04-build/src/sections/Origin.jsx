import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'

/**
 * <Origin /> — Dhaka → Delta. Selective Bangla.
 * Per /02-wireframes/08-origin.md.
 *
 * The convocation moment (June 10, 2026) auto-pivots verb tense.
 */

const CONVOCATION_DATE = new Date('2026-06-10T00:00:00')

export default function Origin() {
  const { fire } = useCompanion()
  const isAfterConvocation = new Date() >= CONVOCATION_DATE

  useEffect(() => {
    fire('E7', { elementId: 'origin-page-entry' })
  }, [fire])

  return (
    <div className="section-page">
      <Reveal>
        <Breadcrumb section="origin" />
      </Reveal>

      <header className="section-header">
        <motion.h1
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Origin
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          dhaka → delta. the long route.
        </motion.p>
      </header>

      {/* Opening paragraph — needs Kash to fill in real specifics */}
      <Reveal>
        <section className="mb-16">
          <p className="text-text-muted leading-relaxed max-w-prose italic">
            [NEEDS KASH INPUT — opening 3-5 sentences. Open with a sensory moment, not biographical exposition.
            Working illustrative draft: &quot;the day in 2022 i landed at YVR my dad was holding two coffees. one for each of us.
            i hadn&apos;t had a coffee in 17 hours and i didn&apos;t remember telling him my order. it was right.&quot;]
          </p>
        </section>
      </Reveal>

      {/* Stretches: Dhaka / The long flight / Delta */}
      <section className="mb-16">
        <Reveal>
          <h2 className="text-text-muted text-sm uppercase tracking-wider mb-6">— stretches —</h2>
        </Reveal>

        <div className="space-y-12">
          <Reveal>
            <div>
              <h3 className="text-display-md font-display mb-3">Dhaka</h3>
              <p className="text-text-muted leading-relaxed max-w-prose italic">
                [NEEDS KASH INPUT — 2-3 specific Dhaka memories Kash wants on the site.]
              </p>

              {/* Bangla pull-quote — selective use */}
              <blockquote className="my-8 px-6 py-5 bg-surface-mid border-l-2 border-accent-glow/40 rounded-sm max-w-prose">
                <p className="font-bangla italic text-text-primary text-lg leading-snug">
                  {/* [NEEDS KASH INPUT — which Bangla phrase] */}
                  [Bangla phrase here]
                </p>
                <p className="text-text-faint text-xs mt-2">
                  [English translation]
                </p>
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h3 className="text-display-md font-display mb-3">The long flight</h3>
              <p className="text-text-muted leading-relaxed max-w-prose italic">
                [NEEDS KASH INPUT — the move. specific moment from 2022.]
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <h3 className="text-display-md font-display mb-3">Delta</h3>
              <p className="text-text-muted leading-relaxed max-w-prose italic">
                [NEEDS KASH INPUT — landing, settling, what changed. references father if Kash wants. SFU SIAT context if he wants.]
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Convocation moment — date-aware tense */}
      <Reveal>
        <section className="mb-16">
          <h2 className="text-text-muted text-sm uppercase tracking-wider mb-4">— june 10, 2026 —</h2>
          <p className="text-text-muted leading-relaxed max-w-prose">
            {isAfterConvocation
              ? '[NEEDS KASH INPUT — paragraph: i graduated from sfu siat. what it meant.]'
              : '[NEEDS KASH INPUT — paragraph: in june i graduate from sfu siat. what it will mean.]'}
          </p>

          {/* Optional Bangla note */}
          <p className="font-bangla italic text-text-muted mt-6">
            {/* [NEEDS KASH INPUT — short Bangla note. e.g., "ma, ami kortechi" — under it: "mom, i'm doing it"] */}
          </p>
        </section>
      </Reveal>

      {/* What I carry */}
      <Reveal delay={0.1}>
        <section className="pt-8 border-t border-surface-raised">
          <h2 className="text-text-muted text-sm uppercase tracking-wider mb-4">— what i carry —</h2>
          <p className="text-text-primary leading-relaxed max-w-prose italic">
            {/* Working closing — [NEEDS KASH INPUT to confirm] */}
            i didn&apos;t bring much from dhaka. but i brought enough to know what &apos;enough&apos; is.
          </p>
        </section>
      </Reveal>
    </div>
  )
}
