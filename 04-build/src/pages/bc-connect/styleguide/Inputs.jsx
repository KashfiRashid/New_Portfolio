/**
 * Exhibit 07 — Inputs & Filters.
 *
 * The Open Ground search bar and filter pills, recreated as real, working
 * controls inside a white ExhibitPanel. The search bar moves cloud → white
 * on focus; the filter pills use the black active-state pattern from the
 * Jobs section — the selected pill inverts to solid black for contrast.
 */
import { useState } from 'react'
import { ExhibitBlock, PanelHeader } from './primitives.jsx'

const FILTERS = [
  'All',
  'Agriculture',
  'Clean Energy',
  'Health & Life',
  'Manufacturing',
  'Media',
  'Professional Services',
  'Technology',
]

function SubLabel({ children }) {
  return (
    <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1B6B4F]">
      {children}
    </p>
  )
}

function SearchIcon({ className }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 11l3.6 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SearchBar({ placeholder, variant }) {
  const nav = variant === 'nav'
  return (
    <label
      className={`group flex items-center gap-2.5 rounded-[10px] border border-transparent bg-[#F3F4F6] px-3.5 py-2.5 transition-all duration-200 focus-within:border-[#D1D5DB] focus-within:bg-white focus-within:shadow-sm ${
        nav ? 'w-[220px] focus-within:w-[280px]' : 'w-full max-w-[440px]'
      }`}
    >
      <SearchIcon className="shrink-0 text-[#8B90A0] transition-colors group-focus-within:text-[#1B6B4F]" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent font-[family-name:var(--font-sans)] text-[14px] text-[#111218] outline-none placeholder:text-[#8B90A0]"
      />
    </label>
  )
}

function FilterPills() {
  const [active, setActive] = useState('All')
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const on = f === active
        return (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 font-[family-name:var(--font-sans)] text-[13px] font-medium transition-colors duration-150 ${
              on
                ? 'border-[#111218] bg-[#111218] text-white'
                : 'border-[#E8EAED] bg-white text-[#6B7080] hover:border-[#B8BCCA] hover:text-[#111218]'
            }`}
          >
            {f}
          </button>
        )
      })}
    </div>
  )
}

export default function Inputs() {
  return (
    <ExhibitBlock
      index="07"
      name="Inputs & Filters"
      chrome="Open Ground / Inputs & Filters"
      reason="Both controls follow ground before signal. At rest they sit quietly, the search bar on neutral cloud, the filter pills on plain white. Selection is the only thing that earns weight: the search bar lifts to white, the active filter inverts to solid black."
    >
      <PanelHeader title="Inputs & Filters">
        The primary control surfaces, fully working. Click the search bar to
        focus it, click a pill to set the filter.
      </PanelHeader>

      <div className="space-y-9">
        {/* Search bar */}
        <div>
          <SubLabel>Search Bar &middot; click to focus</SubLabel>
          <p className="mb-4 mt-1.5 max-w-[500px] font-[family-name:var(--font-sans)] text-[12px] leading-[1.55] text-[#6B7080]">
            At rest it blends into the page on cloud. On focus it lifts: white
            fill, a fog border, the icon turns signal green.
          </p>
          <div className="space-y-4">
            <SearchBar placeholder="Search startups, industries, regions..." />
            <div>
              <span className="mb-2 block font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.1em] text-[#8B90A0]">
                Nav variant, expands on focus
              </span>
              <SearchBar variant="nav" placeholder="Search..." />
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div>
          <SubLabel>Filter Pills &middot; click to select</SubLabel>
          <p className="mb-4 mt-1.5 max-w-[500px] font-[family-name:var(--font-sans)] text-[12px] leading-[1.55] text-[#6B7080]">
            One filter is active at a time. The selected pill inverts to solid
            black for maximum contrast; the rest stay quiet on white.
          </p>
          <FilterPills />
        </div>
      </div>
    </ExhibitBlock>
  )
}
