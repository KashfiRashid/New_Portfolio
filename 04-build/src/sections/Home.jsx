import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import Reveal, { RevealGroup } from '../components/Reveal.jsx'
import HomeHero from '../components/HomeHero.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { PROJECTS } from '../pages/projects.js'

/**
 * <Home /> — landing surface.
 *
 * Section navigation lives in the persistent <SiteNav /> top bar.
 * Page order: editorial hero → Featured Work → Hall of Fame → shipped line.
 */

const HEADLINE = ['Ambitious', 'but', 'executioneery.']

export default function Home() {
  const { fire } = useCompanion()

  // E3 — fires 3s after Home is rendered (post-onboarding)
  useEffect(() => {
    const t = setTimeout(() => fire('E3', { elementId: 'home-entry-after-3s' }), 3000)
    return () => clearTimeout(t)
  }, [fire])

  return (
    <div className="min-h-screen flex flex-col">
      <HomeHero>

      {/* Editorial hero — the locked "Ambitious but executioneery." line. */}
      <section className="px-6 pt-10 pb-24 md:pt-14 md:pb-32 max-w-3xl mx-auto w-full">
          <h1
            className="text-display-xl font-display leading-tight mb-8 tracking-tight transition-[letter-spacing] duration-500"
            onMouseEnter={(e) => {
              e.currentTarget.style.letterSpacing = '-0.04em'
              fire('H1', { elementId: 'home-headline' })
            }}
            onMouseLeave={(e) => { e.currentTarget.style.letterSpacing = '' }}
          >
            {HEADLINE.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-text-muted text-lg leading-relaxed max-w-prose mb-12"
          >
            {/* Sub-line — calibrated voice. [NEEDS KASH INPUT to confirm] */}
            I design and ship. Mostly at 2am. Mostly with AI as the orchestra and me as the conductor.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-text-faint text-sm font-mono"
          >
            {/* [NEEDS KASH INPUT — confirm exact phrasing] */}
            Currently at FIC IT Squad · graduating SFU SIAT June 10 · Delta, BC
          </motion.p>
        </section>

      {/* Featured Work — the projects worth leading with. Image cards via
          the shared <ProjectCard />; reads the project registry. */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full">
        <Reveal>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-text-muted text-sm uppercase tracking-wider">— featured work —</h2>
            <Link
              to="/work"
              className="text-text-faint text-xs hover:text-text-muted underline-offset-4 hover:underline"
            >
              see all work →
            </Link>
          </div>
        </Reveal>
        <RevealGroup staggerMs={80} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.filter((p) => p.featured).map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              onHover={() => fire(p.bubbleId, { elementId: `home-featured-${p.slug}` })}
            />
          ))}
        </RevealGroup>
      </section>

      {/* Hall of Fame — sits below Featured Work. The /hall-of-fame page
          is kept but lives outside the top nav; this card is its way in. */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full">
        <Reveal delay={0.1}>
          <Link
            to="/hall-of-fame"
            className="card-lift block bg-surface-mid hover:bg-surface-raised px-6 py-8 rounded-sm border border-surface-raised group"
            onMouseEnter={() => fire('H8', { elementId: 'home-card-hof' })}
          >
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-display-md font-display mb-2">Hall of Fame</h2>
                <p className="text-text-muted text-sm">the site got better because these people showed up.</p>
              </div>
              <span className="text-text-muted group-hover:text-accent-glow arrow-slide transition-colors duration-200">→</span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Quiet moment line */}
      <Reveal delay={0.2}>
        <section className="px-6 py-8 max-w-3xl mx-auto w-full">
          <p className="text-text-faint text-sm leading-relaxed">
            the site updates when someone helps make it better.{' '}
            <Link to="/hall-of-fame" className="hover:text-text-muted underline-offset-4 hover:underline">
              see what&apos;s shipped
            </Link>
          </p>
        </section>
      </Reveal>
      </HomeHero>
    </div>
  )
}
