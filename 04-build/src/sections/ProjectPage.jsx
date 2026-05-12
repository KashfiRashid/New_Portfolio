import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import Reveal from '../components/Reveal.jsx'

/**
 * <ProjectPage /> — individual project page (e.g. /work/blu)
 * Per /02-wireframes/05-work.md "/work/<slug>" section.
 *
 * Stub for v1 — content per project lands as Kash writes it.
 * Sections (consistent across all 6):
 *   1. Title + meta row
 *   2. Hero
 *   3. The brief in one paragraph
 *   4. The moment that mattered
 *   5. What I changed
 *   6. What this taught me
 *   7. Next project tease
 */
export default function ProjectPage() {
  const { slug } = useParams()
  const { fire } = useCompanion()

  useEffect(() => {
    fire('C5', { elementId: `project-${slug}-entry` })
  }, [fire, slug])

  return (
    <div className="section-page">
      <Reveal>
        <nav className="breadcrumb mb-12" aria-label="breadcrumb">
          <Link to="/work" className="hover:text-text-primary transition-colors duration-250">← work</Link>
          <span className="text-text-faint">·</span>
          <span className="text-text-faint">{slug}</span>
        </nav>
      </Reveal>

      <header className="mb-12">
        <motion.h1
          className="text-display-xl font-display mb-4 capitalize"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {slug.replace(/-/g, ' ')}
        </motion.h1>
        <motion.p
          className="text-text-faint font-mono text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* [NEEDS KASH INPUT — meta row per project: year · role · collaborators] */}
          year · role · with [collaborator]
        </motion.p>
      </header>

      {/* Hero */}
      <Reveal>
        <div className="aspect-video bg-surface-mid border border-surface-raised rounded-sm flex items-center justify-center text-text-faint italic mb-12">
          [hero image / video / sound]
        </div>
      </Reveal>

      {/* Sections — placeholder for content */}
      <article className="space-y-12 text-text-primary leading-relaxed">

        <Reveal>
          <section>
            <h2 className="text-display-md font-display mb-3">The brief in one paragraph</h2>
            <p className="text-text-muted max-w-prose">
              [NEEDS KASH INPUT — paragraph: what the project was, why it existed, who it was for.
              Inline credits at the bottom.]
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.05}>
          <section>
            <h2 className="text-display-md font-display mb-3">The moment that mattered</h2>
            <p className="text-text-muted max-w-prose">
              [NEEDS KASH INPUT — the specific moment. for BLU: 0:42 sound. for BC Connect: a particular interaction.]
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section>
            <h2 className="text-display-md font-display mb-3">What I changed</h2>
            <p className="text-text-muted max-w-prose">
              [NEEDS KASH INPUT — iterations, trade-offs, decisions. notebook tone.]
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.15}>
          <section>
            <h2 className="text-display-md font-display mb-3">What this taught me</h2>
            <p className="text-text-muted max-w-prose">
              [NEEDS KASH INPUT — 1-2 sentences, voice-anchored.]
            </p>
            <p className="text-text-faint text-sm mt-3">
              See also: <Link to="/voice" className="hover:text-text-primary underline-offset-4 hover:underline">opinion in /voice</Link>
            </p>
          </section>
        </Reveal>

      </article>

      <Reveal delay={0.2}>
        <div className="mt-16 pt-8 border-t border-surface-raised">
          <Link to="/work" className="text-text-muted hover:text-text-primary transition-colors duration-250">
            ← all work
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
