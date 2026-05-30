import { BlockShell, SerifTitle, MonoLine, ABOUT_GREEN } from '../primitives.jsx'

/**
 * Currently - Block 5, "open on the screen".
 *
 * Four lines in DM Mono, each under 12 words. The brief is explicit:
 * if Kash has not provided these four, render the bracketed placeholders
 * visibly. Do not invent content. No visual. Type-only. The absence is
 * intentional.
 */
export default function Currently() {
  // Bracketed placeholders are the v1 default. When Kash confirms each
  // line, swap the right-hand string in place. Keep each line < 12 words.
  const lines = [
    { label: 'currently building',  value: '[thing \u2014 Kash confirm]' },
    { label: 'currently learning',  value: '[tool or idea \u2014 Kash confirm]' },
    { label: 'currently listening', value: '[one named album, year \u2014 Kash confirm]' },
    { label: 'currently reading',   value: '[one book \u2014 Kash confirm]' },
  ]

  return (
    <BlockShell id="currently">
      <SerifTitle>open on the screen</SerifTitle>

      <ul className="space-y-3">
        {lines.map((line) => (
          <li key={line.label}>
            <MonoLine size="md">
              <span style={{ color: ABOUT_GREEN }}>{line.label}:</span>{' '}
              {line.value}
            </MonoLine>
          </li>
        ))}
      </ul>
    </BlockShell>
  )
}
