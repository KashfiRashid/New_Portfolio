/**
 * IndustryVariantsGrid — seven industry hero illustrations from one primitive.
 *
 * Evidence for ACTION 04 in the What I Did section: one SVG hero primitive,
 * seven industry variants, no two business detail pages sharing a hero.
 * Each tile is a gradient-and-icon illustration matching the BC Connect
 * Style Guide industry color tokens. Icons are simplified geometric SVG,
 * drawn at 60 percent opacity per the spec.
 *
 * Seven industries fill a four-column grid, so the eighth cell is simply
 * empty space. No fabricated "+ N more" label, because seven is the whole
 * set.
 */

const INDUSTRIES = [
  {
    name: 'TECHNOLOGY',
    gradId: 'ivg-technology',
    from: '#EFF2FA',
    to: '#C9D4ED',
    icon: (
      <g opacity="0.6" stroke="#3568B2" fill="#3568B2">
        <line x1="58" y1="38" x2="102" y2="38" strokeWidth="1.5" />
        <line x1="58" y1="72" x2="102" y2="72" strokeWidth="1.5" />
        <line x1="58" y1="38" x2="58" y2="72" strokeWidth="1.5" />
        <line x1="102" y1="38" x2="102" y2="72" strokeWidth="1.5" />
        <line x1="58" y1="38" x2="102" y2="72" strokeWidth="1.5" />
        <line x1="102" y1="38" x2="58" y2="72" strokeWidth="1.5" />
        <circle cx="58" cy="38" r="4" />
        <circle cx="102" cy="38" r="4" />
        <circle cx="58" cy="72" r="4" />
        <circle cx="102" cy="72" r="4" />
        <circle cx="80" cy="55" r="5" />
      </g>
    ),
  },
  {
    name: 'CLEAN ENERGY',
    gradId: 'ivg-clean-energy',
    from: '#E6F3EE',
    to: '#B8D4C6',
    icon: (
      <g opacity="0.6" stroke="#1B6B4F" fill="#1B6B4F">
        <circle cx="80" cy="44" r="4" />
        <line x1="80" y1="44" x2="80" y2="24" strokeWidth="3" strokeLinecap="round" />
        <line x1="80" y1="44" x2="97" y2="54" strokeWidth="3" strokeLinecap="round" />
        <line x1="80" y1="44" x2="63" y2="54" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M 50 76 Q 60 70 70 76 T 90 76 T 110 76"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    name: 'HEALTH AND LIFE',
    gradId: 'ivg-health',
    from: '#FDF4EB',
    to: '#EDD0AB',
    icon: (
      <g opacity="0.6" fill="#C07A28">
        <rect x="72" y="34" width="16" height="42" rx="2" />
        <rect x="59" y="47" width="42" height="16" rx="2" />
      </g>
    ),
  },
  {
    name: 'MEDIA',
    gradId: 'ivg-media',
    from: '#F8EEF5',
    to: '#DDC0D5',
    icon: (
      <g opacity="0.6" fill="#9B4D83">
        <rect
          x="56"
          y="34"
          width="48"
          height="42"
          rx="3"
          fill="none"
          stroke="#9B4D83"
          strokeWidth="2.5"
        />
        <rect x="61" y="39" width="6" height="6" rx="1" />
        <rect x="61" y="51" width="6" height="6" rx="1" />
        <rect x="61" y="63" width="6" height="6" rx="1" />
        <rect x="93" y="39" width="6" height="6" rx="1" />
        <rect x="93" y="51" width="6" height="6" rx="1" />
        <rect x="93" y="63" width="6" height="6" rx="1" />
      </g>
    ),
  },
  {
    name: 'AGRICULTURE',
    gradId: 'ivg-agriculture',
    from: '#EEF5E6',
    to: '#C8DBB5',
    icon: (
      <g opacity="0.6">
        <path d="M 80 30 Q 102 44 80 78 Q 58 44 80 30 Z" fill="#4D7C2A" />
        <path d="M 80 36 L 80 72" stroke="#EEF5E6" strokeWidth="1.5" fill="none" />
      </g>
    ),
  },
  {
    name: 'MANUFACTURING',
    gradId: 'ivg-manufacturing',
    from: '#FEF8E7',
    to: '#ECDAAB',
    icon: (
      <g opacity="0.6" fill="#92700C">
        <circle cx="80" cy="54" r="18" fill="none" stroke="#92700C" strokeWidth="6" />
        <circle cx="80" cy="54" r="5" />
        <rect x="77" y="28" width="6" height="8" />
        <rect x="77" y="72" width="6" height="8" />
        <rect x="52" y="51" width="8" height="6" />
        <rect x="100" y="51" width="8" height="6" />
      </g>
    ),
  },
  {
    name: 'PROFESSIONAL SERVICES',
    gradId: 'ivg-professional-services',
    from: '#F3F4F6',
    to: '#D1D5DB',
    icon: (
      <g opacity="0.6" fill="#4B5162">
        <rect x="62" y="32" width="36" height="46" />
        <rect x="68" y="38" width="7" height="7" fill="#F3F4F6" />
        <rect x="79" y="38" width="7" height="7" fill="#F3F4F6" />
        <rect x="90" y="38" width="7" height="7" fill="#F3F4F6" />
        <rect x="68" y="50" width="7" height="7" fill="#F3F4F6" />
        <rect x="79" y="50" width="7" height="7" fill="#F3F4F6" />
        <rect x="90" y="50" width="7" height="7" fill="#F3F4F6" />
        <rect x="68" y="62" width="7" height="7" fill="#F3F4F6" />
        <rect x="79" y="62" width="7" height="7" fill="#F3F4F6" />
        <rect x="90" y="62" width="7" height="7" fill="#F3F4F6" />
      </g>
    ),
  },
]

export default function IndustryVariantsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {INDUSTRIES.map((industry) => (
        <div
          key={industry.name}
          className="overflow-hidden rounded-lg border border-zinc-800"
        >
          <div className="aspect-[160/110] w-full">
            <svg
              viewBox="0 0 160 110"
              className="h-full w-full"
              role="img"
              aria-label={`${industry.name} hero illustration variant`}
            >
              <defs>
                <linearGradient id={industry.gradId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={industry.from} />
                  <stop offset="100%" stopColor={industry.to} />
                </linearGradient>
              </defs>
              <rect width="160" height="110" fill={`url(#${industry.gradId})`} />
              {industry.icon}
            </svg>
          </div>
          <p className="px-3 py-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-300">
            {industry.name}
          </p>
        </div>
      ))}
    </div>
  )
}
