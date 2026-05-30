/**
 * Exhibit 01 - Brand Mark.
 *
 * A live recreation of the Open Ground "Brand Mark" style-guide page,
 * framed inside a white ExhibitPanel on the dark case-study canvas.
 * The Lattice Mark is the real component; the app icon is the shipped
 * favicon, rendered verbatim (its own #19694D green is kept as-is).
 */
import { ExhibitBlock, PanelHeader, SpecRow, SpecimenGrid } from './primitives.jsx'
import { LatticeMark } from './LatticeMark.jsx'

/* Spring-curve hover rotation - transition via inline style so it does not
   depend on the style guide's globals.css being present. */
const SPRING = { transition: 'transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)' }

/* The shipped favicon (uploads/icon.svg), recreated verbatim. */
function FaviconMark({ size = 52, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8.33333" cy="8.33333" r="4.33333" fill="#19694D" />
      <circle cx="24.2222" cy="22.7778" r="5.77778" fill="#19694D" />
      <rect x="11.0446" y="8.6862" width="39.9836" height="3.33527" rx="1.66764" transform="rotate(45 11.0446 8.6862)" fill="#19694D" fillOpacity="0.4" />
      <rect x="25.7604" y="19.1789" width="15.2996" height="3.33527" rx="1.66764" transform="rotate(-45 25.7604 19.1789)" fill="#19694D" fillOpacity="0.8" />
      <rect x="9.48482" y="35.3608" width="15.7523" height="3.33527" rx="1.66764" transform="rotate(-45 9.48482 35.3608)" fill="#19694D" fillOpacity="0.8" />
      <path d="M35.7778 8.33333C35.7778 5.9401 37.7179 4 40.1111 4C42.5043 4 44.4444 5.9401 44.4444 8.33333C44.4444 10.7266 42.5043 12.6667 40.1111 12.6667C37.7179 12.6667 35.7778 10.7266 35.7778 8.33333Z" fill="#478771" />
      <path d="M4 38.6667C4 36.2734 5.9401 34.3333 8.33333 34.3333C10.7266 34.3333 12.6667 36.2734 12.6667 38.6667C12.6667 41.0599 10.7266 43 8.33333 43C5.9401 43 4 41.0599 4 38.6667Z" fill="#75A594" />
      <path d="M35.7778 38.6667C35.7778 36.2734 37.7179 34.3333 40.1111 34.3333C42.5043 34.3333 44.4444 36.2734 44.4444 38.6667C44.4444 41.0599 42.5043 43 40.1111 43C37.7179 43 35.7778 41.0599 35.7778 38.6667Z" fill="#A3C3B8" />
      <circle cx="24.2222" cy="22.7778" r="5.77778" fill="url(#fav_radial)" />
      <defs>
        <radialGradient
          id="fav_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(24.2222 22.7778) rotate(90) scale(5.77778)"
        >
          <stop offset="0.788462" stopColor="#19694D" />
          <stop offset="1" stopColor="#31CF98" />
        </radialGradient>
      </defs>
    </svg>
  )
}

/* A mark variant on its intended ground. The whole tile is a hover target
   so the mark springs 90deg, the "living network" cue. */
function MarkTile({ tile, label, labelColor, variant }) {
  return (
    <div
      className={`group flex cursor-pointer flex-col items-center justify-center gap-5 rounded-[16px] p-10 ${tile}`}
    >
      <LatticeMark
        size={60}
        variant={variant}
        className="origin-center group-hover:rotate-90"
        style={SPRING}
      />
      <span
        className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em]"
        style={{ color: labelColor }}
      >
        {label}
      </span>
    </div>
  )
}

export default function BrandMark() {
  return (
    <ExhibitBlock
      index="01"
      name="Brand Mark"
      chrome="Open Ground / Brand Mark"
      reason="The mark isn't decoration. It's the product's thesis in one glyph. Four scattered entities resolving into a single connected center is exactly what BC Connect does to BC's fragmented business data. Hover it and the lattice turns: the network is alive."
    >
      <PanelHeader title="Brand Mark">
        The Lattice Mark represents interconnected nodes in an ecosystem. It
        rotates on hover via the spring curve to convey a living network.
      </PanelHeader>

      {/* Three variants on their intended grounds - hover any tile */}
      <SpecimenGrid cols={3}>
        <MarkTile
          variant="light"
          tile="bg-white border border-[#E8EAED]"
          label="Light / Default"
          labelColor="#8B90A0"
        />
        <MarkTile
          variant="dark"
          tile="bg-[#111218]"
          label="Dark / Inverse"
          labelColor="#B8BCCA"
        />
        <MarkTile
          variant="signal"
          tile="bg-[#E6F3EE] border border-[#D0E8DD]"
          label="Signal / Brand"
          labelColor="#1B6B4F"
        />
      </SpecimenGrid>

      {/* App icon - the shipped favicon */}
      <h4 className="mb-4 mt-10 font-[family-name:var(--font-display)] text-[20px] text-[#111218]">
        App Icon
      </h4>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex h-[96px] w-[96px] items-center justify-center rounded-[22px] border border-[#E8EAED] bg-white">
          <FaviconMark size={52} />
        </div>
        <p className="max-w-[330px] font-[family-name:var(--font-sans)] text-[13px] leading-[1.65] text-[#6B7080]">
          The app-icon treatment of the same mark, five nodes, three
          connectors, with a soft radial core so it stays legible down to
          16px. Shipped at 48&times;48.
        </p>
      </div>

      {/* SVG spec */}
      <div className="mt-9 max-w-[420px]">
        <SpecRow label="SVG Viewbox" value="0 0 28 28" />
        <SpecRow label="Center node" value="r=3 at (14,14)" />
        <SpecRow label="Corner nodes" value="r=2.5 at corners" />
        <SpecRow label="Stroke width" value="1.2px" />
        <SpecRow label="Hover rotation" value="90deg" />
        <SpecRow label="Hover curve" value="ease-spring (0.34, 1.56, 0.64, 1)" />
        <SpecRow label="Hover duration" value="450ms" />
      </div>
    </ExhibitBlock>
  )
}
