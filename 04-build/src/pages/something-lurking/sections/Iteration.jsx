import { SectionHead, Figure } from '../primitives.jsx'

const FEEDBACK = [
  {
    name: 'Steven',
    role: 'peer review',
    note: 'Lack of variety in locations and puzzles.',
    answer: 'Eric modeled five new locations: control room, chip-space, elevator corridor, elevator, garage, and the end-scene escape pod.',
  },
  {
    name: 'Issac',
    role: 'peer review',
    note: 'Lack of narrative and awkward ending.',
    answer: 'I extended the story arc into Act III with the escape pod sequence and the growl ending. New voice lines explain the plot. The cliffhanger replaced the awkward stop.',
  },
  {
    name: 'The professor',
    role: 'P1 critique',
    note: 'Audio and visual feedback lacking, especially on interactable objects.',
    answer: 'Color-based puzzle feedback on fusebox and chip-space. Highlighted scale buttons. Poke interactions replacing raycast. New armband visual feedback.',
  },
  {
    name: 'Abhishek',
    role: 'playtest',
    note: 'Raycast armband button presses feel unrealistic.',
    answer: 'Switched the armband from raycast to direct poke interaction. The button only activates on a real fingertip touch.',
  },
]

export default function Iteration() {
  return (
    <section id="iteration" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="P1 TO FINAL"
        title="What the playtest said. What we shipped after."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          After the P1 showcase the project went through structured peer review. The notes were specific. We took them and rebuilt.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-2">
        {FEEDBACK.map((f) => (
          <article key={f.name} className="bg-[#0F1216] p-6">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#E85850]">
              {f.name} · {f.role}
            </p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] italic leading-relaxed text-zinc-300">
              &ldquo;{f.note}&rdquo;
            </p>
            <p className="mt-3 border-t border-white/[0.06] pt-3 font-[family-name:var(--font-sans)] text-[14px] leading-relaxed text-zinc-400">
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                We shipped:
              </span>
              <span className="ml-2">{f.answer}</span>
            </p>
          </article>
        ))}
      </div>

      <Figure
        className="mt-16"
        src="/something-lurking/fig-unity-detection-cubes.png"
        alt="A screenshot of the Unity Editor showing the project hierarchy with detection cube triggers used to gate doors, lights, and audio cues as the player crosses thresholds."
        label="Figure 4"
        caption="The detection-cube trigger system that made the ship feel scripted-on-the-fly"
      />
    </section>
  )
}
