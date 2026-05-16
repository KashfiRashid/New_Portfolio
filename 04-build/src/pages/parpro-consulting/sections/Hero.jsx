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
            A 3-day hackathon redesign for a Canadian SMB bookkeeping firm. A real client, four interaction patterns, every one tied to an audited problem.
          </p>
        </header>

        <MetaBlock
          rows={[
            { label: 'Role', value: 'Interaction Designer (prototype and four interaction patterns)' },
            { label: 'Team', value: 'Kashfi Rashid · Benjamin Nichiporik · Mariyam · Rahil Virani' },
            { label: 'Stack', value: 'Figma · prototype animation' },
            { label: 'Timeline', value: '3 days · FLUI-25 hackathon' },
            { label: 'Audience', value: 'Canadian SMB bookkeeping clients' },
          ]}
        />

        {/* Hero video — final-site.mp4 is native 1440×1080 (4:3). */}
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
