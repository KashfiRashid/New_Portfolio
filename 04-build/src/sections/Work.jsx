import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal, { RevealGroup } from '../components/Reveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { PROJECTS, OLDER_WORK } from '../pages/projects.js'

/**
 * <Work /> — the project archive. Image cards via the shared
 * <ProjectCard />; reads the project registry (pages/projects.js) —
 * the single source of truth shared with Home's Featured Work.
 */

export default function Work() {
  const { fire } = useCompanion()

  useEffect(() => {
    fire('E6', { elementId: 'work-page-entry' })
  }, [fire])

  return (
    <div className="section-page">
      <Reveal>
        <Breadcrumb section="work" />
      </Reveal>

      <header className="section-header">
        <motion.h1
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          the full archive. each one taught me something specific.
        </motion.p>
      </header>

      <RevealGroup staggerMs={80} className="space-y-6">
        {PROJECTS.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            onHover={() => fire(p.bubbleId, { elementId: `work-card-${p.slug}` })}
          />
        ))}
      </RevealGroup>

      {/* Older work */}
      <Reveal delay={0.1}>
        <section className="mt-16 pt-8 border-t border-surface-raised">
          <h2 className="text-text-muted text-sm uppercase tracking-wider mb-4">— older work —</h2>
          <ul className="space-y-2">
            {OLDER_WORK.map((p) => (
              <li key={p.slug} className="flex items-baseline justify-between text-text-muted hover:text-text-primary transition-colors duration-250">
                <span>{p.name}</span>
                <span className="text-text-faint text-xs italic">[NEEDS KASH INPUT — keep / retire / refresh]</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </div>
  )
}
