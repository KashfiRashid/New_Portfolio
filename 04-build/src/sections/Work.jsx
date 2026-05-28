import { useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { useCompanion } from '../companion/CompanionContext.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { PROJECTS, KINDS, OLDER_WORK } from '../pages/projects.js'

/**
 * <Work /> — the project archive.
 *
 * Layout, type and motion all mirror the home page's Featured Work
 * surface so the two pages read as the same site: max-w-6xl, display
 * heading + amber SectionRule, 2-col ProjectCard grid, ease-kash-out
 * 200ms motion. No HomeHero — Work is an archive, not a stage.
 *
 * Filtering:
 *   - Four HR-vocabulary chips (UX / Product / Engineering / 3D) plus
 *     an "All" chip that's the default.
 *   - State syncs to the URL via ?kind=ux so deep links are shareable
 *     and the back button restores filter state.
 *   - Active chip uses the same amber-text + amber-border + soft-tint
 *     recipe as the ProjectCard category pill — one pill system for the
 *     whole site.
 *   - Chip counts (the small number after the label) come from the
 *     registry so the bar is always honest about what each chip returns.
 *
 * Motion:
 *   - AnimatePresence mode="popLayout" lets cards leave in place while
 *     the remaining cards reflow with a Framer layout animation. Feels
 *     tactile, not noisy.
 *   - All transforms are motion-safe via Framer's reduced-motion handling.
 */

const ALL = 'all'

function SectionRule() {
  return <div className="mt-3 h-[2px] w-16 bg-accent-glow" aria-hidden="true" />
}

export default function Work() {
  const { fire } = useCompanion()
  const [params, setParams] = useSearchParams()
  const active = params.get('kind') || ALL

  useEffect(() => {
    fire('E6', { elementId: 'work-page-entry' })
  }, [fire])

  // Counts per chip — computed once. Drives the small numeric badge
  // beside each chip label so the row reads as a live index.
  const counts = useMemo(() => {
    const map = { [ALL]: PROJECTS.length }
    KINDS.forEach((k) => {
      map[k.id] = PROJECTS.filter((p) => p.kind === k.id).length
    })
    return map
  }, [])

  const filtered = active === ALL
    ? PROJECTS
    : PROJECTS.filter((p) => p.kind === active)

  const setKind = (id) => {
    const next = new URLSearchParams(params)
    if (id === ALL) next.delete('kind')
    else next.set('kind', id)
    setParams(next, { replace: false })
  }

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12">
      {/* Header — display heading + amber rule + one-line subtitle.
          Matches the home page's section header pattern exactly. */}
      <section className="relative z-10 px-6 max-w-6xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-display-xl font-display tracking-tight text-text-primary"
        >
          Work
        </motion.h1>
        <SectionRule />
      </section>

      {/* Filter bar — chips share the ProjectCard category-pill recipe
          (amber text, amber border, mono 11px uppercase, rounded-full).
          Active state adds a soft amber tint. Count on the right keeps
          the visitor oriented when filters are applied. */}
      <section className="relative z-10 px-6 mt-12 max-w-6xl mx-auto w-full">
        <div
          role="tablist"
          aria-label="filter work by kind"
          className="flex flex-wrap items-center gap-2"
        >
          <FilterChip
            label="All"
            count={counts[ALL]}
            isActive={active === ALL}
            onClick={() => setKind(ALL)}
          />
          {KINDS.map((k) => (
            <FilterChip
              key={k.id}
              label={k.label}
              count={counts[k.id]}
              isActive={active === k.id}
              onClick={() => setKind(k.id)}
            />
          ))}
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint tabular-nums">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </span>
        </div>
      </section>

      {/* Grid — 2-col on md+, single column on mobile. Matches the home
          Featured grid exactly so the two surfaces share one card system. */}
      <section className="relative z-10 px-6 mt-10 max-w-6xl mx-auto w-full">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <ProjectCard
                  project={p}
                  onHover={() => fire(p.bubbleId, { elementId: `work-card-${p.slug}` })}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-text-faint text-sm font-mono py-12 text-center">
            nothing in this category yet.
          </p>
        )}
      </section>

      {OLDER_WORK.length > 0 && (
        <section className="relative z-10 px-6 mt-20 pt-10 border-t border-surface-raised max-w-6xl mx-auto w-full">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted mb-4">
            older work
          </h2>
          <ul className="space-y-2">
            {OLDER_WORK.map((p) => (
              <li
                key={p.slug}
                className="flex items-baseline justify-between text-text-muted hover:text-text-primary transition-colors duration-200 ease-kash-out"
              >
                <span>{p.name}</span>
                <span className="text-text-faint text-xs italic">{p.note || ''}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

/**
 * <FilterChip /> — one chip in the filter bar.
 *
 * Shares the visual recipe with ProjectCard's category pill so the site
 * has one pill system, not two. Active state adds a soft amber tint
 * (bg-accent-glow/6%) so the row's selection is unmistakable at a glance
 * without the chip flipping to a solid amber fill (which would clash
 * with the rest of the muted UI).
 */
function FilterChip({ label, count, isActive, onClick }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] leading-none rounded-full border px-3 py-1.5 transition-[color,border-color,background-color] duration-200 ease-kash-out ${
        isActive
          ? 'text-accent-glow border-accent-glow bg-accent-glow/[0.06]'
          : 'text-text-muted border-white/15 hover:text-text-primary hover:border-accent-glow/50'
      }`}
    >
      <span>{label}</span>
      <span
        className={`tabular-nums transition-colors duration-200 ease-kash-out ${
          isActive ? 'text-accent-glow/70' : 'text-text-faint'
        }`}
      >
        {count}
      </span>
    </button>
  )
}
