import { SectionHead, Highlight } from '../primitives.jsx'

const STATIONS = [
  {
    name: 'Audio Plinth',
    color: '#E8A04E',
    task: 'Hear a 3-note sequence and recall it',
    trap: 'Answer within 1.5 seconds; hesitate and the bar climbs.',
  },
  {
    name: 'Holographic Plinth',
    color: '#E06AD8',
    task: 'Solve Tower of Hanoi at a metronomic pace',
    trap: 'Pause to think and it logs a THINKING PAUSE. Bots have perfect rhythm.',
  },
  {
    name: 'Retro-Terminal',
    color: '#3DD8E8',
    task: 'Type a word backwards with no hesitation',
    trap: 'One backspace is an instant fail.',
  },
  {
    name: 'Sorting Console',
    color: '#3DE88F',
    task: 'Arrange numbers in ascending order',
    trap: 'Rhythm and precision are tracked the whole time.',
  },
]

export default function Gameplay() {
  return (
    <section id="how-it-plays" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="HOW IT PLAYS" title="Pass the audit." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          You navigate a retro-futuristic server room as <span className="font-[family-name:var(--font-mono)] text-[#3DE8B0]">AGENT_404</span>, moving between task stations. Each station is a behavioral trap: the rules sound simple, but your human instincts are what get you caught.
        </p>
      </div>
      <img
        src="/us-among-ai/world.png"
        alt="Us Among AI: server room, with the holographic and audio plinths"
        loading="lazy"
        className="mt-10 w-full rounded-xl border border-white/10"
      />
      <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {STATIONS.map((s) => (
          <li key={s.name} className="border border-white/[0.06] bg-white/[0.02] p-5">
            <p
              className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em]"
              style={{ color: s.color }}
            >
              {s.name}
            </p>
            <p className="mt-2 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {s.task}. <span className="text-zinc-500">{s.trap}</span>
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-10 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          <Highlight>The game doesn&rsquo;t just check whether you finish the tasks. It watches how you do them.</Highlight> A live suspicion bar slides between MACHINE and HUMAN as the Auditor reads your keypress timing, rhythm, and hesitation.
        </p>
        <p>
          Finish, and the system delivers a verdict: <strong className="text-white">ACCEPTED, as artificial intelligence</strong>, or <strong className="text-white">FLAGGED, as human</strong>. A line-by-line breakdown of every behaviour that gave you away types out one line at a time.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        <img
          src="/us-among-ai/terminal.png"
          alt="Us Among AI: Retro-Terminal task, type a word backwards"
          loading="lazy"
          className="w-full rounded-lg border border-white/10"
        />
        <img
          src="/us-among-ai/audio.png"
          alt="Us Among AI: Audio Plinth task"
          loading="lazy"
          className="w-full rounded-lg border border-white/10"
        />
      </div>
    </section>
  )
}
