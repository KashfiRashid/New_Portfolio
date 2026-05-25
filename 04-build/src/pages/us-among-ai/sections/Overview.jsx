import { SectionHead, Highlight } from '../primitives.jsx'

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="OVERVIEW" title="Be a bot, or be caught." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Us Among AI is a browser game that flips the Turing test. You&rsquo;re dropped into a sandbox and told to pretend you&rsquo;re an AI — completing objectives while the system throws CAPTCHA-style prompts at you. The catch: these CAPTCHAs are designed to catch humans, not to stop bots.
        </p>
        <p>
          <Highlight>It started as a 2am hackathon joke and ended the night as the Best UI winner at SillyHacks 2026.</Highlight> I led a team of four — set the direction, divided the work — and we designed, built, and shipped a complete, atmospheric game in a single sitting.
        </p>
      </div>
    </section>
  )
}
