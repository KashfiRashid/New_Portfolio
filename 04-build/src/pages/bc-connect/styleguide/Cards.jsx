/**
 * Exhibit 09 — Cards.
 *
 * The Open Ground content units, recreated live inside a white ExhibitPanel.
 * JobIllustration and JobCard are ported verbatim from the shipped
 * frontend/components/job-card.tsx (TypeScript → JSX) — the seven inline
 * SVG illustrations are the exact product source, not approximations.
 * Stat cards and the empty state follow the style guide.
 */
import { ExhibitBlock, PanelHeader } from './primitives.jsx'

/* Sample jobs — exact data from frontend/components/jobs-section.tsx,
   one per industry so all seven illustrations are on show. */
const JOBS = [
  { title: 'Senior ML Engineer', company: 'Rainforest AI', city: 'Vancouver', region: 'Mainland/Southwest', type: 'Full-time', salary: '$140k–$180k', industry: 'Technology', initialColor: '#3568B2', gradientFrom: '#EFF2FA', gradientTo: '#c9d4ed', posted: '2 days ago' },
  { title: 'Product Designer', company: 'Tidal Works', city: 'Victoria', region: 'Vancouver Island/Coast', type: 'Full-time', salary: '$95k–$120k', industry: 'Clean Energy', initialColor: '#1B6B4F', gradientFrom: '#E6F3EE', gradientTo: '#b8d4c6', posted: '4 days ago' },
  { title: 'Full-Stack Developer', company: 'Orca Health', city: 'Remote', region: 'BC', type: 'Remote', salary: '$80/hr', industry: 'Health & Life', initialColor: '#C07A28', gradientFrom: '#FDF4EB', gradientTo: '#edd0ab', posted: '1 week ago' },
  { title: 'Growth Marketer', company: 'Canopy Studios', city: 'Burnaby', region: 'Mainland/Southwest', type: 'Full-time', salary: '$75k–$95k', industry: 'Media', initialColor: '#9B4D83', gradientFrom: '#F8EEF5', gradientTo: '#ddc0d5', posted: '3 days ago' },
  { title: 'AgriTech Operations Lead', company: 'Harvest Robotics', city: 'Kelowna', region: 'Thompson-Okanagan', type: 'Full-time', salary: '$85k–$110k', industry: 'Agriculture', initialColor: '#4D7C2A', gradientFrom: '#EEF5E6', gradientTo: '#c8dbb5', posted: '5 days ago' },
  { title: 'Supply Chain Analyst', company: 'Pacific Ledger', city: 'Vancouver', region: 'Mainland/Southwest', type: 'Contract', salary: '$65/hr', industry: 'Professional Services', initialColor: '#4B5162', gradientFrom: '#F3F4F6', gradientTo: '#d1d5db', posted: '1 day ago' },
  { title: 'Robotics Software Engineer', company: 'Northern Forge', city: 'Prince George', region: 'Nechako', type: 'Full-time', salary: '$110k–$145k', industry: 'Manufacturing', initialColor: '#92700C', gradientFrom: '#FEF8E7', gradientTo: '#ecdaab', posted: '6 days ago' },
]

const STATS = [
  { label: 'Active Startups', value: '2,847', delta: '+12% this quarter' },
  { label: 'BC Regions', value: '8' },
  { label: 'Open Roles', value: '1,203', delta: '+8% this month' },
]

/* Industry tag colors — from frontend/components/industry-tag.tsx */
const TAG = {
  Technology: { bg: '#EFF2FA', text: '#3568B2' },
  'Clean Energy': { bg: '#E6F3EE', text: '#1B6B4F' },
  'Health & Life': { bg: '#FDF4EB', text: '#C07A28' },
  Media: { bg: '#F8EEF5', text: '#9B4D83' },
  Agriculture: { bg: '#EEF5E6', text: '#4D7C2A' },
  Manufacturing: { bg: '#FEF8E7', text: '#92700C' },
  'Professional Services': { bg: '#F3F4F6', text: '#4B5162' },
}

