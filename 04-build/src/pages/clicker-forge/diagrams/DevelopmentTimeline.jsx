/**
 * DevelopmentTimeline - a vertical, six-stage build timeline. Tracks the real
 * arc of the project from the proposal (concept + art) through the milestone
 * build (first playable smelting loop) to the shipped game. Inline SVG, BC
 * Connect register: bronze #C8A24B / #E5C877, DM Sans + DM Mono, ASCII only.
 */
const SANS = '"DM Sans", system-ui, sans-serif'
const MONO = '"DM Mono", ui-monospace, monospace'
const EM = '#C8A24B'
const EM_BRIGHT = '#E5C877'

const STAGES = [
  {
    n: '01',
    title: 'Proposal, storyboard & art',
    body: 'Scoped a medieval weaponsmith sim, storyboarded the smelt to sword flow, and specced a class hierarchy on paper, then drew every asset in Figma.',
    tag: 'PROPOSAL / FIGMA',
  },
  {
    n: '02',
    title: 'Core object model',
    body: 'Wrote the abstract Item base and a ConcreteFactory, so blocks, crucible, smelter, and sword shared hit testing, dragging, and draw from day one.',
    tag: 'OOP / FACTORY',
  },
  {
    n: '03',
    title: 'Smelting loop (first playable)',
    body: 'Lamp, drag copper to the smelter, click the bellows, watch Perlin smoke build with click speed, pour molten copper into the cast.',
    tag: 'GRAPHICS2D / PERLIN',
  },
  {
    n: '04',
    title: 'Hammering minigame',
    body: 'Added a moving timing bar, a spacebar strike, green zone scoring, and recursive fractal shockwaves that grow with the hit.',
    tag: 'RECURSION / TIMING',
  },
  {
    n: '05',
    title: 'Decorators, screens & sound',
    body: 'Layered emblem and grip with the Decorator pattern, built intro, instruction, and outro screens, and wired Minim audio plus a custom cursor.',
    tag: 'DECORATOR / MINIM',
  },
  {
    n: '06',
    title: 'Polish & ship',
    body: 'Hardened interactions with try/catch, tuned animations and sound, balanced the loop, and shipped to the SIAT showcase.',
    tag: 'HARDENING / SHIP',
  },
]

const ROW_H = 118
const TOP = 28
const SPINE_X = 38
const TEXT_X = 84

export default function DevelopmentTimeline() {
  const height = TOP + STAGES.length * ROW_H + 16
  return (
    <svg
      viewBox={`0 0 760 ${height}`}
      className="mx-auto w-full max-w-[720px]"
      role="img"
      aria-label="Six-stage development timeline: proposal and art, core object model, smelting loop, hammering minigame, decorators and sound, then polish and ship."
    >
      <defs>
        <linearGradient id="cf-spine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={EM} stopOpacity="0.15" />
          <stop offset="0.06" stopColor={EM} stopOpacity="0.9" />
          <stop offset="0.94" stopColor={EM} stopOpacity="0.9" />
          <stop offset="1" stopColor={EM} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <line x1={SPINE_X} y1={TOP} x2={SPINE_X} y2={height - 16} stroke="url(#cf-spine)" strokeWidth="2" />

      {STAGES.map((s, i) => {
        const cy = TOP + i * ROW_H + 26
        return (
          <g key={s.n}>
            <circle cx={SPINE_X} cy={cy} r="11" fill="#1B160D" stroke={EM} strokeWidth="1.6" />
            <circle cx={SPINE_X} cy={cy} r="4" fill={EM_BRIGHT} />
            <text x={SPINE_X} y={cy + 34} textAnchor="middle" fontFamily={MONO} fontSize="11" fill={EM} letterSpacing="0.5">
              {s.n}
            </text>
            <text x={TEXT_X} y={cy - 8} fontFamily={SANS} fontSize="19" fill="#f4f4f5">
              {s.title}
            </text>
            <text x={TEXT_X} y={cy + 12} fontFamily={MONO} fontSize="9.5" letterSpacing="0.8" fill={EM_BRIGHT}>
              {s.tag}
            </text>
            <foreignObject x={TEXT_X} y={cy + 22} width="640" height="64">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ fontFamily: SANS, fontSize: '12.5px', lineHeight: '1.5', color: '#a1a1aa', margin: 0 }}
              >
                {s.body}
              </div>
            </foreignObject>
          </g>
        )
      })}
    </svg>
  )
}
