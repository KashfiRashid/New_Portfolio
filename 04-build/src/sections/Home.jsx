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
 * Page order: editorial hero → Featured Projects (4) → Other Projects
 *             collage → Hall of Fame → shipped line.
 *
 * REVISION (later 5/27): mono micro-kickers above each section heading
 * are removed — they were chrome with no information value. Section
 * headings now stand alone in display serif. CTA promoted to a fuller
 * button with stronger amber emphasis. Collage container height
 * increased to fit the tilted bottom-row cells without overlapping
 * the CTA below.
 */

const HEADLINE = ['Ambitious', 'but', 'executioneery.']

const COLLAGE_POSITIONS = [
  { top: '0%',   left: '0%',    width: '36%', rot: '-3deg',  z: 10 },
  { top: '6%',   left: '33%',   width: '36%', rot: '2deg',   z: 20 },
  { top: '2%',   left: '64%',   width: '36%', rot: '-1.5deg', z: 14 },
  { top: '46%',  left: '6%',    width: '36%', rot: '1.5deg', z: 24 },
  { top: '52%',  left: '34%',   width: '36%', rot: '-2deg',  z: 30 },
  { top: '48%',  left: '62%',   width: '36%', rot: '3deg',   z: 18 },
]

export default function Home() {
  const { fire } = useCompanion()

  useEffect(() => {
    const t = setTimeout(() => fire('E3', { elementId: 'home-entry-after-3s' }), 3000)
    return () => clearTimeout(t)
  }, [fire])

  const featured = PROJECTS.filter((p) => p.featured)
  const others   = PROJECTS.filter((p) => !p.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <HomeHero>

      {/* Editorial hero */}
      <section className="relative z-10 px-6 pt-10 pb-24 md:pt-14 md:pb-32 max-w-3xl mx-auto w-full">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-text-faint text-sm font-mono"
          >
            Currently at FIC IT Squad · graduating SFU SIAT June 10 · Delta, BC
          </motion.p>
        </section>

      {/* Featured Projects */}
      <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto w-full">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <h2 className="text-display-md font-display tracking-tight text-text-primary">Featured Projects</h2>
          <Link
            to="/work"
            className="text-text-faint text-xs hover:text-text-muted underline-offset-4 hover:underline whitespace-nowrap font-mono uppercase tracking-[0.14em]"
          >
            see all work →
          </Link>
        </div>
        <RevealGroup staggerMs={80} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              onHover={() => fire(p.bubbleId, { elementId: `home-featured-${p.slug}` })}
            />
          ))}
        </RevealGroup>
      </section>

      {/* Other Projects */}
      <section className="relative z-10 px-6 pt-20 pb-12 max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-display-md font-display tracking-tight text-text-primary">Other Projects</h2>
          <p className="text-text-muted text-sm mt-3 max-w-md">Hover to bring one forward. Click to read.</p>
        </div>

        {/* Desktop collage — container height tuned so the bottom-row
            tilted cells don't bleed into the CTA below. The tallest
            possible cell is ~top:52% + rotated aspect-[4/3], which at
            36% width of max-w-6xl puts the bottom edge near ~620px. */}
        <div className="hidden md:block relative h-[640px] mb-20">
          {others.map((p, i) => {
            const pos = COLLAGE_POSITIONS[i] || COLLAGE_POSITIONS[0]
            return <CollageCard key={p.slug} project={p} pos={pos} />
          })}
        </div>

        {/* Mobile fallback */}
        <div className="grid grid-cols-2 gap-3 mb-12 md:hidden">
          {others.map((p) => (
            <Link to={`/projects/${p.slug}`} key={p.slug} className="group block">
              <div
                className="aspect-[4/3] overflow-hidden border"
                style={{ borderColor: 'rgba(232,184,106,0.18)' }}
              >
                <img
                  src={p.image}
                  alt={`${p.name} preview.`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <p className="text-text-muted text-xs font-mono mt-2 uppercase tracking-wider">{p.name}</p>
            </Link>
          ))}
        </div>

        {/* CTA — promoted to a fuller bordered button with stronger
            amber emphasis. Sits on its own with breathing room above
            and below so it reads as a clear next step, not as a tag
            tacked onto the collage. */}
        <div className="flex justify-center pt-4">
          <Link
            to="/work"
            className="font-mono group inline-flex items-center gap-3 border-2 px-8 py-4 text-[13px] uppercase tracking-[0.2em] text-text-primary transition-all duration-200 hover:bg-accent-glow/10"
            style={{ borderColor: 'rgba(232,184,106,0.55)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E8B86A' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(232,184,106,0.55)' }}
          >
            explore other work
            <span className="text-accent-glow transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* Hall of Fame */}
      <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto w-full">
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
        <section className="relative z-10 px-6 py-8 max-w-3xl mx-auto w-full">
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

/**
 * CollageCard — one tilted framed image in the desktop overlapping collage.
 */
function CollageCard({ project, pos }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group absolute block transition-all duration-300 ease-out hover:!z-50"
      style={{
        top: pos.top,
        left: pos.left,
        width: pos.width,
        transform: `rotate(${pos.rot})`,
        zIndex: pos.z,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${pos.rot})`
      }}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          backgroundColor: 'rgba(232,230,225,0.04)',
          border: '1px solid rgba(232,184,106,0.22)',
          padding: '6px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        <img
          src={project.image}
          alt={`${project.name} preview.`}
          loading="lazy"
          className="absolute inset-1.5 h-[calc(100%-12px)] w-[calc(100%-12px)] object-cover"
        />
      </div>
      <p
        className="font-mono mt-2 text-center text-[10px] uppercase tracking-[0.16em] text-text-muted transition-colors duration-200 group-hover:text-accent-glow"
      >
        {project.name}
      </p>
    </Link>
  )
}
