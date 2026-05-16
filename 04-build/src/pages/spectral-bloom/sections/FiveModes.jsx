import { useEffect, useRef, useState } from 'react'
import { SectionHead, AssetPlaceholder } from '../primitives.jsx'
import {
  BloomGlyph,
  WaveGlyph,
  NebulaGlyph,
  CrystalGlyph,
  HelixGlyph,
} from '../diagrams/FiveModesGrid.jsx'

/**
 * Five Modes — each mode is a row.
 *
 * Row anatomy:
 *   ┌────────────────────────┬────────────────────────┐
 *   │ Glyph card    16:9     │ Media card    16:9     │
 *   │ (geometry diagram)     │ (image or video)       │
 *   └────────────────────────┴────────────────────────┘
 *   Description sits below with breathing space.
 *
 * Glyph card and media card are equal-width and share the same 16:9
 * aspect ratio so the row reads as a paired comparison instead of a
 * lopsided header.
 *
 * Media kinds: 'image' (still frame), 'video' (lazy-loaded, loops only
 * while in viewport, never preloads off-screen), or 'placeholder'
 * (dashed slot with drop-in instructions). Swap a mode from image to
 * video by changing `media.kind` and the file path — the IntersectionObserver
 * inside ModeMedia handles play/pause on scroll automatically.
 *
 * Target media spec: 1920 × 1080 (16:9). Images JPG or PNG, ~200–600 KB.
 * Videos MP4 H.264, no audio, ~5–10s loopable, ~3–8 MB each.
 */

const MODES = [
  {
    n: '1',
    name: 'Bloom',
    Glyph: BloomGlyph,
    desc: 'A spherical particle cloud that breathes and pulses with bass. Orbital rings answer the frequency bands. The default.',
    media: { kind: 'image', src: '/spectral-bloom/mode-bloom.jpg', alt: 'Bloom mode capture: dense magenta particles around the central wireframe orb.' },
  },
  {
    n: '2',
    name: 'Wave',
    Glyph: WaveGlyph,
    desc: 'Multi-layer waveform terrain. Time-domain data spreads the particles into a flowing landscape of sound.',
    media: { kind: 'image', src: '/spectral-bloom/mode-wave.jpg', alt: 'Wave mode capture: multi-color waveform terrain stretched across the frame.' },
  },
  {
    n: '3',
    name: 'Nebula',
    Glyph: NebulaGlyph,
    desc: 'A dual-arm spiral galaxy. Frequency bands drive arm density and rotation speed.',
    media: { kind: 'image', src: '/spectral-bloom/mode-nebula.jpg', alt: 'Nebula mode capture: sparse particle field with the central orb.' },
  },
  {
    n: '4',
    name: 'Crystal',
    Glyph: CrystalGlyph,
    desc: 'A 3D cubic lattice. Audio energy distorts the geometric grid against an icy palette.',
    media: {
      kind: 'placeholder',
      slotId: 'Mode capture: Crystal',
      filename: '/spectral-bloom/mode-crystal.jpg',
      description: 'The 3D cubic lattice mid-distortion. The 1-minute demo never settles on Crystal long enough to grab a clean frame, so this one needs a deck capture.',
    },
  },
  {
    n: '5',
    name: 'Helix',
    Glyph: HelixGlyph,
    desc: 'A double DNA strand. Beats wrap it tighter, frequency expands the radius.',
    media: { kind: 'image', src: '/spectral-bloom/mode-helix.jpg', alt: 'Helix mode capture: double DNA strand twisting through the frame.' },
  },
]

/**
 * ModeMedia — renders the right-hand cell. Same 16:9 frame regardless of
 * kind. For video, an IntersectionObserver pauses it whenever it leaves
 * the viewport so off-screen clips never burn cycles or bandwidth.
 */
function ModeMedia({ media }) {
  if (media.kind === 'placeholder') {
    return (
      <AssetPlaceholder
        kind="MEDIA"
        slotId={media.slotId}
        filename={media.filename}
        dimensions="1920 × 1080 · 16:9 · image or video"
        description={media.description}
        className="aspect-video min-h-0"
      />
    )
  }

  if (media.kind === 'image') {
    return (
      <img
        src={media.src}
        alt={media.alt}
        className="aspect-video w-full rounded-sm object-cover"
        loading="lazy"
      />
    )
  }

  // kind === 'video'
  return <LazyVideo src={media.src} poster={media.poster} alt={media.alt} />
}

function LazyVideo({ src, poster, alt }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={visible ? src : undefined}
      poster={poster}
      aria-label={alt}
      className="aspect-video w-full rounded-sm object-cover"
      muted
      loop
      playsInline
      preload="none"
    />
  )
}

export default function FiveModes() {
  return (
    <section id="modes" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="FIVE MODES" title="Same 12,000 particles. Five ways to see them." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Every mode is a different parametric arrangement of the same particle buffer. The audio drives all of them. Only the geometry changes.
        </p>
      </div>

      <div className="mt-12 space-y-16">
        {MODES.map((mode) => {
          const { Glyph } = mode
          return (
            <article key={mode.name}>
              {/* Top row: glyph card | media card, both 16:9 equal-width */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Glyph card — kicker top, big SVG with breathing space above name */}
                <div className="relative flex aspect-video flex-col items-center justify-center border border-white/[0.06] bg-white/[0.02] p-6">
                  <span className="absolute left-6 top-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                    Mode {mode.n} / 5
                  </span>
                  {/* Glyph + name stacked vertically, both centered.
                      Explicit sizing on the glyph (not scale transform) so
                      flex layout reserves real space and the title sits
                      with breathing room below. Sized to fit inside the
                      aspect-video card at typical case-study widths. */}
                  <div className="flex flex-col items-center gap-6 md:gap-8">
                    <Glyph className="h-20 w-20 md:h-24 md:w-24" />
                    <h3 className="font-[family-name:var(--font-display)] text-4xl font-normal leading-tight text-white md:text-5xl">
                      {mode.name}
                    </h3>
                  </div>
                </div>

                {/* Media card */}
                <ModeMedia media={mode.media} />
              </div>

              {/* Description — caption beneath the row, no container.
                  Tight mt-4 so it reads as belonging to the row above;
                  the space-y-16 between modes does the row separation. */}
              <p className="mx-auto mt-4 max-w-[680px] text-center font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
                {mode.desc}
              </p>
            </article>
          )
        })}
      </div>

      <div className="mt-16 border border-dashed border-white/[0.08] bg-white/[0.01] p-6">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#FF7DA3]">
          Switch instantly
        </p>
        <p className="mt-2 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
          Keys 1 through 5 swap modes mid-track. The 12,000 particles re-form into the new geometry without a reload.
        </p>
      </div>
    </section>
  )
}