/* Type badge colors — from job-card.tsx typeColors */
const TYPE = {
  'Full-time': { bg: 'rgba(27,107,79,0.1)', text: '#1B6B4F' },
  Contract: { bg: 'rgba(53,104,178,0.1)', text: '#3568B2' },
  Remote: { bg: 'rgba(155,77,131,0.1)', text: '#9B4D83' },
  'Part-time': { bg: 'rgba(192,122,40,0.1)', text: '#C07A28' },
}

/* ─── Inline industry illustration — verbatim from job-card.tsx ─── */
function JobIllustration({ industry, color }) {
  const norm = industry.toLowerCase()

  if (norm.includes('tech') || norm.includes('software')) {
    return (
      <svg viewBox="0 0 200 120" fill="none" className="absolute inset-0 h-full w-full" style={{ opacity: 0.45 }}>
        <line x1="33" y1="0" x2="33" y2="120" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="66" y1="0" x2="66" y2="120" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="100" y1="0" x2="100" y2="120" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="133" y1="0" x2="133" y2="120" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="166" y1="0" x2="166" y2="120" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="0" y1="30" x2="200" y2="30" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="0" y1="60" x2="200" y2="60" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="0" y1="90" x2="200" y2="90" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" />
        <circle cx="66" cy="30" r="5" fill={color} opacity="0.9" />
        <circle cx="100" cy="60" r="8" fill={color} />
        <circle cx="133" cy="30" r="5" fill={color} opacity="0.8" />
        <circle cx="66" cy="90" r="4" fill={color} opacity="0.6" />
        <circle cx="133" cy="90" r="4" fill={color} opacity="0.6" />
        <line x1="66" y1="30" x2="100" y2="60" stroke={color} strokeWidth="1.5" />
        <line x1="133" y1="30" x2="100" y2="60" stroke={color} strokeWidth="1.5" />
        <line x1="100" y1="60" x2="66" y2="90" stroke={color} strokeWidth="1" />
        <line x1="100" y1="60" x2="133" y2="90" stroke={color} strokeWidth="1" />
        <text x="84" y="67" fontFamily="monospace" fontSize="13" fill={color} fontWeight="700">
          {'<>'}
        </text>
      </svg>
    )
  }
  if (norm.includes('clean energy') || norm.includes('green') || norm.includes('cleantech')) {
    return (
      <svg viewBox="0 0 200 120" fill="none" className="absolute inset-0 h-full w-full" style={{ opacity: 0.45 }}>
        <ellipse cx="50" cy="115" rx="65" ry="30" fill={color} opacity="0.15" />
        <ellipse cx="160" cy="120" rx="55" ry="25" fill={color} opacity="0.1" />
        <circle cx="158" cy="28" r="15" fill={color} opacity="0.3" />
        <line x1="158" y1="6" x2="158" y2="1" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="158" y1="50" x2="158" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="136" y1="28" x2="131" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="180" y1="28" x2="185" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <rect x="62" y="55" width="3" height="56" fill={color} opacity="0.6" />
        <path d="M63.5 55 Q57 38 49 28" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9" />
        <path d="M63.5 55 Q76 40 84 32" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9" />
        <path d="M63.5 55 Q54 57 46 65" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9" />
        <circle cx="63.5" cy="55" r="4.5" fill={color} />
      </svg>
    )
  }
  if (norm.includes('health') || norm.includes('life') || norm.includes('sciences')) {
    return (
      <svg viewBox="0 0 200 120" fill="none" className="absolute inset-0 h-full w-full" style={{ opacity: 0.45 }}>
        <path d="M65 5 C82 22 118 22 135 40 C118 58 82 58 65 75 C82 92 118 92 135 110" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M135 5 C118 22 82 22 65 40 C82 58 118 58 135 75 C118 92 82 92 65 110" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
        <line x1="76" y1="20" x2="124" y2="20" stroke={color} strokeWidth="1.5" opacity="0.7" />
        <line x1="70" y1="40" x2="130" y2="40" stroke={color} strokeWidth="1.5" opacity="0.7" />
        <line x1="76" y1="60" x2="124" y2="60" stroke={color} strokeWidth="1.5" opacity="0.7" />
        <line x1="70" y1="80" x2="130" y2="80" stroke={color} strokeWidth="1.5" opacity="0.7" />
        <rect x="18" y="44" width="7" height="20" rx="2" fill={color} opacity="0.8" />
        <rect x="13" y="49" width="17" height="7" rx="2" fill={color} opacity="0.8" />
      </svg>
    )
  }
  if (norm.includes('media') || norm.includes('creative') || norm.includes('digital')) {
    return (
      <svg viewBox="0 0 200 120" fill="none" className="absolute inset-0 h-full w-full" style={{ opacity: 0.45 }}>
        <rect x="45" y="28" width="110" height="70" rx="8" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.08" />
        <circle cx="100" cy="63" r="22" stroke={color} strokeWidth="2" />
        <circle cx="100" cy="63" r="13" stroke={color} strokeWidth="1.5" opacity="0.6" />
        <circle cx="100" cy="63" r="5" fill={color} opacity="0.6" />
        <rect x="83" y="19" width="22" height="12" rx="3" stroke={color} strokeWidth="1.5" />
        <rect x="0" y="97" width="200" height="23" fill={color} fillOpacity="0.1" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={5 + i * 28} y={100} width="14" height="17" rx="2" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
        ))}
        <circle cx="163" cy="24" r="11" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
        <path d="M160 19 L170 24 L160 29 Z" fill={color} opacity="0.8" />
      </svg>
    )
  }
  if (norm.includes('agri') || norm.includes('food')) {
    return (
      <svg viewBox="0 0 200 120" fill="none" className="absolute inset-0 h-full w-full" style={{ opacity: 0.45 }}>
        {[25, 50, 75, 100, 125, 150, 175].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="100" x2={x} y2="38" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx={x} cy={33} rx="4" ry="11" fill={color} opacity="0.7" transform={`rotate(${i % 2 === 0 ? -6 : 6} ${x} 33)`} />
            <ellipse cx={x - 6} cy={55} rx="3.5" ry="7" fill={color} opacity="0.4" transform={`rotate(-18 ${x - 6} 55)`} />
            <ellipse cx={x + 6} cy={58} rx="3.5" ry="7" fill={color} opacity="0.4" transform={`rotate(18 ${x + 6} 58)`} />
          </g>
        ))}
        <circle cx="170" cy="22" r="12" fill={color} opacity="0.2" />
        <ellipse cx="120" cy="115" rx="160" ry="12" fill={color} opacity="0.1" />
      </svg>
    )
  }
  if (norm.includes('manufactur')) {
    return (
      <svg viewBox="0 0 200 120" fill="none" className="absolute inset-0 h-full w-full" style={{ opacity: 0.45 }}>
        <circle cx="78" cy="63" r="30" stroke={color} strokeWidth="2.5" opacity="0.4" />
        <circle cx="78" cy="63" r="12" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
        <circle cx="78" cy="63" r="4.5" fill={color} opacity="0.7" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          return (
            <line key={i} x1={78 + 30 * Math.cos(rad)} y1={63 + 30 * Math.sin(rad)} x2={78 + 38 * Math.cos(rad)} y2={63 + 38 * Math.sin(rad)} stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.7" />
          )
        })}
        <circle cx="137" cy="40" r="19" stroke={color} strokeWidth="2" opacity="0.5" />
        <circle cx="137" cy="40" r="8" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          return (
            <line key={i} x1={137 + 19 * Math.cos(rad)} y1={40 + 19 * Math.sin(rad)} x2={137 + 25 * Math.cos(rad)} y2={40 + 25 * Math.sin(rad)} stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.6" />
          )
        })}
      </svg>
    )
  }
  // Professional Services
  return (
    <svg viewBox="0 0 200 120" fill="none" className="absolute inset-0 h-full w-full" style={{ opacity: 0.45 }}>
      <rect x="55" y="45" width="90" height="60" rx="7" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.06" />
      <path d="M75 45 L75 35 Q75 28 82 28 L118 28 Q125 28 125 35 L125 45" stroke={color} strokeWidth="2.5" fill="none" />
      <line x1="55" y1="74" x2="145" y2="74" stroke={color} strokeWidth="2" />
      <rect x="87" y="68" width="26" height="12" rx="3" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
      <circle cx="22" cy="22" r="7" fill={color} opacity="0.4" />
      <circle cx="44" cy="36" r="4" fill={color} opacity="0.3" />
      <circle cx="16" cy="40" r="4" fill={color} opacity="0.3" />
      <line x1="22" y1="22" x2="44" y2="36" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="22" y1="22" x2="16" y2="40" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="178" cy="22" r="7" fill={color} opacity="0.4" />
      <circle cx="156" cy="36" r="4" fill={color} opacity="0.3" />
      <circle cx="184" cy="42" r="4" fill={color} opacity="0.3" />
      <line x1="178" y1="22" x2="156" y2="36" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="178" y1="22" x2="184" y2="42" stroke={color} strokeWidth="1.5" opacity="0.4" />
    </svg>
  )
}

