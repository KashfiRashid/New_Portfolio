/**
 * Exhibit 05 — Motion.
 *
 * The Open Ground easing curves and duration tiers, recreated live.
 * Each curve row is a hover-to-play demo — the dot slides on the real
 * timing function, no JavaScript needed (pure CSS group-hover).
 */
import { ExhibitBlock, PanelHeader } from './primitives.jsx'

const CURVES = [
  {
    name: 'Ease Out',
    css: 'cubic-bezier(0.16, 1, 0.3, 1)',
    ms: 280,
    desc: 'Fast start, soft landing. Roughly 90% of all UI transitions.',
  },
  {
    name: 'Ease Spring',
    css: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    ms: 450,
    desc: 'Overshoots, then settles. Defined but reserved — used only by the lattice mark.',
  },
  {
    name: 'Linear',
    css: 'linear',
    ms: 200,
    desc: 'For changes that should feel instant — color and opacity fades.',
  },
]

const DURATIONS = [
  { time: '100–150ms', cls: 'Fast', use: 'Button active, color swaps, opacity dims' },
  { time: '200ms', cls: 'Standard', use: 'Nav underline, focus ring, row highlight' },
  { time: '280ms', cls: 'Considered', use: 'Card border & shadow, pill slide' },
  { time: '350ms', cls: 'Slow', use: 'Principle top-bar reveal' },
  { time: '500ms', cls: 'Entrance', use: 'Fade-in entrance animation' },
]

function SubLabel({ children }) {
  return (
    <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1B6B4F]">
      {children}
    </p>
  )
}

function CurveRow({ name, css, ms, desc }) {
  return (
    <div className="group flex flex-col gap-4 rounded-[12px] border border-[#E8EAED] p-5 sm:flex-row sm:items-center">
      <div className="relative h-10 w-full shrink-0 overflow-hidden rounded-[8px] bg-[#F3F4F6] sm:w-[184px]">
        <div
          className="absolute left-1 top-1 h-8 w-8 rounded-[6px] bg-[#1B6B4F] group-hover:translate-x-[140px]"
          style={{ transition: `transform ${ms}ms ${css}` }}
        />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-[family-name:var(--font-sans)] text-[14px] font-semibold text-[#111218]">
            {name}
          </span>
          <code className="rounded bg-[#F3F4F6] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10.5px] text-[#8B90A0]">
            {css}
          </code>
        </div>
        <p className="mt-1 font-[family-name:var(--font-sans)] text-[12px] leading-[1.55] text-[#6B7080]">
          {desc}
        </p>
      </div>
    </div>
  )
}

export default function Motion() {
  return (
    <ExhibitBlock
      index="05"
      name="Motion"
      chrome="Open Ground / Motion"
      reason="Speed is the message. A 150ms color shift reads as 'immediate'; a 280ms border warm reads as 'considered.' Nothing exceeds 500ms, and nothing moves position or scale — only color, opacity, and border."
    >
      <PanelHeader title="Motion">
        Three easing curves and five duration tiers. Motion is not decoration
        — it signals the weight of a change.
      </PanelHeader>

      <div className="space-y-9">
        {/* Easing curves */}
        <div>
          <SubLabel>Easing &middot; hover to play</SubLabel>
          <div className="mt-4 space-y-3">
            {CURVES.map((c) => (
              <CurveRow key={c.name} {...c} />
            ))}
          </div>
        </div>

        {/* Duration tiers */}
        <div>
          <SubLabel>Duration Tiers</SubLabel>
          <div className="mt-4 overflow-hidden rounded-[12px] border border-[#E8EAED]">
            <div className="grid grid-cols-[84px_1fr] gap-x-3 bg-[#FAFBFC] px-4 py-2.5 sm:grid-cols-[100px_116px_1fr]">
              <span className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.1em] text-[#8B90A0]">
                Time
              </span>
              <span className="hidden font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.1em] text-[#8B90A0] sm:block">
                Class
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.1em] text-[#8B90A0]">
                Usage
              </span>
            </div>
            {DURATIONS.map((d, i) => (
              <div
                key={d.time}
                className={`grid grid-cols-[84px_1fr] items-baseline gap-x-3 px-4 py-3 sm:grid-cols-[100px_116px_1fr] ${
                  i !== DURATIONS.length - 1 ? 'border-b border-[#E8EAED]' : ''
                }`}
              >
                <span className="font-[family-name:var(--font-mono)] text-[12.5px] font-medium text-[#1B6B4F]">
                  {d.time}
                </span>
                <span className="hidden font-[family-name:var(--font-sans)] text-[12.5px] font-medium text-[#111218] sm:block">
                  {d.cls}
                </span>
                <span className="font-[family-name:var(--font-sans)] text-[12.5px] leading-[1.5] text-[#6B7080]">
                  {d.use}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ExhibitBlock>
  )
}
