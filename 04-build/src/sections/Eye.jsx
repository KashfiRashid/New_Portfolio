import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'

/**
 * <Eye /> — visual taste page.
 * Per /02-wireframes/04-eye.md.
 *
 * Image grid is empty in v1 until [NEEDS KASH INPUT — Q F] raw material lands.
 * Reference list pulls from references-annotated.md sections 6/7.
 */

const REFERENCES = [
  // [NEEDS KASH INPUT] confirm URLs + 2-3 specific moves to borrow per ref
  { name: 'Seido',                why: 'restraint as a craft',                url: '#' },
  { name: 'Spendy / FutureSpend', why: 'typography that breathes',            url: '#' },
  // Add 3-7 more once Kash provides them
]

export default function Eye() {
  const { fire } = useCompanion()

  useEffect(() => {
    fire('E5', { elementId: 'eye-page-entry' })
  }, [fire])

  return (
    <div className="section-page">
      <Reveal>
        <Breadcrumb section="eye" />
      </Reveal>

      <header className="section-header">
        <motion.h1
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Eye
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          things i find quietly beautiful. not curated. just collected.
        </motion.p>
      </header>

      {/* Image grid — empty in v1 */}
      <Reveal>
        <section className="mb-16">
          <div className="bg-surface-mid border border-surface-raised border-dashed rounded-sm px-6 py-12 text-center text-text-faint">
            <p className="italic">
              8–12 images land here once raw material is gathered.
            </p>
            <p className="text-xs mt-2">[NEEDS KASH INPUT — Q F]</p>
          </div>
        </section>
      </Reveal>

      {/* References */}
      <Reveal delay={0.1}>
        <section>
          <h2 className="text-text-muted text-sm uppercase tracking-wider mb-6">— references —</h2>
          <ul className="space-y-3">
            {REFERENCES.map((ref) => (
              <li
                key={ref.name}
                className="flex flex-wrap items-baseline gap-x-4 text-text-muted hover:text-text-primary transition-colors duration-250"
              >
                <span className="text-text-primary">{ref.name}</span>
                <span>—</span>
                <span className="flex-1 min-w-[200px]">{ref.why}</span>
                <a href={ref.url} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-text-faint hover:text-accent-glow">
                  {ref.url}
                </a>
              </li>
            ))}
            <li className="text-text-faint italic text-sm pt-4">
              [NEEDS KASH INPUT — full reference list, 5–10 entries]
            </li>
          </ul>
        </section>
      </Reveal>
    </div>
  )
}