function MetaIcon({ name }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (name === 'pin') {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" className="shrink-0" aria-hidden="true">
        <path {...p} d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0Z" />
        <circle {...p} cx="12" cy="10" r="3" />
      </svg>
    )
  }
  if (name === 'dollar') {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" className="shrink-0" aria-hidden="true">
        <line {...p} x1="12" y1="2" x2="12" y2="22" />
        <path {...p} d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  }
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" className="shrink-0" aria-hidden="true">
      <circle {...p} cx="12" cy="12" r="9" />
      <path {...p} d="M12 7v5l3 2" />
    </svg>
  )
}

function Meta({ icon, children }) {
  return (
    <div className="flex items-center gap-1.5 font-[family-name:var(--font-sans)] text-[12px] text-[#8B90A0]">
      <MetaIcon name={icon} />
      <span className="truncate">{children}</span>
    </div>
  )
}

function IndustryTag({ industry }) {
  const t = TAG[industry] ?? { bg: '#F3F4F6', text: '#4B5162' }
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 font-[family-name:var(--font-sans)] text-[12px] font-medium"
      style={{ backgroundColor: t.bg, color: t.text }}
    >
      {industry}
    </span>
  )
}

function JobCard({ job }) {
  const type = TYPE[job.type] ?? TYPE['Full-time']
  return (
    <article className="group relative flex w-[252px] flex-col overflow-hidden rounded-[20px] border border-[#E8EAED] bg-white transition-[border-color,box-shadow] duration-200 hover:border-[#D0E8DD] hover:shadow-md">
      <div
        className="relative flex h-[130px] items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${job.gradientFrom}, ${job.gradientTo})` }}
      >
        <JobIllustration industry={job.industry} color={job.initialColor} />
        <span
          className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm"
          style={{ background: type.bg, color: type.text, border: `1px solid ${type.text}22` }}
        >
          {job.type}
        </span>
        <div className="absolute bottom-3 right-3 flex h-7 w-7 translate-y-1 items-center justify-center rounded-full bg-white/80 opacity-0 shadow-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={job.initialColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <div>
          <h4 className="font-[family-name:var(--font-sans)] text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[#111218]">
            {job.title}
          </h4>
          <p className="mt-0.5 font-[family-name:var(--font-sans)] text-[13px] font-semibold" style={{ color: job.initialColor }}>
            {job.company}
          </p>
        </div>
        <div className="mt-1 flex flex-col gap-1.5">
          <Meta icon="pin">
            {job.city}, {job.region}
          </Meta>
          <Meta icon="dollar">{job.salary}</Meta>
          <Meta icon="clock">{job.posted}</Meta>
        </div>
        <div className="mt-2 border-t border-[#E8EAED] pt-3">
          <IndustryTag industry={job.industry} />
        </div>
      </div>
    </article>
  )
}

