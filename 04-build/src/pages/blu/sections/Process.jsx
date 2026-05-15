import { SectionHead, MonoKicker } from '../primitives.jsx'

const TIMELINE = [
  {
    date: 'June 6, 2025',
    label: 'Website, script, concept sketches',
    src: 'https://framerusercontent.com/images/teHKdx53Fv4aCVfXvOISb3JCg.png',
    file: 'timeline-jun06.png',
  },
  {
    date: 'June 20, 2025',
    label: 'Storyboard and pitch',
    src: 'https://framerusercontent.com/images/BrVfjsxRbrTvhK6rskwBSk0Gbtw.png',
    file: 'timeline-jun20.png',
  },
  {
    date: 'July 18, 2025',
    label: 'Animatic',
    src: 'https://framerusercontent.com/images/IzOJh3uKkQjHYgWPrhAFOgIQ.png',
    file: 'timeline-jul18.png',
  },
  {
    date: 'August 13, 2025',
    label: 'Showcase',
    src: 'https://framerusercontent.com/images/dquDNrFwQ9hzCWLFQ1R8IxLEn1I.png',
    file: 'timeline-aug13.png',
  },
]

const STORYBOARD_ACTS = [
  {
    label: 'Act 01. The grove.',
    frames: [
      { src: 'https://framerusercontent.com/images/ZT36uKOgxVz2Ik1Y9zqBEZAOJRs.png', file: 'sb-act01-01.png' },
      { src: 'https://framerusercontent.com/images/xrlOh9U3UrVLwZ3KMEWYRMTcRjI.png', file: 'sb-act01-02.png' },
      { src: 'https://framerusercontent.com/images/O0Zz9QN62ht7Vr7INRi1KBtraY.png', file: 'sb-act01-03.png' },
      { src: 'https://framerusercontent.com/images/20pmCBpdwqVsf9D4VaokCQ0e408.png', file: 'sb-act01-04.png' },
      { src: 'https://framerusercontent.com/images/eGfZ0FahrKOZWsaqoGWp0dQxQU.png', file: 'sb-act01-05.png' },
    ],
  },
  {
    label: 'Act 02. Into the wasteland.',
    frames: [
      { src: 'https://framerusercontent.com/images/mSezPvMTz64fXPQNEpXLJMDhS9M.png', file: 'sb-act02-01.png' },
      { src: 'https://framerusercontent.com/images/RAW9U0ZbXWNW9iUlXqyCzB1Mfqg.png', file: 'sb-act02-02.png' },
      { src: 'https://framerusercontent.com/images/uslYJbscCiOIWTkfoO6EGeqwJU.png', file: 'sb-act02-03.png' },
      { src: 'https://framerusercontent.com/images/P0zFYFKUcP5xQ8wMRJwDrQUiBA.png', file: 'sb-act02-04.png' },
    ],
  },
  {
    label: 'Act 03. The ledge.',
    frames: [
      { src: 'https://framerusercontent.com/images/lNvgOC5Z0rRWBHY1a4IWXe87WU.png', file: 'sb-act03-01.png' },
      { src: 'https://framerusercontent.com/images/jOMNd2JTJlJXYDfx2svbUVy0M48.png', file: 'sb-act03-02.png' },
      { src: 'https://framerusercontent.com/images/AjNoUpJgdBkebzJc3MSIaWiqELY.png', file: 'sb-act03-03.png' },
      { src: 'https://framerusercontent.com/images/uClevX584anbCajaqFJtvZCQPaw.png', file: 'sb-act03-04.png' },
    ],
  },
]

const PRECEDENTS = [
  {
    title: 'Spring',
    by: 'Blender Open Movie',
    note: 'Dramatic lighting and textured environments. Reference for The Dims.',
    src: 'https://framerusercontent.com/images/arSqKiK4F6TEbTW2afeyLOUCLkA.png',
    file: 'prec-spring.png',
  },
  {
    title: 'Deep Rooted',
    by: 'Short film',
    note: 'Lighting and color carrying mood. Reference for Lumaland.',
    src: 'https://framerusercontent.com/images/KgUoz748B2Mf0GFK5UfdigpEU.png',
    file: 'prec-deep-rooted.png',
  },
  {
    title: 'Piper',
    by: 'Pixar, 2016',
    note: 'Realistic textures with soft character design. Reference for the duckling.',
    src: 'https://framerusercontent.com/images/93KTM9QTHE363VgMbFBmT3qfaz0.png',
    file: 'prec-piper.png',
  },
]

