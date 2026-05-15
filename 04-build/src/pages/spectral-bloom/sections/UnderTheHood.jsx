import { SectionHead } from '../primitives.jsx'

const SPECS = [
  {
    label: 'Renderer',
    value: 'Three.js r128 over WebGL, with ACES filmic tone mapping for the glow falloff.',
  },
  {
    label: 'Particle system',
    value: '12,000 particles held in Float32Array buffers, drawn with additive blending so density reads as light.',
  },
  {
    label: 'Core geometry',
    value: 'A wireframe icosahedron orb, six frequency-reactive rings, and a 256-point wave ring carrying the time-domain signal.',
  },
  {
    label: 'Lighting',
    value: 'Three point lights driven by the chroma hue, so the color temperature of the scene tracks the brightness of the sound.',
  },
  {
    label: 'Camera',
    value: 'A procedural Lissajous oscillation, modulated by bass and high energy, so the viewpoint drifts with the music.',
  },
  {
    label: 'Footprint',
    value: 'One HTML file. No build step, no bundler, no dependencies beyond the Three.js CDN. It opens in a browser and runs.',
  },
]

export default function UnderTheHood() {
  return (
    <section id="engine" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="UNDER THE HOOD" title="The real-time engine, in one file." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The whole thing is deliberately small. The constraint was a feature, not a compromise. Anyone can open the file and read every line of how it works.
        </p>
      </div>

      <figure className="mt-12 space-y-3">
        <img
          src="/spectral-bloom/frame-34.jpg"
          alt="A dense burst of particles around the central wireframe orb, captured mid-track from the running build."
          className="w-full rounded-lg border border-white/[0.08]"
        />
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
          The particle field mid-track, captured from the running build
        </figcaption>
      </figure>

      <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-2">
        {SPECS.map((spec) => (
          <div key={spec.label} className="bg-[#0F1216] p-6">
            <dt className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#FF7DA3]">
              {spec.label}
            </dt>
            <dd className="mt-2 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