function StatCard({ label, value, delta }) {
  return (
    <div className="group rounded-[14px] border border-[#E8EAED] bg-white p-5 transition-colors duration-200 hover:border-[#D0E8DD]">
      <p className="font-[family-name:var(--font-sans)] text-[11px] font-medium uppercase tracking-[0.06em] text-[#6B7080]">
        {label}
      </p>
      <p className="mt-1.5 font-[family-name:var(--font-display)] text-[42px] leading-none text-[#111218] transition-colors duration-300 group-hover:text-[#1B6B4F]">
        {value}
      </p>
      {delta ? (
        <p className="mt-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[#1B6B4F]">&uarr; {delta}</p>
      ) : null}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-[20px] border border-dashed border-[#E8EAED] px-8 py-10 text-center">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mx-auto" aria-hidden="true">
        <circle cx="17" cy="17" r="11" stroke="#B8BCCA" strokeWidth="2" />
        <path d="M25 25l9 9" stroke="#B8BCCA" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <h4 className="mt-4 font-[family-name:var(--font-display)] text-[24px] tracking-[-0.01em] text-[#111218]">
        No results found
      </h4>
      <p className="mx-auto mt-2 max-w-[320px] font-[family-name:var(--font-sans)] text-[13px] leading-[1.6] text-[#6B7080]">
        Try adjusting your filters or search terms to discover more startups.
      </p>
      <button
        type="button"
        className="mt-5 inline-flex items-center rounded-full border border-[#E8EAED] bg-white px-[18px] py-2 font-[family-name:var(--font-sans)] text-[13px] font-medium text-[#111218] transition-colors duration-150 hover:border-[#D1D5DB] hover:bg-[#FAFBFC]"
      >
        Clear Filters
      </button>
    </div>
  )
}

function SubLabel({ children }) {
  return (
    <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1B6B4F]">
      {children}
    </p>
  )
}

