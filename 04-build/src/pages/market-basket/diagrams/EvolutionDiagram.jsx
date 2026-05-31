// EvolutionDiagram - the honest arc: an ambitious 5-module system narrows to a
// dual-AI design, then to one focused KNN recommender. Amber accent. ASCII only.
const FIVE = ['High-value txn', 'Next-item', 'Checkout upsell', 'Substitution', 'Sequential forecast']
const TWO = ['XGBoost value', 'KNN recommend']

export default function EvolutionDiagram() {
  return (
    <svg viewBox="0 0 860 360" className="w-full" role="img"
      aria-label="System evolution from five modules to a dual-AI design to one focused KNN recommender">
      <defs>
        <marker id="mb-ev-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#6B6963" />
        </marker>
      </defs>

      {/* stage labels */}
      <text x="120" y="28" textAnchor="middle" fill="#8A8780" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2">V1 - AMBITIOUS</text>
      <text x="430" y="28" textAnchor="middle" fill="#8A8780" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2">V2 - DUAL AI</text>
      <text x="740" y="28" textAnchor="middle" fill="#F4D6A6" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2">V3 - FOCUSED</text>

      {/* stage 1 : five modules */}
      {FIVE.map((t, i) => (
        <g key={t}>
          <rect x="30" y={50 + i * 56} width="180" height="44" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
          <text x="120" y={50 + i * 56 + 27} textAnchor="middle" fill="#D8D5CE" fontFamily="ui-sans-serif, system-ui" fontSize="13">{t}</text>
        </g>
      ))}
      <text x="120" y="346" textAnchor="middle" fill="#6B6963" fontFamily="ui-sans-serif, system-ui" fontSize="12">Too many problems at once</text>

      {/* arrow 1 */}
      <line x1="220" y1="180" x2="320" y2="180" stroke="#6B6963" strokeWidth="1.5" markerEnd="url(#mb-ev-arrow)" />

      {/* stage 2 : two models */}
      {TWO.map((t, i) => (
        <g key={t}>
          <rect x="340" y={120 + i * 80} width="180" height="56" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
          <text x="430" y={120 + i * 80 + 33} textAnchor="middle" fill="#E6E3DC" fontFamily="ui-sans-serif, system-ui" fontSize="14">{t}</text>
        </g>
      ))}
      <text x="430" y="346" textAnchor="middle" fill="#6B6963" fontFamily="ui-sans-serif, system-ui" fontSize="12">Integration still too costly to evaluate</text>

      {/* arrow 2 */}
      <line x1="530" y1="180" x2="630" y2="180" stroke="#6B6963" strokeWidth="1.5" markerEnd="url(#mb-ev-arrow)" />

      {/* stage 3 : one focused model */}
      <rect x="650" y="142" width="180" height="76" rx="10" fill="rgba(232,184,106,0.12)" stroke="#E8B86A" strokeWidth="1.5" />
      <text x="740" y="176" textAnchor="middle" fill="#F4D6A6" fontFamily="ui-sans-serif, system-ui" fontSize="15" fontWeight="600">KNN recommender</text>
      <text x="740" y="198" textAnchor="middle" fill="#C9B79A" fontFamily="ui-monospace, monospace" fontSize="11">cosine - k=10</text>
      <text x="740" y="346" textAnchor="middle" fill="#9C9A95" fontFamily="ui-sans-serif, system-ui" fontSize="12">Do one thing well</text>
    </svg>
  )
}
