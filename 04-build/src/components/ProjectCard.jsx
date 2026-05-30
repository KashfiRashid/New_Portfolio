import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * <ProjectCard /> - one project, rendered as an image card.
 * Single category-label treatment across the archive. Scales to any
 * number of projects/categories.
 */
export default function ProjectCard({ project, onHover }) {
  const { slug, name, blurb, category, image, imagePosition, color, status } = project
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = image && !imgFailed
  const objectPosClass =
    imagePosition === 'top' ? 'object-top'
      : imagePosition === 'bottom' ? 'object-bottom'
      : 'object-center'

  return (
    <Link
      to={`/projects/${slug}`}
      onMouseEnter={onHover}
      className="card-lift block bg-surface-mid hover:bg-surface-raised border border-surface-raised rounded-sm overflow-hidden group"
    >
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

      <div className="px-6 py-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.18em] text-accent-glow border border-accent-glow/40 rounded-full px-2.5 py-1 leading-none">
            {category}
          </span>
          {status === 'coming-soon' && (
            <span className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted border border-text-muted/30 rounded-full px-2.5 py-1 leading-none">
              Coming soon
            </span>
          )}
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-display-md font-display group-hover:text-accent-glow transition-colors duration-200">
            {name}
          </h3>
          <span className="text-text-muted group-hover:text-accent-glow arrow-slide transition-colors duration-200">
            &#x2192;
          </span>
        </div>
        <p className="text-text-muted text-sm leading-snug max-w-prose mt-2">{blurb}</p>
      </div>
    </Link>
  )
}
