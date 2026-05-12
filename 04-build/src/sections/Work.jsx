import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import { RevealGroup } from '../components/Reveal.jsx'

/**
 * <Work /> — project index.
 * Per /02-wireframes/05-work.md.
 *
 * v1 featured: BLU · Spectral Bloom · Something Lurking · BC Connect ·
 * PitchFlow · ForeSee. Us Among AI deferred until [NEEDS KASH INPUT —
 * Kash's role is locked].
 */

const PROJECTS = [
  {
    slug: 'blu',
    name: 'BLU',
    voiceLine: "proudest of the sound. the moment that matters is 0:42.",
    bubbleId: 'H17',
  },
  {
    slug: 'spectral-bloom',
    name: 'Spectral Bloom',
    voiceLine: 'visuals that listen.',
    bubbleId: 'H18',
  },
  {
    slug: 'something-lurking',
    name: 'Something Lurking',
    voiceLine: "the brief said calm. i shipped quietly unsettling.", // [NEEDS KASH INPUT]
    bubbleId: 'H19',
  },
  {
    slug: 'bc-connect',
    name: 'BC Connect',
    voiceLine: 'open ground design system + six frontend features built in antigravity.',
    bubbleId: 'H20',
  },
  {
    slug: 'pitchflow',
    name: 'PitchFlow',
    voiceLine: 'the pitch deck that won the room.', // [NEEDS KASH INPUT]
    bubbleId: 'H21',
  },
  {
    slug: 'foresee',
    name: 'ForeSee',
    voiceLine: '[real description needed].', // [NEEDS KASH INPUT — placeholder]
    bubbleId: 'H22',
  },
]

const OLDER = [
  { slug: 'documentor-app',  name: 'Documentor App'   },
  { slug: 'parpro',          name: 'Parpro Consulting' },
  { slug: 'trucking-academy', name: 'Trucking Academy' },
]

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
          six projects. each one taught me something specific.
        </motion.p>
      </header>

      <RevealGroup staggerMs={80} className="space-y-6">
        {PROJECTS.map((p) => (
          <Link
            key={p.slug}
            to={`/work/${p.slug}`}
            onMouseEnter={() => fire(p.bubbleId, { elementId: `work-card-${p.slug}` })}
            className="card-lift block bg-surface-mid hover:bg-surface-raised border border-surface-raised rounded-sm group"
          >
            {/* Hero placeholder — replace with image / video */}
            <div className="aspect-video bg-surface-deep border-b border-surface-raised flex items-center justify-center text-text-faint italic text-sm">
              [hero image / video — {p.name}]
            </div>
            <div className="px-6 py-5 flex items-baseline justify-between">
              <div>
                <h2 className="text-display-md font-display mb-2">{p.name}</h2>
                <p className="text-text-muted leading-snug max-w-prose">{p.voiceLine}</p>
              </div>
              <span className="text-text-muted group-hover:text-accent-glow arrow-slide transition-colors duration-250 ml-4">→</span>
            </div>
          </Link>
        ))}
      </RevealGroup>

      {/* Older work */}
      <Reveal delay={0.1}>
        <section className="mt-16 pt-8 border-t border-surface-raised">
          <h2 className="text-text-muted text-sm uppercase tracking-wider mb-4">— older work —</h2>
          <ul className="space-y-2">
            {OLDER.map((p) => (
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
