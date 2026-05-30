/**
 * Exhibit 06 - Buttons.
 *
 * The four Open Ground button variants across three sizes, recreated as
 * real, hoverable <button> elements inside a white ExhibitPanel. Hover is
 * a color shift, active is an opacity dim - never a transform.
 */
import { ExhibitBlock, PanelHeader } from './primitives.jsx'

const SIZE = {
  sm: 'text-[14px] px-[18px] py-[7px]',
  md: 'text-[15px] px-[22px] py-[11px]',
  lg: 'text-[16px] px-9 py-4',
}

const VARIANT = {
  primary: 'bg-[#111218] text-white hover:bg-[#2C2F36] shadow-sm',
  signal: 'bg-[#1B6B4F] text-white hover:bg-[#155A42] shadow-sm',
  secondary: 'bg-white text-[#111218] border border-[#E8EAED] hover:border-[#D1D5DB] hover:bg-[#FAFBFC]',
  ghost: 'bg-transparent text-white/80 border border-white/15 hover:text-white hover:border-[#4EE0B8]/45',
}

const GROUPS = [
  {
    v: 'primary',
    label: 'Primary \u00b7 Ink',
    note: 'The strongest action on a page. Hover shifts ink-900 to ink-700; active dims to 85%.',
    dark: false,
    btns: [
      { size: 'sm', t: 'Small' },
      { size: 'md', t: 'Medium' },
      { size: 'lg', t: 'Get Started', icon: true },
    ],
  },
  {
    v: 'signal',
    label: 'Signal \u00b7 Brand',
    note: 'The one branded action, List Your Startup. Hover darkens to signal-hover.',
    dark: false,
    btns: [
      { size: 'sm', t: 'Small' },
      { size: 'md', t: 'Medium' },
      { size: 'lg', t: 'List Your Startup' },
    ],
  },
  {
    v: 'secondary',
    label: 'Secondary \u00b7 Outline',
    note: 'Lowest visual weight. White fill, mist border; hover warms to off-white with a fog border.',
    dark: false,
    btns: [
      { size: 'sm', t: 'Small' },
      { size: 'md', t: 'Medium' },
      { size: 'lg', t: 'Clear Filters' },
    ],
  },
  {
    v: 'ghost',
    label: 'Ghost \u00b7 Dark surfaces',
    note: 'For dark CTA sections. Transparent, with a translucent border that warms toward teal on hover.',
    dark: true,
    btns: [
      { size: 'sm', t: 'Small' },
      { size: 'lg', t: 'Browse Directory' },
    ],
  },
]

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h9M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Btn({ variant, size, icon, children }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full font-[family-name:var(--font-sans)] font-medium transition duration-150 active:opacity-[0.85] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B4F] focus-visible:ring-offset-2 ${SIZE[size]} ${VARIANT[variant]}`}
    >
      {children}
      {icon ? <ArrowRight /> : null}
    </button>
  )
}

function SubLabel({ children }) {
  return (
    <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1B6B4F]">
      {children}
    </p>
  )
}

export default function Buttons() {
  return (
    <ExhibitBlock
      index="06"
      name="Buttons"
      chrome="Open Ground / Buttons"
      reason="No transforms, ever. Hover is a color shift, active is an opacity dim, so a button never jumps out of the grid it sits in. Movement is saved for content being revealed, never for the controls themselves."
    >
      <PanelHeader title="Buttons">
        Four variants across three sizes. Hover, focus, and active are all
        live. Try them.
      </PanelHeader>

      <div className="space-y-7">
        {GROUPS.map((g) => (
          <div key={g.v}>
            <SubLabel>{g.label}</SubLabel>
            <p className="mb-3 mt-1.5 max-w-[460px] font-[family-name:var(--font-sans)] text-[12px] leading-[1.55] text-[#6B7080]">
              {g.note}
            </p>
            <div
              className={`flex flex-wrap items-center gap-3 ${
                g.dark ? 'rounded-[12px] bg-[#111218] p-6' : ''
              }`}
            >
              {g.btns.map((b, i) => (
                <Btn key={i} variant={g.v} size={b.size} icon={b.icon}>
                  {b.t}
                </Btn>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ExhibitBlock>
  )
}
