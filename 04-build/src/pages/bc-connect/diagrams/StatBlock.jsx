/**
 * StatBlock — the headline numbers at a glance.
 *
 * Added in the Phase B HR-lens pass. A non-designer recruiter scanning
 * the case study should grasp the scale of the work in one look, before
 * reading a single paragraph. Six numbers, large display type, hairline
 * grid. Rendered near the top of the case study inside Overview.
 *
 * Every figure is consistent with content stated elsewhere in the case
 * study (90,000+ businesses, 8 regions, 3 roles, 16 components, the
 * Open Ground system, the 8-week duration). Nothing here is invented.
 */

const STATS = [
  { value: '90,000+', label: 'businesses unified' },
  { value: '8', label: 'BC regions' },
  { value: '3', label: 'user roles' },
  { value: '16', label: 'system components' },
  { value: '1', label: 'design system' },
  { value: '8 weeks', label: 'start to ship' },
]

export default function StatBlock() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-3">
      {STATS.map((stat) => (
        <div key={stat.label} className="bg-[#0F1216] p-6">
          <p className="font-[family-name:var(--font-display)] text-[40px] font-normal leading-none tracking-[-0.02em] text-white lg:text-[52px]">
            {stat.value}
          </p>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
