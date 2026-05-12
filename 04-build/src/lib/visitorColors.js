// Visitor color palette — 8 colors from /01-brand-book/06-visual-direction.md
// Locked v1 set. Hex values are starting points; principle (desaturated,
// dark-surface-friendly, distinguishable from accent.glow) is what matters.
// [NEEDS KASH INPUT] confirm palette, or adjust hex values.

export const VISITOR_COLORS = [
  { id: 'crimson', label: 'crimson', hex: '#D9536F' },
  { id: 'amber',   label: 'amber',   hex: '#D9A03B' },
  { id: 'olive',   label: 'olive',   hex: '#7F8C4D' },
  { id: 'teal',    label: 'teal',    hex: '#3F8C8C' },
  { id: 'slate',   label: 'slate',   hex: '#6B7B8C' },
  { id: 'plum',    label: 'plum',    hex: '#8C5F8C' },
  { id: 'rose',    label: 'rose',    hex: '#D98CA0' },
  { id: 'sand',    label: 'sand',    hex: '#BFAA82' },
]

// Default color for "stranger" (skipped onboarding) — neutral-leaning slate.
export const DEFAULT_COLOR = VISITOR_COLORS.find(c => c.id === 'slate')

// Lookup helper used by hooks + components
export function findColor(idOrLabel) {
  return VISITOR_COLORS.find(c => c.id === idOrLabel || c.label === idOrLabel) ?? DEFAULT_COLOR
}
