import { MetaBlock, LinkButton, YouTubeEmbed } from '../primitives.jsx'

const LINKS = [
  { label: 'SIAT showcase', href: 'https://www.sfu.ca/siat/showcase/summer-2024-project-showcase/iat-265-clicker-forge.html' },
  { label: 'Watch the demo', href: 'https://www.youtube.com/watch?v=L6NHnHL4Y3Q' },
]

export default function Hero() {
  return (
    <section className="scroll-mt-28 py-10 lg:py-16">
      <div className="space-y-12">
        <header className="space-y-8">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#E5C877]">
            Interactive simulation &middot; Built in Java
          </p>
          <h1
            className="font-[family-name:var(--font-display)] text-[40px] sm:text-[56px] font-normal text-white lg:text-[96px]"
            style={{ letterSpacing: '-0.03em', lineHeight: '0.95' }}
          >
            Clicker Forge
          </h1>
          <p className="max-w-[680px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            A blacksmith simulation where you turn raw copper into a finished sword. Light the
            forge, melt the metal, time the hammer, and dress the blade, all with the mouse and
            keyboard. Every sprite is hand drawn, and it was the project where I learned to write
            real object-oriented Java.
          </p>
        </header>

        <MetaBlock
          rows={[
            { label: 'My Role', value: 'Solo: design, art, and code' },
            { label: 'Type', value: 'Interactive simulation / creative coding' },
            { label: 'Language', value: 'Java (java.awt Graphics2D, Swing input)' },
            { label: 'Libraries', value: 'Processing core (PVector + Perlin noise), Minim audio' },
            { label: 'Scope', value: '~2,800 lines, 30+ classes, 8 packages' },
            { label: 'Art', value: 'Every sprite hand drawn in Figma' },
          ]}
        />

        <div className="flex flex-wrap gap-3">
          {LINKS.map((link) => (
            <LinkButton key={link.href} href={link.href}>{link.label}</LinkButton>
          ))}
        </div>

        <YouTubeEmbed
          id="L6NHnHL4Y3Q"
          title="Clicker Forge highlight reel"
          caption="The highlight reel."
        />
      </div>
    </section>
  )
}
// end Hero.jsx
