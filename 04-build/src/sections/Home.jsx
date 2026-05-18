import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import { RevealGroup } from '../components/Reveal.jsx'
import Reveal from '../components/Reveal.jsx'
import HomeHero from '../components/HomeHero.jsx'
import { PROJECTS } from '../pages/projects.js'

/**
 * <Home /> — landing surface.
 * Per /02-wireframes/02-home.md.
 *
 * Hero treatment: words stagger in 80ms apart on first mount.
 * Section cards use the .card-lift utility (200ms lift + accent.glow sliver).
 * Cards cascade via RevealGroup on scroll.
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
      {/* Living-window hero — wraps the entire homepage so the pinned
          video stays in the background behind the editorial sections,
          cards, HoF, Featured Work, and "shipped" line. The clock +
          scene status header is pinned to the top of the viewport
          throughout this scroll. The scale + vignette release fires
          right before the footer takes over.
          See components/HomeHero.jsx. */}
      <HomeHero>

      {/* Top bar — name only, no traditional nav. Sits right under the
          hero with minimal padding so the editorial headline that follows
          isn't separated by a perceived empty 'div'. */}
      <Reveal delay={0.1} y={6}>
        <header className="px-6 pt-6 pb-1 flex items-baseline max-w-6xl mx-auto w-full">
          <span className="text-text-primary font-mono text-sm">kashfi rashid</span>
        </header>
      </Reveal>

      {/* Editorial hero — the locked "Ambitious but executioneery." line.
          Top padding intentionally minimal so the headline sits right
          under the top bar instead of with a big gap between them. */}
      <section className="px-6 pt-4 pb-24 md:pt-6 md:pb-32 max-w-3xl mx-auto w-full">
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

      {/* Section entry row — 6 small cards, staggered reveal on scroll */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full">
        <RevealGroup staggerMs={60} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <SectionCard to="/voice"   label="Voice"   preview="opinions i'd actually defend."          bubbleId="H2" elementId="home-card-voice" />
          <SectionCard to="/eye"     label="Eye"     preview="things i find quietly beautiful."       bubbleId="H3" elementId="home-card-eye" />
          <SectionCard to="/work"    label="Work"    preview="six projects. each one taught me something specific." bubbleId="H4" elementId="home-card-work" />
          <SectionCard to="/process" label="Process" preview="how i conduct the orchestra."           bubbleId="H5" elementId="home-card-process" />
          <SectionCard to="/people"  label="People"  preview="named credits."                          bubbleId="H6" elementId="home-card-people" />
          <SectionCard to="/origin"  label="Origin"  preview="dhaka → delta. the long route."         bubbleId="H7" elementId="home-card-origin" />
        </RevealGroup>

        {/* Hall of Fame — full-width, distinct */}
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

      {/* Featured Work — the projects worth leading with. Reads the same
          project registry as the Work archive; each card links straight
          to /projects/<slug>. */}
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
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              onMouseEnter={() => fire(p.bubbleId, { elementId: `home-featured-${p.slug}` })}
              className="card-lift block bg-surface-mid hover:bg-surface-raised px-6 py-6 rounded-sm border border-surface-raised group"
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-display-md font-display mb-2 group-hover:text-accent-glow transition-colors duration-200">
                    {p.name}
                  </h3>
                  <p className="text-text-muted text-sm leading-snug max-w-prose">{p.blurb}</p>
                </div>
                <span className="text-text-muted group-hover:text-accent-glow arrow-slide transition-colors duration-200 ml-4">→</span>
              </div>
            </Link>
          ))}
        </RevealGroup>
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

function SectionCard({ to, label, preview, bubbleId, elementId }) {
  const { fire } = useCompanion()
  return (
    <Link
      to={to}
      onMouseEnter={() => fire(bubbleId, { elementId })}
      className="card-lift block bg-surface-mid hover:bg-surface-raised px-4 py-5 rounded-sm border border-surface-raised group"
    >
      <h3 className="text-display-md font-display mb-2 group-hover:text-accent-glow transition-colors duration-200">
        {label}
      </h3>
      <p className="text-text-muted text-xs leading-snug">{preview}</p>
    </Link>
  )
}
