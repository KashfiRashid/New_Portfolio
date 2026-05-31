// FeatureImportance - Phase 1 finding: frequency and monetary value dominate;
// everything else is noise. Behavior beats demographics. ASCII only.
const BARS = [
  { label: 'Frequency (how often they buy)', pct: 59 },
  { label: 'Monetary (how much they spend)', pct: 38 },
  { label: 'Recency', pct: 2 },
  { label: 'Basket size, store, season, demographics', pct: 1 },
]

export default function FeatureImportance() {
  const W = 860, top = 44, rowH = 58, barX = 360, barMax = W - barX - 70
  return (
    <svg viewBox={`0 0 ${W} ${top + BARS.length * rowH + 20}`} className="w-full" role="img"
      aria-label="Feature importance: frequency 59 percent, monetary 38 percent, all others under 5 percent combined">
      <text x="0" y="24" fill="#8A8780" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2">FEATURE IMPORTANCE - WHAT PREDICTS A HIGH-VALUE CUSTOMER</text>
      {BARS.map((b, i) => {
        const y = top + i * rowH
        const big = b.pct >= 10
        const wpx = Math.max((b.pct / 100) * barMax, 3)
        return (
          <g key={b.label}>
            <text x="0" y={y + 26} fill="#D8D5CE" fontFamily="ui-sans-serif, system-ui" fontSize="13.5">{b.label}</text>
            <rect x={barX} y={y + 10} width={barMax} height="22" rx="5" fill="rgba(255,255,255,0.05)" />
            <rect x={barX} y={y + 10} width={wpx} height="22" rx="5" fill={big ? '#E8B86A' : 'rgba(232,184,106,0.4)'} />
            <text x={barX + barMax + 12} y={y + 26} fill={big ? '#F4D6A6' : '#9C9A95'} fontFamily="ui-monospace, monospace" fontSize="13">{b.pct}%</text>
          </g>
        )
      })}
    </svg>
  )
}
