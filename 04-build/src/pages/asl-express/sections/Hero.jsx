import { MetaBlock, LinkButton } from '../primitives.jsx'

const LINKS = [
  { label: 'Devpost', href: 'https://devpost.com/software/sign2order-touchless-ai-food-ordering-assistant' },
  { label: 'Frontend repo', href: 'https://github.com/KashfiRashid/ASL_Express' },
  { label: 'Backend repo', href: 'https://github.com/faaizja/ASL_Express_Backend' },
  { label: 'Hardware repo', href: 'https://github.com/RiyanRoy02/ASL_Express_Hardware' },
  { label: 'Signify (origin)', href: 'https://github.com/KashfiRashid/Signify' },
]

export default function Hero() {
  return (
    <section className="scroll-mt-28 py-10 lg:py-16">
      <div className="space-y-12">
        <header className="space-y-8">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#6EE7B7]">
            Winner, Best Hardware &middot; StormHacks 2025
          </p>
          <h1
            className="font-[family-name:var(--font-display)] text-[40px] sm:text-[56px] font-normal text-white lg:text-[96px]"
            style={{ letterSpacing: '-0.03em', lineHeight: '0.95' }}
          >
            ASL Express
          </h1>
          <p className="max-w-[660px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            A touchless food-ordering system that lets deaf and non-verbal people order
            with hand signs instead of speech. A camera reads the gesture, AI maps it to an
            order, and a hardware rig confirms it back with light, sound, and a screen. It
            began as a research project called Signify - and before that, as a gap on a
            video call I could never quite close.
          </p>
        </header>

        <MetaBlock
          rows={[
            { label: 'My Role', value: 'Frontend & System Integration' },
            { label: 'Team', value: 'Kashfi Rashid / Riyan Roy / Faaiz Abdullah / Md Rownak Diganta' },
            { label: 'Event', value: 'StormHacks 2025 (SFU Surge), 24 hours' },
            { label: 'Result', value: 'Winner, Best Hardware' },
            { label: 'Stack', value: 'Next.js / React / shadcn-ui / Python / MediaPipe / YOLO / Gemini / ESP32' },
            { label: 'Origin', value: 'Signify (IAT 360), with Hasrat Buttar' },
          ]}
        />

        <div className="flex flex-wrap gap-3">
          {LINKS.map((link) => (
            <LinkButton key={link.href} href={link.href}>{link.label}</LinkButton>
          ))}
        </div>
      </div>
    </section>
  )
}
