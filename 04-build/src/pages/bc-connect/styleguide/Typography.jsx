/**
 * Exhibit 03 - Typography.
 *
 * The three Open Ground typefaces and the full 14-step scale, recreated
 * live inside a white ExhibitPanel. Every sample renders at its real size
 * so the scale is the specimen, not a description of one.
 */
import { ExhibitBlock, PanelHeader } from './primitives.jsx'

const DISPLAY = 'font-[family-name:var(--font-display)]'
const SANS = 'font-[family-name:var(--font-sans)]'
const MONO = 'font-[family-name:var(--font-mono)]'

const FONTS = [
  {
    cls: DISPLAY,
    name: 'Instrument Serif',
    role: 'Display & headings: for reading.',
    detail: 'Regular 400 + Italic \u00b7 font-display',
  },
  {
    cls: SANS,
    name: 'DM Sans',
    role: 'Body, UI, buttons: for doing.',
    detail: 'Light 300 to Bold 700 \u00b7 font-sans',
  },
  {
    cls: MONO,
    name: 'DM Mono',
    role: 'Data, code, metadata: for knowing.',
    detail: 'Light 300 to Medium 500 \u00b7 font-mono',
  },
]

const SCALE = [
  {
    group: 'Display, Instrument Serif',
    rows: [
      { name: 'Display XL', sample: 'Open Ground', cls: DISPLAY, color: '#111218', spec: '96 / 0.95 / -0.03em', style: { fontSize: 96, lineHeight: 0.95, letterSpacing: '-0.03em' } },
      { name: 'Display L', sample: 'BC Connect', cls: DISPLAY, color: '#111218', spec: '64 / 1.0 / -0.025em', style: { fontSize: 64, lineHeight: 1.0, letterSpacing: '-0.025em' } },
      { name: 'Display M', sample: 'Startup Directory', cls: DISPLAY, color: '#111218', spec: '48 / 1.05 / -0.02em', style: { fontSize: 48, lineHeight: 1.05, letterSpacing: '-0.02em' } },
      { name: 'Display S', sample: 'Business Cards', cls: DISPLAY, color: '#111218', spec: '36 / 1.1 / -0.015em', style: { fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.015em' } },
    ],
  },
  {
    group: 'Heading, Instrument Serif',
    rows: [
      { name: 'Heading L', sample: 'Section Heading', cls: DISPLAY, color: '#111218', spec: '28 / 1.15 / -0.01em', style: { fontSize: 28, lineHeight: 1.15, letterSpacing: '-0.01em' } },
      { name: 'Heading M', sample: 'Card Title', cls: DISPLAY, color: '#111218', spec: '24 / 1.15 / -0.01em', style: { fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.01em' } },
      { name: 'Heading S', sample: 'Subsection Title', cls: DISPLAY, color: '#111218', spec: '20 / 1.2 / -0.01em', style: { fontSize: 20, lineHeight: 1.2, letterSpacing: '-0.01em' } },
    ],
  },
  {
    group: 'Body, DM Sans',
    rows: [
      { name: 'Body L', sample: 'Discover startups across British Columbia.', cls: SANS, color: '#4B5162', spec: '20 / 300 / 1.6', style: { fontSize: 20, fontWeight: 300, lineHeight: 1.6 } },
      { name: 'Body M', sample: 'This is the standard body text used for descriptions and longer reading passages.', cls: SANS, color: '#4B5162', spec: '15 / 400 / 1.6', style: { fontSize: 15, fontWeight: 400, lineHeight: 1.6 } },
      { name: 'Body S', sample: 'Secondary body text and metadata fields.', cls: SANS, color: '#6B7080', spec: '14 / 400 / 1.6', style: { fontSize: 14, fontWeight: 400, lineHeight: 1.6 } },
    ],
  },
  {
    group: 'Utility, DM Sans & DM Mono',
    rows: [
      { name: 'Caption', sample: 'Vancouver, BC \u00b7 12 employees', cls: SANS, color: '#6B7080', spec: '13 / 500 / 1.4', style: { fontSize: 13, fontWeight: 500, lineHeight: 1.4 } },
      { name: 'Overline', sample: 'ACTIVE STARTUPS', cls: SANS, color: '#8B90A0', spec: '11 / 600 / 0.1em', style: { fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' } },
      { name: 'Mono M', sample: '2,847', cls: MONO, color: '#4B5162', spec: '15 / 400', style: { fontSize: 15, fontWeight: 400 } },
      { name: 'Mono S', sample: '--signal: #1B6B4F', cls: MONO, color: '#4B5162', spec: '13 / 400', style: { fontSize: 13, fontWeight: 400 } },
    ],
  },
]

function FontCard({ cls, name, role, detail }) {
  return (
    <div className="rounded-[12px] border border-[#E8EAED] p-5">
      <p className={`text-[26px] leading-none text-[#111218] ${cls}`}>{name}</p>
      <p className="mt-3 font-[family-name:var(--font-sans)] text-[12.5px] leading-[1.5] text-[#6B7080]">
        {role}
      </p>
      <p className="mt-2 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.06em] text-[#B8BCCA]">
        {detail}
      </p>
    </div>
  )
}

function ScaleRow({ name, sample, cls, color, spec, style }) {
  const nowrap = cls === DISPLAY
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b border-[#E8EAED] pb-1.5">
        <span className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[#4B5162]">
          {name}
        </span>
        <span className="shrink-0 font-[family-name:var(--font-mono)] text-[11px] text-[#B8BCCA]">
          {spec}
        </span>
      </div>
      <p
        className={`mt-3 overflow-hidden ${nowrap ? 'whitespace-nowrap' : ''} ${cls}`}
        style={{ ...style, color }}
      >
        {sample}
      </p>
    </div>
  )
}

export default function Typography() {
  return (
    <ExhibitBlock
      index="03"
      name="Typography"
      chrome="Open Ground / Typography"
      reason="Three faces, three jobs, no overlap. Serif for reading, sans for doing, mono for knowing. A reader never has to ask why a piece of text looks the way it does. The typeface already answered."
    >
      <PanelHeader title="Typography">
        Three fonts, each with one clear job, and a fourteen-step scale built
        on consistent ratios.
      </PanelHeader>

      {/* Three faces */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FONTS.map((f) => (
          <FontCard key={f.name} {...f} />
        ))}
      </div>

      {/* The scale */}
      <div className="mt-10 space-y-9">
        {SCALE.map((g) => (
          <div key={g.group}>
            <p className="mb-5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1B6B4F]">
              {g.group}
            </p>
            <div className="space-y-6">
              {g.rows.map((r) => (
                <ScaleRow key={r.name} {...r} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ExhibitBlock>
  )
}
