/**
 * PlatformRegisterGrid — six platform "vibes" at a glance.
 *
 * Visual support for Kash's platform-register theory in DesignersMind.
 * Each cell is a small card: a stylized abstract preview of that
 * platform's visual register, the platform name in mono, and a one-word
 * vibe label. The reader sees the spectrum before reading why BC Connect
 * picked the LinkedIn / Coursera end of it.
 *
 * Previews are simplified geometric SVG, not photo-real. Brand-ish colors
 * are used only inside the preview tile so each register reads instantly.
 */

const PLATFORMS = [
  {
    name: 'LINKEDIN',
    vibe: 'professional',
    preview: (
      <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="prg-linkedin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A66C2" />
            <stop offset="100%" stopColor="#378FE9" />
          </linearGradient>
        </defs>
        <rect width="200" height="100" fill="url(#prg-linkedin)" />
        <circle cx="28" cy="26" r="11" fill="#ffffff" opacity="0.9" />
        <rect x="46" y="20" width="62" height="6" rx="3" fill="#ffffff" opacity="0.85" />
        <rect x="46" y="32" width="40" height="5" rx="2.5" fill="#ffffff" opacity="0.5" />
        <rect x="20" y="56" width="160" height="6" rx="3" fill="#ffffff" opacity="0.7" />
        <rect x="20" y="70" width="160" height="6" rx="3" fill="#ffffff" opacity="0.55" />
        <rect x="20" y="84" width="110" height="6" rx="3" fill="#ffffff" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: 'INSTAGRAM',
    vibe: 'edited personal',
    preview: (
      <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="prg-instagram" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#F9CE34" />
            <stop offset="50%" stopColor="#EE2A7B" />
            <stop offset="100%" stopColor="#6228D7" />
          </linearGradient>
        </defs>
        <rect width="200" height="100" fill="url(#prg-instagram)" />
        <rect x="26" y="29" width="42" height="42" rx="4" fill="#ffffff" opacity="0.92" />
        <rect x="79" y="29" width="42" height="42" rx="4" fill="#ffffff" opacity="0.75" />
        <rect x="132" y="29" width="42" height="42" rx="4" fill="#ffffff" opacity="0.58" />
      </svg>
    ),
  },
  {
    name: 'YOUTUBE',
    vibe: 'fun and trivia',
    preview: (
      <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden="true">
        <rect width="200" height="100" fill="#ffffff" />
        <rect x="30" y="16" width="140" height="50" rx="4" fill="#F1F1F1" />
        <path d="M 90 31 L 90 51 L 110 41 Z" fill="#FF0000" />
        <rect x="30" y="74" width="100" height="6" rx="3" fill="#606060" />
        <rect x="30" y="85" width="60" height="5" rx="2.5" fill="#AAAAAA" />
      </svg>
    ),
  },
  {
    name: 'COURSERA',
    vibe: 'professional learning',
    preview: (
      <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden="true">
        <rect width="200" height="100" fill="#F5F8FF" />
        <rect x="26" y="20" width="148" height="60" rx="6" fill="#ffffff" stroke="#D6E2FA" />
        <rect x="38" y="32" width="80" height="6" rx="3" fill="#0056D2" />
        <rect x="38" y="48" width="124" height="5" rx="2.5" fill="#E3EAF6" />
        <rect x="38" y="48" width="70" height="5" rx="2.5" fill="#0056D2" />
        <circle cx="156" cy="64" r="8" fill="#0056D2" />
        <path d="M 152 64 L 155 67 L 160 60" stroke="#ffffff" strokeWidth="1.6" fill="none" />
      </svg>
    ),
  },
  {
    name: 'DISCORD',
    vibe: 'connect and collaborate',
    preview: (
      <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden="true">
        <rect width="200" height="100" fill="#36393F" />
        <circle cx="30" cy="26" r="9" fill="#5865F2" />
        <rect x="46" y="20" width="90" height="6" rx="3" fill="#5865F2" opacity="0.85" />
        <rect x="46" y="31" width="120" height="5" rx="2.5" fill="#ffffff" opacity="0.22" />
        <rect x="46" y="52" width="110" height="5" rx="2.5" fill="#ffffff" opacity="0.3" />
        <rect x="46" y="63" width="80" height="5" rx="2.5" fill="#ffffff" opacity="0.2" />
        <rect x="46" y="80" width="100" height="5" rx="2.5" fill="#ffffff" opacity="0.25" />
      </svg>
    ),
  },
  {
    name: 'REDDIT',
    vibe: 'raw and unfiltered',
    preview: (
      <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden="true">
        <rect width="200" height="100" fill="#ffffff" />
        <path d="M 26 22 L 30 16 L 34 22 Z" fill="#FF4500" />
        <rect x="28" y="24" width="4" height="9" fill="#D9D9D9" />
        <path d="M 26 40 L 30 46 L 34 40 Z" fill="#9CA3AF" />
        <rect x="44" y="15" width="130" height="5" rx="2.5" fill="#1A1A1B" />
        <rect x="44" y="24" width="90" height="4" rx="2" fill="#878A8C" />
        <rect x="44" y="44" width="120" height="4" rx="2" fill="#D9D9D9" />
        <rect x="44" y="53" width="140" height="4" rx="2" fill="#D9D9D9" />
        <rect x="44" y="62" width="110" height="4" rx="2" fill="#D9D9D9" />
        <rect x="44" y="74" width="130" height="4" rx="2" fill="#D9D9D9" />
        <rect x="44" y="83" width="100" height="4" rx="2" fill="#D9D9D9" />
      </svg>
    ),
  },
]

export default function PlatformRegisterGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {PLATFORMS.map((platform) => (
        <div
          key={platform.name}
          className="overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02]"
        >
          <div className="aspect-[200/100] w-full">{platform.preview}</div>
          <div className="px-3 py-2.5">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-300">
              {platform.name}
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-sans)] text-[13px] text-zinc-400">
              {platform.vibe}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
