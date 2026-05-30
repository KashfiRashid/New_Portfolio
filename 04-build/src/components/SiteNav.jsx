import { NavLink, Link } from 'react-router-dom'

/**
 * <SiteNav /> - persistent top navigation.
 *
 * Brand mark: pixel-bitmap K monogram, no frame, no wordmark. The K
 * carries identity alone (page title + URL + hero copy already establish
 * whose portfolio this is). Drawn as a 5x7 pixel grid via filled rects
 * with shape-rendering=crispEdges so the pixels stay sharp on retina +
 * odd zooms. The pixel form bridges the editorial display serif and the
 * pixel-art hero scene - the mark visibly belongs to both worlds.
 * Hover: K shifts to amber-glow and lifts 1px (motion-safe only).
 *
 * Nav links: mono uppercase with animated 1.5px amber underline.
 * Active route gets the underline persistently. Hover scales it in
 * from the left over 200ms on ease-kash-out. All position changes
 * gated behind motion-safe.
 *
 * Resume arrow translates NE on hover (motion-safe).
 *
 * Layout: fixed 48px tall (h-12) - load-bearing, do not change.
 */

const RESUME_URL = 'https://drive.google.com/file/d/1Xkc3TBm40Nrc7kQFNv8FEMYcAeOPt0xg/view?usp=sharing'

export default function SiteNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 inset-x-0 z-50 h-12 bg-surface-deep/85 backdrop-blur-md border-b border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand mark - pixel-bitmap K, no frame, no wordmark. The K is drawn
            as a 5x7 pixel grid (classic terminal-font dimensions) via filled
            rects, with shape-rendering=crispEdges so the pixels stay sharp on
            retina + odd zooms. Sized at ~50% of the 48px nav height to keep
            confident presence without the frame around it. Hover: amber-glow
            color + 1px lift, both motion-safe. */}
        <Link
          to="/"
          aria-label="kashfi rashid - home"
          className="group inline-flex items-center"
        >
          <svg
            viewBox="0 0 5 7"
            width="17"
            height="24"
            fill="currentColor"
            shapeRendering="crispEdges"
            aria-hidden="true"
            className="text-text-primary transition-[color,transform] duration-200 ease-kash-out group-hover:text-accent-glow motion-safe:group-hover:-translate-y-px"
          >
            {/* Row 0: stem + upper terminal */}
            <rect x="0" y="0" width="1" height="1" />
            <rect x="4" y="0" width="1" height="1" />
            {/* Row 1 */}
            <rect x="0" y="1" width="1" height="1" />
            <rect x="3" y="1" width="1" height="1" />
            {/* Row 2 */}
            <rect x="0" y="2" width="1" height="1" />
            <rect x="2" y="2" width="1" height="1" />
            {/* Row 3: junction - arms meet stem */}
            <rect x="0" y="3" width="1" height="1" />
            <rect x="1" y="3" width="1" height="1" />
            {/* Row 4 */}
            <rect x="0" y="4" width="1" height="1" />
            <rect x="2" y="4" width="1" height="1" />
            {/* Row 5 */}
            <rect x="0" y="5" width="1" height="1" />
            <rect x="3" y="5" width="1" height="1" />
            {/* Row 6: stem + lower terminal */}
            <rect x="0" y="6" width="1" height="1" />
            <rect x="4" y="6" width="1" height="1" />
          </svg>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6 md:gap-8">
          <NavItem to="/work" label="work" />
          <NavItem to="/about" label="about me" />
          <ResumeLink />
        </div>
      </div>
    </nav>
  )
}

function NavItem({ to, label }) {
  return (
    <NavLink to={to} end={to === '/'}>
      {({ isActive }) => (
        <span
          className={`group relative inline-block font-mono text-[11px] uppercase tracking-[0.18em] py-1 transition-colors duration-200 ease-kash-out ${
            isActive ? 'text-accent-glow' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          {label}
          <span
            aria-hidden="true"
            className={`absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-accent-glow origin-left transition-transform duration-200 ease-kash-out ${
              isActive ? 'scale-x-100' : 'scale-x-0 motion-safe:group-hover:scale-x-100'
            }`}
          />
        </span>
      )}
    </NavLink>
  )
}

function ResumeLink() {
  return (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted hover:text-text-primary inline-flex items-center gap-1 transition-colors duration-200 ease-kash-out"
    >
      resume
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-200 ease-kash-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
      >
        ^
      </span>
    </a>
  )
}
