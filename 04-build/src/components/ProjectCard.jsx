import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * <ProjectCard /> — one project, rendered as an image card.
 * Shared by Home's Featured Work and the Work archive.
 *
 * Media area (16:9):
 *   - project.image → the hero image, cropped to fit (object-cover).
 *     If that image fails to load, it falls back to the color panel.
 *   - otherwise     → a themed solid-color panel (project.color) with
 *     the project's initial as a faint watermark.
 *
 * Meta: category line · name · blurb. A 'coming-soon' status adds a badge.
 */
export default function ProjectCard({ project, onHover }) {
  const { slug, name, blurb, category, image, color, status } = project
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = image && !imgFailed

  return (
    <Link
      to={`/projects/${slug}`}
      onMouseEnter={onHover}
      className="card-lift block bg-surface-mid hover:bg-surface-raised border border-surface-raised rounded-sm overflow-hidden group"
    >
      {/* Media — real image cropped to fit, or a themed color panel. */}
      <div className="aspect-video relative overflow-hidden border-b border-surface-raised">
        {showImage ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            draggable={false}
            onError={() => setImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
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
        <div className="mb-2 flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
            {category}
          </span>
          {status === 'coming-soon' && (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-glow border border-accent-glow/30 rounded-sm px-1.5 py-0.5 leading-none">
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
