import { NavLink, Link } from 'react-router-dom'

/**
 * <SiteNav /> — persistent top navigation, on every page.
 *
 * Three destinations: Work, About me, Resume.
 *   - Work / About are in-app routes (NavLink — active route highlighted).
 *   - Resume opens a PDF in a new tab. Drop the file in /public as
 *     `kashfi-rashid-resume.pdf`; until then the link 404s gracefully.
 *
 * Type treatment: the links use the site's "system chrome" register —
 * uppercase mono with wide tracking — so the bar matches the hero clock
 * and the case-study section rails rather than reading as body text.
 *
 * Fixed, translucent + blurred. 48px tall (h-12); every page clears it
 * (interior pages via .section-page padding, case studies via their
 * own top offsets, the homepage hero clock is padded down).
 */

const RESUME_URL = '/kashfi-rashid-resume.pdf'

const LINK_BASE =
  'font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-200'

function navLinkClass({ isActive }) {
  return `${LINK_BASE} ${
    isActive ? 'text-accent-glow' : 'text-text-muted hover:text-text-primary'
  }`
}

export default function SiteNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 inset-x-0 z-50 h-12 bg-surface-deep/85 backdrop-blur-md border-b border-surface-raised"
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-sm tracking-tight text-text-primary hover:text-accent-glow transition-colors duration-200"
        >
          kashfi rashid
        </Link>

        <div className="flex items-center gap-7">
          <NavLink to="/work" className={navLinkClass}>
            Work
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About me
          </NavLink>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${LINK_BASE} text-text-muted hover:text-text-primary`}
          >
            Resume <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
