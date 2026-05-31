// KNNPipeline - how a raw text basket becomes ranked recommendations.
// Horizontal flow; final node amber. ASCII only.
const STEPS = [
  { k: '01', t: 'Raw basket', d: "['Milk','Bread']", mono: true },
  { k: '02', t: 'Safe parse', d: 'ast.literal_eval' },
  { k: '03', t: 'Binarize', d: 'MultiLabelBinarizer' },
  { k: '04', t: 'Sparse matrix', d: '1M x 81  -  95% empty' },
  { k: '05', t: 'KNN', d: 'cosine  -  k=10' },
  { k: '06', t: 'Rank + filter', d: 'by neighbor frequency' },
]

export default function KNNPipeline() {
  const W = 860, n = STEPS.length, gap = 12
  const cardW = (W - gap * (n - 1)) / n
  return (
    <svg viewBox="0 0 860 250" className="w-full" role="img"
      aria-label="KNN recommendation pipeline: parse, binarize, sparse matrix, cosine KNN, rank and filter, recommendations">
      <defs>
        <marker id="mb-knn-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#6B6963" />
        </marker>
      </defs>

      {STEPS.map((s, i) => {
        const x = i * (cardW + gap)
        return (
          <g key={s.k}>
            <rect x={x} y="40" width={cardW} height="96" rx="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
            <text x={x + 12} y="64" fill="#8A8780" fontFamily="ui-monospace, monospace" fontSize="11">{s.k}</text>
            <text x={x + cardW / 2} y="92" textAnchor="middle" fill="#E6E3DC" fontFamily="ui-sans-serif, system-ui" fontSize="13" fontWeight="600">{s.t}</text>
            <text x={x + cardW / 2} y="114" textAnchor="middle" fill="#9C9A95" fontFamily={s.mono ? 'ui-monospace, monospace' : 'ui-sans-serif, system-ui'} fontSize="10.5">{s.d}</text>
            {i < n - 1 ? (
              <line x1={x + cardW + 1} y1="88" x2={x + cardW + gap - 1} y2="88" stroke="#6B6963" strokeWidth="1.4" markerEnd="url(#mb-knn-arrow)" />
            ) : null}
          </g>
        )
      })}

      {/* output */}
      <line x1="430" y1="150" x2="430" y2="178" stroke="#6B6963" strokeWidth="1.4" markerEnd="url(#mb-knn-arrow)" />
      <rect x="250" y="180" width="360" height="50" rx="10" fill="rgba(232,184,106,0.12)" stroke="#E8B86A" strokeWidth="1.5" />
      <text x="430" y="204" textAnchor="middle" fill="#F4D6A6" fontFamily="ui-sans-serif, system-ui" fontSize="14" fontWeight="600">Top-N recommendations</text>
      <text x="430" y="221" textAnchor="middle" fill="#C9B79A" fontFamily="ui-monospace, monospace" fontSize="10.5">Eggs - Cheese - Yogurt - ...</text>
    </svg>
  )
}
