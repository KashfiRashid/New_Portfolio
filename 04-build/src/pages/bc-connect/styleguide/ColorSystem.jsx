/**
 * Exhibit 02 — Color System.
 *
 * The Open Ground palette, recreated live as token swatches inside a white
 * ExhibitPanel. Grouped Ground / Ink / Signal / Data / Semantic so the
 * layout itself argues the system's thesis: ground before signal.
 */
import { ExhibitBlock, PanelHeader, SpecimenGrid } from './primitives.jsx'

const GROUPS = [
  {
    name: 'Ground',
    note: 'The neutral canvas. Roughly 80% of any screen is one of these five — structure, not emptiness.',
    cols: 5,
    swatches: [
      { name: 'White', hex: '#FFFFFF', token: '--white' },
      { name: 'Off-White', hex: '#FAFBFC', token: '--off-white' },
      { name: 'Cloud', hex: '#F3F4F6', token: '--cloud' },
      { name: 'Mist', hex: '#E8EAED', token: '--mist' },
      { name: 'Fog', hex: '#D1D5DB', token: '--fog' },
    ],
  },
  {
    name: 'Ink',
    note: 'Text and icon hierarchy. Ink 900 is the only truly dark value — reserved for headings and primary actions.',
    cols: 6,
    swatches: [
      { name: 'Ink 900', hex: '#111218', token: '--ink-900' },
      { name: 'Ink 700', hex: '#2C2F36', token: '--ink-700' },
      { name: 'Ink 500', hex: '#4B5162', token: '--ink-500' },
      { name: 'Ink 400', hex: '#6B7080', token: '--ink-400' },
      { name: 'Ink 300', hex: '#8B90A0', token: '--ink-300' },
      { name: 'Ink 200', hex: '#B8BCCA', token: '--ink-200' },
    ],
  },
  {
    name: 'Signal',
    note: 'The single brand color. Primary actions and active state only — never decoration.',
    cols: 4,
    swatches: [
      { name: 'Signal', hex: '#1B6B4F', token: '--signal' },
      { name: 'Signal Hover', hex: '#155A42', token: '--signal-hover' },
      { name: 'Signal Soft', hex: '#E6F3EE', token: '--signal-soft' },
      { name: 'Signal Mist', hex: '#D0E8DD', token: '--signal-mist' },
    ],
  },
  {
    name: 'Data Accents',
    note: 'Charts only. Four hues kept distinct from each other — and from Signal.',
    cols: 4,
    swatches: [
      { name: 'Amber', hex: '#C07A28', token: '--data-amber' },
      { name: 'Blue', hex: '#3568B2', token: '--data-blue' },
      { name: 'Plum', hex: '#7B5EA7', token: '--data-plum' },
      { name: 'Rose', hex: '#B84E5A', token: '--data-rose' },
    ],
  },
  {
    name: 'Semantic',
    note: 'Status only. Each color carries one fixed meaning the user can rely on.',
    cols: 4,
    swatches: [
      { name: 'Positive', hex: '#1B6B4F', token: '--positive' },
      { name: 'Caution', hex: '#92700C', token: '--caution' },
      { name: 'Negative', hex: '#B33B2E', token: '--negative' },
      { name: 'Info', hex: '#3568B2', token: '--info' },
    ],
  },
]

function Swatch({ name, hex, token }) {
  return (
    <div>
      <div
        className="h-16 w-full rounded-[8px] border border-[#E8EAED]"
        style={{ backgroundColor: hex }}
      />
      <p className="mt-2.5 font-[family-name:var(--font-sans)] text-[12px] font-semibold text-[#111218]">
        {name}
      </p>
      <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#8B90A0]">{hex}</p>
      <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#B8BCCA]">{token}</p>
    </div>
  )
}

function ColorGroup({ name, note, cols, swatches }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1B6B4F]">
        {name}
      </p>
      <p className="mb-4 mt-1.5 max-w-[520px] font-[family-name:var(--font-sans)] text-[12.5px] leading-[1.6] text-[#6B7080]">
        {note}
      </p>
      <SpecimenGrid cols={cols}>
        {swatches.map((s) => (
          <Swatch key={s.token} {...s} />
        ))}
      </SpecimenGrid>
    </div>
  )
}

export default function ColorSystem() {
  return (
    <ExhibitBlock
      index="02"
      name="Color"
      chrome="Open Ground / Color System"
      reason="The name is the system: Ground before Signal. Five neutrals carry roughly 80% of every screen, one green does all the brand work, and the accent hues only appear where they encode real meaning. Restraint, made literal."
    >
      <PanelHeader title="Color System">
        Every color is a token. Ground is the canvas, Signal is the one brand
        color, and the accents earn their place only in charts and status.
      </PanelHeader>
      <div className="space-y-9">
        {GROUPS.map((g) => (
          <ColorGroup key={g.name} {...g} />
        ))}
      </div>
    </ExhibitBlock>
  )
}
