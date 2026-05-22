import { MetaBlock } from '../primitives.jsx'

export default function Hero() {
  return (
    <section className="scroll-mt-28 py-20 lg:py-32">
      <div className="space-y-12">
        <header className="space-y-8">
          <h1
            className="font-[family-name:var(--font-display)] text-[56px] font-normal text-white lg:text-[96px]"
            style={{ letterSpacing: '-0.03em', lineHeight: '0.95' }}
          >
            Parpro Consulting
          </h1>
          <p className="max-w-[640px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            A 3-day hackathon redesign for a Canadian bookkeeping firm. I owned the interactive prototype and the four interaction patterns, each one tied to an audited problem.
          </p>
        </header>

        <MetaBlock
          rows={[
            { label: 'Team', value: 'Md Kashfi Or Rashid Pranta · Benjamin Nichiporik · Mariyam · Rahil Virani' },
            { label: 'My Roles', value: 'Interaction Design · Prototyping' },
            { label: 'Duration', value: '3 days' },
            { label: 'Stack', value: 'Figma' },
            { label: 'Context', value: 'Client website redesign' },
            { label: 'Format', value: 'Figma prototype' },
          ]}
        />

        <figure className="space-y-3">
          <video
            src="/parpro/final-site.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls
            aria-label="Final Parpro Consulting prototype: wide capture of the home page running, showing motion and brand presence."
            className="w-full rounded-lg border border-white/[0.06] bg-black object-contain"
            style={{ aspectRatio: '1440 / 1080' }}
          />
          <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
            Final redesign walkthrough · Figma capture
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
