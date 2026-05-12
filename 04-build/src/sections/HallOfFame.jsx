import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'

/**
 * <HallOfFame /> — public log + Lego-brick submission.
 * Per /02-wireframes/09-hall-of-fame.md and /01-brand-book/07-hall-of-fame-spec.md.
 *
 * v1 launches empty. Submission goes to POST /api/submit (built by Claude Code).
 * Curation cadence: monthly (recommendation; [NEEDS KASH INPUT — Q E2]).
 */

// In v1 the entry list is empty. Once backend is wired, fetch from /api/hall-of-fame.
const ENTRIES = []

const SECTIONS = ['Voice', 'Eye', 'Work', 'Process', 'People', 'Origin', 'Hall of Fame', 'Other']
const ISSUES = ['Hard to find', 'Reads off', 'Visual feels off', 'Missing something', 'Slow / sluggish', 'Doesn\'t work right', 'Other']

export default function HallOfFame() {
  const { fire } = useCompanion()
  const [showPanel, setShowPanel] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fire('C10', { elementId: 'hof-page-entry' })
    if (ENTRIES.length === 0) {
      fire('C11', { elementId: 'hof-empty-state' })
    }
  }, [fire])

  const togglePanel = () => {
    setShowPanel((v) => {
      if (!v) fire('C12', { elementId: 'hof-submit-panel-open' })
      return !v
    })
  }

  return (
    <div className="section-page">
      <Reveal>
        <Breadcrumb section="hall of fame" />
      </Reveal>

      <header className="section-header">
        <div className="flex items-baseline justify-between flex-wrap gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              Hall of Fame
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              the site got better because these people showed up.
            </motion.p>
          </div>
          {!submitted && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={togglePanel}
              className="text-text-muted hover:text-accent-glow border border-surface-raised hover:border-accent-glow rounded-sm px-4 py-2 text-sm transition-all duration-250"
            >
              + submit a note
            </motion.button>
          )}
        </div>
      </header>

      {/* Submission panel */}
      {showPanel && !submitted && (
        <Reveal y={6}>
          <SubmissionPanel
            onCancel={() => setShowPanel(false)}
            onSubmit={() => {
              // [v1: would POST to /api/submit. Placeholder.]
              setSubmitted(true)
              setShowPanel(false)
              fire('C13', { elementId: 'hof-submitted' })
            }}
          />
        </Reveal>
      )}

      {/* Confirmation state */}
      {submitted && (
        <Reveal y={6}>
          <section className="bg-surface-mid border border-surface-raised rounded-sm px-6 py-6 mb-12">
            <h2 className="text-display-md font-display mb-2">✓ noted.</h2>
            <p className="text-text-muted leading-relaxed">
              i&apos;ll review this in the next batch. if it ships, you&apos;ll see it here.
              if not, no message — but every one gets read.
            </p>
          </section>
        </Reveal>
      )}

      {/* Entries — empty in v1 */}
      {ENTRIES.length === 0 ? (
        <Reveal>
          <section className="text-center py-16">
            <h2 className="text-text-muted text-sm uppercase tracking-wider mb-6">— nothing here yet —</h2>
            <p className="text-text-muted leading-relaxed max-w-prose mx-auto mb-6">
              this is the page where the site evolves. it&apos;s empty at launch on purpose.
              the first entry ships when someone shapes something.
            </p>
          </section>
        </Reveal>
      ) : (
        <ul className="space-y-6">
          {ENTRIES.map((e) => (
            <EntryCard key={e.id} entry={e} />
          ))}
        </ul>
      )}
    </div>
  )
}

/* -----------------------------------------------------------------------
   SubmissionPanel — Lego-brick prompt UI
   ----------------------------------------------------------------------- */

function SubmissionPanel({ onCancel, onSubmit }) {
  const [section, setSection] = useState(null)
  const [issue, setIssue] = useState(null)
  const [body, setBody] = useState('')
  const [creditPref, setCreditPref] = useState('full') // 'full' | 'color_only' | 'anonymous'

  const canSubmit = section && issue && body.trim().length > 0

  return (
    <section className="bg-surface-mid border border-surface-raised rounded-sm px-6 py-6 mb-12 space-y-6">

      <div>
        <p className="text-text-primary text-sm mb-3">what section?</p>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`text-sm px-3 py-1.5 rounded-sm border transition-all duration-250 ${
                section === s
                  ? 'border-accent-glow text-accent-glow bg-accent-glow/10'
                  : 'border-surface-raised text-text-muted hover:text-text-primary hover:border-text-faint'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-text-primary text-sm mb-3">what&apos;s the issue?</p>
        <div className="flex flex-wrap gap-2">
          {ISSUES.map((i) => (
            <button
              key={i}
              onClick={() => setIssue(i)}
              className={`text-sm px-3 py-1.5 rounded-sm border transition-all duration-250 ${
                issue === i
                  ? 'border-accent-glow text-accent-glow bg-accent-glow/10'
                  : 'border-surface-raised text-text-muted hover:text-text-primary hover:border-text-faint'
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-text-primary text-sm mb-3">what would you change?</p>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, 280))}
          maxLength={280}
          rows={4}
          className="w-full bg-surface-deep border border-surface-raised focus:border-accent-glow rounded-sm px-3 py-2 text-text-primary text-sm leading-relaxed outline-none transition-colors duration-250 resize-none"
          placeholder=""
        />
        <p className="text-text-faint text-xs mt-1 text-right font-mono">
          {body.length}/280
        </p>
      </div>

      <div>
        <p className="text-text-primary text-sm mb-3">how should i credit you if i ship it?</p>
        <div className="space-y-2 text-sm text-text-muted">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="credit"
              checked={creditPref === 'full'}
              onChange={() => setCreditPref('full')}
              className="accent-accent-glow"
            />
            <span>full credit (name + color)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="credit"
              checked={creditPref === 'color_only'}
              onChange={() => setCreditPref('color_only')}
              className="accent-accent-glow"
            />
            <span>just credit my color, not my name</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="credit"
              checked={creditPref === 'anonymous'}
              onChange={() => setCreditPref('anonymous')}
              className="accent-accent-glow"
            />
            <span>don&apos;t credit me at all</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-raised">
        <button
          onClick={onCancel}
          className="text-text-muted hover:text-text-primary text-sm transition-colors duration-250"
        >
          cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="border border-surface-raised hover:border-accent-glow text-text-primary hover:text-accent-glow text-sm px-4 py-2 rounded-sm transition-all duration-250 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          send →
        </button>
      </div>

    </section>
  )
}

function EntryCard({ entry }) {
  return (
    <li className="bg-surface-mid border border-surface-raised rounded-sm px-6 py-5">
      <div className="flex items-baseline gap-3 mb-2">
        <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
        <span className="text-text-primary">{entry.name}</span>
        <span className="text-text-faint font-mono text-xs">
          Section: {entry.section} · Shipped {entry.shippedAt}
        </span>
      </div>
      <blockquote className="text-text-muted italic leading-relaxed pl-5 mb-3">
        &ldquo;{entry.suggestion}&rdquo;
      </blockquote>
      <p className="text-text-primary leading-relaxed">→ {entry.changeNote}</p>
    </li>
  )
}
