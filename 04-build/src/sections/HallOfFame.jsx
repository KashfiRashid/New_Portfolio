import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'

/**
 * <BuildLog /> - an open record of how this site got made, and who shaped it.
 * Reframed from the old empty "Hall of Fame": full from day one, no hollow
 * empty state. Suggestions that ship still land here, credited. Pure ASCII
 * source (the editor on-save formatter truncates multibyte glyphs).
 */

const CHANGES = [
  { tag: 'May 2026', title: 'Market Basket Analysis, written up',
    note: 'The IAT 461 dual-AI retail project - the honest "complexity to effectiveness" arc, with the demo and the real numbers.' },
  { tag: 'May 2026', title: 'Footer, calmed down',
    note: 'Swapped a self-deprecating changelog line for a quieter sign-off. A friend flagged it - good catch.' },
  { tag: 'May 2026', title: 'Work, ordered by impact',
    note: 'Strongest projects first, not alphabetical. ASL Express and PharmaBotics lead.' },
  { tag: 'May 2026', title: 'PharmaBotics + ASL Express, documented',
    note: 'Two flagship case studies, built from real photos, repos, and showcase docs - and honest about what got cut.' },
  { tag: 'May 2026', title: 'About, rebuilt as an archive',
    note: 'Dropped the room metaphor for a labeled archive: bio, a captioned wall, experience, awards. Looked hard at Caleb Wu and Christina Raganit.' },
  { tag: 'May 2026', title: 'The whole site, made formatter-proof',
    note: 'Quiet, load-bearing work: every source file rewritten to pure ASCII after an editor quirk kept truncating them.' },
]

const SHAPERS = [
  { who: 'Tazwar', note: 'The writing here is downstream of his.' },
  { who: 'Family', note: 'The part that is hard to write in one line.' },
]

const TOOLS = ['React', 'Vite', 'Tailwind', 'Framer Motion', 'Figma', 'Stitch', 'Antigravity', 'Claude']

const REFERENCES = [
  { name: 'Caleb Wu', href: 'https://calebwu.ca' },
  { name: 'Christina Raganit', href: 'https://christinaraganit.xyz' },
]

export default function BuildLog() {
  const { fire } = useCompanion()
  useEffect(() => { fire('C10', { elementId: 'buildlog-entry' }) }, [fire])

  return (
    <div className="section-page">
      <Reveal>
        <Breadcrumb section="build log" />
      </Reveal>

      <header className="section-header">
        <motion.h1
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Build Log
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-prose"
        >
          An open record of how this site got made, and who shaped it. Suggest a
          change and, if it ships, you land here too.
        </motion.p>
      </header>

      {/* What changed */}
      <Reveal>
        <section className="mb-16">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint mb-8">What changed</h2>
          <ul className="space-y-7">
            {CHANGES.map((c, i) => (
              <li key={i} className="flex gap-5">
                <span aria-hidden="true" className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-glow" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-text-primary">{c.title}</span>
                    <span className="font-mono text-[11px] text-text-faint">{c.tag}</span>
                  </div>
                  <p className="mt-1 text-text-muted leading-relaxed max-w-prose">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* Shaped by */}
      <Reveal>
        <section className="mb-16">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint mb-8">Shaped by</h2>
          <ul className="space-y-5">
            {SHAPERS.map((s) => (
              <li key={s.who} className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-text-primary w-24 shrink-0">{s.who}</span>
                <span className="text-text-muted leading-relaxed max-w-prose">{s.note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-text-faint text-sm leading-relaxed">
            Project teammates are credited on each case study.
          </p>
        </section>
      </Reveal>

      {/* Made with */}
      <Reveal>
        <section className="mb-16">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint mb-8">Made with</h2>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <span key={t} className="border border-surface-raised text-text-muted text-sm px-3 py-1.5 rounded-sm">{t}</span>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Looked at */}
      <Reveal>
        <section className="mb-16">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint mb-8">Looked at</h2>
          <ul className="space-y-2">
            {REFERENCES.map((r) => (
              <li key={r.href}>
                <a href={r.href} target="_blank" rel="noopener noreferrer"
                   className="text-text-primary underline-offset-4 hover:underline hover:text-accent-glow transition-colors duration-250">
                  {r.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* Invitation */}
      <Reveal>
        <section className="border-t border-surface-raised pt-10">
          <p className="text-text-muted leading-relaxed max-w-prose">
            Spotted something worth changing? Tell me - the good calls ship, and
            you land right here.{' '}
            <a href="mailto:mailkashfirashid@gmail.com"
               className="text-text-primary underline-offset-4 hover:underline hover:text-accent-glow transition-colors duration-250">
              send a note &#x2192;
            </a>
          </p>
        </section>
      </Reveal>
    </div>
  )
}
