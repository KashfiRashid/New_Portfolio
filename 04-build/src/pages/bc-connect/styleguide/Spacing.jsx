/**
 * Exhibit 04 — Spacing, Radius & Shadow.
 *
 * The Open Ground 4px grid, radius tokens, and shadow tiers, recreated
 * live. Kept deliberately compact: a thin spacing ramp, one row of radii,
 * one row of shadows.
 */
import { ExhibitBlock, PanelHeader, SpecimenGrid } from './primitives.jsx'

const SPACING = [
  { name: 'space-0', value: '0px', px: 0 },
  { name: 'space-1', value: '4px', px: 4 },
  { name: 'space-2', value: '8px', px: 8 },
  { name: 'space-3', value: '12px', px: 12 },
  { name: 'space-4', value: '16px', px: 16 },
  { name: 'space-5', value: '20px', px: 20 },
  { name: 'space-6', value: '24px', px: 24 },
  { name: 'space-8', value: '32px', px: 32 },
  { name: 'space-10', value: '40px', px: 40 },
  { name: 'space-12', value: '48px', px: 48 },
  { name: 'space-16', value: '64px', px: 64 },
  { name: 'space-20', value: '80px', px: 80 },
  { name: 'space-24', value: '96px', px: 96 },
  { name: 'space-32', value: '128px', px: 128 },
]

const RADII = [
  { name: 'r-sm', value: '6px', use: 'Tags, pills' },
  { name: 'r-md', value: '10px', use: 'Inputs, dropdowns' },
  { name: 'r-lg', value: '16px', use: 'Cards, sections' },
  { name: 'r-xl', value: '20px', use: 'Large cards, hero' },
  { name: 'r-pill', value: '999px', use: 'Buttons, badges' },
]

const SHADOWS = [
  { name: 'shadow-xs', css: '0 1px 2px rgba(0,0,0,0.04)', use: 'Buttons at rest' },
  { name: 'shadow-sm', css: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)', use: 'Cards at rest' },
  { name: 'shadow-md', css: '0 4px 12px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)', use: 'Hover, dropdowns' },
  { name: 'shadow-lg', css: '0 12px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)', use: 'Modals, popovers' },
]

function SubLabel({ children }) {
  return (
    <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1B6B4F]">
      {children}
    </p>
  )
}

export default function Spacing() {
  return (
    <ExhibitBlock
      index="04"
      name="Spacing & Radius"
      chrome="Open Ground / Spacing, Radius & Shadow"
      reason="A 4px grid removes the guesswork. Every margin, padding, and gap is a multiple of four. Radii scale with the container, and shadows stay almost invisible because structure and borders carry the depth, not drop-shadow."
    >
      <PanelHeader title="Spacing, Radius & Shadow">
        A 4px base grid aligns everything. Radii grow with container size;
        shadows are deliberately faint.
      </PanelHeader>

      <div className="space-y-9">
        {/* 4px grid */}
        <div>
          <SubLabel>4px Grid &middot; 14 tokens</SubLabel>
          <div className="mt-4 flex flex-col gap-1.5">
            {SPACING.map((t) => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="w-[58px] shrink-0 text-right font-[family-name:var(--font-mono)] text-[10.5px] text-[#8B90A0]">
                  {t.name}
                </span>
                <div
                  className="h-2.5 rounded-[2px]"
                  style={{
                    width: Math.max(t.px, 2),
                    backgroundColor: 'rgba(27,107,79,0.16)',
                    border: '1px solid rgba(27,107,79,0.32)',
                  }}
                />
                <span className="font-[family-name:var(--font-mono)] text-[10.5px] text-[#B8BCCA]">
                  {t.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Radius */}
        <div>
          <SubLabel>Border Radius</SubLabel>
          <SpecimenGrid cols={5} className="mt-4">
            {RADII.map((r) => (
              <div key={r.name} className="flex flex-col items-center text-center">
                <div
                  className="mb-2.5 h-16 w-16 border border-[#E8EAED] bg-[#F3F4F6]"
                  style={{ borderRadius: r.value }}
                />
                <span className="font-[family-name:var(--font-mono)] text-[11px] font-medium text-[#111218]">
                  {r.name}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[#8B90A0]">
                  {r.value}
                </span>
                <span className="mt-0.5 font-[family-name:var(--font-sans)] text-[10.5px] leading-tight text-[#6B7080]">
                  {r.use}
                </span>
              </div>
            ))}
          </SpecimenGrid>
        </div>

        {/* Shadow */}
        <div>
          <SubLabel>Shadow</SubLabel>
          <div className="mt-4 rounded-[12px] bg-[#FAFBFC] p-6">
            <SpecimenGrid cols={4}>
              {SHADOWS.map((s) => (
                <div key={s.name} className="flex flex-col items-center text-center">
                  <div
                    className="mb-3 h-16 w-full rounded-[12px] bg-white"
                    style={{ boxShadow: s.css }}
                  />
                  <span className="font-[family-name:var(--font-mono)] text-[11px] font-medium text-[#111218]">
                    {s.name}
                  </span>
                  <span className="mt-0.5 font-[family-name:var(--font-sans)] text-[10.5px] text-[#6B7080]">
                    {s.use}
                  </span>
                </div>
              ))}
            </SpecimenGrid>
          </div>
        </div>
      </div>
    </ExhibitBlock>
  )
}