function Note({ children }) {
  return (
    <p className="mb-4 mt-1.5 max-w-[520px] font-[family-name:var(--font-sans)] text-[12px] leading-[1.55] text-[#6B7080]">
      {children}
    </p>
  )
}

export default function Cards() {
  return (
    <ExhibitBlock
      index="09"
      name="Cards"
      chrome="Open Ground / Cards"
      reason="One industry value drives three things at once: the gradient header, the inline SVG illustration, and the footer tag. A reader categorizes a listing by color and icon before reading a single word. The directory does the discovery work for them."
    >
      <PanelHeader title="Cards">
        The content units. Each job card header carries an inline SVG
        illustration keyed to its industry, the exact illustration code from
        the shipped product, seven sectors in one visual system.
      </PanelHeader>

      <div className="space-y-9">
        <div>
          <SubLabel>Job Cards &middot; one illustration per industry</SubLabel>
          <Note>
            Industry drives the header gradient, the SVG illustration, and the
            footer tag. Instant visual sorting across all seven sectors.
          </Note>
          <div className="flex flex-wrap gap-4">
            {JOBS.map((j) => (
              <JobCard key={j.title} job={j} />
            ))}
          </div>
        </div>

        <div>
          <SubLabel>Stat Cards &middot; hover the number</SubLabel>
          <Note>
            Display numbers in Instrument Serif. Hover shifts the number to
            signal green, the only color change, because the number is the
            signal.
          </Note>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>

        <div>
          <SubLabel>Empty State</SubLabel>
          <Note>
            When filters return nothing, a dashed container, never a dead end.
            The clear-filters action is always offered.
          </Note>
          <EmptyState />
        </div>
      </div>
    </ExhibitBlock>
  )
}
