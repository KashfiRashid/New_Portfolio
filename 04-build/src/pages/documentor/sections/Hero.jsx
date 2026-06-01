import { MetaBlock, AppShot } from '../primitives.jsx'

export default function Hero() {
  return (
    <section className="scroll-mt-28 py-20 lg:py-32">
      <div className="space-y-12">
        <header className="space-y-8">
          <h1
            className="font-[family-name:var(--font-display)] text-[56px] font-normal text-white lg:text-[96px]"
            style={{ letterSpacing: '-0.03em', lineHeight: '0.95' }}
          >
            DocuMentor
          </h1>
          <p className="max-w-[640px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            I built the guide I needed when I was the international student drowning in government paperwork. Then I made sure the problem was not just mine.
          </p>
        </header>

        <MetaBlock
          rows={[
            { label: 'Team', value: 'Md Kashfi Or Rashid Pranta \u00b7 Kate Luonge (UI) \u00b7 Mariyam (UX Research)' },
            { label: 'My Roles', value: 'UX Lead \u00b7 UX Research \u00b7 Interaction Design' },
            { label: 'Duration', value: '8 weeks' },
            { label: 'Tools', value: 'Figma' },
            { label: 'Context', value: 'International students' },
            { label: 'Format', value: 'Mobile app prototype' },
          ]}
        />

        <AppShot
          src="/documentor/App.png"
          alt="The DocuMentor mobile app interface."
          caption={"DocuMentor \u00b7 the shipped interface"}
        />
      </div>
    </section>
  )
}
