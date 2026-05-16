import { useState } from 'react'
import { SectionHead } from '../primitives.jsx'

const SHASHA_SRC = 'https://kashfirashid.com/media/static_Images/SHasha_Website.png'
const HRSBS_SRC = 'https://kashfirashid.com/media/static_Images/Hrsbs_Website.png'

function CompetitorImage({ src, alt, href, label }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-white/[0.02]">
        <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          asset pending
        </span>
      </div>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2885A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0F1216]"
      aria-label={`Open ${label} in a new tab`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full rounded-lg border border-white/[0.06] bg-black object-contain transition-all duration-200 group-hover:border-[#EC613B]/40 group-hover:opacity-95"
      />
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.04em] text-zinc-300">
          <span className="border-b border-transparent pb-0.5 transition-colors duration-200 group-hover:border-[#EC613B]">
            {label}
          </span>
        </span>
        <span
          className="font-[family-name:var(--font-mono)] text-[12px] text-[#EC613B] transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        >
          {'↗'}
        </span>
      </div>
    </a>
  )
}

export default function Research() {
  return (
    <section id="research" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="RESEARCH"
        title="We audited the two competitors the client named, and the findings set the redesign direction."
      />
      <div className="max-w-[760px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Before any design, we studied how established BC bookkeeping firms turn a visitor into a booked client.
        </p>
      </div>

      <article className="mt-16 space-y-6">
        <header className="space-y-2">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#EC613B]">
            Finding 01 &middot; Shasha Consulting
          </p>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white md:text-3xl">
            One action, everywhere.
          </h3>
        </header>
        <p className="max-w-[760px] font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300 md:text-base">
          The consultation CTA repeats in the top bar, the navigation, the hero, a dedicated offer block, and the footer, all routing to a single booking link, with trust stacked around it: a Why Choose Us grid, named testimonials, an FAQ, fifteen years cited. The funnel is singular and relentless. What it lacks is identity, it runs on a conventional services template.
        </p>
        <p className="max-w-[760px] font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300 md:text-base">
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#F2885A]">
            Implication
          </span>
          <br />
          The consultation path has to be persistent and singular. This became the spine of the user flow. Problem 3.
        </p>
        <figure className="space-y-3">
          <CompetitorImage
            src={SHASHA_SRC}
            alt="Shasha Consulting homepage. The consultation CTA repeats in the top bar, the navigation, the hero, the Special Offer block, and the footer, all routing to a single booking link."
            href="https://shashaconsulting.ca/"
            label="shashaconsulting.ca"
          />
          <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
            Shasha Consulting &middot; captured during the competitive audit
          </figcaption>
        </figure>
      </article>

      <article className="mt-20 space-y-6">
        <header className="space-y-2">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#EC613B]">
            Finding 02 &middot; HRSBS / Homeroom
          </p>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white md:text-3xl">
            Identity does the persuading.
          </h3>
        </header>
        <p className="max-w-[760px] font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300 md:text-base">
          The site leads with a distinct brand voice and a named, staged intake process: submit info, receive a plan, sign off, setup call. Not stock photography. Trust runs on credentials: QuickBooks Elite, Certified Professional Bookkeepers of Canada, operating since 2009.
        </p>
        <p className="max-w-[760px] font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300 md:text-base">
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#F2885A]">
            Implication
          </span>
          <br />
          Trust and differentiation come from identity, not stock imagery. This set the direction for the mockup phase. Problem 4.
        </p>
        <figure className="space-y-3">
          <CompetitorImage
            src={HRSBS_SRC}
            alt="HRSBS / Homeroom homepage. The hero leads with a brand-voice line and illustrated character rather than a stock photo. Trust runs on credentials and a staged intake process."
            href="https://www.hrsbs.ca/"
            label="hrsbs.ca"
          />
          <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
            HRSBS / Homeroom &middot; captured during the competitive audit
          </figcaption>
        </figure>
      </article>

      <article className="mt-20 space-y-4">
        <header className="space-y-2">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#EC613B]">
            Finding 03 &middot; The shared gap
          </p>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white md:text-3xl">
            Neither competitor uses motion.
          </h3>
        </header>
        <p className="max-w-[760px] font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300 md:text-base">
          Engagement through motion was the opening in the category, so it became the redesign's wedge, not a borrowed pattern. Problem 2.
        </p>
      </article>

      <p className="mt-16 max-w-[760px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-400">
        These three findings confirmed the client's stated priorities: cut stock imagery, increase engagement, guide toward services.
      </p>
    </section>
  )
}