export default function Process() {
  return (
    <section id="process" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="PROCESS" title="From sketch to final." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The film moved through four checkpoints over ten weeks. Concept and script. Storyboard and pitch. Animatic. Final showcase. Each stage was a chance for the team to look at the story and decide what survived.
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-12">
        <MonoKicker>TIMELINE</MonoKicker>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {TIMELINE.map((m) => (
            <div key={m.date}>
              {/* TODO: download from Framer and self-host under /public/blu/{m.file} */}
              <img
                src={m.src}
                alt=""
                loading="lazy"
                className="block w-full rounded-lg border border-white/[0.06] bg-zinc-900/40 object-cover"
              />
              <p className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#4FC3F7]">
                {m.date}
              </p>
              <p className="mt-1 font-[family-name:var(--font-sans)] text-sm leading-snug text-zinc-300">
                {m.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
          Four checkpoints. Ten weeks.
        </p>
      </div>

      {/* Storyboard frames, act by act */}
      <div className="mt-16 space-y-12">
        <MonoKicker>STORYBOARD</MonoKicker>
        {STORYBOARD_ACTS.map((act) => (
          <div key={act.label}>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[#4FC3F7]">
              {act.label}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
              {act.frames.map((f) => (
                <img
                  key={f.file}
                  /* TODO: download from Framer and self-host under /public/blu/{f.file} */
                  src={f.src}
                  alt=""
                  loading="lazy"
                  className="block w-full rounded-lg border border-white/[0.06] bg-zinc-900/40 object-cover"
                />
              ))}
            </div>
          </div>
        ))}
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
          Storyboard frames. Thirteen in total, split by act.
        </p>
      </div>

      {/* Storyboard reel */}
      <div className="mt-16">
        <MonoKicker>STORYBOARD REEL</MonoKicker>
        <div className="mt-4">
          {/* TODO: download from Framer and self-host under /public/blu/storyboard.mp4 */}
          <video
            src="https://framerusercontent.com/assets/dsCvMFjRadxGo2qG346wAotddd8.mp4"
            controls
            playsInline
            preload="metadata"
            className="block w-full rounded-lg border border-white/[0.06] bg-black"
          />
          <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
            Animated storyboard pass. June 20, 2025.
          </p>
        </div>
      </div>

      {/* Animatic */}
      <div className="mt-16">
        <MonoKicker>ANIMATIC</MonoKicker>
        <div className="mt-4">
          {/* TODO: download from Framer and self-host under /public/blu/animatic.mp4 */}
          <video
            src="https://framerusercontent.com/assets/z1OqMdnFRdpC89y3JgOSVHHq6I.mp4"
            controls
            playsInline
            preload="metadata"
            className="block w-full rounded-lg border border-white/[0.06] bg-black"
          />
          <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
            First timed pass. July 18, 2025. YouTube fallback: youtu.be/e3CVlkNiyXQ.
          </p>
        </div>
      </div>

      {/* Precedents */}
      <div className="mt-16">
        <MonoKicker>PRECEDENTS</MonoKicker>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRECEDENTS.map((p) => (
            <article key={p.title} className="rounded-lg border border-zinc-800 p-6">
              {/* TODO: download from Framer and self-host under /public/blu/{p.file} */}
              <img
                src={p.src}
                alt={`${p.title}, ${p.by}. Visual reference.`}
                loading="lazy"
                className="block w-full rounded-md border border-white/[0.06] bg-zinc-900/40 object-cover"
              />
              <h4 className="mt-4 font-[family-name:var(--font-display)] text-[22px] font-normal text-white">
                {p.title}
              </h4>
              <p className="mt-1 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                {p.by}
              </p>
              <p className="mt-3 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
                {p.note}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
          What we looked at while building.
        </p>
      </div>
    </section>
  )
}
