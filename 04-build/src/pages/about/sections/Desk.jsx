import { Link } from 'react-router-dom'
import {
  WideShell,
  SerifTitle,
  BodyText,
} from '../primitives.jsx'

/**
 * Desk — Block 2, "at the desk".
 *
 * REVISION 5 — restructured per Kash's call.
 *   1. Body copy compresses to the workflow framing line.
 *   2. Four featured projects shown as pixel-art thumbnail cards
 *      (BC Connect, ForeSee, Parpro Consulting, DocuMentor). Each
 *      links to its case study at /projects/<slug>.
 *   3. "Explore all work" CTA below the four cards, linking to /work.
 *   4. Secondary inline list of the remaining projects below the CTA
 *      (BLU, Spectral Bloom, Something Lurking, Us Among AI, Trucking
 *      Academy, Nightshift). Smaller treatment so the four featured
 *      ones carry the visual weight.
 *
 * Thumbnail files live at /about/thumb-<slug>.png. If a file is missing,
 * the broken-image fallback is visible — drop the PNG into
 * 04-build/public/about/ to fix.
 */

const FEATURED = [
  { slug: 'bc-connect',        name: 'BC Connect',        category: 'Design System',   thumb: '/about/thumb-bc-connect.png' },
  { slug: 'foresee',           name: 'ForeSee',           category: 'Product Design',  thumb: '/about/thumb-foresee.png' },
  { slug: 'parpro-consulting', name: 'Parpro Consulting', category: 'Web Design',      thumb: '/about/thumb-parpro-consulting.png' },
  { slug: 'documentor',        name: 'DocuMentor',        category: 'UX Design',       thumb: '/about/thumb-documentor.png' },
]

const OTHERS = [
  { slug: 'us-among-ai',       name: 'Us Among AI' },
  { slug: 'something-lurking', name: 'Something Lurking' },
  { slug: 'spectral-bloom',    name: 'Spectral Bloom' },
  { slug: 'blu',               name: 'BLU' },
  { slug: 'trucking-academy',  name: 'Trucking Academy' },
  { slug: 'nightshift',        name: 'Nightshift' },
]

export default function Desk() {
  return (
    <WideShell id="desk">
      <div className="mx-auto max-w-[680px]">
        <SerifTitle>at the desk</SerifTitle>

        <BodyText>
          Design engineer is a workflow, not a job title. Write the spec,
          design it, build it, ship it. No handoff in the middle.
        </BodyText>
      </div>

      {/* Featured 4 — pixel-art thumbnail cards, each linking to the
          case study. 2-up on mobile, 4-up at md+. */}
      <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-7">
        {FEATURED.map((p) => (
          <FeaturedCard key={p.slug} project={p} />
        ))}
      </div>

      {/* CTA — quiet bordered button, monitor-glow amber on hover */}
      <div className="mt-14 flex justify-center">
        <Link
          to="/work"
          className="font-mono group inline-flex items-center gap-2 border px-5 py-2.5 text-[12px] uppercase tracking-[0.18em] text-text-primary transition-colors duration-200 hover:bg-accent-glow/10"
          style={{ borderColor: 'rgba(232,184,106,0.35)' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E8B86A' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(232,184,106,0.35)' }}
        >
          explore all work
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      {/* Other projects — quiet inline list. Each name is a link to its
          case study. Mono kicker above sets the secondary register. */}
      <div className="mx-auto mt-14 max-w-[680px] text-center">
        <p className="font-mono mb-3 text-[10px] uppercase tracking-[0.22em] text-text-muted">
          — also in the studio —
        </p>
        <p className="font-display text-[16px] italic leading-[1.7] text-text-muted md:text-[17px]">
          {OTHERS.map((p, i) => (
            <span key={p.slug}>
              <Link
                to={`/projects/${p.slug}`}
                className="transition-colors duration-200 hover:text-accent-glow"
              >
                {p.name}
              </Link>
              {i < OTHERS.length - 1 ? <span aria-hidden=" · "> · </span> : null}
            </span>
          ))}
        </p>
      </div>
    </WideShell>
  )
}

/**
 * FeaturedCard — a single pixel-art thumbnail card.
 * - Thumbnail in a square print-frame matching the photo-wall vocabulary.
 * - Project name in font-display.
 * - Category tag in font-mono (small kicker).
 * - The whole card is the link to the case study.
 */
function FeaturedCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <div
        className="relative w-full overflow-hidden transition-colors duration-300"
        style={{
          aspectRatio: '1 / 1',
          backgroundColor: 'rgba(232,230,225,0.04)',
          border: '1px solid rgba(232,184,106,0.18)',
          padding: '8px',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(232,184,106,0.5)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(232,184,106,0.18)' }}
      >
        <img
          src={project.thumb}
          alt={`${project.name} thumbnail.`}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <div className="mt-3 text-center">
        <p className="font-display text-[17px] text-text-primary transition-colors duration-200 group-hover:text-accent-glow md:text-[18px]">
          {project.name}
        </p>
        <p className="font-mono mt-1 text-[10px] uppercase tracking-[0.16em] text-text-muted">
          {project.category}
        </p>
      </div>
    </Link>
  )
}
