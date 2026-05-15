import { SectionHead, MonoKicker, AssetPlaceholder } from '../primitives.jsx'
import SystemInheritanceDiagram from '../diagrams/SystemInheritanceDiagram.jsx'

const LAWS = [
  {
    label: 'Law 01',
    title: 'Earn Your Pixel',
    body: "Every element must justify its presence. If it doesn't inform, orient, or delight, remove it. Default to removal.",
  },
  {
    label: 'Law 02',
    title: 'Ground Before Signal',
    body: 'Establish spatial clarity with neutral ground before introducing color or emphasis. White space is structure, not emptiness.',
  },
  {
    label: 'Law 03',
    title: "Connect, Don't Decorate",
    body: "Ornament for aesthetics alone isn't allowed. Every line, dot, and gradient should visualize a real relationship.",
  },
]

const PALETTE = [
  { name: 'Signal', hex: '#1B6B4F' },
  { name: 'Ink 900', hex: '#111218' },
  { name: 'Ink 500', hex: '#4B5162' },
  { name: 'Mist', hex: '#E8EAED' },
  { name: 'Amber', hex: '#C07A28' },
  { name: 'Blue', hex: '#3568B2' },
  { name: 'Plum', hex: '#7B5EA7' },
  { name: 'Rose', hex: '#B84E5A' },
  { name: 'Teal', hex: '#4EE0B8', note: 'dark contexts only' },
]

const TYPE_RAMP = [
  {
    fontClass: 'font-[family-name:var(--font-display)]',
    name: 'Instrument Serif',
    job: 'for reading',
  },
  {
    fontClass: 'font-[family-name:var(--font-sans)]',
    name: 'DM Sans',
    job: 'for doing',
  },
  {
    fontClass: 'font-[family-name:var(--font-mono)]',
    name: 'DM Mono',
    job: 'for knowing',
  },
]

export default function TheSystem() {
  return (
    <section id="the-system" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE SYSTEM" title="Open Ground, before any component shipped." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          The system has three laws. Earn Your Pixel. Ground Before Signal. Connect, Don't Decorate. Every component the team built was evaluated against them. The laws came first because everything downstream had to either agree with them or be replaced.
        </p>
      </div>

      {/* PART A: the three laws */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {LAWS.map((law) => (
          <article key={law.label} className="rounded-lg border border-zinc-800 p-6">
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#1B6B4F]">
              {law.label}
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-[24px] font-normal tracking-[-0.02em] text-white lg:text-[28px]">
              {law.title}
            </h3>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {law.body}
            </p>
          </article>
        ))}
      </div>

      {/* System inheritance diagram */}
      <div className="mt-12">
        <SystemInheritanceDiagram />
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-zinc-500">
          Each layer is constrained by the one above.
        </p>
      </div>

      {/* PART B: palette swatches */}
      <div className="mt-12">
        <MonoKicker>PALETTE</MonoKicker>
        <div className="mt-4 flex flex-wrap gap-3">
          {PALETTE.map((token) => (
            <div key={token.name} className="w-16">
              <div
                className="h-16 w-16 rounded-md border border-white/10"
                style={{ backgroundColor: token.hex }}
              />
              <p className="mt-2 text-center font-[family-name:var(--font-mono)] text-xs text-zinc-400">
                {token.name}
              </p>
              <p className="text-center font-[family-name:var(--font-mono)] text-xs text-zinc-500">
                {token.hex}
              </p>
              {token.note ? (
                <p className="text-center font-[family-name:var(--font-mono)] text-[10px] italic text-zinc-600">
                  {token.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* PART C: type ramp */}
      <div className="mt-12">
        <MonoKicker>TYPOGRAPHY</MonoKicker>
        <div className="mt-4 space-y-6">
          {TYPE_RAMP.map((type) => (
            <div key={type.name} className="flex items-center gap-6">
              <span className={`text-6xl font-normal text-white ${type.fontClass}`}>
                Aa
              </span>
              <div>
                <p className="font-[family-name:var(--font-mono)] text-sm text-zinc-300">
                  {type.name}
                </p>
                <p className="font-[family-name:var(--font-sans)] text-sm text-zinc-400">
                  {type.job}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing caption */}
      <p className="mt-12 font-[family-name:var(--font-mono)] text-sm italic text-zinc-500">
        Sans for doing. Serif for reading. Mono for knowing.
      </p>

      {/* The real artifact behind everything above */}
      <div className="mt-12">
        <AssetPlaceholder
          kind="SCREENSHOT"
          slotId="Slot 2 — Open Ground system"
          filename="/bc-connect/open-ground-system.png"
          dimensions="wide capture · static screenshot"
          description="The actual Open Ground artifact: the Figma component library page, the token sheet, or the style-guide document. Everything above explains the system; this shows it. A real artifact is the strongest proof in the whole case study."
          annotate="optional — circle one token used across two different components to make the inheritance visible."
        />
      </div>
    </section>
  )
}
