import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import { RevealGroup } from '../components/Reveal.jsx'

/**
 * <Voice /> — design opinions Kash will defend.
 * Per /02-wireframes/03-voice.md.
 *
 * Starter opinions from /01-brand-book/02-content-well.md Section 9.
 * [NEEDS KASH INPUT — Q C1] full 5–10 list in Kash's words. Voice page
 * publishes from this list.
 */

const STARTER_OPINIONS = [
  {
    n: '01',
    title: "AI doesn't make you faster. It makes you wider.",
    body: "The hours don't shrink. The number of directions you can hold open at once does. That's a different superpower.",
    bubbleId: 'H9',
  },
  {
    n: '02',
    title: 'Restraint is a craft, not a constraint.',
    body: "Subtraction is the harder skill. A site that doesn't show everything it can do is the one that gets remembered.",
    bubbleId: 'H10',
  },
  {
    n: '03',
    title: "The companion isn't a chatbot. It's a presence.",
    body: "A chatbot waits for a question. A companion notices what you're looking at and says the right small thing.",
    bubbleId: 'H11',
  },
  {
    n: '04',
    title: "Late nights aren't a flex; they're a workspace.",
    body: "I'm not romanticizing the grind. 2am is when the noise stops and the work happens. That's a setting, not a virtue.",
    bubbleId: 'H12',
  },
  {
    n: '05',
    title: 'People over deliverables.',
    body: 'Every project here has a name attached to a person who shaped it. The portfolio is a list of names as much as a list of works.',
    bubbleId: 'H13',
  },
]

export default function Voice() {
  const { fire } = useCompanion()

  useEffect(() => {
    fire('E4', { elementId: 'voice-page-entry' })
  }, [fire])

  return (
    <div className="section-page">
      <Reveal>
        <Breadcrumb section="voice" />
      </Reveal>

      <header className="section-header">
        <motion.h1
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Voice
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          opinions i&apos;d actually defend. updated when something earns it.
          {/* last-added date — placeholder; pulled from data when content lands */}
        </motion.p>
      </header>

      <RevealGroup staggerMs={80} className="space-y-8">
        {STARTER_OPINIONS.map((op) => (
          <article
            key={op.n}
            className="bg-surface-mid border border-surface-raised rounded-sm px-6 py-6 hover:border-text-faint transition-colors duration-250"
            onMouseEnter={() => fire(op.bubbleId, { elementId: `voice-opinion-${op.n}` })}
          >
            <div className="text-text-faint font-mono text-sm mb-2">{op.n}</div>
            <h2 className="text-display-md font-display mb-3 leading-snug">{op.title}</h2>
            <p className="text-text-muted leading-relaxed max-w-prose">{op.body}</p>
          </article>
        ))}
      </RevealGroup>

      {/* [NEEDS KASH INPUT] longer pieces — essays repurposed from LinkedIn or new */}
      <Reveal delay={0.1}>
        <section className="mt-16 pt-8 border-t border-surface-raised">
          <h2 className="text-text-muted text-sm uppercase tracking-wider mb-6">— essays —</h2>
          <p className="text-text-faint italic">
            longer pieces will land here. [NEEDS KASH INPUT — which to write or repurpose]
          </p>
        </section>
      </Reveal>
    </div>
  )
}
