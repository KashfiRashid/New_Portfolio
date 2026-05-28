import { useEffect, useRef } from 'react'
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
 * Hero "executioneery." word: tooltip follows the cursor when hovered.
 * The tooltip's `transform` is updated directly on the ref element on
 * every mousemove — no React re-renders, so it stays smooth.
 *
 * Other Projects CTA: monitor-warmed-up hover (border brightens, text
 * shifts to amber, soft amber halo via box-shadow). No block fill.
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

function SectionRule() {
  return <div className="mt-3 h-[2px] w-16 bg-accent-glow" aria-hidden="true" />
}

/**
 * HeroWord — single word in the hero headline. The last word
 * ("executioneery.") gets a cursor-following tooltip that explains
 * the made-up word. Position is updated via direct DOM mutation on
 * the tooltip's transform — no React re-renders during mousemove.
 */
function HeroWord({ word, isLast, delay }) {
  const tooltipRef = useRef(null)

  const updatePos = isLast
    ? (e) => {
        if (!tooltipRef.current) return
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        tooltipRef.current.style.transform = `translate(${x + 16}px, ${y + 18}px)`
      }
    : undefined

  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] }}
      onMouseEnter={updatePos}
      onMouseMove={updatePos}
      className={`relative inline-block mr-[0.25em] ${isLast ? 'group/exec' : ''}`}
    >
      {word}
      {/* Tooltip styled exactly like the ProjectCard category pill
          (DESIGN SYSTEM / PRODUCT DESIGN etc.): amber text, amber
          border at 40% opacity, rounded-full, mono 11px uppercase
          with 0.18em tracking. Quiet dark backdrop with light blur
          for legibility over the pixel-art hero. */}
      {isLast && (
        <span
          ref={tooltipRef}
          role="tooltip"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-50 inline-flex items-center whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-accent-glow leading-none rounded-full px-2.5 py-1 opacity-0 group-hover/exec:opacity-100 transition-opacity duration-200 ease-kash-out"
          style={{
            backgroundColor: '#16191B',
          }}
        >
          a word i made up. means i ship.
        </span>
      )}
    </motion.span>
  )
}

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
            className="text-display-xl font-display leading-tight mb-8 tracking-tight transition-[letter-spacing] duration-500 ease-kash-out"
            onMouseEnter={(e) => {
              e.currentTarget.style.letterSpacing = '-0.04em'
              fire('H1', { elementId: 'home-headline' })
            }}
            onMouseLeave={(e) => { e.currentTarget.style.letterSpacing = '' }}
          >
            {HEADLINE.map((word, i) => (
              <HeroWord
                key={`${word}-${i}`}
                word={word}
                isLast={i === HEADLINE.length - 1}
                delay={i * 0.08}
              />
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-text-faint text-sm font-mono"
          >
            Currently at FIC IT Squad · graduating SFU SIAT June 10 · Delta, BC
          </motion.p>
        </section>

      {/* Featured Projects */}
      <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto w-full">
        <div className="mb-10">
          <h2 className="text-display-md font-display tracking-tight text-text-primary">Featured Projects</h2>
          <SectionRule />
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
        <h2 className="text-display-md font-display tracking-tight text-text-primary">Other Projects</h2>
        <SectionRule />

        <p className="text-text-muted text-sm mt-4 max-w-md">
          Hover to preview. Click to read.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            to="/work"
            className="group font-mono inline-flex items-center gap-3 border border-accent-glow/50 text-text-primary hover:border-accent-glow hover:text-accent-glow px-10 py-5 text-[14px] uppercase tracking-[0.22em] transition-[border-color,color,box-shadow] duration-300 ease-kash-out hover:[box-shadow:0_0_32px_-4px_rgba(232,184,106,0.4)]"
          >
            explore other work
            <span className="inline-block transition-transform duration-200 ease-kash-out motion-safe:group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="hidden md:block relative h-[640px] mt-16">
          {others.map((p, i) => {
            const pos = COLLAGE_POSITIONS[i] || COLLAGE_POSITIONS[0]
            return <CollageCard key={p.slug} project={p} pos={pos} />
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-10 md:hidden">
          {others.map((p) => (
            <Link to={`/projects/${p.slug}`} key={p.slug} className="group block">
              <div
                className="aspect-[4/3] overflow-hidden border transition-colors duration-200 ease-kash-out group-hover:border-accent-glow/50"
                style={{ borderColor: 'rgba(232,184,106,0.18)' }}
              >
                <img
                  src={p.image}
                  alt={`${p.name} preview.`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-200 ease-kash-out motion-safe:group-hover:scale-[1.03]"
                />
              </div>
              <p className="font-display text-text-primary text-[15px] mt-2 transition-colors duration-200 ease-kash-out group-hover:text-accent-glow">
                {p.name}
              </p>
            </Link>
          ))}
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
              <span className="text-text-muted group-hover:text-accent-glow arrow-slide transition-colors duration-200 ease-kash-out">→</span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Quiet moment line */}
      <Reveal delay={0.2}>
        <section className="relative z-10 px-6 py-8 max-w-3xl mx-auto w-full">
          <p className="text-text-faint text-sm leading-relaxed">
            the site updates when someone helps make it better.{' '}
            <Link to="/hall-of-fame" className="hover:text-text-muted underline-offset-4 hover:underline transition-colors duration-200 ease-kash-out">
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
 * CollageCard — spotlight hover pattern.
 */
function CollageCard({ project, pos }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group absolute block transition-transform duration-200 ease-kash-out hover:!z-50 motion-safe:hover:scale-[1.03] hover:[transform:rotate(0deg)] motion-reduce:hover:[transform:rotate(var(--rest-rot))]"
      style={{
        top: pos.top,
        left: pos.left,
        width: pos.width,
        '--rest-rot': pos.rot,
        transform: 'rotate(var(--rest-rot))',
        transformOrigin: 'center bottom',
        zIndex: pos.z,
      }}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden transition-colors duration-200 ease-kash-out group-hover:border-accent-glow/60"
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
          className="absolute inset-1.5 h-[calc(100%-12px)] w-[calc(100%-12px)] object-cover brightness-[0.55] group-hover:brightness-100 transition-[filter] duration-200 ease-kash-out"
        />

        <div
          className="absolute inset-1.5 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-kash-out pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(15,17,18,0.9) 0%, rgba(15,17,18,0.45) 40%, rgba(15,17,18,0) 75%)',
          }}
        >
          <p
            className="font-display text-text-primary text-[20px] leading-tight tracking-tight"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
          >
            {project.name}
          </p>
        </div>
      </div>
    </Link>
  )
}
          <p
            className="font-display text-text-primary text-[20px] leading-tight tracking-tight"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
          >
            {project.name}
          </p>
        </div>
      </div>
    </Link>
  )
}

  )
}
}
