import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import { RevealGroup } from '../components/Reveal.jsx'

/**
 * <Process /> — how Kash works.
 * Per /02-wireframes/06-process.md.
 */

const CHAIRS = [
  { name: 'Antigravity',   tag: 'first chair',    desc: 'ships frontend features against a spec. iterative planning, agentic coding. used on bc connect end-to-end.' },
  { name: 'Claude (chat)', tag: 'thinking partner', desc: 'strategic forks, voice calibration. the place ideas get argued before they become work.' },
  { name: 'Claude Cowork', tag: 'producer',        desc: 'multi-file production. reads a folder, writes a folder. the brand book you\'d be reading was made in cowork.' },
  { name: 'Claude Code',   tag: 'infrastructure', desc: 'backend. apis, db layer, infra. cli-first.' },
  { name: 'Stitch + Gemini', tag: 'first-pass',   desc: 'visual exploration. mood, layout experiments. not where final design happens.' },
  { name: 'Figma + Manual', tag: 'craft',         desc: 'hi-fi. component thinking. the spec antigravity builds against.' },
]

const SCORE = [
  { day: 'Monday',         phase: 'strategy',   tools: 'Claude chat' },
  { day: 'Tuesday',        phase: 'visual',     tools: 'Stitch + Gemini → Figma' },
  { day: 'Wednesday',      phase: 'hi-fi',      tools: 'Figma + manual' },
  { day: 'Thursday',       phase: 'build',      tools: 'Antigravity' },
  { day: 'Friday',         phase: 'backend',    tools: 'Claude Code' },
  { day: 'Friday eve',     phase: 'document',   tools: 'Cowork' },
]

export default function Process() {
  const { fire } = useCompanion()

  useEffect(() => {
    fire('C7', { elementId: 'process-page-entry' })
  }, [fire])

  return (
    <div className="section-page">
      <Reveal>
        <Breadcrumb section="process" />
      </Reveal>

      <header className="section-header">
        <motion.h1
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Process
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          how i conduct the orchestra. ai is in the chairs; i&apos;m holding the baton.
        </motion.p>
      </header>

      {/* Intro paragraph */}
      <Reveal>
        <section className="mb-16">
          <p className="text-text-muted leading-relaxed max-w-prose">
            {/* [NEEDS KASH INPUT — confirm or replace this paragraph] */}
            I don&apos;t write the whole symphony. I tell the strings when to come in, the brass when to wait,
            the percussion when to break the silence. That&apos;s what working with AI tools looks like for me.
            The chairs below are the orchestra. What I&apos;m doing here is conducting.
          </p>
        </section>
      </Reveal>

      {/* The chairs */}
      <section className="mb-16">
        <Reveal>
          <h2 className="text-text-muted text-sm uppercase tracking-wider mb-6">— the chairs —</h2>
        </Reveal>
        <RevealGroup staggerMs={70} className="space-y-4">
          {CHAIRS.map((c, idx) => (
            <article
              key={c.name}
              className="bg-surface-mid border border-surface-raised rounded-sm px-6 py-5 hover:border-text-faint transition-colors duration-250"
              onMouseEnter={() => {
                if (idx === 0)      fire('H25', { elementId: 'process-chair-antigravity' })
                else if (idx === 2) fire('H26', { elementId: 'process-chair-cowork' })
                else if (idx === 4) fire('H27', { elementId: 'process-chair-stitch' })
              }}
            >
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-display-md font-display">{c.name}</h3>
                <span className="text-text-faint italic text-sm">{c.tag}</span>
              </div>
              <p className="text-text-muted leading-relaxed max-w-prose">{c.desc}</p>
            </article>
          ))}
        </RevealGroup>
      </section>

      {/* The score */}
      <Reveal>
        <section className="mb-16">
          <h2 className="text-text-muted text-sm uppercase tracking-wider mb-6">— the score (a project, end-to-end) —</h2>
          <ul className="space-y-2 mb-6 font-mono text-sm">
            {SCORE.map((s) => (
              <li key={s.day} className="flex items-baseline gap-6">
                <span className="text-text-primary w-32 flex-shrink-0">{s.day}</span>
                <span className="text-text-muted w-24 flex-shrink-0">— {s.phase}</span>
                <span className="text-text-faint">{s.tools}</span>
              </li>
            ))}
          </ul>
          <p className="text-text-muted leading-relaxed max-w-prose">
            {/* [NEEDS KASH INPUT — closing paragraph: what didn't work, what did, what kash would repeat] */}
            [closing paragraph on this worked example — typically BC Connect.]
          </p>
        </section>
      </Reveal>

      {/* What this isn't */}
      <Reveal delay={0.1}>
        <section className="pt-8 border-t border-surface-raised">
          <h2 className="text-text-muted text-sm uppercase tracking-wider mb-4">— what this isn&apos;t —</h2>
          <p className="text-text-muted leading-relaxed max-w-prose">
            this isn&apos;t &apos;ai writes everything.&apos; the conducting is the work.
            the choices are the work. the tools are the orchestra. if you take the conductor away,
            the music doesn&apos;t play itself; it stops.
          </p>
        </section>
      </Reveal>
    </div>
  )
}
