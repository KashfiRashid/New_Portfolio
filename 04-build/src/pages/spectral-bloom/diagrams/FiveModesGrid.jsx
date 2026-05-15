/**
 * FiveModesGrid — the five visualization modes, each with a schematic
 * glyph and a one-line description. The glyphs are not screenshots; they
 * are diagrams of the underlying geometry, so the grid reads even before
 * the real captures land in the section above it.
 *
 * Magenta accent, dark cards, inline SVG glyphs at 64x64.
 */

const STROKE = '#FF7DA3'

export function BloomGlyph({ className = 'h-12 w-12' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="22" fill="none" stroke={STROKE} strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
      <circle cx="32" cy="32" r="14" fill="none" stroke={STROKE} strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
      <circle cx="32" cy="32" r="6" fill="none" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="32" cy="32" r="2" fill={STROKE} />
    </svg>
  )
}

export function WaveGlyph({ className = 'h-12 w-12' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M4 38 Q14 18 24 32 T44 32 T64 26" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M2 44 Q14 30 24 40 T44 40 T62 36" fill="none" stroke={STROKE} strokeWidth="1" opacity="0.45" />
    </svg>
  )
}

export function NebulaGlyph({ className = 'h-12 w-12' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M32 32 C40 22 50 24 52 36 C53 46 42 52 30 50" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M32 32 C24 42 14 40 12 28 C11 18 22 12 34 14" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <circle cx="32" cy="32" r="2.4" fill={STROKE} />
    </svg>
  )
}

export function CrystalGlyph({ className = 'h-12 w-12' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g fill="none" stroke={STROKE} strokeWidth="1.3">
        <path d="M32 10 L52 22 L52 44 L32 56 L12 44 L12 22 Z" />
        <path d="M32 10 L32 34 M32 34 L52 22 M32 34 L12 22 M32 34 L32 56" opacity="0.6" />
      </g>
    </svg>
  )
}

export function HelixGlyph({ className = 'h-12 w-12' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path
        d="M32 6 C44 10 44 18 32 22 C20 26 20 34 32 38 C44 42 44 50 32 54"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.5"
      />
      <path
        d="M32 6 C20 10 20 18 32 22 C44 26 44 34 32 38 C20 42 20 50 32 54"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.5"
        opacity="0.55"
      />
      <g stroke={STROKE} strokeWidth="1" opacity="0.4">
        <line x1="22" y1="14" x2="42" y2="14" />
        <line x1="22" y1="30" x2="42" y2="30" />
        <line x1="22" y1="46" x2="42" y2="46" />
      </g>
    </svg>
  )
}

const MODES = [
  {
    n: '1',
    name: 'Bloom',
    Glyph: BloomGlyph,
    desc: 'A spherical particle cloud that breathes and pulses with bass. Orbital rings answer the frequency bands. The default.',
  },
  {
    n: '2',
    name: 'Wave',
    Glyph: WaveGlyph,
    desc: 'Multi-layer waveform terrain. Time-domain data spreads the particles into a flowing landscape of sound.',
  },
  {
    n: '3',
    name: 'Nebula',
    Glyph: NebulaGlyph,
    desc: 'A dual-arm spiral galaxy. Frequency bands drive arm density and rotation speed.',
  },
  {
    n: '4',
    name: 'Crystal',
    Glyph: CrystalGlyph,
    desc: 'A 3D cubic lattice. Audio energy distorts the geometric grid against an icy palette.',
  },
  {
    n: '5',
    name: 'Helix',
    Glyph: HelixGlyph,
    desc: 'A double DNA strand. Beats wrap it tighter, frequency expands the radius.',
  },
]

export default function FiveModesGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {MODES.map((mode) => {
        const { Glyph } = mode
        return (
          <article
            key={mode.name}
            className="flex flex-col gap-4 border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <div className="flex items-center justify-between">
              <Glyph />
              <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                Mode {mode.n} / 5
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white">
              {mode.name}
            </h3>
            <p className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
              {mode.desc}
            </p>
          </article>
        )
      })}
      <div className="flex flex-col justify-center gap-3 border border-dashed border-white/[0.08] bg-white/[0.01] p-6">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#FF7DA3]">
          Switch instantly
        </p>
        <p className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
          Keys 1 through 5 swap modes mid-track. The 12,000 particles re-form into the new geometry without a reload.
        </p>
      </div>
    </div>
  )
}
