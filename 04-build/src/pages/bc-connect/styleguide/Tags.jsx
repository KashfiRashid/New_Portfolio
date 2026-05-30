/**
 * Exhibit 08 - Tags, Badges & Avatars.
 *
 * The Open Ground categorical and identity primitives, recreated live:
 * industry tags (color-coded pairs), status badges (semantic states),
 * and initial-based avatars that ring on hover.
 */
import { ExhibitBlock, PanelHeader } from './primitives.jsx'

const INDUSTRIES = [
  { name: 'Technology', bg: '#EFF2FA', text: '#3568B2' },
  { name: 'Clean Energy', bg: '#E6F3EE', text: '#1B6B4F' },
  { name: 'Health & Life', bg: '#FDF4EB', text: '#C07A28' },
  { name: 'Media', bg: '#F8EEF5', text: '#9B4D83' },
  { name: 'Agriculture', bg: '#EEF5E6', text: '#4D7C2A' },
  { name: 'Manufacturing', bg: '#FEF8E7', text: '#92700C' },
  { name: 'Professional Services', bg: '#F3F4F6', text: '#4B5162' },
]

const BADGES = [
  { label: 'Verified', bg: '#E6F3EE', text: '#1B6B4F' },
  { label: 'Active', bg: '#E6F3EE', text: '#1B6B4F' },
  { label: 'Pending Review', bg: '#FEF8E7', text: '#92700C' },
  { label: 'Closed', bg: '#FDF0EE', text: '#B33B2E' },
  { label: 'New Listing', bg: '#EBF2FC', text: '#3568B2' },
]

const AVATARS = [
  { initials: 'KR', size: 'sm' },
  { initials: 'KR', size: 'md' },
  { initials: 'KR', size: 'lg' },
  { initials: 'AW', size: 'md' },
  { initials: 'TC', size: 'md' },
]

const AVATAR_SIZE = {
  sm: 'h-7 w-7 text-[11px]',
  md: 'h-9 w-9 text-[14px]',
  lg: 'h-12 w-12 text-[18px]',
}
const AVATAR_LABEL = { sm: '28px', md: '36px', lg: '48px' }

function SubLabel({ children }) {
  return (
    <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1B6B4F]">
      {children}
    </p>
  )
}

function Note({ children }) {
  return (
    <p className="mb-4 mt-1.5 max-w-[500px] font-[family-name:var(--font-sans)] text-[12px] leading-[1.55] text-[#6B7080]">
      {children}
    </p>
  )
}

function Pill({ label, bg, text, large }) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-[family-name:var(--font-sans)] text-[12px] font-medium ${
        large ? 'px-3 py-1' : 'px-2.5 py-[3px]'
      }`}
      style={{ backgroundColor: bg, color: text }}
    >
      {label}
    </span>
  )
}

function Avatar({ initials, size }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className={`inline-flex items-center justify-center rounded-full bg-[#E6F3EE] font-[family-name:var(--font-sans)] font-semibold text-[#1B6B4F] ring-2 ring-transparent transition-all duration-200 hover:shadow-[0_0_0_4px_rgba(27,107,79,0.07)] hover:ring-[#D0E8DD] ${AVATAR_SIZE[size]}`}
      >
        {initials}
      </span>
      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[#B8BCCA]">
        {AVATAR_LABEL[size]}
      </span>
    </div>
  )
}

export default function Tags() {
  return (
    <ExhibitBlock
      index="08"
      name="Tags & Badges"
      chrome="Open Ground / Tags, Badges & Avatars"
      reason="Color does the categorizing here, not decoration. Every industry pair was picked to pass WCAG AA on its own background. Badges stay smaller than tags because status is metadata, not identity. Avatars ring on hover, a quiet echo of the lattice nodes."
    >
      <PanelHeader title="Tags, Badges & Avatars">
        Color-coding for industry, semantic states for status, and
        initial-based avatars for identity.
      </PanelHeader>

      <div className="space-y-9">
        {/* Industry tags */}
        <div>
          <SubLabel>Industry Tags</SubLabel>
          <Note>
            Pill tags with industry-specific color pairs. They are labels, not
            actions, so no hover state.
          </Note>
          <div className="flex flex-wrap gap-2.5">
            {INDUSTRIES.map((t) => (
              <Pill key={t.name} label={t.name} bg={t.bg} text={t.text} large />
            ))}
          </div>
        </div>

        {/* Status badges */}
        <div>
          <SubLabel>Status Badges</SubLabel>
          <Note>
            Four semantic states: positive, caution, negative, info. Smaller
            than tags, because status is metadata, not identity.
          </Note>
          <div className="flex flex-wrap gap-2.5">
            {BADGES.map((b, i) => (
              <Pill key={i} label={b.label} bg={b.bg} text={b.text} />
            ))}
          </div>
        </div>

        {/* Avatars */}
        <div>
          <SubLabel>Avatars &middot; hover to ring</SubLabel>
          <Note>
            Initials on signal-soft, in three sizes. A signal ring materializes
            on hover.
          </Note>
          <div className="flex flex-wrap items-start gap-5">
            {AVATARS.map((a, i) => (
              <Avatar key={i} initials={a.initials} size={a.size} />
            ))}
          </div>
        </div>
      </div>
    </ExhibitBlock>
  )
}
