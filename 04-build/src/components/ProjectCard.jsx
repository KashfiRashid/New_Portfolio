import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * <ProjectCard /> — one project, rendered as an image card.
 * Shared by Home's Featured Work and the Work archive.
 *
 * Category pills carry a discipline-specific color so the eye picks up
 * "this is design system / this is 3D animation" before reading the
 * label. Subtle background fill + tinted border + bright text.
 */
const CATEGORY_STYLES = {
  'Design System':   { color: '#5B9DD9', bg: 'rgba(91, 157, 217, 0.12)', border: 'rgba(91, 157, 217, 0.50)' },
  '3D Animation':    { color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.12)', border: 'rgba(167, 139, 250, 0.50)' },
  'Creative Coding': { color: '#E879F9', bg: 'rgba(232, 121, 249, 0.12)', border: 'rgba(232, 121, 249, 0.50)' },
  'Game Design':     { color: '#4ADE80', bg: 'rgba(74, 222, 128, 0.12)',  border: 'rgba(74, 222, 128, 0.50)' },
  'Product Design':  { color: '#818CF8', bg: 'rgba(129, 140, 248, 0.12)', border: 'rgba(129, 140, 248, 0.50)' },
  'Web Design':      { color: '#FB923C', bg: 'rgba(251, 146, 60, 0.12)',  border: 'rgba(251, 146, 60, 0.50)' },
  'UX Design':       { color: '#22D3EE', bg: 'rgba(34, 211, 238, 0.12)',  border: 'rgba(34, 211, 238, 0.50)' },
  'Data Analysis':   { color: '#FCD34D', bg: 'rgba(252, 211, 77, 0.12)',  border: 'rgba(252, 211, 77, 0.50)' },
}
const CATEGORY_FALLBACK = {
  color: '#E8B86A',
  bg: 'rgba(232, 184, 106, 0.10)',
  border: 'rgba(232, 184, 106, 0.45)',
}

export default function ProjectCard({ project, onHover }) {
  const { slug, name, blurb, category, image, imagePosition, color, status } = project
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = image && !imgFailed
  const objectPosClass =
    imagePosition === 'top' ? 'object-top'
      : imagePosition === 'bottom' ? 'object-bottom'
      : 'object-center'
  const cat = CATEGORY_STYLES[category] || CATEGORY_FALLBACK

  return (
    <Link
      to={`/projects/${slug}`}
      onMouseEnter={onHover}
      className="card-lift block bg-surface-mid hover:bg-surface-raised border border-surface-raised rounded-sm overflow-hidden group"
    >
      {/* Media */}
      <div className="aspect-video relative overflow-hidden border-b border-surface-raised">
        {showImage ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            draggable={false}
            onError={() => setImgFailed(true)}
            className={`absolute inset-0 w-full h-full object-cover ${objectPosClass}`}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(150deg, ${color || '#1A1D1F'} 0%, rgba(15,17,18,0.55) 130%)`,
            }}
            aria-hidden="true"
          >
            <span
              className="font-display leading-none select-none"
              style={{ fontSize: '5.5rem', color: 'rgba(255,255,255,0.13)' }}
            >
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="px-6 py-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {/* Category pill — discipline color, true pill shape, no dot. */}
          <span
            className="inline-flex items-center font-mono text-xs uppercase tracking-[0.14em] font-medium rounded-full px-3 py-1 leading-none border"
            style={{
              color: cat.color,
              backgroundColor: cat.bg,
              borderColor: cat.border,
            }}
          >
            {category}
          </span>
          {status === 'coming-soon' && (
            <span
              className="font-mono text-xs uppercase tracking-[0.14em] rounded-full px-3 py-1 leading-none border"
              style={{
                color: 'rgba(212, 212, 216, 0.85)',
                backgroundColor: 'rgba(212, 212, 216, 0.06)',
                borderColor: 'rgba(212, 212, 216, 0.30)',
              }}
            >
              Coming soon
            </span>
          )}
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-display-md font-display group-hover:text-accent-glow transition-colors duration-200">
            {name}
          </h3>
          <span className="text-text-muted group-hover:text-accent-glow arrow-slide transition-colors duration-200">
            →
          </span>
        </div>
        <p className="text-text-muted text-sm leading-snug max-w-prose mt-2">{blurb}</p>
      </div>
    </Link>
  )
}
