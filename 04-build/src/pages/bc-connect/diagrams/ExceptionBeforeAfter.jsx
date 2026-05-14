/**
 * ExceptionBeforeAfter — the restrained CTA next to the btn-creative one.
 *
 * Visual support for The Exception section. Two stylized buttons side by
 * side: the on-system pill Kash started with, and the off-system gradient
 * button he shipped under pressure. The diagram sits at the pivot point of
 * the section, where the reflection starts.
 *
 * Note: the AFTER gradient is rendered static. The real btn-creative
 * animates, but an animating element here would fight the case study's own
 * argument about restraint, and SMIL animation would not respect
 * prefers-reduced-motion. The five-stop gradient plus the ring already
 * read as "off-system, doing a lot." Easy to make it animate later if Kash
 * wants it literal.
 */

const COLUMNS = [
  {
    label: 'BEFORE',
    caption: 'On-system. Restrained. Quiet.',
    button: (
      <svg viewBox="0 0 220 60" className="h-auto w-full max-w-[260px]" aria-hidden="true">
        <rect x="10" y="6" width="200" height="48" rx="24" fill="#0A0B0F" />
        <text
          x="100"
          y="35"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="var(--font-sans)"
          fontSize="14"
        >
          Explore Directory
        </text>
        <path
          d="M 168 30 L 180 30 M 176 26 L 180 30 L 176 34"
          stroke="#ffffff"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'AFTER',
    caption: 'btn-creative. Off-system. Earned the conversion.',
    button: (
      <svg viewBox="0 0 220 60" className="h-auto w-full max-w-[260px]" aria-hidden="true">
        <defs>
          <linearGradient id="eba-creative" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1B6B4F" />
            <stop offset="25%" stopColor="#3568B2" />
            <stop offset="50%" stopColor="#7B5EA7" />
            <stop offset="75%" stopColor="#C07A28" />
            <stop offset="100%" stopColor="#1B6B4F" />
          </linearGradient>
        </defs>
        <rect
          x="5"
          y="2"
          width="210"
          height="56"
          rx="28"
          fill="none"
          stroke="url(#eba-creative)"
          strokeWidth="2"
          opacity="0.5"
        />
        <rect x="10" y="6" width="200" height="48" rx="24" fill="url(#eba-creative)" />
        <text
          x="100"
          y="35"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="var(--font-sans)"
          fontSize="14"
        >
          Explore Directory
        </text>
        <path
          d="M 168 30 L 180 30 M 176 26 L 180 30 L 176 34"
          stroke="#ffffff"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

export default function ExceptionBeforeAfter() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {COLUMNS.map((column) => (
        <div key={column.label}>
          <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#1B6B4F]">
            {column.label}
          </p>
          <div className="mt-4">{column.button}</div>
          <p className="mt-3 font-[family-name:var(--font-sans)] text-[13px] text-zinc-400">
            {column.caption}
          </p>
        </div>
      ))}
    </div>
  )
}
