import { SectionHead, PullQuote } from '../primitives.jsx'

export default function TwoWorlds() {
  return (
    <section id="two-worlds" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE TWO WORLDS" title="Light and life. Then dark and decay." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The film has two environments. They are not just settings. They are the visual carrier of the theme. The duckling moves between them and the audience reads the cost in the move, not in the script. I built both, and they were designed against each other from the first sketch.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <article className="space-y-4">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[#4FC3F7]">
            WORLD 01
          </p>
          {/* TODO: download from Framer and self-host under /public/blu/env-lumaland.png */}
          <img
            src="https://framerusercontent.com/images/qxZuvW7XNfh7ockKbiyZsvyqoM.png"
            alt="Lumaland environment render: warm dusk sky, soft glowing grass, the meadow where the duckling lives."
            loading="lazy"
            className="block w-full rounded-lg border border-white/[0.06] bg-zinc-900/40 object-cover"
          />
          <h3 className="font-[family-name:var(--font-display)] text-[28px] font-normal tracking-[-0.02em] text-white lg:text-[36px]">
            Lumaland
          </h3>
          <p className="max-w-[520px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
            A calm green meadow under a glowing dusk sky. Soft wind through the grass. Warm light reading as comfort. Lumaland is the place the duckling does not need to leave. The tranquil setting exists for one reason: so leaving it has weight.
          </p>
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
            Soft. Safe. Alive.
          </p>
        </article>

        <article className="space-y-4">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[#4FC3F7]">
            WORLD 02
          </p>
          {/* TODO: download from Framer and self-host under /public/blu/env-the-dims.png */}
          <img
            src="https://framerusercontent.com/images/OgQy6WiyGVGnsCywF1UbPbcp15s.png"
            alt="The Dims environment render: foggy wasteland, broken trees, harsh moonlight cutting through dust."
            loading="lazy"
            className="block w-full rounded-lg border border-white/[0.06] bg-zinc-900/40 object-cover"
          />
          <h3 className="font-[family-name:var(--font-display)] text-[28px] font-normal tracking-[-0.02em] text-white lg:text-[36px]">
            The Dims
          </h3>
          <p className="max-w-[520px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
            A foggy, broken landscape under harsh moonlight. Long shadows. Dense fog blurring vision past a few meters. Brittle trees, swamps with suction, a cliff edge waiting at the end. The wasteland is not just bad weather. It is a place that has already absorbed every creature that came before.
          </p>
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
            Dark. Jagged. Decaying.
          </p>
        </article>
      </div>

      <div className="mt-16">
        <PullQuote>The contrast IS the story.</PullQuote>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* TODO: download from Framer and self-host under /public/blu/proc-dims-01.png */}
          <img
            src="https://framerusercontent.com/images/75QftL87PpdUcmRyf61PGnwRmI.png"
            alt="The Dims, in-progress modeling pass."
            loading="lazy"
            className="block w-full rounded-lg border border-white/[0.06] bg-zinc-900/40 object-cover"
          />
          {/* TODO: download from Framer and self-host under /public/blu/proc-dims-02.png */}
          <img
            src="https://framerusercontent.com/images/EvIpiYX2olDmUAW3tiJz2Br0uXc.png"
            alt="The Dims, second in-progress modeling pass."
            loading="lazy"
            className="block w-full rounded-lg border border-white/[0.06] bg-zinc-900/40 object-cover"
          />
          {/* TODO: download from Framer and self-host under /public/blu/proc-lumaland-01.png */}
          <img
            src="https://framerusercontent.com/images/5ANAJJKjsuEZ50nFdkBIyKtWlgI.png"
            alt="Lumaland, in-progress modeling pass."
            loading="lazy"
            className="block w-full rounded-lg border border-white/[0.06] bg-zinc-900/40 object-cover"
          />
        </div>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
          Process. Two passes on The Dims, one pass on Lumaland.
        </p>
      </div>
    </section>
  )
}
