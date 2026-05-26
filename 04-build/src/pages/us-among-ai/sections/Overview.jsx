import { SectionHead, Highlight } from '../primitives.jsx'

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="OVERVIEW" title="Be a bot, or be caught." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Us Among AI is a browser game that flips the Turing test. You&rsquo;re dropped into a sandbox and told to pretend you&rsquo;re an AI, completing objectives while the system throws CAPTCHA-style prompts at you. The catch: those CAPTCHAs are designed to catch humans, not stop bots.
        </p>
        <p>
          <Highlight>We built it overnight at SillyHacks 2026 and won Best UI.</Highlight> I led a team of four: set direction, scoped the build, divided the work. We shipped a finished game by the end of the night.
        </p>
      </div>
    </section>
  )
}
