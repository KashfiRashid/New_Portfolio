import { MonoKicker } from '../primitives.jsx'

const CREDS = [
  { role: 'Team', who: 'Md Kashfi Or Rashid + Rahil Virani' },
  { role: 'Course', who: 'IAT 461, Special Topics in Computational Media - SFU, Summer 2025' },
  { role: 'Data', who: 'Retail Transactions Dataset (Kaggle, prasad22)' },
  { role: 'Tools', who: 'Python, scikit-learn, XGBoost, pandas, Tkinter, Figma' },
]

export default function Credits() {
  return (
    <section className="scroll-mt-28 border-t border-white/[0.06] py-20">
      <MonoKicker className="mb-8">Credits</MonoKicker>
      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {CREDS.map((c) => (
          <div key={c.role} className="flex flex-col gap-1">
            <dt className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-zinc-500">{c.role}</dt>
            <dd className="font-[family-name:var(--font-sans)] text-[15px] text-zinc-200">{c.who}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
