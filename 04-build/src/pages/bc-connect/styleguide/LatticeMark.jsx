/**
 * Lattice Mark — recreated as plain JSX from the Open Ground source
 * component (Style_Guide/components/lattice-mark.tsx).
 *
 * Four outer nodes connecting to one center: a diagram of an ecosystem,
 * not a logo. Recreated (not screenshotted) so it stays exact if the
 * source mark ever changes.
 *
 * NOTE: the four corner-to-corner edge lines from the source component
 * are intentionally omitted here, so the mark matches the shipped
 * favicon — which uses diagonal connectors only.
 *
 *   variant="light"  → signal green (#1B6B4F)  for white grounds
 *   variant="signal" → signal green (#1B6B4F)  for tinted grounds
 *   variant="dark"   → teal         (#4EE0B8)  for dark grounds
 */
export function LatticeMark({ size = 28, variant = 'light', className = '', style }) {
  const color = variant === 'dark' ? '#4EE0B8' : '#1B6B4F'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={`lattice-mark ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Nodes — four corners + center */}
      <circle cx="4" cy="4" r="2.5" fill={color} />
      <circle cx="24" cy="4" r="2.5" fill={color} opacity="0.5" />
      <circle cx="4" cy="24" r="2.5" fill={color} opacity="0.5" />
      <circle cx="24" cy="24" r="2.5" fill={color} opacity="0.3" />
      <circle cx="14" cy="14" r="3" fill={color} />
      {/* Diagonals — corners to center */}
      <line x1="4" y1="4" x2="14" y2="14" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <line x1="24" y1="4" x2="14" y2="14" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <line x1="4" y1="24" x2="14" y2="14" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <line x1="24" y1="24" x2="14" y2="14" stroke={color} strokeWidth="1.2" opacity="0.2" />
    </svg>
  )
}

export default LatticeMark
