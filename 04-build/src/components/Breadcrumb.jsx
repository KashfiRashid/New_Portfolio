import { Link } from 'react-router-dom'

/**
 * <Breadcrumb /> — small navigation row at the top of every interior page.
 * Per /02-wireframes/03-voice.md (and others): "← home   ·   [section]"
 */
export default function Breadcrumb({ section }) {
  return (
    <nav className="breadcrumb mb-12" aria-label="breadcrumb">
      <Link to="/" className="hover:text-text-primary transition-colors duration-250">
        ← home
      </Link>
      <span className="text-text-faint">·</span>
      <span className="text-text-faint">{section}</span>
    </nav>
  )
}
